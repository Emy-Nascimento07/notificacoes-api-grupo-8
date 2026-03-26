const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const logger = require("./middlewares/logger");
const cors = require("cors");
const notFound = require("./middlewares/notFound");
const responseTime = require("./middlewares/responseTime");
const errorHandler = require("./middlewares/errorHandler");

// Middleware para ler JSON no body das requisições
app.use(express.json()); // 1°: Lê o JSON do body

// Middleware
app.use(cors()); // 2° Configura o CORS
app.use(logger); // 3°: Registra no console

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rota para favicon (evita erro 404)
app.get("/favicon.ico", (req, res, next) => res.status(204).end());

// Importar rotas
const eventoRoutes = require("./routes/eventoRoutes");
const participanteRoutes = require("./routes/participanteRoutes");
const inscricaoRoutes = require("./routes/inscricaoRoutes");

// Usar rotas com prefixo
app.use("/eventos", eventoRoutes); // 4°: Tenta rotas de eventos
app.use("/participantes", participanteRoutes); // 5°: Tenta rotas de participantes
app.use("/inscricoes", inscricaoRoutes); // 6°: Tenta rotas de participantes

// Rota raiz

app.get("/", (req, res) => {
  res.json({
    mensagem: "API de Notificações",
    rotas: {
      eventos: "/eventos",
      participantes: "/participantes",
      inscricoes: "/inscricoes",
    },
  });
});

// Middleware para tratamento de erros 
app.use(notFound); // 7°: Se o erro não foi tratado, retorna 404

// Middleware para calcular tempo de resposta das requisições
app.use(responseTime); // 8° : Calcula o tempo de resposta e adiciona no header "X-Response-Time"

// Middleware para tratamento de erros
app.use(errorHandler)

module.exports = app;
