import styles from "./page.module.css";
import { Astronauts } from "./components/astronautenAPI";
import { Launches } from "./components/launchesAPI";
import { SpaceEvents } from "./components/events";
import Header from "./components/header";
import Footer from "./components/footer";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
      <Header />
        <Astronauts />
        <Launches />
        <SpaceEvents/>
        <Footer/>
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}
