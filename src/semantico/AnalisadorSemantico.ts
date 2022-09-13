import { ErroUtils } from "./../sintatico/utils/ErroUtils";
import { procuraPorLexema, TabelaDeSimbolos, verificarDeclaracaoId } from "./../lexico/model/TabelaDeSimbolos";
import { Token } from "./../lexico/model/Token";
import { Gerador } from "./model/Gerador";

type RegrasType = [string, () => void];

export class AnalisadorSemantico {
	static pilhaSemantica: Token[] = [];
	static gerarCodObjeto: boolean = true;

	static regras: RegrasType[] = [
		["P' → P", AnalisadorSemantico.ignorar],
		["P → inicio V A", AnalisadorSemantico.regra2],
		["V → varincio LV", AnalisadorSemantico.ignorar],
		["LV → D LV", AnalisadorSemantico.ignorar],
		["LV → varfim pt_v", AnalisadorSemantico.regra5],
		["D → TIPO L pt_v", AnalisadorSemantico.regra6],
		["L → id vir L", AnalisadorSemantico.regra7],
		["L → id", AnalisadorSemantico.regra8],
		["TIPO → inteiro", AnalisadorSemantico.regra9],
		["TIPO → real", AnalisadorSemantico.regra10],
		["TIPO → literal", AnalisadorSemantico.regra11],
		["A → ES A", AnalisadorSemantico.ignorar],
		["ES → leia id pt_v", AnalisadorSemantico.regra13],
		["ES → escreva ARG pt_v", AnalisadorSemantico.regra14],
		["ARG → lit", AnalisadorSemantico.regra15],
		["ARG → num", AnalisadorSemantico.regra16],
		["ARG → id", AnalisadorSemantico.regra17],
		["A → CMD A", AnalisadorSemantico.ignorar],
		["CMD → id rcb LD pt_v", AnalisadorSemantico.regra19],
		["LD → OPRD opm OPRD", AnalisadorSemantico.regra20],
		["LD → OPRD", AnalisadorSemantico.regra21],
		["OPRD → id", AnalisadorSemantico.regra22],
		["OPRD → num", AnalisadorSemantico.regra23],
		["A → COND A", AnalisadorSemantico.ignorar],
		["COND → CAB CP", AnalisadorSemantico.regra25],
		["CAB → se ab_p EXP_R fc_p então", AnalisadorSemantico.regra26],
		["EXP_R → OPRD opr OPRD", AnalisadorSemantico.regra27],
		["CP → ES CP", AnalisadorSemantico.ignorar],
		["CP → CMD CP", AnalisadorSemantico.ignorar],
		["CP → COND CP", AnalisadorSemantico.ignorar],
		["CP → fimse", AnalisadorSemantico.ignorar],
		["A → R A", AnalisadorSemantico.regra32],
		["R → CABR CPR", AnalisadorSemantico.regra33],
		["CABR → repita ab_p EXP_R fc_p", AnalisadorSemantico.regra34],
		["CPR → ES CPR", AnalisadorSemantico.regra35],
		["CPR → CMD CPR", AnalisadorSemantico.regra36],
		["CPR → COND CPR", AnalisadorSemantico.regra37],
		["CPR → fimrepita", AnalisadorSemantico.regra38],
		["A → fim", AnalisadorSemantico.ignorar],
	];

	static iniciar(producao: string) {
		// console.log(AnalisadorSemantico.pilhaSemantica);
		for (let i = 0; i < AnalisadorSemantico.regras.length; i++) {
			if (producao === AnalisadorSemantico.regras[i][0]) {
				AnalisadorSemantico.regras[i][1]();
			}
		}
	}

	static empilhar(token: Token) {
		AnalisadorSemantico.pilhaSemantica.push(token);
	}

	static desempilhar(β: number) {
		for (let i = 0; i < β; i++) {
			AnalisadorSemantico.pilhaSemantica.pop();
		}
	}

	static procuraReversa(classe: string) {
		for (let i = AnalisadorSemantico.pilhaSemantica.length - 1; i >= 0; --i) {
			if (AnalisadorSemantico.pilhaSemantica[i].classe === classe) {
				return AnalisadorSemantico.pilhaSemantica[i];
			}
		}
	}

	static topoDaPilha() {
		return AnalisadorSemantico.pilhaSemantica[AnalisadorSemantico.pilhaSemantica.length - 1];
	}

	static regra2() {
		Gerador.inserir(`\n}`);
		Gerador.escreverArquivo();
	}

	static regra5() {
		// Gerador.inserir(`\n\n\n`);
		AnalisadorSemantico.desempilhar(4);
	}

	static regra6() {
		Gerador.inserir(`;`);
		AnalisadorSemantico.desempilhar(3);
	}

	static regra7() {
		let idPilha = AnalisadorSemantico.procuraReversa("id")!;

		const idTabela: Token = TabelaDeSimbolos.find((simbolo) => simbolo.lexema === idPilha?.lexema)!;

		const TIPO = AnalisadorSemantico.procuraReversa("TIPO");

		idTabela.tipo = TIPO!.tipo;

		Gerador.inserir(`, ${idTabela.lexema}`);

		idPilha.lexema = "L";
		idPilha.classe = "L";

		AnalisadorSemantico.desempilhar(2);
	}

	static regra8() {
		let idPilha = AnalisadorSemantico.procuraReversa("id")!;

		const idTabela: Token = TabelaDeSimbolos.find((simbolo) => simbolo.lexema === idPilha?.lexema)!;

		const TIPO = AnalisadorSemantico.procuraReversa("TIPO");

		idTabela.tipo = TIPO!.tipo;

		Gerador.inserir(idTabela.lexema);

		idPilha.lexema = "L";
		idPilha.classe = "L";
	}

	static regra9() {
		AnalisadorSemantico.topoDaPilha().lexema = "TIPO";
		AnalisadorSemantico.topoDaPilha().classe = "TIPO";
		Gerador.inserir("\n\tint ");
	}

	static regra10() {
		AnalisadorSemantico.topoDaPilha().lexema = "TIPO";
		AnalisadorSemantico.topoDaPilha().classe = "TIPO";

		Gerador.inserir("\n\tdouble ");
	}

	static regra11() {
		AnalisadorSemantico.topoDaPilha().lexema = "TIPO";
		AnalisadorSemantico.topoDaPilha().classe = "TIPO";
		Gerador.inserir("\n\tliteral ");
	}

	static regra13() {
		let idPilha = AnalisadorSemantico.procuraReversa("id")!;

		const encontrado = verificarDeclaracaoId(idPilha.lexema);

		if (!encontrado) {
			ErroUtils.erroSemanticoDescricao(`Não foi possível ler a variável`, `Token ${idPilha.lexema} não definido`);
			Gerador.abortar = true;
			return;
		}

		const idTabela: Token = TabelaDeSimbolos.find((simbolo) => simbolo.lexema === idPilha?.lexema)!;

		switch (idTabela.tipo) {
			case "real":
				Gerador.inserir(`\n\tscanf(“%lf”, &${idTabela.lexema});`);
				break;
			case "inteiro":
				Gerador.inserir(`\n\tscanf(“%d”, &${idTabela.lexema});`);
				break;
			case "literal":
				Gerador.inserir(`\n\tscanf(“%s”, ${idTabela.lexema});`);
				break;
			default:
				ErroUtils.erroSemanticoDescricao(`Não foi possível ler a variável`, `Token ${idPilha!.lexema} não definido`);
				Gerador.abortar = true;
		}
		AnalisadorSemantico.desempilhar(3);
	}

	static regra14() {
		let arg = AnalisadorSemantico.procuraReversa("ARG")!;

		if (arg.tipo === "nulo") {
			const idTabela = procuraPorLexema(arg.lexema);

			switch (idTabela.tipo) {
				case "real":
					arg ? Gerador.inserir(`\n\tprintf("%lf", ${arg.lexema});`) : "";
					break;
				case "inteiro":
					arg ? Gerador.inserir(`\n\tprintf("%d", ${arg.lexema});`) : "";
					break;
				case "literal":
					arg ? Gerador.inserir(`\n\tprintf("%s", ${arg.lexema});`) : "";
					break;
				default:
					ErroUtils.erroSemanticoDescricao(`Não foi possível ler a variável`, `Token ${arg!.lexema} não definido`);
					Gerador.abortar = true;
			}
		} else {
			arg ? Gerador.inserir(`\n\tprintf(${arg.lexema});`) : "";
		}

		AnalisadorSemantico.desempilhar(3);
	}

	static regra15() {
		let lit = AnalisadorSemantico.procuraReversa("lit")!;
		lit.classe = "ARG";
	}

	static regra16() {
		let num = AnalisadorSemantico.procuraReversa("num")!;
		num.classe = "ARG";
	}

	static regra17() {
		let idPilha = AnalisadorSemantico.procuraReversa("id")!;

		const encontrado = verificarDeclaracaoId(idPilha.lexema);

		if (!encontrado) {
			ErroUtils.erroSemanticoDescricao(`Não foi possível ler a variável`, `Token ${idPilha.lexema} não definido`);
			Gerador.abortar = true;
			return;
		}

		idPilha.classe = "ARG";
	}

	// ***
	static regra19() {
		const idPilha = AnalisadorSemantico.procuraReversa("id")!;
		const ld = AnalisadorSemantico.procuraReversa("LD")!;
		const rcb = AnalisadorSemantico.procuraReversa("rcb")!;

		const encontrado = verificarDeclaracaoId(idPilha.lexema);

		if (!encontrado) {
			ErroUtils.erroSemanticoDescricao(`Não foi possível ler a variável`, `Token ${idPilha.lexema} não definido`);
			Gerador.abortar = true;
			return;
		}

		const idTipo = procuraPorLexema(idPilha.lexema).tipo;

		if (ld.tipo !== idTipo) {
			ErroUtils.erroSemanticoDescricao(`regra 19: Tipos incompatíveis para operação `, `${ld.tipo} incompatível com ${idTipo}`);
			Gerador.abortar = true;
			return;
		}

		Gerador.inserir(`\n\t${idPilha.lexema} = ${ld.lexema};`);
		AnalisadorSemantico.desempilhar(4);
	}

	// 27 de param
	static regra20() {
		let oprd1 = AnalisadorSemantico.procuraReversa("OPRD")!;
		oprd1.classe = "OPRD_1";
		let oprd2 = AnalisadorSemantico.procuraReversa("OPRD")!;
		oprd2.classe = "OPRD_2";
		let opm = AnalisadorSemantico.procuraReversa("opm")!;

		if (oprd1.tipo !== oprd2.tipo) {
			ErroUtils.erroSemanticoDescricao(`regra20: Tipos incompatíveis para operação`, `${oprd2.tipo} incompatível com ${oprd1.tipo}`);
			Gerador.abortar = true;
			return;
		}

		if (oprd1.tipo === "literal" || oprd2.tipo === "literal") {
			ErroUtils.erroSemanticoDescricao(`Literal incompatível com operação`, `Token ${oprd1.lexema === "literal" ? oprd2.lexema : oprd1.lexema} incompatível com a operação`);
			Gerador.abortar = true;
			return;
		}

		const ld: string = `${oprd2.lexema} ${opm.lexema} ${oprd1.lexema}`;

		Gerador.inserirTemporaria(ld);

		oprd2.lexema = `T${Gerador.temporarias - 1}`;
		oprd2.classe = "LD";
		AnalisadorSemantico.desempilhar(2);
	}

	static regra21() {
		let oprd = AnalisadorSemantico.procuraReversa("OPRD")!;
		oprd.classe = "LD";
	}

	static regra22() {
		let idPilha = AnalisadorSemantico.procuraReversa("id")!;

		const encontrado = verificarDeclaracaoId(idPilha.lexema);

		if (!encontrado) {
			ErroUtils.erroSemanticoDescricao(`Não foi possível ler a variável`, `Token ${idPilha.lexema} não definido`);
			Gerador.abortar = true;
			return;
		}

		idPilha.tipo = procuraPorLexema(idPilha.lexema).tipo;
		idPilha.classe = "OPRD";
	}

	static regra23() {
		let num = AnalisadorSemantico.procuraReversa("num")!;
		num.classe = "OPRD";
	}

	static regra25() {
		Gerador.inserir(`\n\t}`);
	}

	// ************************************
	static regra26() {
		let exp_r = AnalisadorSemantico.procuraReversa("EXP_R")!;
		Gerador.inserir(`\n\tif(${exp_r ? exp_r.lexema : ""}){`);
		AnalisadorSemantico.desempilhar(5);
	}

	static regra27() {
		let oprd1 = AnalisadorSemantico.procuraReversa("OPRD")!;
		oprd1.classe = "OPRD_1";
		let oprd2 = AnalisadorSemantico.procuraReversa("OPRD")!;
		oprd2.classe = "OPRD_2";
		let opr = AnalisadorSemantico.procuraReversa("opr")!;

		if (oprd1.tipo === "literal" || oprd2.tipo === "literal") {
			ErroUtils.erroSemanticoDescricao(`Literal incompatível com operação`, `Token ${oprd1.lexema === "literal" ? oprd2.lexema : oprd1.lexema} incompatível com a operação`);
			Gerador.abortar = true;
			return;
		}

		if (oprd1.tipo !== oprd2.tipo) {
			ErroUtils.erroSemanticoDescricao(`Tipos incompatíveis para operação`, `${oprd1.lexema} ${oprd2.lexema} incompatíveis com a operação`);
			Gerador.abortar = true;
			return;
		}

		const exp_r: string = `${oprd2.lexema} ${opr.lexema} ${oprd1.lexema}`;

		Gerador.inserirTemporaria(exp_r);

		oprd2.lexema = `T${Gerador.temporarias - 1}`;
		oprd2.classe = "EXP_R";

		AnalisadorSemantico.desempilhar(2);
	}

	static regra32() {
		Gerador.inserir(`\n\t}`);
	}

	// Similar à 26
	static regra33() {
		let cabr = AnalisadorSemantico.procuraReversa("CABR");
		let cpr = AnalisadorSemantico.procuraReversa("CPR");
		Gerador.inserir(`\n\twhile(${cabr ? cabr.lexema : ""}){ ${cpr ? cpr.lexema : ""}`);
		AnalisadorSemantico.desempilhar(4);
	}

	static regra34() {
		let exp_r = AnalisadorSemantico.procuraReversa("EXP_R")!;
		exp_r.classe = "CABR";
		// let exp_r = AnalisadorSemantico.procuraReversa("EXP_R")!;
		// Gerador.inserir(`\n\twhile(${exp_r ? exp_r.lexema : null}){`);
		// AnalisadorSemantico.desempilhar(4);
	}

	static regra35() {
		let es = AnalisadorSemantico.procuraReversa("ES")!;
		es.lexema = "CPR";
	}

	static regra36() {
		let cmd = AnalisadorSemantico.procuraReversa("CMD")!;
		cmd.lexema = "CPR";
	}

	static regra37() {
		let cond = AnalisadorSemantico.procuraReversa("COND")!;
		cond.lexema = "CPR";
	}

	static regra38() {
		// Gerador.inserir(`\n\t}`);
	}

	static ignorar() {}
}
