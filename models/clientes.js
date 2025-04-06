const db = require('../configs/db');

// Função para buscar todos os clientes no banco
async function getClientes() {
    const [rows] = await db.query('SELECT * FROM clientes');
    return rows;
}

module.exports = { getClientes };
