import axios from "axios";

export const translateText = async ({ text, source = "auto", target }) => {
  const res = await axios.get(
    `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${source}|${target}`,
  );
  return res.data.responseData.translatedText;
};
