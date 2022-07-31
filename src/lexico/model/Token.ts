export type Token = {
	classe: TokenClasse;
	lexema: string;
	tipo: TokenTipo | string | null;
};

export const enum TokenClasse {
	Num = "num",
	Lit = "lit",
	id = "id",
	comentario = "comentario",
	EOF = "eof",
	OPR = "opr",
	RCB = "rcb",
	OPM = "opm",
	AB_P = "ab_p",
	FC_P = "fc_p",
	PT_V = "pt_v",
	ERRO = "erro",
	Vir = "vir",

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

export const enum TokenTipo {
	Inteiro = "inteiro",
	Real = "real",
	Literal = "literal",
	Nulo = "nulo",
}

export const TokenLista: Token[] = [];
