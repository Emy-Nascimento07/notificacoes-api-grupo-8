function errorHandler(err, req, res, next) {
    // Se for um erro nosso (AppError), usamos o statusCode dele
    const statusCode = err.statusCode || 500;
    const mensagem = err.message || "Erro interno do servidor";


// Log do erro no console (para o desenvolvedor)
console.error(`[ERRO] ${err.name}: $[mensagem]`);

const resposta = {
    erro: {
        tipo: err.name || "Error",
        mensagem: mensagem,
        statusCode: statusCode,
    },
};

if (process.env.NODE_ENV === "development") {
    resposta.stack = err.stack;
};


// Resposta padronizada para o cliente
res.status(statusCode).json(resposta);

}

module.exports = errorHandler;