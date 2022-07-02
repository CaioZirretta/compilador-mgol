export type Token = {
	classe: TokenClasse;
	lexema: string;
	tipo: TokenTipo | string | null;
};

export const enum TokenClasse {
	Num = "Num",
	Lit = "Lit",
	id = "id",
	Comentario = "Comentario",
	EOF = "EOF",
	OPR = "OPR",
	RCB = "RCB",
	OPM = "OPM",
	AB_P = "AB_P",
	FC_P = "FC_P",
	PT_V = "PT_V",
	ERRO = "ERRO",
	Vir = "Vir",

	inicio = "inicio",
	varinicio = "varinicio",
	varfim = "varfim",
	escreva = "escreva",
	leia = "leia",
	se = "se",
	entao = "entao",
	fimse = "fimse",
	repita = "repita",
	fimRepita = "fimRepita",
	fim = "fim",
	inteiro = "inteiro",
	literal = "literal",
	real = "real",
}

export const enum TokenTipo {
	Inteiro = "inteiro",
	Real = "real",
	Literal = "literal",
	Nulo = "nulo",
}

export const TokenList: Token[] = [];
