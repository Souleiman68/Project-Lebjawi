/**
 * prices.js — GET /prices
 * Returns Mauritanian market prices from local OSINT data.
 * Optional filters: ?product=rice&city=nouakchott
 *
 * Example: GET /prices?product=rice
 * Used by the frontend or external tools to query prices directly.
 */
const express = require("express");
const { MARKET_PRICES } = require("../data/mauritaniaData");

const router = express.Router();

router.get("/", (req, res) => {
  const { product, city } = req.query;

  let items = Object.entries(MARKET_PRICES).map(([name, v]) => ({
    product: name,
    unit: v.unit,
    nouakchott: v.nouakchott,
    nouadhibou: v.nouadhibou,
    currency: "MRU"
  }));

  // Filter by product name if provided
  if (product) {
    items = items.filter(i =>
      i.product.toLowerCase().includes(product.toLowerCase())
    );
  }

  res.json({
    meta: {
      country: "Mauritania",
      currency: "MRU",
      source: "WFP reference data",
      updatedAt: "2026-03"
    },
    count: items.length,
    items
  });
});

module.exports = router;