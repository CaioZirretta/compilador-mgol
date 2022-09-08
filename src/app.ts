import { AnalisadorSemantico } from './semantico/AnalisadorSemantico';
import { TabelaDeSimbolos } from './lexico/model/TabelaDeSimbolos';
import { Producao } from './sintatico/model/Producao';
import * as fs from "fs";
import { AnalisadorSintatico } from "./sintatico/AnalisadorSintatico";
import { Gerador } from './semantico/model/Gerador';

export const arquivoFonte: string = fs.readFileSync(__dirname + "/resources/teste.txt", "utf-8");

// function main(): void {
// 	do {
// 		const retorno: Token | void = AnalisadorLexico.scanner(arquivoFonte);
// 		retorno ? console.log(retorno) : null;
// 	} while (AutomatoLexico.indexGeral <= arquivoFonte.length);
// }

// main();

new AnalisadorSintatico().parser();

console.log(TabelaDeSimbolos)
console.log(AnalisadorSemantico.pilhaSemantica)
console.log(Gerador.codigoFinal);
// console.dir(Producao.producoesGeradas, {maxArrayLength: null})

