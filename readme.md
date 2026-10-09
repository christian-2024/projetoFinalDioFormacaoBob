# Projeto DIO Estudos / BOB

Este workspace reúne uma base de estudo com trilhas de tecnologia, prompts personalizados para o Copilot Chat e um servidor MCP para consulta e automação local.

## Fluxos principais

- `/trilha`: informa uma tecnologia e retorna a trilha correspondente do catálogo em `data/trilhas_dio.json`.
- `/desafio`: gera um desafio de código em português, conforme tecnologia e nível selecionados.
- `/certificado`: cria um certificado fictício em Markdown, sem validade oficial.

Os prompts customizados estão em `.github/prompts/` e são reconhecidos pelo VS Code como comandos do Copilot.

## Servidor MCP

O projeto também inclui um servidor MCP em `mcp/`, com ferramentas como:

- `listar_tecnologias`
- `buscar_trilha`
- `gerar_certificado`
- `criar_desafio`

Consulte [mcp/README.md](mcp/README.md) para instalar e executar em modo `stdio` ou HTTP local. Para uso em produção ou acesso remoto, é necessário HTTPS, autenticação e governança de segredos.

## Documentação completa

A documentação detalhada do projeto, com prompts, modos de uso, dicas de uso, arquitetura e insights para futuros profissionais está em [docs/documentacao-projeto.md](docs/documentacao-projeto.md).

## Como usar rapidamente

```text
/trilha Python
/desafio Java intermediário
/certificado Ana Silva
```

## Observação

O material do catálogo é uma referência sugerida de estudo e deve ser conferido na fonte original antes de decisões importantes, como matrículas, inscrição ou avaliação acadêmica.
