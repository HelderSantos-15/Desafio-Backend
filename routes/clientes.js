const express = require("express");
const router = express.Router();
const {
  getClientes,
  getClienteById,
  addCliente,
  updateCliente,
  deleteCliente,
} = require("../controllers/clientesController");

const validarCliente = require("../middlewares/validacaoCliente");

// 📌 Listar todos os clientes
router.get("/", getClientes);

// 📌 Buscar cliente por ID
router.get("/:id", getClienteById);

// 📌 Adicionar um novo cliente (com validação)
router.post("/", validarCliente, addCliente);

// 📌 Atualizar um cliente pelo ID
router.put("/:id", validarCliente, updateCliente);

// 📌 Deletar um cliente pelo ID
router.delete("/:id", deleteCliente);

module.exports = router;
