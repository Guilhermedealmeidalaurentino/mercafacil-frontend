import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usuariosService } from '../../api/services';

export const CadastroComerciantePage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    cpf: '',
    telefone: '',
    cnpj: '',
    cep: '',
    nome_mercado: '',
  });
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCPF = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value
      .replace(/\D/g, '')
      .slice(0, 11)
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1-$2');
    setForm({ ...form, cpf: valor });
  };

  const handleCNPJ = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value
      .replace(/\D/g, '')
      .slice(0, 14)
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2');
    setForm({ ...form, cnpj: valor });
  };

  const handleCEP = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value
      .replace(/\D/g, '')
      .slice(0, 8)
      .replace(/^(\d{5})(\d)/, '$1-$2');
    setForm({ ...form, cep: valor });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');

    if (form.senha !== form.confirmarSenha) {
      setErro('As senhas não coincidem');
      return;
    }

    const cnpjLimpo = form.cnpj.replace(/\D/g, '');
    if (cnpjLimpo.length !== 14) {
      setErro('CNPJ inválido — deve ter 14 dígitos');
      return;
    }

    const cepLimpo = form.cep.replace(/\D/g, '');
    if (cepLimpo.length !== 8) {
      setErro('CEP inválido — deve ter 8 dígitos');
      return;
    }

    const cpfLimpo = form.cpf.replace(/\D/g, '');
    if (cpfLimpo.length !== 11) {
      setErro('CPF inválido — deve ter 11 dígitos');
      return;
    }

    setLoading(true);
    try {
      await usuariosService.cadastrarComerciante({
        nome: form.nome,
        email: form.email,
        senha: form.senha,
        cpf: cpfLimpo,
        telefone: form.telefone || undefined,
        cnpj: cnpjLimpo,
        cep: cepLimpo,
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
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: '2rem' }}>
      <h1>Cadastro de Comerciante</h1>
      <form onSubmit={handleSubmit}>

        <div style={{ marginBottom: '1rem' }}>
          <label>Nome completo</label>
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
            placeholder="seu@gmail.com"
            value={form.email}
            onChange={handleChange}
            required
            style={{ display: 'block', width: '100%', padding: '0.5rem' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>CPF</label>
          <input
            name="cpf"
            type="text"
            placeholder="000.000.000-00"
            value={form.cpf}
            onChange={handleCPF}
            required
            style={{ display: 'block', width: '100%', padding: '0.5rem' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Telefone (opcional)</label>
          <input
            name="telefone"
            type="text"
            placeholder="(11) 99999-9999"
            value={form.telefone}
            onChange={handleChange}
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

        <div style={{ marginBottom: '1rem' }}>
          <label>Nome do mercado</label>
          <input
            name="nome_mercado"
            type="text"
            placeholder="Ex: Mercadinho do João"
            value={form.nome_mercado}
            onChange={handleChange}
            required
            minLength={3}
            style={{ display: 'block', width: '100%', padding: '0.5rem' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>CNPJ</label>
          <input
            name="cnpj"
            type="text"
            placeholder="00.000.000/0000-00"
            value={form.cnpj}
            onChange={handleCNPJ}
            required
            style={{ display: 'block', width: '100%', padding: '0.5rem' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>CEP</label>
          <input
            name="cep"
            type="text"
            placeholder="00000-000"
            value={form.cep}
            onChange={handleCEP}
            required
            style={{ display: 'block', width: '100%', padding: '0.5rem' }}
          />
          <small style={{ color: '#888' }}>
            O endereço será preenchido automaticamente pelo CEP.
          </small>
        </div>

        {erro && <p style={{ color: 'red' }}>{erro}</p>}

        <button type="submit" disabled={loading} style={{ width: '100%', padding: '0.75rem' }}>
          {loading ? 'Cadastrando...' : 'Criar conta e mercado'}
        </button>
      </form>

      <p style={{ marginTop: '1rem', textAlign: 'center' }}>
        Já tem conta? <Link to="/login">Entrar</Link>
      </p>
      <p style={{ textAlign: 'center' }}>
        É cliente? <Link to="/cadastrar/cliente">Cadastre-se como cliente</Link>
      </p>
    </div>
  );
};