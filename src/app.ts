import { Automato } from "./lexico/Automato";
import * as fs from "fs";
import * as os from "os";
import { AnalisadorLexico } from "./lexico/AnalisadorLexico";

let arquivo: string;
let arquivoEmLinhas: string[];
let palavras: string[][] = [];

function main(): void {
	arquivo = fs.readFileSync(__dirname + "/assets/FONTE.txt", "utf-8");
	arquivoEmLinhas = arquivo.split(os.EOL);
	arquivoEmLinhas.forEach((e) => {
		palavras.push(e.split(" "));
	});

	palavras.forEach((fraseArray) => {
		fraseArray.forEach((palavra) => {
			AnalisadorLexico.scanner(palavra);
		});
	});
}

function a(){console.log("function a");}
function b(){console.log("function b");}
function c(){console.log("function c");}

const arr = [
	[a],
	[b],
	[c]
]

arr[2][0]()