export interface IDocument {
  generate(formatted?: boolean): string;
  validate(text: string): boolean;
  format(text: string): string;
  unformat(text: string): string;
}