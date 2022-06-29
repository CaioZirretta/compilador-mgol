import { Automato, ReturnType } from "./model/Automato";

export class AnalisadorLexico {
	static scanner(palavra: string): ReturnType {
		return Automato.iniciar(palavra);
	}
}
