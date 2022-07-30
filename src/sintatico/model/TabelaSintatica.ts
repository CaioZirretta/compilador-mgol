export class TabelaSintatica{
	static tabelaSintaticaHeaders = ["", "inicio", "fim", "varinicio", "varfim", "inteiro", "real", "literal", "leia", "escreva", "se", "entao", "fimse", "repita", "fimrepita", "pt_v", "vir", "rcb", "opm", "opr", "ab_p", "fc_p", "id", "num", "lit", "$", "P", "V", "LV", "D", "L", "TIPO", "A", "ES", "ARG", "CMD", "LD", "OPRD", "COND", "CAB", "EXP_R", "CP", "CABR", "CPR", "R"];
	static tabelaSintaticaLinhas = ["","0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58","59","60","61","62","63","64","65","66","67","68","69","70","71","72","73","74","75","76"]

	static tabelaSintatica: string[][] = [
		["", "inicio", "fim", "varinicio", "varfim", "inteiro", "real", "literal", "leia", "escreva", "se", "entao", "fimse", "repita", "fimrepita", "pt_v", "vir", "rcb", "opm", "opr", "ab_p", "fc_p", "id", "num", "lit", "$", "P", "V", "LV", "D", "L", "TIPO", "A", "ES", "ARG", "CMD", "LD", "OPRD", "COND", "CAB", "EXP_R", "CP", "CABR", "CPR", "R"],
		["0", "S2", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "1", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		["1", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "acc", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		["2", "", "", "S62", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "3", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		["3", "", "S13", "", "", "", "", "", "S14", "S17", "S41", "", "", "S58", "", "", "", "", "", "", "", "", "S23", "", "", "", "", "", "", "", "", "", "4", "5", "", "7", "", "", "9", "32", "", "", "49", "", "11"],
		["4", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "R2", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		["5", "", "S13", "", "", "", "", "", "S14", "S17", "S41", "", "", "S58", "", "", "", "", "", "", "", "", "S23", "", "", "", "", "", "", "", "", "", "6", "5", "", "7", "", "", "9", "32", "", "", "49", "", "11"],
		["6", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "R12", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		["7", "", "S13", "", "", "", "", "", "S14", "S17", "S41", "", "", "S58", "", "", "", "", "", "", "", "", "S23", "", "", "", "", "", "", "", "", "", "8", "5", "", "7", "", "", "9", "32", "", "", "49", "", "11"],
		["8", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "R18", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		["9", "", "S13", "", "", "", "", "", "S14", "S17", "S41", "", "", "S58", "", "", "", "", "", "", "", "", "S23", "", "", "", "", "", "", "", "", "", "10", "5", "", "7", "", "", "9", "32", "", "", "49", "", "11"],
		["10", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "R24", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		["11", "", "S13", "", "", "", "", "", "S14", "S17", "S41", "", "", "S58", "", "", "", "", "", "", "", "", "S23", "", "", "", "", "", "", "", "", "", "12", "5", "", "7", "", "", "9", "32", "", "", "49", "", "11"],
		["12", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "R32", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		["13", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "R39", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		["14", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "S15", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		["15", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "S16", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		["16", "", "R13", "", "", "", "", "", "R13", "R13", "R13", "", "R13", "R13", "R13", "", "", "", "", "", "", "", "R13", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		["17", "", "", "", "", "", "", "S20", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "S22", "S21", "", "", "", "", "", "", "", "", "", "", "18", "", "", "", "", "", "", "", "", "", ""],
		["18", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "S19", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		["19", "", "R14", "", "", "", "", "", "R14", "R14", "R14", "", "R14", "R14", "R14", "", "", "", "", "", "", "", "R14", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		["20", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "R15", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		["21", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "R16", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		["22", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "R17", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		["23", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "S24", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		["24", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "S30", "S31", "", "", "", "", "", "", "", "", "", "", "", "", "25", "27", "", "", "", "", "", "", ""],
		["25", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "S26", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		["26", "", "R19", "", "", "", "", "", "R19", "R19", "R19", "", "R19", "R19", "R19", "", "", "", "", "", "", "", "R19", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		["27", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "R21", "", "", "S28", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		["28", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "S30", "S31", "", "", "", "", "", "", "", "", "", "", "", "", "", "29", "", "", "", "", "", "", ""],
		["29", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "R20", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		["30", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "R22", "", "", "R22", "R22", "", "R22", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		["31", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "R23", "", "", "R23", "R23", "", "R23", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		["32", "", "", "", "", "", "", "", "S14", "S17", "S41", "", "S40", "", "", "", "", "", "", "", "", "", "S23", "", "", "", "", "", "", "", "", "", "", "34", "", "36", "", "", "38", "32", "", "33", "", "", ""],
		["33", "", "R25", "", "", "", "", "", "R25", "R25", "R25", "", "R25", "R25", "R25", "", "", "", "", "", "", "", "R25", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		["34", "", "", "", "", "", "", "", "S14", "S17", "S41", "", "S40", "", "", "", "", "", "", "", "", "", "S23", "", "", "", "", "", "", "", "", "", "", "34", "", "36", "", "", "38", "32", "", "35", "", "", ""],
		["35", "", "R28", "", "", "", "", "", "R28", "R28", "R28", "", "R28", "R28", "R28", "", "", "", "", "", "", "", "R28", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		["36", "", "", "", "", "", "", "", "S14", "S17", "S41", "", "S40", "", "", "", "", "", "", "", "", "", "S23", "", "", "", "", "", "", "", "", "", "", "34", "", "36", "", "", "38", "32", "", "37", "", "", ""],
		["37", "", "R29", "", "", "", "", "", "R29", "R29", "R29", "", "R29", "R29", "R29", "", "", "", "", "", "", "", "R29", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		["38", "", "", "", "", "", "", "", "S14", "S17", "S41", "", "S40", "", "", "", "", "", "", "", "", "", "S23", "", "", "", "", "", "", "", "", "", "", "34", "", "36", "", "", "38", "32", "", "39", "", "", ""],
		["39", "", "R30", "", "", "", "", "", "R30", "R30", "R30", "", "R30", "R30", "R30", "", "", "", "", "", "", "", "R30", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		["40", "", "R31", "", "", "", "", "", "R31", "R31", "R31", "", "R31", "R31", "R31", "", "", "", "", "", "", "", "R31", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		["41", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "S42", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		["42", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "S30", "S31", "", "", "", "", "", "", "", "", "", "", "", "", "", "46", "", "", "43", "", "", "", ""],
		["43", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "S44", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		["44", "", "", "", "", "", "", "", "", "", "", "S45", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		["45", "", "", "", "", "", "", "", "R26", "R26", "R26", "", "R26", "", "", "", "", "", "", "", "", "", "R26", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		["46", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "S47", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		["47", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "S30", "S31", "", "", "", "", "", "", "", "", "", "", "", "", "", "48", "", "", "", "", "", "", ""],
		["48", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "R27", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		["49", "", "", "", "", "", "", "", "S14", "S17", "S41", "", "", "", "S57", "", "", "", "", "", "", "", "S23", "", "", "", "", "", "", "", "", "", "", "51", "", "53", "", "", "55", "32", "", "", "", "50", ""],
		["50", "", "R33", "", "", "", "", "", "R33", "", "R33", "", "", "R33", "", "", "", "", "", "", "", "", "R33", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		["51", "", "", "", "", "", "", "", "S14", "S17", "S41", "", "", "", "S57", "", "", "", "", "", "", "", "S23", "", "", "", "", "", "", "", "", "", "", "51", "", "53", "", "", "55", "32", "", "", "", "52", ""],
		["52", "", "R35", "", "", "", "", "", "R35", "R35", "R35", "", "", "R35", "", "", "", "", "", "", "", "", "R35", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		["53", "", "", "", "", "", "", "", "S14", "S17", "S41", "", "", "", "S57", "", "", "", "", "", "", "", "S23", "", "", "", "", "", "", "", "", "", "", "51", "", "53", "", "", "55", "32", "", "", "", "54", ""],
		["54", "", "R36", "", "", "", "", "", "R36", "R36", "R36", "", "", "R36", "", "", "", "", "", "", "", "", "R36", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		["55", "", "", "", "", "", "", "", "S14", "S17", "S41", "", "", "", "S57", "", "", "", "", "", "", "", "S23", "", "", "", "", "", "", "", "", "", "", "51", "", "53", "", "", "55", "32", "", "", "", "56", ""],
		["56", "", "R37", "", "", "", "", "", "R37", "R37", "R37", "", "", "R37", "", "", "", "", "", "", "", "", "R37", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		["57", "", "R38", "", "", "", "", "", "R38", "R38", "R38", "", "", "R38", "", "", "", "", "", "", "", "", "R38", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		["58", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "S59", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		["59", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "S30", "S31", "", "", "", "", "", "", "", "", "", "", "", "", "", "46", "", "", "60", "", "", "", ""],
		["60", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "S61", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		["61", "", "", "", "", "", "", "", "R34", "R34", "R34", "", "", "", "R34", "", "", "", "", "", "", "", "R34", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		["62", "", "", "", "S66", "S74", "S75", "S76", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "63", "64", "", "68", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		["63", "", "R3", "", "", "", "", "", "R3", "", "R3", "", "", "R3", "", "", "", "", "", "", "", "", "R3", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		["64", "", "", "", "S66", "S74", "S75", "S76", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "65", "64", "", "68", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		["65", "", "R4", "", "", "", "", "", "R4", "", "R4", "", "", "R4", "", "", "", "", "", "", "", "", "R4", "", "", "R4", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		["66", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "S67", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		["67", "", "R5", "", "", "", "", "", "R5", "", "R5", "", "", "R5", "", "", "", "", "", "", "", "", "R5", "", "", "R5", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		["68", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "S71", "", "", "", "", "", "", "", "69", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		["69", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "S70", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		["70", "", "", "", "R6", "R6", "R6", "R6", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		["71", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "R8", "S72", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		["72", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "S71", "", "", "", "", "", "", "", "73", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		["73", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "R7", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		["74", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "R9", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		["75", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "R10", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
		["76", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "R11", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
	];

	static getHeaderIndex(header: string) {
		return TabelaSintatica.tabelaSintaticaHeaders.indexOf(header);
	}
	
	static getRowIndex(state: string) {
		return TabelaSintatica.tabelaSintaticaLinhas.indexOf(state);
	}
	
}