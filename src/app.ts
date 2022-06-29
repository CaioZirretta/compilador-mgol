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
	arquivo = fs.readFileSync(__dirname + "/assets/teste.txt", "utf-8");
	linhas = arquivo.split(os.EOL);

	linhas.forEach((linha, index) => {
		// const result: ReturnType = AnalisadorLexico.scanner(linha);
		// const resultToken = result[0] as Token;
		// const resultErro = result[0] as ErroLexico;
		
		// const colunaIndex: number = result[1];
		// const linhaIndex = index;

		// if (resultToken.classe !== undefined) {
		// 	TokenList.push(resultToken);
		// }
		// if (resultErro.mensagem !== undefined) {
		// 	resultErro.linha = linhaIndex;
		// 	resultErro.coluna = colunaIndex;
		// 	ErrosLexicos.push(resultErro);
		// }
	});
}

Automato.iniciar("escreva A, B")
