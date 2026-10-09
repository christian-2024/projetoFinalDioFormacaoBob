# Documentação do projeto DIO Estudos / BOB

## Visão geral

Este repositório foi pensado como uma base prática para estudo guiado, organização de trilhas e apoio ao aprendizado usando Copilot Chat e MCP (Model Context Protocol). A ideia central é unir:

- um catálogo de trilhas de tecnologia;
- prompts personalizados para o Copilot Chat;
- um servidor MCP local para consulta e geração de artefatos úteis;
- um modelo de uso que estimula prática, reflexão e autonomia.

O objetivo não é substituir uma formação acadêmica ou oficial, mas sim servir como guia, ambiente de estudo e apoio de produtividade para quem está começando ou reforçando conhecimentos.

---

## Objetivo do projeto

O projeto ajuda pessoas a:

- descobrir trilhas de estudo por tecnologia;
- entender o nível de dificuldade de uma trilha;
- receber desafios de código adaptados ao conhecimento;
- gerar certificados fictícios para fins de apresentação, estudo ou prototipagem;
- explorar uma arquitetura MCP local e um fluxo de estudo orientado por ferramentas.

---

## Estrutura do repositório

```text
bob/
├── .github/
│   ├── copilot-instructions.md
│   └── prompts/
│       ├── trilha.prompt.md
│       ├── desafio.prompt.md
│       └── certificado.prompt.md
├── .vscode/
│   └── mcp.json
├── data/
│   └── trilhas_dio.json
├── docs/
│   └── documentacao-projeto.md
├── mcp/
│   ├── src/
│   ├── README.md
│   ├── package.json
│   └── tsconfig.json
├── readme.md
└── src/
```

### Papel de cada parte

- .github/prompts: prompts do Copilot para interação direta em português.
- data/trilhas_dio.json: catálogo local das trilhas com módulos, tecnologias, níveis, fontes e estimativas.
- mcp/: servidor MCP em TypeScript para expor ferramentas e prompts para clientes compatíveis.
- docs/: documentação geral do projeto.
- src/: pode receber futuras extensões, integrações ou utilitários do projeto.

---

## Catálogo de trilhas

O arquivo principal do projeto é o catálogo em data/trilhas_dio.json. Ele reúne uma variedade de trilhas com foco em carreiras e tecnologias, como:

- IA e agentes
- automação com IA
- ciência de dados
- Java e Spring
- .NET e C#
- Python e APIs
- frontend React e Angular
- mobile Android com Kotlin
- entre outras áreas

### Informações presentes no catálogo

Cada trilha inclui, em geral:

- nome;
- tecnologias relacionadas;
- nível;
- módulos;
- conteúdos por módulo;
- estimativa total de horas;
- fonte;
- observação sobre ser um currículo sugerido e não uma formação oficial confirmada.

> O catálogo foi desenhado para ser uma referência de estudo, não uma garantia de certificação oficial da DIO.

---

## Prompts personalizados do Copilot

Os prompts customizados ficam em .github/prompts e são usados no Copilot Chat como comandos de estudo.

### 1) /trilha

Arquivo: .github/prompts/trilha.prompt.md

Uso:

```text
/trilha Python
/trilha React
/trilha Java
```

Função:

- consulta o catálogo local;
- busca a trilha correspondentes à tecnologia;
- mostra nome, nível, módulos e fontes;
- pede escolha quando há ambiguidades;
- nunca inventa módulos.

Regra importante:

- a resposta deve usar somente dados do JSON;
- não afirmar que a trilha é uma formação oficial da DIO;
- indicar que a trilha é sugerida e precisa ser conferida na fonte original.

### 2) /desafio

Arquivo: .github/prompts/desafio.prompt.md

Uso:

```text
/desafio Python iniciante
/desafio Java intermediário
/desafio React avançado
```

Função:

- gera um desafio de código em português;
- adapta o nível da dificuldade;
- varia o tipo de problema;
- inclui objetivo, requisitos, critérios de avaliação e casos de teste;
- não entrega a solução implementada.

### 3) /certificado

Arquivo: .github/prompts/certificado.prompt.md

Uso:

```text
/certificado Ana Silva AI Agent Builder
/certificado João Backend Java
```

Função:

- gera um certificado fictício em Markdown;
- identifica claramente que não tem validade oficial;
- usa nome e trilha informados;
- não usa logotipo nem texto que sugira reconhecimento oficial.

> Esse recurso é visual e didático; deve ser usado com transparência e sem confundir com uma credencial real.

---

## Servidor MCP

O projeto também incorpora um servidor MCP em TypeScript localizado em mcp/.

### O que ele faz

O servidor expõe ferramentas e prompts para clientes MCP, incluindo:

- listar_tecnologias
- buscar_trilha
- gerar_certificado
- criar_desafio

### Tecnologias do servidor

- TypeScript
- Node.js
- @modelcontextprotocol/server
- Express
- Zod

### Modo padrão: stdio

No diretório mcp/:

```powershell
npm install
npm run dev
```

Esse modo é usado quando o cliente também executa o processo localmente. O arquivo .vscode/mcp.json já aponta esse caminho para o VS Code usar o servidor MCP do projeto.

### Modo HTTP local

Para uso em HTTP local com token bearer:

```powershell
$env:MCP_BEARER_TOKEN = 'gere-um-segredo-aleatorio-com-pelo-menos-32-caracteres'
npm run start:http
```

Endpoint local:

- http://127.0.0.1:3000/mcp
- health check em /health

Esse modo é útil para testes locais em clientes HTTP compatíveis com MCP, mas não deve ser exposto publicamente sem proteção adequada.

### Recomendação de segurança

- não publicar sem TLS/HTTPS;
- usar proxy reverso e secrets seguros;
- preferir autenticação forte para ambientes externos;
- manter o servidor em uma rede controlada em desenvolvimento.

---

## Modos de uso do projeto

### Modo 1: uso no Copilot Chat com prompts personalizados

Esse é o uso mais simples e direto.

Exemplos:

```text
/trilha Python
/desafio Java intermediário
/certificado Maria Oliveira
```

Vantagens:

- rápido;
- sem configuração extra;
- ótimo para estudar em contexto de chat.

### Modo 2: uso do servidor MCP local via VS Code

O arquivo .vscode/mcp.json conecta o editor ao servidor MCP local. Isso permite que ferramentas e prompts fiquem disponíveis para clientes e agentes compatíveis.

Vantagens:

- integração nativa com contexto do projeto;
- acesso direto ao catálogo local;
- expansão de ferramentas com baixo acoplamento.

### Modo 3: uso HTTP local do MCP

Útil para ambiente de desenvolvimento e testes integrados com clientes externos ou ferramentas que se comunicam via HTTP.

Vantagens:

- mais parecido com ambiente de produção;
- mais fácil para testar autenticação e transporte;
- bom para extensões futuras.

### Modo 4: uso como base para aprendizagem prática

O projeto também serve como laboratório de aprendizagem para:

- estudar arquitetura de servidores;
- entender como prompts e ferramentas podem interagir;
- praticar documentação e organização de projetos;
- criar uma rotina de estudo com desafios e trilhas.

---

## Dicas de uso

### 1) Use tecnologias específicas e claras

Quando consultar uma trilha, prefira nomes bem definidos, como:

- Python
- Java
- React
- C#
- Node.js

Evite termos vagos, como "backend" ou "programação web" soltos, porque a busca pode resultar em ambiguidades.

### 2) Entenda que o catálogo é uma referência, não a verdade absoluta

As trilhas são sugeridas e baseadas em materiais públicos e catalogados. O valor real está na organização, na visão de carreira e na estrutura da aprendizagem.

### 3) Use o desafio para praticar, não para copiar

O foco do prompt /desafio é exercitar raciocínio, análise e escrita de código. A melhor prática é tentar resolver antes de pedir ajuda.

### 4) Respeite o limite de certificados fictícios

O certificado do projeto foi criado para fins ilustrativos. Não deve ser usado como prova oficial de conclusão. Deve ficar claro que é uma artefativa de estudo ou apresentação.

### 5) Considere os módulos da trilha como caminho, não como camisa de força

O catálogo mostra uma sequência lógica, mas o aprendizado real é individual. Você pode adaptar a ordem para o seu ritmo, projeto pessoal ou objetivo profissional.

### 6) Sempre confira a fonte original

As fontes do catálogo devem ser consultadas antes de tomar decisões importantes, como curso, investimento, tempo de estudo ou assinatura.

---

## Insights para futuros profissionais

### 1) Aprendizado guiado com IA

A IA pode ser usada para acelerar o início de um estudo, mas não para substituir a execução prática. O valor real vem da resolução de problemas, do código escrito e da reflexão sobre erros.

### 2) Organização é parte do aprendizado

Projetos como este ensinam algo que muitas vezes fica invisível: a qualidade de um ambiente de estudo depende de estrutura, catalogação, clareza e objetivos bem definidos.

### 3) A documentação é habilidade profissional

Criar prompts, escrever instruções, documentar fluxos e registrar decisões faz parte do trabalho de engenharia e de produtos digitais. O projeto demonstra isso de forma direta.

### 4) O desenvolvimento de ferramentas não precisa começar grande

Commits, scripts, prompts, catálogo e servidor local já formam uma base funcional. Esse tipo de escopo é excelente para aprender arquitetura, integração e organização sem precisar partir de um sistema enorme.

### 5) O papel da ética e da transparência

Gerar certificados fictícios exige cuidado. O projeto comunica claramente que não é oficial, talvez inspirando uma postura de responsabilidade no uso de IA e de artefatos derivados.

### 6) A transição de aprendizado para portfólio

Uma trilha ou desafio pode ser transformado em:

- projeto pessoal;
- repositório de estudo;
- documentação técnica;
- demonstração de fluxo com IA;
- material para entrevistas e portfólio.

Essa é uma excelente forma de mostrar evolução profissional com evidências concretas.

---

## Boas práticas para evolução futura

### Sugestões de próximos passos

- ampliar o catálogo com mais tecnologias e setores;
- incluir filtros por nível e área de interesse;
- criar ranking de trilhas por dificuldade;
- adicionar suporte a integração de links externos;
- implementar endpoints extras para busca por módulos e tópicos;
- gerar relatórios de progresso para alunos;
- criar uma interface web simples para consultar o catálogo.

### Estrutura de contribuição

- manter o catálogo em JSON consistente;
- validar prompts antes de publicar;
- documentar mudança de comportamento do MCP;
- manter a distinção entre material sugerido e material oficial;
- priorizar clareza, linguagem acessível e foco prático.

---

## Resumo executivo

Este projeto reúne três pilares importantes:

1. organização do aprendizado;
2. automação de apoio ao estudo;
3. experimentação prática com MCP e IA.

Ele funciona como uma base útil para quem quer aprender tecnologia com mais foco, sem depender apenas de conteúdo disperso na internet. Também funciona como um exemplo de como transformar um conjunto de materiais em um ambiente de estudo estruturado e reutilizável.

---

## Conclusão

O repositório BOB mostra que o aprendizado e a automação podem andar juntos. Ao combinar catálogo, prompts e MCP, o projeto cria um ecossistema simples, útil e extensível para estudo, investigação e evolução profissional.

A maior lição é que ferramentas inteligentes devem servir ao processo humano, e não substituí-lo. O objetivo é apoiar a curiosidade, a prática e a construção de conhecimento de forma honesta, documental e profissional.
