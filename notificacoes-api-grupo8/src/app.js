const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const logger = require(".middlewares/logger");
const cors = require("cors");

// Middleware
app.use(logger);
app.use(cors());

// Middleware para ler JSON no body das requisições
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rota para favicon (evita erro 404)
app.get("/favicon.ico", (req, res) => res.status(204).end());

// Importar rotas
const eventoRoutes = require("./routes/eventoRoutes");
const participanteRoutes = require("./routes/participanteRoutes");
const inscricaoRoutes = require("./routes/inscricaoRoutes");

// Usar rotas com prefixo
app.use("/eventos", eventoRoutes);
app.use("/participantes", participanteRoutes);
app.use("/inscricoes", inscricaoRoutes);

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

const notFound = require("./middlewares/notFound");
app.use(notFound);

module.exports = app;
