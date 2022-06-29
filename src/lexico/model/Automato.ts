import { TabelaDeSimbolos } from "./TabelaDeSimbolos";
import { ErroLexico, ErrosLexicos } from "./ErrosLexicos";
import { Digitos, Letras, Reservadas, Simbolos } from "./Simbolos";
import { Token, TokenList, TokenType } from "./Token";

// TODO mensagens de erro

export type ReturnType = [Token[], ErroLexico[]];
type OpcoesType = [expr: string[], estado: (linha: string, index: number) => void];

export class Automato {
	static tokens: Token[] = [];
	static erros: ErroLexico[] = [];
	static indexInicial: number = 0;

	static iniciar(linha: string): ReturnType {
		Automato.tokens.length = 0;
		Automato.erros.length = 0;
		return this.q0(linha);
	}

	private static q0(linha: string, indexOpcional?: number): ReturnType {
		let index: number = 0;

		Automato.indexInicial = indexOpcional ? indexOpcional : 0;
		index = Automato.indexInicial;

		if (!linha[index]) {
			return [Automato.tokens, Automato.erros];
		}

		const opcoes: OpcoesType[] = [
			[[" "], Automato.q0],
			[['"'], Automato.q11],
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

		if (!proximo) {
			const erro = { mensagem: "", linha: 0, coluna: 0 };
		}

		index++;

		proximo!(linha, index);

		return [Automato.tokens, Automato.erros];
	}

	private static q1(linha: string, index: number) {
		if (!linha[index]) {
			const token: Token = { classe: "real", lexema: linha, tipo: TokenType.Real };
			return [token, index];
		}

		const opcoes: OpcoesType[] = [
			[Digitos, Automato.q1],
			[["."], Automato.q6],
			[["E", "e"], Automato.q2],
		];

		const proximo = Automato.proximoEstado(opcoes, linha[index]);

		if (!proximo) {
			const erro = { mensagem: "", linha: 0, coluna: 0 };
			ErrosLexicos.push(erro);
		}

		index++;
	}

	private static q2(linha: string, index: number) {
		const opcoes: OpcoesType[] = [
			[Digitos, Automato.q4],
			[["+"], Automato.q3],
			[["-"], Automato.q5],
		];
		const proximo = Automato.proximoEstado(opcoes, linha[index]);
		if (!proximo) {
			const erro = { mensagem: "", linha: 0, coluna: 0 };
			ErrosLexicos.push(erro);
		}

		index++;
	}

	private static q3(linha: string, index: number) {
		const opcoes: OpcoesType[] = [[Digitos, Automato.q4]];

		const proximo = Automato.proximoEstado(opcoes, linha[index]);
		if (!proximo) {
			const erro = { mensagem: "", linha: 0, coluna: 0 };
			ErrosLexicos.push(erro);
		}

		index++;
	}

	private static q4(linha: string, index: number) {
		if (!linha[index]) {
			const token: Token = { classe: "inteiro", lexema: linha, tipo: TokenType.Inteiro };
			return [token, index];
		}

		const opcoes: OpcoesType[] = [[Digitos, Automato.q4]];

		const proximo = Automato.proximoEstado(opcoes, linha[index]);
		if (!proximo) {
			const erro = { mensagem: "", linha: 0, coluna: 0 };
			ErrosLexicos.push(erro);
		}

		index++;
	}

	private static q5(linha: string, index: number) {
		const opcoes: OpcoesType[] = [[Digitos, Automato.q9]];

		const proximo = Automato.proximoEstado(opcoes, linha[index]);
		if (!proximo) {
			const erro = { mensagem: "", linha: 0, coluna: 0 };
			ErrosLexicos.push(erro);
		}

		index++;
	}

	private static q6(linha: string, index: number) {
		const opcoes: OpcoesType[] = [[Digitos, Automato.q7]];

		const proximo = Automato.proximoEstado(opcoes, linha[index]);
		if (!proximo) {
			const erro = { mensagem: "", linha: 0, coluna: 0 };
			ErrosLexicos.push(erro);
		}

		index++;
	}

	private static q7(linha: string, index: number) {
		if (!linha[index]) {
			const token = { classe: "real", lexema: linha, tipo: TokenType.Real };
			return [token, index];
		}

		const opcoes: OpcoesType[] = [
			[Digitos, Automato.q7],
			[["E", "e"], Automato.q8],
		];

		const proximo = Automato.proximoEstado(opcoes, linha[index]);

		if (!proximo) {
			const erro = { mensagem: "", linha: 0, coluna: 0 };
			ErrosLexicos.push(erro);
		}

		index++;
	}

	private static q8(linha: string, index: number) {
		const opcoes: OpcoesType[] = [[[...Digitos, "+", "-"], Automato.q9]];

		const proximo = Automato.proximoEstado(opcoes, linha[index]);
		if (!proximo) {
			const erro = { mensagem: "", linha: 0, coluna: 0 };
			ErrosLexicos.push(erro);
		}

		index++;
	}

	private static q9(linha: string, index: number) {
		if (!linha[index]) {
			const token: Token = { classe: "real", lexema: linha, tipo: TokenType.Real };
			return [token, index];
		}

		const opcoes: OpcoesType[] = [[Digitos, Automato.q9]];

		const proximo = Automato.proximoEstado(opcoes, linha[index]);
		if (!proximo) {
			const erro = { mensagem: "", linha: 0, coluna: 0 };
			ErrosLexicos.push(erro);
		}

		index++;
	}

	private static q10(linha: string, index: number) {
		const token = { classe: "EOF", lexema: "EOF", tipo: "EOF" };
		return [token, index];
	}

	private static q11(linha: string, index: number) {
		const opcoes: OpcoesType[] = [
			[['"'], Automato.q12],
			[[...Digitos, ...Letras, ...Simbolos], Automato.q11],
		];

		const proximo = Automato.proximoEstado(opcoes, linha[index]);
		if (!proximo) {
			const erro = { mensagem: "", linha: 0, coluna: 0 };
			ErrosLexicos.push(erro);
		}

		index++;
	}

	private static q12(linha: string, index: number) {
		const token: Token = { classe: "literal", lexema: linha, tipo: "literal" };
		TokenList.push(token);
		return [token, index];
	}

	private static q13(linha: string, index: number) {
		console.log("q13", Automato.indexInicial, index, linha[index]);
		
		if (!linha[index]) {
			const token = Automato.inserirToken(Automato.linhaSubstring(linha, index + 1));
			Automato.tokens.push(token);
			return;
		}

		const opcoes: OpcoesType[] = [
			[[" "], Automato.novoToken],
			[[...Digitos, ...Letras], Automato.q13],
		];

		const proximo = Automato.proximoEstado(opcoes, linha[index]);

		index++;
		proximo!(linha, index);
	}

	private static q14(linha: string, index: number) {
		const opcoes: OpcoesType[] = [
			[["}"], Automato.q15],
			[[...Digitos, ...Letras, ...Simbolos], Automato.q14],
		];

		const proximo = Automato.proximoEstado(opcoes, linha[index]);
		if (!proximo) {
			const erro = { mensagem: "", linha: 0, coluna: 0 };
			ErrosLexicos.push(erro);
		}

		index++;
	}

	private static q15(linha: string, index: number) {
		const token = { classe: "comentario", lexema: linha, tipo: "comentario" };
		return [token, index];
	}

	private static q16(linha: string, index: number) {
		if (!linha[index]) {
			return Automato.q19(linha, index);
		}

		const opcoes: OpcoesType[] = [
			[["-"], Automato.q17],
			[[">", "="], Automato.q19],
		];

		const proximo = Automato.proximoEstado(opcoes, linha[index]);
		if (!proximo) {
			const erro = { mensagem: "", linha: 0, coluna: 0 };
			ErrosLexicos.push(erro);
		}

		index++;
	}

	private static q17(linha: string, index: number) {
		const token = { classe: "atribuicao", lexema: linha, tipo: "atribuicao" };
		return [token, index];
	}

	private static q18(linha: string, index: number) {
		if (!linha[index]) {
			return Automato.q19(linha, index);
		}

		const opcoes: OpcoesType[] = [[["="], Automato.q19]];

		const proximo = Automato.proximoEstado(opcoes, linha[index]);
		if (!proximo) {
			const erro = { mensagem: "", linha: 0, coluna: 0 };
			ErrosLexicos.push(erro);
		}

		index++;
	}

	private static q19(linha: string, index: number) {
		const token = { classe: "operador relacional", lexema: linha, tipo: "operador relacional" };
	}

	private static q20(linha: string, index: number) {
		const token = { classe: "operador aritmetico", lexema: linha, tipo: "operador aritmetico" };
	}

	private static q21(linha: string, index: number) {
		const token = { classe: "abre parenteses", lexema: linha, tipo: "abre parenteses" };
	}

	private static q22(linha: string, index: number) {
		const token = { classe: "fecha parenteses", lexema: linha, tipo: "fecha parenteses" };
	}

	private static q23(linha: string, index: number) {
		console.log("q23");
		const token = { classe: "ponto e virgula", lexema: linha, tipo: "ponto e virgula" };
	}

	private static q24(linha: string, index: number) {
		const token = { classe: "virgula", lexema: linha, tipo: "virgula" };
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

	private static novoTokenSimbolo(linha: string, index: number) {
		let token: Token;
		Simbolos.some((simbolo) => {
			if (simbolo === linha.substring(Automato.indexInicial, Automato.indexInicial + index)) {
				// Pegar o nome do símbolo
				token = { classe: simbolo, lexema: simbolo, tipo: simbolo };
				Automato.tokens.push(token);
				Automato.q0(linha, index);
				return;
			}
		});
	}

	private static novoToken(linha: string, index: number) {
		let token: Token;
		let linhaN = Automato.linhaSubstring(linha, index);

		token = Automato.inserirToken(
			linhaN
		);
		console.log(linhaN, token);

		Automato.tokens.push(token);
		Automato.q0(linha, index);
		return;
	}

	private static linhaSubstring(linha: string, index: number) {
		return linha.substring(Automato.indexInicial, index - 1);
	}
}
