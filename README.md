# 🍱 FoodLink

Plataforma web que conecta doadores de alimentos a pessoas e instituições em situação de vulnerabilidade social, minimizando o desperdício e promovendo a segurança alimentar.

## 🎯 Objetivo

O FoodLink foi desenvolvido como projeto de extensão universitária alinhado aos Objetivos de Desenvolvimento Sustentável da ONU:

- **ODS 2** — Fome Zero
- **ODS 12** — Consumo e Produção Responsáveis

## ✨ Funcionalidades

- Cadastro de usuários (doadores e receptores)
- Autenticação segura com JWT
- Cadastro de alimentos disponíveis para doação
- Visualização e busca de doações disponíveis
- Solicitação de doações
- Gerenciamento de status das doações

## 🛠️ Tecnologias

**Frontend**

- React.js
- React Router DOM
- Axios

**Backend**

- Node.js
- Express
- Prisma ORM
- JWT + Bcrypt

**Banco de Dados**

- MySQL

## 🚀 Como rodar o projeto

### Pré-requisitos

- Node.js
- MySQL

### Backend

```bash
cd backend
npm install
npx prisma db push
node src/server.js
```

### Frontend

```bash
cd frontend
npm install
npm start
```

## 👨‍💻 Autor

Vinicius Soares Berardi — Centro Universitário FACENS, 2026

Para executar o projeto use "npm start"
Para executar o python de cadastro de usuario "python seed_selenium.py"
