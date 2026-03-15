# MR-Assistant – AI‑Powered Citizen Assistant for Mauritania

> Ask in Arabic or English, get a concrete, actionable answer about public services, prices, health, education, and administrative procedures – all focused on Mauritania.

---

## The Problem

In Mauritania, finding reliable information is hard. There is no central resource for medical emergencies, market prices, or administrative procedures. Everything runs on word-of-mouth — you need to know someone who knows someone (*samsar* culture). People do not want to search and compare. They want someone to think for them and say: *go here, call this number, do this first.*

Facebook groups and WhatsApp are disorganized, unreliable, and slow.

---

## The Solution

MR-Assistant is a local AI assistant that:

- Understands questions in **Arabic or English** — language is auto-detected
- Answers **only about Mauritania** — hospitals, fuel prices, universities, banking apps, emergency numbers, administrative steps
- Uses a **two-layer architecture**: local OSINT data first, then Claude AI for anything outside the local database
- Maintains **short-term session memory** — context-aware across 3 exchanges
- Works on **any phone on 3G** — no app needed, lightweight frontend

---

## How It Works

```
User question
    │
    ▼
Search mauritaniaData.js  (local OSINT cache)
    │
    ├── Found  →  answer directly, no API call needed
    │
    └── Not found  →  Claude AI (Anthropic) answers from its Mauritania knowledge
                       └── API unavailable  →  honest demo message
```

**Language rule:**
- Arabic question → full Arabic answer
- English question → full English answer

---

## Demo

**English:**
```
User: "What is the price of gasoline in Nouakchott?"

MR-Assistant:
  Gasoline price in Mauritania (February 2026):
  • Gasoline: 53.81 MRU/liter
  • Diesel: 48.79 MRU/liter
  Source: Government official price, Feb 2026
```

**Arabic:**
```
User: "كم سعر لتر الغازوال اليوم؟"

MR-Assistant:
  سعر الغازوال في موريتانيا (فبراير 2026):
  • الغازوال: 48.79 MRU/لتر
  • البنزين: 53.81 MRU/لتر
  المصدر: قرار حكومي — فبراير 2026
```

```


---

## API Endpoints

```
POST /ask        →  AI answer (Arabic or English, with session memory)
GET  /prices     →  Market prices in Mauritania (MRU)
GET  /health     →  Server status
```

---

## Architecture

mr-assistant/
├── public/
│   └── index.html            # Bilingual chat UI — Arabic + English
├── src/
│   ├── server.js             # Express app
│   ├── routes/
│   │   ├── ask.js            # POST /ask — main AI endpoint
│   │   └── prices.js         # GET /prices — OSINT prices endpoint
│   ├── services/
│   │   └── aiService.js      # Smart engine: local first, Claude fallback
│   └── data/
│       └── mauritaniaData.js # Local OSINT knowledge base
├── .env                      # ANTHROPIC_API_KEY
└── package.json


---

## Stack

- **Backend**: Node.js + Express
- **AI**: Claude 3.5 Sonnet (Anthropic) — Mauritania-specific system prompt
- **OSINT data**: WFP reference prices, public hospital records, OpenStreetMap, government records
- **Frontend**: Vanilla HTML/CSS/JS — no framework, works on 3G

---

## Local OSINT Knowledge Base

`mauritaniaData.js` covers:

| Category | Data |
|---|---|
| Hospitals | 9 hospitals with phone numbers |
| Pharmacies | 6 pharmacies, 3 open 24h |
| Emergency numbers | SAMU 101, Police 117, Fire 118 |
| Market prices | 15 products including fuel (Feb 2026 official prices) |
| Universities | 5 universities with websites |
| Banking apps | Bankily, Masrvi, Sedad with USSD codes |
| Banks | 8 banks |
| Admin procedures | Birth certificate, CNI, passport, business creation |
| Telecom operators | Mauritel, Mattel, Chinguitel |
| Airports | 3 airports with IATA codes |
| Public services | SOMELEC, SNDE, ANRPTS, APME |
| Exchange rates | USD, EUR → MRU |

---

## Run Locally

```bash
git clone https://github.com/Souleiman68/Project-Lebjawi
cd Project-Lebjawi
npm install

# Create .env
echo "ANTHROPIC_API_KEY=your_key_here" > .env

npm run dev
# → http://localhost:4000
```

---

## Note on API Credits

This project uses a **two-layer system** by design.

The Claude API requires paid credits. During this challenge, the API balance ran out. Rather than crashing, the app **automatically falls back to the local OSINT engine** — answering from `mauritaniaData.js` without any API call.

- **With API credits** → Claude gives rich, conversational answers to any question
- **Without credits** → local engine answers all known Mauritanian topics instantly
- **The app never shows a server error** — it always responds

In production, the API would be funded. The local fallback is not a workaround — it is a deliberate architectural decision that makes the app resilient.

---


*Built by Souleiman Sow  Lebjawi Tech Full-Stack Developer Internship Challenge*