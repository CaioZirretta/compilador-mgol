import { arquivoFonte } from "../app";
import { AnalisadorLexico } from "../lexico/AnalisadorLexico";
import { AutomatoLexico } from "../lexico/model/AutomatoLexico";
import { Token } from "../lexico/model/Token";
import { tokenExemplo } from "../test/tokenExemplo";
import { AutomatoSintatico } from "./model/AutomatoSintatico";
import { ErroSintatico } from "./model/ErroSinaticos";
import { Producao } from "./model/Producao";

export class AnalisadorSintatico {
	private ip: Token = tokenExemplo;

	parser() {
		this.ip = this.proximoToken();
		while (true) {
			const log = () => {
				return console.log(`pilha: ${AutomatoSintatico.pilha} | ip: ${this.ip.classe} | s: ${s} | t: ${t} | a: ${a} | A: ${A} | β: ${β} | ACTION: ${ACTION}`);
				// return console.log(`ip: ${ip}`);
			};
			
			let s: string = AutomatoSintatico.topoDaPilha();
			let a: Token = this.ip;
			let A: string = "";
			let β: string = "";

			let [ACTION, t]: string[] = this.acao(s, a);

			// console.log("new cycle...");
			// log();

			if (ACTION === "shift") {
				console.log("shifting...");
				log();
				AutomatoSintatico.empilhar(a.classe);
				AutomatoSintatico.empilhar(t);
				this.ip = this.proximoToken();
				log();
			} else if (ACTION === "reduce") {
				console.log("reducing...");

				const producao: string = Producao.of(parseInt(t));
				A = Producao.ladoEsquerdo(producao);
				β = Producao.ladoDireito(producao).trim();
				log();

				β.split(" ").forEach(() => {
					AutomatoSintatico.desempilhar();
					AutomatoSintatico.desempilhar();
				});

				t = AutomatoSintatico.topoDaPilha();

				AutomatoSintatico.empilhar(A);
				AutomatoSintatico.empilhar(this.desvio(t, A));

				log();
				console.log(producao);
			} else if (ACTION === "acc") {
				return;
			} else {
				if (this.ip.classe === "eof") return;
				this.descartarAteProximoToken(a.classe, AutomatoSintatico.topoDaPilha());
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

	acao(s: string, a: Token): string[] {
		const linha: number = AutomatoSintatico.getRowIndex(s);
		const coluna: number = AutomatoSintatico.getColumnIndex(a.classe);

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

		if(a.classe === "erro"){
			console.log({
				erro: "Erro Léxico",
				mensagem: "Caractere inválido recebido",
				detalhes: {
					recebido: {
						token: a.lexema,
						liha: AutomatoLexico.linha,
					},
				},
			} as ErroSintatico);
		}

		return [`erro: elemento não encontrado em ${linha - 1}, ${coluna}`];
	}

	desvio(t: string, A: string) {
		const coluna: number = AutomatoSintatico.getColumnIndex(A);
		const linha: number = AutomatoSintatico.getRowIndex(t);

		const elemento: string = AutomatoSintatico.tabelaSintatica[linha][coluna];

		return elemento;
	}

	descartarAteProximoToken(a: string, t: string) {
		const proximosEstados: string[] = Producao.doEstado(t);
		
		console.log({
			erro: "Erro sintático",
			mensagem: "Token inválido recebido",
			detalhes: {
				recebido: {
					token: a,
					liha: AutomatoLexico.linha,
				},
				esperado: proximosEstados.join(','),
			},
		} as ErroSintatico);

		do {
			this.ip = this.proximoToken();
			if (this.ip.classe === "eof") return;
		} while (!proximosEstados.some((p) => p.trim() === this.ip.classe));
		return;
	}

	modoPanico(){

	}
}
