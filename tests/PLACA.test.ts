import PLACA from "../lib/PLACA";

describe("CPF", () => {
  test("Testa placa brasileira válida", () => {
    expect(PLACA.br.validate("BFG-5218")).toBeTruthy();
  });

  test("Testa placa brasileira inválida", () => {
    expect(PLACA.br.validate("BFGXx-5319")).toBeFalsy();
  })

  test("Testa placa brasileira inválida (apenas números)", () => {
    expect(PLACA.br.validate("21595319")).toBeFalsy();
  })

  test("Testa placa brasileira inválida (apenas letras)", () => {
    expect(PLACA.br.validate("ABCEFGH")).toBeFalsy();
  })

  test("Testa placa brasileira válida sem máscara", () => {
    expect(PLACA.br.validate("aiJ2156")).toBeTruthy();
  })

  test("Testa placa brasileira inválida (invertendo a máscara)", () => {
    expect(PLACA.br.validate("5218-ACT")).toBeFalsy();
  });

  test("Testa formatação de placa já formatada", () => {
    expect(PLACA.br.format("AZT-2210")).toBe("AZT-2210");
  })

  test("Testa formatação de placa não formatada", () => {
    expect(PLACA.br.format("AZT2210")).toBe("AZT-2210");
  })

  test("Testa formatação de placa fora do formato", () => {
    expect(PLACA.br.format("AZTI2210")).toBe(null);
  })

  test("Gera placa válida sem máscara", () => {
    expect(PLACA.br.validate(PLACA.br.generate())).toBeTruthy();
  });

  test("Gera placa válida com máscara", () => {
    expect(PLACA.br.validate(PLACA.br.generate(true))).toBeTruthy();
  });

  test("Gera placa válida com máscara e retira a máscara", () => {
    expect(PLACA.br.validate(PLACA.br.unformat(PLACA.br.generate(true)))).toBeTruthy();
  });

  test("Testa retirada da máscara de uma string formatada", () => {
    expect(PLACA.br.unformat("LKC-2223")).toBe("LKC2223");
  })

  test("Testa retirada da máscara de uma string não formatada", () => {
    expect(PLACA.br.unformat("LKC2223")).toBe("LKC2223");
  })

  test("Testa retirada da máscara de uma string fora do formato de placa", () => {
    expect(PLACA.br.unformat("LKC-22238")).toBe(null);
  })
});