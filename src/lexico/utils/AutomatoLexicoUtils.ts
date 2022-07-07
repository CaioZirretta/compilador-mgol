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

	static quebraDeLinha() {
		AutomatoLexico.linha++;
		AutomatoLexico.coluna = 1;
	}

	static atualizaPosicao() {
		AutomatoLexico.coluna = AutomatoLexico.indexGeral - AutomatoLexico.indexAuxiliar;
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
			"| Letra: " + char
		);
	}

	static ignorar(arquivo: string) {
		switch (arquivo[AutomatoLexico.indexGeral]) {
			case "\n":
				AutomatoLexico.indexGeral++;
				return;
			case " ":
				AutomatoLexico.indexGeral++;
				return;
			case "\r":
				AutomatoLexico.indexGeral++;
				return;
		}
	}

	static erroContinuaLeitura(arquivo: string) {
		AutomatoLexicoUtils.atualizaPosicao();

		const erro: Token = {
			classe: TokenClasse.ERRO,
			lexema: `Erro léxico: caractere inválido na linha ${AutomatoLexico.linha} e coluna ${AutomatoLexico.coluna}`,
			tipo: TokenTipo.Nulo,
		};
		return erro;
	}

	static erroAteSimbolo(arquivo: string) {
		AutomatoLexicoUtils.atualizaPosicao();

		const erro: Token = {
			classe: TokenClasse.ERRO,
			lexema: `Erro léxico: caractere inválido na linha ${AutomatoLexico.linha} e coluna ${AutomatoLexico.coluna}`,
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
