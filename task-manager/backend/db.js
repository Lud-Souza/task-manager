require("dotenv").config();
const { Sequelize } = require("sequelize");

// Conexão com PostgreSQL
const sequelize = new Sequelize(
  process.env.POSTGRES_DATABASE, // task_manager
  process.env.POSTGRES_USERNAME, // postgres
  process.env.POSTGRES_PASSWORD, // mobile
  {
    host: process.env.POSTGRES_HOST, // 127.0.0.1
    port: parseInt(process.env.POSTGRES_PORT), // 5433
    dialect: "postgres",
    logging: console.log, // Mostra queries no console
  }
);

// Testar conexão
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conectado ao PostgreSQL com sucesso!");
  } catch (err) {
    console.error("Erro ao conectar:", err);
  }
})();

module.exports = sequelize;
