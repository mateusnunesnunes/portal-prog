const db = require("./../config/db");

// Função para listar todos os usuários
const getUsers = (req, res) => {
  const query = "SELECT id, username, ranking FROM users";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Erro ao buscar usuários: ", err);
      return res.status(500).json({ message: "Erro ao buscar usuários" });
    }
    res.json(results);
  });
};

// Função para pegar todos os usuários ordenados por ranking
const getUsersByRanking = (req, res) => {
  console.log("Buscando usuários por ranking");
  const query = "SELECT * FROM users ORDER BY ranking DESC"; // Ordena os usuários pelo ranking em ordem decrescente

  db.query(query, (err, results) => {
    if (err) {
      console.error("Erro ao buscar usuários: ", err);
      return res.status(500).json({ message: "Erro ao buscar usuários" });
    }

    res.json(results);
  });
};

// Função para obter os detalhes de um usuário específico
const getUserById = (req, res) => {
  console.log('Buscando usuário por id');
  const userId = req.params.id;

  const query = "SELECT id, username, ranking FROM users WHERE id = ?";
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Erro ao buscar usuário: ", err);
      return res.status(500).json({ message: "Erro ao buscar usuário" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.json(results[0]);
  });
};

// Função para criar um novo usuário
const createUser = (req, res) => {
  const { username, password, ranking } = req.body;

  // Verificando se todos os campos foram preenchidos
  if (!username || !password || !ranking) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios" });
  }

  const query = "INSERT INTO users (username, password, ranking) VALUES (?, ?, ?)";
  db.query(query, [username, password, ranking], (err, results) => {
    if (err) {
      console.error("Erro ao criar usuário: ", err);
      return res.status(500).json({ message: "Erro ao criar usuário" });
    }
    res.status(201).json({ message: "Usuário criado com sucesso!" });
  });
};

// Função para atualizar o ranking de um usuário
const updateUserRanking = (req, res) => {
  const userId = req.params.id;
  const { ranking } = req.body;

  const query = "UPDATE users SET ranking = ? WHERE id = ?";
  db.query(query, [ranking, userId], (err, results) => {
    if (err) {
      console.error("Erro ao atualizar ranking: ", err);
      return res.status(500).json({ message: "Erro ao atualizar ranking" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.json({ message: "Ranking atualizado com sucesso!" });
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserRanking,
  getUsersByRanking
};
