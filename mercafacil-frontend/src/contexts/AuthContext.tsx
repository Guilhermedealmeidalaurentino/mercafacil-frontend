import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '../api/services';
import type { IUsuario, IMercado } from '../types';

interface IAuthState {
  usuario: Omit<IUsuario, 'senha'> | null;
  mercado: IMercado | null;
  token: string | null;
}

interface IAuthContext extends IAuthState {
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isCliente: boolean;
  isMercado: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<IAuthState>({
    usuario: null,
    mercado: null,
    token: localStorage.getItem('token'),
  });

  // Recarrega o usuário ao iniciar se já tiver token
  useEffect(() => {
    if (state.token) {
      authService.getMe()
        .then((usuario) => setState((prev) => ({ ...prev, usuario })))
        .catch(() => logout());
    }
  }, []);

  const login = async (email: string, senha: string) => {
    const data = await authService.login(email, senha);
    localStorage.setItem('token', data.accessToken);
    setState({
      token: data.accessToken,
      usuario: data.usuario,
      mercado: data.mercado ?? null,
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setState({ token: null, usuario: null, mercado: null });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        isAuthenticated: !!state.token,
        isCliente: state.usuario?.role === 'CLIENTE',
        isMercado: state.usuario?.role === 'MERCADO',
        isAdmin: state.usuario?.role === 'ADMIN',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return ctx;
};
