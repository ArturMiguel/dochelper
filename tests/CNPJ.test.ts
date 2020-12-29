import CNPJ from '../lib/CNPJ';

describe('CNPJ', () => {
  test('Valida CNPJ valido', () => {
    expect(CNPJ.validate('11.444.777/0001-61')).toBeTruthy();
  });

  test('Valida CNPJ inválido', () => {
    expect(CNPJ.validate('11.444.777/0001-62')).toBeFalsy();
  });

  test('Gera CNPJ valido', () => {
    expect(CNPJ.validate(CNPJ.generate())).toBeTruthy();
  });

  test('Gera CNPJ formatado', () => {
    expect(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}/.test(CNPJ.generate(true)));
  });

  test('Gera CNPJ não formatado', () => {
    expect(/^\d{14}/.test(CNPJ.generate()));
  });

  test('Retira a pontuação de CNPJ formatado', () => {
    expect(CNPJ.unformat('11.444.777/0001-61')).toBe('11444777000161');
  });
});