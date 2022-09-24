import { IDocument } from "./IDocument";

const formattedCPFRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
const unFormattedCPFRegex = /^(\d{3})(\d{3})(\d{3})(\d{2})/;

class CPF implements IDocument {
  generate(formatted?: boolean): string {
    let CPF = "";
    for (let i = 0; i < 9; i++) {
      CPF += Math.floor(Math.random() * 9);
    }

    CPF += calcDigits(CPF);
    return formatted ? this.format(CPF) : CPF;
  }

  validate(str: string): boolean {
    let _str = this.format(str);
    if (_str) {
      if (formattedCPFRegex.test(_str)) {
        _str = str.replace(/[^\d]/g, "");
      }
      if (verifyIfAllDigitsIsEquals(_str)) {
        return false
      }
      return calcDigits(_str) === `${_str[9]}${_str[10]}`;
    }
    return false;
  }

  format(str: string): string {
    if (unFormattedCPFRegex.test(str)) {
      return str.replace(unFormattedCPFRegex, "$1.$2.$3-$4");
    } else if (formattedCPFRegex.test(str)) {
      return str;
    }
    return null;
  }

  unformat(str: string): string {
    if (unFormattedCPFRegex.test(str)) {
      return str;
    } else if (formattedCPFRegex.test(str)) {
      return str.replace(/[^0-9]/g, "");
    }
    return null;
  }
}

function verifyIfAllDigitsIsEquals(str: string): boolean {
  return str.split("").every((char: string, index: number, array: string[]) => {
    return char === array[0]
  })
}
// Cálculo baseado no algoritmo módulo 11
function calcDigits(str: string): string {
  let digit1 = 0;
  let digit2 = 0;
  let w = 10; // Peso
  let rest = 0;

  for (let i = 0; i < 9; i++) {
    digit1 += parseInt(str[i]) * w--;
  }

  rest = digit1 % 11;
  rest < 2 ? digit1 = 0 : digit1 = 11 - rest;
  str += digit1;

  w = 11;
  for (let i = 0; i < 10; i++) {
    digit2 += parseInt(str[i]) * w--;
  }

  rest = digit2 % 11;
  rest < 2 ? digit2 = 0 : digit2 = 11 - rest;

  return `${digit1}${digit2}`;
}

export = new CPF();