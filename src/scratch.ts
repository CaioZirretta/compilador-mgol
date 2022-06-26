import { Reservadas } from './lexico/model/Simbolos';
// function q0() {
// 	return console.log("this is q0");
// }
// function q1() {
// 	return console.log("this is q1");
// }
// function q2() {
// 	return console.log("this is q2");
// }
// function q3() {
// 	return console.log("this is q3");
// }

// const f = [
// 	[["a", "b"], q0],
// 	// [["c", "d"], q1],
// 	// [["e", "f"], q2],
// 	// [["g", "h"], q3],
// 	// [[...Digitos], q3]
// ];

// function serve(op: any[][], char:string) {
// 	for(let i = 0; i < op.length; i++) {
// 		// iterador pelo array[]
// 		for(let j = 0, array = op[i][0]; j < op[i][0].length; j++) {
// 			if(char.match(array[j])){
// 				return op[i][1];
// 			}
// 		}
// 	}
// 	return () => {console.log("erro");
// 	}
// }

// const nf = serve(f, "5");

// nf();

const x = Reservadas.some(r => { r === "varinicio"})
console.log(x);
