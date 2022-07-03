import { AutomatoLexico } from "./model/AutomatoLexico";
import { ErrosLista } from "./model/ErrosLexicos";
import { TabelaDeSimbolos } from "./model/TabelaDeSimbolos";
import { Token, TokenLista } from "./model/Token";

export class AnalisadorLexico {
	static scanner(linha: string, index: number): Token[] {
		const tokens = AutomatoLexico.iniciar(linha, index);

		tokens.forEach((token) => {
			TokenLista.push(token);

			switch (token.classe) {
				case "ERRO":
					ErrosLista.push(token);
					break;
				case "id":
					TabelaDeSimbolos.push(token);
					break;
				default:
					break;
			}
		});

		return tokens;
	}
}
