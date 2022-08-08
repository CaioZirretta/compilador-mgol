export type Token = {
	classe: TokenClasse | string;
	lexema: string;
	tipo: TokenTipo | string | null;
};

export enum TokenClasse {
	num = "num",
	lit = "lit",
	id = "id",
	comentario = "comentario",
	eof = "eof",
	opr = "opr",
	rcb = "rcb",
	opm = "opm",
	ab_p = "ab_p",
	fc_p = "fc_p",
	pt_v = "pt_v",
	erro = "erro",
	vir = "vir",

	inicio = "inicio",
	varinicio = "varinicio",
	varfim = "varfim",
	escreva = "escreva",
	leia = "leia",
	se = "se",
	entao = "entao",
	fimse = "fimse",
	repita = "repita",
	fimrepita = "fimrepita",
	fim = "fim",
	inteiro = "inteiro",
	literal = "literal",
	real = "real",
}

export enum TokenTipo {
	Inteiro = "inteiro",
	Real = "real",
	Literal = "literal",
	Nulo = "nulo",
}

export const TokenLista: Token[] = [];

export function encontrarTerminal(lexema: string): string {
	return Object.keys(TokenClasse)
		.filter((tc) => tc === lexema)
		.join();
}
