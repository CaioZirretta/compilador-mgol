import { Token } from "../../../lexico/model/Token";
import { AutomatoLexico } from "../../../lexico/model/AutomatoLexico";

describe("Testes com uma palavra só", () => {
	// describe("Testes para casos de falha com números", () => {
	// 	it("Número inválido", () => {
	// 		const linha = "1r";
	// 		const token: any = AutomatoLexico.iniciar(linha);
	// 		expect(token.classe).toBe("ERRO");
	// 	});
	// 	it("Número inválido", () => {
	// 		const linha = "1.";
	// 		const token: any = AutomatoLexico.iniciar(linha);
	// 		expect(token.classe).toBe("ERRO");
	// 	});
	// 	it("Número inválido", () => {
	// 		const linha = "1.r";
	// 		const token: any = AutomatoLexico.iniciar(linha);
	// 		expect(token.classe).toBe("ERRO");
	// 	});
	// 	it("Número inválido", () => {
	// 		const linha = "1.1r";
	// 		const token: any = AutomatoLexico.iniciar(linha);
	// 		expect(token.classe).toBe("ERRO");
	// 	});
	// 	it("Número inválido", () => {
	// 		const linha = "1.1er";
	// 		const token: any = AutomatoLexico.iniciar(linha);
	// 		expect(token.classe).toBe("ERRO");
	// 	});
	// 	it("Número inválido", () => {
	// 		const linha = "1.1e+r";
	// 		const token: any = AutomatoLexico.iniciar(linha);
	// 		expect(token.classe).toBe("ERRO");
	// 	});
	// 	it("Número inválido", () => {
	// 		const linha = "1.1e+1r";
	// 		const token: any = AutomatoLexico.iniciar(linha);
	// 		expect(token.classe).toBe("ERRO");
	// 	});
	// 	it("Número inválido", () => {
	// 		const linha = "1.1e-r";
	// 		const token: any = AutomatoLexico.iniciar(linha);
	// 		expect(token.classe).toBe("ERRO");
	// 	});
	// 	it("Número inválido", () => {
	// 		const linha = "1.1e-1r";
	// 		const token: any = AutomatoLexico.iniciar(linha);
	// 		expect(token.classe).toBe("ERRO");
	// 	});
	// });

	describe("Testes de sucesso com números", () => {
		it("Número válido", () => {
			const linha = "1";
			const token: any = AutomatoLexico.iniciar(linha);
			expect(token.classe).toBe("Num");
		});
		it("Número válido", () => {
			const linha = "1.1";
			const token: any = AutomatoLexico.iniciar(linha);
			expect(token.classe).toBe("Num");
		});
		it("Número válido", () => {
			const linha = "1.1e+1";
			const token: any = AutomatoLexico.iniciar(linha);
			expect(token.classe).toBe("Num");
		});
		it("Número válido", () => {
			const linha = "1.1e-1";
			const token: any = AutomatoLexico.iniciar(linha);
			expect(token.classe).toBe("Num");
		});
	});

	// describe("Testes com literais", () => {
	// 	it("Literal válido", () => {
	// 		const linha = '"123"';
	// 		const token: any = AutomatoLexico.iniciar(linha);
	// 		expect(token.classe).toBe("Lit");
	// 	});
	// 	it("Literal inválido", () => {
	// 		const linha = '"123';
	// 		const token: any = AutomatoLexico.iniciar(linha);
	// 		expect(token.classe).toBe("ERRO");
	// 	});
	// });

	// describe("Testes com identificadores", () => {
	// 	it("Identificador válido", () => {
	// 		const linha = "palavra";
	// 		const token: any = AutomatoLexico.iniciar(linha);
	// 		expect(token.classe).toBe("id");
	// 	});
	// 	it("Identificadores válidos", () => {
	// 		const linha = "muitas palavras em uma frase";
	// 		const token: any = AutomatoLexico.iniciar(linha);
	// 		expect(token.classe).toBe("id");
	// 	});
	// 	it("Identificador válido", () => {
	// 		const linha = "inicio";
	// 		const token: any = AutomatoLexico.iniciar(linha);
	// 		expect(token.classe).toBe("inicio");
	// 	});
	// 	it("Identificador válido", () => {
	// 		const linha = "varinicio";
	// 		const token: any = AutomatoLexico.iniciar(linha);
	// 		expect(token.classe).toBe("varinicio");
	// 	});
	// 	it("Identificador válido", () => {
	// 		const linha = "varfim";
	// 		const token: any = AutomatoLexico.iniciar(linha);
	// 		expect(token.classe).toBe("varfim");
	// 	});
	// 	it("Identificador válido", () => {
	// 		const linha = "escreva";
	// 		const token: any = AutomatoLexico.iniciar(linha);
	// 		expect(token.classe).toBe("escreva");
	// 	});
	// 	it("Identificador válido", () => {
	// 		const linha = "leia";
	// 		const token: any = AutomatoLexico.iniciar(linha);
	// 		expect(token.classe).toBe("leia");
	// 	});
	// 	it("Identificador válido", () => {
	// 		const linha = "se";
	// 		const token: any = AutomatoLexico.iniciar(linha);
	// 		expect(token.classe).toBe("se");
	// 	});
	// 	it("Identificador válido", () => {
	// 		const linha = "entao";
	// 		const token: any = AutomatoLexico.iniciar(linha);
	// 		expect(token.classe).toBe("entao");
	// 	});
	// 	it("Identificador válido", () => {
	// 		const linha = "fimse";
	// 		const token: any = AutomatoLexico.iniciar(linha);
	// 		expect(token.classe).toBe("fimse");
	// 	});
	// 	it("Identificador válido", () => {
	// 		const linha = "repita";
	// 		const token: any = AutomatoLexico.iniciar(linha);
	// 		expect(token.classe).toBe("repita");
	// 	});
	// 	it("Identificador válido", () => {
	// 		const linha = "fimRepita";
	// 		const token: any = AutomatoLexico.iniciar(linha);
	// 		expect(token.classe).toBe("fimRepita");
	// 	});
	// 	it("Identificador válido", () => {
	// 		const linha = "fim";
	// 		const token: any = AutomatoLexico.iniciar(linha);
	// 		expect(token.classe).toBe("EOF");
	// 	});
	// 	it("Identificador válido", () => {
	// 		const linha = "inteiro";
	// 		const token: any = AutomatoLexico.iniciar(linha);
	// 		expect(token.classe).toBe("inteiro");
	// 	});
	// 	it("Identificador válido", () => {
	// 		const linha = "literal";
	// 		const token: any = AutomatoLexico.iniciar(linha);
	// 		expect(token.classe).toBe("literal");
	// 	});
	// 	it("Identificador válido", () => {
	// 		const linha = "real";
	// 		const token: any = AutomatoLexico.iniciar(linha);
	// 		expect(token.classe).toBe("real");
	// 	});
	// });

	// describe("Testes com comentários", () => {
	// 	it("Comentário válido", () => {
	// 		const linha = "{asd}";
	// 		const token: any = AutomatoLexico.iniciar(linha);
	// 		expect(token.classe).toBe("Comentario");
	// 	});
	// 	it("Comentário inválido", () => {
	// 		const linha = "{asdas";
	// 		const token: any = AutomatoLexico.iniciar(linha);
	// 		expect(token.classe).toBe("ERRO");
	// 	});
	// });

	// describe("Testes com atribuição", () => {
	// 	it("Atribuição válido", () => {
	// 		const linha = "<-";
	// 		const token: any = AutomatoLexico.iniciar(linha);
	// 		expect(token.classe).toBe("RCB");
	// 	});
	// });

	// describe("Testes com operadores relacionais", () => {
	// 	it("Operador relacional válido", () => {
	// 		const linha = "<";
	// 		const token: any = AutomatoLexico.iniciar(linha);

	// 		expect(token.classe).toBe("OPR");
	// 	});
	// 	it("Operador relacional válido", () => {
	// 		const linha = "<=";
	// 		const token: any = AutomatoLexico.iniciar(linha);
	// 		expect(token.classe).toBe("OPR");
	// 	});
	// 	it("Operador relacional válido", () => {
	// 		const linha = ">";
	// 		const token: any = AutomatoLexico.iniciar(linha);
	// 		expect(token.classe).toBe("OPR");
	// 	});
	// 	it("Operador relacional válido", () => {
	// 		const linha = "> ";
	// 		const token: any = AutomatoLexico.iniciar(linha);
	// 		expect(token.classe).toBe("OPR");
	// 	});
	// 	it("Operador relacional válido", () => {
	// 		const linha = ">=";
	// 		const token: any = AutomatoLexico.iniciar(linha);
	// 		expect(token.classe).toBe("OPR");
	// 	});
	// });

	// describe("Testes com atribuição", () => {
	// 	it("Operador aritmético válido", () => {
	// 		const linha = "+";
	// 		const token: any = AutomatoLexico.iniciar(linha);

	// 		expect(token.classe).toBe("OPM");
	// 	});
	// 	it("Operador aritmético válido", () => {
	// 		const linha = "-";
	// 		const token: any = AutomatoLexico.iniciar(linha);
	// 		expect(token.classe).toBe("OPM");
	// 	});
	// 	it("Operador aritmético válido", () => {
	// 		const linha = "*";
	// 		const token: any = AutomatoLexico.iniciar(linha);
	// 		expect(token.classe).toBe("OPM");
	// 	});
	// 	it("Operador aritmético válido", () => {
	// 		const linha = "/";
	// 		const token: any = AutomatoLexico.iniciar(linha);
	// 		expect(token.classe).toBe("OPM");
	// 	});
	// });

	// describe("Testes com parênteses", () => {
	// 	it("Abre parênteses válido", () => {
	// 		const linha = "(";
	// 		const token: any = AutomatoLexico.iniciar(linha);
	// 		expect(token.classe).toBe("AB_P");
	// 	});
	// 	it("Fecha parênteses válido", () => {
	// 		const linha = ")";
	// 		const token: any = AutomatoLexico.iniciar(linha);
	// 		expect(token.classe).toBe("FC_P");
	// 	});
	// });

	// describe("Testes com vírgula", () => {
	// 	it("Abre parênteses válido", () => {
	// 		const linha = ",";
	// 		const token: any = AutomatoLexico.iniciar(linha);
	// 		expect(token.classe).toBe("Vir");
	// 	});
	// });

	// describe("Testes com ponto e vírgula", () => {
	// 	it("Abre parênteses válido", () => {
	// 		const linha = ";";
	// 		const token: any = AutomatoLexico.iniciar(linha);
	// 		expect(token.classe).toBe("PT_V");
	// 	});
	// });
});

// describe("Testes com frases", () => {
// 	it("Frase válida", () => {
// 		const linha = "inicio se(B>A)A<-1;fimse";
// 		const token: any = AutomatoLexico.iniciar(linha);
// 		expect(token.classe).not.toBe("ERRO");
// 	});
// });
