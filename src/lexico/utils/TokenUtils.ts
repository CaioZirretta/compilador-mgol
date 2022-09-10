import { Simbolos } from "./../dicionario/Simbolos";
import { arquivoFonte } from "./../../app";
import { Reservadas } from "../dicionario/Simbolos";
import { AutomatoLexico } from "../model/AutomatoLexico";
import { TabelaDeSimbolos } from "../model/TabelaDeSimbolos";
import { Token, TokenClasse, TokenTipo } from "../model/Token";

export class TokenUtils {
	static tokenEOF() {
		if (AutomatoLexico.indexGeral > arquivoFonte.length)
			return {
				classe: TokenClasse.eof,
				lexema: "EOF",
				tipo: TokenTipo.Nulo,
			} as Token;
	}

	static tokenVazio(): Token{
		return { classe: "", lexema: "", tipo: ""} as Token;
	}

	static novoTokenId(arquivo: string) {
		const ajuste = Simbolos.includes(arquivo[AutomatoLexico.indexGeral - 1]) || arquivo[AutomatoLexico.indexGeral - 1] === " " ? -1 : 0;

		let palavra = arquivo.substring(AutomatoLexico.indexAuxiliar, AutomatoLexico.indexGeral + ajuste);

		const token: Token = TokenUtils.gerarTokenId(palavra);

		token.lexema = TokenUtils.formatarPalavra(token.lexema);

		AutomatoLexico.indexGeral += ajuste;

		return token;
	}

	static novoTokenInteiro(arquivo: string) {
		const token: Token = {
			classe: TokenClasse.num,
			lexema: arquivo.substring(AutomatoLexico.indexAuxiliar, AutomatoLexico.indexGeral),
			tipo: TokenTipo.Inteiro,
		};

		token.lexema = TokenUtils.formatarPalavra(token.lexema);

		return token;
	}

	static novoTokenReal(arquivo: string) {
		const token: Token = {
			classe: TokenClasse.num,
			lexema: arquivo.substring(AutomatoLexico.indexAuxiliar, AutomatoLexico.indexGeral),
			tipo: TokenTipo.Real,
		};

		token.lexema = TokenUtils.formatarPalavra(token.lexema);

		return token;
	}

	static quebraDeLinhaId(arquivo: string) {
		let palavra = arquivo.substring(AutomatoLexico.indexAuxiliar, AutomatoLexico.indexGeral);

		const token: Token = TokenUtils.gerarTokenId(palavra);

		AutomatoLexico.indexGeral++;

		return token;
	}

	static gerarTokenId(palavra: string) {
		let token: Token;

		palavra = TokenUtils.formatarPalavra(palavra);

		if (TokenUtils.eReservada(palavra)) {
			token = TokenUtils.tokenReservado(palavra);
			return token;
		}

		token = { classe: TokenClasse.id, lexema: palavra, tipo: TokenTipo.Nulo };

		return token;
	}

	static tokenReservado(palavra: string): Token {
		let novoToken: Token = { classe: TokenClasse.erro, lexema: "EMPTY", tipo: "EMPTY" };

		TabelaDeSimbolos.some((token) => {
			if (token.lexema === palavra) {
				novoToken = token;
				return;
			}
		});

		return novoToken!;
	}

	static eReservada(palavra: string) {
		return Reservadas.includes(palavra);
	}

	static formatarPalavra(palavra: string) {
		palavra = palavra.trim();
		palavra = palavra.replaceAll("\n", "");
		palavra = palavra.replaceAll("\r", "");
		palavra = palavra.replaceAll("\t", "");
		return palavra;
	}
}
