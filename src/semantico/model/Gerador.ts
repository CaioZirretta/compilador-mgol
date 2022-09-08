import * as fs from "fs";

export class Gerador {
	static codigoFinal: string = Gerador.cabecalho();
	static abortar: boolean = false;

	gerarCodigo(codigo: string) {
		Gerador.abortar ? fs.writeFileSync(__dirname + "resources/programa.c", codigo) : null;
	}

	static cabecalho() {
		return `#include<stdio.h>\n\ntypedef char literal[256];\n\nvoid main(void){`;
	}

	static inserir(codigo: string){
		Gerador.codigoFinal += codigo
	}
}
