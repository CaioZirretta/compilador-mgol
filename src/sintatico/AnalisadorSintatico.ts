import { ErroUtils } from "./utils/ErroUtils";
import { arquivoFonte } from "../app";
import { AnalisadorLexico } from "../lexico/AnalisadorLexico";
import { encontrarTerminal, Token } from "../lexico/model/Token";
import { AutomatoSintatico } from "./model/AutomatoSintatico";
import { Producao } from "./model/Producao";
import { TokenUtils } from "../lexico/utils/TokenUtils";
import { AnalisadorSemanticoUtils } from "../semantico/utils/AnalisadorSemanticoUtils";
import { AnalisadorSemantico } from "../semantico/AnalisadorSemantico";

export class AnalisadorSintatico {
	private ip: Token = TokenUtils.tokenVazio();
	private pilhaReserva: Token[] = [];

	parser() {
		this.ip = this.proximoToken();

		const log = (s: string, t: string, a: string, A: string, β: string, ACTION: string) => {
			return console.log(
				`pilha: ${AutomatoSintatico.pilha} | ip: ${this.ip.classe} | s: ${s} | t: ${t} | a: ${a} | A: ${A} | β: ${β} | ACTION: ${ACTION}`
			);
		};

		while (true) {
			let s: string = AutomatoSintatico.topoDaPilha();
			let a: Token = this.ip;
			let A: string = "";
			let β: string = "";

			let [ACTION, t]: string[] = this.acao(s, a);

			// console.log("\nnew cycle...");
			// log(s, t, a.classe, A, β, ACTION);

			if (ACTION === "shift") {
				// console.log("\nshifting...");
				// log(s, t, a.classe, A, β, ACTION);

				this.shift(a, t);

				// log(s, t, a.classe, A, β, ACTION);
			} else if (ACTION === "reduce") {
				// console.log("\nreducing...");
				// log(s, t, a.classe, A, β, ACTION);

				this.reduce(t, A, β);

				// log(s, t, a.classe, A, β, ACTION);
			} else if (ACTION === "acc") {
				// console.log(Producao.producoes[0]);
				Producao.producoesGeradas.push(Producao.producoes[0]);
				return;
			} else if (ACTION === "exchange") {
				// console.log("\nexchanging...");
				// log(s, t, a.classe, A, β, ACTION);
				this.substituicao(s, t, a);
				// log(s, t, a.classe, A, β, ACTION);
				AnalisadorSemanticoUtils.cancelarCriacaoDeCodigo();
			} else {
				if (this.ip.classe === "eof") return;
				// console.log("\npanicking...");
				this.descartarAteProximoToken(a.classe, AutomatoSintatico.topoDaPilha());
			}
		}
	}

	private proximoToken(): Token {
		let token;
		do {
			token = AnalisadorLexico.scanner(arquivoFonte);
		} while (!token);
		return token;
	}

	private shift(a: Token, t: string) {
		AutomatoSintatico.empilhar(a.classe);
		AutomatoSintatico.empilhar(t);

		AnalisadorSemantico.empilhar({
			classe: this.ip.classe,
			lexema: this.ip.lexema,
			tipo: this.ip.tipo,
		} as Token);

		if (this.pilhaReserva.length === 0) {
			this.ip = this.proximoToken();
		} else {
			this.ip = this.pilhaReserva[this.pilhaReserva.length - 1];
			this.pilhaReserva.pop();
		}
	}

	private reduce(t: string, A: string, β: string) {
		const producao: string = Producao.of(parseInt(t));
		A = Producao.ladoEsquerdo(producao);
		β = Producao.ladoDireito(producao).trim();

		β.split(" ").forEach(() => {
			AutomatoSintatico.desempilhar();
			AutomatoSintatico.desempilhar();
		});

		t = AutomatoSintatico.topoDaPilha();

		AutomatoSintatico.empilhar(A);
		AutomatoSintatico.empilhar(this.desvio(t, A));

		Producao.producoesGeradas.push(producao);

		AnalisadorSemantico.iniciar(producao, A, β);

		this.pilhaReserva.length !== 0 ? this.pilhaReserva.pop() : null;
	}

	private acao(s: string, a: Token): string[] {
		const linha: number = AutomatoSintatico.pegarIndiceLinha(s);
		const coluna: number = AutomatoSintatico.pegarIndiceColuna(a.classe);

		let elemento: string = AutomatoSintatico.tabelaSintatica[linha][coluna];

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
				case "D":
					return ["discard", elemento.slice(1)];
				case inicial.match(/[0-9]/)?.input:
					return ["goto", elemento];
			}
		}

		if (a.classe === "erro") {
			ErroUtils.erroLexicoDescricao(a);
		}

		elemento = this.ip.lexema === "eof" ? "eof" : elemento;

		return [`erro`, `elemento: ${elemento} não encontrado em ${linha - 1}, ${coluna}`];
	}

	private desvio(t: string, A: string) {
		const coluna: number = AutomatoSintatico.pegarIndiceColuna(A);
		const linha: number = AutomatoSintatico.pegarIndiceLinha(t);

		const elemento: string = AutomatoSintatico.tabelaSintatica[linha][coluna];

		return elemento;
	}

	// Tratamento de erro por substuição de token
	private substituicao(s: string, t: string, a: Token) {
		const linha: number = AutomatoSintatico.pegarIndiceLinha(s);
		const ACTION: string = AutomatoSintatico.primeiroElementoDe(linha);

		t = t.slice(0);

		const tokenEsperado: string[] = Producao.doEstado(s);

		if (ACTION.startsWith("R")) {
			a = TokenUtils.tokenVazio();

			a.classe = encontrarTerminal(tokenEsperado.join());

			ErroUtils.substituicaoErroDescricao(a.classe, tokenEsperado);

			this.deReducao(t, a);
		}

		if (ACTION.startsWith("S")) {
			ErroUtils.substituicaoErroDescricao(a.classe, tokenEsperado);
			this.deEmpilhamento(t, a);
		}
	}

	private deReducao(t: string, a: Token) {
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

		this.pilhaReserva.push(this.ip);
		// console.log(this.pilhaReserva)
		this.ip = a;
	}

	private deEmpilhamento(t: string, a: Token) {
		AutomatoSintatico.empilhar(a.classe);
		AutomatoSintatico.empilhar(t);
		this.pilhaReserva.push(this.ip);
		// console.log(this.pilhaReserva)
		this.ip = a;
	}
	// Tratamento de erro por descarte de token
	private descartarAteProximoToken(a: string, t: string) {
		const proximosEstados: string[] = Producao.doEstado(t);

		ErroUtils.panicoErroDescricao(a, proximosEstados);

		do {
			this.ip = this.proximoToken();
			if (this.ip.classe === "eof") return;
		} while (!proximosEstados.some((p) => p.trim() === this.ip.classe));
		return;
	}
}
