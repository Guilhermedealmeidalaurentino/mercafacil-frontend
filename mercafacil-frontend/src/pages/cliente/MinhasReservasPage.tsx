import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { reservasService } from '../../api/services';
import type { IReservaComProdutos } from '../../types';

const STATUS_LABEL: Record<IReservaComProdutos['status'], string> = {
  PENDENTE: '⏳ Pendente',
  CONFIRMADA: '✅ Confirmada',
  RETIRADA: '📦 Retirada',
  CANCELADA: '❌ Cancelada',
};

export const MinhasReservasPage = () => {
  const [reservas, setReservas] = useState<IReservaComProdutos[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    reservasService.minhasReservas()
      .then(setReservas)
      .catch((err) => setErro(err.message))
      .finally(() => setLoading(false));
  }, []);

  const cancelar = async (id: number) => {
    if (!confirm('Deseja cancelar esta reserva?')) return;
    try {
      await reservasService.cancelar(id);
      setReservas((prev) =>
        prev.map((r) => r.id === id ? { ...r, status: 'CANCELADA' } : r)
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Erro ao cancelar');
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (erro) return <p style={{ color: 'red' }}>{erro}</p>;

  return (
    <div>
      <h1>Minhas Reservas</h1>
      <Link to="/cliente/reservas/nova">+ Nova Reserva</Link>

      {reservas.length === 0 && <p>Você ainda não tem reservas.</p>}

      {reservas.map((reserva) => (
        <div key={reserva.id} style={{ border: '1px solid #ccc', margin: '1rem', padding: '1rem' }}>
          <p><strong>Mercado:</strong> {reserva.nome_mercado}</p>
          <p><strong>Status:</strong> {STATUS_LABEL[reserva.status]}</p>
          <p><strong>Código:</strong> {reserva.codigo_retirada}</p>
          <p><strong>Retirada:</strong> {new Date(reserva.data_retirada).toLocaleString('pt-BR')}</p>
          <p><strong>Produtos:</strong> {reserva.produtos.length} item(s)</p>

          <Link to={`/cliente/reservas/${reserva.id}`}>Ver detalhes</Link>

          {reserva.status === 'PENDENTE' && (
            <button onClick={() => cancelar(reserva.id)} style={{ marginLeft: '1rem' }}>
              Cancelar
            </button>
          )}
        </div>
      ))}
    </div>
  );
};
