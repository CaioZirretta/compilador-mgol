import { Producao } from "./model/Producao";
import { AutomatoSintatico } from "./model/AutomatoSintatico";
import { tokenExemplo } from "../test/tokenExemplo";
import { arquivoFonte } from "../app";
import { AnalisadorLexico } from "../lexico/AnalisadorLexico";
import { Token } from "../lexico/model/Token";

export class AnalisadorSintatico {
	private ip: Token = tokenExemplo;
	
	parser() {
		this.ip = this.proximoToken();
		while (true) {
			let s: string = AutomatoSintatico.topoDaPilha();
			let a: string = this.ip.classe;
			let A: string = "";
			let β: string = "";

			let [ACTION, t]: string[] = this.acao(s, a);

			// console.log("new cycle...");
			// log();

			if (ACTION === "shift") {
				// console.log("shifting...");
				// log();
				AutomatoSintatico.empilhar(a);
				AutomatoSintatico.empilhar(t);
				this.ip = this.proximoToken();
				// log();
			} else if (ACTION === "reduce") {
				// console.log("reducing...");

				const producao: string = Producao.of(parseInt(t));
				A = Producao.ladoEsquerdo(producao);
				β = Producao.ladoDireito(producao).trim();
				// log();

				β.split(" ").forEach(() => {
					AutomatoSintatico.desempilhar();
					AutomatoSintatico.desempilhar();
				});

				t = AutomatoSintatico.topoDaPilha();

				AutomatoSintatico.empilhar(A);
				AutomatoSintatico.empilhar(this.desvio(t, A));

				// log();
				console.log(producao);
			} else if (ACTION === "acc") {
				return;
			} else {
				return;
			}

			const log = () => {
				return console.log(`pilha: ${AutomatoSintatico.pilha} | ip: ${this.ip.classe} | s: ${s} | t: ${t} | a: ${a} | A: ${A} | β: ${β} | ACTION: ${ACTION}`);
				// return console.log(`ip: ${ip}`);
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

	acao(s: string, a: string): string[] {
		const linha: number = AutomatoSintatico.getRowIndex(s);
		const coluna: number = AutomatoSintatico.getColumnIndex(a);

		const elemento: string = AutomatoSintatico.tabelaSintatica[linha][coluna];

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
			}
		}

		return [`erro: elemento não encontrado em ${linha - 1}, ${coluna}`];
	}

	desvio(t: string, A: string) {
		const coluna: number = AutomatoSintatico.getColumnIndex(A);
		const linha: number = AutomatoSintatico.getRowIndex(t);

		const elemento: string = AutomatoSintatico.tabelaSintatica[linha][coluna];

		return elemento;
	}

	modoPanico(elemento: string){
		// do{
		// 	ip = 
		// }
	}
}
