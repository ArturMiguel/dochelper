const formattedCPFRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}/;
const unFormattedCPFRegex = /^(\d{3})(\d{3})(\d{3})(\d{2})/;

export default {
  generate(formatted?: boolean): string {
    let CPF = '';
    for (let i = 0; i < 9; i++) {
      CPF += Math.floor(Math.random() * 9);
    }

    CPF += calcDigits(CPF);
    return formatted ? this.format(CPF) : CPF;
  },

  validate(CPF: string): boolean {
    let _CPF = this.format(CPF);
    if (_CPF) {
      if (formattedCPFRegex.test(_CPF)) {
        _CPF = CPF.replace(/[^\d]/g, '');
      }
      return calcDigits(_CPF) === `${_CPF[9]}${_CPF[10]}`;
    }
    return false;
  },

  format(CPF: string): string {
    if (unFormattedCPFRegex.test(CPF)) {
      return CPF.replace(unFormattedCPFRegex, '$1.$2.$3-$4');
    } else if (formattedCPFRegex.test(CPF)) {
      return CPF;
    }
    return null;
  },

  unformat(CPF: string): string {
    if (unFormattedCPFRegex.test(CPF)) {
      return CPF;
    } else if (formattedCPFRegex.test(CPF)) {
      return CPF.replace(/[^0-9]/g, '');
    }
    return null;
  }
}

// Cálculo baseado no algoritmo módulo 11
function calcDigits(CPF: string): string {
  let digit1 = 0;
  let digit2 = 0;
  let w = 10; // Peso
  let rest = 0;

  for (let i = 0; i < 9; i++) {
    digit1 += parseInt(CPF[i]) * w--;
  }

  rest = digit1 % 11;
  rest < 2 ? digit1 = 0 : digit1 = 11 - rest;
  CPF += digit1;

  w = 11;
  for (let i = 0; i < 10; i++) {
    digit2 += parseInt(CPF[i]) * w--;
  }

  rest = digit2 % 11;
  rest < 2 ? digit2 = 0 : digit2 = 11 - rest;

  return `${digit1}${digit2}`;
}