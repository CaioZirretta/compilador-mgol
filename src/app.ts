import { Producao } from './sintatico/model/Producao';
import * as fs from "fs";
import { AutomatoLexico } from "./lexico/model/AutomatoLexico";
import { AnalisadorLexico } from "./lexico/AnalisadorLexico";
import { Token, TokenLista } from "./lexico/model/Token";
import { AnalisadorSintatico } from "./sintatico/AnalisadorSintatico";

export const arquivoFonte: string = fs.readFileSync(__dirname + "/resources/FONTE.txt", "utf-8");

// function main(): void {
// 	do {
// 		const retorno: Token | void = AnalisadorLexico.scanner(arquivoFonte);
// 		retorno ? console.log(retorno) : null;
// 	} while (AutomatoLexico.indexGeral <= arquivoFonte.length);
// }

// main();

new AnalisadorSintatico().parser();

console.dir(Producao.producoesGeradas, {maxArrayLength: null})