import { AutomatoLexico } from "../lexico/model/AutomatoLexico";

// -------------- 1.1 - Classificação de linhas -------------

console.log(AutomatoLexico.iniciar("123", 1))


// -------------- 1.0 - Classificação de palavras -------------
//   // Números
// console.log(Automato.q0("12"));
// console.log(Automato.q0("12.251"));
// console.log(Automato.q0("12.251"));
// console.log(Automato.q0("12e12"));
// console.log(Automato.q0("12e+6"));
// console.log(Automato.q0("12e-2"));
// console.log(Automato.q0("12.658e2"));
// console.log(Automato.q0("12.658e-1"));
// console.log(Automato.q0("12.658e+10"));

//   // Literais
// console.log(Automato.q0('"teste"'));

//   // Ids
// console.log(Automato.q0("teste"));
// console.log(Automato.q0("maroto"));
// console.log(Automato.q0("palavra"));
// console.log(Automato.q0("doidera"));
// console.log(Automato.q0("isso"));

//   // Reservadas
// console.log(Automato.q0("inicio"));
// console.log(Automato.q0("varinicio"));
// console.log(Automato.q0("varfim"));
// console.log(Automato.q0("escreva"));
// console.log(Automato.q0("leia"));
// console.log(Automato.q0("se"));
// console.log(Automato.q0("entao"));
// console.log(Automato.q0("fimse"));
// console.log(Automato.q0("repita"));
// console.log(Automato.q0("fimRepita"));
// console.log(Automato.q0("fim"));
// console.log(Automato.q0("inteiro"));
// console.log(Automato.q0("literal"));
// console.log(Automato.q0("real"));

//   // Comentário
// console.log(Automato.q0("{}"));

//   // Atribuição
// console.log(Automato.q0("<-"));

//   // Operador Relacional
// console.log(Automato.q0("<"));
// console.log(Automato.q0("<="));
// console.log(Automato.q0("<>"));
// console.log(Automato.q0("="));
// console.log(Automato.q0(">"));
// console.log(Automato.q0(">="));

//   // Operador Atritmético
// console.log(Automato.q0("+"));
// console.log(Automato.q0("-"));
// console.log(Automato.q0("*"));
// console.log(Automato.q0("\/"));

//   // Abre Parênteses
// console.log(Automato.q0("("));

//   // Fecha Parênteses
// console.log(Automato.q0(")"));

// // Ponto e Vírgula
// console.log(Automato.q0(";"));

// // Vírgula
// console.log(Automato.q0(","));