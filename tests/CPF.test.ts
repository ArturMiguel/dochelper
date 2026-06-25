import CPF from "../lib/CPF";

describe("CPF - Validação módulo 11", () => {
  test("Valida CPF 111.444.777-35 (com máscara)", () => {
    expect(CPF.validate("111.444.777-35")).toBe(true);
  });

  test("Valida CPF 11144477735 (sem máscara)", () => {
    expect(CPF.validate("11144477735")).toBe(true);
  });

  test("Valida CPF 123.456.789-09 (1º dígito com resto < 2)", () => {
    expect(CPF.validate("123.456.789-09")).toBe(true);
  });

  test("Valida CPF 529.982.247-25", () => {
    expect(CPF.validate("529.982.247-25")).toBe(true);
  });

  test("Rejeita CPF com dígito verificador errado (111.444.777-33)", () => {
    expect(CPF.validate("111.444.777-33")).toBe(false);
  });

  test("Rejeita CPF com 1º dígito errado (123.456.789-19)", () => {
    expect(CPF.validate("123.456.789-19")).toBe(false);
  });

  test("Rejeita CPF com 2º dígito errado (529.982.247-26)", () => {
    expect(CPF.validate("529.982.247-26")).toBe(false);
  });
});

describe("CPF - Rejeição de dígitos repetidos", () => {
  const repetidos = [
    "000.000.000-00", "111.111.111-11", "222.222.222-22",
    "333.333.333-33", "444.444.444-44", "555.555.555-55",
    "666.666.666-66", "777.777.777-77", "888.888.888-88",
    "999.999.999-99",
  ];

  repetidos.forEach((cpf) => {
    test(`Rejeita CPF com todos os dígitos iguais (${cpf})`, () => {
      expect(CPF.validate(cpf)).toBe(false);
    });
  });
});

describe("CPF - Geração", () => {
  test("CPF gerado é sempre válido (100 iterações)", () => {
    for (let i = 0; i < 100; i++) {
      const cpf = CPF.generate();
      expect(CPF.validate(cpf)).toBe(true);
    }
  });

  test("CPF gerado sem máscara tem 11 dígitos numéricos", () => {
    expect(/^\d{11}$/.test(CPF.generate())).toBe(true);
  });

  test("CPF gerado com máscara segue o formato XXX.XXX.XXX-XX", () => {
    expect(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/.test(CPF.generate(true))).toBe(true);
  });
});

describe("CPF - Formatação", () => {
  test("Formata CPF sem máscara", () => {
    expect(CPF.format("11144477735")).toBe("111.444.777-35");
  });

  test("Retorna CPF já formatado inalterado", () => {
    expect(CPF.format("111.444.777-35")).toBe("111.444.777-35");
  });

  test("Retorna null para string fora do padrão", () => {
    expect(CPF.format("1114447773")).toBe(null);
  });

  test("Retorna null para string com caracteres extras", () => {
    expect(CPF.format("111.444.777-356")).toBe(null);
  });
});

describe("CPF - Remoção de máscara", () => {
  test("Remove máscara de CPF formatado", () => {
    expect(CPF.unformat("111.444.777-35")).toBe("11144477735");
  });

  test("Retorna CPF sem máscara inalterado", () => {
    expect(CPF.unformat("11144477735")).toBe("11144477735");
  });

  test("Retorna null para string fora do formato", () => {
    expect(CPF.unformat("111.444.777-356")).toBe(null);
  });
});
