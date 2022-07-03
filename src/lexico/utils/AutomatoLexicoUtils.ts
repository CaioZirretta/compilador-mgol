import { TokenClasse, TokenTipo } from './../model/Token';
import { Simbolos } from "../dicionario/Simbolos";
import { AutomatoLexico, OpcoesType } from "../model/AutomatoLexico";
import { Token } from "../model/Token";

export class AutomatoLexicoUtils {
	static proximoEstado(opcoes: OpcoesType[], caractere: string) {
		for (let i = 0; i < opcoes.length; i++) {
			for (let j = 0, array = opcoes[i][0]; j < opcoes[i][0].length; j++) {
				if (caractere === array[j]) {
					return opcoes[i][1];
				}
			}
		}
	}

	static erroProximoCaractere(linha: string, index: number) {
		const erro: Token = {
			classe: TokenClasse.ERRO,
			lexema: `Erro léxico: caractere inválido na linha ${AutomatoLexico.numeroLinha} e coluna ${index}`,
			tipo: TokenTipo.Nulo,
		};
		AutomatoLexico.tokens.push(erro);

		--index;
		while (linha[index] && linha[index] !== " ") {
			if (Simbolos.includes(linha[index])) {
				AutomatoLexico.q0(linha, index);
				return;
			}
			index++;
		}
		AutomatoLexico.q0(linha, index);
		return;
	}

	static erroProximoCaractereVazio(linha: string, index: number) {
		const erro: Token = {
			classe: TokenClasse.ERRO,
			lexema: `Erro léxico: caractere inválido na linha ${AutomatoLexico.numeroLinha} e coluna ${index}`,
			tipo: TokenTipo.Nulo,
		};
		AutomatoLexico.tokens.push(erro);

		--index;
		while (linha[index] !== " ") {
			index++;
		}
		AutomatoLexico.q0(linha, index);
		return;
	}
}
