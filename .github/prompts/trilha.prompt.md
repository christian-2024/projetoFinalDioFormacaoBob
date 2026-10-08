---
name: trilha
description: Mostra o plano de estudos de uma tecnologia usando o catálogo local da DIO.
argument-hint: tecnologia
---

Monte um plano de estudos a partir do catálogo `data/trilhas_dio.json` deste workspace.

Tecnologia informada: `${input:tecnologia:Digite uma tecnologia, por exemplo Python, Java ou React}`

Leia o arquivo JSON antes de responder. Procure correspondências sem diferenciar maiúsculas de minúsculas entre o valor informado e os itens do campo `tecnologia` das trilhas. Considere correspondência parcial apenas quando ela identificar uma única trilha.

Se houver mais de uma trilha correspondente, apresente os nomes e tecnologias dessas trilhas e peça que a pessoa escolha uma. Se não houver correspondência, informe que a tecnologia não foi encontrada e sugira algumas tecnologias existentes no catálogo. Não invente módulos nem atribua uma trilha incorreta.

Para uma correspondência única, responda em português do Brasil com:
- nome da trilha;
- nível indicado e tecnologias relacionadas;
- estimativa total de horas;
- módulos na ordem do catálogo, com cada conteúdo listado;
- fonte e uma nota de que o currículo é sugerido e deve ser conferido na fonte.

Use somente informações presentes no JSON. Não invente duração por módulo nem afirme que a trilha é uma formação oficial da DIO.