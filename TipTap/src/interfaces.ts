export type TTokenType = "number" | "operator" | "function" | "variable"

export interface IToken {
    type: TTokenType;
    value: string;
    label?: string;
}
