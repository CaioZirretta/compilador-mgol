import { AutomatoLexico, ReturnType } from "./model/AutomatoLexico";

export class AnalisadorLexico {
	static scanner(linha: string, index: number): ReturnType {
		return AutomatoLexico.iniciar(linha, index);
	}
}
