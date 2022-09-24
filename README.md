<div align="center">
  <h1>dochelper</h1>
  <p>Biblioteca para validar, gerar e formatar CPF, CNPJ e outras identificações.</p>
  
  [![npm version](https://img.shields.io/npm/v/dochelper)](https://www.npmjs.com/package/dochelper)
  [![npm downloads](https://img.shields.io/npm/dt/dochelper)](https://www.npmjs.com/package/dochelper)
  [![license](https://img.shields.io/npm/l/dochelper)](./LICENSE)
</div>


## Features

- [CPF](#cpf) - Validação, geração e formatação de CPF.
- [CNPJ](#cnpj) - Validação, geração e formatação de CNPJ.
- [PLACA](#placa) - Validação, geração e formatação de placas veículares brasileiras (ABC-1234).

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


| Função | Exemplo | Saída |
| -------- | -------- | -------- |
| validate  | `dochelper.CNPJ.validate(str: string)` | Retorna se o CNPJ é válido. A entrada pode ser com ou sem máscara. |
| generate  | `dochelper.CNPJ.generate(formatted?: boolean)` | Retorna um CNPJ válido gerado randomicamente. |
| format  | `dochelper.CNPJ.format(str: boolean)` | Retorna a entrada formatada como CNPJ.  |
| unformat  | `dochelper.CNPJ.unformat(str: string)` | Retorna a entrada sem a formatação de CNPJ. |

> "format" e "unformat" retornam nulo se a entrada estiver fora do padrão de um CNPJ com/sem máscara.

### PLACA

Modelo brasileiro (ABC-1234)

| Função | Exemplo | Saída |
| -------- | -------- | -------- |
| validate  | `dochelper.PLACA.br.validate(str: string)` | Retorna se a placa está no formato válido. A entrada pode ser com ou sem máscara. |
| generate  | `dochelper.PLACA.br.generate(formatted?: boolean)` | Retorna uma placa válida gerada randomicamente. |
| format  | `dochelper.PLACA.br.format(str: boolean)` | Retorna a entrada formatada no modelo de placa ABC-1234.  |
| unformat  | `dochelper.PLACA.br.unformat(str: string)` | Retorna a entrada sem a formatação de placa. |

> "format" e "unformat" retornam nulo se a entrada estiver fora do padrão de placa veicular ABC-1234.

## Licença

O código fonte está disponibilizado conforme a [licença MIT](./LICENSE).