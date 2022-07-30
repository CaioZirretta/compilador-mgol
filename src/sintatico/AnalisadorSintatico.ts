import { Producao } from "./model/Producao";
import { AutomatoSintatico } from "./model/AutomatoSintatico";
import { tokenExemplo } from "../test/tokenExemplo";
import { arquivoFonte } from "../app";
import { AnalisadorLexico } from "../lexico/AnalisadorLexico";
import { Token } from "../lexico/model/Token";
import { TabelaSintatica } from "./model/TabelaSintatica";

export class AnalisadorSintatico {
	parser() {
		while (true) {
			let a: string = this.proximoToken().classe;
			let s: string = AutomatoSintatico.topoDaPilha();
			let [ACTION, t]: string[] = this.acao(s, a);

			if (ACTION === "shift") {
				AutomatoSintatico.empilhar(a);
				AutomatoSintatico.empilhar(t);
			} else if (ACTION === "reduce") {
				const producao: string = Producao.of(parseInt(a));
				const A: string = Producao.ladoEsquerdo(parseInt(a));
				const β: string[] = Producao.ladoDireito(parseInt(a));

				Producao.ladoDireito(parseInt(a)).forEach(() => {
					AutomatoSintatico.desempilhar();
					AutomatoSintatico.desempilhar();
				});

				AutomatoSintatico.empilhar(A);
				//desvio[t, A]

				console.log(producao);
			} else if (ACTION === "acc") {
				return;
			}
		}
	}

	proximoToken(): Token {
		let token;
		do {
			token = AnalisadorLexico.scanner(arquivoFonte);
		} while (!token);
		return token;
	}

	acao(topoDaPilha: string, simbolo: string): string[] {
		const coluna: number = TabelaSintatica.getHeaderIndex(simbolo);
		const linha: number = TabelaSintatica.getRowIndex(topoDaPilha);

		const elemento: string = TabelaSintatica.tabelaSintatica[linha][coluna];

		if (elemento) {
			if (elemento === "acc") return ["acc"];
			const inicial = elemento[0];
			switch (inicial) {
				case "S":
					return ["shift", elemento.slice(1)];
				case "R":
					return ["reduce", elemento.slice(1)];
				case inicial.match(/[0-9]/)?.input:
					return ["goto", elemento];
				default:
					return ["erro", elemento];
			}
		}

		return ["erro", elemento];
	}
}
