import { createMcpExpressApp, requireBearerAuth } from '@modelcontextprotocol/express';
import { toNodeHandler } from '@modelcontextprotocol/node';
import { McpServer, createMcpHandler, OAuthError, OAuthErrorCode } from '@modelcontextprotocol/server';
import { serveStdio } from '@modelcontextprotocol/server/stdio';
import { readFile } from 'node:fs/promises';
import { timingSafeEqual } from 'node:crypto';
import * as z from 'zod/v4';
import type { OAuthTokenVerifier } from '@modelcontextprotocol/express';

interface TrailModule {
  nome: string;
  conteudos: string[];
}

interface Trail {
  nome: string;
  tecnologia: string[] | string;
  nivel: string;
  modulos: TrailModule[];
  horas_total_estimadas: number;
  fonte: string;
  tipo_curriculo: string;
}

interface TrailCatalog {
  trilhas: Trail[];
}

const catalogUrl = new URL('../../data/trilhas_dio.json', import.meta.url);
const catalog = readFile(catalogUrl, 'utf8').then((contents) => JSON.parse(contents) as TrailCatalog);

function normalize(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR').trim();
}

function technologiesOf(trail: Trail): string[] {
  return Array.isArray(trail.tecnologia) ? trail.tecnologia : [trail.tecnologia];
}

function createServer(): McpServer {
  const server = new McpServer({ name: 'dio-estudos', version: '1.0.0' });

  server.registerTool(
    'listar_tecnologias',
    {
      description: 'Lista as tecnologias disponíveis no catálogo local de trilhas.',
      inputSchema: z.object({})
    },
    async () => {
      const trails = (await catalog).trilhas;
      const technologies = [...new Set(trails.flatMap(technologiesOf))].sort((a, b) => a.localeCompare(b, 'pt-BR'));
      return { content: [{ type: 'text', text: technologies.join('\n') }] };
    }
  );

  server.registerTool(
    'buscar_trilha',
    {
      description: 'Busca trilhas do catálogo local por tecnologia; retorna detalhes, opções ambíguas ou sugestões.',
      inputSchema: z.object({ tecnologia: z.string().trim().min(1).describe('Tecnologia para localizar no catálogo') })
    },
    async ({ tecnologia }) => {
      const trails = (await catalog).trilhas;
      const query = normalize(tecnologia);
      const exact = trails.filter((trail) => technologiesOf(trail).some((item) => normalize(item) === query));
      const matches = exact.length > 0
        ? exact
        : trails.filter((trail) => technologiesOf(trail).some((item) => normalize(item).includes(query)));

      if (matches.length === 1) {
        return { content: [{ type: 'text', text: JSON.stringify(matches[0], null, 2) }] };
      }

      if (matches.length > 1) {
        const options = matches.map((trail) => `- ${trail.nome} (${technologiesOf(trail).join(', ')})`);
        return { content: [{ type: 'text', text: `Encontrei mais de uma trilha. Peça à pessoa que escolha uma:\n${options.join('\n')}` }] };
      }

      const suggestions = [...new Set(trails.flatMap(technologiesOf))].sort((a, b) => a.localeCompare(b, 'pt-BR'));
      return { content: [{ type: 'text', text: `A tecnologia "${tecnologia}" não foi encontrada. Tecnologias disponíveis: ${suggestions.join(', ')}` }] };
    }
  );

  server.registerTool(
    'gerar_certificado',
    {
      description: 'Gera um certificado fictício em Markdown, sem validade oficial.',
      inputSchema: z.object({
        nome: z.string().trim().min(1).describe('Nome que aparecerá no certificado'),
        trilha: z.string().trim().min(1).describe('Nome da trilha concluída')
      })
    },
    async ({ nome, trilha }) => {
      const data = new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Sao_Paulo' }).format(new Date());
      const markdown = [
        '# CERTIFICADO FICTÍCIO, SEM VALIDADE OFICIAL',
        '',
        `Certificamos, para fins exclusivamente ilustrativos, que **${nome}** concluiu a trilha **${trilha}**.`,
        '',
        `Data: ${data}`
      ].join('\n');
      return { content: [{ type: 'text', text: markdown }] };
    }
  );

  server.registerPrompt(
    'criar_desafio',
    {
      description: 'Cria um desafio de programação em português, adequado à tecnologia e ao nível informados.',
      argsSchema: {
        tecnologia: z.string().trim().min(1).describe('Tecnologia do desafio'),
        nivel: z.enum(['iniciante', 'intermediário', 'avançado']).describe('Nível de dificuldade')
      }
    },
    async ({ tecnologia, nivel }) => ({
      messages: [{
        role: 'user',
        content: {
          type: 'text',
          text: [
            'Crie um único desafio de código em português do Brasil. Não revele a solução nem o código completo.',
            `Tecnologia: ${tecnologia}`,
            `Nível: ${nivel}`,
            'Varie o tipo de problema entre execuções e adapte o escopo ao nível: fundamentos para iniciante, combinação de conceitos e casos de borda para intermediário, arquitetura, desempenho ou robustez para avançado.',
            'Apresente título, contexto, objetivo, requisitos, restrições, exemplos de entrada e saída, critérios verificáveis e pelo menos três casos de teste, sem respostas implementadas.',
            'Se a tecnologia não for adequada para executar código isoladamente, formule uma tarefa de interface e explique como verificar o resultado.'
          ].join('\n\n')
        }
      }]
    })
  );

  return server;
}

async function startHttpServer(): Promise<void> {
  const token = process.env.MCP_BEARER_TOKEN;
  if (!token || token.length < 32) {
    throw new Error('Defina MCP_BEARER_TOKEN com pelo menos 32 caracteres para habilitar HTTP.');
  }

  const host = process.env.MCP_HTTP_HOST ?? '127.0.0.1';
  const port = Number(process.env.MCP_HTTP_PORT ?? 3000);
  const tokenExpiresAt = Math.floor(Date.now() / 1000) + 3600;
  const verifier: OAuthTokenVerifier = {
    async verifyAccessToken(candidate) {
      const candidateBuffer = Buffer.from(candidate);
      const tokenBuffer = Buffer.from(token);
      if (candidateBuffer.length !== tokenBuffer.length || !timingSafeEqual(candidateBuffer, tokenBuffer)) {
        throw new OAuthError(OAuthErrorCode.InvalidToken, 'Token inválido');
      }

      return {
        token: candidate,
        clientId: 'dio-estudos-client',
        scopes: ['mcp'],
        expiresAt: tokenExpiresAt
      };
    }
  };
  const app = createMcpExpressApp({ host });
  const auth = requireBearerAuth({ verifier, requiredScopes: ['mcp'] });
  const handler = toNodeHandler(createMcpHandler(createServer));

  app.get('/health', (_request, response) => response.json({ status: 'ok', server: 'dio-estudos-mcp' }));
  app.all('/mcp', auth, (request, response) => void handler(request, response, request.body));
  app.listen(port, host, () => console.error(`DIO Estudos MCP disponível em http://${host}:${port}/mcp`));
}

if (process.env.MCP_TRANSPORT === 'http') {
  await startHttpServer();
} else {
  await serveStdio(createServer);
}