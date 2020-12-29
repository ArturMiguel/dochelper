import { IDocument } from './IDocument';

const formattedCNPJRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}/;
const unFormattedCNPJRegex = /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/;

class CNPJDocument implements IDocument {
  generate(formatted?: boolean): string {
    let CNPJ = '';
    for (let i = 0; i < 12; i++) {
      CNPJ += Math.floor(Math.random() * 9);
    }

    CNPJ += calcDigits(CNPJ);
    return formatted ? this.format(CNPJ) : CNPJ;
  }

  validate(CNPJ: string): boolean {
    let _CNPJ = this.format(CNPJ);
    if (_CNPJ) {
      if (formattedCNPJRegex.test(_CNPJ)) {
        _CNPJ = CNPJ.replace(/[^\d]/g, '');
      }
      return calcDigits(_CNPJ) === `${_CNPJ[12]}${_CNPJ[13]}`;
    }
    return false;
  }

  format(CNPJ: string): string {
    if (unFormattedCNPJRegex.test(CNPJ)) {
      return CNPJ.replace(unFormattedCNPJRegex, '$1.$2.$3/$4-$5');
    } else if (formattedCNPJRegex.test(CNPJ)) {
      return CNPJ;
    }
    return null;
  }

  unformat(CNPJ: string): string {
    if (unFormattedCNPJRegex.test(CNPJ)) {
      return CNPJ;
    } else if (formattedCNPJRegex.test(CNPJ)) {
      return CNPJ.replace(/[^0-9]/g, '');
    }
    return null;
  }
}

// Cálculo baseado no algoritmo módulo 11
function calcDigits(CNPJ: string): string {
  let digit1 = 0;
  let digit2 = 0;
  let w = 5;

  for (let i = 0; i < 12; i++) {
    digit1 += parseInt(CNPJ[i]) * w--;
    if (w === 1) {
      w = 9;
    }
  }

  let rest = digit1 % 11;
  rest < 2 ? digit1 = 0 : digit1 = 11 - rest;
  CNPJ += digit1;

  w = 6;
  for (let i = 0; i < 13; i++) {
    digit2 += parseInt(CNPJ[i]) * w--;
    if (w === 1) {
      w = 9;
    }
  }

  rest = digit2 % 11;
  rest < 2 ? digit2 = 0 : digit2 = 11 - rest;

  return `${digit1}${digit2}`;
}

export = new CNPJDocument();