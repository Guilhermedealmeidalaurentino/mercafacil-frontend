import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usuariosService } from '../../api/services';
import { authStyles as s } from '../../styles/auth';
import { PasswordInput } from '../../components/PasswordInput';


export const CadastroClientePage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: '', email: '', senha: '', confirmarSenha: '', cpf: '',
  });
  const [aceitouTermos, setAceitouTermos] = useState(false);
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCPF = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value
      .replace(/\D/g, '').slice(0, 11)
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1-$2');
    setForm({ ...form, cpf: valor });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');

    if (form.senha !== form.confirmarSenha) {
      setErro('As senhas não coincidem');
      return;
    }

    const cpfLimpo = form.cpf.replace(/\D/g, '');
    if (cpfLimpo.length !== 11) {
      setErro('CPF inválido — deve ter 11 dígitos');
      return;
    }

    if (!aceitouTermos) {
      setErro('Você precisa aceitar os termos de uso');
      return;
    }

    setLoading(true);
    try {
      await usuariosService.cadastrarCliente({
        nome: form.nome,
        email: form.email,
        senha: form.senha,
        cpf: cpfLimpo,
      });
      navigate('/login');
    } catch (err) {
      setErro(err instanceof Error ? err.message : 'Erro ao cadastrar');
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
        <p style={s.title}>Criar conta</p>
        <p style={s.subtitle}>Cadastre-se para começar</p>

        <form onSubmit={handleSubmit}>
          <label style={s.label}>Nome completo</label>
          <input name="nome" type="text" placeholder="Seu nome completo"
            value={form.nome} onChange={handleChange} required minLength={3} style={s.input} />

          <label style={s.label}>E-mail</label>
          <input name="email" type="email" placeholder="seu@email.com"
            value={form.email} onChange={handleChange} required style={s.input} />

          <label style={s.label}>CPF</label>
          <input name="cpf" type="text" placeholder="000.000.000-00"
            value={form.cpf} onChange={handleCPF} required style={s.input} />

          <label style={s.label}>Senha</label>
          <PasswordInput
            name="senha"
            value={form.senha}
            onChange={handleChange}
            required
            minLength={6}
          />


          <label style={s.label}>Confirmar senha</label>
          <PasswordInput
            name="confirmarSenha"
            value={form.confirmarSenha}
            onChange={handleChange}
            required
          />

          <div style={s.checkboxRow}>
            <input
              type="checkbox"
              checked={aceitouTermos}
              onChange={(e) => setAceitouTermos(e.target.checked)}
              style={{ marginTop: '2px', accentColor: '#2ecc8f' }}
            />
            <span>
              Aceito os <a href="#" style={s.link}>termos de uso</a> e{' '}
              <a href="#" style={s.link}>política de privacidade</a>
            </span>
          </div>

          {erro && <p style={s.error}>{erro}</p>}

          <button
            type="submit"
            disabled={loading}
            style={{ ...s.button, ...(loading ? s.buttonDisabled : {}) }}
          >
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>

        <p style={s.footer}>
          Já possui uma conta?{' '}
          <Link to="/login" style={s.link}>Entrar</Link>
        </p>
        <p style={{ ...s.footer, marginTop: '0.5rem' }}>
          É comerciante?{' '}
          <Link to="/cadastrar/comerciante" style={s.link}>Cadastre seu mercado</Link>
        </p>
      </div>

      <p style={s.copyright}>© 2026 MercaFácil - Todos os direitos reservados</p>
    </div>
  );
};