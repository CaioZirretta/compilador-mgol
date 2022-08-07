import { AutomatoLexico } from "../../lexico/model/AutomatoLexico";
import { Token } from "../../lexico/model/Token";
import { ErroSintatico } from "../model/ErroSinaticos";

export class ErroUtils {
	static erroLexicoDescricao(token: Token) {
		console.log({
			erro: "Erro Léxico",
			mensagem: "Caractere inválido recebido",
			detalhes: {
				recebido: {
					token: token.lexema,
					linha: AutomatoLexico.linha,
				},
			},
		} as ErroSintatico);
	}

	static panicoErroDescricao(tokenRecebido: string, proximosEstados: string[]) {
		console.log({
			erro: "Erro sintático",
			mensagem: "Token inválido recebido",
			detalhes: {
				recebido: {
					token: tokenRecebido,
					linha: AutomatoLexico.linha,
				},
				esperado: `${proximosEstados}`,
			},
			acao: "Descartando tokens até achar um válido",
		} as ErroSintatico);
	}

	static substituicaoErroDescricao(tokenRecebido: string, proximosEstados: string[]) {
		console.log({
			erro: "Erro sintático",
			mensagem: "Token inválido recebido",
			detalhes: {
				recebido: {
					token: tokenRecebido,
					linha: AutomatoLexico.linha,
				},
				esperado: `${proximosEstados}`,
			},
			acao: `Inserindo token artificalmente: ${proximosEstados}`,
		} as ErroSintatico);
	}
}
