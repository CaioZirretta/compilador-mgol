import { ErroLexico, ErrosLexicos } from "./lexico/model/ErrosLexicos";
import { Token, TokenList } from "./lexico/model/Token";
import { TabelaDeSimbolos } from "./lexico/model/TabelaDeSimbolos";
import * as fs from "fs";
import * as os from "os";
import { AnalisadorLexico } from "./lexico/AnalisadorLexico";
import { Automato, ReturnType } from "./lexico/model/Automato";

let arquivo: string;
let linhas: string[];

function main(): void {
	arquivo = fs.readFileSync(__dirname + "/assets/FONTE.txt", "utf-8");
	linhas = arquivo.split(os.EOL);

	linhas.forEach((linha, index) => {
		Automato.iniciar(linha, index + 1)
	});
}

main();