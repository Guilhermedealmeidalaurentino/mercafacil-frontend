import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usuariosService} from '../../api/services';

export const CadastroClientePage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nome: '', email: '', senha: '', confirmarSenha: '' });
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');

    if (form.senha !== form.confirmarSenha) {
      setErro('As senhas não coincidem');
      return;
    }

    setLoading(true);
    try {
      await usuariosService.cadastrarCliente({
        nome: form.nome,
        email: form.email,
        senha: form.senha,
      });
      navigate('/login');
    } catch (err) {
      setErro(err instanceof Error ? err.message : 'Erro ao cadastrar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: '2rem' }}>
      <h1>Cadastro de Cliente</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Nome</label>
          <input
            name="nome"
            type="text"
            placeholder="Seu nome completo"
            value={form.nome}
            onChange={handleChange}
            required
            minLength={3}
            style={{ display: 'block', width: '100%', padding: '0.5rem' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>E-mail</label>
          <input
            name="email"
            type="email"
            placeholder="seu@email.com"
            value={form.email}
            onChange={handleChange}
            required
            style={{ display: 'block', width: '100%', padding: '0.5rem' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Senha</label>
          <input
            name="senha"
            type="password"
            placeholder="Mínimo 6 caracteres"
            value={form.senha}
            onChange={handleChange}
            required
            minLength={6}
            style={{ display: 'block', width: '100%', padding: '0.5rem' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Confirmar Senha</label>
          <input
            name="confirmarSenha"
            type="password"
            placeholder="Repita a senha"
            value={form.confirmarSenha}
            onChange={handleChange}
            required
            style={{ display: 'block', width: '100%', padding: '0.5rem' }}
          />
        </div>

        {erro && <p style={{ color: 'red' }}>{erro}</p>}

        <button type="submit" disabled={loading} style={{ width: '100%', padding: '0.75rem' }}>
          {loading ? 'Cadastrando...' : 'Criar conta'}
        </button>
      </form>

      <p style={{ marginTop: '1rem', textAlign: 'center' }}>
        Já tem conta? <Link to="/login">Entrar</Link>
      </p>
      <p style={{ textAlign: 'center' }}>
        É comerciante? <Link to="/cadastrar/comerciante">Cadastre seu mercado</Link>
      </p>
    </div>
  );
};