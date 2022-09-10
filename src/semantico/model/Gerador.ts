import * as fs from "fs";

export class Gerador {
	static abortar: boolean = false;
	static codigoFinal: string = "";
	static temporarias: number = 0;

	static escreverArquivo() {
		const codigo = Gerador.gerarCodigo()
		console.log(codigo);
		fs.writeFileSync("src/resources/programa.c", codigo);
	}

	static gerarTemporarias() {
		let temp: string = "";
		for (let i = 0; i < Gerador.temporarias; i++) {
			temp += `\n\tint T${i};`;
		}
		return temp;
	}

	private static cabecalho() {
		return `#include<stdio.h>\n\ntypedef char literal[256];\n\nvoid main(void){`;
	}

	static inserir(codigo: string) {
		Gerador.codigoFinal += codigo;
	}

	static inserirTemporaria(codigo: string) {
		Gerador.codigoFinal += `\n\tT${Gerador.temporarias} = ${codigo};`;
		++Gerador.temporarias;
	}

	private static formataCodigo(codigo: string) {
		let linhas: string[] = codigo.split("\n");
		let tab: number = 0;

		let aux: string = "\t";
		for (let i = 0; i < linhas.length; i++) {

			if (linhas[i].startsWith("\tif")) {
				tab++;
				
				for (let i = 0; i < tab - 1; i++) {
					aux += aux;
				}

				linhas[i] = aux + linhas[i];
			}

			if (linhas[i].startsWith("\t}")) {
				tab--;
			}
		}

		return linhas.join("\n");
	}

	static gerarCodigo() {
		let codigo = Gerador.cabecalho() + Gerador.gerarTemporarias() + Gerador.codigoFinal;
		// codigo = Gerador.formataCodigo(codigo);
		return codigo;
	}
}
