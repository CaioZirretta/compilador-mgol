export class Producao {
	static readonly producoes = [
		"P' → P",
		"P → inicio V A",
		"V → varincio LV",
		"LV → D LV",
		"LV → varfim pt_v",
		"D → TIPO L pt_v",
		"L → id vir L",
		"L → id",
		"TIPO → inteiro",
		"TIPO → real",
		"TIPO → literal",
		"A → ES A",
		"ES → leia id pt_v",
		"ES → escreva ARG pt_v",
		"ARG → literal",
		"ARG → num",
		"ARG → id",
		"A → CMD A",
		"CMD → id rcb LD pt_v",
		"LD → OPRD opm OPRD",
		"LD → OPRD",
		"OPRD → id",
		"OPRD → num",
		"A → COND A",
		"COND → CAB CP",
		"CAB → se ab_p EXP_R fc_p então",
		"EXP_R → OPRD opr OPRD",
		"CP → ES CP",
		"CP → CMD CP",
		"CP → COND CP",
		"CP → fimse",
		"A → R A",
		"R → CABR CPR",
		"CABR → repita ab_p EXP_R fc_p",
		"CPR → ES CPR",
		"CPR → CMD CPR",
		"CPR → COND CPR",
		"CPR → fimrepita",
		"A → fim",
	];

	static of(numero: number) {
		return Producao.producoes[numero - 1];
	}

	static ladoEsquerdo(numero: number) {
		return Producao.producoes[numero - 1].split("→")[0].trim();
	}
	
	static ladoDireito(numero: number) {
		return Producao.producoes[numero - 1].split("→")[1].split(" ");
	}
}
