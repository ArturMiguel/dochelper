import { IDocument } from "./IDocument";

const formattedCNPJRegex = /^[0-9A-Z]{2}\.[0-9A-Z]{3}\.[0-9A-Z]{3}\/[0-9A-Z]{4}\-\d{2}$/;
const unFormattedCNPJRegex = /^([0-9A-Z]{2})([0-9A-Z]{3})([0-9A-Z]{3})([0-9A-Z]{4})(\d{2})$/;
const alphanumericChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

class CNPJ implements IDocument {
  generate(formatted?: boolean): string {
    let CNPJ = "";
    for (let i = 0; i < 12; i++) {
      CNPJ += alphanumericChars[Math.floor(Math.random() * alphanumericChars.length)];
    }

    CNPJ += calcDigits(CNPJ);
    return formatted ? this.format(CNPJ) : CNPJ;
  }

  validate(str: string): boolean {
    let _str = this.format(str);
    if (_str) {
      if (formattedCNPJRegex.test(_str)) {
        _str = _str.replace(/[^0-9A-Z]/g, "");
      }
      return calcDigits(_str) === `${_str[12]}${_str[13]}`;
    }
    return false;
  }

  format(str: string): string {
    let _str = str.toUpperCase();
    if (unFormattedCNPJRegex.test(_str)) {
      return _str.replace(unFormattedCNPJRegex, "$1.$2.$3/$4-$5");
    } else if (formattedCNPJRegex.test(_str)) {
      return _str;
    }
    return null;
  }

  unformat(str: string): string {
    let _str = str.toUpperCase();
    if (unFormattedCNPJRegex.test(_str)) {
      return _str;
    } else if (formattedCNPJRegex.test(_str)) {
      return _str.replace(/[^0-9A-Z]/g, "");
    }
    return null;
  }
}

// Converte caractere para valor numérico (ASCII - 48)
function charToValue(char: string): number {
  return char.charCodeAt(0) - 48;
}

// Cálculo baseado no algoritmo módulo 11
function calcDigits(str: string): string {
  let digit1 = 0;
  let digit2 = 0;
  let w = 5;

  for (let i = 0; i < 12; i++) {
    digit1 += charToValue(str[i]) * w--;
    if (w === 1) {
      w = 9;
    }
  }

  let rest = digit1 % 11;
  rest < 2 ? digit1 = 0 : digit1 = 11 - rest;
  str += digit1;

  w = 6;
  for (let i = 0; i < 13; i++) {
    digit2 += charToValue(str[i]) * w--;
    if (w === 1) {
      w = 9;
    }
  }

  rest = digit2 % 11;
  rest < 2 ? digit2 = 0 : digit2 = 11 - rest;

  return `${digit1}${digit2}`;
}

export = new CNPJ();