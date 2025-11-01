# 🏭 Sistema de Gestão de Equipamentos e Manutenção

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)

Sistema completo para gerenciamento de equipamentos e suas respectivas manutenções, com autenticação JWT e documentação automática via Swagger.

[Documentação da API](#-documentação-da-api) •
[Instalação](#-instalação) •
[Docker](#-docker) •
[Tecnologias](#-tecnologias)

</div>

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Arquitetura](#-arquitetura)
- [Tecnologias](#-tecnologias)
- [Instalação](#-instalação)
- [Docker](#-docker)
- [Backend](#-backend)
- [Frontend](#-frontend)
- [Documentação da API](#-documentação-da-api)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Segurança](#-segurança)
- [Contribuindo](#-contribuindo)
- [Licença](#-licença)

---

## 🎯 Sobre o Projeto

Sistema web desenvolvido para gestão eficiente de equipamentos e controle de manutenções. Permite o cadastro de equipamentos, agendamento e acompanhamento de manutenções, com sistema de autenticação seguro e interface intuitiva.

### Principais Características

- ✅ **Autenticação JWT** - Sistema seguro de login e registro
- 📦 **Gestão de Equipamentos** - CRUD completo de equipamentos
- 🔧 **Controle de Manutenção** - Gerenciamento de manutenções preventivas e corretivas
- 📊 **Dashboard Interativo** - Visualização em tempo real dos dados
- 🐳 **Docker Ready** - Deploy simplificado com containers
- 📚 **API Documentada** - Swagger UI para documentação interativa
- 🔒 **Seguro** - Bcrypt para senhas e JWT para autenticação

---

## ⚡ Funcionalidades

### Autenticação
- [x] Registro de novos usuários
- [x] Login com JWT
- [x] Proteção de rotas
- [x] Hash de senhas com bcrypt

### Equipamentos
- [x] Listar todos os equipamentos
- [x] Buscar equipamento por ID
- [x] Criar novo equipamento
- [x] Atualizar informações do equipamento
- [x] Excluir equipamento
- [x] Filtrar por status (Disponível, Em Manutenção, Inativo)

### Manutenções
- [x] Registrar nova manutenção
- [x] Listar todas as manutenções
- [x] Buscar manutenção por ID
- [x] Atualizar status da manutenção
- [x] Excluir registro de manutenção
- [x] Associar manutenção a equipamento

---

## 🏗️ Arquitetura

O projeto segue uma arquitetura em camadas com separação clara de responsabilidades:

```
┌─────────────────────────────────────────┐
│           Frontend (Nginx)              │
│    HTML + CSS + JavaScript Vanilla      │
└────────────────┬────────────────────────┘
                 │ HTTP/REST
┌────────────────┴────────────────────────┐
│         Backend (Node.js/Express)       │
│  ┌──────────────────────────────────┐  │
│  │         Routes Layer             │  │
│  └──────────────┬───────────────────┘  │
│  ┌──────────────┴───────────────────┐  │
│  │      Middleware (Auth JWT)       │  │
│  └──────────────┬───────────────────┘  │
│  ┌──────────────┴───────────────────┐  │
│  │      Controllers Layer           │  │
│  └──────────────┬───────────────────┘  │
│  ┌──────────────┴───────────────────┐  │
│  │       Models (Sequelize ORM)     │  │
│  └──────────────┬───────────────────┘  │
└─────────────────┼───────────────────────┘
                  │
┌─────────────────┴───────────────────────┐
│         Database (SQLite)               │
└─────────────────────────────────────────┘
```

---

## 🛠️ Tecnologias

### Backend

| Tecnologia | Versão | Descrição |
|-----------|--------|-----------|
| **Node.js** | 20.x | Runtime JavaScript |
| **Express** | 5.1.0 | Framework web minimalista |
| **Sequelize** | 6.37.7 | ORM para banco de dados |
| **SQLite** | 5.1.7 | Banco de dados relacional |
| **JWT** | 9.0.2 | Autenticação via tokens |
| **Bcrypt.js** | 3.0.2 | Hash de senhas |
| **Swagger** | 6.2.8 | Documentação da API |
| **CORS** | 2.8.5 | Cross-Origin Resource Sharing |
| **Dotenv** | 17.2.2 | Variáveis de ambiente |

### Frontend

- **HTML5** - Estrutura semântica
- **CSS3** - Estilização moderna
- **JavaScript (ES6+)** - Lógica do cliente
- **Fetch API** - Comunicação com backend
- **LocalStorage** - Armazenamento de token JWT

### DevOps

- **Docker** - Containerização
- **Docker Compose** - Orquestração de containers
- **Nginx** - Servidor web para frontend
- **Nodemon** - Hot reload em desenvolvimento

---

## 📦 Instalação

### Pré-requisitos

- Node.js 18+ instalado
- NPM ou Yarn
- Docker e Docker Compose (opcional, mas recomendado)

### Instalação Local

#### 1. Clone o repositório

```bash
git clone https://github.com/monicatavares5/trabalho-framework-2.git
cd trabalho-framework-2
```

#### 2. Configure as variáveis de ambiente

Crie um arquivo `.env` na pasta `backend`:

```bash
cd backend
```

Crie o arquivo `.env`:

```env
NODE_ENV=development
SERVER_PORT=3000
JWT_SECRET=sua_chave_secreta_aqui_muito_segura
DATABASE_PATH=./database.sqlite
```

#### 3. Instale as dependências do backend

```bash
npm install
```

#### 4. Inicie o servidor backend

**Modo desenvolvimento (com hot reload):**
```bash
npm run dev
```

**Modo produção:**
```bash
npm start
```

O backend estará disponível em: `http://localhost:3000`

#### 5. Configure o frontend

```bash
cd ../frontend
```

Edite o arquivo `js/config.js` se necessário:

```javascript
const API_BASE_URL = 'http://localhost:3000';
```

#### 6. Sirva o frontend

Você pode usar qualquer servidor HTTP. Exemplo com Python:

```bash
# Python 3
python -m http.server 8080

# Ou use o Live Server do VS Code
```

O frontend estará disponível em: `http://localhost:8080`

---

## 🐳 Docker

A forma mais simples e recomendada de executar o projeto é usando Docker.

### Pré-requisitos

- Docker Desktop instalado e rodando
- Docker Compose instalado

### Quick Start

#### 1. Clone o repositório

```bash
git clone https://github.com/monicatavares5/trabalho-framework-2.git
cd trabalho-framework-2
```

#### 2. Inicie os containers

```bash
docker-compose up -d
```

Este comando irá:
- Construir as imagens do backend e frontend
- Criar e iniciar os containers
- Configurar a rede entre os serviços
- Expor as portas necessárias

#### 3. Acesse a aplicação

- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:3000
- **Swagger Documentation**: http://localhost:3000/api-docs

### Comandos Úteis Docker

```bash
# Ver logs em tempo real
docker-compose logs -f

# Ver logs de um serviço específico
docker-compose logs -f backend
docker-compose logs -f frontend

# Parar os containers
docker-compose down

# Parar e remover volumes
docker-compose down -v

# Reconstruir após mudanças no código
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# Ver containers rodando
docker ps

# Acessar shell do container backend
docker exec -it backend sh

# Acessar shell do container frontend
docker exec -it frontend sh

# Limpar tudo (containers, imagens, volumes)
docker-compose down -v
docker system prune -a
```

### Estrutura Docker

#### Backend Dockerfile

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

#### Frontend Dockerfile

```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Docker Compose

O arquivo `docker-compose.yml` configura:

- **Backend**: Porta 3000, com volume persistente para o banco SQLite
- **Frontend**: Porta 8080, servido via Nginx
- **Network**: Rede bridge para comunicação entre containers
- **Restart Policy**: Reinicialização automática em caso de falha

---

## 🔙 Backend

### Estrutura de Pastas

```
backend/
├── src/
│   ├── server.js              # Ponto de entrada da aplicação
│   ├── config/
│   │   ├── database.js        # Configuração do Sequelize
│   │   └── swagger.js         # Configuração do Swagger
│   ├── controllers/
│   │   ├── authController.js       # Lógica de autenticação
│   │   ├── equipamentoController.js # CRUD de equipamentos
│   │   └── manutencaoController.js  # CRUD de manutenções
│   ├── middleware/
│   │   └── auth.js            # Middleware de autenticação JWT
│   ├── models/
│   │   ├── equipamento.js     # Model de Equipamento
│   │   ├── manutencao.js      # Model de Manutenção
│   │   └── usuario.js         # Model de Usuário
│   └── routes/
│       ├── authRoute.js       # Rotas de autenticação
│       ├── equipamentoRoute.js # Rotas de equipamentos
│       └── manutencaoRoute.js  # Rotas de manutenções
├── request/
│   ├── aluno.rest             # Exemplos de requisições REST
│   └── api.rest               # Exemplos de requisições REST
├── Dockerfile
├── package.json
└── database.sqlite            # Banco de dados (criado automaticamente)
```

### Models

#### Usuario
```javascript
{
  id: INTEGER (PK, Auto Increment),
  nome: STRING (Not Null),
  email: STRING (Unique, Not Null),
  senha: STRING (Hashed, Not Null),
  data_criacao: DATE (Default: NOW)
}
```

#### Equipamento
```javascript
{
  id: INTEGER (PK, Auto Increment),
  nome: STRING (Not Null),
  descricao: TEXT,
  status: STRING (Default: 'Disponível'),
  data_adicionado: DATE (Default: NOW)
}
```

#### Manutencao
```javascript
{
  id: INTEGER (PK, Auto Increment),
  equipamento_id: INTEGER (FK -> equipamentos.id),
  data: DATE (Default: NOW),
  descricao: TEXT (Not Null),
  status: STRING (Default: 'Pendente')
}
```

### Relacionamentos

- **Equipamento** `hasMany` **Manutencao**
- **Manutencao** `belongsTo` **Equipamento**

### Middlewares

#### Autenticação JWT (`auth.js`)

```javascript
// Protege rotas que requerem autenticação
// Verifica o token JWT no header Authorization
// Adiciona os dados do usuário em req.user
```

### Scripts NPM

```bash
npm run dev    # Inicia servidor em modo desenvolvimento (nodemon)
npm start      # Inicia servidor em modo produção
```

### Variáveis de Ambiente

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| `NODE_ENV` | Ambiente de execução | development |
| `SERVER_PORT` | Porta do servidor | 3000 |
| `JWT_SECRET` | Chave secreta para JWT | (obrigatório) |
| `DATABASE_PATH` | Caminho do banco SQLite | ./database.sqlite |

---

## 🎨 Frontend

### Estrutura de Pastas

```
frontend/
├── index.html           # Página de login
├── register.html        # Página de registro
├── dashboard.html       # Dashboard principal
├── css/
│   └── style.css       # Estilos globais
├── js/
│   ├── config.js       # Configurações (URL da API)
│   ├── auth.js         # Funções de autenticação
│   ├── login.js        # Lógica da página de login
│   ├── register.js     # Lógica da página de registro
│   └── dashboard.js    # Lógica do dashboard
├── nginx.conf          # Configuração do Nginx
└── Dockerfile
```

### Páginas

#### 1. Login (`index.html`)
- Formulário de login
- Validação de credenciais
- Redirecionamento para dashboard após login
- Link para página de registro

#### 2. Registro (`register.html`)
- Formulário de cadastro de novo usuário
- Validação de dados
- Confirmação de senha
- Hash automático no backend

#### 3. Dashboard (`dashboard.html`)
- Listagem de equipamentos
- Listagem de manutenções
- Formulários para criar/editar
- Filtros e busca
- Ações: criar, editar, excluir
- Logout

### Configuração

Edite `js/config.js` para apontar para sua API:

```javascript
const API_BASE_URL = 'http://localhost:3000';
// ou
const API_BASE_URL = 'https://sua-api.com';
```

### Autenticação Frontend

O token JWT é armazenado no `localStorage` após login bem-sucedido:

```javascript
localStorage.setItem('token', token);
```

Todas as requisições autenticadas incluem o token no header:

```javascript
headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
}
```

### Nginx

O arquivo `nginx.conf` configura:
- Porta 80 (mapeada para 8080 no host)
- Servir arquivos estáticos
- Single Page Application routing
- Compressão gzip
- Cache headers

---

## 📚 Documentação da API

### Swagger UI

Acesse a documentação interativa em: **http://localhost:3000/api-docs**

A documentação Swagger permite:
- Visualizar todos os endpoints
- Testar requisições diretamente no navegador
- Ver schemas de request/response
- Autenticar com JWT

### Endpoints Principais

#### Autenticação

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| POST | `/login/register` | Registrar novo usuário | Não |
| POST | `/login` | Fazer login | Não |

#### Equipamentos

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| GET | `/equipamentos` | Listar todos | Sim |
| GET | `/equipamentos/:id` | Buscar por ID | Sim |
| POST | `/equipamentos` | Criar novo | Sim |
| PUT | `/equipamentos/:id` | Atualizar | Sim |
| DELETE | `/equipamentos/:id` | Excluir | Sim |

#### Manutenções

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| GET | `/manutencao` | Listar todas | Sim |
| GET | `/manutencao/:id` | Buscar por ID | Sim |
| POST | `/manutencao` | Criar nova | Sim |
| PUT | `/manutencao/:id` | Atualizar | Sim |
| DELETE | `/manutencao/:id` | Excluir | Sim |

### Exemplos de Requisições

#### Registrar Usuário

```bash
POST /login/register
Content-Type: application/json

{
  "nome": "Monica Silva",
  "email": "monica@email.com",
  "senha": "senha123"
}
```

#### Login

```bash
POST /login
Content-Type: application/json

{
  "email": "monica@email.com",
  "senha": "senha123"
}

# Response
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "nome": "Monica Silva",
    "email": "monica@email.com"
  }
}
```

#### Criar Equipamento

```bash
POST /equipamentos
Authorization: Bearer {token}
Content-Type: application/json

{
  "nome": "Compressor Industrial",
  "descricao": "Compressor de ar 500L",
  "status": "Disponível"
}
```

#### Criar Manutenção

```bash
POST /manutencao
Authorization: Bearer {token}
Content-Type: application/json

{
  "equipamento_id": 1,
  "descricao": "Troca de óleo e filtros",
  "status": "Pendente"
}
```

### Códigos de Status HTTP

| Código | Significado |
|--------|-------------|
| 200 | Sucesso |
| 201 | Criado com sucesso |
| 400 | Requisição inválida |
| 401 | Não autenticado |
| 403 | Não autorizado |
| 404 | Não encontrado |
| 500 | Erro interno do servidor |

---

## 📂 Estrutura do Projeto

```
trabalho-framework-2/
│
├── backend/                    # Backend Node.js + Express
│   ├── src/
│   │   ├── server.js
│   │   ├── config/
│   │   │   ├── database.js
│   │   │   └── swagger.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── equipamentoController.js
│   │   │   └── manutencaoController.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   ├── models/
│   │   │   ├── equipamento.js
│   │   │   ├── manutencao.js
│   │   │   └── usuario.js
│   │   └── routes/
│   │       ├── authRoute.js
│   │       ├── equipamentoRoute.js
│   │       └── manutencaoRoute.js
│   ├── request/
│   │   ├── aluno.rest
│   │   └── api.rest
│   ├── Dockerfile
│   ├── package.json
│   └── .env (não versionado)
│
├── frontend/                   # Frontend estático
│   ├── index.html
│   ├── register.html
│   ├── dashboard.html
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── config.js
│   │   ├── auth.js
│   │   ├── login.js
│   │   ├── register.js
│   │   └── dashboard.js
│   ├── nginx.conf
│   └── Dockerfile
│
├── docker-compose.yml          # Orquestração Docker
├── DOCKER.md                   # Guia rápido Docker
└── README.md                   # Este arquivo
```

---

## 🔒 Segurança

### Implementações de Segurança

1. **Senhas Criptografadas**
   - Bcrypt com salt rounds para hash
   - Senhas nunca armazenadas em texto plano

2. **JWT (JSON Web Tokens)**
   - Tokens assinados com chave secreta
   - Expiração configurável
   - Verificação em todas as rotas protegidas

3. **CORS Configurado**
   - Controle de origens permitidas
   - Prevenção de requisições não autorizadas

4. **Variáveis de Ambiente**
   - Credenciais sensíveis em `.env`
   - Arquivo `.env` não versionado no Git

5. **Validações**
   - Validação de entrada no backend
   - Sanitização de dados
   - Prevenção de SQL Injection (via Sequelize ORM)

### Boas Práticas

- ⚠️ **IMPORTANTE**: Altere o `JWT_SECRET` em produção
- Nunca compartilhe o arquivo `.env`
- Use HTTPS em produção
- Mantenha dependências atualizadas
- Implemente rate limiting em produção
- Configure logs adequados

---

## 🚀 Deploy em Produção

### Recomendações

#### Backend
- Use variáveis de ambiente seguras
- Configure banco de dados robusto (PostgreSQL, MySQL)
- Implemente rate limiting
- Configure logs estruturados
- Use HTTPS
- Configure CORS adequadamente

#### Frontend
- Minifique arquivos CSS/JS
- Use CDN para assets estáticos
- Configure cache headers
- Implemente CSP (Content Security Policy)

#### Docker
- Use imagens oficiais e atualizadas
- Implemente health checks
- Configure restart policies
- Use secrets para credenciais
- Monitore recursos dos containers

### Plataformas Recomendadas

- **Backend**: Heroku, Railway, Render, AWS EC2
- **Frontend**: Vercel, Netlify, GitHub Pages
- **Docker**: AWS ECS, Google Cloud Run, Azure Container Instances

---

## 🧪 Testes

### Testando a API

Use o arquivo `request/api.rest` com a extensão REST Client do VS Code:

```bash
# Instale a extensão REST Client no VS Code
# Abra o arquivo request/api.rest
# Clique em "Send Request" acima de cada requisição
```

Ou use ferramentas como:
- Postman
- Insomnia
- cURL
- Swagger UI (http://localhost:3000/api-docs)

---

## 🐛 Troubleshooting

### Problemas Comuns

#### Backend não inicia

```bash
# Verifique se a porta está ocupada
netstat -ano | findstr :3000

# Verifique as variáveis de ambiente
# Certifique-se que JWT_SECRET está definido
```

#### Erro de CORS

```bash
# Verifique se o CORS está configurado no backend
# Verifique a URL da API no frontend (config.js)
```

#### Docker não funciona

```bash
# Certifique-se que o Docker Desktop está rodando
docker ps

# Verifique os logs
docker-compose logs

# Reconstrua as imagens
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

#### Token expirado

```bash
# Faça logout e login novamente
# O token JWT tem tempo de expiração
```

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Siga os passos:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

### Padrões de Código

- Use ESLint e Prettier
- Siga as convenções do projeto
- Documente novas funcionalidades
- Adicione testes quando possível

---

## 📄 Licença

Este projeto está sob a licença ISC.

---

## 👨‍💻 Autor

**Monica Tavares**

- GitHub: [@monicatavares5](https://github.com/monicatavares5)

---

## 📞 Suporte

Encontrou um problema? [Abra uma issue](https://github.com/monicatavares5/trabalho-framework-2/issues)

---

## 🙏 Agradecimentos

- Node.js Community
- Express.js Team
- Sequelize Contributors
- Docker Community

---

<div align="center">

**⭐ Se este projeto foi útil, considere dar uma estrela!**

Feito com ❤️ e ☕

</div>
