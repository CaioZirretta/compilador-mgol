import { ErroUtils } from "./../sintatico/utils/ErroUtils";
import { TabelaDeSimbolos } from "./../lexico/model/TabelaDeSimbolos";
import { Token, TokenTipo } from "./../lexico/model/Token";
import { Producao } from "./../sintatico/model/Producao";
import { Gerador } from "./model/Gerador";

type RegrasType = [string, (producao: string, A: string, β: string) => void];

export class AnalisadorSemantico {
	static pilhaSemantica: Token[] = [];
	static gerarCodObjeto: boolean = true;

	static regras: RegrasType[] = [
		["P' → P", AnalisadorSemantico.ignorar],
		["P → inicio V A", AnalisadorSemantico.ignorar],
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
		["A → CMD A", AnalisadorSemantico.regra18],
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

	static iniciar(producao: string, A: string, β: string) {
		// console.log(AnalisadorSemantico.pilhaSemantica);
		for (let i = 0; i < AnalisadorSemantico.regras.length; i++) {
			if (producao === AnalisadorSemantico.regras[i][0]) {
				AnalisadorSemantico.regras[i][1](producao, A, β);
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

	static regra5(producao: string, A: string, β: string) {
		// Gerador.inserir(`\n\n\n`);
	}

	static regra6(producao: string, A: string, β: string) {
		AnalisadorSemantico.pilhaSemantica.pop();
		AnalisadorSemantico.pilhaSemantica.pop();
		AnalisadorSemantico.pilhaSemantica.pop();
	}

	static regra7(producao: string, A: string, β: string) {
		let idPilha = AnalisadorSemantico.procuraReversa("id")!;

		const idTabela: Token = TabelaDeSimbolos.find(
			(simbolo) => simbolo.lexema === idPilha?.lexema
		)!;

		const TIPO = AnalisadorSemantico.procuraReversa("TIPO");

		idTabela.tipo = TIPO!.tipo;

		Gerador.inserir(`, ${idTabela.lexema}`);

		idPilha.lexema = "L";
		idPilha.classe = "L";

		AnalisadorSemantico.pilhaSemantica.pop();
		AnalisadorSemantico.pilhaSemantica.pop();
	}

	static regra8(producao: string, A: string, β: string) {
		let idPilha = AnalisadorSemantico.procuraReversa("id")!;

		const idTabela: Token = TabelaDeSimbolos.find(
			(simbolo) => simbolo.lexema === idPilha?.lexema
		)!;

		const TIPO = AnalisadorSemantico.procuraReversa("TIPO");

		idTabela.tipo = TIPO!.tipo;

		Gerador.inserir(idTabela.lexema);

		idPilha.lexema = "L";
		idPilha.classe = "L";
	}

	static regra9(producao: string, A: string, β: string) {
		AnalisadorSemantico.topoDaPilha().lexema = "TIPO";
		AnalisadorSemantico.topoDaPilha().classe = "TIPO";
		Gerador.inserir("\n\tint ");
	}

	static regra10(producao: string, A: string, β: string) {
		AnalisadorSemantico.topoDaPilha().lexema = "TIPO";
		AnalisadorSemantico.topoDaPilha().classe = "TIPO";

		Gerador.inserir("\n\tdouble ");
	}

	static regra11(producao: string, A: string, β: string) {
		AnalisadorSemantico.topoDaPilha().lexema = "TIPO";
		AnalisadorSemantico.topoDaPilha().classe = "TIPO";
		Gerador.inserir("\n\tliteral ");
	}

	static regra13(producao: string, A: string, β: string) {
		let idPilha = AnalisadorSemantico.procuraReversa("id");
		
		const idTabela: Token = TabelaDeSimbolos.find(
			(simbolo) => simbolo.lexema === idPilha?.lexema
		)!;

		switch (idTabela.tipo) {
			case "real":
				Gerador.inserir(`\nscanf(“%lf”, &${idTabela.lexema});`);
				break;
			case "inteiro":
				Gerador.inserir(`\nscanf(“%d”, &${idTabela.lexema});`);
				break;
			case "literal":
				Gerador.inserir(`\nscanf(“%s”, ${idTabela.lexema});`);
				break;
			default:
				ErroUtils.erroSemanticoDescricao(
					`Não foi possível ler a variável`,
					`Token ${idPilha!.lexema} não definido`
				);
		}
		AnalisadorSemantico.pilhaSemantica.pop();
		AnalisadorSemantico.pilhaSemantica.pop();
		AnalisadorSemantico.pilhaSemantica.pop();
	}

	static regra14(producao: string, A: string, β: string) {
		let ARG = AnalisadorSemantico.procuraReversa("ARG")!;

		Gerador.inserir(`\nprintf(${ARG.lexema})`)
		
		AnalisadorSemantico.pilhaSemantica.pop();
	}

	static regra15(producao: string, A: string, β: string) {
		let lit = AnalisadorSemantico.procuraReversa("lit")!;
		lit.classe = "ARG";
	}

	static regra16(producao: string, A: string, β: string) {
		let num = AnalisadorSemantico.procuraReversa("num")!;
		num.classe = "ARG";
	}

	static regra17(producao: string, A: string, β: string) {
		let idPilha = AnalisadorSemantico.procuraReversa("id")!;
		
		const idTabela: Token = TabelaDeSimbolos.find(
			(simbolo) => simbolo.lexema === idPilha?.lexema
		)!;

		if (!idTabela.tipo) {
			ErroUtils.erroSemanticoDescricao(
				`Não foi possível ler a variável`,
				`Token ${idPilha.lexema} não definido`
			);
			return;
		}

		idPilha.classe = "ARG";
	}

	static regra18(producao: string, A: string, β: string) {}

	static regra19(producao: string, A: string, β: string) {}

	static regra20(producao: string, A: string, β: string) {}

	static regra21(producao: string, A: string, β: string) {}

	static regra22(producao: string, A: string, β: string) {}

	static regra23(producao: string, A: string, β: string) {}

	static regra25(producao: string, A: string, β: string) {}

	static regra26(producao: string, A: string, β: string) {}

	static regra27(producao: string, A: string, β: string) {}

	static regra32(producao: string, A: string, β: string) {}

	static regra33(producao: string, A: string, β: string) {}

	static regra34(producao: string, A: string, β: string) {}

	static regra35(producao: string, A: string, β: string) {}

	static regra36(producao: string, A: string, β: string) {}

	static regra37(producao: string, A: string, β: string) {}

	static regra38(producao: string, A: string, β: string) {}

	static ignorar(producao: string, A: string, β: string) {}
}
