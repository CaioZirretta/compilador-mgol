import { Token } from "../../../lexico/model/Token";
import { AutomatoLexico } from "../../../lexico/model/AutomatoLexico";

describe("Testes com uma palavra só", () => {
	describe("Testes para casos de falha com números", () => {
		it("Número inválido", () => {
			const linha = "1r";
			const token: Token[] = AutomatoLexico.iniciar(linha, 1);
			expect(token).toBeInstanceOf(Array);
			expect(token.length).toBeGreaterThan(0);
			expect(token[0].classe).toBe("ERRO");
		});
		it("Número inválido", () => {
			const linha = "1.";
			const token: Token[] = AutomatoLexico.iniciar(linha, 1);
			expect(token).toBeInstanceOf(Array);
			expect(token.length).toBeGreaterThan(0);
			expect(token[0].classe).toBe("ERRO");
		});
		it("Número inválido", () => {
			const linha = "1.r";
			const token: Token[] = AutomatoLexico.iniciar(linha, 1);
			expect(token).toBeInstanceOf(Array);
			expect(token.length).toBeGreaterThan(0);
			expect(token[0].classe).toBe("ERRO");
		});
		it("Número inválido", () => {
			const linha = "1.1r";
			const token: Token[] = AutomatoLexico.iniciar(linha, 1);
			expect(token).toBeInstanceOf(Array);
			expect(token.length).toBeGreaterThan(0);
			expect(token[0].classe).toBe("ERRO");
		});
		it("Número inválido", () => {
			const linha = "1.1er";
			const token: Token[] = AutomatoLexico.iniciar(linha, 1);
			expect(token).toBeInstanceOf(Array);
			expect(token.length).toBeGreaterThan(0);
			expect(token[0].classe).toBe("ERRO");
		});
		it("Número inválido", () => {
			const linha = "1.1e+r";
			const token: Token[] = AutomatoLexico.iniciar(linha, 1);
			expect(token).toBeInstanceOf(Array);
			expect(token.length).toBeGreaterThan(0);
			expect(token[0].classe).toBe("ERRO");
		});
		it("Número inválido", () => {
			const linha = "1.1e+1r";
			const token: Token[] = AutomatoLexico.iniciar(linha, 1);
			expect(token).toBeInstanceOf(Array);
			expect(token.length).toBeGreaterThan(0);
			expect(token[0].classe).toBe("ERRO");
		});
		it("Número inválido", () => {
			const linha = "1.1e-r";
			const token: Token[] = AutomatoLexico.iniciar(linha, 1);
			expect(token).toBeInstanceOf(Array);
			expect(token.length).toBeGreaterThan(0);
			expect(token[0].classe).toBe("ERRO");
		});
		it("Número inválido", () => {
			const linha = "1.1e-1r";
			const token: Token[] = AutomatoLexico.iniciar(linha, 1);
			expect(token).toBeInstanceOf(Array);
			expect(token.length).toBeGreaterThan(0);
			expect(token[0].classe).toBe("ERRO");
		});
	});

	describe("Testes de sucesso com números", () => {
		it("Número válido", () => {
			const linha = "1";
			const token: Token[] = AutomatoLexico.iniciar(linha, 1);
			expect(token).toBeInstanceOf(Array);
			expect(token.length).toBeGreaterThan(0);
			expect(token[0].classe).toBe("Num");
		});
		it("Número válido", () => {
			const linha = "1.1";
			const token: Token[] = AutomatoLexico.iniciar(linha, 1);
			expect(token).toBeInstanceOf(Array);
			expect(token.length).toBeGreaterThan(0);
			expect(token[0].classe).toBe("Num");
		});
		it("Número válido", () => {
			const linha = "1.1e+1";
			const token: Token[] = AutomatoLexico.iniciar(linha, 1);
			expect(token).toBeInstanceOf(Array);
			expect(token.length).toBeGreaterThan(0);
			expect(token[0].classe).toBe("Num");
		});
		it("Número válido", () => {
			const linha = "1.1e-1";
			const token: Token[] = AutomatoLexico.iniciar(linha, 1);
			expect(token).toBeInstanceOf(Array);
			expect(token.length).toBeGreaterThan(0);
			expect(token[0].classe).toBe("Num");
		});
	});

	describe("Testes com literais", () => {
		it("Literal válido", () => {
			const linha = '"123"';
			const token: Token[] = AutomatoLexico.iniciar(linha, 1);
			expect(token).toBeInstanceOf(Array);
			expect(token.length).toBeGreaterThan(0);
			expect(token[0].classe).toBe("Lit");
		});
		it("Literal inválido", () => {
			const linha = '"123';
			const token: Token[] = AutomatoLexico.iniciar(linha, 1);
			expect(token).toBeInstanceOf(Array);
			expect(token.length).toBeGreaterThan(0);
			expect(token[0].classe).toBe("ERRO");
		});
	});

	describe("Testes com identificadores", () => {
		it("Identificador válido", () => {
			const linha = "palavra";
			const token: Token[] = AutomatoLexico.iniciar(linha, 1);
			expect(token).toBeInstanceOf(Array);
			expect(token.length).toBeGreaterThan(0);
			expect(token[0].classe).toBe("id");
		});
		it("Identificadores válidos", () => {
			const linha = "muitas palavras em uma frase";
			const token: Token[] = AutomatoLexico.iniciar(linha, 1);
			expect(token).toBeInstanceOf(Array);
			expect(token.length).toBeGreaterThan(0);
			token.forEach((t) => {
				expect(t.classe).toBe("id");
			});
		});
		it("Identificador válido", () => {
			const linha = "inicio";
			const token: Token[] = AutomatoLexico.iniciar(linha, 1);
			expect(token).toBeInstanceOf(Array);
			expect(token.length).toBeGreaterThan(0);
			expect(token[0].classe).toBe("inicio");
		});
		it("Identificador válido", () => {
			const linha = "varinicio";
			const token: Token[] = AutomatoLexico.iniciar(linha, 1);
			expect(token).toBeInstanceOf(Array);
			expect(token.length).toBeGreaterThan(0);
			expect(token[0].classe).toBe("varinicio");
		});
		it("Identificador válido", () => {
			const linha = "varfim";
			const token: Token[] = AutomatoLexico.iniciar(linha, 1);
			expect(token).toBeInstanceOf(Array);
			expect(token.length).toBeGreaterThan(0);
			expect(token[0].classe).toBe("varfim");
		});
		it("Identificador válido", () => {
			const linha = "escreva";
			const token: Token[] = AutomatoLexico.iniciar(linha, 1);
			expect(token).toBeInstanceOf(Array);
			expect(token.length).toBeGreaterThan(0);
			expect(token[0].classe).toBe("escreva");
		});
		it("Identificador válido", () => {
			const linha = "leia";
			const token: Token[] = AutomatoLexico.iniciar(linha, 1);
			expect(token).toBeInstanceOf(Array);
			expect(token.length).toBeGreaterThan(0);
			expect(token[0].classe).toBe("leia");
		});
		it("Identificador válido", () => {
			const linha = "se";
			const token: Token[] = AutomatoLexico.iniciar(linha, 1);
			expect(token).toBeInstanceOf(Array);
			expect(token.length).toBeGreaterThan(0);
			expect(token[0].classe).toBe("se");
		});
		it("Identificador válido", () => {
			const linha = "entao";
			const token: Token[] = AutomatoLexico.iniciar(linha, 1);
			expect(token).toBeInstanceOf(Array);
			expect(token.length).toBeGreaterThan(0);
			expect(token[0].classe).toBe("entao");
		});
		it("Identificador válido", () => {
			const linha = "fimse";
			const token: Token[] = AutomatoLexico.iniciar(linha, 1);
			expect(token).toBeInstanceOf(Array);
			expect(token.length).toBeGreaterThan(0);
			expect(token[0].classe).toBe("fimse");
		});
		it("Identificador válido", () => {
			const linha = "repita";
			const token: Token[] = AutomatoLexico.iniciar(linha, 1);
			expect(token).toBeInstanceOf(Array);
			expect(token.length).toBeGreaterThan(0);
			expect(token[0].classe).toBe("repita");
		});
		it("Identificador válido", () => {
			const linha = "fimRepita";
			const token: Token[] = AutomatoLexico.iniciar(linha, 1);
			expect(token).toBeInstanceOf(Array);
			expect(token.length).toBeGreaterThan(0);
			expect(token[0].classe).toBe("fimRepita");
		});
		it("Identificador válido", () => {
			const linha = "fim";
			const token: Token[] = AutomatoLexico.iniciar(linha, 1);
			expect(token).toBeInstanceOf(Array);
			expect(token.length).toBeGreaterThan(0);
			expect(token[0].classe).toBe("EOF");
		});
		it("Identificador válido", () => {
			const linha = "inteiro";
			const token: Token[] = AutomatoLexico.iniciar(linha, 1);
			expect(token).toBeInstanceOf(Array);
			expect(token.length).toBeGreaterThan(0);
			expect(token[0].classe).toBe("inteiro");
		});
		it("Identificador válido", () => {
			const linha = "literal";
			const token: Token[] = AutomatoLexico.iniciar(linha, 1);
			expect(token).toBeInstanceOf(Array);
			expect(token.length).toBeGreaterThan(0);
			expect(token[0].classe).toBe("literal");
		});
		it("Identificador válido", () => {
			const linha = "real";
			const token: Token[] = AutomatoLexico.iniciar(linha, 1);
			expect(token).toBeInstanceOf(Array);
			expect(token.length).toBeGreaterThan(0);
			expect(token[0].classe).toBe("real");
		});
	});

	describe("Testes com comentários", () => {
		it("Comentário válido", () => {
			const linha = "{asd}";
			const token: Token[] = AutomatoLexico.iniciar(linha, 1);
			expect(token).toBeInstanceOf(Array);
			expect(token.length).toBeGreaterThan(0);
			expect(token[0].classe).toBe("Comentario");
		});
		it("Comentário inválido", () => {
			const linha = "{asdas";
			const token: Token[] = AutomatoLexico.iniciar(linha, 1);
			expect(token).toBeInstanceOf(Array);
			expect(token.length).toBeGreaterThan(0);
			expect(token[0].classe).toBe("ERRO");
		});
	});

	describe("Testes com atribuição", () => {
		it("Atribuição válido", () => {
			const linha = "<-";
			const token: Token[] = AutomatoLexico.iniciar(linha, 1);
			expect(token).toBeInstanceOf(Array);
			expect(token.length).toBeGreaterThan(0);
			expect(token[0].classe).toBe("RCB");
		});
	});

	describe("Testes com operadores relacionais", () => {
		it("Operador relacional válido", () => {
			const linha = "<";
			const token: Token[] = AutomatoLexico.iniciar(linha, 1);
			expect(token).toBeInstanceOf(Array);
			expect(token.length).toBeGreaterThan(0);
			expect(token[0].classe).toBe("OPR");
		});
		it("Operador relacional válido", () => {
			const linha = "<=";
			const token: Token[] = AutomatoLexico.iniciar(linha, 1);
			expect(token).toBeInstanceOf(Array);
			expect(token.length).toBeGreaterThan(0);
			expect(token[0].classe).toBe("OPR");
		});
		it("Operador relacional válido", () => {
			const linha = ">";
			const token: Token[] = AutomatoLexico.iniciar(linha, 1);
			expect(token).toBeInstanceOf(Array);
			expect(token.length).toBeGreaterThan(0);
			expect(token[0].classe).toBe("OPR");
		});
		it("Operador relacional válido", () => {
			const linha = "> ";
			const token: Token[] = AutomatoLexico.iniciar(linha, 1);
			expect(token).toBeInstanceOf(Array);
			expect(token.length).toBeGreaterThan(0);
			expect(token[0].classe).toBe("OPR");
		});
		it("Operador relacional válido", () => {
			const linha = ">=";
			const token: Token[] = AutomatoLexico.iniciar(linha, 1);
			expect(token).toBeInstanceOf(Array);
			expect(token.length).toBeGreaterThan(0);
			expect(token[0].classe).toBe("OPR");
		});
	});

	describe("Testes com atribuição", () => {
		it("Operador aritmético válido", () => {
			const linha = "+";
			const token: Token[] = AutomatoLexico.iniciar(linha, 1);
			expect(token).toBeInstanceOf(Array);
			expect(token.length).toBeGreaterThan(0);
			expect(token[0].classe).toBe("OPM");
		});
		it("Operador aritmético válido", () => {
			const linha = "-";
			const token: Token[] = AutomatoLexico.iniciar(linha, 1);
			expect(token).toBeInstanceOf(Array);
			expect(token.length).toBeGreaterThan(0);
			expect(token[0].classe).toBe("OPM");
		});
		it("Operador aritmético válido", () => {
			const linha = "*";
			const token: Token[] = AutomatoLexico.iniciar(linha, 1);
			expect(token).toBeInstanceOf(Array);
			expect(token.length).toBeGreaterThan(0);
			expect(token[0].classe).toBe("OPM");
		});
		it("Operador aritmético válido", () => {
			const linha = "/";
			const token: Token[] = AutomatoLexico.iniciar(linha, 1);
			expect(token).toBeInstanceOf(Array);
			expect(token.length).toBeGreaterThan(0);
			expect(token[0].classe).toBe("OPM");
		});
	});

	describe("Testes com parênteses", () => {
		it("Abre parênteses válido", () => {
			const linha = "(";
			const token: Token[] = AutomatoLexico.iniciar(linha, 1);
			expect(token).toBeInstanceOf(Array);
			expect(token.length).toBeGreaterThan(0);
			expect(token[0].classe).toBe("AB_P");
		});
		it("Fecha parênteses válido", () => {
			const linha = ")";
			const token: Token[] = AutomatoLexico.iniciar(linha, 1);
			expect(token).toBeInstanceOf(Array);
			expect(token.length).toBeGreaterThan(0);
			expect(token[0].classe).toBe("FC_P");
		});
	});

	describe("Testes com vírgula", () => {
		it("Abre parênteses válido", () => {
			const linha = ",";
			const token: Token[] = AutomatoLexico.iniciar(linha, 1);
			expect(token).toBeInstanceOf(Array);
			expect(token.length).toBeGreaterThan(0);
			expect(token[0].classe).toBe("Vir");
		});
	});

	describe("Testes com ponto e vírgula", () => {
		it("Abre parênteses válido", () => {
			const linha = ";";
			const token: Token[] = AutomatoLexico.iniciar(linha, 1);
			expect(token).toBeInstanceOf(Array);
			expect(token.length).toBeGreaterThan(0);
			expect(token[0].classe).toBe("PT_V");
		});
	});
});

describe("Testes com frases", () => {
	it("Frase válida", () => {
		const linha = "inicio se(B>A)A<-1;fimse";
		const token: Token[] = AutomatoLexico.iniciar(linha, 1);
		expect(token).toBeInstanceOf(Array);
		expect(token.length).toBeGreaterThan(0);
		token.forEach(t => {
			expect(t.classe).not.toBe("ERRO");
		})
	});
});
