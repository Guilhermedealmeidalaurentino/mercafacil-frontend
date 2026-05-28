import { useState, useEffect } from 'react';
import { usuariosService } from '../../api/services';
import { useAuth } from '../../contexts/AuthContext';

export const PerfilPage = () => {
  const { usuario } = useAuth();

  const [perfil, setPerfil] = useState({ nome: '', email: '', telefone: '' });
  const [senha, setSenha] = useState({ senhaAtual: '', novaSenha: '', confirmar: '' });
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');
  const [loadingPerfil, setLoadingPerfil] = useState(false);
  const [loadingSenha, setLoadingSenha] = useState(false);

  useEffect(() => {
    usuariosService.buscarPerfil().then((data) => {
      setPerfil({
        nome: data.nome ?? '',
        email: data.email ?? '',
        telefone: data.telefone ?? '',
      });
    });
  }, []);

  const handlePerfilSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setMensagem('');
    setLoadingPerfil(true);
    try {
      await usuariosService.atualizarPerfil({
        nome: perfil.nome,
        email: perfil.email,
        telefone: perfil.telefone,
      });
      setMensagem('Perfil atualizado com sucesso!');
    } catch (err) {
      setErro(err instanceof Error ? err.message : 'Erro ao atualizar perfil');
    } finally {
      setLoadingPerfil(false);
    }
  };

  const handleSenhaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setMensagem('');

    if (senha.novaSenha !== senha.confirmar) {
      setErro('As senhas não coincidem');
      return;
    }

    setLoadingSenha(true);
    try {
      await usuariosService.alterarSenha(senha.senhaAtual, senha.novaSenha);
      setMensagem('Senha alterada com sucesso!');
      setSenha({ senhaAtual: '', novaSenha: '', confirmar: '' });
    } catch (err) {
      setErro(err instanceof Error ? err.message : 'Erro ao alterar senha');
    } finally {
      setLoadingSenha(false);
    }
  };

  return (
    <div style={{ maxWidth: 480, margin: '2rem auto', padding: '1rem' }}>
      <h1>Meu Perfil</h1>
      <p style={{ color: '#888' }}>Olá, {usuario?.nome}!</p>

      {mensagem && <p style={{ color: 'green' }}>{mensagem}</p>}
      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      {/* — Dados pessoais — */}
      <section style={{ marginBottom: '2rem' }}>
        <h2>Dados pessoais</h2>
        <form onSubmit={handlePerfilSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label>Nome</label>
            <input
              type="text"
              value={perfil.nome}
              onChange={(e) => setPerfil({ ...perfil, nome: e.target.value })}
              style={{ display: 'block', width: '100%', padding: '0.5rem' }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>E-mail</label>
            <input
              type="email"
              value={perfil.email}
              onChange={(e) => setPerfil({ ...perfil, email: e.target.value })}
              style={{ display: 'block', width: '100%', padding: '0.5rem' }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Telefone</label>
            <input
              type="text"
              placeholder="(11) 99999-9999"
              value={perfil.telefone}
              onChange={(e) => setPerfil({ ...perfil, telefone: e.target.value })}
              style={{ display: 'block', width: '100%', padding: '0.5rem' }}
            />
          </div>
          <button type="submit" disabled={loadingPerfil} style={{ padding: '0.6rem 1.5rem' }}>
            {loadingPerfil ? 'Salvando...' : 'Salvar alterações'}
          </button>
        </form>
      </section>

      {/* — Alterar senha — */}
      <section>
        <h2>Alterar senha</h2>
        <form onSubmit={handleSenhaSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label>Senha atual</label>
            <input
              type="password"
              value={senha.senhaAtual}
              onChange={(e) => setSenha({ ...senha, senhaAtual: e.target.value })}
              required
              minLength={6}
              style={{ display: 'block', width: '100%', padding: '0.5rem' }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Nova senha</label>
            <input
              type="password"
              value={senha.novaSenha}
              onChange={(e) => setSenha({ ...senha, novaSenha: e.target.value })}
              required
              minLength={6}
              style={{ display: 'block', width: '100%', padding: '0.5rem' }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Confirmar nova senha</label>
            <input
              type="password"
              value={senha.confirmar}
              onChange={(e) => setSenha({ ...senha, confirmar: e.target.value })}
              required
              style={{ display: 'block', width: '100%', padding: '0.5rem' }}
            />
          </div>
          <button type="submit" disabled={loadingSenha} style={{ padding: '0.6rem 1.5rem' }}>
            {loadingSenha ? 'Alterando...' : 'Alterar senha'}
          </button>
        </form>
      </section>
    </div>
  );
};