import { tabelaSintaticaHeaders, tabelaSintatica, tabelaSintaticaLinhas } from "../model/TabelaSintatica";

export function getHeaderIndex(header: string) {
	return tabelaSintaticaHeaders.indexOf(header);
}

export function getRowIndex(state: string) {
	return tabelaSintaticaLinhas.indexOf(state);
}
