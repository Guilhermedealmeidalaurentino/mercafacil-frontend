import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { PrivateRoute, PublicRoute } from './routes/PrivateRoute';

import {
  LoginPage,
  CadastroClientePage,
  CadastroComerciantePage,
  MinhasReservasPage,
  NovaReservaPage,
  DetalheReservaClientePage,
  ReservasMercadoPage,
  DetalheReservaMercadoPage,
  ProdutosPage,
  UsuariosPage,
} from './pages/index';

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/cadastrar/cliente" element={<CadastroClientePage />} />
            <Route path="/cadastrar/comerciante" element={<CadastroComerciantePage />} />
          </Route>

          <Route element={<PrivateRoute roles={['CLIENTE']} />}>
            <Route path="/cliente/reservas" element={<MinhasReservasPage />} />
            <Route path="/cliente/reservas/nova" element={<NovaReservaPage />} />
            <Route path="/cliente/reservas/:id" element={<DetalheReservaClientePage />} />
          </Route>

          <Route element={<PrivateRoute roles={['MERCADO']} />}>
            <Route path="/comerciante/reservas" element={<ReservasMercadoPage />} />
            <Route path="/comerciante/reservas/:id" element={<DetalheReservaMercadoPage />} />
            <Route path="/comerciante/produtos" element={<ProdutosPage />} />
          </Route>

          <Route element={<PrivateRoute roles={['ADMIN']} />}>
            <Route path="/admin/usuarios" element={<UsuariosPage />} />
          </Route>

          <Route path="/nao-autorizado" element={<div>Acesso negado</div>} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}