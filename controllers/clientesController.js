const clientesService = require("../services/clientesService");
const clientesView = require("../views/clientesView");

async function getClientes(req, res) {
  try {
    const clientes = await clientesService.getClientes();
    res.json(clientesView.formatClientes(clientes));
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar clientes" });
  }
}

async function getClienteById(req, res) {
  const { id } = req.params;
  try {
    const cliente = await clientesService.getClienteById(id);
    if (!cliente) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }
    res.json(clientesView.formatCliente(cliente));
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar cliente" });
  }
}

async function addCliente(req, res) {
  const { nome, sobrenome, email, idade } = req.body;
  try {
    const id = await clientesService.addCliente({
      nome,
      sobrenome,
      email,
      idade,
    });
    res.status(201).json({ message: "Cliente cadastrado com sucesso!", id });
  } catch (error) {
    res.status(500).json({ error: "Erro ao cadastrar cliente" });
  }
}

async function updateCliente(req, res) {
  const { id } = req.params;
  const { nome, sobrenome, email, idade } = req.body;
  try {
    const affectedRows = await clientesService.updateCliente(id, {
      nome,
      sobrenome,
      email,
      idade,
    });
    if (affectedRows === 0) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }
    res.json({ message: "Cliente atualizado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar cliente" });
  }
}

async function deleteCliente(req, res) {
  const { id } = req.params;
  try {
    const affectedRows = await clientesService.deleteCliente(id);
    if (affectedRows === 0) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }
    res.json({ message: "Cliente excluído com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir cliente" });
  }
}

module.exports = {
  getClientes,
  getClienteById,
  addCliente,
  updateCliente,
  deleteCliente,
};
