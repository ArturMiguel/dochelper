<div align="center">
  <h1>dochelper</h1>
  <p>Valida, formata e gera CPF e CNPJ.</p>

  [![npm version](https://img.shields.io/npm/v/dochelper)](https://www.npmjs.com/package/dochelper)
  [![npm downloads](https://img.shields.io/npm/dt/dochelper)](https://www.npmjs.com/package/dochelper)
  [![license](https://img.shields.io/npm/l/dochelper)](./LICENSE)
</div>

> **Aviso:** A partir de julho/2026, a Receita Federal passará a emitir CNPJs alfanuméricos (Instrução Normativa RFB nº 2.229/2024). Esta biblioteca já suporta validação, geração e formatação de CNPJs no novo formato, mantendo compatibilidade total com o formato numérico atual.

## Features

- [CPF](#cpf) - Validação, geração e formatação de CPF.
- [CNPJ](#cnpj) - Validação, geração e formatação de CNPJ (numérico e alfanumérico).

> Possui definições de tipo para o TypeScript.

## Instalação

```bash
npm install dochelper
```

## Utilização

```js
import * as dochelper from "dochelper";
// const dochelper = require("dochelper"); // CommonJS

console.log(dochelper.CPF.validate('111.444.777-35'));
// true
console.log(dochelper.CPF.generate());
// e.g. 67152064229
console.log(dochelper.CPF.format('11144477735'));
// 111.444.777-35
console.log(dochelper.CPF.unformat('111.444.777-35'));
// 11144477735

console.log(dochelper.CNPJ.validate('12.ABC.345/01DE-35'));
// true
console.log(dochelper.CNPJ.generate());
// e.g. A3B2C1D4E5F012
console.log(dochelper.CNPJ.format('12ABC34501DE35'));
// 12.ABC.345/01DE-35
```

## Módulos

### CPF


| Função | Exemplo | Saída |
| -------- | -------- | -------- |
| validate  | `dochelper.CPF.validate(str: string)` | Retorna se o CPF é válido. A entrada pode ser com ou sem máscara. |
| generate  | `dochelper.CPF.generate(formatted?: boolean)` | Retorna um CPF válido gerado randomicamente. |
| format  | `dochelper.CPF.format(str: boolean)` | Retorna a entrada formatada como CPF.  |
| unformat  | `dochelper.CPF.unformat(str: string)` | Retorna a entrada sem a formatação de CPF. |

> "format" e "unformat" retornam nulo se a entrada estiver fora do padrão de um CPF com/sem máscara.

### CNPJ

Suporta o formato numérico tradicional (`XX.XXX.XXX/XXXX-XX`) e o novo formato alfanumérico (`AA.AAA.AAA/AAAA-DD`), onde `A` pode ser dígito (0-9) ou letra maiúscula (A-Z) e `DD` são os dígitos verificadores numéricos calculados pelo módulo 11.

| Função | Exemplo | Saída |
| -------- | -------- | -------- |
| validate  | `dochelper.CNPJ.validate(str: string)` | Retorna se o CNPJ é válido. Aceita formato numérico ou alfanumérico, com ou sem máscara. |
| generate  | `dochelper.CNPJ.generate(formatted?: boolean)` | Retorna um CNPJ alfanumérico válido gerado randomicamente. |
| format  | `dochelper.CNPJ.format(str: string)` | Retorna a entrada formatada como CNPJ.  |
| unformat  | `dochelper.CNPJ.unformat(str: string)` | Retorna a entrada sem a formatação de CNPJ. |

> "format" e "unformat" retornam nulo se a entrada estiver fora do padrão de um CNPJ com/sem máscara.

## Licença

O código fonte está disponibilizado conforme a [licença MIT](./LICENSE).