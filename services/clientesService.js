const pool = require("../configs/db");

async function getClientes() {
  try {
    const [rows] = await pool.query("SELECT * FROM clientes");
    return rows;
  } catch (error) {
    throw new Error("Erro ao buscar clientes");
  }
}

async function getClienteById(id) {
  try {
    const [rows] = await pool.query("SELECT * FROM clientes WHERE id = ?", [
      id,
    ]);
    return rows.length ? rows[0] : null;
  } catch (error) {
    throw new Error("Erro ao buscar cliente");
  }
}

async function addCliente({ nome, sobrenome, email, idade }) {
  try {
    const [result] = await pool.query(
      "INSERT INTO clientes (nome, sobrenome, email, idade) VALUES (?, ?, ?, ?)",
      [nome, sobrenome, email, idade]
    );
    return result.insertId; // Retorna o id do cliente inserido
  } catch (error) {
    throw new Error("Erro ao cadastrar cliente");
  }
}

async function updateCliente(id, { nome, sobrenome, email, idade }) {
  try {
    const [result] = await pool.query(
      "UPDATE clientes SET nome = ?, sobrenome = ?, email = ?, idade = ? WHERE id = ?",
      [nome, sobrenome, email, idade, id]
    );
    return result.affectedRows;
  } catch (error) {
    throw new Error("Erro ao atualizar cliente");
  }
}

async function deleteCliente(id) {
  try {
    const [result] = await pool.query("DELETE FROM clientes WHERE id = ?", [
      id,
    ]);
    return result.affectedRows;
  } catch (error) {
    throw new Error("Erro ao excluir cliente");
  }
}

module.exports = {
  getClientes,
  getClienteById,
  addCliente,
  updateCliente,
  deleteCliente,
};
