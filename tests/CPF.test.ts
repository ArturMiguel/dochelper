import CPF from '../lib/CPF';

describe('CPF', () => {
  test('Valida CPF valido', () => {
    expect(CPF.validate('111.444.777-35')).toBeTruthy();
  });

  test('Valida CPF inválido', () => {
    expect(CPF.validate('111.444.777-33')).toBeFalsy();
  });

  test('Valida CPF inválido quanto todos números estão iguais', () => {
    expect(CPF.validate('111.111.111-11')).toBeFalsy();
  })

  test('Gera CPF valido', () => {
    expect(CPF.validate(CPF.generate())).toBeTruthy();
  });

  test('Gera CPF formatado', () => {
    expect(/^\d{3}\.\d{3}\.\d{3}\-\d{2}/.test(CPF.generate(true)));
  });

  test('Gera CPF não formatado', () => {
    expect(/^\d{11}/.test(CPF.generate()));
  });

  test('Retira a pontuação de CPF formatado', () => {
    expect(CPF.unformat('111.444.777-35')).toBe('11144477735');
  });
});