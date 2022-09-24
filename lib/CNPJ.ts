import { IDocument } from "./IDocument";

const formattedCNPJRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;
const unFormattedCNPJRegex = /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/;

class CNPJ implements IDocument {
  generate(formatted?: boolean): string {
    let CNPJ = "";
    for (let i = 0; i < 12; i++) {
      CNPJ += Math.floor(Math.random() * 9);
    }

    CNPJ += calcDigits(CNPJ);
    return formatted ? this.format(CNPJ) : CNPJ;
  }

  validate(str: string): boolean {
    let _str = this.format(str);
    if (_str) {
      if (formattedCNPJRegex.test(_str)) {
        _str = str.replace(/[^\d]/g, "");
      }
      return calcDigits(_str) === `${_str[12]}${_str[13]}`;
    }
    return false;
  }

  format(str: string): string {
    if (unFormattedCNPJRegex.test(str)) {
      return str.replace(unFormattedCNPJRegex, "$1.$2.$3/$4-$5");
    } else if (formattedCNPJRegex.test(str)) {
      return str;
    }
    return null;
  }

  unformat(str: string): string {
    if (unFormattedCNPJRegex.test(str)) {
      return str;
    } else if (formattedCNPJRegex.test(str)) {
      return str.replace(/[^0-9]/g, "");
    }
    return null;
  }
}

// Cálculo baseado no algoritmo módulo 11
function calcDigits(str: string): string {
  let digit1 = 0;
  let digit2 = 0;
  let w = 5;

  for (let i = 0; i < 12; i++) {
    digit1 += parseInt(str[i]) * w--;
    if (w === 1) {
      w = 9;
    }
  }

  let rest = digit1 % 11;
  rest < 2 ? digit1 = 0 : digit1 = 11 - rest;
  str += digit1;

  w = 6;
  for (let i = 0; i < 13; i++) {
    digit2 += parseInt(str[i]) * w--;
    if (w === 1) {
      w = 9;
    }
  }

  rest = digit2 % 11;
  rest < 2 ? digit2 = 0 : digit2 = 11 - rest;

  return `${digit1}${digit2}`;
}

export = new CNPJ();