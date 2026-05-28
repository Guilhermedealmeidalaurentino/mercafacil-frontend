import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usuariosService } from '../../api/services';
import { authStyles as s } from '../../styles/auth';
import { PasswordInput } from '../../components/PasswordInput';

export const CadastroComerciantePage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: '', email: '', senha: '', confirmarSenha: '',
    cpf: '', telefone: '', cnpj: '', cep: '', nome_mercado: '',
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

  const handleCNPJ = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value
      .replace(/\D/g, '').slice(0, 14)
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2');
    setForm({ ...form, cnpj: valor });
  };

  const handleCEP = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value
      .replace(/\D/g, '').slice(0, 8)
      .replace(/^(\d{5})(\d)/, '$1-$2');
    setForm({ ...form, cep: valor });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');

    if (form.senha !== form.confirmarSenha) { setErro('As senhas não coincidem'); return; }
    if (form.cnpj.replace(/\D/g, '').length !== 14) { setErro('CNPJ inválido'); return; }
    if (form.cep.replace(/\D/g, '').length !== 8) { setErro('CEP inválido'); return; }
    if (form.cpf.replace(/\D/g, '').length !== 11) { setErro('CPF inválido'); return; }
    if (!aceitouTermos) { setErro('Você precisa aceitar os termos de uso'); return; }

    setLoading(true);
    try {
      await usuariosService.cadastrarComerciante({
        nome: form.nome,
        email: form.email,
        senha: form.senha,
        cpf: form.cpf.replace(/\D/g, ''),
        telefone: form.telefone || undefined,
        cnpj: form.cnpj.replace(/\D/g, ''),
        cep: form.cep.replace(/\D/g, ''),
        nome_mercado: form.nome_mercado,
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
      <div style={{ ...s.card, maxWidth: '480px' }}>

        <div style={s.logo}>
          <div style={s.logoIcon}>🛒</div>
          <span style={s.logoText}>MercaFácil</span>
        </div>
        <p style={s.title}>Cadastro de Comerciante</p>
        <p style={s.subtitle}>Crie sua conta e seu mercado de uma vez</p>

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

          <label style={s.label}>Telefone (opcional)</label>
          <input name="telefone" type="text" placeholder="(11) 99999-9999"
            value={form.telefone} onChange={handleChange} style={s.input} />

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
          <label style={s.label}>Nome do mercado</label>
          <input name="nome_mercado" type="text" placeholder="Ex: Mercadinho do João"
            value={form.nome_mercado} onChange={handleChange} required minLength={3} style={s.input} />

          <label style={s.label}>CNPJ</label>
          <input name="cnpj" type="text" placeholder="00.000.000/0000-00"
            value={form.cnpj} onChange={handleCNPJ} required style={s.input} />

          <label style={s.label}>CEP</label>
          <input name="cep" type="text" placeholder="00000-000"
            value={form.cep} onChange={handleCEP} required style={s.input} />
          <small style={{ color: '#888', display: 'block', marginTop: '-0.75rem', marginBottom: '1.25rem' }}>
            O endereço será preenchido automaticamente pelo CEP.
          </small>

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
            {loading ? 'Cadastrando...' : 'Criar conta e mercado'}
          </button>
        </form>

        <p style={s.footer}>
          Já possui uma conta?{' '}
          <Link to="/login" style={s.link}>Entrar</Link>
        </p>
        <p style={{ ...s.footer, marginTop: '0.5rem' }}>
          É cliente?{' '}
          <Link to="/cadastrar/cliente" style={s.link}>Cadastre-se aqui</Link>
        </p>
      </div>

      <p style={s.copyright}>© 2026 MercaFácil - Todos os direitos reservados</p>
    </div>
  );
};