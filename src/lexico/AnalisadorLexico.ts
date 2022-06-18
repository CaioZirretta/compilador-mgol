import { Digitos, Letras, Simbolos } from './Simbolos';
import { Token } from "./Token";


export class AnalisadorLexico {
    // static analisadorLexico():Token {}
	
    static analisadorLexico() {}

	static checarPalavra(palavra: String) {
		let s: string = "awdadaw8daw4aw2awda6awdw8vd2grte5s3s";
		for (let i = 0; i < s.length; i++) {
			if (Simbolos.includes(s[i])) {
				console.log(s[i]);
			}
		}
	}
}
