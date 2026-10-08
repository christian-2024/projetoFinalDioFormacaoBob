---
name: desafio
description: Gera um desafio de programação adequado à tecnologia e ao nível escolhidos.
argument-hint: tecnologia e nível
---

Crie um único desafio de código em português do Brasil. Escolha aleatoriamente um tipo de problema adequado à tecnologia e ao nível informados, variando o tema entre execuções. Não revele a solução nem o código completo.

Tecnologia: `${input:tecnologia:Digite a tecnologia, por exemplo Python, Java ou React}`
Nível: `${input:nivel:Escolha iniciante, intermediário ou avançado}`

Adapte o escopo ao nível: iniciante deve praticar fundamentos; intermediário deve combinar conceitos e tratar casos de borda; avançado deve incluir decisões de arquitetura, desempenho ou robustez quando fizer sentido. Se o nível for inválido ou ambíguo, peça esclarecimento em vez de presumir.

Apresente o desafio com título, contexto, objetivo, requisitos, restrições e exemplos de entrada e saída adequados à tecnologia. Inclua critérios verificáveis de conclusão e pelo menos três casos de teste, sem fornecer as respostas implementadas. Se a tecnologia não for adequada para executar código (por exemplo, HTML ou CSS isoladamente), formule a tarefa como implementação de interface e indique como verificar o resultado.