import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const Navbar = () => {
  const { usuario, logout, isCliente, isMercado, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0.75rem 1.5rem',
      background: '#1a1a2e',
      color: '#fff',
    }}>
      <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>🛒 MercaFácil</span>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        {isCliente && (
          <>
            <Link to="/cliente/reservas" style={{ color: '#fff' }}>Minhas Reservas</Link>
            <Link to="/cliente/reservas/nova" style={{ color: '#fff' }}>Nova Reserva</Link>
          </>
        )}
        {isMercado && (
          <>
            <Link to="/comerciante/reservas" style={{ color: '#fff' }}>Reservas</Link>
            <Link to="/comerciante/produtos" style={{ color: '#fff' }}>Produtos</Link>
          </>
        )}
        {isAdmin && (
          <Link to="/admin/usuarios" style={{ color: '#fff' }}>Usuários</Link>
        )}

        <Link to="/perfil" style={{ color: '#ccc', fontSize: '0.9rem' }}>
          👤 {usuario?.nome}
        </Link>

        <button
          onClick={handleLogout}
          style={{
            background: '#e74c3c',
            color: '#fff',
            border: 'none',
            padding: '0.4rem 1rem',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Sair
        </button>
      </div>
    </nav>
  );
};