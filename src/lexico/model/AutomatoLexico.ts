import { TabelaDeSimbolos } from "./TabelaDeSimbolos";
import { Digitos, Letras, Simbolos } from "../dicionario/Simbolos";
import { Token, TokenClasse, TokenTipo } from "./Token";
import { TokenUtils } from "../utils/TokenUtils";
import { AutomatoLexicoUtils } from "../utils/AutomatoLexicoUtils";

export type OpcoesType = [expr: string[], estado: (linha: string, index: number) => void];

export class AutomatoLexico {
	static tokens: Token[] = [];
	static indexInicial: number = 0;
	static numeroLinha: number = 0;

	static iniciar(linha: string, numeroLinha: number): Token[] {
		AutomatoLexico.tokens.length = 0;
		AutomatoLexico.numeroLinha = numeroLinha;
		return this.q0(linha);
	}

	static q0(linha: string, indexOpcional?: number): Token[] {
		let index: number = 0;

		AutomatoLexico.indexInicial = indexOpcional ? indexOpcional : 0;
		index = AutomatoLexico.indexInicial;

		console.log("q0", AutomatoLexico.indexInicial, index, linha[index]);

		if (!linha[index]) {
			return AutomatoLexico.tokens;
		}

		const opcoes: OpcoesType[] = [
			[['"'], AutomatoLexico.q11],
			[[" "], AutomatoLexico.q0],
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

		const proximo = AutomatoLexicoUtils.proximoEstado(opcoes, linha[index]);

		if (!proximo) {
			AutomatoLexicoUtils.erroPrimeiroCaractere(linha, index);
			return AutomatoLexico.tokens;
		}

		index++;
		proximo!(linha, index);

		return AutomatoLexico.tokens;
	}

	private static q1(linha: string, index: number) {
		console.log("q1", AutomatoLexico.indexInicial, index, linha[index]);

		const opcoes: OpcoesType[] = [
			[Digitos, AutomatoLexico.q1],
			[[...Simbolos, " "], TokenUtils.novoTokenInteiro],
			[["."], AutomatoLexico.q6],
			[["E", "e"], AutomatoLexico.q2],
			[Letras, AutomatoLexicoUtils.erroProximoCaractere],
		];

		const proximo = AutomatoLexicoUtils.proximoEstado(opcoes, linha[index]);

		if (!linha[index]) {
			const token: Token = {
				classe: TokenClasse.Num,
				lexema: linha.substring(AutomatoLexico.indexInicial, index),
				tipo: TokenTipo.Inteiro,
			};
			AutomatoLexico.tokens.push(token);

			return;
		}

		if (!proximo) {
			AutomatoLexicoUtils.erroProximoCaractere(linha, index);
			return;
		}

		index++;
		proximo!(linha, index);
	}

	private static q2(linha: string, index: number) {
		console.log("q2", AutomatoLexico.indexInicial, index, linha[index]);
		const opcoes: OpcoesType[] = [
			[Digitos, AutomatoLexico.q4],
			[["+"], AutomatoLexico.q3],
			[["-"], AutomatoLexico.q5],
			[[...Simbolos, ...Letras], AutomatoLexicoUtils.erroProximoCaractere],
			[[" "], AutomatoLexicoUtils.erroProximoCaractereVazio],
		];

		const proximo = AutomatoLexicoUtils.proximoEstado(opcoes, linha[index]);

		if (!proximo) {
			AutomatoLexicoUtils.erroProximoCaractere(linha, index);
			return;
		}

		index++;
		proximo!(linha, index);
	}

	private static q3(linha: string, index: number) {
		console.log("q3", AutomatoLexico.indexInicial, index, linha[index]);
		const opcoes: OpcoesType[] = [
			[Digitos, AutomatoLexico.q4],
			[[...Simbolos, ...Letras], AutomatoLexicoUtils.erroProximoCaractere],
			[[" "], AutomatoLexicoUtils.erroProximoCaractereVazio],
		];

		const proximo = AutomatoLexicoUtils.proximoEstado(opcoes, linha[index]);

		if (!proximo || !linha[index]) {
			AutomatoLexicoUtils.erroProximoCaractere(linha, index);
			return;
		}

		index++;
		proximo!(linha, index);
	}

	private static q4(linha: string, index: number) {
		console.log("q4", AutomatoLexico.indexInicial, index, linha[index]);
		const opcoes: OpcoesType[] = [
			[Digitos, AutomatoLexico.q4],
			[[...Simbolos, " "], TokenUtils.novoTokenInteiro],
			[Letras, AutomatoLexicoUtils.erroProximoCaractere],
		];

		const proximo = AutomatoLexicoUtils.proximoEstado(opcoes, linha[index]);

		if (!linha[index]) {
			const token: Token = {
				classe: TokenClasse.Num,
				lexema: linha.substring(AutomatoLexico.indexInicial, index),
				tipo: TokenTipo.Inteiro,
			};
			AutomatoLexico.tokens.push(token);
			return;
		}

		if (!proximo) {
			AutomatoLexicoUtils.erroProximoCaractere(linha, index);
			return;
		}

		index++;
		proximo!(linha, index);
	}

	private static q5(linha: string, index: number) {
		console.log("q5", AutomatoLexico.indexInicial, index, linha[index]);
		const opcoes: OpcoesType[] = [
			[Digitos, AutomatoLexico.q9],
			[[...Simbolos, ...Letras], AutomatoLexicoUtils.erroProximoCaractere],
			[[" "], AutomatoLexicoUtils.erroProximoCaractereVazio],
		];

		const proximo = AutomatoLexicoUtils.proximoEstado(opcoes, linha[index]);

		if (!proximo || !linha[index]) {
			AutomatoLexicoUtils.erroProximoCaractere(linha, index);
			return;
		}

		index++;
		proximo!(linha, index);
	}

	private static q6(linha: string, index: number) {
		console.log("q6", AutomatoLexico.indexInicial, index, linha[index]);
		const opcoes: OpcoesType[] = [
			[Digitos, AutomatoLexico.q7],
			[[...Simbolos, ...Letras], AutomatoLexicoUtils.erroProximoCaractere],
			[[" "], AutomatoLexicoUtils.erroProximoCaractereVazio],
		];

		const proximo = AutomatoLexicoUtils.proximoEstado(opcoes, linha[index]);

		if (!proximo) {
			AutomatoLexicoUtils.erroProximoCaractere(linha, index);
			return;
		}

		index++;
		proximo!(linha, index);
	}

	private static q7(linha: string, index: number) {
		console.log("q7", AutomatoLexico.indexInicial, index, linha[index]);
		const opcoes: OpcoesType[] = [
			[Digitos, AutomatoLexico.q7],
			[["E", "e"], AutomatoLexico.q8],
			[[...Simbolos, " "], TokenUtils.novoTokenInteiro],
			[Letras, AutomatoLexicoUtils.erroProximoCaractere],
		];

		const proximo = AutomatoLexicoUtils.proximoEstado(opcoes, linha[index]);

		if (!linha[index]) {
			const token: Token = {
				classe: TokenClasse.Num,
				lexema: linha.substring(AutomatoLexico.indexInicial, index),
				tipo: TokenTipo.Real,
			};
			AutomatoLexico.tokens.push(token);
			return;
		}

		if (!proximo) {
			AutomatoLexicoUtils.erroProximoCaractere(linha, index);
			return;
		}

		index++;
		proximo!(linha, index);
	}

	private static q8(linha: string, index: number) {
		console.log("q8", AutomatoLexico.indexInicial, index, linha[index]);
		const opcoes: OpcoesType[] = [
			[Digitos, AutomatoLexico.q9],
			[["+", "-"], AutomatoLexico.q25],
			[[...Simbolos, ...Letras], AutomatoLexicoUtils.erroProximoCaractere],
			[[" "], AutomatoLexicoUtils.erroProximoCaractereVazio],
		];

		const proximo = AutomatoLexicoUtils.proximoEstado(opcoes, linha[index]);

		if (!proximo) {
			AutomatoLexicoUtils.erroProximoCaractere(linha, index);
			return;
		}

		index++;
		proximo!(linha, index);
	}

	private static q9(linha: string, index: number) {
		console.log("q9", AutomatoLexico.indexInicial, index, linha[index]);
		const opcoes: OpcoesType[] = [
			[Digitos, AutomatoLexico.q9],
			[[...Simbolos, " "], TokenUtils.novoTokenReal],
			[Letras, AutomatoLexicoUtils.erroProximoCaractere],
		];

		const proximo = AutomatoLexicoUtils.proximoEstado(opcoes, linha[index]);

		if (!linha[index]) {
			const token: Token = {
				classe: TokenClasse.Num,
				lexema: linha.substring(AutomatoLexico.indexInicial, index),
				tipo: TokenTipo.Real,
			};
			AutomatoLexico.tokens.push(token);

			return;
		}

		index++;
		proximo!(linha, index);
	}

	private static q11(linha: string, index: number) {
		console.log("q11", AutomatoLexico.indexInicial, index, linha[index]);
		const opcoes: OpcoesType[] = [
			[['"'], AutomatoLexico.q12],
			[[...Digitos, ...Letras, ...Simbolos, " "], AutomatoLexico.q11],
		];

		const proximo = AutomatoLexicoUtils.proximoEstado(opcoes, linha[index]);

		index++;

		if (!proximo) {
			AutomatoLexicoUtils.erroProximoCaractere(linha, index);
			return;
		}

		proximo!(linha, index);
	}

	private static q12(linha: string, index: number) {
		console.log("q12", AutomatoLexico.indexInicial, index, linha[index]);

		const token: Token = {
			classe: TokenClasse.Lit,
			lexema: linha.substring(AutomatoLexico.indexInicial, index + 1),
			tipo: TokenTipo.Literal,
		};

		AutomatoLexico.tokens.push(token);

		if (!linha[index]) {
			return;
		}

		AutomatoLexico.q0(linha, index);
	}

	private static q13(linha: string, index: number) {
		console.log("q13", AutomatoLexico.indexInicial, index, linha[index]);

		const opcoes: OpcoesType[] = [
			[[...Simbolos, " "], TokenUtils.novoTokenid],
			[[...Digitos, ...Letras], AutomatoLexico.q13],
		];

		const proximo = AutomatoLexicoUtils.proximoEstado(opcoes, linha[index]);

		if (!linha[index]) {
			const token: Token = TokenUtils.inserirToken(
				linha.substring(AutomatoLexico.indexInicial, index)
			);
			if (token.lexema === "fim") {
				token.classe = TokenClasse.EOF;
				token.tipo = "EOF";
			}
			AutomatoLexico.tokens.push(token);
			if (TokenUtils.eReservada(token.classe)) {
				TabelaDeSimbolos.push(token);
			}
			return;
		}

		if (!proximo) {
			AutomatoLexicoUtils.erroProximoCaractere(linha, index);
			return;
		}

		index++;
		proximo!(linha, index);
	}

	private static q14(linha: string, index: number) {
		console.log("q14", AutomatoLexico.indexInicial, index, linha[index]);
		const opcoes: OpcoesType[] = [
			[["}"], AutomatoLexico.q15],
			[[...Digitos, ...Letras, ...Simbolos], AutomatoLexico.q14],
		];

		index++;

		const proximo = AutomatoLexicoUtils.proximoEstado(opcoes, linha[index]);

		if (!proximo) {
			AutomatoLexicoUtils.erroProximoCaractere(linha, index);
			return;
		}

		proximo!(linha, index);
	}

	private static q15(linha: string, index: number) {
		console.log("q15", AutomatoLexico.indexInicial, index, linha[index]);
		const token: Token = {
			classe: TokenClasse.Comentario,
			lexema: linha.substring(AutomatoLexico.indexInicial, index + 1),
			tipo: TokenTipo.Nulo,
		};

		AutomatoLexico.tokens.push(token);
		if (!linha[index]) {
			return;
		}

		index++;
		AutomatoLexico.q0(linha, index);
	}

	private static q16(linha: string, index: number) {
		console.log("q16", AutomatoLexico.indexInicial, index, linha[index]);

		const opcoes: OpcoesType[] = [
			[["-"], AutomatoLexico.q17],
			[[">", "="], AutomatoLexico.q19],
			[[" ", ...Letras, ...Digitos, ...Simbolos], AutomatoLexico.q0],
		];

		const proximo = AutomatoLexicoUtils.proximoEstado(opcoes, linha[index]);

		if (proximo == AutomatoLexico.q0 || !linha[index]) {
			const token: Token = {
				classe: TokenClasse.OPR,
				lexema: linha.substring(AutomatoLexico.indexInicial, index),
				tipo: TokenTipo.Nulo,
			};
			AutomatoLexico.tokens.push(token);

			if (!linha[index]) {
				return;
			}

			AutomatoLexico.q0(linha, index);
			return;
		}

		if (!proximo) {
			AutomatoLexicoUtils.erroProximoCaractere(linha, index);
			return;
		}

		index = linha === " " ? index : index + 1;
		proximo!(linha, index);
	}

	private static q17(linha: string, index: number) {
		console.log("q17", AutomatoLexico.indexInicial, index, linha[index]);
		const opcoes: OpcoesType[] = [
			[[...Letras, ...Digitos, ...Simbolos, " "], TokenUtils.novoTokenAtribuicao],
		];

		const proximo = AutomatoLexicoUtils.proximoEstado(opcoes, linha[index]);

		if (!linha[index]) {
			const token: Token = {
				classe: TokenClasse.RCB,
				lexema: linha.substring(AutomatoLexico.indexInicial, index),
				tipo: TokenTipo.Nulo,
			};
			AutomatoLexico.tokens.push(token);

			return;
		}

		index++;
		proximo!(linha, index);
	}

	private static q18(linha: string, index: number) {
		const opcoes: OpcoesType[] = [
			[["="], AutomatoLexico.q19],
			[[" ", ...Letras, ...Digitos, ...Simbolos], AutomatoLexico.q0],
		];

		const proximo = AutomatoLexicoUtils.proximoEstado(opcoes, linha[index]);

		if (proximo == AutomatoLexico.q0 || !linha[index]) {
			const token: Token = {
				classe: TokenClasse.OPR,
				lexema: linha.substring(AutomatoLexico.indexInicial, index),
				tipo: TokenTipo.Nulo,
			};
			AutomatoLexico.tokens.push(token);
			AutomatoLexico.q0(linha, index);
			return;
		}

		index++;
		proximo!(linha, index);
	}

	private static q19(linha: string, index: number) {
		console.log("q19", AutomatoLexico.indexInicial, index, linha[index]);

		const token: Token = {
			classe: TokenClasse.OPR,
			lexema: linha.substring(AutomatoLexico.indexInicial, index),
			tipo: TokenTipo.Nulo,
		};
		AutomatoLexico.tokens.push(token);
		if (!linha[index]) {
			return;
		}
		AutomatoLexico.q0(linha, index);
	}

	private static q20(linha: string, index: number) {
		console.log("q20", AutomatoLexico.indexInicial, index, linha[index]);
		const token: Token = {
			classe: TokenClasse.OPM,
			lexema: linha.substring(AutomatoLexico.indexInicial, index),
			tipo: TokenTipo.Nulo,
		};
		AutomatoLexico.tokens.push(token);
		if (!linha[index]) {
			return;
		}
		AutomatoLexico.q0(linha, index);
	}

	private static q21(linha: string, index: number) {
		console.log("q21", AutomatoLexico.indexInicial, index, linha[index]);
		const token: Token = {
			classe: TokenClasse.AB_P,
			lexema: linha.substring(AutomatoLexico.indexInicial, index),
			tipo: TokenTipo.Nulo,
		};
		AutomatoLexico.tokens.push(token);
		if (!linha[index]) {
			return;
		}
		AutomatoLexico.q0(linha, index);
	}

	private static q22(linha: string, index: number) {
		console.log("q22", AutomatoLexico.indexInicial, index, linha[index]);
		const token: Token = {
			classe: TokenClasse.FC_P,
			lexema: linha.substring(AutomatoLexico.indexInicial, index),
			tipo: TokenTipo.Nulo,
		};
		AutomatoLexico.tokens.push(token);
		if (!linha[index]) {
			return;
		}
		AutomatoLexico.q0(linha, index);
	}

	private static q23(linha: string, index: number) {
		console.log("q23", AutomatoLexico.indexInicial, index, linha[index]);
		const token: Token = {
			classe: TokenClasse.PT_V,
			lexema: linha.substring(AutomatoLexico.indexInicial, index),
			tipo: TokenTipo.Nulo,
		};
		AutomatoLexico.tokens.push(token);
		if (!linha[index]) {
			return;
		}
		AutomatoLexico.q0(linha, index);
	}

	private static q24(linha: string, index: number) {
		console.log("q24", AutomatoLexico.indexInicial, index, linha[index]);
		const token: Token = {
			classe: TokenClasse.Vir,
			lexema: linha.substring(AutomatoLexico.indexInicial, index),
			tipo: TokenTipo.Nulo,
		};
		AutomatoLexico.tokens.push(token);
		if (!linha[index]) {
			return;
		}
		AutomatoLexico.q0(linha, index);
	}

	private static q25(linha: string, index: number) {
		console.log("q25", AutomatoLexico.indexInicial, index, linha[index]);
		const opcoes: OpcoesType[] = [
			[Digitos, AutomatoLexico.q9],
			[[...Simbolos, ...Letras], AutomatoLexicoUtils.erroProximoCaractere],
			[[" "], AutomatoLexicoUtils.erroProximoCaractereVazio],
		];

		const proximo = AutomatoLexicoUtils.proximoEstado(opcoes, linha[index]);

		if (!proximo) {
			AutomatoLexicoUtils.erroProximoCaractere(linha, index);
			return;
		}

		index++;
		proximo!(linha, index);
	}
}