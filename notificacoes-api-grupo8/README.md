# 🔔 Notificações API

> API REST para o módulo de notificações por e-mail de uma plataforma de gerenciamento de eventos.

## 📋 Sobre o Projeto

Este projeto faz parte da Situação de Aprendizagem do curso de Programação Back-End do SENAI. O módulo é responsável por enviar notificações (como confirmação de inscrição e lembretes) para os participantes de eventos.

---

## 🚀 Como Rodar

**1. Clone o repositório:**

```bash
git clone [https://github.com/Emy-Nascimento07/notificacoes-api](https://github.com/Emy-Nascimento07/notificacoes-api)
```

**2. Instale as dependências:**

```bash
npm install
```

**3. Inicie o servidor:**

```bash
npm start
```

**4. Acesse no seu navegador:**

- **API:** http://localhost:3000
- **Documentação (Swagger):** http://localhost:3000/api-docs

---

## 🛣️ Rotas Disponíveis

### 📅 Eventos

| Método     | Rota           | Descrição               |
| :--------- | :------------- | :---------------------- |
| **GET**    | `/eventos`     | Listar todos os eventos |
| **GET**    | `/eventos/:id` | Buscar evento por ID    |
| **POST**   | `/eventos`     | Criar um novo evento    |
| **PUT**    | `/eventos/:id` | Atualizar um evento     |
| **DELETE** | `/eventos/:id` | Deletar um evento       |

### 👥 Participantes

| Método     | Rota                 | Descrição                     |
| :--------- | :------------------- | :---------------------------- |
| **GET**    | `/participantes`     | Listar todos os participantes |
| **GET**    | `/participantes/:id` | Buscar participante por ID    |
| **POST**   | `/participantes`     | Criar um novo participante    |
| **PUT**    | `/participantes/:id` | Atualizar um participante     |
| **DELETE** | `/participantes/:id` | Deletar um participante       |

### 🎟️ Inscrições

| Método    | Rota                           | Descrição                    |
| :-------- | :----------------------------- | :--------------------------- |
| **POST**  | `/inscricoes`                  | Criar uma nova inscrição     |
| **GET**   | `/inscricoes`                  | Listar todas as inscrições   |
| **GET**   | `/inscricoes/evento/:eventoId` | Listar inscrições por evento |
| **PATCH** | `/inscricoes/:id/cancelar`     | Cancelar uma inscrição       |

---

## ️ Tecnologias
- Node.js
- Express.js
- Swagger (swagger-jsdoc + swagger-ui-express)
- Dotenv (variáveis de ambiente)
- Nodemon (desenvolvimento)
- CORS

---

## 📂 Estrutura do Projeto

```text
src/
├── controllers/ → Recebe requisições, retorna respostas
├── services/ → Lógica de negócio e validações
├── models/ → Acesso e manipulação de dados
├── routes/ → Mapeamento de URLs
├── middlewares/ → Funções intermediárias (log, erros, CORS)
├── errors/ → Classes de erro customizadas
├── helpers/ → Funções auxiliares (validação, etc.)
├── swagger.js → Configuração da documentação
├── app.js → Configuração do Express
└── server.js → Inicialização do servidor
```

---

## 🔧 Scripts
| Comando | Descrição |
|---------|-----------|
| `npm start` | Inicia o servidor (produção) |
| `npm run dev` | Inicia com Nodemon (desenvolvimento) |

---