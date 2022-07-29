import { tabelaSintatica } from "./TabelaSintatica";
import { AutomatoSintatico } from "./../AutomatoSintatico";
import { tokenExemplo } from "./../../test/tokenExemplo";
import { arquivoFonte } from "./../../app";
import { AnalisadorLexico } from "./../../lexico/AnalisadorLexico";
import { Token } from "../../lexico/model/Token";
import { getHeaderIndex } from "../utils/TabelaUtils";

export class AnalisadorSintatico {
	private automato = new AutomatoSintatico();

	parser() {
		// let token = this.tokenGarantido()
		// while (true) {
		// }
		console.log(getHeaderIndex("$"));
		console.log(this.acao(1, 1));
		

		// const token: Token = tokenExemplo;
		// const headerIndex = getHeaderIndex(token.classe);
	}

	tokenGarantido() {
		let token;
		do {
			token = AnalisadorLexico.scanner(arquivoFonte);
		} while (!token);
	}

	acao(linha: number, coluna: number) {
		const elemento: string = tabelaSintatica[linha][coluna];
		if (elemento) {
			const inicial = elemento[0];
			switch (inicial) {
				case "S":
					return "shift";
				case "R":
					return "reduce";
				case inicial.match(/[0-9]/)?.input:
					return "goto"
			}
		}
	}
}
