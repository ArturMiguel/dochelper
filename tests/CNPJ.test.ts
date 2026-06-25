import CNPJ from "../lib/CNPJ";

describe("CNPJ numérico - Validação módulo 11", () => {
  test("Valida CNPJ numérico 11.444.777/0001-61 (com máscara)", () => {
    expect(CNPJ.validate("11.444.777/0001-61")).toBe(true);
  });

  test("Valida CNPJ numérico 11444777000161 (sem máscara)", () => {
    expect(CNPJ.validate("11444777000161")).toBe(true);
  });

  test("Valida CNPJ numérico 12.345.678/0001-95", () => {
    expect(CNPJ.validate("12.345.678/0001-95")).toBe(true);
  });

  test("Valida CNPJ numérico 11.222.333/0001-81", () => {
    expect(CNPJ.validate("11.222.333/0001-81")).toBe(true);
  });

  test("Rejeita CNPJ numérico com dígito verificador errado (11.444.777/0001-62)", () => {
    expect(CNPJ.validate("11.444.777/0001-62")).toBe(false);
  });

  test("Rejeita CNPJ numérico com 1º dígito errado (12.345.678/0001-85)", () => {
    expect(CNPJ.validate("12.345.678/0001-85")).toBe(false);
  });

  test("Rejeita CNPJ numérico com 2º dígito errado (11.222.333/0001-82)", () => {
    expect(CNPJ.validate("11.222.333/0001-82")).toBe(false);
  });
});

describe("CNPJ alfanumérico - Validação módulo 11", () => {
  test("Valida CNPJ alfanumérico 12.ABC.345/01DE-35 (exemplo oficial Receita Federal)", () => {
    expect(CNPJ.validate("12.ABC.345/01DE-35")).toBe(true);
  });

  test("Valida CNPJ alfanumérico sem máscara (12ABC34501DE35)", () => {
    expect(CNPJ.validate("12ABC34501DE35")).toBe(true);
  });

  test("Valida CNPJ alfanumérico com corpo predominantemente alfabético (AA.BBC.CDD/0001-86)", () => {
    expect(CNPJ.validate("AA.BBC.CDD/0001-86")).toBe(true);
  });

  test("Valida CNPJ alfanumérico com todas as posições Z (ZZ.ZZZ.ZZZ/ZZZZ-62)", () => {
    expect(CNPJ.validate("ZZ.ZZZ.ZZZ/ZZZZ-62")).toBe(true);
  });

  test("Rejeita CNPJ alfanumérico com dígito verificador errado (12.ABC.345/01DE-99)", () => {
    expect(CNPJ.validate("12.ABC.345/01DE-99")).toBe(false);
  });

  test("Rejeita CNPJ alfanumérico com 1º dígito errado (AA.BBC.CDD/0001-96)", () => {
    expect(CNPJ.validate("AA.BBC.CDD/0001-96")).toBe(false);
  });

  test("Rejeita CNPJ alfanumérico com 2º dígito errado (ZZ.ZZZ.ZZZ/ZZZZ-61)", () => {
    expect(CNPJ.validate("ZZ.ZZZ.ZZZ/ZZZZ-61")).toBe(false);
  });
});

describe("CNPJ alfanumérico - Case insensitive", () => {
  test("Valida CNPJ em minúsculas com máscara (12.abc.345/01de-35)", () => {
    expect(CNPJ.validate("12.abc.345/01de-35")).toBe(true);
  });

  test("Valida CNPJ em minúsculas sem máscara (12abc34501de35)", () => {
    expect(CNPJ.validate("12abc34501de35")).toBe(true);
  });

  test("Valida CNPJ em caixa mista (12.AbC.345/01dE-35)", () => {
    expect(CNPJ.validate("12.AbC.345/01dE-35")).toBe(true);
  });
});

describe("CNPJ - Entradas inválidas", () => {
  test("Rejeita string vazia", () => {
    expect(CNPJ.validate("")).toBe(false);
  });

  test("Rejeita string com menos de 14 caracteres", () => {
    expect(CNPJ.validate("12ABC34501DE3")).toBe(false);
  });

  test("Rejeita string com mais de 14 caracteres sem máscara", () => {
    expect(CNPJ.validate("12ABC34501DE350")).toBe(false);
  });

  test("Rejeita string com caracteres especiais no corpo", () => {
    expect(CNPJ.validate("12.AB!.345/01DE-35")).toBe(false);
  });

  test("Rejeita CNPJ com letras nos dígitos verificadores", () => {
    expect(CNPJ.validate("12.ABC.345/01DE-AB")).toBe(false);
  });
});

describe("CNPJ - Geração", () => {
  test("CNPJ gerado é sempre válido (100 iterações)", () => {
    for (let i = 0; i < 100; i++) {
      const cnpj = CNPJ.generate();
      expect(CNPJ.validate(cnpj)).toBe(true);
    }
  });

  test("CNPJ gerado sem máscara tem 14 caracteres alfanuméricos", () => {
    expect(/^[0-9A-Z]{14}$/.test(CNPJ.generate())).toBe(true);
  });

  test("CNPJ gerado com máscara segue o formato AA.AAA.AAA/AAAA-DD", () => {
    expect(/^[0-9A-Z]{2}\.[0-9A-Z]{3}\.[0-9A-Z]{3}\/[0-9A-Z]{4}\-\d{2}$/.test(CNPJ.generate(true))).toBe(true);
  });

  test("CNPJ gerado com máscara é válido", () => {
    for (let i = 0; i < 50; i++) {
      const cnpj = CNPJ.generate(true);
      expect(CNPJ.validate(cnpj)).toBe(true);
    }
  });
});

describe("CNPJ - Formatação", () => {
  test("Formata CNPJ numérico sem máscara", () => {
    expect(CNPJ.format("11444777000161")).toBe("11.444.777/0001-61");
  });

  test("Formata CNPJ alfanumérico sem máscara", () => {
    expect(CNPJ.format("12ABC34501DE35")).toBe("12.ABC.345/01DE-35");
  });

  test("Retorna CNPJ numérico já formatado inalterado", () => {
    expect(CNPJ.format("11.444.777/0001-61")).toBe("11.444.777/0001-61");
  });

  test("Retorna CNPJ alfanumérico já formatado inalterado", () => {
    expect(CNPJ.format("12.ABC.345/01DE-35")).toBe("12.ABC.345/01DE-35");
  });

  test("Formata CNPJ em minúsculas convertendo para maiúsculas", () => {
    expect(CNPJ.format("12abc34501de35")).toBe("12.ABC.345/01DE-35");
  });

  test("Retorna null para string fora do padrão (13 caracteres)", () => {
    expect(CNPJ.format("12ABC34501DE3")).toBe(null);
  });

  test("Retorna null para string fora do padrão (15 caracteres)", () => {
    expect(CNPJ.format("12ABC34501DE350")).toBe(null);
  });
});

describe("CNPJ - Remoção de máscara", () => {
  test("Remove máscara de CNPJ numérico", () => {
    expect(CNPJ.unformat("11.444.777/0001-61")).toBe("11444777000161");
  });

  test("Remove máscara de CNPJ alfanumérico", () => {
    expect(CNPJ.unformat("12.ABC.345/01DE-35")).toBe("12ABC34501DE35");
  });

  test("Retorna CNPJ numérico sem máscara inalterado", () => {
    expect(CNPJ.unformat("11444777000161")).toBe("11444777000161");
  });

  test("Retorna CNPJ alfanumérico sem máscara inalterado", () => {
    expect(CNPJ.unformat("12ABC34501DE35")).toBe("12ABC34501DE35");
  });

  test("Converte minúsculas para maiúsculas ao remover máscara", () => {
    expect(CNPJ.unformat("12.abc.345/01de-35")).toBe("12ABC34501DE35");
  });

  test("Retorna null para string fora do formato", () => {
    expect(CNPJ.unformat("11.444.777/0001-611")).toBe(null);
  });
});
