# MercaFácil — Frontend React

## Stack
- React + TypeScript
- React Router v6
- Vite

## Instalação

```bash
npm create vite@latest mercafacil-frontend -- --template react-ts
cd mercafacil-frontend
npm install react-router-dom
```

Substitua a pasta `src/` pelo conteúdo deste projeto.

## Variáveis de ambiente

Crie um `.env` na raiz:

```
VITE_API_URL=http://localhost:3333
```

## Estrutura

```
src/
├── api/
│   ├── api.ts          # Cliente HTTP base (fetch + auth header)
│   └── services.ts     # Funções organizadas por domínio
├── contexts/
│   └── AuthContext.tsx # Estado global de autenticação
├── routes/
│   └── PrivateRoute.tsx # Proteção de rotas por role
├── types/
│   └── index.ts        # Interfaces espelhando o backend
├── pages/
│   ├── auth/
│   │   ├── LoginPage.tsx              ✅ implementado
│   │   ├── CadastroClientePage.tsx    🔲 placeholder
│   │   └── CadastroComerciantePage.tsx 🔲 placeholder
│   ├── cliente/
│   │   ├── MinhasReservasPage.tsx     ✅ implementado
│   │   ├── NovaReservaPage.tsx        🔲 placeholder
│   │   └── DetalheReservaClientePage.tsx 🔲 placeholder
│   ├── comerciante/
│   │   ├── ReservasMercadoPage.tsx    ✅ implementado
│   │   ├── DetalheReservaMercadoPage.tsx 🔲 placeholder
│   │   └── ProdutosPage.tsx           🔲 placeholder
│   └── admin/
│       └── UsuariosPage.tsx           🔲 placeholder
└── App.tsx             # Roteamento principal
```


