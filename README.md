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
- �️ **CRUD completo de categorias** com relacionamento seguro
- 🔍 **Busca avançada** com filtro por nome em tempo real
- 📄 **Paginação inteligente** com navegação completa
- 🎯 **Filtros por categoria** com seleção dinâmica
- �🎨 **Design system** com cores harmoniosas e animações suaves
- 📱 **Responsividade** para desktop e mobile
- 🔔 **Notificações** de sucesso e erro
- ⚡ **Performance otimizada** com TypeScript
- 🛡️ **Validações** tanto no frontend quanto no backend
- 🌐 **API RESTful** com NestJS
- 🔗 **Relacionamentos seguros** com SET NULL ao deletar categorias

### Recursos da Interface

#### 🎛️ **Busca e Filtros**
- Barra de busca com debounce automático (500ms)
- Filtro por categoria com select dinâmico
- Combinação de filtros (busca + categoria)
- Limpeza rápida de filtros

#### 📄 **Paginação Avançada**
- Navegação intuitiva (Anterior/Próxima)
- Números de página clicáveis
- Indicador de itens exibidos (X-Y de Z)
- Paginação responsiva para mobile

#### 🎨 **Interface Moderna**
- Cards de produtos com hover effects
- Formulários modais para criar/editar produtos e categorias
- Confirmação de exclusão com modal
- Estados de loading elegantes
- Tratamento de erros com notificações toast
- Feedback visual em tempo real
- Exibição de categoria nos produtos

#### 🔗 **Relacionamentos**
- Seleção de categoria no formulário de produtos
- Visualização da categoria na listagem
- Produtos preservados quando categoria é deletada (SET NULL)

## Contribuição

Sinta-se à vontade para abrir issues ou pull requests!
