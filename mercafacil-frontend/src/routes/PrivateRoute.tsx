import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import type { IUsuario } from '../types';

interface PrivateRouteProps {
  roles?: IUsuario['role'][];
}

export const PrivateRoute = ({ roles }: PrivateRouteProps) => {
  const { isAuthenticated, usuario } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (roles && usuario && !roles.includes(usuario.role)) {
    return <Navigate to="/nao-autorizado" replace />;
  }

  return <Outlet />;
};

export const PublicRoute = () => {
  const { isAuthenticated, usuario } = useAuth();

  if (isAuthenticated && !usuario) return null;

  if (!isAuthenticated) return <Outlet />;

  const dashboardMap: Record<IUsuario['role'], string> = {
    CLIENTE: '/cliente/reservas',
    MERCADO: '/comerciante/reservas',
    ADMIN: '/admin/usuarios',
  };

  return <Navigate to={dashboardMap[usuario!.role]} replace />;
};