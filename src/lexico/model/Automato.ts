import { TabelaDeSimbolos } from "./TabelaDeSimbolos";
import { ErroLexico, ErrosLexicos } from "./ErrosLexicos";
import { Digitos, Letras, Reservadas, Simbolos } from "./Simbolos";
import { Token, TokenList, TokenType } from "./Token";
import { notDeepEqual } from "assert";

// TODO mensagens de erro

export type ReturnType = [Token[], ErroLexico[]];
type OpcoesType = [expr: string[], estado: (linha: string, index: number) => void];

export class Automato {
	static tokens: Token[] = [];
	static erros: ErroLexico[] = [];
	static indexInicial: number = 0;
	static numeroLinha: number = 0;

	static iniciar(linha: string, numeroLinha: number): ReturnType {
		Automato.tokens.length = 0;
		Automato.erros.length = 0;
		Automato.numeroLinha = numeroLinha;
		return this.q0(linha);
	}

	// Validação
	// !proximo para não precisar botar o q0 nas opções
	// 	e também não precisar especificar o que não for possível no estado
	// 	como um default no switch
	// !linha[index] para chegar o fim da linha
	// Tomar ações diferentes para cada caso e padronizar

	private static q0(linha: string, indexOpcional?: number): ReturnType {
		let index: number = 0;

		Automato.indexInicial = indexOpcional ? indexOpcional : 0;
		index = Automato.indexInicial;

		console.log("q0", Automato.indexInicial, index, linha[index]);

		if (!linha[index]) {
			return [Automato.tokens, Automato.erros];
		}

		const opcoes: OpcoesType[] = [
			[['"'], Automato.q11],
			[[" "], Automato.q0],
			[["{"], Automato.q14],
			[["<"], Automato.q16],
			[[">"], Automato.q18],
			[["="], Automato.q19],
			[["*", "+", "-", "/"], Automato.q20],
			[["("], Automato.q21],
			[[")"], Automato.q22],
			[[";"], Automato.q23],
			[[","], Automato.q24],
			[Digitos, Automato.q1],
			[Letras, Automato.q13],
		];

		const proximo = Automato.proximoEstado(opcoes, linha[index]);

		index++;

		proximo!(linha, index);

		return [Automato.tokens, Automato.erros];
	}

	private static q1(linha: string, index: number) {
		console.log("q1", Automato.indexInicial, index, linha[index]);
		const opcoes: OpcoesType[] = [
			[Digitos, Automato.q1],
			[[...Simbolos, " "], Automato.novoTokenInteiro],
			[["."], Automato.q6],
			[["E", "e"], Automato.q2],
			[Letras, Automato.erroProximoCaractere],
		];

		const proximo = Automato.proximoEstado(opcoes, linha[index]);

		if (!linha[index]) {
			const token: Token = {
				classe: "número inteiro",
				lexema: linha.substring(Automato.indexInicial, index),
				tipo: TokenType.Inteiro,
			};
			Automato.tokens.push(token);
			Automato.q0(linha, index);
			return;
		}

		index++;
		proximo!(linha, index);
	}

	private static q2(linha: string, index: number) {
		console.log("q2", Automato.indexInicial, index, linha[index]);
		const opcoes: OpcoesType[] = [
			[Digitos, Automato.q4],
			[["+"], Automato.q3],
			[["-"], Automato.q5],
			[[...Simbolos, ...Letras], Automato.erroProximoCaractere],
			[[" "], Automato.erroProximoCaractereVazio],
		];

		const proximo = Automato.proximoEstado(opcoes, linha[index]);

		index++;
		proximo!(linha, index);
	}

	private static q3(linha: string, index: number) {
		console.log("q3", Automato.indexInicial, index, linha[index]);
		const opcoes: OpcoesType[] = [
			[Digitos, Automato.q4],
			[[...Simbolos, ...Letras], Automato.erroProximoCaractere],
			[[" "], Automato.erroProximoCaractereVazio],
		];

		const proximo = Automato.proximoEstado(opcoes, linha[index]);

		index++;
		proximo!(linha, index);
	}

	private static q4(linha: string, index: number) {
		console.log("q4", Automato.indexInicial, index, linha[index]);
		const opcoes: OpcoesType[] = [
			[Digitos, Automato.q4],
			[[...Simbolos, " "], Automato.novoTokenInteiro],
			[Letras, Automato.erroProximoCaractere],
		];

		const proximo = Automato.proximoEstado(opcoes, linha[index]);

		if (!linha[index]) {
			const token: Token = {
				classe: "número inteiro",
				lexema: linha.substring(Automato.indexInicial, index),
				tipo: TokenType.Inteiro,
			};
			Automato.tokens.push(token);
			Automato.q0(linha, index);
			return;
		}

		index++;
		proximo!(linha, index);
	}

	private static q5(linha: string, index: number) {
		console.log("q5", Automato.indexInicial, index, linha[index]);
		const opcoes: OpcoesType[] = [
			[Digitos, Automato.q9],
			[[...Simbolos, ...Letras], Automato.erroProximoCaractere],
			[[" "], Automato.erroProximoCaractereVazio],
		];

		const proximo = Automato.proximoEstado(opcoes, linha[index]);

		index++;
		proximo!(linha, index);
	}

	private static q6(linha: string, index: number) {
		console.log("q6", Automato.indexInicial, index, linha[index]);
		const opcoes: OpcoesType[] = [
			[Digitos, Automato.q7],
			[[...Simbolos, ...Letras], Automato.erroProximoCaractere],
			[[" "], Automato.erroProximoCaractereVazio],
		];

		const proximo = Automato.proximoEstado(opcoes, linha[index]);

		index++;
		proximo!(linha, index);
	}

	private static q7(linha: string, index: number) {
		console.log("q7", Automato.indexInicial, index, linha[index]);
		const opcoes: OpcoesType[] = [
			[Digitos, Automato.q7],
			[["E", "e"], Automato.q8],
			[[...Simbolos, " "], Automato.novoTokenInteiro],
			[Letras, Automato.erroProximoCaractere],
		];

		const proximo = Automato.proximoEstado(opcoes, linha[index]);

		if (!linha[index]) {
			const token: Token = {
				classe: "número real",
				lexema: linha.substring(Automato.indexInicial, index),
				tipo: TokenType.Real,
			};
			Automato.tokens.push(token);
			Automato.q0(linha, index);
			return;
		}

		index++;
		proximo!(linha, index);
	}

	private static q8(linha: string, index: number) {
		console.log("q8", Automato.indexInicial, index, linha[index]);
		const opcoes: OpcoesType[] = [
			[[...Digitos, "+", "-"], Automato.q9],
			[[...Simbolos, ...Letras], Automato.erroProximoCaractere],
			[[" "], Automato.erroProximoCaractereVazio],
		];

		const proximo = Automato.proximoEstado(opcoes, linha[index]);

		index++;

		if (!proximo) {
			Automato.q0(linha, index);
		}

		proximo!(linha, index);
	}

	private static q9(linha: string, index: number) {
		console.log("q9", Automato.indexInicial, index, linha[index]);
		const opcoes: OpcoesType[] = [
			[Digitos, Automato.q9],
			[[...Simbolos, " "], Automato.novoTokenReal],
			[Letras, Automato.erroProximoCaractere],
		];

		const proximo = Automato.proximoEstado(opcoes, linha[index]);

		if (!linha[index]) {
			const token: Token = {
				classe: "número real",
				lexema: linha.substring(Automato.indexInicial, index),
				tipo: TokenType.Real,
			};
			Automato.tokens.push(token);
			Automato.q0(linha, index);
			return;
		}

		index++;
		proximo!(linha, index);
	}

	private static q11(linha: string, index: number) {
		console.log("q11", Automato.indexInicial, index, linha[index]);
		const opcoes: OpcoesType[] = [
			[['"'], Automato.q12],
			[[...Digitos, ...Letras, ...Simbolos, " "], Automato.q11],
		];

		const proximo = Automato.proximoEstado(opcoes, linha[index]);

		index++;

		if (!proximo) {
			Automato.q0(linha, index);
		}

		proximo!(linha, index);
	}

	private static q12(linha: string, index: number) {
		console.log("q12", Automato.indexInicial, index, linha[index]);

		const token: Token = {
			classe: "literal",
			lexema: linha.substring(Automato.indexInicial, index + 1),
			tipo: "literal",
		};

		Automato.tokens.push(token);

		if (!linha[index]) {
			return;
		}
		Automato.q0(linha, index);
	}

	private static q13(linha: string, index: number) {
		console.log("q13", Automato.indexInicial, index, linha[index]);

		const opcoes: OpcoesType[] = [
			[[...Simbolos, " "], Automato.novoTokenid],
			[[...Digitos, ...Letras], Automato.q13],
		];

		const proximo = Automato.proximoEstado(opcoes, linha[index]);

		if (!linha[index] || !proximo) {
			const token: Token = Automato.inserirToken(linha.substring(Automato.indexInicial, index));
			if (token.classe === "fim") {
				token.classe = "EOF";
				token.tipo = "EOF";
			}
			Automato.tokens.push(token);
			return;
		}

		index++;
		proximo!(linha, index);
	}

	private static q14(linha: string, index: number) {
		console.log("q14", Automato.indexInicial, index, linha[index]);
		const opcoes: OpcoesType[] = [
			[["}"], Automato.q15],
			[[...Digitos, ...Letras, ...Simbolos], Automato.q14],
		];
		if (!linha[index]) {
			return;
		}
		index++;
		const proximo = Automato.proximoEstado(opcoes, linha[index]);
		proximo!(linha, index);
	}

	private static q15(linha: string, index: number) {
		console.log("q15", Automato.indexInicial, index, linha[index]);
		const token: Token = {
			classe: "comentario",
			lexema: linha.substring(Automato.indexInicial, index + 1),
			tipo: "comentario",
		};
		Automato.tokens.push(token);
		if (!linha[index]) {
			return;
		}
		index++;
		Automato.q0(linha, index);
	}

	private static q16(linha: string, index: number) {
		console.log("q16", Automato.indexInicial, index, linha[index]);

		const opcoes: OpcoesType[] = [
			[["-"], Automato.q17],
			[[">", "="], Automato.q19],
			[[" ", ...Letras, ...Digitos, ...Simbolos], Automato.q0],
		];

		const proximo = Automato.proximoEstado(opcoes, linha[index]);

		if (proximo == Automato.q0 || !linha[index]) {
			const token: Token = {
				classe: "operador relacional",
				lexema: linha.substring(Automato.indexInicial, index),
				tipo: "operador relacional",
			};
			Automato.tokens.push(token);
			Automato.q0(linha, index);
			return;
		}

		index = linha === " " ? index : index + 1;
		proximo!(linha, index);
	}

	// Padronizar como q1 daqui pra baixo
	private static q17(linha: string, index: number) {
		console.log("q17", Automato.indexInicial, index, linha[index]);
		const opcoes: OpcoesType[] = [
			[[...Letras, ...Digitos, ...Simbolos, " "], Automato.novoTokenAtribuicao],
		];

		const proximo = Automato.proximoEstado(opcoes, linha[index]);

		if (!linha[index]) {
			const token: Token = {
				classe: "atribuição",
				lexema: linha.substring(Automato.indexInicial, index),
				tipo: "atribuição",
			};
			Automato.tokens.push(token);
			Automato.q0(linha, index);
			return;
		}

		index++;
		proximo!(linha, index);
	}

	private static q18(linha: string, index: number) {
		const opcoes: OpcoesType[] = [
			[["="], Automato.q19],
			[[" ", ...Letras, ...Digitos, ...Simbolos], Automato.q0],
		];

		const proximo = Automato.proximoEstado(opcoes, linha[index]);

		if (proximo == Automato.q0 || !linha[index]) {
			const token: Token = {
				classe: "operador relacional",
				lexema: linha.substring(Automato.indexInicial, index),
				tipo: "operador relacional",
			};
			Automato.tokens.push(token);
			Automato.q0(linha, index);
			return;
		}

		index++;
		proximo!(linha, index);
	}

	private static q19(linha: string, index: number) {
		console.log("q19", Automato.indexInicial, index, linha[index]);

		const token: Token = {
			classe: "operador relacional",
			lexema: linha.substring(Automato.indexInicial, index),
			tipo: null,
		};
		Automato.tokens.push(token);
		if (!linha[index]) {
			return;
		}
		Automato.q0(linha, index);
	}

	private static q20(linha: string, index: number) {
		console.log("q20", Automato.indexInicial, index, linha[index]);
		const token: Token = {
			classe: "operador aritmético",
			lexema: linha.substring(Automato.indexInicial, index),
			tipo: "operador aritmético",
		};
		Automato.tokens.push(token);
		if (!linha[index]) {
			return;
		}
		Automato.q0(linha, index);
	}

	private static q21(linha: string, index: number) {
		console.log("q21", Automato.indexInicial, index, linha[index]);
		const token: Token = {
			classe: "abre parenteses",
			lexema: linha.substring(Automato.indexInicial, index),
			tipo: "abre parenteses",
		};
		Automato.tokens.push(token);
		if (!linha[index]) {
			return;
		}
		Automato.q0(linha, index);
	}

	private static q22(linha: string, index: number) {
		console.log("q22", Automato.indexInicial, index, linha[index]);
		const token: Token = {
			classe: "fecha parenteses",
			lexema: linha.substring(Automato.indexInicial, index),
			tipo: "fecha parenteses",
		};
		Automato.tokens.push(token);
		if (!linha[index]) {
			return;
		}
		Automato.q0(linha, index);
	}

	private static q23(linha: string, index: number) {
		console.log("q23", Automato.indexInicial, index, linha[index]);
		const token: Token = {
			classe: "ponto e virgula",
			lexema: linha.substring(Automato.indexInicial, index),
			tipo: "ponto e virgula",
		};
		Automato.tokens.push(token);
		if (!linha[index]) {
			return;
		}
		Automato.q0(linha, index);
	}

	private static q24(linha: string, index: number) {
		console.log("q24", Automato.indexInicial, index, linha[index]);
		const token: Token = {
			classe: "vírgula",
			lexema: linha.substring(Automato.indexInicial, index),
			tipo: "vírgula",
		};
		Automato.tokens.push(token);
		if (!linha[index]) {
			return;
		}
		Automato.q0(linha, index);
	}

	private static proximoEstado(opcoes: OpcoesType[], caractere: string) {
		for (let i = 0; i < opcoes.length; i++) {
			for (let j = 0, array = opcoes[i][0]; j < opcoes[i][0].length; j++) {
				if (caractere === array[j]) {
					return opcoes[i][1];
				}
			}
		}
	}

	private static eReservada(linha: string) {
		return Reservadas.includes(linha);
	}

	private static tokenReservado(linha: string): Token {
		let novoToken: Token;

		TabelaDeSimbolos.some((token) => {
			if (token.lexema === linha) {
				novoToken = token;
				return;
			}
		});

		return novoToken!;
	}

	private static inserirToken(linha: string) {
		let token: Token;
		if (Automato.eReservada(linha)) {
			token = Automato.tokenReservado(linha);
			return token;
		}
		token = { classe: "id", lexema: linha, tipo: "id" };
		return token;
	}

	private static novoTokenReal(linha: string, index: number) {
		const token: Token = {
			classe: "número real",
			lexema: linha.substring(Automato.indexInicial, index - 1),
			tipo: TokenType.Real,
		};
		Automato.tokens.push(token);
		Automato.q0(linha, index - 1);
		return;
	}

	private static novoTokenInteiro(linha: string, index: number) {
		const token: Token = {
			classe: "número inteiro",
			lexema: linha.substring(Automato.indexInicial, index - 1),
			tipo: TokenType.Inteiro,
		};
		Automato.tokens.push(token);
		Automato.q0(linha, index - 1);
		return;
	}

	private static novoTokenid(linha: string, index: number) {
		let token: Token;
		let linhaN = linha.substring(Automato.indexInicial, index - 1);

		token = Automato.inserirToken(linhaN);

		Automato.tokens.push(token);
		Automato.q0(linha, index - 1);
		return;
	}

	private static novoTokenAtribuicao(linha: string, index: number) {
		Automato.novoToken(linha, index, "atribuicao", -1);
		Automato.q0(linha, index - 1);
		return;
	}

	private static novoTokenOperadorRelacional(linha: string, index: number) {
		Automato.novoToken(linha, index, "operador relacional", -1);
		Automato.q0(linha, index - 1);
		return;
	}

	private static novoToken(linha: string, index: number, classificacao: string, ajuste?: number) {
		index = ajuste ? index + ajuste : index;
		const token: Token = {
			classe: classificacao,
			lexema: linha.substring(Automato.indexInicial, index),
			tipo: null,
		};

		Automato.tokens.push(token);
		return;
	}

	// private static erroProximoCaractereSimbolo(linha: string, index: number) {
	// 	const erro: ErroLexico = {
	// 		mensagem: "Erro léxico, número inválido",
	// 		linha: 0,
	// 		coluna: index ,
	// 	};
	// 	Automato.erros.push(erro);
	// 	Automato.q0(linha, index - 1);
	// 	return;
	// }

	private static erroProximoCaractere(linha: string, index: number) {
		const erro: ErroLexico = {
			mensagem: "Erro léxico, número inválido",
			linha: Automato.numeroLinha,
			coluna: index,
		};
		Automato.erros.push(erro);

		--index;
		while (linha[index] && linha[index] !== " ") {
			if (Simbolos.includes(linha[index])) {
				Automato.q0(linha, index);
				return;
			}
			index++;
		}
		Automato.q0(linha, index);
		return;
	}

	private static erroProximoCaractereVazio(linha: string, index: number) {
		const erro: ErroLexico = {
			mensagem: "Erro léxico, número inválido",
			linha: Automato.numeroLinha,
			coluna: index,
		};
		Automato.erros.push(erro);

		--index;
		while (linha[index] !== " ") {
			index++;
		}
		Automato.q0(linha, index);
		return;
	}
}
