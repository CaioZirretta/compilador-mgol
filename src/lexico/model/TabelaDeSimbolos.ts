import { Token, TokenClasse } from "./Token";

export const TabelaDeSimbolos: Token[] = [
	{ classe: TokenClasse.inicio, lexema: "inicio", tipo: "inicio" },
	{ classe: TokenClasse.varinicio, lexema: "varinicio", tipo: "varinicio" },
	{ classe: TokenClasse.varfim, lexema: "varfim", tipo: "varfim" },
	{ classe: TokenClasse.escreva, lexema: "escreva", tipo: "escreva" },
	{ classe: TokenClasse.leia, lexema: "leia", tipo: "leia" },
	{ classe: TokenClasse.se, lexema: "se", tipo: "se" },
	{ classe: TokenClasse.entao, lexema: "entao", tipo: "entao" },
	{ classe: TokenClasse.fimse, lexema: "fimse", tipo: "fimse" },
	{ classe: TokenClasse.repita, lexema: "repita", tipo: "repita" },
	{ classe: TokenClasse.fimrepita, lexema: "fimrepita", tipo: "fimrepita" },
	{ classe: TokenClasse.fim, lexema: "fim", tipo: "fim" },
	{ classe: TokenClasse.inteiro, lexema: "inteiro", tipo: "inteiro" },
	{ classe: TokenClasse.literal, lexema: "literal", tipo: "literal" },
	{ classe: TokenClasse.real, lexema: "real", tipo: "real" },
];

export function tabelaDeSimbolosLexemas(): string[] {
	return TabelaDeSimbolos.map((t) => t.lexema);
}

export function verificarDeclaracaoId(simbolo: string): boolean {
	const idTabela: Token = TabelaDeSimbolos.find(
		(s) => s.lexema === simbolo && s.tipo !== "nulo"
	)!;
	return idTabela ? true : false;
}

export function retornaSimboloPorTipo(lexema: string): Token {
	return TabelaDeSimbolos.filter((s) => {
		if (s.lexema === lexema) {
			return s;
		}
	})[0];
}
