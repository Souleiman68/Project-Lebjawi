/**
 * server.js — MR-Assistant Backend
 * ─────────────────────────────────────────────
 * Express server for the Mauritanian citizen assistant.
 *
 * Routes:
 *   POST /ask       → AI answer (Arabic or English)
 *   GET  /prices    → Market prices in Mauritania (MRU)
 *   GET  /health    → Server status check
 *   GET  *          → Serves the frontend (index.html)
 */
require("dotenv").config();
const express = require("express");
const cors    = require("cors");
const path    = require("path");

const askRouter    = require("./routes/ask");
const pricesRouter = require("./routes/prices");

const app  = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

// API routes
app.use("/ask",    askRouter);
app.use("/prices", pricesRouter);

// Health check — useful for deployment monitoring
app.get("/health", (req, res) => res.json({
  status: "ok",
  app: "MR-Assistant",
  country: "Mauritania",
  timestamp: new Date().toISOString()
}));

// Global error handler — must be BEFORE the fallback route
app.use((err, req, res, next) => {
  console.error("[ERROR]", err.message);
  res.status(500).json({
    error: "Server error — please try again.",
    error_ar: "خطأ في الخادم — حاول مرة أخرى."
  });
});

// Serve frontend for all other routes (Express 4/5 compatible)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.listen(PORT, () => {
  console.log(`\n🇲🇷  MR-Assistant → http://localhost:${PORT}\n`);
});