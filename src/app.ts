import { ReservadasGeradas } from './lexico/dicionario/Simbolos';
import { Producao } from './sintatico/model/Producao';
import * as fs from "fs";
import { AutomatoLexico } from "./lexico/model/AutomatoLexico";
import { AnalisadorLexico } from "./lexico/AnalisadorLexico";
import { Token } from "./lexico/model/Token";
import { AnalisadorSintatico } from "./sintatico/AnalisadorSintatico";

export const arquivoFonte: string = fs.readFileSync(__dirname + "/resources/teste.txt", "utf-8");

function main(): void {
	do {
		const retorno: Token | void = AnalisadorLexico.scanner(arquivoFonte);
		// retorno ? console.log(retorno) : null;
		console.log(ReservadasGeradas);
		
	} while (AutomatoLexico.indexGeral <= arquivoFonte.length);
}

main();

// new AnalisadorSintatico().parser();
// console.log(Producao.producoesGeradas)