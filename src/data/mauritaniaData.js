/**
 * mauritaniaData.js — Local OSINT Knowledge Base
 * Everything the AI knows about Mauritania without calling any API.
 * Sources: WFP, OpenStreetMap, public records, March 2026
 */

const COUNTRY_INFO = {
  name: "Islamic Republic of Mauritania",
  capital: "Nouakchott",
  population: 5300000,
  currency: "MRU (Mauritanian Ouguiya)",
  languages: ["Arabic", "Hassaniya", "French"],
  timezone: "UTC+0",
  calling_code: "+222"
};

const REGIONS = [
  { name: "Adrar",              capital: "Atar"          },
  { name: "Assaba",             capital: "Kiffa"         },
  { name: "Brakna",             capital: "Aleg"          },
  { name: "Dakhlet Nouadhibou", capital: "Nouadhibou"    },
  { name: "Gorgol",             capital: "Kaedi"         },
  { name: "Guidimaka",          capital: "Selibaby"      },
  { name: "Hodh Ech Chargui",   capital: "Nema"          },
  { name: "Hodh El Gharbi",     capital: "Ayoun"         },
  { name: "Inchiri",            capital: "Akjoujt"       },
  { name: "Tagant",             capital: "Tidjikja"      },
  { name: "Trarza",             capital: "Rosso"         },
  { name: "Tiris Zemmour",      capital: "Zouerate"      },
  { name: "Nouakchott Nord",    capital: "Dar Naim"      },
  { name: "Nouakchott Ouest",   capital: "Tevragh Zeina" },
  { name: "Nouakchott Sud",     capital: "Riyadh"        }
];

// ── HOSPITALS ──
const HOSPITALS = [
  { name: "Centre Hospitalier National (CHN)", city: "Nouakchott", phone: "+222 45 25 21 35", type: "Public general hospital" },
  { name: "Hopital Cheikh Zayed",              city: "Nouakchott", phone: "+222 45 29 84 98", type: "Specialized" },
  { name: "Centre National de Cardiologie",    city: "Nouakchott", phone: "+222 45 25 25 50", specialty: "Cardiology / أمراض القلب" },
  { name: "Clinique Ibn Sina",                 city: "Nouakchott", phone: "+222 45 25 08 88", type: "Private clinic" },
  { name: "Hopital Mère-Enfant",               city: "Nouakchott", phone: "+222 45 25 10 00", specialty: "Maternity & pediatrics" },
  { name: "Centre de Santé Dar Naim",          city: "Nouakchott", phone: "+222 45 24 11 00", type: "Health center" },
  { name: "Nouadhibou Regional Hospital",      city: "Nouadhibou", phone: "+222 45 74 51 00", type: "Regional hospital" },
  { name: "Hopital de Kiffa",                  city: "Kiffa",      type: "Regional hospital" },
  { name: "Hopital de Rosso",                  city: "Rosso",      type: "Regional hospital" }
];

// ── PHARMACIES ──
const PHARMACIES = [
  { name: "Pharmacie Esalama",        city: "Nouakchott", open24h: true  },
  { name: "Pharmacie Zem Zem",        city: "Nouakchott", open24h: true  },
  { name: "Pharmacie Sahel",          city: "Nouakchott", open24h: true  },
  { name: "Pharmacie Averroes",       city: "Nouakchott", open24h: false },
  { name: "Pharmacie El Ihssane",     city: "Nouakchott", open24h: false },
  { name: "Pharmacie Hopital National", city: "Nouakchott", open24h: false }
];

// ── EMERGENCY ──
const EMERGENCY_CONTACTS = [
  { service: "SAMU — Medical Emergency", service_ar: "النجدة الطبية",   phone: "101" },
  { service: "Police",                   service_ar: "الشرطة",           phone: "117" },
  { service: "Firefighters",             service_ar: "الحماية المدنية",  phone: "118" },
  { service: "Gendarmerie",              service_ar: "الدرك الوطني",     phone: "116" },
  { service: "Ministry of Health",       service_ar: "وزارة الصحة",      phone: "+222 45 25 26 27" }
];

// ── UNIVERSITIES ──
const UNIVERSITIES = [
  {
    name: "Universite de Nouakchott Al Aasriya (UNA)",
    name_ar: "جامعة نواكشوط العصرية",
    city: "Nouakchott",
    website: "una.mr",
    faculties: ["Sciences", "Law", "Letters", "Medicine", "Engineering"]
  },
  {
    name: "Ecole Superieure Polytechnique (ESP)",
    name_ar: "المدرسة العليا متعددة التقنيات",
    city: "Nouakchott",
    focus: "Engineering & Technology"
  },
  {
    name: "SUP'MANAGEMENT",
    name_ar: "سوب مانجمنت",
    city: "Nouakchott",
    website: "supmanagement.mr",
    focus: "Business, Management, Computer Science"
  },
  {
    name: "Institut Superieur de Comptabilite et d'Administration des Entreprises (ISCAE)",
    name_ar: "المعهد العالي للمحاسبة وإدارة المؤسسات",
    city: "Nouakchott",
    focus: "Accounting & Business Administration"
  },
  {
    name: "Universite de Nouadhibou",
    name_ar: "جامعة نواذيبو",
    city: "Nouadhibou"
  }
];

// ── BACCALAURÉAT EXAM INFO ──
const BAC_INFO = {
  exam_name: "Baccalauréat (BAC) / شهادة الباكالوريا",
  organizing_body: "Office du Baccalauréat — Mauritania",
  typical_period: "June–July each year / يونيو–يوليو من كل عام",
  registration_period: "January–February / يناير–فبراير",
  results_period: "August / أغسطس",
  contact: "+222 45 25 00 00",
  website: "education.gov.mr",
  series: ["Série A — Arts & Literature", "Série C — Mathematics", "Série D — Natural Sciences", "Série G — Economics"]
};

// ── CONCOURS & ADMISSIONS ──
const CONCOURS_INFO = {
  esp_entrance: "ESP entrance exam typically in September",
  una_registration: "UNA registration opens in September",
  bourse_nationale: "National scholarship applications: Ministry of Higher Education",
  ministry_contact: "+222 45 25 12 00"
};

// ── BANKS ──
const BANKS = [
  { name: "Banque Centrale de Mauritanie (BCM)",                  type: "Central bank" },
  { name: "Banque Populaire de Mauritanie (BPM)",                 type: "Commercial"   },
  { name: "Attijari Bank Mauritanie",                             type: "Commercial"   },
  { name: "Banque pour le Commerce et l'Industrie (BCI)",         type: "Commercial"   },
  { name: "Banque Al Wava Mauritanienne Islamique (BAMIS)",       type: "Islamic"      },
  { name: "Société Générale Mauritanie",                          type: "Commercial"   },
  { name: "Banque Mauritanienne pour le Commerce International",  type: "Commercial"   },
  { name: "Chinguitt Bank",                                       type: "Islamic"      }
];

// ── MOBILE BANKING APPS ──
const BANKING_APPS = [
  {
    name: "Bankily",
    name_ar: "بانكيلي",
    operator: "Mauritel",
    type: "Mobile Money",
    features: ["Send/receive money", "Pay bills", "Buy credit", "Withdraw at agents"],
    ussd: "*222#"
  },
  {
    name: "Masrvi",
    name_ar: "مصرفي",
    operator: "Mattel",
    type: "Mobile Money",
    features: ["Transfer money", "Pay bills", "Mobile recharge"],
    ussd: "*333#"
  },
  {
    name: "Sedad",
    name_ar: "سداد",
    operator: "BCM",
    type: "Bill Payment Platform",
    features: ["Pay electricity (SOMELEC)", "Pay water (SNDE)", "Pay taxes"]
  }
];

// ── TELECOM ──
const TELECOM_OPERATORS = [
  { name: "Mauritel",   coverage: "National", owner: "Maroc Telecom" },
  { name: "Mattel",     coverage: "National", owner: "Local"         },
  { name: "Chinguitel", coverage: "National", owner: "Sudatel"       }
];

// ── ADMINISTRATIVE PROCEDURES ──
const ADMIN_PROCEDURES = {
  birth_certificate: {
    en: "1. Go to your local commune civil registry\n2. Bring parents' ID cards (CNI)\n3. Fee: ~200 MRU\n4. Processing: 1–3 days",
    ar: "1. توجه إلى السجل المدني في بلديتك\n2. أحضر بطاقات هوية الوالدين\n3. الرسوم: حوالي 200 أوقية\n4. مدة المعالجة: 1-3 أيام"
  },
  national_id: {
    en: "1. Go to ANRPTS office\n2. Bring birth certificate + photos\n3. Fee: ~500 MRU\n4. ANRPTS contact: +222 45 29 10 00",
    ar: "1. توجه إلى مكتب الوكالة الوطنية للسجل السكاني\n2. أحضر شهادة الميلاد + صور شخصية\n3. الرسوم: حوالي 500 أوقية\n4. الهاتف: 00 10 29 45 222+"
  },
  business_creation: {
    en: "1. Contact APME (Business creation agency)\n2. Phone: +222 45 29 47 00\n3. Prepare: ID, business plan, address proof\n4. Processing: 5–10 days",
    ar: "1. تواصل مع وكالة تنمية المؤسسات الصغيرة (APME)\n2. الهاتف: 00 47 29 45 222+\n3. الوثائق: هوية + خطة عمل + عنوان\n4. المدة: 5-10 أيام"
  },
  passport: {
    en: "1. Go to Police Nationale (Direction de la Sûreté)\n2. Bring CNI + birth certificate + 2 photos\n3. Fee: ~3000 MRU\n4. Processing: 2–4 weeks",
    ar: "1. توجه إلى مديرية أمن الدولة\n2. أحضر بطاقة الهوية + شهادة الميلاد + صورتان\n3. الرسوم: حوالي 3000 أوقية\n4. المدة: 2-4 أسابيع"
  }
};

// ── MARKET PRICES (MRU) ──
const MARKET_PRICES = {
  // Food staples
  rice:        { unit: "kg",    nouakchott: 550,  nouadhibou: 540,  note: "Imported rice" },
  sugar:       { unit: "kg",    nouakchott: 400,  nouadhibou: 410  },
  flour:       { unit: "kg",    nouakchott: 450,  nouadhibou: 460  },
  cooking_oil: { unit: "liter", nouakchott: 600,  nouadhibou: 610  },
  fish:        { unit: "kg",    nouakchott: 800,  nouadhibou: 600,  note: "Cheaper in coastal Nouadhibou" },
  meat:        { unit: "kg",    nouakchott: 3000, nouadhibou: 2900 },
  bread:       { unit: "loaf",  nouakchott: 50,   nouadhibou: 50   },
  milk:        { unit: "liter", nouakchott: 350,  nouadhibou: 360  },
  eggs:        { unit: "dozen", nouakchott: 600,  nouadhibou: 620  },
  tomatoes:    { unit: "kg",    nouakchott: 200,  nouadhibou: 220  },
  onions:      { unit: "kg",    nouakchott: 150,  nouadhibou: 160  },
  // Fuel
  diesel:      { unit: "liter", nouakchott: 48.79, nouadhibou: 48.79, note: "Official price since Feb 2026" },
  gasoline:    { unit: "liter", nouakchott: 53.81, nouadhibou: 53.81, note: "Official price since Feb 2026" },
  // Transport
  taxi_city:   { unit: "ride",  nouakchott: 100,  note: "Shared taxi within city" },
  bus_city:    { unit: "ride",  nouakchott: 30,   note: "City bus" }
};

// ── EXCHANGE RATES ──
const EXCHANGE_RATES = {
  USD: { MRU: 39.90, date: "2026-01" },
  EUR: { MRU: 43.50, date: "2026-01" },
  XOF: { MRU: 0.066, note: "West African CFA franc" }
};

// ── AIRPORTS ──
const AIRPORTS = [
  { name: "Nouakchott Oumtounsy International Airport", city: "Nouakchott", code: "NKC" },
  { name: "Nouadhibou International Airport",           city: "Nouadhibou", code: "NDB" },
  { name: "Atar Airport",                               city: "Atar",       code: "ATR" }
];

// ── USEFUL PUBLIC SERVICES ──
const PUBLIC_SERVICES = [
  { name: "SOMELEC (Electricity)",  phone: "+222 45 25 26 62", note: "Report outages, check bills" },
  { name: "SNDE (Water)",           phone: "+222 45 25 20 90", note: "Water supply & bills"         },
  { name: "MAURIPOST (Post)",       phone: "+222 45 25 25 35", note: "Postal services"              },
  { name: "ANRPTS (Civil Registry)",phone: "+222 45 29 10 00", note: "ID cards, civil status"       },
  { name: "APME (Business)",        phone: "+222 45 29 47 00", note: "Create/register a business"   }
];

module.exports = {
  COUNTRY_INFO,
  REGIONS,
  HOSPITALS,
  PHARMACIES,
  EMERGENCY_CONTACTS,
  UNIVERSITIES,
  BAC_INFO,
  CONCOURS_INFO,
  BANKS,
  BANKING_APPS,
  TELECOM_OPERATORS,
  ADMIN_PROCEDURES,
  MARKET_PRICES,
  EXCHANGE_RATES,
  AIRPORTS,
  PUBLIC_SERVICES
};