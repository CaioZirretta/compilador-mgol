export type ErroSintatico = {
	erro: string;
	mensagem: string;
	detalhes: {
		recebido: {
			token: string;
			linha?: number;
		};
		esperado?: string;
	};
	acao?: string;
};
