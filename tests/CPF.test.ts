import CPF from "../lib/CPF";

describe("CPF", () => {
  test("Testa CPF valido", () => {
    expect(CPF.validate("111.444.777-35")).toBeTruthy();
  });

  test("Testa CPF inválido", () => {
    expect(CPF.validate("111.444.777-33")).toBeFalsy();
  });

  test("Testa CPF inválido quanto todos números estão iguais", () => {
    expect(CPF.validate("111.111.111-11")).toBeFalsy();
  })

  test("Gera CPF valido", () => {
    expect(CPF.validate(CPF.generate())).toBeTruthy();
  });

  test("Gera CPF formatado", () => {
    expect(/^\d{3}\.\d{3}\.\d{3}\-\d{2}/.test(CPF.generate(true)));
  });

  test("Gera CPF não formatado", () => {
    expect(/^\d{11}/.test(CPF.generate()));
  });

  test("Retira a pontuação de CPF formatado", () => {
    expect(CPF.unformat("111.444.777-35")).toBe("11144477735");
  });

  test("Testa retirada da máscara de uma string fora do formato de CPF", () => {
    expect(CPF.unformat("111.444.777-356")).toBe(null);
  })
});