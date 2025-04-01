const express = require("express");
const pool = require("../configs/db");

const router = express.Router();

// 📌 Listar todos os produtos
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM produtos");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar produtos" });
  }
});

// 📌 Buscar produto por ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM produtos WHERE id = ?", [
      id,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar produto" });
  }
});

// 📌 Adicionar um novo produto
router.post("/", async (req, res) => {
  try {
    const { nome, descricao, preco } = req.body;
    await pool.query(
      "INSERT INTO produtos (nome, descricao, preco) VALUES (?, ?, ?)",
      [nome, descricao, preco]
    );
    res.status(201).json({ message: "Produto cadastrado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao cadastrar produto" });
  }
});

// 📌 Atualizar um produto pelo ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao, preco } = req.body;

    const [result] = await pool.query(
      "UPDATE produtos SET nome = ?, descricao = ?, preco = ? WHERE id = ?",
      [nome, descricao, preco, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    res.json({ message: "Produto atualizado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar produto" });
  }
});

// 📌 Deletar um produto pelo ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query("DELETE FROM produtos WHERE id = ?", [
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    res.json({ message: "Produto excluído com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir produto" });
  }
});

module.exports = router;
