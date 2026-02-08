import { useState, useEffect, useCallback } from "react";
import { getCountries } from "../services/apiCountries";
import { translateText } from "../services/apiTranslate";

function useTranslator(initialSource = "en", initialTarget = "fa") {
  const [languages, setLanguages] = useState([]);
  const [sourceLang, setSourceLang] = useState(initialSource);
  const [targetLang, setTargetLang] = useState(initialTarget);
  const [loadingLanguages, setLoadingLanguages] = useState(true);
  const [loadingTranslation, setLoadingTranslation] = useState(false);
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");

  useEffect(() => {
    const loadLanguages = async () => {
      setLoadingLanguages(true);
      try {
        const langs = await getCountries();
        setLanguages(langs);
        if (!targetLang && langs.length) setTargetLang(langs[0].code);
      } finally {
        setLoadingLanguages(false);
      }
    };
    loadLanguages();
  }, []);

  const translate = useCallback(async () => {
    if (!inputText.trim()) return;
    setLoadingTranslation(true);
    try {
      const translation = await translateText({
        text: inputText,
        source: sourceLang,
        target: targetLang,
      });
      setOutputText(translation);
    } catch (err) {
      console.error("Translation error:", err);
      alert("something was wrong");
    } finally {
      setLoadingTranslation(false);
    }
  }, [inputText, sourceLang, targetLang]);

  const swapLanguages = useCallback(() => {
    setSourceLang((prev) => targetLang);
    setTargetLang((prev) => sourceLang);
    setOutputText("");
  }, [sourceLang, targetLang]);

  return {
    languages,
    sourceLang,
    setSourceLang,
    targetLang,
    setTargetLang,
    loadingLanguages,
    loadingTranslation,
    inputText,
    setInputText,
    outputText,
    translate,
    handleSwap: swapLanguages,
  };
}

export default useTranslator;
