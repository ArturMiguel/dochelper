export interface IDocument {
  generate(formatted?: boolean): string;
  validate(CNPJ: string): boolean;
  format(CPF: string): string;
  unformat(CNPJ: string): string;
}