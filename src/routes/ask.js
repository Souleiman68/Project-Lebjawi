/**
 * ask.js — POST /ask
 * Main route: receives user message, returns AI response.
 * Supports Arabic and English only.
 */
const express = require("express");
const { askAssistant } = require("../services/aiService");

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const { message, sessionId } = req.body;

    // Validate input — error in both languages
    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return res.status(400).json({
        error: "Message is required.",
        error_ar: "الرسالة مطلوبة."
      });
    }

    const sid = sessionId || "anonymous";
    const reply = await askAssistant(sid, message.trim());

    res.json({
      reply,
      sessionId: sid,
      timestamp: new Date().toISOString()
    });

  } catch (err) {
    next(err);
  }
});

module.exports = router;