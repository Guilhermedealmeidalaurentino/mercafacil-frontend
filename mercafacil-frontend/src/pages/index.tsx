// ─── Auth ─────────────────────────────────────────────────────────────────────
export { LoginPage } from './auth/LoginPage';

export { CadastroClientePage } from './auth/CadastroClientePage';
export const CadastroComerciantePage = () => <div><h1>Cadastro de Comerciante</h1><p>Implemente o formulário usando usuariosService.cadastrarComerciante()</p></div>;

// ─── Cliente ──────────────────────────────────────────────────────────────────
export { MinhasReservasPage } from './cliente/MinhasReservasPage';
export const NovaReservaPage = () => <div><h1>Nova Reserva</h1><p>Liste mercados, produtos, escolha data_retirada e chame reservasService.criar()</p></div>;
export const DetalheReservaClientePage = () => <div><h1>Detalhe da Reserva</h1><p>Use useParams para pegar o id e chame reservasService.buscarPorId()</p></div>;

// ─── Comerciante ──────────────────────────────────────────────────────────────
export { ReservasMercadoPage } from './comerciante/ReservasMercadoPage';
export const DetalheReservaMercadoPage = () => <div><h1>Detalhe da Reserva</h1><p>Use useParams para pegar o id e chame reservasService.buscarPorId()</p></div>;
export const ProdutosPage = () => <div><h1>Meus Produtos</h1><p>Liste, crie e edite produtos com produtosService</p></div>;

// ─── Admin ────────────────────────────────────────────────────────────────────
export const UsuariosPage = () => <div><h1>Usuários</h1><p>Liste e gerencie usuários com usuariosService</p></div>;
