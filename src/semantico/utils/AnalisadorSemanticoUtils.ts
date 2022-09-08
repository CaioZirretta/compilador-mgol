import { AnalisadorSemantico } from "../AnalisadorSemantico";

export class AnalisadorSemanticoUtils {
	static cancelarCriacaoDeCodigo() {
		AnalisadorSemantico.gerarCodObjeto = false;
	}
}
