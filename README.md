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
    Biblioteca para validar, gerar e formatar CPF e CNPJ.
  </h3>
</div>

<hr>

## Instalação

- NPM

```
npm i dochelper
```

- Yarn
```
yarn add dochelper
```

## Importação

```js
// CommonJS
const dochelper = require('dochelper');

// ES6
import * as dochelper from 'dochelper';
```

## Uso

- CPF
```js
console.log(dochelper.CPF.validate('111.444.777-35'));
// true
console.log(dochelper.CPF.validate('11144477735'));
// true
console.log(dochelper.CPF.validate('111.444.777-31'));
// false
console.log(dochelper.CPF.validate('11144477731'));
// false
console.log(dochelper.CPF.generate());
// 67152064229
console.log(dochelper.CPF.generate(true));
// 755.506.286-00
console.log(dochelper.CPF.format('11144477735'));
// 111.444.777-35
console.log(dochelper.CPF.unformat('111.444.777-35'));
// 11144477735
```

- CNPJ
```js
console.log(dochelper.CNPJ.validate('11.444.777/0001-61'));
// true
console.log(dochelper.CNPJ.validate('11444777000161'));
// true
console.log(dochelper.CNPJ.validate('11.444.777/0001-62'));
// false
console.log(dochelper.CNPJ.validate('11444777000162'));
// false
console.log(dochelper.CNPJ.generate());
// 33213356108109
console.log(dochelper.CNPJ.generate(true));
// 35.834.446/5742-91
console.log(dochelper.CNPJ.format('11444777000161'));
// 11.444.777/0001-61
console.log(dochelper.CNPJ.unformat('11.444.777/0001-61'));
// 11444777000161
```

## Licença

[MIT](./LICENSE)