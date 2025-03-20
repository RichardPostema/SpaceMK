import styles from "./page.module.css";
import { Astronauts } from "./components/astronautenAPI";
import { Launches } from "./components/launchesAPI";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Astronauts />
        <Launches />
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}
