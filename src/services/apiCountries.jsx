import axios from "axios";

const LIBRE_SUPPORTED_LANGS = {
  en: "English",
  es: "Spanish",
  fr: "French",
  de: "German",
  it: "Italian",
  pt: "Portuguese",
  ru: "Russian",
  ar: "Arabic",
  fa: "Persian (Farsi)",
  tr: "Turkish",
  zh: "Chinese",
  ja: "Japanese",
  ko: "Korean",
};

const COUNTRY_TO_LIBRE_MAP = {
  eng: "en",
  spa: "es",
  fra: "fr",
  deu: "de",
  ita: "it",
  por: "pt",
  rus: "ru",
  ara: "ar",
  fas: "fa",
  tur: "tr",
  zho: "zh",
  jpn: "ja",
  kor: "ko",
};

export const getCountries = async () => {
  try {
    const res = await axios.get(
      "https://restcountries.com/v3.1/all?fields=languages",
    );

    const resultMap = {};

    res.data.forEach((country) => {
      if (!country.languages) return;

      Object.keys(country.languages).forEach((countryCode) => {
        const libreCode = COUNTRY_TO_LIBRE_MAP[countryCode];
        if (!libreCode) return;
        if (!LIBRE_SUPPORTED_LANGS[libreCode]) return;

        resultMap[libreCode] = {
          code: libreCode,
          name: LIBRE_SUPPORTED_LANGS[libreCode],
        };
      });
    });
    const langs = Object.values(resultMap).sort((a, b) =>
      a.name.localeCompare(b.name),
    );
    return langs;
  } catch (err) {
    console.error(err);
    return [];
  }
};
