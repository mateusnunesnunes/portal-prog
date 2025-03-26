const mysql = require("mysql2");
require("dotenv").config();

// Criação da conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Conexão com o banco
db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar no MySQL: ", err);
    return;
  }
  console.log("Banco de dados conectado!");
});

module.exports = db;
