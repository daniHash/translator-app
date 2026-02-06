// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { ArrowLeftRight, Sparkles } from "lucide-react";
import ThemeToggle from "./components/ThemeToggle";
import LanguageSelect from "./components/LanguageSelect";
import TextAreaCard from "./components/TextAreaCard";
import useTheme from "./hooks/useTheme";
import styles from "./styles/App.module.css";
import useTranslator from "./hooks/useTranslate";

const headerMotion = {
  hidden: { opacity: 0, y: 160 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const panelMotion = {
  hidden: { opacity: 0, y: 194 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.2,
    },
  },
};

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const {
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
    handleSwap,
  } = useTranslator("en", "fa");
  const maxChars = 1200;

  return (
    <div className={styles.app}>
      <div className={styles.orb} aria-hidden="true" />
      <div className={styles.orbSecondary} aria-hidden="true" />
      <div className={styles.gridOverlay} aria-hidden="true" />

      <motion.header
        className={styles.header}
        initial="hidden"
        animate="visible"
        variants={headerMotion}
      >
        <div className={styles.headline}>
          <p className={styles.eyebrow}>
            <Sparkles size={16} strokeWidth={2} />
            Premium translator
          </p>
          <h1 className={styles.title}>Lumen Translate</h1>
        </div>
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </motion.header>

      <motion.section
        className={styles.panel}
        initial="hidden"
        animate="visible"
        variants={panelMotion}
      >
        <div className={styles.panelHeader}>
          <div className={styles.selectors}>
            <LanguageSelect
              label="From"
              value={sourceLang}
              onChange={(e) => setSourceLang(e.target.value)}
              options={languages}
              disabled={loadingLanguages}
            />
            <button
              className={styles.swapButton}
              type="button"
              onClick={handleSwap}
              aria-label="Swap languages"
            >
              <ArrowLeftRight size={18} strokeWidth={2} />
            </button>
            <LanguageSelect
              label="To"
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
              disabled={loadingLanguages}
              options={languages}
              showAuto={true}
            />
          </div>
        </div>

        <div className={styles.textAreaGrid}>
          <TextAreaCard
            label="Source text"
            value={inputText}
            onChange={(event) => setInputText(event.target.value)}
            placeholder="Type or paste anything here..."
            maxLength={maxChars}
            footer={`${inputText.length}/${maxChars}`}
          />
          <TextAreaCard
            label="Translation"
            value={outputText}
            readOnly
            placeholder="Translation output appears here."
            footer="Read-only preview"
          />
        </div>

        <div className={styles.actionRow}>
          <motion.button
            className={styles.translateButton}
            type="button"
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 350, damping: 22 }}
            onClick={translate}
            disabled={loadingTranslation || !inputText.trim()}
          >
            {loadingTranslation ? "translating..." : "Translate"}
          </motion.button>
          <div className={styles.meta}>
            <span>Lumen Translate</span>
            <span className={styles.metaDot} />
          </div>
        </div>
      </motion.section>
    </div>
  );
}
