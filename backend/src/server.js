const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const exerciseRoutes = require("./routes/exerciseRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Roteamento
app.use("/", exerciseRoutes);
app.use("/users", userRoutes);

// Inicializando o servidor
app.listen(5000, () => {
  console.log("Servidor rodando na porta 5000");
});
