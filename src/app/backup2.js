import styles from "./page.module.css";
import { Astronauts } from "./components/astronautenAPI";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Astronauts />
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}