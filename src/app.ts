import { AutomatoLexico } from "./lexico/model/AutomatoLexico";
import { AnalisadorLexico } from "./lexico/AnalisadorLexico";
import * as fs from "fs";
import { Token } from "./lexico/model/Token";
import { TabelaDeSimbolos } from "./lexico/model/TabelaDeSimbolos";
import { Reservadas } from "./lexico/dicionario/Simbolos";

export const arquivoFonte: string = fs.readFileSync(__dirname + "/resources/FONTE.txt", "utf-8");

function main(): void {
	do {
		const retorno: Token | void = AnalisadorLexico.scanner(arquivoFonte);
		// retorno ? console.log(retorno) : null;
	} while (AutomatoLexico.indexGeral <= arquivoFonte.length);
	
	console.log(TabelaDeSimbolos);
	
}

main();
