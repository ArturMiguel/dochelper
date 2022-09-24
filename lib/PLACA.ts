import { IDocument } from './IDocument';

const formattedBrRegex = /^[A-Z]{3}\-\d{4}$/;
const unFormattedBrRegex = /^([A-Z]{3})(\d{4})/;

class PLACA {
  br: IDocument = {
    generate: function (formatted?: boolean): string {
      let str = "";
      for (let i = 1; i <= 7; i++) {
        if (i <= 3) {
          str += String.fromCharCode(64 + getRandomNumber(1, 26));
        } else {
          str += getRandomNumber(0, 9);
        }
      }
      return formatted ? this.format(str) : str.toUpperCase();
    },
    validate: function (str: string): boolean {
      let _str = str.toUpperCase()
      if (formattedBrRegex.test(_str)) {
        _str = this.unformat(_str);
      }
      return unFormattedBrRegex.test(_str);
    },
    format: function (str: string): string {
      let _str = str.toUpperCase();
      if (unFormattedBrRegex.test(_str)) {
        return _str.replace(unFormattedBrRegex, '$1-$2');
      } else if (formattedBrRegex.test(_str)) {
        return _str;
      }
      return null;
    },
    unformat: function (str: string): string {
      let _str = str.toUpperCase();
      if (unFormattedBrRegex.test(_str)) {
        return _str;
      } else if (formattedBrRegex.test(_str)) {
        return _str.replace(/[^A-Z0-9]/g, '');
      }
      return null;
    }
  }
}

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * max) + min;
}

export = new PLACA();