export interface IDocument {
  generate(formatted?: boolean): string;
  validate(str: string): boolean;
  format(str: string): string;
  unformat(str: string): string;
}