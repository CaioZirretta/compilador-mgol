import { Digitos, Letras, Simbolos } from "../dicionario/Simbolos";
import { Token, TokenClasse, TokenTipo } from "./Token";
import { TokenUtils } from "../utils/TokenUtils";
import { AutomatoLexicoUtils } from "../utils/AutomatoLexicoUtils";

export type TransicoesType = [expr: string[], estado: (arquivo: string) => void];

export class AutomatoLexico {
	static indexAuxiliar: number = 0;
	static indexGeral: number = 0;

	static colunaInicial: number = 1;
	static coluna: number = 1;
	static linha: number = 1;

	static iniciar(arquivo: string): Token | void {
		console.log("\n============ Automato iniciando =============");
		return this.q0(arquivo);
	}

	static q0(arquivo: string): Token | void {
		AutomatoLexicoUtils.log(arquivo, "q0");
		AutomatoLexicoUtils.quebraDeLinha(arquivo);

		AutomatoLexico.indexAuxiliar = AutomatoLexico.indexGeral;

		const transicoes: TransicoesType[] = [
			[[" ", "\n", "\r"], AutomatoLexicoUtils.ignorar],
			[['"'], AutomatoLexico.q11],
			[["{"], AutomatoLexico.q14],
			[["<"], AutomatoLexico.q16],
			[[">"], AutomatoLexico.q18],
			[["="], AutomatoLexico.q19],
			[["*", "+", "-", "/"], AutomatoLexico.q20],
			[["("], AutomatoLexico.q21],
			[[")"], AutomatoLexico.q22],
			[[";"], AutomatoLexico.q23],
			[[","], AutomatoLexico.q24],
			[Digitos, AutomatoLexico.q1],
			[Letras, AutomatoLexico.q13],
		];

		const proximo = AutomatoLexicoUtils.proximoEstado(transicoes, arquivo[AutomatoLexico.indexGeral]);

		if (!proximo) {
			AutomatoLexico.indexGeral++;
			if (arquivo[AutomatoLexico.indexGeral - 1]) {
				return AutomatoLexicoUtils.erroContinuaLeitura(arquivo);
			}
			return TokenUtils.tokenEOF();
		}

		proximo === AutomatoLexicoUtils.ignorar ? 0 : AutomatoLexico.indexGeral++;
		return proximo(arquivo);
	}

	private static q1(arquivo: string) {
		AutomatoLexicoUtils.log(arquivo, "q1");
		AutomatoLexicoUtils.quebraDeLinha(arquivo);

		const transicoes: TransicoesType[] = [
			[Digitos, AutomatoLexico.q1],
			[[...Simbolos, " ", "\r", "\n"], TokenUtils.novoTokenInteiro],
			[["."], AutomatoLexico.q6],
			[["E", "e"], AutomatoLexico.q2],
			[Letras, AutomatoLexicoUtils.erroAteSimbolo],
		];

		const proximo = AutomatoLexicoUtils.proximoEstado(transicoes, arquivo[AutomatoLexico.indexGeral]);

		if (!arquivo[AutomatoLexico.indexGeral]) {
			return TokenUtils.novoTokenInteiro(arquivo);
		}

		if (!proximo) {
			return AutomatoLexicoUtils.erroAteSimbolo(arquivo);
		}

		proximo === TokenUtils.novoTokenInteiro ? null : AutomatoLexico.indexGeral++;
		return proximo(arquivo);
	}

	private static q2(arquivo: string) {
		AutomatoLexicoUtils.log(arquivo, "q2");
		AutomatoLexicoUtils.quebraDeLinha(arquivo);

		const transicoes: TransicoesType[] = [
			[Digitos, AutomatoLexico.q4],
			[["+"], AutomatoLexico.q3],
			[["-"], AutomatoLexico.q5],
			[[...Simbolos, ...Letras], AutomatoLexicoUtils.erroAteSimbolo],
			[[" ", "\r", "\n"], AutomatoLexicoUtils.erroContinuaLeitura],
		];

		const proximo = AutomatoLexicoUtils.proximoEstado(transicoes, arquivo[AutomatoLexico.indexGeral]);

		if (!proximo) {
			return AutomatoLexicoUtils.erroContinuaLeitura(arquivo);
		}

		proximo === AutomatoLexicoUtils.erroContinuaLeitura ? AutomatoLexico.indexGeral-- : null;
		return proximo(arquivo);
	}

	private static q3(arquivo: string) {
		AutomatoLexicoUtils.log(arquivo, "q3");
		AutomatoLexicoUtils.quebraDeLinha(arquivo);

		const transicoes: TransicoesType[] = [
			[Digitos, AutomatoLexico.q4],
			[[...Simbolos, ...Letras], AutomatoLexicoUtils.erroAteSimbolo],
			[[" ", "\r", "\n"], AutomatoLexicoUtils.erroContinuaLeitura],
		];

		const proximo = AutomatoLexicoUtils.proximoEstado(transicoes, arquivo[AutomatoLexico.indexGeral]);

		if (!proximo) {
			return AutomatoLexicoUtils.erroContinuaLeitura(arquivo);
		}

		AutomatoLexico.indexGeral++;
		return proximo(arquivo);
	}

	private static q4(arquivo: string) {
		AutomatoLexicoUtils.log(arquivo, "q4");
		AutomatoLexicoUtils.quebraDeLinha(arquivo);

		const transicoes: TransicoesType[] = [
			[Digitos, AutomatoLexico.q4],
			[[...Simbolos, " ", "\r", "\n"], TokenUtils.novoTokenInteiro],
			[Letras, AutomatoLexicoUtils.erroAteSimbolo],
		];

		const proximo = AutomatoLexicoUtils.proximoEstado(transicoes, arquivo[AutomatoLexico.indexGeral]);

		if (!proximo) {
			if (arquivo[AutomatoLexico.indexGeral]) {
				AutomatoLexico.indexGeral++;
				return AutomatoLexicoUtils.erroContinuaLeitura(arquivo);
			}
			return TokenUtils.novoTokenInteiro(arquivo);
		}

		proximo === TokenUtils.novoTokenInteiro ? null : AutomatoLexico.indexGeral++;
		return proximo(arquivo);
	}

	private static q5(arquivo: string) {
		AutomatoLexicoUtils.log(arquivo, "q5");
		AutomatoLexicoUtils.quebraDeLinha(arquivo);

		const transicoes: TransicoesType[] = [
			[Digitos, AutomatoLexico.q10],
			[[...Simbolos, ...Letras], AutomatoLexicoUtils.erroAteSimbolo],
			[[" ", "\r", "\n"], AutomatoLexicoUtils.erroContinuaLeitura],
		];

		const proximo = AutomatoLexicoUtils.proximoEstado(transicoes, arquivo[AutomatoLexico.indexGeral]);

		if (!proximo) {
			return AutomatoLexicoUtils.erroContinuaLeitura(arquivo);
		}

		AutomatoLexico.indexGeral++;
		return proximo(arquivo);
	}

	private static q6(arquivo: string) {
		AutomatoLexicoUtils.log(arquivo, "q6");
		AutomatoLexicoUtils.quebraDeLinha(arquivo);

		const transicoes: TransicoesType[] = [
			[Digitos, AutomatoLexico.q7],
			[[...Simbolos, ...Letras], AutomatoLexicoUtils.erroAteSimbolo],
			[[" ", "\r", "\n"], AutomatoLexicoUtils.erroContinuaLeitura],
		];

		const proximo = AutomatoLexicoUtils.proximoEstado(transicoes, arquivo[AutomatoLexico.indexGeral]);

		if (!proximo) {
			return AutomatoLexicoUtils.erroContinuaLeitura(arquivo);
		}

		AutomatoLexico.indexGeral++;
		return proximo(arquivo);
	}

	private static q7(arquivo: string) {
		AutomatoLexicoUtils.log(arquivo, "q7");
		AutomatoLexicoUtils.quebraDeLinha(arquivo);

		const transicoes: TransicoesType[] = [
			[Digitos, AutomatoLexico.q7],
			[["E", "e"], AutomatoLexico.q8],
			[[...Simbolos, " ", "\r", "\n"], TokenUtils.novoTokenReal],
			[Letras, AutomatoLexicoUtils.erroAteSimbolo],
		];

		const proximo = AutomatoLexicoUtils.proximoEstado(transicoes, arquivo[AutomatoLexico.indexGeral]);

		if (!proximo) {
			const token: Token = {
				classe: TokenClasse.Num,
				lexema: arquivo.substring(AutomatoLexico.indexAuxiliar, AutomatoLexico.indexGeral),
				tipo: TokenTipo.Real,
			};
			return token;
		}

		proximo === TokenUtils.novoTokenReal ? null : AutomatoLexico.indexGeral++;
		return proximo(arquivo);
	}

	private static q8(arquivo: string) {
		AutomatoLexicoUtils.log(arquivo, "q8");
		AutomatoLexicoUtils.quebraDeLinha(arquivo);

		const transicoes: TransicoesType[] = [
			[Digitos, AutomatoLexico.q10],
			[["+", "-"], AutomatoLexico.q9],
			[[...Simbolos, ...Letras], AutomatoLexicoUtils.erroAteSimbolo],
			[[" ", "\r", "\n"], AutomatoLexicoUtils.erroContinuaLeitura],
		];

		const proximo = AutomatoLexicoUtils.proximoEstado(transicoes, arquivo[AutomatoLexico.indexGeral]);

		if (!proximo) {
			return AutomatoLexicoUtils.erroContinuaLeitura(arquivo);
		}

		AutomatoLexico.indexGeral++;
		return proximo(arquivo);
	}

	private static q9(arquivo: string) {
		AutomatoLexicoUtils.log(arquivo, "q9");
		AutomatoLexicoUtils.quebraDeLinha(arquivo);

		const transicoes: TransicoesType[] = [
			[Digitos, AutomatoLexico.q9],
			[[...Simbolos, " ", "\r", "\n"], TokenUtils.novoTokenReal],
			[[...Letras], AutomatoLexicoUtils.erroAteSimbolo],
		];

		const proximo = AutomatoLexicoUtils.proximoEstado(transicoes, arquivo[AutomatoLexico.indexGeral]);

		if (!proximo) {
			if (arquivo[AutomatoLexico.indexGeral]) {
				AutomatoLexico.indexGeral++;
				return AutomatoLexicoUtils.erroContinuaLeitura(arquivo);
			}
			return TokenUtils.novoTokenReal(arquivo);
		}

		proximo === TokenUtils.novoTokenReal ? null : AutomatoLexico.indexGeral++;
		return proximo(arquivo);
	}

	private static q10(arquivo: string) {
		AutomatoLexicoUtils.log(arquivo, "q10");
		AutomatoLexicoUtils.quebraDeLinha(arquivo);

		const transicoes: TransicoesType[] = [
			[Digitos, AutomatoLexico.q10],
			[[...Simbolos, " ", "\r", "\n"], TokenUtils.novoTokenReal],
			[Letras, AutomatoLexicoUtils.erroAteSimbolo],
		];

		const proximo = AutomatoLexicoUtils.proximoEstado(transicoes, arquivo[AutomatoLexico.indexGeral]);

		if (!proximo) {
			if (arquivo[AutomatoLexico.indexGeral]) {
				AutomatoLexico.indexGeral++;
				return AutomatoLexicoUtils.erroContinuaLeitura(arquivo);
			}
			return TokenUtils.novoTokenReal(arquivo);
		}

		proximo === TokenUtils.novoTokenReal ? null : AutomatoLexico.indexGeral++;
		return proximo(arquivo);
	}

	private static q11(arquivo: string) {
		AutomatoLexicoUtils.log(arquivo, "q11");
		AutomatoLexicoUtils.quebraDeLinha(arquivo);

		const transicoes: TransicoesType[] = [
			[['"'], AutomatoLexico.q12],
			[[...Digitos, ...Letras, ...Simbolos, " ", "\r", "\n"], AutomatoLexico.q11],
		];

		const proximo = AutomatoLexicoUtils.proximoEstado(transicoes, arquivo[AutomatoLexico.indexGeral]);

		if (!proximo) {
			return AutomatoLexicoUtils.erroContinuaLeitura(arquivo);
		}

		AutomatoLexico.indexGeral++;
		return proximo(arquivo);
	}

	private static q12(arquivo: string) {
		AutomatoLexicoUtils.log(arquivo, "q12");
		AutomatoLexicoUtils.quebraDeLinha(arquivo);

		const token: Token = {
			classe: TokenClasse.Lit,
			lexema: arquivo.substring(AutomatoLexico.indexAuxiliar, AutomatoLexico.indexGeral),
			tipo: TokenTipo.Literal,
		};

		token.lexema = TokenUtils.formatarToken(token);

		return token;
	}

	private static q13(arquivo: string): Token | void {
		AutomatoLexicoUtils.log(arquivo, "q13");
		AutomatoLexicoUtils.quebraDeLinha(arquivo);

		const transicoes: TransicoesType[] = [
			[[...Digitos, ...Letras, "_"], AutomatoLexico.q13],
			[[...Simbolos, " ", "\n", "\r"], TokenUtils.novoTokenId],
		];

		const proximo = AutomatoLexicoUtils.proximoEstado(transicoes, arquivo[AutomatoLexico.indexGeral]);

		if (!proximo) {
			if (arquivo[AutomatoLexico.indexGeral]) {
				AutomatoLexico.indexGeral++;
				return AutomatoLexicoUtils.erroContinuaLeitura(arquivo);
			}
			return TokenUtils.novoTokenId(arquivo);
		}

		AutomatoLexico.indexGeral++;
		return proximo(arquivo);
	}

	private static q14(arquivo: string) {
		AutomatoLexicoUtils.log(arquivo, "q14");
		AutomatoLexicoUtils.quebraDeLinha(arquivo);

		const transicoes: TransicoesType[] = [
			[["}"], AutomatoLexico.q15],
			[[...Digitos, ...Letras, ...Simbolos, " ", "\r", "\n"], AutomatoLexico.q14],
		];

		const proximo = AutomatoLexicoUtils.proximoEstado(transicoes, arquivo[AutomatoLexico.indexGeral]);

		if (!proximo) {
			return AutomatoLexicoUtils.erroAteSimbolo(arquivo);
		}

		AutomatoLexico.indexGeral++;
		return proximo(arquivo);
	}

	private static q15(arquivo: string) {
		AutomatoLexicoUtils.log(arquivo, "q15");
		AutomatoLexicoUtils.quebraDeLinha(arquivo);

		const token: Token = {
			classe: TokenClasse.Comentario,
			lexema: arquivo.substring(AutomatoLexico.indexAuxiliar, AutomatoLexico.indexGeral),
			tipo: TokenTipo.Nulo,
		};

		token.lexema = TokenUtils.formatarToken(token);

		return token;
	}

	private static q16(arquivo: string) {
		AutomatoLexicoUtils.log(arquivo, "q16");
		AutomatoLexicoUtils.quebraDeLinha(arquivo);

		const transicoes: TransicoesType[] = [
			[["-"], AutomatoLexico.q17],
			[[">", "="], AutomatoLexico.q19],
			[[" ", "\r", "\n", ...Letras, ...Digitos, ...Simbolos], AutomatoLexicoUtils.ignorar],
		];
		const proximo = AutomatoLexicoUtils.proximoEstado(transicoes, arquivo[AutomatoLexico.indexGeral]);

		if (proximo == AutomatoLexicoUtils.ignorar || !proximo) {
			const token: Token = {
				classe: TokenClasse.OPR,
				lexema: arquivo.substring(AutomatoLexico.indexAuxiliar, AutomatoLexico.indexGeral),
				tipo: TokenTipo.Nulo,
			};

			return token;
		}

		AutomatoLexico.indexGeral =
			arquivo === " " ? AutomatoLexico.indexGeral : AutomatoLexico.indexGeral + 1;
		return proximo(arquivo);
	}

	private static q17(arquivo: string) {
		AutomatoLexicoUtils.log(arquivo, "q17");
		AutomatoLexicoUtils.quebraDeLinha(arquivo);

		const token: Token = {
			classe: TokenClasse.RCB,
			lexema: arquivo.substring(AutomatoLexico.indexAuxiliar, AutomatoLexico.indexGeral),
			tipo: TokenTipo.Nulo,
		};

		token.lexema = TokenUtils.formatarToken(token);

		return token;
	}

	private static q18(arquivo: string) {
		AutomatoLexicoUtils.log(arquivo, "q18");
		AutomatoLexicoUtils.quebraDeLinha(arquivo);

		const transicoes: TransicoesType[] = [
			[[">", "="], AutomatoLexico.q19],
			[[" ", "\r", "\n", ...Letras, ...Digitos, ...Simbolos], AutomatoLexicoUtils.ignorar],
		];
		const proximo = AutomatoLexicoUtils.proximoEstado(transicoes, arquivo[AutomatoLexico.indexGeral]);

		if (proximo == AutomatoLexicoUtils.ignorar || !proximo) {
			const token: Token = {
				classe: TokenClasse.OPR,
				lexema: arquivo.substring(AutomatoLexico.indexAuxiliar, AutomatoLexico.indexGeral),
				tipo: TokenTipo.Nulo,
			};

			return token;
		}

		proximo === AutomatoLexicoUtils.ignorar ? null : AutomatoLexico.indexGeral++;
		return proximo(arquivo);
	}

	private static q19(arquivo: string) {
		AutomatoLexicoUtils.log(arquivo, "q19");
		AutomatoLexicoUtils.quebraDeLinha(arquivo);

		const token: Token = {
			classe: TokenClasse.OPR,
			lexema: arquivo.substring(AutomatoLexico.indexAuxiliar, AutomatoLexico.indexGeral),
			tipo: TokenTipo.Nulo,
		};

		token.lexema = TokenUtils.formatarToken(token);

		return token;
	}

	private static q20(arquivo: string) {
		AutomatoLexicoUtils.log(arquivo, "q20");
		AutomatoLexicoUtils.quebraDeLinha(arquivo);

		const token: Token = {
			classe: TokenClasse.OPM,
			lexema: arquivo.substring(AutomatoLexico.indexAuxiliar, AutomatoLexico.indexGeral),
			tipo: TokenTipo.Nulo,
		};

		return token;
	}

	private static q21(arquivo: string) {
		AutomatoLexicoUtils.log(arquivo, "q21");
		AutomatoLexicoUtils.quebraDeLinha(arquivo);

		const token: Token = {
			classe: TokenClasse.AB_P,
			lexema: arquivo.substring(AutomatoLexico.indexAuxiliar, AutomatoLexico.indexGeral),
			tipo: TokenTipo.Nulo,
		};

		return token;
	}

	private static q22(arquivo: string) {
		AutomatoLexicoUtils.log(arquivo, "q22");
		AutomatoLexicoUtils.quebraDeLinha(arquivo);

		const token: Token = {
			classe: TokenClasse.FC_P,
			lexema: arquivo.substring(AutomatoLexico.indexAuxiliar, AutomatoLexico.indexGeral),
			tipo: TokenTipo.Nulo,
		};

		return token;
	}

	private static q23(arquivo: string) {
		AutomatoLexicoUtils.log(arquivo, "q23");
		AutomatoLexicoUtils.quebraDeLinha(arquivo);

		const token: Token = {
			classe: TokenClasse.PT_V,
			lexema: arquivo.substring(AutomatoLexico.indexAuxiliar, AutomatoLexico.indexGeral),
			tipo: TokenTipo.Nulo,
		};

		return token;
	}

	private static q24(arquivo: string) {
		AutomatoLexicoUtils.log(arquivo, "q24");
		AutomatoLexicoUtils.quebraDeLinha(arquivo);

		const token: Token = {
			classe: TokenClasse.Vir,
			lexema: arquivo.substring(AutomatoLexico.indexAuxiliar, AutomatoLexico.indexGeral),
			tipo: TokenTipo.Nulo,
		};

		return token;
	}
}
