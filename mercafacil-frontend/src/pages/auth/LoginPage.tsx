import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { authStyles as s } from '../../styles/auth';
import { PasswordInput } from '../../components/PasswordInput';

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', senha: '' });
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setLoading(true);
    try {
      await login(form.email, form.senha);
      navigate('/');
    } catch (err) {
      setErro(err instanceof Error ? err.message : 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={s.page}>
      <div style={s.card}>

        <div style={s.logo}>
          <div style={s.logoIcon}>🛒</div>
          <span style={s.logoText}>MercaFácil</span>
        </div>
        <p style={s.subtitle}>Gestão simplificada para seu mercado</p>

        <form onSubmit={handleSubmit}>
          <label style={s.label}>E-mail</label>
          <input
            type="email"
            placeholder="seu@email.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            style={s.input}
          />

          <label style={s.label}>Senha</label>
          <PasswordInput
            name="senha"
            value={form.senha}
            onChange={(e) => setForm({ ...form, senha: e.target.value })}
            required
          />

          <a href="#" style={s.forgotPassword}>Esqueci minha senha</a>

          {erro && <p style={s.error}>{erro}</p>}

          <button
            type="submit"
            disabled={loading}
            style={{ ...s.button, ...(loading ? s.buttonDisabled : {}) }}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p style={s.footer}>
          Não tem uma conta?{' '}
          <Link to="/cadastrar/cliente" style={s.link}>Criar conta</Link>
        </p>
      </div>

      <p style={s.copyright}>© 2026 MercaFácil - Todos os direitos reservados</p>
    </div>
  );
};