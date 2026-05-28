import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { reservasService } from '../../api/services';
import type { IReserva, IReservaComProdutos } from '../../types';

const STATUS_LABEL: Record<IReservaComProdutos['status'], string> = {
  PENDENTE: 'Pendente',
  CONFIRMADA: 'Confirmada',
  RETIRADA: 'Retirada',
  CANCELADA: 'Cancelada',
};

const PROXIMOS_STATUS: Record<IReserva['status'], IReserva['status'][]> = {
  PENDENTE: ['CONFIRMADA', 'CANCELADA'],
  CONFIRMADA: ['RETIRADA', 'CANCELADA'],
  RETIRADA: [],
  CANCELADA: [],
};

export const ReservasMercadoPage = () => {
  const [reservas, setReservas] = useState<IReservaComProdutos[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    reservasService.reservasMercado()
      .then(setReservas)
      .catch((err) => setErro(err.message))
      .finally(() => setLoading(false));
  }, []);

  const atualizarStatus = async (id: number, status: IReserva['status']) => {
    try {
      await reservasService.atualizarStatus(id, status);
      setReservas((prev) =>
        prev.map((r) => r.id === id ? { ...r, status } : r)
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Erro ao atualizar status');
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (erro) return <p style={{ color: 'red' }}>{erro}</p>;

  return (
    <div>
      <h1>Reservas do Meu Mercado</h1>
      <Link to="/comerciante/produtos">Gerenciar Produtos</Link>

      {reservas.length === 0 && <p>Nenhuma reserva recebida ainda.</p>}

      {reservas.map((reserva) => (
        <div key={reserva.id} style={{ border: '1px solid #ccc', margin: '1rem', padding: '1rem' }}>
          <p><strong>Reserva #{reserva.id}</strong></p>
          <p><strong>Status:</strong> {STATUS_LABEL[reserva.status]}</p>
          <p><strong>Código:</strong> {reserva.codigo_retirada}</p>
          <p><strong>Retirada:</strong> {new Date(reserva.data_retirada).toLocaleString('pt-BR')}</p>
          <p><strong>Produtos:</strong> {reserva.produtos.length} item(s)</p>

          <Link to={`/comerciante/reservas/${reserva.id}`}>Ver detalhes</Link>

          <div style={{ marginTop: '0.5rem' }}>
            {PROXIMOS_STATUS[reserva.status].map((novoStatus) => (
              <button
                key={novoStatus}
                onClick={() => atualizarStatus(reserva.id, novoStatus)}
                style={{ marginRight: '0.5rem' }}
              >
                Marcar como {STATUS_LABEL[novoStatus]}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
