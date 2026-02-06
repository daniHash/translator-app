import React, { useId } from "react";
import { ChevronDown } from "lucide-react";
import styles from "../styles/LanguageSelect.module.css";

export default function LanguageSelect({
  label,
  value,
  onChange,
  options,
  loading,
}) {
  const selectId = useId();

  return (
    <label className={styles.wrapper} htmlFor={selectId}>
      <span className={styles.label}>{label}</span>
      <div className={styles.selectWrap}>
        <select
          id={selectId}
          className={styles.select}
          value={value}
          onChange={onChange}
          disabled={loading}
        >
          {options.map((option) => (
            <option key={option.code} value={option.code}>
              {option.name}
            </option>
          ))}
        </select>
        <ChevronDown size={16} strokeWidth={2} className={styles.chevron} />
      </div>
    </label>
  );
}
