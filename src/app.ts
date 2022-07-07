import { AutomatoLexico } from "./lexico/model/AutomatoLexico";
import { AnalisadorLexico } from "./lexico/AnalisadorLexico";
import * as fs from "fs";
import { Token } from "./lexico/model/Token";

export const arquivoFonte: string = fs.readFileSync(__dirname + "/resources/teste.txt", "utf-8");

function main(): void {
	do {
		// const retorno: Token | void = AnalisadorLexico.scanner(arquivoFonte);
		// retorno ? console.log(retorno) : null;
		AnalisadorLexico.scanner(arquivoFonte);
	} while (AutomatoLexico.indexGeral <= arquivoFonte.length);
}

main();
