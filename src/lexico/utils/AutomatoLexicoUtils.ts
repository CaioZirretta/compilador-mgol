import { arquivoFonte } from './../../app';
import { TokenClasse, TokenTipo } from "../model/Token";
import { Simbolos } from "../dicionario/Simbolos";
import { AutomatoLexico, TransicoesType } from "../model/AutomatoLexico";
import { Token } from "../model/Token";

export class AutomatoLexicoUtils {
	static proximoEstado(opcoes: TransicoesType[], caractere: string) {
		for (let i = 0; i < opcoes.length; i++) {
			for (let j = 0, array = opcoes[i][0]; j < opcoes[i][0].length; j++) {
				if (caractere === array[j]) {
					return opcoes[i][1];
				}
			}
		}
	}

	static quebraDeLinha(arquivo: string) {
		if (arquivo[AutomatoLexico.indexGeral] === "\n") {
			AutomatoLexico.linha++;
			// AutomatoLexico.coluna = 1;
		}
	}

	static aumentarIndex() {
		AutomatoLexico.indexGeral++;
		// AutomatoLexico.coluna++;
	}

	static diminuirIndex() {
		AutomatoLexico.indexGeral--;
		// AutomatoLexico.coluna--;
	}

	static log(arquivo: string, estado: string) {
		let char;
		switch (arquivo[AutomatoLexico.indexGeral]) {
			case "\n":
				char = "\\n";
				break;
			case "\r":
				char = "\\r";
				break;
			case " ":
				char = "space";
				break;
			case undefined:
				char = "undefined";
				break;
			default:
				char = arquivo[AutomatoLexico.indexGeral];
				break;
		}

		return console.log(
			estado,
			"| Geral: " + AutomatoLexico.indexGeral,
			"| Auxiliar: " + AutomatoLexico.indexAuxiliar,
			// "| Coluna: " + AutomatoLexico.coluna,
			"| Letra: " + char,
		);
	}

	static ignorar(arquivo: string) {
		switch (arquivo[AutomatoLexico.indexGeral]) {
			case " ":
				AutomatoLexico.indexGeral++;
				return;
			case "\n":
				AutomatoLexico.indexGeral++;
				return;
			case "\r":
				AutomatoLexico.indexGeral++;
				return;
			case "\t":
				AutomatoLexico.indexGeral++;
				return;
		}
	}

	static erroContinuaLeitura(arquivo: string) {
		const erro: Token = {
			classe: TokenClasse.ERRO,
			// lexema: `Erro léxico: caractere inválido na linha ${AutomatoLexico.linha} e coluna ${
			// 	AutomatoLexico.coluna - 1
			// }`,
			lexema: `Erro léxico: caractere ${arquivoFonte[AutomatoLexico.indexGeral - 1]} inválido na linha ${AutomatoLexico.linha}`,
			tipo: TokenTipo.Nulo,
		};

		return erro;
	}

	static erroAteSimbolo(arquivo: string) {
		const erro: Token = {
			classe: TokenClasse.ERRO,
			// lexema: `Erro léxico: caractere inválido na linha ${AutomatoLexico.linha} e coluna ${
			// 	AutomatoLexico.coluna - 1
			// }`,
			lexema: `Erro léxico: caractere ${arquivoFonte[AutomatoLexico.indexGeral - 1]} inválido na linha ${AutomatoLexico.linha}`,
			tipo: TokenTipo.Nulo,
		};

		while (arquivo[AutomatoLexico.indexGeral] && arquivo[AutomatoLexico.indexGeral] !== " ") {
			AutomatoLexico.indexGeral++;
			if (
				Simbolos.includes(arquivo[AutomatoLexico.indexGeral]) ||
				["\r", "\n"].includes(arquivo[AutomatoLexico.indexGeral])
			) {
				return erro;
			}
		}

		return erro;
	}
}
