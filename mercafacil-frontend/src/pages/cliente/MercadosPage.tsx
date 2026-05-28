import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { mercadosService } from '../../api/services';
import { useAuth } from '../../contexts/AuthContext';
import type { IMercado } from '../../types';

export const MercadosPage = () => {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
  const [mercados, setMercados] = useState<IMercado[]>([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mercadosService.listar(1, 20, filter)
      .then(setMercados)
      .finally(() => setLoading(false));
  }, [filter]);

  // Fecha dropdown ao clicar fora
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
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', fontFamily: "'Segoe UI', sans-serif" }}>

      {/* Hero */}
      <div style={{
        backgroundColor: '#e8f5f0',
        padding: '3rem 2rem',
        textAlign: 'center',
      }}>
        <h1 style={{ margin: '0 0 0.5rem', fontSize: '1.75rem', color: '#1a1a1a' }}>
          Escolha o mercado
        </h1>
        <p style={{ margin: '0 0 1.5rem', color: '#666' }}>
          Selecione o estabelecimento mais próximo para suas compras
        </p>

        {/* Busca */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          backgroundColor: '#fff',
          border: '1px solid #e0e0e0',
          borderRadius: '50px',
          padding: '0.6rem 1.25rem',
          maxWidth: '500px',
          margin: '0 auto',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        }}>
          <span style={{ color: '#aaa' }}>🔍</span>
          <input
            type="text"
            placeholder="Buscar por nome ou endereço..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              border: 'none',
              outline: 'none',
              width: '100%',
              fontSize: '0.95rem',
              color: '#333',
              backgroundColor: 'transparent',
            }}
          />
        </div>
      </div>

      {/* Grid de mercados */}
      <div style={{ maxWidth: '1100px', margin: '2rem auto', padding: '0 1.5rem' }}>
        {loading && <p style={{ textAlign: 'center', color: '#888' }}>Carregando mercados...</p>}
        {!loading && mercados.length === 0 && (
          <p style={{ textAlign: 'center', color: '#888' }}>Nenhum mercado encontrado.</p>
        )}

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}>
          {mercados.map((mercado) => (
            <div key={mercado.id} style={{
              backgroundColor: '#fff',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
              border: '1px solid #f0f0f0',
            }}>
              {/* Imagem placeholder */}
              <div style={{
                height: '160px',
                backgroundColor: '#e8f5f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3rem',
              }}>
                🏪
              </div>

              {/* Info */}
              <div style={{ padding: '1rem' }}>
                <h3 style={{ margin: '0 0 0.5rem', fontSize: '1rem', color: '#1a1a1a' }}>
                  {mercado.nome_mercado}
                </h3>

                <p style={{ margin: '0 0 0.25rem', fontSize: '0.85rem', color: '#666', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  📍 {mercado.logradouro ? `${mercado.logradouro} - ${mercado.bairro}` : mercado.cidade}
                </p>

                <p style={{ margin: '0 0 1rem', fontSize: '0.85rem', color: '#666', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  🕐 {mercado.horario_abertura?.slice(0, 5)} às {mercado.horario_fechamento?.slice(0, 5)}
                </p>

                <button
                  onClick={() => navigate(`/cliente/reservas/nova?mercado_id=${mercado.id}`)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    backgroundColor: '#2ecc8f',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  Selecionar mercado
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};