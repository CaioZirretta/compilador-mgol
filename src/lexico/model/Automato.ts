import { TabelaDeSimbolos } from "./TabelaDeSimbolos";
import { ErroLexico, ErrosLexicos } from "./ErrosLexicos";
import { Digitos, Letras, Reservadas, Simbolos } from "./Simbolos";
import { Token, TokenList, TokenType } from "./Token";

// TODO mensagens de erro

type OpcoesType = [expr: string[], estado: (palavra: string, index: number) => void];

export class Automato {
	static q0(palavra: string): Token | ErroLexico {
		

		let index: number = 0;

		const opcoes: OpcoesType[] = [
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

		const proximo = Automato.proximoEstado(opcoes, palavra[index]);

		if (!proximo) {
			const erro = { mensagem: "", linha: 0, coluna: 0 };
			ErrosLexicos.push(erro);
			return erro;
		}

		index++;
		return proximo(palavra, index)!;
	}

	private static q1(palavra: string, index: number): Token | ErroLexico {
		

		if (!palavra[index]) {
			const token: Token = { classe: "real", lexema: palavra, tipo: TokenType.Real };
			return token;
		}

		const opcoes: OpcoesType[] = [
			[Digitos, Automato.q1],
			[["."], Automato.q6],
			[["E", "e"], Automato.q2],
		];

		const proximo = Automato.proximoEstado(opcoes, palavra[index]);

		if (!proximo) {
			const erro = { mensagem: "", linha: 0, coluna: 0 };
			ErrosLexicos.push(erro);
			return erro;
		}

		index++;

		return proximo(palavra, index)!;
	}

	private static q2(palavra: string, index: number): Token | ErroLexico {
		
		const opcoes: OpcoesType[] = [
			[Digitos, Automato.q4],
			[["+"], Automato.q3],
			[["-"], Automato.q5],
		];
		const proximo = Automato.proximoEstado(opcoes, palavra[index]);
		if (!proximo) {
			const erro = { mensagem: "", linha: 0, coluna: 0 };
			ErrosLexicos.push(erro);
			return erro;
		}

		index++;
		return proximo(palavra, index)!;
	}

	private static q3(palavra: string, index: number): Token | ErroLexico {
		
		const opcoes: OpcoesType[] = [[Digitos, Automato.q4]];

		const proximo = Automato.proximoEstado(opcoes, palavra[index]);
		if (!proximo) {
			const erro = { mensagem: "", linha: 0, coluna: 0 };
			ErrosLexicos.push(erro);
			return erro;
		}

		index++;
		return proximo(palavra, index)!;
	}

	private static q4(palavra: string, index: number): Token | ErroLexico {
		

		if (!palavra[index]) {
			const token: Token = { classe: "inteiro", lexema: palavra, tipo: TokenType.Inteiro };
			return token;
		}

		const opcoes: OpcoesType[] = [[Digitos, Automato.q4]];

		const proximo = Automato.proximoEstado(opcoes, palavra[index]);
		if (!proximo) {
			const erro = { mensagem: "", linha: 0, coluna: 0 };
			ErrosLexicos.push(erro);
			return erro;
		}

		index++;
		return proximo(palavra, index)!;
	}

	private static q5(palavra: string, index: number): Token | ErroLexico {
		

		const opcoes: OpcoesType[] = [[Digitos, Automato.q9]];

		const proximo = Automato.proximoEstado(opcoes, palavra[index]);
		if (!proximo) {
			const erro = { mensagem: "", linha: 0, coluna: 0 };
			ErrosLexicos.push(erro);
			return erro;
		}

		index++;
		return proximo(palavra, index)!;
	}

	private static q6(palavra: string, index: number): Token | ErroLexico {
		
		const opcoes: OpcoesType[] = [[Digitos, Automato.q7]];

		const proximo = Automato.proximoEstado(opcoes, palavra[index]);
		if (!proximo) {
			const erro = { mensagem: "", linha: 0, coluna: 0 };
			ErrosLexicos.push(erro);
			return erro;
		}

		index++;
		return proximo(palavra, index)!;
	}

	private static q7(palavra: string, index: number): Token | ErroLexico {
		

		if (!palavra[index]) {
			const token = { classe: "real", lexema: palavra, tipo: TokenType.Real };
			return token;
		}

		const opcoes: OpcoesType[] = [
			[Digitos, Automato.q7],
			[["E", "e"], Automato.q8],
		];

		const proximo = Automato.proximoEstado(opcoes, palavra[index]);

		if (!proximo) {
			const erro = { mensagem: "", linha: 0, coluna: 0 };
			ErrosLexicos.push(erro);
			return erro;
		}

		index++;
		return proximo(palavra, index)!;
	}

	private static q8(palavra: string, index: number): Token | ErroLexico {
		
		const opcoes: OpcoesType[] = [[[...Digitos, "+", "-"], Automato.q9]];

		const proximo = Automato.proximoEstado(opcoes, palavra[index]);
		if (!proximo) {
			const erro = { mensagem: "", linha: 0, coluna: 0 };
			ErrosLexicos.push(erro);
			return erro;
		}

		index++;
		return proximo(palavra, index)!;
	}

	private static q9(palavra: string, index: number): Token | ErroLexico {
		

		if (!palavra[index]) {
			const token: Token = { classe: "real", lexema: palavra, tipo: TokenType.Real };
			return token;
		}

		const opcoes: OpcoesType[] = [[Digitos, Automato.q9]];

		const proximo = Automato.proximoEstado(opcoes, palavra[index]);
		if (!proximo) {
			const erro = { mensagem: "", linha: 0, coluna: 0 };
			ErrosLexicos.push(erro);
			return erro;
		}

		index++;
		return proximo(palavra, index)!;
	}

	private static q10(palavra: string, index: number): Token | ErroLexico {
		
		const token = { classe: "EOF", lexema: "EOF", tipo: "EOF" };
		return token;
	}

	private static q11(palavra: string, index: number): Token | ErroLexico {
		

		const opcoes: OpcoesType[] = [
			[['"'], Automato.q12],
			[[...Digitos, ...Letras, ...Simbolos], Automato.q11],
		];

		const proximo = Automato.proximoEstado(opcoes, palavra[index]);
		if (!proximo) {
			const erro = { mensagem: "", linha: 0, coluna: 0 };
			ErrosLexicos.push(erro);
			return erro;
		}

		index++;
		return proximo(palavra, index)!;
	}

	private static q12(palavra: string, index: number): Token | ErroLexico {
		
		const token: Token = { classe: "literal", lexema: palavra, tipo: "literal" };
		TokenList.push(token);
		return token;
	}

	private static q13(palavra: string, index: number): Token | ErroLexico {
		

		if (!palavra[index]) {
			const token = Automato.inserirToken(palavra);
			return token;
		}

		const opcoes: OpcoesType[] = [[[...Digitos, ...Letras], Automato.q13]];

		const proximo = Automato.proximoEstado(opcoes, palavra[index]);

		if (!proximo) {
			const erro = { mensagem: "", linha: 0, coluna: 0 };
			ErrosLexicos.push(erro);
			return erro;
		}

		index++;

		return proximo(palavra, index)!;
	}

	private static q14(palavra: string, index: number): Token | ErroLexico {
		

		const opcoes: OpcoesType[] = [
			[["}"], Automato.q15],
			[[...Digitos, ...Letras, ...Simbolos], Automato.q14],
		];

		const proximo = Automato.proximoEstado(opcoes, palavra[index]);
		if (!proximo) {
			const erro = { mensagem: "", linha: 0, coluna: 0 };
			ErrosLexicos.push(erro);
			return erro;
		}

		index++;
		return proximo(palavra, index)!;
	}

	private static q15(palavra: string, index: number): Token | ErroLexico {
		
		const token = { classe: "comentario", lexema: palavra, tipo: "comentario" };
		return token;
	}

	private static q16(palavra: string, index: number): Token | ErroLexico {
		

		if(!palavra[index]){
			return Automato.q19(palavra, index)
		}

		const opcoes: OpcoesType[] = [
			[["-"], Automato.q17],
			[[">", "="], Automato.q19]
		];

		const proximo = Automato.proximoEstado(opcoes, palavra[index]);
		if (!proximo) {
			const erro = { mensagem: "", linha: 0, coluna: 0 };
			ErrosLexicos.push(erro);
			return erro;
		}

		index++;
		return proximo(palavra, index)!;
	}

	private static q17(palavra: string, index: number): Token | ErroLexico {
		
		const token = { classe: "atribuicao", lexema: palavra, tipo: "atribuicao" };
		return token;
	}

	private static q18(palavra: string, index: number): Token | ErroLexico {
		

		if(!palavra[index]){
			return Automato.q19(palavra, index)
		}

		const opcoes: OpcoesType[] = [
			[["="], Automato.q19],
		];

		const proximo = Automato.proximoEstado(opcoes, palavra[index]);
		if (!proximo) {
			const erro = { mensagem: "", linha: 0, coluna: 0 };
			ErrosLexicos.push(erro);
			return erro;
		}

		index++;
		return proximo(palavra, index)!;
	}

	private static q19(palavra: string, index: number): Token | ErroLexico {
		const token = { classe: "operador relacional", lexema: palavra, tipo: "operador relacional" };
		return token;
	}

	private static q20(palavra: string, index: number): Token | ErroLexico {
		
		const token = { classe: "operador aritmetico", lexema: palavra, tipo: "operador aritmetico" };
		return token;
	}

	private static q21(palavra: string, index: number): Token | ErroLexico {
		
		const token = { classe: "abre parenteses", lexema: palavra, tipo: "abre parenteses" };
		return token;
	}

	private static q22(palavra: string, index: number): Token | ErroLexico {
		
		const token = { classe: "fecha parenteses", lexema: palavra, tipo: "fecha parenteses" };
		return token;
	}

	private static q23(palavra: string, index: number): Token | ErroLexico {
		
		const token = { classe: "ponto e virgula", lexema: palavra, tipo: "ponto e virgula" };
		return token;
	}

	private static q24(palavra: string, index: number): Token | ErroLexico {
		
		const token = { classe: "virgula", lexema: palavra, tipo: "virgula" };
		return token;
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

	private static eReservada(palavra: string) {
		return Reservadas.includes(palavra);
	}

	private static tokenReservado(palavra: string): Token {
		let novoToken: Token;

		TabelaDeSimbolos.some((token) => {
			if (token.lexema === palavra) {
				novoToken = token;
				return;
			}
		});

		return novoToken!;
	}

	private static inserirToken(palavra: string) {
		let token: Token;
		if (Automato.eReservada(palavra)) {
			token = Automato.tokenReservado(palavra);
			return token;
		}
		token = { classe: "id", lexema: palavra, tipo: "id" };
		return token;
	}
}
