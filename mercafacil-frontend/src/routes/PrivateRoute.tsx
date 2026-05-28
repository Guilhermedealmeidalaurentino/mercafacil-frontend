import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import type { IUsuario } from '../types';

interface PrivateRouteProps {
  roles?: IUsuario['role'][];
}

// Rota privada — redireciona para /login se não autenticado
export const PrivateRoute = ({ roles }: PrivateRouteProps) => {
  const { isAuthenticated, usuario } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (roles && usuario && !roles.includes(usuario.role)) {
    return <Navigate to="/nao-autorizado" replace />;
  }

  return <Outlet />;
};

// Rota pública — redireciona para dashboard se já logado
export const PublicRoute = () => {
  const { isAuthenticated, usuario } = useAuth();

  if (!isAuthenticated) return <Outlet />;

  // Redireciona para o dashboard correto por role
  const dashboardMap: Record<IUsuario['role'], string> = {
    CLIENTE: '/cliente/reservas',
    MERCADO: '/comerciante/reservas',
    ADMIN: '/admin/usuarios',
  };

  return <Navigate to={dashboardMap[usuario!.role]} replace />;
};
