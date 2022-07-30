export class First {
	static readonly first = [
		["P'", "inicio"],
		["P", "inicio"],
		["V", "varinicio"],
		["LV", "inteiro, real, literal, varfim"],
		["D", "inteiro, real, literal"],
		["L", "id"],
		["TIPO", "inteiro, real, literal"],
		["A", "leia, escreva, id, se, repita, fim"],
		["ES", "leia, escreva"],
		["ARG", "lit, num, id"],
		["CMD", "id"],
		["LD", "id, num"],
		["OPRD", "id, num"],
		["COND", "se"],
		["CAB", "se"],
		["EXP_R", "id, num"],
		["CP", "leia, escreva, id, se, fimse"],
		["R", "repita"],
		["CABR", "repita"],
		["CPR", "leia, escreva, id, se, fimrepita"],
	];

	static of(producao: string): string[] {
		for (let row = 0; row < First.length; row++) {
			if (producao === First.first[row][0]) {
				return First.first[row][1].split(",");
			}
		}

		return ["erro, First of"];
	}
}
