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

		const log = (s: string, t: string, a: string, A: string, β: string, ACTION: string) => {
			return console.log(`pilha: ${AutomatoSintatico.pilha} | ip: ${this.ip.classe} | s: ${s} | t: ${t} | a: ${a} | A: ${A} | β: ${β} | ACTION: ${ACTION}`);
		};

		while (true) {
			let s: string = AutomatoSintatico.topoDaPilha();
			let a: Token = this.ip;
			let A: string = "";
			let β: string = "";

			let [ACTION, t]: string[] = this.acao(s, a);

			// console.log("new cycle...");
			log(s, t, a.classe, A, β, ACTION);

			if (ACTION === "shift") {
				console.log("shifting...");
				log(s, t, a.classe, A, β, ACTION);
				AutomatoSintatico.empilhar(a.classe);
				AutomatoSintatico.empilhar(t);
				this.ip = this.proximoToken();
				log(s, t, a.classe, A, β, ACTION);
			} else if (ACTION === "reduce") {
				console.log("reducing...");

				const producao: string = Producao.of(parseInt(t));
				A = Producao.ladoEsquerdo(producao);
				β = Producao.ladoDireito(producao).trim();
				log(s, t, a.classe, A, β, ACTION);

				β.split(" ").forEach(() => {
					AutomatoSintatico.desempilhar();
					AutomatoSintatico.desempilhar();
				});

				t = AutomatoSintatico.topoDaPilha();

				AutomatoSintatico.empilhar(A);
				AutomatoSintatico.empilhar(this.desvio(t, A));

				log(s, t, a.classe, A, β, ACTION);
				console.log(producao);
			} else if (ACTION === "acc") {
				console.log(Producao.producoes[0]);
				return;
			} else if (ACTION === "exchange") {
				console.log("exchanging...");
				const tokenEsperado: string[] = Producao.doEstado(s);
				this.erroSintaticoDescricao(a.classe, tokenEsperado);

				this.substituicao(s, t, a);
			} else {
				if (this.ip.classe === "eof") return;
				return;
				// this.descartarAteProximoToken(a.classe, AutomatoSintatico.topoDaPilha());
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
		const linha: number = AutomatoSintatico.pegarIndiceLinha(s);
		const coluna: number = AutomatoSintatico.pegarIndiceColuna(a.classe);

		const elemento: string = AutomatoSintatico.tabelaSintatica[linha][coluna];

		if (elemento) {
			if (elemento === "acc") return ["acc"];
			const inicial = elemento[0];
			switch (inicial) {
				case "S":
					return ["shift", elemento.slice(1)];
				case "R":
					return ["reduce", elemento.slice(1)];
				case "E":
					return ["exchange", elemento.slice(1)];
				case inicial.match(/[0-9]/)?.input:
					return ["goto", elemento];
			}
		}

		if (a.classe === "erro") {
			this.erroLexicoDescricao(a);
		}

		return [`erro`, `erro: elemento: ${elemento} não encontrado em ${linha - 1}, ${coluna}`];
	}

	desvio(t: string, A: string) {
		const coluna: number = AutomatoSintatico.pegarIndiceColuna(A);
		const linha: number = AutomatoSintatico.pegarIndiceLinha(t);

		const elemento: string = AutomatoSintatico.tabelaSintatica[linha][coluna];

		return elemento;
	}

	// descartarAteProximoToken(a: string, t: string) {
	// 	const proximosEstados: string[] = Producao.doEstado(t);

	// 	this.erroSintaticoDescricao(a, proximosEstados);

	// 	do {
	// 		this.ip = this.proximoToken();
	// 		if (this.ip.classe === "eof") return;
	// 	} while (!proximosEstados.some((p) => p.trim() === this.ip.classe));
	// 	return;
	// }

	erroLexicoDescricao(token: Token) {
		console.log({
			erro: "Erro Léxico",
			mensagem: "Caractere inválido recebido",
			detalhes: {
				recebido: {
					token: token.lexema,
					liha: AutomatoLexico.linha,
				},
			},
		} as ErroSintatico);
	}

	erroSintaticoDescricao(tokenRecebido: string, proximosEstados: string[]) {
		console.log({
			erro: "Erro sintático",
			mensagem: "Token inválido recebido",
			detalhes: {
				recebido: {
					token: tokenRecebido,
					liha: AutomatoLexico.linha,
				},
				esperado: `${proximosEstados}`,
			},
			acao: `Inserindo token artificalmente: ${proximosEstados}`,
		} as ErroSintatico);
	}

	private substituicao(s: string, t: string, a: Token) {
		const linha: number = AutomatoSintatico.pegarIndiceLinha(s);
		const ACTION: string = AutomatoSintatico.primeiroElementoDe(linha);

		t = t.slice(0);

		if (ACTION.startsWith("R")) this.deReducao(t);
		if (ACTION.startsWith("S")) this.deEmpilhamento(t, a);
	}

	private deReducao(t: string) {
		const producao: string = Producao.of(parseInt(t));
		const A = Producao.ladoEsquerdo(producao);
		const β = Producao.ladoDireito(producao).trim();

		β.split(" ").forEach(() => {
			AutomatoSintatico.desempilhar();
			AutomatoSintatico.desempilhar();
		});

		t = AutomatoSintatico.topoDaPilha();

		AutomatoSintatico.empilhar(A);
		AutomatoSintatico.empilhar(this.desvio(t, A));

		this.ip = this.proximoToken();
	}

	private deEmpilhamento(t: string, a: Token) {
		AutomatoSintatico.empilhar(a.classe);
		AutomatoSintatico.empilhar(t);
		this.ip = this.proximoToken();
	}
}
