import React, { useId } from 'react';
import styles from '../styles/TextAreaCard.module.css';

export default function TextAreaCard({
  label,
  value,
  onChange,
  placeholder,
  readOnly = false,
  footer,
  maxLength
}) {
  const textId = useId();

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <label className={styles.label} htmlFor={textId}>
          {label}
        </label>
        {footer ? <span className={styles.footer}>{footer}</span> : null}
      </div>
      <textarea
        id={textId}
        className={styles.textarea}
        value={value ?? ''}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        maxLength={maxLength}
        spellCheck='false'
      />
    </div>
  );
}
