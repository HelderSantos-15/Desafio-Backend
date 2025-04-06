const express = require('express');
const router = express.Router();
const {
    getClientes,
    getClienteById,
    addCliente,
    updateCliente,
    deleteCliente,
} = require('../controllers/clientesController');

const { validateName } = require('../middlewares/nomeMiddleware');
const { validateFamilyName } = require('../middlewares/sobrenomeMiddleware');
const { validateAge } = require('../middlewares/idadeMiddleware');

// 📌 Listar todos os clientes
router.get('/', getClientes);

// 📌 Buscar cliente por ID
router.get('/:id', getClienteById);

// 📌 Adicionar um novo cliente (com validação)
router.post('/', validateName, validateFamilyName, validateAge, addCliente);

// 📌 Atualizar um cliente pelo ID (com validação)
router.put('/:id', validateName, validateFamilyName, validateAge, updateCliente);

// 📌 Deletar um cliente pelo ID
router.delete('/:id', deleteCliente);

module.exports = router;
