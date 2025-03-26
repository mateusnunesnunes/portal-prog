const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Rota para listar todos os usuários
router.get("/", userController.getUsers);


// Rota para obter os usuários ordenados pelo ranking
router.get("/ranking", userController.getUsersByRanking);

// Rota para obter um usuário pelo id
router.get("/:id", userController.getUserById);

// Rota para criar um novo usuário
router.post("/", userController.createUser);

// Rota para atualizar o ranking de um usuário
router.put("/:id/ranking", userController.updateUserRanking);


module.exports = router;
