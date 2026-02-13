require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// ROTA RAIZ
app.get("/", (req, res) => {
  res.send("🦆 DUCKBET Backend Online!");
});

// FUNÇÃO PARA MONTAR AUTH BASIC
function getBasicAuth() {
  const secret = process.env.GHOST_SECRET_KEY;
  const company = process.env.GHOST_COMPANY_ID;
  const token = Buffer.from(`${secret}:${company}`).toString("base64");
  return `Basic ${token}`;
}

// ====== CRIAR PAGAMENTO ======
app.post("/api/payment", async (req, res) => {
  try {
    const body = req.body;

    const response = await axios.post(
      "https://api.ghostspaysv2.com/functions/v1/transactions",
      body,
      {
        headers: {
          Authorization: getBasicAuth(),
          "Content-Type": "application/json"
        }
      }
    );

    return res.json(response.data);
  } catch (error) {
    console.error("Erro GhostsPay:", error.response?.data || error.message);
    return res.status(500).json({ error: "Erro ao criar pagamento" });
  }
});

// ====== WEBHOOK ======
app.post("/api/webhook/ghostpay", (req, res) => {
  const event = req.body;
  console.log("WEBHOOK RECEIVED:", event);

  // Aqui você pode atualizar saldo do usuário manualmente
  // ou salvar no banco de dados

  res.sendStatus(200);
});

// ====== START ======
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🔥 DUCKBET API rodando na porta ${PORT}`);
});

