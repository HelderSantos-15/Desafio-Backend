const createConnection = require('../configs/db');

// 📌 Buscar todos os clientes
async function getClientes() {
    const connection = await createConnection(); // Cria a conexão com o banco de dados
    const [rows] = await connection.execute('SELECT * FROM clientes');
    return rows;
}

// 📌 Buscar um cliente por ID
async function getClienteById(id) {
    const connection = await createConnection(); // Cria a conexão com o banco de dados
    const [rows] = await connection.execute(
        'SELECT * FROM clientes WHERE id = ?',
        [id],
    );
    return rows[0];
}

// 📌 Adicionar um novo cliente
async function addCliente({ nome, sobrenome, email, idade }) {
    const connection = await createConnection(); // Cria a conexão com o banco de dados
    const [result] = await connection.execute(
        'INSERT INTO clientes (nome, sobrenome, email, idade) VALUES (?, ?, ?, ?)',
        [nome, sobrenome, email, idade],
    );
    return result.insertId;
}

// 📌 Atualizar um cliente
async function updateCliente(id, { nome, sobrenome, email, idade }) {
    const connection = await createConnection(); // Cria a conexão com o banco de dados
    const [result] = await connection.execute(
        'UPDATE clientes SET nome = ?, sobrenome = ?, email = ?, idade = ? WHERE id = ?',
        [nome, sobrenome, email, idade, id],
    );
    return result.affectedRows;
}

// 📌 Deletar um cliente
async function deleteCliente(id) {
    const connection = await createConnection(); // Cria a conexão com o banco de dados
    const [result] = await connection.execute(
        'DELETE FROM clientes WHERE id = ?',
        [id],
    );
    return result.affectedRows;
}

module.exports = {
    getClientes,
    getClienteById,
    addCliente,
    updateCliente,
    deleteCliente,
};
