import * as fs from "fs";

export class Gerador {
	static codigoFinal: string = Gerador.cabecalho();

	gerarCodigo(codigo: string) {
		fs.writeFileSync(__dirname + "resources/programa.c", codigo);
	}

	static cabecalho() {
		return `#include<stdio.h>\n\ntypedef char literal[256];\n\nvoid main(void){`;
	}

	static inserir(codigo: string){
		Gerador.codigoFinal += codigo
	}
}
