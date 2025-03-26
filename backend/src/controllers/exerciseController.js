const db = require("./../config/db");

// Função para listar os exercícios
const getExercises = (req, res) => {
  const query = "SELECT * FROM exercises";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Erro ao buscar exercícios: ", err);
      return res.status(500).json({ message: "Erro ao buscar exercícios" });
    }

    // Categorizar os exercícios
    const categorizedExercises = {
      facil: [],
      medio: [],
      dificil: []
    };

    results.forEach((exercise) => {
      if (exercise.difficulty === "Facil") categorizedExercises.facil.push(exercise);
      if (exercise.difficulty === "Médio") categorizedExercises.medio.push(exercise);
      if (exercise.difficulty === "Difícil") categorizedExercises.dificil.push(exercise);
    });

    res.json(categorizedExercises);
  });
};

// Função para obter os detalhes de um exercício específico
const getExerciseById = (req, res) => {
  const exerciseId = req.params.id;  // Pegando o id do exercício da URL

  const query = "SELECT * FROM exercises WHERE id = ?";
  db.query(query, [exerciseId], (err, results) => {
    if (err) {
      console.error("Erro ao buscar exercício: ", err);
      return res.status(500).json({ message: "Erro ao buscar exercício" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Exercício não encontrado" });
    }

    const exercise = results[0];
    res.json(exercise);
  });
};

module.exports = {
  getExercises,
  getExerciseById
};
