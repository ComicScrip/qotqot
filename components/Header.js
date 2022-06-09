import styles from "../styles/header.module.css";

export default function Header() {
  const today = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "2-digit",
  };
  return (
    <header className={styles.header}>
      <div className={styles.divTitle}>
        <h1 className={styles.title}>Bonjour 👋</h1>
        <p className={styles.date}>
          {today.toLocaleDateString("fr-FR", options).charAt(0).toUpperCase() +
            today.toLocaleDateString("fr-FR", options).slice(1)}
        </p>
      </div>
    </header>
  );
}
