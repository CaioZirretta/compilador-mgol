export class Posicao {
	linha: number;
	coluna: number;

	constructor(linha: number, coluna: number) {
		this.linha = linha;
		this.coluna = coluna;
	}

	getPosicao(){
		return [this.linha, this.coluna]
	}
}
