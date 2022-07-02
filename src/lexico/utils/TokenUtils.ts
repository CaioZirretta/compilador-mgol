import { Reservadas } from "../dicionario/Simbolos";
import { AutomatoLexico } from "../model/AutomatoLexico";
import { TabelaDeSimbolos } from "../model/TabelaDeSimbolos";
import { Token, TokenClasse, TokenTipo } from "../model/Token";

export class TokenUtils {
	static eReservada(palavra: string) {
		return Reservadas.includes(palavra);
	}

	static tokenReservado(palavra: string): Token {
		let novoToken: Token;

		TabelaDeSimbolos.some((token) => {
			if (token.lexema === palavra) {
				novoToken = token;
				return;
			}
		});

		return novoToken!;
	}

	static inserirToken(palavra: string) {
		let token: Token;
		if (TokenUtils.eReservada(palavra)) {
			token = TokenUtils.tokenReservado(palavra);
			return token;
		}
		token = { classe: TokenClasse.id, lexema: palavra, tipo: TokenTipo.Nulo };
		return token;
	}

	static novoTokenReal(linha: string, index: number) {
		const token: Token = {
			classe: TokenClasse.Num,
			lexema: linha.substring(AutomatoLexico.indexInicial, index - 1),
			tipo: TokenTipo.Real,
		};
		AutomatoLexico.tokens.push(token);
		AutomatoLexico.q0(linha, index - 1);
		return;
	}

	static novoTokenInteiro(linha: string, index: number) {
		const token: Token = {
			classe: TokenClasse.Num,
			lexema: linha.substring(AutomatoLexico.indexInicial, index - 1),
			tipo: TokenTipo.Inteiro,
		};
		AutomatoLexico.tokens.push(token);
		AutomatoLexico.q0(linha, index - 1);
		return;
	}

	static novoTokenid(linha: string, index: number) {
		let token: Token;
		let linhaN = linha.substring(AutomatoLexico.indexInicial, index - 1);

		token = TokenUtils.inserirToken(linhaN);

		AutomatoLexico.tokens.push(token);
		AutomatoLexico.q0(linha, index - 1);
		return;
	}

	static novoTokenAtribuicao(linha: string, index: number) {
		const token: Token = {
			classe: TokenClasse.RCB,
			lexema: linha.substring(AutomatoLexico.indexInicial, index - 1),
			tipo: TokenTipo.Nulo,
		};

		AutomatoLexico.tokens.push(token);

		AutomatoLexico.q0(linha, index - 1);
		return;
	}

	static tokenEOF() {
		const tokenEOF: Token = {
			classe: TokenClasse.EOF,
			lexema: "EOF",
			tipo: TokenTipo.Nulo,
		};
		AutomatoLexico.tokens.push(tokenEOF);
		return;
	}
}
