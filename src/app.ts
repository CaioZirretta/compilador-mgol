import { AnalisadorLexico } from "./lexico/AnalisadorLexico";
import * as fs from "fs";
import * as os from "os";
import { Token } from "./lexico/model/Token";

function main(): void {
	let arquivo: string;
	let linhas: string[];

	arquivo = fs.readFileSync(__dirname + "/assets/FONTE.txt", "utf-8");
	linhas = arquivo.split(os.EOL);

	linhas.forEach((linha, index) => {
		const tokens: Token[] = AnalisadorLexico.scanner(linha, index);
		console.log(linha, tokens);
	});
}

main();
