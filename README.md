# Sistema CRUD - Produtos e Categorias# CRUD_NestJSReactJS



> Sistema completo de gerenciamento de produtos e categorias desenvolvido com **NestJS** (backend) e **React** (frontend).Este projeto é um exemplo de aplicação CRUD utilizando **NestJS** no backend e **ReactJS** no frontend.



## 📋 Índice## Tecnologias Utilizadas

- [Visão Geral](#visão-geral)

- [Tecnologias](#tecnologias)- [NestJS](https://nestjs.com/) — Backend (Node.js, TypeScript)

- [Funcionalidades](#funcionalidades)- [ReactJS](https://react.dev/) — Frontend (TypeScript)

- [Pré-requisitos](#pré-requisitos)- [Vite](https://vitejs.dev/) — Build tool e dev server

- [Instalação e Configuração](#instalação-e-configuração)- [Axios](https://axios-http.com/) — Cliente HTTP para comunicação com API

- [Como Executar](#como-executar)- [Lucide React](https://lucide.dev/) — Ícones modernos

- [Arquitetura do Projeto](#arquitetura-do-projeto)- [TypeORM](https://typeorm.io/) — ORM para banco de dados

- [API Endpoints](#api-endpoints)- [PostgreSQL](https://www.postgresql.org/) — Banco de dados relacional

- [Estrutura dos Dados](#estrutura-dos-dados)

- [Funcionalidades Especiais](#funcionalidades-especiais)## Como Executar

- [Desenvolvimento](#desenvolvimento)

### Backend (NestJS)

## 🎯 Visão Geral

```bash

Este projeto oferece uma solução completa para gerenciamento de produtos e suas categorias, incluindo operações CRUD completas, interface moderna e responsiva, e recursos avançados como paginação inteligente e pesquisa em tempo real.cd back_nest

npm install

### ✨ Destaquesnpm run start

- **Interface Moderna**: Design responsivo e intuitivo```

- **Paginação Inteligente**: Exibe controles apenas quando necessário (>20 itens)

- **Pesquisa em Tempo Real**: Busca instantânea por produtos e categorias### Frontend (ReactJS)

- **Validação Robusta**: Validação tanto no frontend quanto no backend

- **Confirmações de Ação**: Modais de confirmação para operações críticas```bash

- **Notificações Toast**: Feedback visual para todas as açõescd front_react

- **Gestão de Estado**: Atualizações automáticas da interfacenpm install

npm run dev

## 🛠️ Tecnologias```



### Backend (NestJS)### Acessando a Aplicação

- **NestJS** - Framework Node.js robusto e escalável

- **TypeORM** - ORM para TypeScript e JavaScript- **Frontend**: http://localhost:5173

- **PostgreSQL** - Banco de dados relacional- **Backend**: http://localhost:3000

- **Class Validator** - Validação de dados- **API Swagger**: http://localhost:3000/api (se configurado)

- **Swagger/OpenAPI** - Documentação automática da API

## Funcionalidades

### Frontend (React)

- **React 18** - Biblioteca para interfaces de usuário- ✨ **Interface moderna e elegante** com design responsivo

- **TypeScript** - Superset tipado do JavaScript- 📦 **CRUD completo de produtos** (Criar, Ler, Atualizar, Deletar)

- **Vite** - Build tool moderno e rápido- �️ **CRUD completo de categorias** com relacionamento seguro

- **CSS3** - Estilização moderna com CSS Grid e Flexbox- 🔍 **Busca avançada** com filtro por nome em tempo real

- **ESLint** - Linting para qualidade de código- 📄 **Paginação inteligente** com navegação completa

- 🎯 **Filtros por categoria** com seleção dinâmica

## 🚀 Funcionalidades- �🎨 **Design system** com cores harmoniosas e animações suaves

- 📱 **Responsividade** para desktop e mobile

### Gestão de Produtos- 🔔 **Notificações** de sucesso e erro

- ✅ **Criar produtos** com nome, descrição, preço e categoria- ⚡ **Performance otimizada** com TypeScript

- ✅ **Listar produtos** com paginação inteligente e pesquisa- 🛡️ **Validações** tanto no frontend quanto no backend

- ✅ **Editar produtos** com atualização em tempo real- 🌐 **API RESTful** com NestJS

- ✅ **Excluir produtos** com confirmação de segurança- 🔗 **Relacionamentos seguros** com SET NULL ao deletar categorias

- ✅ **Associar categorias** com relacionamento automático

### Recursos da Interface

### Gestão de Categorias

- ✅ **Criar categorias** com nome e descrição#### 🎛️ **Busca e Filtros**

- ✅ **Listar categorias** organizadas e pesquisáveis- Barra de busca com debounce automático (500ms)

- ✅ **Editar categorias** com validação de integridade- Filtro por categoria com select dinâmico

- ✅ **Excluir categorias** com verificação de dependências- Combinação de filtros (busca + categoria)

- Limpeza rápida de filtros

### Recursos Especiais

- 🔍 **Pesquisa Instantânea**: Busca em tempo real sem recarregar a página#### 📄 **Paginação Avançada**

- 📄 **Paginação Inteligente**: Controles aparecem automaticamente quando há >20 itens- Navegação intuitiva (Anterior/Próxima)

- 📱 **Design Responsivo**: Interface adaptável para desktop e mobile- Números de página clicáveis

- 🔔 **Notificações**: Toast messages para feedback de ações- Indicador de itens exibidos (X-Y de Z)

- ⚡ **Performance Otimizada**: Carregamento rápido e atualizações eficientes- Paginação responsiva para mobile



## 📋 Pré-requisitos#### 🎨 **Interface Moderna**

- Cards de produtos com hover effects

Certifique-se de ter instalado:- Formulários modais para criar/editar produtos e categorias

- **Node.js** (versão 18 ou superior)- Confirmação de exclusão com modal

- **npm** ou **yarn**- Estados de loading elegantes

- **PostgreSQL** (versão 12 ou superior)- Tratamento de erros com notificações toast

- Feedback visual em tempo real

## 🔧 Instalação e Configuração- Exibição de categoria nos produtos



### 1. Clone o Repositório#### 🔗 **Relacionamentos**

```bash- Seleção de categoria no formulário de produtos

git clone <url-do-repositorio>- Visualização da categoria na listagem

cd CRUD_NestJSReactJS- Produtos preservados quando categoria é deletada (SET NULL)

```

## Contribuição

### 2. Configuração do Backend

Sinta-se à vontade para abrir issues ou pull requests!

```bash
# Navegar para o diretório do backend
cd back_nest

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
```

**Configure o arquivo `.env`:**
```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha
DB_DATABASE=produtos_db

# Application
PORT=3000
```

**Criar o banco de dados:**
```sql
CREATE DATABASE produtos_db;
```

### 3. Configuração do Frontend

```bash
# Navegar para o diretório do frontend
cd ../front_react

# Instalar dependências
npm install
```

## ▶️ Como Executar

### 1. Iniciar o Backend
```bash
cd back_nest
npm run start:dev
```
> Backend será executado em: http://localhost:3000

### 2. Iniciar o Frontend
```bash
cd front_react
npm run dev
```
> Frontend será executado em: http://localhost:5174

### 3. Acesso à Documentação da API
- **Swagger UI**: http://localhost:3000/api
- **API JSON**: http://localhost:3000/api-json

## 🏗️ Arquitetura do Projeto

### Estrutura do Backend (`back_nest/`)
```
src/
├── main.ts                    # Entry point da aplicação
├── app.module.ts              # Módulo principal
├── app.controller.ts          # Controller principal
├── app.service.ts             # Service principal
└── produtos/                  # Módulo de produtos
    ├── produtos.controller.ts # Endpoints REST
    ├── produtos.service.ts    # Lógica de negócio
    ├── produtos.module.ts     # Configuração do módulo
    ├── dto/                   # Data Transfer Objects
    │   ├── create-produto.dto.ts
    │   └── update-produto.dto.ts
    └── entities/              # Entidades do banco
        └── produto.entity.ts
```

### Estrutura do Frontend (`front_react/`)
```
src/
├── App.tsx                    # Componente principal
├── main.tsx                   # Entry point
├── components/                # Componentes React
│   ├── common/               # Componentes reutilizáveis
│   │   ├── CategoriaList.tsx # Lista de categorias
│   │   ├── ProdutoList.tsx   # Lista de produtos
│   │   └── index.ts          # Exports centralizados
│   ├── forms/                # Formulários
│   │   ├── CategoriaForm.tsx # Formulário de categoria
│   │   ├── ProdutoForm.tsx   # Formulário de produto
│   │   └── index.ts          # Exports centralizados
│   ├── ui/                   # Componentes de interface
│   │   ├── ConfirmDialog.tsx # Modal de confirmação
│   │   ├── SearchBar.tsx     # Barra de pesquisa
│   │   ├── Toast.tsx         # Notificações
│   │   ├── SmartPagination.tsx # Paginação inteligente
│   │   └── index.ts          # Exports centralizados
│   └── index.ts              # Export geral
├── services/                 # Serviços de API
│   ├── categoriaService.ts   # API de categorias
│   ├── produtoService.ts     # API de produtos
│   └── index.ts              # Exports centralizados
├── styles/                   # Arquivos de estilo
│   ├── App.css              # Estilos principais
│   └── index.css            # Estilos globais
└── types/                    # Definições TypeScript
    └── index.ts              # Interfaces e tipos
```

## 🔗 API Endpoints

### Produtos
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/produtos` | Lista produtos com paginação |
| `GET` | `/produtos/:id` | Busca produto por ID |
| `POST` | `/produtos` | Cria novo produto |
| `PUT` | `/produtos/:id` | Atualiza produto existente |
| `DELETE` | `/produtos/:id` | Remove produto |

### Categorias
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/categorias` | Lista todas as categorias |
| `GET` | `/categorias/:id` | Busca categoria por ID |
| `POST` | `/categorias` | Cria nova categoria |
| `PUT` | `/categorias/:id` | Atualiza categoria existente |
| `DELETE` | `/categorias/:id` | Remove categoria |

### Parâmetros de Consulta (Query Params)

**Para Produtos:**
- `page`: Número da página (padrão: 1)
- `limit`: Itens por página (máximo: 12)
- `search`: Busca por nome ou descrição
- `categoriaId`: Filtro por categoria

## 📊 Estrutura dos Dados

### Produto
```typescript
interface Produto {
  id: number;
  nome: string;
  descricao?: string;
  preco: number;
  categoriaId?: number;
  categoria?: Categoria;
  createdAt: Date;
  updatedAt: Date;
}
```

### Categoria
```typescript
interface Categoria {
  id: number;
  nome: string;
  descricao?: string;
  produtos?: Produto[];
  createdAt: Date;
  updatedAt: Date;
}
```

## 🎯 Funcionalidades Especiais

### 📄 Paginação Inteligente
- **Detecção Automática**: Controles de paginação aparecem apenas quando há mais de 20 itens
- **Limite por Página**: Máximo de 12 itens por página para performance otimizada
- **Navegação Suave**: Botões Previous/Next com feedback visual
- **Indicador de Página**: Mostra página atual e total

### 🔍 Sistema de Pesquisa
- **Tempo Real**: Busca instantânea conforme o usuário digita
- **Múltiplos Campos**: Pesquisa em nome e descrição
- **Limpar Pesquisa**: Botão para resetar filtros rapidamente
- **Indicador Visual**: Mostra resultados encontrados

### 🎨 Interface Responsiva
- **Grid Adaptativo**: Layout que se ajusta ao tamanho da tela
- **Cards Modernos**: Design limpo com shadow e hover effects
- **Cores Consistentes**: Paleta de cores harmoniosa e profissional
- **Tipografia**: Fontes legíveis e hierarquia visual clara

### ⚡ Performance
- **Lazy Loading**: Carregamento sob demanda
- **Debounce Search**: Evita requisições excessivas na pesquisa
- **State Management**: Gerenciamento eficiente do estado da aplicação
- **Error Boundaries**: Tratamento robusto de erros

## 💻 Desenvolvimento

### Comandos Úteis

**Backend:**
```bash
# Desenvolvimento
npm run start:dev

# Build
npm run build

# Testes
npm run test

# Linting
npm run lint
```

**Frontend:**
```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Preview da build
npm run preview

# Linting
npm run lint
```

### Padrões de Código

**Imports Organizados:**
```typescript
// ✅ Bom - usando index files
import { ProdutoList, ProdutoForm } from './components';
import { produtoService } from './services';

// ❌ Evitar - imports diretos
import ProdutoList from './components/common/ProdutoList';
```

**Naming Conventions:**
- **Componentes**: PascalCase (`ProdutoForm.tsx`)
- **Arquivos**: camelCase (`produtoService.ts`)
- **Variáveis**: camelCase (`produtoData`)
- **Constantes**: UPPER_CASE (`API_BASE_URL`)

### Estrutura de Commits
```bash
git commit -m "feat: adicionar funcionalidade de pesquisa"
git commit -m "fix: corrigir erro de validação"
git commit -m "docs: atualizar documentação"
git commit -m "style: ajustar espaçamento dos cards"
```

# CRUD_NestJSReactJS — Resumo rápido

Projeto exemplo: API e painel para gerenciar produtos e categorias.

Principais tecnologias
- Backend: NestJS + TypeORM + PostgreSQL
- Frontend: React + TypeScript + Vite

Pré-requisitos
- Node.js >= 18
- npm ou yarn
- PostgreSQL rodando

Instalação rápida

1) Backend
```bash
cd back_nest
npm install
cp .env.example .env   # ajustar variáveis (DB_HOST, DB_USER, DB_PASS, DB_NAME, PORT)
```

2) Frontend
```bash
cd front_react
npm install
```

Executando em desenvolvimento

```bash
# Em um terminal: backend
cd back_nest
npm run start:dev

# Em outro: frontend
cd front_react
npm run dev
```

Padrões rápidos
- Backend: http://localhost:3000 (Swagger em /api)
- Frontend: http://localhost:5174
- Paginação: limite recomendado 12 itens por página; controles aparecem quando necessário

Estrutura mínima do repositório

```
back_nest/    # NestJS (src/*)
front_react/  # React + Vite (src/*)
README.md     # este arquivo
```

Endpoints principais
- GET /produtos
- GET /produtos/:id
- POST /produtos
- PUT /produtos/:id
- DELETE /produtos/:id

+- GET /categorias
- GET /categorias/:id
- POST /categorias
- PUT /categorias/:id
- DELETE /categorias/:id

Contribuição
- Abra issues ou PRs. Siga as convenções de commits e crie branches por feature.

Licença
- Use conforme sua necessidade (adicione LICENSE se desejar).

---

Arquivo reduzido: instruções essenciais e links rápidos. Para documentação completa, veja os arquivos do projeto.