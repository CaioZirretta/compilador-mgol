import { TabelaDeSimbolos } from './lexico/model/TabelaDeSimbolos';
import * as fs from "fs";
import * as os from "os";
import { AnalisadorLexico } from "./lexico/AnalisadorLexico";
import { Automato } from "./lexico/model/Automato";
import { Posicao } from "./lexico/model/Posicao";

let arquivo: string;
let linhas: string[];
let palavras: string[][] = [];

function main(): void {
	arquivo = fs.readFileSync(__dirname + "/assets/teste.txt", "utf-8");
	linhas = arquivo.split(os.EOL);

	//TODO Fazer o separador na mão para separar por , ou ;
	linhas.forEach((palavra) => {
		palavras.push(palavra.split(" "));
	});

	const posicao = new Posicao(0, 0);

	palavras.forEach((fraseArray) => {
		fraseArray.forEach((palavra) => {
			// console.log(AnalisadorLexico.scanner(palavra));
			// if(typeof token === "Token"){
			// 	TokenList.push(token);
			// }
		});
	});
}

main()