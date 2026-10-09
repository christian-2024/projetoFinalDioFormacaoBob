# Servidor MCP de estudos

Servidor MCP em TypeScript que expõe o catálogo local do projeto e os comandos de estudo para clientes compatíveis com MCP.

## Requisitos

- Node.js 20 ou superior
- npm

## Instalação e uso local

No diretório `mcp/`:

```powershell
npm install
npm run dev
```

O transporte padrão é `stdio`, usado por clientes que iniciam o servidor como processo local. O VS Code está configurado em `.vscode/mcp.json` para executar esse modo.

Ferramentas disponíveis:

- `listar_tecnologias`: lista tecnologias em `data/trilhas_dio.json`.
- `buscar_trilha`: busca uma trilha, aponta ambiguidades ou sugere tecnologias existentes.
- `gerar_certificado`: gera Markdown com identificação visível de que é fictício e sem validade oficial.

Prompt disponível:

- `criar_desafio`: orienta o modelo conectado a gerar um desafio sem revelar a solução.

## HTTP para desenvolvimento

O modo HTTP usa Streamable HTTP no endpoint `/mcp`, com token bearer obrigatório. Ele escuta apenas em `127.0.0.1` por padrão. O token de desenvolvimento expira uma hora após a inicialização do processo.

```powershell
$env:MCP_BEARER_TOKEN = 'gere-um-segredo-aleatorio-com-pelo-menos-32-caracteres'
npm run start:http
```

O endpoint local será `http://127.0.0.1:3000/mcp`; a verificação de saúde fica em `/health`. Opcionalmente, configure `MCP_HTTP_HOST` e `MCP_HTTP_PORT`. Não exponha o serviço diretamente à internet.

## Publicação, HTTPS e SSO

Para acesso remoto, publique atrás de um proxy reverso com TLS/HTTPS, domínio permitido, limites de requisição e gestão segura dos segredos. O token configurado agora é uma autenticação bearer estática de desenvolvimento, não SSO nem OAuth. Para SSO, conecte um provedor OAuth 2.1/OIDC e substitua o verificador em `src/index.ts` por validação de JWT ou introspecção, com audiência, expiração e escopos definidos para o servidor. O endpoint MCP é a API de ferramentas; uma API REST independente exigiria rotas e contratos próprios.

## Referências oficiais

- [SDK TypeScript MCP](https://github.com/modelcontextprotocol/typescript-sdk)
- [Primeiro servidor](https://github.com/modelcontextprotocol/typescript-sdk/blob/main/docs/get-started/first-server.md)
- [Servidor HTTP](https://github.com/modelcontextprotocol/typescript-sdk/blob/main/docs/serving/http.md)
- [Autorização](https://github.com/modelcontextprotocol/typescript-sdk/blob/main/docs/serving/authorization.md)