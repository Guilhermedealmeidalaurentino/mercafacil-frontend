export interface IUsuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
  telefone?: string;
  role: 'ADMIN' | 'CLIENTE' | 'MERCADO';
  ativo: boolean;
}

export interface IMercado {
  id: number;
  usuario_id: number;
  nome_mercado: string;
  cnpj: string;
  cep: string;
  logradouro?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  descricao?: string;
  ativo: boolean;
  horario_abertura: string;
  horario_fechamento: string;
}

export interface IProduto {
  id?: number;
  mercado_id: number;
  nome: string;
  descricao: string;
  categoria: string;
  marca: string;
  preco: number;
  estoque: number;
  ativo: boolean;
}

export interface IReserva {
  id?: number;
  cliente_id: number;
  mercado_id: number;
  status: 'PENDENTE' | 'CONFIRMADA' | 'RETIRADA' | 'CANCELADA';
  codigo_retirada?: string;
  data_reserva?: Date;
  data_retirada: Date;
}

export interface IReservaProduto {
  produto_id: number;
  nome: string;
  quantidade: number;
  preco_unitario: number;
}

export interface IReservaComProdutos {
  id: number;
  mercado_id: number;
  nome_mercado: string;
  status: IReserva['status'];
  codigo_retirada: string;
  data_reserva: string;
  data_retirada: string;
  produtos: IReservaProduto[];
}

export interface ICreateReservaPayload {
  mercado_id: number;
  data_retirada: string;
  produtos: {
    produto_id: number;
    quantidade: number;
  }[];
}

export interface ILoginResponse {
  accessToken: string;
  usuario: Omit<IUsuario, 'senha' | 'ativo'>;
  mercado?: IMercado;
}
