const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

/**
 * ROTA TESTE
 */
app.get("/", (req, res) => {
  res.send("🚀 Duckbet backend rodando com sucesso!");
});

/**
 * ROTA PIX
 */
app.post("/api/deposit/pix", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ error: "Valor é obrigatório" });
    }

    // ⚠️ Aqui você colocará sua integração real depois
    // Por enquanto é apenas teste

    return res.json({
      success: true,
      message: "PIX criado com sucesso (modo teste)",
      amount: amount
    });

  } catch (error) {
    console.error("Erro ao criar PIX:", error.message);

    return res.status(500).json({
      error: "Erro interno ao criar PIX"
    });
  }
});

/**
 * PORTA DINÂMICA PARA RENDER
 */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🔥 Servidor rodando na porta ${PORT}`);
});
