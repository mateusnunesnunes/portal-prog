const express = require("express");
const router = express.Router();
const exerciseController = require("../controllers/exerciseController");

// Rota para listar exercícios
router.get("/exercicios", exerciseController.getExercises);

// Rota para obter detalhes de um exercício específico
router.get("/exercicio/:id", exerciseController.getExerciseById);

module.exports = router;
