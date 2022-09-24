import CNPJ from "../lib/CNPJ";

describe("CNPJ", () => {
  test("Testa CNPJ válido", () => {
    expect(CNPJ.validate("11.444.777/0001-61")).toBeTruthy();
  });

  test("Testa CNPJ inválido", () => {
    expect(CNPJ.validate("11.444.777/0001-62")).toBeFalsy();
  });

  test("Gera CNPJ válido", () => {
    expect(CNPJ.validate(CNPJ.generate())).toBeTruthy();
  });

  test("Gera CNPJ formatado", () => {
    expect(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}/.test(CNPJ.generate(true)));
  });

  test("Gera CNPJ não formatado", () => {
    expect(/^\d{14}/.test(CNPJ.generate()));
  });

  test("Retira a pontuação de CNPJ formatado", () => {
    expect(CNPJ.unformat("11.444.777/0001-61")).toBe("11444777000161");
  });

  test("Testa retirada da máscara de uma string fora do formato de CNPJ", () => {
    expect(CNPJ.unformat("11.444.777/0001-611")).toBe(null);
  })
});