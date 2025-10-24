require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models/User"); // conecta com Sequelize

const UserRouter = require("./routes/UserRouter");
const TaskRouter = require("./routes/TaskRouter");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/user", UserRouter);
app.use("/api/task", TaskRouter);

// Testar conexão e sincronizar tabelas
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conectado ao PostgreSQL com sucesso!");
    
    await sequelize.sync({ force: false }); // mantém tabelas já existentes
    console.log("Tabelas sincronizadas");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Backend rodando na porta ${PORT}`);
    });
  } catch (err) {
    console.error("Erro ao conectar ou criar tabelas:", err);
  }
})();
