import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { PrivateRoute, PublicRoute } from './routes/PrivateRoute';
import { Navbar } from './components/Navbar';
import { useAuth } from './contexts/AuthContext';


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
  PerfilPage,
  MercadosPage,
} from './pages/index';

// Layout separado para ter acesso ao AuthContext
const Layout = () => {
  const { isAuthenticated } = useAuth();
  return (
    <>
      {isAuthenticated && <Navbar />}
      <Outlet />
    </>
  );
};

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Layout envolve tudo — está dentro do AuthProvider */}
          <Route element={<Layout />}>

            <Route element={<PublicRoute />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/cadastrar/cliente" element={<CadastroClientePage />} />
              <Route path="/cadastrar/comerciante" element={<CadastroComerciantePage />} />
            </Route>

            <Route element={<PrivateRoute roles={['CLIENTE']} />}>
              <Route path="/cliente/reservas" element={<MinhasReservasPage />} />
              <Route path="/cliente/reservas/nova" element={<NovaReservaPage />} />
              <Route path="/cliente/reservas/:id" element={<DetalheReservaClientePage />} />
              <Route path="/cliente/mercados" element={<MercadosPage />} />
            </Route>

            <Route element={<PrivateRoute roles={['MERCADO']} />}>
              <Route path="/comerciante/reservas" element={<ReservasMercadoPage />} />
              <Route path="/comerciante/reservas/:id" element={<DetalheReservaMercadoPage />} />
              <Route path="/comerciante/produtos" element={<ProdutosPage />} />
            </Route>

            <Route element={<PrivateRoute roles={['ADMIN']} />}>
              <Route path="/admin/usuarios" element={<UsuariosPage />} />
            </Route>

            <Route element={<PrivateRoute roles={['CLIENTE', 'MERCADO', 'ADMIN']} />}>
              <Route path="/perfil" element={<PerfilPage />} />
            </Route>

            <Route path="/nao-autorizado" element={<div>Acesso negado</div>} />
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />

          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}