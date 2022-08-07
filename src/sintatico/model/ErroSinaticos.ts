export type ErroSintatico = {
	erro: string;
	mensagem: string;
	detalhes: {
		recebido: {
			token: string;
			linha?: string;
		};
		esperado?: string;
	};
	acao?: string;
};
