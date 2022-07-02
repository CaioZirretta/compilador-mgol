import { AnalisadorLexico } from './lexico/AnalisadorLexico';
import * as fs from "fs";
import * as os from "os";

let arquivo: string;
let linhas: string[];

function main(): void {
	arquivo = fs.readFileSync(__dirname + "/assets/FONTE.txt", "utf-8");
	linhas = arquivo.split(os.EOL);

	linhas.forEach((linha, index) => {
		console.log(AnalisadorLexico.scanner(linha, index));
	});
}

main();
