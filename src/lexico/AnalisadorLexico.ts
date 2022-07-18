import { AutomatoLexico } from "./model/AutomatoLexico";
import { ErrosLista } from "./model/ErrosLexicos";
import { TabelaDeSimbolos, tabelaDeSimbolosLexemas } from "./model/TabelaDeSimbolos";
import { Token, TokenLista } from "./model/Token";

export class AnalisadorLexico {
	static scanner(arquivo: string): Token | void {
		const token: Token | void = AutomatoLexico.iniciar(arquivo);

		if (token) {
			TokenLista.push(token);

			switch (token.classe) {
				case "ERRO":
					ErrosLista.push(token);
					break;
				case "id":
					if (!tabelaDeSimbolosLexemas().includes(token.lexema)) {
						TabelaDeSimbolos.push(token);
					}
					break;
				case "comentario":
					return;
				default:
					break;
			}
		}

		return token;
	}
}
