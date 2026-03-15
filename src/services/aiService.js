/**
 * aiService.js — Smart AI Service
 *
 * FLOW:
 *   question → search local data → found? answer directly
 *                                → not found? show demo message
 *
 * With API credits: Claude answers anything.
 * Without credits: local engine + honest demo message.
 */

const Anthropic = require("@anthropic-ai/sdk");
const data = require("../data/mauritaniaData");

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

function isArabic(text) {
  return /[\u0600-\u06FF]/.test(text);
}

// ── LOCAL ENGINE ──
function localAnswer(question) {
  const q = question.toLowerCase();
  const ar = isArabic(question);

  // hospitals
  if (/hospital|clinic|doctor|health|sick|مستشفى|طبيب|عيادة|صحة|مريض/.test(q)) {
    const list = data.HOSPITALS.map(h =>
      `• ${h.name}${h.phone ? " — " + h.phone : ""}${h.specialty ? " (" + h.specialty + ")" : ""}`
    ).join("\n");
    return ar
      ? `المستشفيات في موريتانيا:\n${list}\n\nللطوارئ الطبية: اتصل بـ 101 (SAMU)`
      : `Hospitals in Mauritania:\n${list}\n\nMedical emergency: call 101 (SAMU)`;
  }

  // pharmacies
  if (/pharmac|medicine|drug|صيدلية|دواء/.test(q)) {
    const list = data.PHARMACIES.filter(p => p.open24h).map(p => `• ${p.name}`).join("\n");
    return ar
      ? `صيدليات مفتوحة 24 ساعة في نواكشوط:\n${list}`
      : `24h pharmacies in Nouakchott:\n${list}`;
  }

  // emergency
  if (/emergency|police|fire|urgent|gendarm|طوارئ|شرطة|نجدة|إسعاف|حريق/.test(q)) {
    const list = data.EMERGENCY_CONTACTS.map(e => `• ${e.service}: ${e.phone}`).join("\n");
    return ar
      ? `أرقام الطوارئ في موريتانيا:\n${list}`
      : `Emergency numbers in Mauritania:\n${list}`;
  }

  // fuel specific — direct answer
  if (/gasoline|essence|petrol|بنزين|essence/.test(q)) {
    return ar
      ? `سعر البنزين في موريتانيا (فبراير 2026):\n• البنزين: 53.81 MRU/لتر\n• الغازوال: 48.79 MRU/لتر\n\nالمصدر: قرار حكومي — فبراير 2026`
      : `Gasoline price in Mauritania (February 2026):\n• Gasoline: 53.81 MRU/liter\n• Diesel: 48.79 MRU/liter\n\nSource: Government official price, Feb 2026`;
  }

  if (/diesel|غازوال|gasoil/.test(q)) {
    return ar
      ? `سعر الغازوال في موريتانيا (فبراير 2026):\n• الغازوال: 48.79 MRU/لتر\n• البنزين: 53.81 MRU/لتر\n\nالمصدر: قرار حكومي — فبراير 2026`
      : `Diesel price in Mauritania (February 2026):\n• Diesel: 48.79 MRU/liter\n• Gasoline: 53.81 MRU/liter\n\nSource: Government official price, Feb 2026`;
  }

  // fuel / prices general
  if (/price|cost|how much|rice|sugar|oil|meat|fish|flour|diesel|gasoline|fuel|essence|bread|milk|taxi|سعر|كم|أرز|سكر|زيت|لحم|سمك|دقيق|غازوال|وقود|خبز|حليب/.test(q)) {
    const list = Object.entries(data.MARKET_PRICES).map(([name, v]) =>
      `• ${name}: ${v.nouakchott} MRU/${v.unit} (Nouakchott)${v.nouadhibou ? " | " + v.nouadhibou + " MRU (Nouadhibou)" : ""}${v.note ? " — " + v.note : ""}`
    ).join("\n");
    return ar
      ? `أسعار السوق في موريتانيا (مرجع مارس 2026):\n${list}\n\nالعملة: أوقية موريتانية جديدة (MRU)`
      : `Market prices in Mauritania (March 2026 reference):\n${list}\n\nCurrency: Mauritanian Ouguiya (MRU)`;
  }

  // bac / exam
  if (/bac|baccal|exam|examen|lycee|باكالوريا|بكالوريا|امتحان/.test(q)) {
    const b = data.BAC_INFO;
    return ar
      ? `معلومات الباكالوريا في موريتانيا:\n• موعد الامتحان: ${b.typical_period}\n• التسجيل: ${b.registration_period}\n• النتائج: ${b.results_period}\n• الهاتف: ${b.contact}\n• الموقع: ${b.website}`
      : `Baccalauréat in Mauritania:\n• Exam period: ${b.typical_period}\n• Registration: ${b.registration_period}\n• Results: ${b.results_period}\n• Contact: ${b.contact}\n• Website: ${b.website}`;
  }

  // universities
  if (/universit|college|school|study|education|sup.manage|una|esp|جامعة|كلية|تعليم|دراسة|سوب/.test(q)) {
    const list = data.UNIVERSITIES.map(u =>
      `• ${u.name}${u.website ? " | " + u.website : ""}${u.focus ? " — " + u.focus : ""}`
    ).join("\n");
    return ar
      ? `الجامعات والمعاهد في موريتانيا:\n${list}`
      : `Universities in Mauritania:\n${list}`;
  }

  // banking apps
  if (/bankily|masrvi|sedad|mobile money|banking app|app|تطبيق|دفع|تحويل|موبايل/.test(q)) {
    const list = data.BANKING_APPS.map(a =>
      `• ${a.name} (${a.operator}) — ${a.type}${a.ussd ? " | USSD: " + a.ussd : ""}`
    ).join("\n");
    return ar
      ? `تطبيقات الدفع الإلكتروني في موريتانيا:\n${list}`
      : `Mobile banking apps in Mauritania:\n${list}`;
  }

  // banks
  if (/\bbank\b|البنك|بنك|مصرف/.test(q)) {
    const list = data.BANKS.map(b => `• ${b.name} (${b.type})`).join("\n");
    return ar
      ? `البنوك في موريتانيا:\n${list}`
      : `Banks in Mauritania:\n${list}`;
  }

  // telecom / SIM
  if (/sim|telecom|operator|internet|network|mauritel|mattel|chinguitel|شريحة|إنترنت|مشغل/.test(q)) {
    const list = data.TELECOM_OPERATORS.map(t => `• ${t.name} (${t.coverage})`).join("\n");
    return ar
      ? `مشغلو الاتصالات في موريتانيا:\n${list}`
      : `Telecom operators in Mauritania:\n${list}`;
  }

  // birth certificate
  if (/birth|certificate|civil|état civil|ولادة|شهادة|ميلاد/.test(q)) {
    return ar
      ? `شهادة الميلاد في موريتانيا:\n${data.ADMIN_PROCEDURES.birth_certificate.ar}`
      : `Birth certificate in Mauritania:\n${data.ADMIN_PROCEDURES.birth_certificate.en}`;
  }

  // national ID
  if (/national.?id|identity card|cni|بطاقة.?هوية|هوية وطنية/.test(q)) {
    return ar
      ? `بطاقة الهوية الوطنية:\n${data.ADMIN_PROCEDURES.national_id.ar}`
      : `National ID card:\n${data.ADMIN_PROCEDURES.national_id.en}`;
  }

  // passport
  if (/passport|جواز/.test(q)) {
    return ar
      ? `جواز السفر في موريتانيا:\n${data.ADMIN_PROCEDURES.passport.ar}`
      : `Passport in Mauritania:\n${data.ADMIN_PROCEDURES.passport.en}`;
  }

  // business creation
  if (/business|entreprise|company|creat|register|apme|تجارة|شركة|مؤسسة/.test(q)) {
    return ar
      ? `تأسيس شركة في موريتانيا:\n${data.ADMIN_PROCEDURES.business_creation.ar}`
      : `Start a business in Mauritania:\n${data.ADMIN_PROCEDURES.business_creation.en}`;
  }

  // electricity / water / SOMELEC / SNDE
  if (/electric|somelec|water|snde|كهرباء|ماء|فاتورة/.test(q)) {
    const list = data.PUBLIC_SERVICES.map(s => `• ${s.name}: ${s.phone} — ${s.note}`).join("\n");
    return ar
      ? `خدمات عامة في موريتانيا:\n${list}`
      : `Public services in Mauritania:\n${list}`;
  }

  // currency / exchange
  if (/currency|exchange|dollar|euro|mru|ouguiya|عملة|صرف|دولار/.test(q)) {
    return ar
      ? `العملة الموريتانية: الأوقية الجديدة (MRU)\n• 1 دولار أمريكي ≈ ${data.EXCHANGE_RATES.USD.MRU} MRU\n• 1 يورو ≈ ${data.EXCHANGE_RATES.EUR.MRU} MRU`
      : `Mauritanian currency: Ouguiya (MRU)\n• 1 USD ≈ ${data.EXCHANGE_RATES.USD.MRU} MRU\n• 1 EUR ≈ ${data.EXCHANGE_RATES.EUR.MRU} MRU`;
  }

  // airports
  if (/airport|flight|مطار|رحلة/.test(q)) {
    const list = data.AIRPORTS.map(a => `• ${a.name} (${a.city}) — ${a.code}`).join("\n");
    return ar
      ? `مطارات موريتانيا:\n${list}`
      : `Airports in Mauritania:\n${list}`;
  }

  // greeting
  if (/^(hello|hi|hey|مرحبا|السلام|هلا|كيف)/.test(q)) {
    return ar
      ? `مرحباً! أنا MR-Assistant.\nيمكنني مساعدتك في:\n• المستشفيات وأرقام الطوارئ\n• أسعار الوقود والسوق\n• الجامعات والامتحانات\n• تطبيقات البنوك (Bankily، Masrvi)\n• الإجراءات الإدارية\n\nاسأل بالعربية أو الإنجليزية.`
      : `Hello! I'm MR-Assistant.\nI can help with:\n• Hospitals & emergency numbers\n• Fuel & market prices\n• Universities & exams\n• Banking apps (Bankily, Masrvi)\n• Administrative procedures\n\nAsk in Arabic or English.`;
  }

  // NOT FOUND → demo message
  return ar
    ? `⚠️ هذا السؤال يحتاج إلى الذكاء الاصطناعي (Claude API).\n\nهذه نسخة تجريبية — الـ API غير مفعّل حالياً بسبب عدم توفر رصيد.\n\nيمكنني الإجابة على:\n• أسعار السوق والوقود\n• المستشفيات والصيدليات\n• أرقام الطوارئ\n• الجامعات والباكالوريا\n• تطبيقات البنوك\n• الإجراءات الإدارية`
    : `⚠️ This question requires the Claude AI API.\n\nThis is a demo version — the API is not currently active (no credits).\nIn production, Claude would answer any question about Mauritania.\n\nI can answer right now:\n• Market & fuel prices\n• Hospitals & pharmacies\n• Emergency numbers\n• Universities & BAC exam\n• Banking apps (Bankily, Masrvi)\n• Administrative procedures`;
}

// ── SYSTEM PROMPT ──
function buildSystemPrompt() {
  return `You are MR-Assistant, an AI built exclusively for citizens of Mauritania.
RULES:
- Answer ONLY about Mauritania
- Arabic → full Arabic answer | English → full English answer
- Be concrete: phone numbers, prices in MRU, addresses, steps
- Max 6 lines. No long paragraphs.`;
}

const sessionHistory = new Map();

// Check if question can be answered locally (no API needed)
function hasLocalAnswer(question) {
  const q = question.toLowerCase();
  return /hospital|clinic|doctor|health|sick|pharmac|medicine|drug|emergency|police|fire|urgent|gendarm|price|cost|how much|rice|sugar|oil|meat|fish|flour|diesel|gasoline|fuel|bread|milk|taxi|bac|baccal|exam|universit|college|school|study|sup.manage|una|esp|bankily|masrvi|sedad|mobile money|banking app|app|\bbank\b|telecom|sim|operator|internet|birth|certificate|civil|national.?id|cni|passport|business|entreprise|apme|electric|somelec|water|snde|currency|exchange|dollar|euro|mru|airport|flight|مستشفى|طبيب|عيادة|صحة|مريض|صيدلية|دواء|طوارئ|شرطة|نجدة|إسعاف|حريق|سعر|كم|أرز|سكر|زيت|لحم|سمك|دقيق|غازوال|وقود|خبز|حليب|باكالوريا|بكالوريا|امتحان|جامعة|كلية|تعليم|دراسة|سوب|تطبيق|دفع|تحويل|موبايل|البنك|بنك|مصرف|شريحة|إنترنت|مشغل|ولادة|شهادة|ميلاد|هوية وطنية|بطاقة|جواز|تجارة|شركة|مؤسسة|كهرباء|ماء|فاتورة|عملة|صرف|دولار|مطار|رحلة/.test(q)
    || /^(hello|hi|hey|مرحبا|السلام|هلا|كيف)/.test(q);
}

async function askAssistant(sessionId, userMessage) {

  // STEP 1: Try local data first — fast, no API needed
  if (hasLocalAnswer(userMessage)) {
    return localAnswer(userMessage);
  }

  // STEP 2: Not in local data → try Claude API
  try {
    if (!sessionHistory.has(sessionId)) sessionHistory.set(sessionId, []);
    const history = sessionHistory.get(sessionId);
    history.push({ role: "user", content: userMessage });
    const recentHistory = history.slice(-6);

    const response = await client.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 800,
      system: buildSystemPrompt(),
      messages: recentHistory
    });

    const reply = response.content[0].text;
    history.push({ role: "assistant", content: reply });
    if (sessionHistory.size > 100) sessionHistory.delete(sessionHistory.keys().next().value);
    return reply;

  } catch (err) {
    // API unavailable → demo message
    console.log("[INFO] API unavailable:", err.message?.slice(0, 50));
    const ar = isArabic(userMessage);
    return ar
      ? `⚠️ هذا السؤال يحتاج إلى Claude API.\n\nهذه نسخة تجريبية — الـ API غير مفعّل حالياً.\n\nيمكنني الإجابة على:\n• أسعار السوق والوقود\n• المستشفيات والصيدليات\n• أرقام الطوارئ\n• الجامعات والباكالوريا\n• تطبيقات البنوك\n• الإجراءات الإدارية`
      : `⚠️ This question requires the Claude AI API.\n\nThis is a demo version — API not active (no credits).\nIn production, Claude answers any question about Mauritania.\n\nI can answer right now:\n• Market & fuel prices\n• Hospitals & pharmacies\n• Emergency numbers\n• Universities & BAC exam\n• Banking apps (Bankily, Masrvi)\n• Administrative procedures`;
  }
}

module.exports = { askAssistant };