// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import React from "react";
import styles from "../styles/ThemeToggle.module.css";

const iconProps = { size: 16, strokeWidth: 2.2 };

export default function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === "dark";

  return (
    <motion.button
      className={styles.toggle}
      type="button"
      onClick={onToggle}
      aria-label="Toggle theme"
      aria-pressed={isDark}
      whileTap={{ scale: 0.97 }}
    >
      <motion.span
        className={styles.thumb}
        animate={{ x: isDark ? 26 : 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 22 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isDark ? "moon" : "sun"}
            className={styles.icon}
            initial={{ opacity: 0, rotate: -20, scale: 0.75 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 20, scale: 0.75 }}
            transition={{ duration: 0.2 }}
          >
            {isDark ? <Moon {...iconProps} /> : <Sun {...iconProps} />}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </motion.button>
  );
}
