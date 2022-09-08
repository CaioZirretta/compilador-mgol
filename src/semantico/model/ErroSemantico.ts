export type ErroSemantico = {
	erro: string;
	mensagem: string;
	detalhes: {
		causa: string;
	};
};
