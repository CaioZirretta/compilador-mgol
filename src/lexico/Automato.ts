import { Digitos, Letras, Simbolos } from "./Simbolos";

export type AfdTabela = [regra: String, proximoEstado: (x: string, y: number) => void];

// Para executar na tabela tabela[0][0]()

export class Automato {
	// q0
	constructor(palavra: String, index: number) {
		const options: AfdTabela[][] = [];

		options.forEach((option: any[]) => {
			if (palavra[index].match(option[0])) {
				option[1];
			}
		});

		index++;
		console.log("q1");
	}

	q1(palavra: String, index: number) {
		index++;
		console.log("q2");
	}

	q2(palavra: String, index: number) {
		index++;
		console.log("q3");
	}

	q3(palavra: String, index: number) {
		index++;
		console.log("q3");
	}

	q4(palavra: String, index: number) {
		index++;
		console.log("q4");
	}

	q5(palavra: String, index: number) {
		index++;
		console.log("q5");
	}

	q6(palavra: String, index: number) {
		index++;
		console.log("q6");
	}

	q7(palavra: String, index: number) {
		index++;
		console.log("q7");
	}

	q8(palavra: String, index: number) {
		index++;
		console.log("q8");
	}

	q9(palavra: String, index: number) {
		index++;
		console.log("q9");
	}

	q10(palavra: String, index: number) {
		index++;
		console.log("q10");
	}

	q11(palavra: String, index: number) {
		index++;
		console.log("q11");
	}

	q12(palavra: String, index: number) {
		index++;
		console.log("q12");
	}

	q13(palavra: String, index: number) {
		index++;
		console.log("q13");
	}

	q14(palavra: String, index: number) {
		index++;
		console.log("q14");
	}

	q15(palavra: String, index: number) {
		index++;
		console.log("q15");
	}

	q16(palavra: String, index: number) {
		index++;
		console.log("q16");
	}

	q17(palavra: String, index: number) {
		index++;
		console.log("q17");
	}

	q18(palavra: String, index: number) {
		index++;
		console.log("q18");
	}
}
