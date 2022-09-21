<h1 align='center'>dochelper</h1>

<div align='center'>
  <a href='https://www.npmjs.com/package/dochelper'>
    <img src='https://img.shields.io/npm/v/dochelper'>
  </a>
  <a href='https://github.com/ArturMiguel/dochelper'>
    <img src='https://img.shields.io/npm/l/dochelper'>
  </a>
  <a href='https://www.npmjs.com/package/dochelper'>
    <img src='https://img.shields.io/npm/dt/dochelper'>
  </a>
  <h3>
    Bibilioteca para validar, gerar e formatar CPF e CNPJ.
  </h3>
</div>

<hr>

> Possui definições de tipo para o TypeScript.

# Instalação


```
npm install dochelper
```

```js
// CommonJS
const dochelper = require("dochelper");

// ES6
import * as dochelper from "dochelper";
```

# Módulos

## CPF

<b>dochelper.CPF.validate(str: string)</b>

Retorna se o CPF é válido. A entrada pode ser com ou sem máscara.

```js
console.log(dochelper.CPF.validate('111.444.777-35')); 
// true
console.log(dochelper.CPF.validate('11144477735')) 
// true
console.log(dochelper.CPF.validate('111.444.777-31')); 
// false
```

<b>dochelper.CPF.generate(formatted?: boolean)</b>

Retorna um CPF válido gerado randomicamente. Para gerar com máscara, informe "true" como parâmetro da função.

```js
console.log(dochelper.CPF.generate()); 
// e.g. 67152064229
console.log(dochelper.CPF.generate(true)); 
// e.g. 755.506.286-00
```

<b>dochelper.CPF.format(str: string)</b>

Retorna a entrada formatada como CPF. 

> Irá retornar nulo se sua entrada estiver fora do padrão de um CPF com/sem máscara.


```js
console.log(dochelper.CPF.format('11144477735')); 
// 111.444.777-35
```

<b>dochelper.CPF.unformat(str: string)</b>

Retorna a entrada sem a formatação de CPF. 

> Irá retornar nulo se sua entrada estiver fora do padrão de um CPF com/sem máscara.


```js
console.log(dochelper.CPF.unformat('111.444.777-35')); 
// 11144477735
```

## CNPJ


<b>dochelper.CNPJ.validate(str: string)</b>

Retorna se o CNPJ é válido. A entrada pode ser com ou sem máscara.

```js
console.log(dochelper.CNPJ.validate('11.444.777/0001-61')); 
// true
console.log(dochelper.CNPJ.validate('11444777000161')); 
// true
console.log(dochelper.CNPJ.validate('11.444.777/0001-62')); 
// false
console.log(dochelper.CNPJ.validate('11444777000162')); 
// false
```

<b>dochelper.CNPJ.generate(formatted?: boolean)</b>

Retorna um CNPJ válido gerado randomicamente. Para gerar com máscara, informe "true" como parâmetro da função.


```js
console.log(dochelper.CNPJ.generate()); 
// e.g 33213356108109
console.log(dochelper.CNPJ.generate(true)); 
// e.g. 35.834.446/5742-91
```

<b>dochelper.CNPJ.format(str: string)</b>

Retorna a entrada formatada como CPF. 

> Irá retornar nulo se sua entrada estiver fora do padrão de um CPF com/sem máscara.

```js
console.log(dochelper.CNPJ.format('11444777000161')); 
// 11.444.777/0001-61
```

<b>dochelper.CNPJ.unformat(str: string)</b>

Retorna a entrada sem a formatação de CPF. 

> Irá retornar nulo se sua entrada estiver fora do padrão de um CPF com/sem máscara.

```js
console.log(dochelper.CNPJ.unformat('11.444.777/0001-61')); 
// 11444777000161
```
# Licença

O código fonte está disponibilizado conforme a [licença MIT](./LICENSE).