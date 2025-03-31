const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const clientesRoutes = require("./routes/clientes");
const produtosRoutes = require("./routes/produtos");

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// 📌 Usar as rotas
app.use("/clientes", clientesRoutes);
app.use("/produtos", produtosRoutes);

app.get("/", (req, res) => {
  res.send("🚀 API está rodando!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
