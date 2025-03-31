const express = require("express");
const pool = require("../configs/db");

const router = express.Router();

// 📌 Listar todos os clientes
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM clientes");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar clientes" });
  }
});

// 📌 Adicionar um novo cliente
router.post("/", async (req, res) => {
  try {
    const { nome, sobrenome, email, idade } = req.body;
    await pool.query(
      "INSERT INTO clientes (nome, sobrenome, email, idade) VALUES (?, ?, ?, ?)",
      [nome, sobrenome, email, idade]
    );
    res.status(201).json({ message: "Cliente cadastrado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao cadastrar cliente" });
  }
});

module.exports = router;

// 📌 Atualizar um cliente pelo ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, sobrenome, email, idade } = req.body;

    const [result] = await pool.query(
      "UPDATE clientes SET nome = ?, sobrenome = ?, email = ?, idade = ? WHERE id = ?",
      [nome, sobrenome, email, idade, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }

    res.json({ message: "Cliente atualizado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar cliente" });
  }
});

// 📌 Deletar um cliente pelo ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query("DELETE FROM clientes WHERE id = ?", [
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }

    res.json({ message: "Cliente excluído com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir cliente" });
  }
});
