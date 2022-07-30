export class Follow {
	static readonly follow = [
		["P'", "$"],
		["P", "$"],
		["V", "leia, id, se, repita, fim"],
		["LV", "leia, id, se, repita, fim, $"],
		["D", "inteiro, real, literal, varfim"],
		["L", "pt_v"],
		["TIPO", "id"],
		["A", "$"],
		["ES", "leia, id, se, repita, fim, escreva, fimse, fimrepita"],
		["ARG", "pt_v"],
		["CMD", "leia, id, se, repita, fim, escreva, fimse, fimrepita"],
		["LD", "pt_v"],
		["OPRD", "opm, pt_v, opr, fc_p"],
		["COND", "leia, id, se, repita, fim, escreva, fimse, fimrepita "],
		["CAB", "leia, escreva, id, se , fimse"],
		["EXP_R", "fc_p"],
		["CP", "leia, escreva, id, se, fimse, repita, fimrepita, fim"],
		["R", "leia, id, se, repita, fim"],
		["CABR", "leia, escreva, id, se, fimrepita"],
		["CPR", "leia, escreva, id, se, repita, fim"],
	];

	static of(producao: string): string[] {
		for (let row = 0; row < Follow.length; row++) {
			if (producao === Follow.follow[row][0]) {
				return Follow.follow[row][1].split(",");
			}
		}

		return ["erro, Follow of"];
	}
}
