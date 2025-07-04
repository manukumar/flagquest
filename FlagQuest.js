//FlagQuest

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Game state
let player = {
  name: "",
  score: 0,
  totalQuestions: 0,
  streak: 0,
  bestStreak: 0,
  questionsPerRound: 10,
  currentQuestion: 0
};

let gameRunning = true;
let currentRoundFlags = [];

// Flag data with country codes and information
const flags = [
  // North America
  {
    country: "United States",
    code: "US",
    flag: "🇺🇸",
    region: "North America",
    capital: "Washington D.C.",
    population: "331 million"
  },
  {
    country: "Canada",
    code: "CA",
    flag: "🇨🇦",
    region: "North America",
    capital: "Ottawa",
    population: "38 million"
  },
  {
    country: "Mexico",
    code: "MX",
    flag: "🇲🇽",
    region: "North America",
    capital: "Mexico City",
    population: "129 million"
  },
  {
    country: "Cuba",
    code: "CU",
    flag: "🇨🇺",
    region: "North America",
    capital: "Havana",
    population: "11 million"
  },
  {
    country: "Jamaica",
    code: "JM",
    flag: "🇯🇲",
    region: "North America",
    capital: "Kingston",
    population: "3 million"
  },
  {
    country: "Haiti",
    code: "HT",
    flag: "🇭🇹",
    region: "North America",
    capital: "Port-au-Prince",
    population: "11 million"
  },
  {
    country: "Dominican Republic",
    code: "DO",
    flag: "🇩🇴",
    region: "North America",
    capital: "Santo Domingo",
    population: "11 million"
  },
  {
    country: "Puerto Rico",
    code: "PR",
    flag: "🇵🇷",
    region: "North America",
    capital: "San Juan",
    population: "3 million"
  },
  {
    country: "Trinidad and Tobago",
    code: "TT",
    flag: "🇹🇹",
    region: "North America",
    capital: "Port of Spain",
    population: "1.4 million"
  },
  {
    country: "Barbados",
    code: "BB",
    flag: "🇧🇧",
    region: "North America",
    capital: "Bridgetown",
    population: "287 thousand"
  },
  {
    country: "Bahamas",
    code: "BS",
    flag: "🇧🇸",
    region: "North America",
    capital: "Nassau",
    population: "393 thousand"
  },
  {
    country: "Belize",
    code: "BZ",
    flag: "🇧🇿",
    region: "North America",
    capital: "Belmopan",
    population: "397 thousand"
  },
  {
    country: "Guatemala",
    code: "GT",
    flag: "🇬🇹",
    region: "North America",
    capital: "Guatemala City",
    population: "18 million"
  },
  {
    country: "Honduras",
    code: "HN",
    flag: "🇭🇳",
    region: "North America",
    capital: "Tegucigalpa",
    population: "10 million"
  },
  {
    country: "El Salvador",
    code: "SV",
    flag: "🇸🇻",
    region: "North America",
    capital: "San Salvador",
    population: "6.5 million"
  },
  {
    country: "Nicaragua",
    code: "NI",
    flag: "🇳🇮",
    region: "North America",
    capital: "Managua",
    population: "6.6 million"
  },
  {
    country: "Costa Rica",
    code: "CR",
    flag: "🇨🇷",
    region: "North America",
    capital: "San José",
    population: "5.1 million"
  },
  {
    country: "Panama",
    code: "PA",
    flag: "🇵🇦",
    region: "North America",
    capital: "Panama City",
    population: "4.3 million"
  },

  // South America
  {
    country: "Brazil",
    code: "BR",
    flag: "🇧🇷",
    region: "South America",
    capital: "Brasília",
    population: "213 million"
  },
  {
    country: "Argentina",
    code: "AR",
    flag: "🇦🇷",
    region: "South America",
    capital: "Buenos Aires",
    population: "45 million"
  },
  {
    country: "Chile",
    code: "CL",
    flag: "🇨🇱",
    region: "South America",
    capital: "Santiago",
    population: "19 million"
  },
  {
    country: "Colombia",
    code: "CO",
    flag: "🇨🇴",
    region: "South America",
    capital: "Bogotá",
    population: "51 million"
  },
  {
    country: "Peru",
    code: "PE",
    flag: "🇵🇪",
    region: "South America",
    capital: "Lima",
    population: "33 million"
  },
  {
    country: "Ecuador",
    code: "EC",
    flag: "🇪🇨",
    region: "South America",
    capital: "Quito",
    population: "18 million"
  },
  {
    country: "Venezuela",
    code: "VE",
    flag: "🇻🇪",
    region: "South America",
    capital: "Caracas",
    population: "28 million"
  },
  {
    country: "Bolivia",
    code: "BO",
    flag: "🇧🇴",
    region: "South America",
    capital: "La Paz",
    population: "12 million"
  },
  {
    country: "Paraguay",
    code: "PY",
    flag: "🇵🇾",
    region: "South America",
    capital: "Asunción",
    population: "7.1 million"
  },
  {
    country: "Uruguay",
    code: "UY",
    flag: "🇺🇾",
    region: "South America",
    capital: "Montevideo",
    population: "3.5 million"
  },
  {
    country: "Guyana",
    code: "GY",
    flag: "🇬🇾",
    region: "South America",
    capital: "Georgetown",
    population: "787 thousand"
  },
  {
    country: "Suriname",
    code: "SR",
    flag: "🇸🇷",
    region: "South America",
    capital: "Paramaribo",
    population: "591 thousand"
  },

  // Europe
  {
    country: "United Kingdom",
    code: "UK",
    flag: "🇬🇧",
    region: "Europe",
    capital: "London",
    population: "67 million"
  },
  {
    country: "Germany",
    code: "DE",
    flag: "🇩🇪",
    region: "Europe",
    capital: "Berlin",
    population: "83 million"
  },
  {
    country: "France",
    code: "FR",
    flag: "🇫🇷",
    region: "Europe",
    capital: "Paris",
    population: "67 million"
  },
  {
    country: "Italy",
    code: "IT",
    flag: "🇮🇹",
    region: "Europe",
    capital: "Rome",
    population: "60 million"
  },
  {
    country: "Spain",
    code: "ES",
    flag: "🇪🇸",
    region: "Europe",
    capital: "Madrid",
    population: "47 million"
  },
  {
    country: "Netherlands",
    code: "NL",
    flag: "🇳🇱",
    region: "Europe",
    capital: "Amsterdam",
    population: "17 million"
  },
  {
    country: "Sweden",
    code: "SE",
    flag: "🇸🇪",
    region: "Europe",
    capital: "Stockholm",
    population: "10 million"
  },
  {
    country: "Norway",
    code: "NO",
    flag: "🇳🇴",
    region: "Europe",
    capital: "Oslo",
    population: "5 million"
  },
  {
    country: "Denmark",
    code: "DK",
    flag: "🇩🇰",
    region: "Europe",
    capital: "Copenhagen",
    population: "6 million"
  },
  {
    country: "Finland",
    code: "FI",
    flag: "🇫🇮",
    region: "Europe",
    capital: "Helsinki",
    population: "5 million"
  },
  {
    country: "Switzerland",
    code: "CH",
    flag: "🇨🇭",
    region: "Europe",
    capital: "Bern",
    population: "8 million"
  },
  {
    country: "Poland",
    code: "PL",
    flag: "🇵🇱",
    region: "Europe",
    capital: "Warsaw",
    population: "38 million"
  },
  {
    country: "Czech Republic",
    code: "CZ",
    flag: "🇨🇿",
    region: "Europe",
    capital: "Prague",
    population: "10 million"
  },
  {
    country: "Hungary",
    code: "HU",
    flag: "🇭🇺",
    region: "Europe",
    capital: "Budapest",
    population: "10 million"
  },
  {
    country: "Austria",
    code: "AT",
    flag: "🇦🇹",
    region: "Europe",
    capital: "Vienna",
    population: "9 million"
  },
  {
    country: "Belgium",
    code: "BE",
    flag: "🇧🇪",
    region: "Europe",
    capital: "Brussels",
    population: "11 million"
  },
  {
    country: "Portugal",
    code: "PT",
    flag: "🇵🇹",
    region: "Europe",
    capital: "Lisbon",
    population: "10 million"
  },
  {
    country: "Greece",
    code: "GR",
    flag: "🇬🇷",
    region: "Europe",
    capital: "Athens",
    population: "11 million"
  },
  {
    country: "Ireland",
    code: "IE",
    flag: "🇮🇪",
    region: "Europe",
    capital: "Dublin",
    population: "5 million"
  },
  {
    country: "Iceland",
    code: "IS",
    flag: "🇮🇸",
    region: "Europe",
    capital: "Reykjavik",
    population: "364 thousand"
  },
  {
    country: "Luxembourg",
    code: "LU",
    flag: "🇱🇺",
    region: "Europe",
    capital: "Luxembourg City",
    population: "626 thousand"
  },
  {
    country: "Estonia",
    code: "EE",
    flag: "🇪🇪",
    region: "Europe",
    capital: "Tallinn",
    population: "1 million"
  },
  {
    country: "Latvia",
    code: "LV",
    flag: "🇱🇻",
    region: "Europe",
    capital: "Riga",
    population: "2 million"
  },
  {
    country: "Lithuania",
    code: "LT",
    flag: "🇱🇹",
    region: "Europe",
    capital: "Vilnius",
    population: "3 million"
  },
  {
    country: "Slovenia",
    code: "SI",
    flag: "🇸🇮",
    region: "Europe",
    capital: "Ljubljana",
    population: "2 million"
  },
  {
    country: "Croatia",
    code: "HR",
    flag: "🇭🇷",
    region: "Europe",
    capital: "Zagreb",
    population: "4 million"
  },
  {
    country: "Serbia",
    code: "RS",
    flag: "🇷🇸",
    region: "Europe",
    capital: "Belgrade",
    population: "7 million"
  },
  {
    country: "Bosnia and Herzegovina",
    code: "BA",
    flag: "🇧🇦",
    region: "Europe",
    capital: "Sarajevo",
    population: "3 million"
  },
  {
    country: "Montenegro",
    code: "ME",
    flag: "🇲🇪",
    region: "Europe",
    capital: "Podgorica",
    population: "621 thousand"
  },
  {
    country: "North Macedonia",
    code: "MK",
    flag: "🇲🇰",
    region: "Europe",
    capital: "Skopje",
    population: "2 million"
  },
  {
    country: "Albania",
    code: "AL",
    flag: "🇦🇱",
    region: "Europe",
    capital: "Tirana",
    population: "3 million"
  },
  {
    country: "Bulgaria",
    code: "BG",
    flag: "🇧🇬",
    region: "Europe",
    capital: "Sofia",
    population: "7 million"
  },
  {
    country: "Romania",
    code: "RO",
    flag: "🇷🇴",
    region: "Europe",
    capital: "Bucharest",
    population: "19 million"
  },
  {
    country: "Slovakia",
    code: "SK",
    flag: "🇸🇰",
    region: "Europe",
    capital: "Bratislava",
    population: "5 million"
  },
  {
    country: "Ukraine",
    code: "UA",
    flag: "🇺🇦",
    region: "Europe",
    capital: "Kyiv",
    population: "44 million"
  },
  {
    country: "Belarus",
    code: "BY",
    flag: "🇧🇾",
    region: "Europe",
    capital: "Minsk",
    population: "9 million"
  },
  {
    country: "Moldova",
    code: "MD",
    flag: "🇲🇩",
    region: "Europe",
    capital: "Chișinău",
    population: "3 million"
  },
  {
    country: "Russia",
    code: "RU",
    flag: "🇷🇺",
    region: "Europe/Asia",
    capital: "Moscow",
    population: "144 million"
  },
  {
    country: "Turkey",
    code: "TR",
    flag: "🇹🇷",
    region: "Europe/Asia",
    capital: "Ankara",
    population: "84 million"
  },
  {
    country: "Cyprus",
    code: "CY",
    flag: "🇨🇾",
    region: "Europe",
    capital: "Nicosia",
    population: "1.2 million"
  },
  {
    country: "Malta",
    code: "MT",
    flag: "🇲🇹",
    region: "Europe",
    capital: "Valletta",
    population: "514 thousand"
  },

  // Asia
  {
    country: "Japan",
    code: "JP",
    flag: "🇯🇵",
    region: "Asia",
    capital: "Tokyo",
    population: "126 million"
  },
  {
    country: "China",
    code: "CN",
    flag: "🇨🇳",
    region: "Asia",
    capital: "Beijing",
    population: "1.4 billion"
  },
  {
    country: "India",
    code: "IN",
    flag: "🇮🇳",
    region: "Asia",
    capital: "New Delhi",
    population: "1.4 billion"
  },
  {
    country: "South Korea",
    code: "KR",
    flag: "🇰🇷",
    region: "Asia",
    capital: "Seoul",
    population: "51 million"
  },
  {
    country: "Thailand",
    code: "TH",
    flag: "🇹🇭",
    region: "Asia",
    capital: "Bangkok",
    population: "70 million"
  },
  {
    country: "Vietnam",
    code: "VN",
    flag: "🇻🇳",
    region: "Asia",
    capital: "Hanoi",
    population: "97 million"
  },
  {
    country: "Singapore",
    code: "SG",
    flag: "🇸🇬",
    region: "Asia",
    capital: "Singapore",
    population: "5 million"
  },
  {
    country: "Malaysia",
    code: "MY",
    flag: "🇲🇾",
    region: "Asia",
    capital: "Kuala Lumpur",
    population: "32 million"
  },
  {
    country: "Indonesia",
    code: "ID",
    flag: "🇮🇩",
    region: "Asia",
    capital: "Jakarta",
    population: "273 million"
  },
  {
    country: "Philippines",
    code: "PH",
    flag: "🇵🇭",
    region: "Asia",
    capital: "Manila",
    population: "109 million"
  },
  {
    country: "Cambodia",
    code: "KH",
    flag: "🇰🇭",
    region: "Asia",
    capital: "Phnom Penh",
    population: "17 million"
  },
  {
    country: "Laos",
    code: "LA",
    flag: "🇱🇦",
    region: "Asia",
    capital: "Vientiane",
    population: "7 million"
  },
  {
    country: "Myanmar",
    code: "MM",
    flag: "🇲🇲",
    region: "Asia",
    capital: "Naypyidaw",
    population: "54 million"
  },
  {
    country: "Brunei",
    code: "BN",
    flag: "🇧🇳",
    region: "Asia",
    capital: "Bandar Seri Begawan",
    population: "437 thousand"
  },
  {
    country: "East Timor",
    code: "TL",
    flag: "🇹🇱",
    region: "Asia",
    capital: "Dili",
    population: "1.3 million"
  },
  {
    country: "Mongolia",
    code: "MN",
    flag: "🇲🇳",
    region: "Asia",
    capital: "Ulaanbaatar",
    population: "3 million"
  },
  {
    country: "Kazakhstan",
    code: "KZ",
    flag: "🇰🇿",
    region: "Asia",
    capital: "Nur-Sultan",
    population: "19 million"
  },
  {
    country: "Uzbekistan",
    code: "UZ",
    flag: "🇺🇿",
    region: "Asia",
    capital: "Tashkent",
    population: "34 million"
  },
  {
    country: "Kyrgyzstan",
    code: "KG",
    flag: "🇰🇬",
    region: "Asia",
    capital: "Bishkek",
    population: "6 million"
  },
  {
    country: "Tajikistan",
    code: "TJ",
    flag: "🇹🇯",
    region: "Asia",
    capital: "Dushanbe",
    population: "9 million"
  },
  {
    country: "Turkmenistan",
    code: "TM",
    flag: "🇹🇲",
    region: "Asia",
    capital: "Ashgabat",
    population: "6 million"
  },
  {
    country: "Afghanistan",
    code: "AF",
    flag: "🇦🇫",
    region: "Asia",
    capital: "Kabul",
    population: "38 million"
  },
  {
    country: "Pakistan",
    code: "PK",
    flag: "🇵🇰",
    region: "Asia",
    capital: "Islamabad",
    population: "220 million"
  },
  {
    country: "Bangladesh",
    code: "BD",
    flag: "🇧🇩",
    region: "Asia",
    capital: "Dhaka",
    population: "165 million"
  },
  {
    country: "Sri Lanka",
    code: "LK",
    flag: "🇱🇰",
    region: "Asia",
    capital: "Colombo",
    population: "21 million"
  },
  {
    country: "Nepal",
    code: "NP",
    flag: "🇳🇵",
    region: "Asia",
    capital: "Kathmandu",
    population: "29 million"
  },
  {
    country: "Bhutan",
    code: "BT",
    flag: "🇧🇹",
    region: "Asia",
    capital: "Thimphu",
    population: "771 thousand"
  },
  {
    country: "Maldives",
    code: "MV",
    flag: "🇲🇻",
    region: "Asia",
    capital: "Male",
    population: "540 thousand"
  },
  {
    country: "Iran",
    code: "IR",
    flag: "🇮🇷",
    region: "Asia",
    capital: "Tehran",
    population: "84 million"
  },
  {
    country: "Iraq",
    code: "IQ",
    flag: "🇮🇶",
    region: "Asia",
    capital: "Baghdad",
    population: "40 million"
  },
  {
    country: "Syria",
    code: "SY",
    flag: "🇸🇾",
    region: "Asia",
    capital: "Damascus",
    population: "17 million"
  },
  {
    country: "Lebanon",
    code: "LB",
    flag: "🇱🇧",
    region: "Asia",
    capital: "Beirut",
    population: "7 million"
  },
  {
    country: "Jordan",
    code: "JO",
    flag: "🇯🇴",
    region: "Asia",
    capital: "Amman",
    population: "10 million"
  },
  {
    country: "Israel",
    code: "IL",
    flag: "🇮🇱",
    region: "Asia",
    capital: "Jerusalem",
    population: "9 million"
  },
  {
    country: "Palestine",
    code: "PS",
    flag: "🇵🇸",
    region: "Asia",
    capital: "East Jerusalem",
    population: "5 million"
  },
  {
    country: "Saudi Arabia",
    code: "SA",
    flag: "🇸🇦",
    region: "Asia",
    capital: "Riyadh",
    population: "35 million"
  },
  {
    country: "Yemen",
    code: "YE",
    flag: "🇾🇪",
    region: "Asia",
    capital: "Sana'a",
    population: "30 million"
  },
  {
    country: "Oman",
    code: "OM",
    flag: "🇴🇲",
    region: "Asia",
    capital: "Muscat",
    population: "5 million"
  },
  {
    country: "United Arab Emirates",
    code: "AE",
    flag: "🇦🇪",
    region: "Asia",
    capital: "Abu Dhabi",
    population: "10 million"
  },
  {
    country: "Qatar",
    code: "QA",
    flag: "🇶🇦",
    region: "Asia",
    capital: "Doha",
    population: "2.9 million"
  },
  {
    country: "Kuwait",
    code: "KW",
    flag: "🇰🇼",
    region: "Asia",
    capital: "Kuwait City",
    population: "4.3 million"
  },
  {
    country: "Bahrain",
    code: "BH",
    flag: "🇧🇭",
    region: "Asia",
    capital: "Manama",
    population: "1.7 million"
  },
  {
    country: "Georgia",
    code: "GE",
    flag: "🇬🇪",
    region: "Asia",
    capital: "Tbilisi",
    population: "4 million"
  },
  {
    country: "Armenia",
    code: "AM",
    flag: "🇦🇲",
    region: "Asia",
    capital: "Yerevan",
    population: "3 million"
  },
  {
    country: "Azerbaijan",
    code: "AZ",
    flag: "🇦🇿",
    region: "Asia",
    capital: "Baku",
    population: "10 million"
  },

  // Africa
  {
    country: "South Africa",
    code: "ZA",
    flag: "🇿🇦",
    region: "Africa",
    capital: "Pretoria",
    population: "59 million"
  },
  {
    country: "Egypt",
    code: "EG",
    flag: "🇪🇬",
    region: "Africa",
    capital: "Cairo",
    population: "104 million"
  },
  {
    country: "Nigeria",
    code: "NG",
    flag: "🇳🇬",
    region: "Africa",
    capital: "Abuja",
    population: "206 million"
  },
  {
    country: "Kenya",
    code: "KE",
    flag: "🇰🇪",
    region: "Africa",
    capital: "Nairobi",
    population: "54 million"
  },
  {
    country: "Morocco",
    code: "MA",
    flag: "🇲🇦",
    region: "Africa",
    capital: "Rabat",
    population: "37 million"
  },
  {
    country: "Algeria",
    code: "DZ",
    flag: "🇩🇿",
    region: "Africa",
    capital: "Algiers",
    population: "44 million"
  },
  {
    country: "Tunisia",
    code: "TN",
    flag: "🇹🇳",
    region: "Africa",
    capital: "Tunis",
    population: "12 million"
  },
  {
    country: "Libya",
    code: "LY",
    flag: "🇱🇾",
    region: "Africa",
    capital: "Tripoli",
    population: "7 million"
  },
  {
    country: "Sudan",
    code: "SD",
    flag: "🇸🇩",
    region: "Africa",
    capital: "Khartoum",
    population: "44 million"
  },
  {
    country: "South Sudan",
    code: "SS",
    flag: "🇸🇸",
    region: "Africa",
    capital: "Juba",
    population: "11 million"
  },
  {
    country: "Ethiopia",
    code: "ET",
    flag: "🇪🇹",
    region: "Africa",
    capital: "Addis Ababa",
    population: "115 million"
  },
  {
    country: "Somalia",
    code: "SO",
    flag: "🇸🇴",
    region: "Africa",
    capital: "Mogadishu",
    population: "16 million"
  },
  {
    country: "Djibouti",
    code: "DJ",
    flag: "🇩🇯",
    region: "Africa",
    capital: "Djibouti",
    population: "988 thousand"
  },
  {
    country: "Eritrea",
    code: "ER",
    flag: "🇪🇷",
    region: "Africa",
    capital: "Asmara",
    population: "3.5 million"
  },
  {
    country: "Uganda",
    code: "UG",
    flag: "🇺🇬",
    region: "Africa",
    capital: "Kampala",
    population: "46 million"
  },
  {
    country: "Tanzania",
    code: "TZ",
    flag: "🇹🇿",
    region: "Africa",
    capital: "Dodoma",
    population: "60 million"
  },
  {
    country: "Rwanda",
    code: "RW",
    flag: "🇷🇼",
    region: "Africa",
    capital: "Kigali",
    population: "13 million"
  },
  {
    country: "Burundi",
    code: "BI",
    flag: "🇧🇮",
    region: "Africa",
    capital: "Gitega",
    population: "12 million"
  },
  {
    country: "Democratic Republic of the Congo",
    code: "CD",
    flag: "🇨🇩",
    region: "Africa",
    capital: "Kinshasa",
    population: "89 million"
  },
  {
    country: "Republic of the Congo",
    code: "CG",
    flag: "🇨🇬",
    region: "Africa",
    capital: "Brazzaville",
    population: "5.5 million"
  },
  {
    country: "Central African Republic",
    code: "CF",
    flag: "🇨🇫",
    region: "Africa",
    capital: "Bangui",
    population: "5 million"
  },
  {
    country: "Cameroon",
    code: "CM",
    flag: "🇨🇲",
    region: "Africa",
    capital: "Yaoundé",
    population: "27 million"
  },
  {
    country: "Chad",
    code: "TD",
    flag: "🇹🇩",
    region: "Africa",
    capital: "N'Djamena",
    population: "16 million"
  },
  {
    country: "Niger",
    code: "NE",
    flag: "🇳🇪",
    region: "Africa",
    capital: "Niamey",
    population: "24 million"
  },
  {
    country: "Mali",
    code: "ML",
    flag: "🇲🇱",
    region: "Africa",
    capital: "Bamako",
    population: "20 million"
  },
  {
    country: "Burkina Faso",
    code: "BF",
    flag: "🇧🇫",
    region: "Africa",
    capital: "Ouagadougou",
    population: "21 million"
  },
  {
    country: "Senegal",
    code: "SN",
    flag: "🇸🇳",
    region: "Africa",
    capital: "Dakar",
    population: "17 million"
  },
  {
    country: "Gambia",
    code: "GM",
    flag: "🇬🇲",
    region: "Africa",
    capital: "Banjul",
    population: "2.4 million"
  },
  {
    country: "Guinea-Bissau",
    code: "GW",
    flag: "🇬🇼",
    region: "Africa",
    capital: "Bissau",
    population: "2 million"
  },
  {
    country: "Guinea",
    code: "GN",
    flag: "🇬🇳",
    region: "Africa",
    capital: "Conakry",
    population: "13 million"
  },
  {
    country: "Sierra Leone",
    code: "SL",
    flag: "🇸🇱",
    region: "Africa",
    capital: "Freetown",
    population: "8 million"
  },
  {
    country: "Liberia",
    code: "LR",
    flag: "🇱🇷",
    region: "Africa",
    capital: "Monrovia",
    population: "5 million"
  },
  {
    country: "Ivory Coast",
    code: "CI",
    flag: "🇨🇮",
    region: "Africa",
    capital: "Yamoussoukro",
    population: "26 million"
  },
  {
    country: "Ghana",
    code: "GH",
    flag: "🇬🇭",
    region: "Africa",
    capital: "Accra",
    population: "31 million"
  },
  {
    country: "Togo",
    code: "TG",
    flag: "🇹🇬",
    region: "Africa",
    capital: "Lomé",
    population: "8 million"
  },
  {
    country: "Benin",
    code: "BJ",
    flag: "🇧🇯",
    region: "Africa",
    capital: "Porto-Novo",
    population: "12 million"
  },
  {
    country: "Mauritania",
    code: "MR",
    flag: "🇲🇷",
    region: "Africa",
    capital: "Nouakchott",
    population: "4.6 million"
  },
  {
    country: "Mauritius",
    code: "MU",
    flag: "🇲🇺",
    region: "Africa",
    capital: "Port Louis",
    population: "1.3 million"
  },
  {
    country: "Seychelles",
    code: "SC",
    flag: "🇸🇨",
    region: "Africa",
    capital: "Victoria",
    population: "98 thousand"
  },
  {
    country: "Comoros",
    code: "KM",
    flag: "🇰🇲",
    region: "Africa",
    capital: "Moroni",
    population: "869 thousand"
  },
  {
    country: "Madagascar",
    code: "MG",
    flag: "🇲🇬",
    region: "Africa",
    capital: "Antananarivo",
    population: "28 million"
  },
  {
    country: "Malawi",
    code: "MW",
    flag: "🇲🇼",
    region: "Africa",
    capital: "Lilongwe",
    population: "19 million"
  },
  {
    country: "Zambia",
    code: "ZM",
    flag: "🇿🇲",
    region: "Africa",
    capital: "Lusaka",
    population: "18 million"
  },
  {
    country: "Zimbabwe",
    code: "ZW",
    flag: "🇿🇼",
    region: "Africa",
    capital: "Harare",
    population: "15 million"
  },
  {
    country: "Botswana",
    code: "BW",
    flag: "🇧🇼",
    region: "Africa",
    capital: "Gaborone",
    population: "2.4 million"
  },
  {
    country: "Namibia",
    code: "NA",
    flag: "🇳🇦",
    region: "Africa",
    capital: "Windhoek",
    population: "2.5 million"
  },
  {
    country: "Angola",
    code: "AO",
    flag: "🇦🇴",
    region: "Africa",
    capital: "Luanda",
    population: "33 million"
  },
  {
    country: "Mozambique",
    code: "MZ",
    flag: "🇲🇿",
    region: "Africa",
    capital: "Maputo",
    population: "31 million"
  },
  {
    country: "Eswatini",
    code: "SZ",
    flag: "🇸🇿",
    region: "Africa",
    capital: "Mbabane",
    population: "1.2 million"
  },
  {
    country: "Lesotho",
    code: "LS",
    flag: "🇱🇸",
    region: "Africa",
    capital: "Maseru",
    population: "2.1 million"
  },
  {
    country: "Cape Verde",
    code: "CV",
    flag: "🇨🇻",
    region: "Africa",
    capital: "Praia",
    population: "556 thousand"
  },
  {
    country: "São Tomé and Príncipe",
    code: "ST",
    flag: "🇸🇹",
    region: "Africa",
    capital: "São Tomé",
    population: "219 thousand"
  },
  {
    country: "Equatorial Guinea",
    code: "GQ",
    flag: "🇬🇶",
    region: "Africa",
    capital: "Malabo",
    population: "1.4 million"
  },
  {
    country: "Gabon",
    code: "GA",
    flag: "🇬🇦",
    region: "Africa",
    capital: "Libreville",
    population: "2.2 million"
  },

  // Oceania
  {
    country: "Australia",
    code: "AU",
    flag: "🇦🇺",
    region: "Oceania",
    capital: "Canberra",
    population: "25 million"
  },
  {
    country: "New Zealand",
    code: "NZ",
    flag: "🇳🇿",
    region: "Oceania",
    capital: "Wellington",
    population: "5 million"
  },
  {
    country: "Papua New Guinea",
    code: "PG",
    flag: "🇵🇬",
    region: "Oceania",
    capital: "Port Moresby",
    population: "9 million"
  },
  {
    country: "Fiji",
    code: "FJ",
    flag: "🇫🇯",
    region: "Oceania",
    capital: "Suva",
    population: "896 thousand"
  },
  {
    country: "Solomon Islands",
    code: "SB",
    flag: "🇸🇧",
    region: "Oceania",
    capital: "Honiara",
    population: "686 thousand"
  },
  {
    country: "Vanuatu",
    code: "VU",
    flag: "🇻🇺",
    region: "Oceania",
    capital: "Port Vila",
    population: "307 thousand"
  },
  {
    country: "New Caledonia",
    code: "NC",
    flag: "🇳🇨",
    region: "Oceania",
    capital: "Nouméa",
    population: "285 thousand"
  },
  {
    country: "Samoa",
    code: "WS",
    flag: "🇼🇸",
    region: "Oceania",
    capital: "Apia",
    population: "198 thousand"
  },
  {
    country: "Tonga",
    code: "TO",
    flag: "🇹🇴",
    region: "Oceania",
    capital: "Nuku'alofa",
    population: "105 thousand"
  },
  {
    country: "Kiribati",
    code: "KI",
    flag: "🇰🇮",
    region: "Oceania",
    capital: "South Tarawa",
    population: "119 thousand"
  },
  {
    country: "Tuvalu",
    code: "TV",
    flag: "🇹🇻",
    region: "Oceania",
    capital: "Funafuti",
    population: "12 thousand"
  },
  {
    country: "Nauru",
    code: "NR",
    flag: "🇳🇷",
    region: "Oceania",
    capital: "Yaren",
    population: "11 thousand"
  },
  {
    country: "Palau",
    code: "PW",
    flag: "🇵🇼",
    region: "Oceania",
    capital: "Ngerulmud",
    population: "18 thousand"
  },
  {
    country: "Marshall Islands",
    code: "MH",
    flag: "🇲🇭",
    region: "Oceania",
    capital: "Majuro",
    population: "59 thousand"
  },
  {
    country: "Micronesia",
    code: "FM",
    flag: "🇫🇲",
    region: "Oceania",
    capital: "Palikir",
    population: "115 thousand"
  }
];

// Game functions
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getRandomOptions(correctFlag, count = 4) {
  const allFlags = flags.filter(flag => flag.country !== correctFlag.country);
  const shuffled = shuffleArray(allFlags);
  const options = [correctFlag, ...shuffled.slice(0, count - 1)];
  return shuffleArray(options);
}

function createFlagArt(countryCode) {
  // Create a simple ASCII flag representation
  const flagArt = [
    `┌─────────────────┐`,
    `│                 │`,
    `│     [${countryCode}]      │`,
    `│                 │`,
    `│   FLAG DISPLAY  │`,
    `│                 │`,
    `└─────────────────┘`
  ];
  return flagArt;
}

function displayFlag(flag) {
  console.log(`\n🏁 FLAG QUEST 🏁`);
  console.log(`\n${'='.repeat(50)}`);
  
  // Try to display emoji first, fallback to ASCII art
  try {
    console.log(`\n${flag.flag}  ${flag.flag}  ${flag.flag}  ${flag.flag}  ${flag.flag}`);
  } catch (e) {
    // If emoji fails, use ASCII art
    const flagArt = createFlagArt(flag.code);
    flagArt.forEach(line => console.log(line));
  }
  
  console.log(`\nWhich country does this flag belong to?`);
  console.log(`\n📊 Your Score: ${player.score}/${player.totalQuestions} | Streak: ${player.streak} | Best: ${player.bestStreak}`);
  console.log(`\n${'='.repeat(50)}`);
}

function displayOptions(options) {
  options.forEach((option, index) => {
    console.log(`${index + 1}. ${option.country} (${option.code})`);
  });
  console.log(`\nEnter your choice (1-${options.length}):`);
}

function showCorrectAnswer(correctFlag) {
  console.log(`\n✅ Correct! This is the flag of ${correctFlag.country}!`);
  console.log(`📍 Capital: ${correctFlag.capital}`);
  console.log(`🌍 Region: ${correctFlag.region}`);
  console.log(`👥 Population: ${correctFlag.population}`);
}

function showIncorrectAnswer(correctFlag, userChoice) {
  console.log(`\n❌ Incorrect! You chose: ${userChoice.country}`);
  console.log(`✅ The correct answer is: ${correctFlag.country}`);
  console.log(`📍 Capital: ${correctFlag.capital}`);
  console.log(`🌍 Region: ${correctFlag.region}`);
  console.log(`👥 Population: ${correctFlag.population}`);
}

function updateScore(correct) {
  player.totalQuestions++;
  if (correct) {
    player.score++;
    player.streak++;
    if (player.streak > player.bestStreak) {
      player.bestStreak = player.streak;
    }
  } else {
    player.streak = 0;
  }
}

function showStats() {
  const accuracy = player.totalQuestions > 0 ? ((player.score / player.totalQuestions) * 100).toFixed(1) : 0;
  console.log(`\n📊 ROUND STATISTICS`);
  console.log(`==================`);
  console.log(`Player: ${player.name}`);
  console.log(`Questions in this round: ${player.questionsPerRound}`);
  console.log(`Correct in this round: ${player.score - (player.totalQuestions - player.questionsPerRound)}`);
  console.log(`Total Questions: ${player.totalQuestions}`);
  console.log(`Total Correct Answers: ${player.score}`);
  console.log(`Overall Accuracy: ${accuracy}%`);
  console.log(`Current Streak: ${player.streak}`);
  console.log(`Best Streak: ${player.bestStreak}`);
  
  if (accuracy >= 90) {
    console.log(`🏆 Excellent! You're a flag expert!`);
  } else if (accuracy >= 75) {
    console.log(`🥇 Great job! You know your flags well!`);
  } else if (accuracy >= 60) {
    console.log(`🥈 Good work! Keep learning!`);
  } else if (accuracy >= 40) {
    console.log(`🥉 Not bad! Practice makes perfect!`);
  } else {
    console.log(`📚 Keep studying! You'll get better!`);
  }
}

function askQuestion() {
  // If we haven't started a round yet, generate 10 random flags
  if (currentRoundFlags.length === 0) {
    currentRoundFlags = shuffleArray(flags).slice(0, player.questionsPerRound);
    player.currentQuestion = 0;
  }
  
  const currentFlag = currentRoundFlags[player.currentQuestion];
  const options = getRandomOptions(currentFlag);
  
  displayFlag(currentFlag);
  displayOptions(options);
  
  rl.question("", function(answer) {
    const choiceIndex = parseInt(answer) - 1;
    
    if (choiceIndex >= 0 && choiceIndex < options.length) {
      const userChoice = options[choiceIndex];
      const correct = userChoice.country === currentFlag.country;
      
      if (correct) {
        showCorrectAnswer(currentFlag);
        console.log(`\n🎉 Great job! Your streak is now ${player.streak + 1}!`);
      } else {
        showIncorrectAnswer(currentFlag, userChoice);
        console.log(`\n💪 Don't worry! Your streak will build back up!`);
      }
      
      updateScore(correct);
      player.currentQuestion++;
      
      // Check if we've completed all 10 questions
      if (player.currentQuestion >= player.questionsPerRound) {
        showRoundComplete();
      } else {
        // Show progress and continue to next question
        console.log(`\n${'='.repeat(50)}`);
        console.log(`\n📊 Progress: Question ${player.currentQuestion + 1}/${player.questionsPerRound}`);
        console.log(`Current Score: ${player.score}/${player.totalQuestions}`);
        console.log(`\nPress Enter for the next question...`);
        
        rl.question("", function() {
          askQuestion();
        });
      }
    } else {
      console.log(`\n❌ Invalid choice. Please enter a number between 1 and ${options.length}.`);
      askQuestion();
    }
  });
}

function showRoundComplete() {
  console.log(`\n${'='.repeat(50)}`);
  console.log(`\n🏁 ROUND COMPLETE! 🏁`);
  console.log(`\nYou've answered all ${player.questionsPerRound} questions!`);
  
  showStats();
  
  console.log(`\n${'='.repeat(50)}`);
  console.log(`\nWould you like to play another round?`);
  console.log(`1. Yes, play another round of ${player.questionsPerRound} questions!`);
  console.log(`2. Quit game`);
  console.log(`\nEnter your choice (1-2):`);
  
  rl.question("", function(choice) {
    switch(choice.trim()) {
      case "1":
        // Reset for new round
        currentRoundFlags = [];
        player.currentQuestion = 0;
        console.log(`\n🌟 Starting a new round! Good luck, ${player.name}!`);
        console.log(`\n${'='.repeat(50)}`);
        askQuestion();
        break;
      case "2":
        endGame();
        break;
      default:
        console.log(`\n❌ Invalid choice. Quitting game...`);
        endGame();
    }
  });
}

function endGame() {
  console.log(`\n🏁 GAME OVER 🏁`);
  console.log(`\n${'='.repeat(50)}`);
  showStats();
  console.log(`\n🎮 Thanks for playing FlagQuest!`);
  console.log(`🌍 Keep learning about the world's flags!`);
  gameRunning = false;
  rl.close();
}

function showInstructions() {
  console.log(`\n🏁 WELCOME TO FLAGQUEST! 🏁`);
  console.log(`\n${'='.repeat(50)}`);
  console.log(`🎯 OBJECTIVE: Identify which country each flag belongs to!`);
  console.log(`📝 HOW TO PLAY:`);
  console.log(`   • You'll answer ${player.questionsPerRound} flag questions in a row`);
  console.log(`   • You'll see a flag display (emoji or ASCII art)`);
  console.log(`   • Choose the correct country from 4 options`);
  console.log(`   • Build your streak and improve your score!`);
  console.log(`   • Learn interesting facts about each country`);
  console.log(`\n🏆 FEATURES:`);
  console.log(`   • ${player.questionsPerRound} questions per round`);
  console.log(`   • 50+ countries from around the world`);
  console.log(`   • Score tracking and accuracy percentage`);
  console.log(`   • Streak counter and best streak record`);
  console.log(`   • Country facts (capital, region, population)`);
  console.log(`   • Country codes for easier identification`);
  console.log(`\n${'='.repeat(50)}`);
}

// Start the game
showInstructions();

rl.question(`\nWhat's your name, flag explorer? `, function(name) {
  player.name = name;
  console.log(`\n🌟 Welcome, ${player.name}! Let's test your flag knowledge!`);
  console.log(`\n${'='.repeat(50)}`);
  askQuestion();
});
