import * as fs from "fs";
import * as os from "os";

class Main {
	arquivo: string;
	arquivoEmLinhas: string[];
	palavras: string[][] = [];

	constructor(path: string) {
		this.arquivo = fs.readFileSync(__dirname + path, "utf-8");
		this.arquivoEmLinhas = this.arquivo.split(os.EOL);

		this.arquivoEmLinhas.forEach((e) => {
			this.palavras.push(e.split(" "));
		});
	}
}

const main = new Main("/assets/FONTE.txt");
console.log(main.palavras);

