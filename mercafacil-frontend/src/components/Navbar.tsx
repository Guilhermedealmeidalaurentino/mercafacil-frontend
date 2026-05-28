import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const Navbar = () => {
  const { usuario, logout, isCliente, isMercado, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0.75rem 2rem',
      backgroundColor: '#fff',
      borderBottom: '1px solid #e0e0e0',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      fontFamily: "'Segoe UI', sans-serif",
    }}>

      {/* Logo */}
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <div style={{
          backgroundColor: '#2ecc8f',
          borderRadius: '8px',
          width: '36px',
          height: '36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.1rem',
        }}>🛒</div>
        <span style={{ fontWeight: '700', fontSize: '1.1rem', color: '#1a1a1a' }}>MercaFácil</span>
      </Link>

      {/* Links centrais — só para mercado e admin */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
        {isMercado && (
          <>
            <NavLink to="/comerciante/reservas">Reservas</NavLink>
            <NavLink to="/comerciante/produtos">Produtos</NavLink>
          </>
        )}
        {isAdmin && (
          <NavLink to="/admin/usuarios">Usuários</NavLink>
        )}
      </div>

      {/* Lado direito */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>

        {/* Cliente: link de reservas */}
        {isCliente && (
          <NavLink to="/cliente/reservas">Minhas Reservas</NavLink>
        )}

        {/* Dropdown de perfil */}
        <div ref={dropdownRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setDropdown(!dropdown)}
            style={{
              background: '#f7f7f7',
              border: '1px solid #e0e0e0',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              cursor: 'pointer',
              fontSize: '1.1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            👤
          </button>

          {dropdown && (
            <div style={{
              position: 'absolute',
              right: 0,
              top: '52px',
              backgroundColor: '#fff',
              border: '1px solid #e0e0e0',
              borderRadius: '12px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              minWidth: '220px',
              zIndex: 200,
              overflow: 'hidden',
            }}>
              {/* Info do usuário */}
              <div style={{ padding: '1rem', borderBottom: '1px solid #f0f0f0' }}>
                <p style={{ margin: 0, fontWeight: '600', color: '#1a1a1a', fontSize: '0.9rem' }}>
                  {usuario?.nome}
                </p>
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#888' }}>
                  {usuario?.email}
                </p>
              </div>

              {/* Itens */}
              {[
                { icon: '👤', label: 'Meu perfil', path: '/perfil' },
                ...(isCliente ? [{ icon: '📦', label: 'Meus pedidos', path: '/cliente/reservas' }] : []),
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => { navigate(item.path); setDropdown(false); }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    color: '#333',
                    textAlign: 'left',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f7f7f7')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}

              <div style={{ borderTop: '1px solid #f0f0f0' }}>
                <button
                  onClick={handleLogout}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    color: '#e74c3c',
                    textAlign: 'left',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#fff5f5')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <span>🚪</span>
                  <span>Sair</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link
    to={to}
    style={{ textDecoration: 'none', color: '#555', fontSize: '0.875rem', fontWeight: '500', padding: '0.4rem 0.75rem', borderRadius: '8px' }}
    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#f0faf5'; (e.currentTarget as HTMLElement).style.color = '#2ecc8f'; }}
    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#555'; }}
  >
    {children}
  </Link>
);