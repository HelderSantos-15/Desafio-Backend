const createConnection = require('../configs/db');

// 📌 Buscar todos os produtos
async function getProdutos() {
    const connection = await createConnection(); // Cria a conexão com o banco de dados
    const [rows] = await connection.execute('SELECT * FROM produtos');
    return rows;
}

// 📌 Buscar um produto por ID
async function getProdutoById(id) {
    const connection = await createConnection(); // Cria a conexão com o banco de dados
    const [rows] = await connection.execute(
        'SELECT * FROM produtos WHERE id = ?',
        [id],
    );
    return rows[0];
}

// 📌 Adicionar um novo produto
async function addProduto({ nome, descricao, preco, quantidade }) {
    const connection = await createConnection(); // Cria a conexão com o banco de dados
    const [result] = await connection.execute(
        'INSERT INTO produtos (nome, descricao, preco, quantidade) VALUES (?, ?, ?, ?)',
        [nome, descricao, preco, quantidade],
    );
    return result.insertId;
}

// 📌 Atualizar um produto
async function updateProduto(id, { nome, descricao, preco, quantidade }) {
    const connection = await createConnection(); // Cria a conexão com o banco de dados
    const [result] = await connection.execute(
        'UPDATE produtos SET nome = ?, descricao = ?, preco = ?, quantidade = ? WHERE id = ?',
        [nome, descricao, preco, quantidade, id],
    );
    return result.affectedRows;
}

// 📌 Deletar um produto
async function deleteProduto(id) {
    const connection = await createConnection(); // Cria a conexão com o banco de dados
    const [result] = await connection.execute(
        'DELETE FROM produtos WHERE id = ?',
        [id],
    );
    return result.affectedRows;
}

module.exports = {
    getProdutos,
    getProdutoById,
    addProduto,
    updateProduto,
    deleteProduto,
};
