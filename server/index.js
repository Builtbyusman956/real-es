// server/index.js
const express = require("express");
const cors    = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");

const app  = express();
const PORT = process.env.PORT || 5001;

app.use(cors({
  origin: [
    "http://localhost:5173",   // Vite dev
    "http://localhost:3000",
    process.env.FRONTEND_URL,  // production URL
  ].filter(Boolean),
  credentials: true,
}));

app.use(express.json());

// ── Routes ──────────────────────────────────────────────────────────────────
app.use("/api/auth", authRoutes);

// Health check
app.get("/", (req, res) => res.json({ status: "ok", project: "real-es backend" }));

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});