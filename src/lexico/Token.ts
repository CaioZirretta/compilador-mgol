export type Token = {
	Classe: String;
	Lexema: String;
	Tipo: TokenType;
};

export enum TokenType {
	Inteiro = "inteiro",
	Real = "real",
	Literal = "literal",
	Nulo = "nulo",
}

export const TokenList: Token[] = [
    { Classe: "tipo1", Lexema: "palavra", Tipo: TokenType.Inteiro }
];
