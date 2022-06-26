import { ErroLexico } from './model/ErrosLexicos';
import { Automato } from "./model/Automato";
import { Digitos, Letras, Simbolos } from "./model/Simbolos";
import { Token } from "./model/Token";

export class AnalisadorLexico {
	static scanner(palavra: string): Token | ErroLexico {
		return Automato.q0(palavra);
	}
}
