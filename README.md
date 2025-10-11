# 🛍️ CRUD de Produtos e Categorias

Sistema completo de gerenciamento de produtos e categorias com interface moderna e elegante, desenvolvido com **NestJS** e **ReactJS**.

## 🚀 Tecnologias Utilizadas

### Backend
- [NestJS](https://nestjs.com/) — Framework Node.js com TypeScript
- [TypeORM](https://typeorm.io/) — ORM para banco de dados relacional
- [PostgreSQL](https://www.postgresql.org/) — Banco de dados principal
- [Class Validator](https://github.com/typestack/class-validator) — Validação de dados

### Frontend  
- [ReactJS](https://react.dev/) — Biblioteca para interfaces de usuário
- [TypeScript](https://www.typescriptlang.org/) — Superset tipado do JavaScript
- [Vite](https://vitejs.dev/) — Build tool e servidor de desenvolvimento
- [Axios](https://axios-http.com/) — Cliente HTTP para APIs
- [Lucide React](https://lucide.dev/) — Biblioteca de ícones moderna

## 🏗️ Estrutura do Projeto

```
CRUD_NestJSReactJS/
├── back_nest/          # Backend NestJS
│   ├── src/
│   │   ├── produtos/   # Módulo de produtos
│   │   │   ├── dto/
│   │   │   ├── entities/
│   │   │   └── ...
│   │   └── ...
│   └── ...
├── front_react/        # Frontend React
│   ├── src/
│   │   ├── components/ # Componentes reutilizáveis
│   │   ├── services/   # Serviços de API
│   │   ├── types/      # Tipos TypeScript
│   │   └── ...
│   └── ...
└── README.md
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js (v18+)
- PostgreSQL
- npm ou yarn

### 1. Configuração do Backend

```bash
cd back_nest
npm install
# Configure o banco PostgreSQL no app.module.ts
npm run start:dev
```

### 2. Configuração do Frontend

```bash
cd front_react
npm install
npm run dev
```

### 3. Acessando a Aplicação

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **Swagger Docs**: http://localhost:3000/api

## ✨ Funcionalidades Principais

### 📦 Gerenciamento de Produtos
- ✅ **CRUD Completo**: Criar, visualizar, editar e excluir produtos
- 💰 **Formatação de Preços**: Valores em Real (R$) com formatação automática
- 🏷️ **Categorização**: Vinculação de produtos a categorias
- 📝 **Campos Detalhados**: Nome, descrição, preço e categoria

### 🏷️ Gerenciamento de Categorias  
- ✅ **CRUD Independente**: Sistema completo para categorias
- 🔗 **Relacionamento Seguro**: SET NULL ao deletar (produtos preservados)
- 📋 **Listagem Organizada**: Interface dedicada para categorias
- 🔄 **Atualização Automática**: Sincronização em tempo real entre abas

### 🔍 Busca e Filtros Avançados
- 🕐 **Debounce Inteligente**: Busca otimizada com delay de 500ms
- 🎯 **Filtro por Categoria**: Seleção dinâmica de categorias
- 🔗 **Filtros Combinados**: Busca + categoria simultaneamente
- 🧹 **Limpeza Rápida**: Reset de filtros com um clique

### 📄 Paginação Profissional
- 🔢 **Navegação Completa**: Botões anterior/próxima + números
- 📊 **Indicadores Visuais**: "X-Y de Z produtos"
- 📱 **Design Responsivo**: Adaptação para mobile
- ⚡ **Carregamento Otimizado**: Apenas dados necessários

### 🎨 Interface Moderna
- 🌈 **Design System**: Cores harmoniosas e consistentes  
- ✨ **Animações Suaves**: Hover effects e transições
- 📱 **Responsividade Total**: Desktop, tablet e mobile
- 🔔 **Feedback Visual**: Toasts, loading states e confirmações
- 🎭 **Estados Visuais**: Empty states, loading e erro

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

## 🛠️ Arquitetura Técnica

### Backend (NestJS)
```typescript
// Estrutura modular com separação de responsabilidades
produtos/
├── dto/                    # Data Transfer Objects
├── entities/              # Entidades TypeORM  
├── produtos.controller.ts # Endpoints REST
├── produtos.service.ts    # Lógica de negócio
└── produtos.module.ts     # Configuração do módulo
```

**Características:**
- 🏗️ **Arquitetura Modular**: Separação clara de responsabilidades
- 🔒 **Validação Robusta**: DTOs com class-validator
- 🔗 **Relacionamentos**: TypeORM com constraints seguros
- � **API RESTful**: Endpoints padronizados e documentados

### Frontend (React)
```typescript  
// Organização por funcionalidades e reutilização
src/
├── components/            # Componentes reutilizáveis
├── services/             # Camada de serviços (API)
├── types/                # Tipagens TypeScript
└── App.tsx              # Orquestração principal
```

**Características:**
- ⚛️ **Hooks Modernos**: useState, useEffect, useCallback
- 🎯 **Componentes Funcionais**: Código limpo e performático  
- 📝 **TypeScript Total**: Tipagem completa do projeto
- 🔄 **Estado Reativo**: Atualizações automáticas da UI

## 🎯 Recursos Únicos

### 🔄 Sincronização Inteligente
- **Cross-Tab Updates**: Mudanças em categorias atualizam produtos automaticamente
- **Real-Time UI**: Interface sempre sincronizada com backend
- **Zero Reload**: Nenhuma necessidade de recarregar página

### 🎨 UX Cuidadosa
- **Loading States**: Feedback visual durante operações
- **Empty States**: Orientações claras quando listas estão vazias  
- **Error Handling**: Tratamento elegante de erros de rede
- **Confirmações**: Proteção contra ações acidentais

### 🔐 Integridade de Dados
- **SET NULL Strategy**: Produtos preservados ao deletar categorias
- **Validação Dupla**: Frontend + Backend validation
- **Relacionamentos Seguros**: Constraints de banco bem definidas

## 📸 Demonstração

### Interface Principal
- 🏠 **Dashboard**: Visão geral com navegação por abas
- 📦 **Lista de Produtos**: Cards responsivos com informações completas
- 🏷️ **Gerenciamento de Categorias**: Interface dedicada e intuitiva

### Funcionalidades Avançadas
- 🔍 **Busca em Tempo Real**: Filtros dinâmicos e combinados
- 📄 **Paginação Inteligente**: Navegação otimizada
- 📝 **Formulários Modais**: Criar e editar com validação
- ⚠️ **Confirmações**: Proteção contra exclusões acidentais

## 🤝 Contribuindo

Este projeto está aberto para contribuições! Sinta-se à vontade para:

- 🐛 **Reportar bugs** através das issues
- 💡 **Sugerir melhorias** ou novas funcionalidades  
- 🔧 **Enviar pull requests** com correções ou features
- 📚 **Melhorar a documentação**

### Como Contribuir
1. Fork o repositório
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

