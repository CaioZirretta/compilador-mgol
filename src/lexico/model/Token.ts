export type Token = {
	classe: string;
	lexema: string;
	tipo: TokenType | string | null;
};

export enum TokenType {
	Inteiro = "inteiro",
	Real = "real",
	Literal = "literal",
	Nulo = "nulo",
}

export const TokenList: Token[] = [
];
