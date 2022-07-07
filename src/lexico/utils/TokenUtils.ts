import { Simbolos } from "./../dicionario/Simbolos";
import { arquivoFonte } from "./../../app";
import { AutomatoLexicoUtils } from "./AutomatoLexicoUtils";
import { Reservadas } from "../dicionario/Simbolos";
import { AutomatoLexico } from "../model/AutomatoLexico";
import { TabelaDeSimbolos } from "../model/TabelaDeSimbolos";
import { Token, TokenClasse, TokenTipo } from "../model/Token";

export class TokenUtils {
	static tokenEOF() {
		if (AutomatoLexico.indexGeral > arquivoFonte.length)
			return {
				classe: TokenClasse.EOF,
				lexema: "EOF",
				tipo: TokenTipo.Nulo,
			} as Token;
	}

	static novoTokenId(arquivo: string) {
		const ajuste =
			Simbolos.includes(arquivo[AutomatoLexico.indexGeral - 1]) ||
			arquivo[AutomatoLexico.indexGeral - 1] === " "
				? -1
				: 0;

		let palavra = arquivo.substring(AutomatoLexico.indexAuxiliar, AutomatoLexico.indexGeral + ajuste);

		const token: Token = TokenUtils.inserirToken(palavra);

		token.lexema = TokenUtils.formatarToken(token);

		// if (arquivo[AutomatoLexico.indexGeral] === "\n") {
		// 	AutomatoLexicoUtils.quebraDeLinha();
		// }

		AutomatoLexico.indexGeral += ajuste;

		return token;
	}

	static novoTokenInteiro(arquivo: string) {
		const token: Token = {
			classe: TokenClasse.Num,
			lexema: arquivo.substring(AutomatoLexico.indexAuxiliar, AutomatoLexico.indexGeral),
			tipo: TokenTipo.Inteiro,
		};

		// if (arquivo[AutomatoLexico.indexGeral] === "\n") {
		// 	AutomatoLexicoUtils.quebraDeLinha();
		// }

		token.lexema = TokenUtils.formatarToken(token);

		return token;
	}

	static novoTokenReal(arquivo: string) {
		const token: Token = {
			classe: TokenClasse.real,
			lexema: arquivo.substring(AutomatoLexico.indexAuxiliar, AutomatoLexico.indexGeral),
			tipo: TokenTipo.Real,
		};

		// if (arquivo[AutomatoLexico.indexGeral] === "\n") {
		// 	AutomatoLexicoUtils.quebraDeLinha();
		// }

		token.lexema = TokenUtils.formatarToken(token);

		return token;
	}

	static quebraDeLinhaId(arquivo: string) {
		let palavra = arquivo.substring(AutomatoLexico.indexAuxiliar, AutomatoLexico.indexGeral);

		const token: Token = TokenUtils.inserirToken(palavra);

		AutomatoLexico.indexGeral++;

		// if (arquivo[AutomatoLexico.indexGeral] === "\n") {
		// 	AutomatoLexicoUtils.quebraDeLinha();
		// }

		return token;
	}

	static formatarToken(token: Token) {
		let lexema = token.lexema;

		lexema = lexema.replaceAll("\n", "");
		lexema = lexema.replaceAll("\r", "");

		return lexema;
	}

	static eReservada(palavra: string) {
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
		if (TokenUtils.eReservada(palavra)) {
			token = TokenUtils.tokenReservado(palavra);
			return token;
		}
		token = { classe: TokenClasse.id, lexema: palavra, tipo: TokenTipo.Nulo };
		return token;
	}
}
