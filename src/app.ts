import * as fs from "fs";
import { AnalisadorSintatico } from "./sintatico/AnalisadorSintatico";
import { Gerador } from "./semantico/model/Gerador";
import { AnalisadorLexico } from "./lexico/AnalisadorLexico";

export const arquivoFonte: string = fs.readFileSync(__dirname + "/resources/FONTE.txt", "utf-8");

// function main(): void {
// 	do {
// 		const retorno: Token | void = AnalisadorLexico.scanner(arquivoFonte);
// 		retorno ? console.log(retorno) : null;
// 	} while (AutomatoLexico.indexGeral <= arquivoFonte.length);
// }

// main();
console.time()
new AnalisadorSintatico().parser();
console.timeEnd()
console.log("Processo de compilação finalizado")


// console.log(TabelaDeSimbolos)
// console.log(AnalisadorSemantico.pilhaSemantica)
// console.dir(Producao.producoesGeradas, {maxArrayLength: null})
