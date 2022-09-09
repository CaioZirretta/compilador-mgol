import * as fs from "fs";

export class Gerador {
	static abortar: boolean = false;
	static codigoFinal: string;
	static temporarias: number = 0;

	// gerarCodigo(codigo: string) {
	// 	Gerador.abortar ? fs.writeFileSync(__dirname + "resources/programa.c", codigo) : null;
	// }

	static gerarTemporarias() {
		let temp: string = "";
		for (let i = 0; i < Gerador.temporarias; i++) {
			temp += `\n\tint T${i};`;
		}
		return temp;
	}

	static cabecalho() {
		return `#include<stdio.h>\n\ntypedef char literal[256];\n\nvoid main(void){`;
	}

	static inserir(codigo: string) {
		Gerador.codigoFinal += codigo;
	}

	static inserirTemporaria(codigo: string) {
		Gerador.codigoFinal += `\n\tT${Gerador.temporarias} = ${codigo};`;
		++Gerador.temporarias;
	}

	static formataCodigo() {}

	static gerarCodigo() {
		return Gerador.cabecalho() + Gerador.gerarTemporarias() + Gerador.codigoFinal;
	}
}
