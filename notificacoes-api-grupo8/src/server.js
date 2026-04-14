require("dotenv").config();

const { AccessDeniedError, HostNotFoundError, ConnectionRefusedError } = require("sequelize");
const app = require("./app");
const sequelize = require('./config/database');

const PORT = process.env.PORT || 3000;

async function iniciar() {
  try {
    // Testar conexão com o banco
    await sequelize.authenticate();
    console.log('Conexão com o MySQL estabelecida com sucesso!✅');

    // Iniciar o servidor
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
      console.log(`Ambiente: ${process.env.NODE_ENV || "development"}`);
      console.log(`Documentação: http://localhost:${PORT}/api-docs`);
    });
  } catch (erro) {
    if (erro instanceof AccessDeniedError) { // Se o erro identificado é igual ao erro de acesso negad
      console.log('❌Erro ao conectar com o banco de dados: Acesso negado para o user root, revise a senha.');
    } else if (erro instanceof HostNotFoundError) {
      console.log('❌Erro ao conectar com o banco de dados: Host não localizado.')
    } else if (erro instanceof ConnectionRefusedError) {
      console.log('❌Erro ao conectar com o banco de dados: Conexão recusada.');
    } else {
      console.log('❌Erro ao conectar com o banco de dados:', erro.message);
    }
    process.exit(1);
  }


}

iniciar();