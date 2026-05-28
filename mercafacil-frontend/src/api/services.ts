import { api } from './api';
import type {
  ILoginResponse,
  IUsuario,
  IMercado,
  IProduto,
  IReserva,
  IReservaComProdutos,
  ICreateReservaPayload,
} from '../types';

// ─── Auth ────────────────────────────────────────────────────────────────────
export const authService = {
  login: (email: string, senha: string) =>
    api.post<ILoginResponse>('/entrar', { email, senha }),

  getMe: () =>
    api.get<Omit<IUsuario, 'senha'>>('/me'),
};

// ─── Usuários ────────────────────────────────────────────────────────────────
export const usuariosService = {
  cadastrarCliente: (data: { nome: string; email: string; senha: string }) =>
    api.post<{ id: number }>('/cadastrar/cliente', data),

  cadastrarComerciante: (data: {
    nome: string;
    email: string;
    senha: string;
    cnpj: string;
    cep: string;
    nome_mercado: string;
    telefone?: string;
  }) => api.post<{ usuario_id: number; mercado_id: number }>('/cadastrar/comerciante', data),

  cadastrarAdmin: (data: { nome: string; email: string; senha: string }) =>
    api.post<{ id: number }>('/cadastrar/admin', data),

  listar: (page = 1, limit = 10, filter = '') =>
    api.get<Omit<IUsuario, 'senha'>[]>(`/usuarios?page=${page}&limit=${limit}&filter=${filter}`),

  atualizarPerfil: (data: { nome?: string; email?: string; telefone?: string }) =>
    api.put<void>('/usuarios/perfil', data),

  alterarSenha: (senhaAtual: string, novaSenha: string) =>
    api.post<void>('/usuarios/reset-password', { senhaAtual, novaSenha }),

  deletar: (id: number) =>
    api.delete<void>(`/usuarios/${id}`),
};

// ─── Mercados ────────────────────────────────────────────────────────────────
export const mercadosService = {
  listar: (page = 1, limit = 10, filter = '') =>
    api.get<IMercado[]>(`/mercados?page=${page}&limit=${limit}&filter=${filter}`),

  buscarPorId: (id: number) =>
    api.get<IMercado>(`/mercados/${id}`),

  atualizar: (id: number, data: Partial<IMercado>) =>
    api.put<void>(`/mercados/${id}`, data),
};

// ─── Produtos ────────────────────────────────────────────────────────────────
export const produtosService = {
  listar: (page = 1, limit = 10, filter = '', id = 0) =>
    api.get<IProduto[]>(`/produtos?page=${page}&limit=${limit}&filter=${filter}&id=${id}`),

  buscarPorId: (id: number) =>
    api.get<IProduto>(`/produtos/${id}`),

  criar: (data: Omit<IProduto, 'id' | 'mercado_id'>) =>
    api.post<{ id: number }>('/produtos', data),

  atualizar: (id: number, data: Partial<IProduto>) =>
    api.put<void>(`/produtos/${id}`, data),

  deletar: (id: number) =>
    api.delete<void>(`/produtos/${id}`),
};

// ─── Reservas ────────────────────────────────────────────────────────────────
export const reservasService = {
  criar: (data: ICreateReservaPayload) =>
    api.post<{ reserva_id: number; codigo_retirada: string; data_retirada: string }>('/reservas', data),

  minhasReservas: () =>
    api.get<IReservaComProdutos[]>('/reservas/minhas'),

  reservasMercado: () =>
    api.get<IReservaComProdutos[]>('/reservas/mercado'),

  buscarPorId: (id: number) =>
    api.get<IReservaComProdutos>(`/reservas/${id}`),

  atualizarStatus: (id: number, status: IReserva['status']) =>
    api.patch<void>(`/reservas/${id}/status`, { status }),

  cancelar: (id: number) =>
    api.patch<void>(`/reservas/${id}/cancelar`),
};
