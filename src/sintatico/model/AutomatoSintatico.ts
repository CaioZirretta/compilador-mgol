export class AutomatoSintatico {
	static pilha: string[] = ["0"];

	q0() {}
	q1() {}
	q2() {}
	q3() {}
	q4() {}
	q5() {}
	q6() {}
	q7() {}
	q8() {}
	q9() {}
	q10() {}
	q11() {}
	q12() {}
	q13() {}
	q14() {}
	q15() {}
	q16() {}
	q17() {}
	q18() {}
	q19() {}
	q20() {}
	q21() {}
	q22() {}
	q23() {}
	q24() {}
	q25() {}
	q26() {}
	q27() {}
	q28() {}
	q29() {}
	q30() {}
	q31() {}
	q32() {}
	q33() {}
	q34() {}
	q35() {}
	q36() {}
	q37() {}
	q38() {}
	q39() {}
	q40() {}
	q41() {}
	q42() {}
	q43() {}
	q44() {}
	q45() {}
	q46() {}
	q47() {}
	q48() {}
	q49() {}
	q50() {}
	q51() {}
	q52() {}
	q53() {}
	q54() {}
	q55() {}
	q56() {}
	q57() {}
	q58() {}
	q59() {}
	q60() {}
	q61() {}
	q62() {}
	q63() {}
	q64() {}
	q65() {}
	q66() {}
	q67() {}
	q68() {}
	q69() {}
	q70() {}
	q71() {}
	q72() {}
	q73() {}
	q74() {}
	q75() {}

	static criar() {
		return new AutomatoSintatico();
	}

	static empilhar(elemento:string){
		AutomatoSintatico.pilha.push(elemento);
	}

	static desempilhar(){
		AutomatoSintatico.pilha.pop();
	}

	static topoDaPilha(){
		return AutomatoSintatico.pilha[AutomatoSintatico.pilha.length - 1]
	}
}