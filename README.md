# CRUD_NestJSReactJS

Este projeto é um exemplo de aplicação CRUD utilizando **NestJS** no backend e **ReactJS** no frontend.

## Tecnologias Utilizadas

- [NestJS](https://nestjs.com/) — Backend (Node.js, TypeScript)
- [ReactJS](https://react.dev/) — Frontend (TypeScript)
- [Vite](https://vitejs.dev/) — Build tool e dev server
- [Axios](https://axios-http.com/) — Cliente HTTP para comunicação com API
- [Lucide React](https://lucide.dev/) — Ícones modernos
- [TypeORM](https://typeorm.io/) — ORM para banco de dados
- [PostgreSQL](https://www.postgresql.org/) — Banco de dados relacional

## Como Executar

### Backend (NestJS)

```bash
cd back_nest
npm install
npm run start
```

### Frontend (ReactJS)

```bash
cd front_react
npm install
npm run dev
```

### Acessando a Aplicação

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3000
- **API Swagger**: http://localhost:3000/api (se configurado)

## Funcionalidades

- ✨ **Interface moderna e elegante** com design responsivo
- 📦 **CRUD completo de produtos** (Criar, Ler, Atualizar, Deletar)
- 🎨 **Design system** com cores harmoniosas e animações suaves
- 📱 **Responsividade** para desktop e mobile
- 🔔 **Notificações** de sucesso e erro
- ⚡ **Performance otimizada** com TypeScript
- 🛡️ **Validações** tanto no frontend quanto no backend
- 🌐 **API RESTful** com NestJS

### Recursos da Interface

- Cards de produtos com hover effects
- Formulários modais para criar/editar
- Confirmação de exclusão
- Estados de loading
- Tratamento de erros
- Feedback visual em tempo real

## Estrutura do Projeto

```
CRUD_NestJSReactJS/
├── back_nest/          # Backend NestJS
│   ├── src/
│   │   ├── produtos/   # Módulo de produtos
│   │   └── main.ts     # Entrada da aplicação
│   └── package.json
└── front_react/        # Frontend React
    ├── src/
    │   ├── components/ # Componentes React
    │   ├── services/   # Serviços de API
    │   ├── types/      # Tipos TypeScript
    │   └── App.tsx     # Componente principal
    └── package.json
```

## Contribuição

Sinta-se à vontade para abrir issues ou pull requests!
