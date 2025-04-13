import styles from "./page.module.css";
import { Astronauts } from "./components/astronautenAPI";
import { Launches } from "./components/launchesAPI";
import { SpaceEvents } from "./components/events";
import Nav from "./components/nav";

export default function Home() {
  return (
    <>
      <Nav />
      <div className={styles.page}>
        <main className={styles.main}>
          <div id="astronauten">
            <Astronauts />
          </div>

          <div id="launches">
            <Launches />
          </div>

          <div id="events">
            <SpaceEvents />
          </div>
        </main>
        <footer className={styles.footer}></footer>
      </div>
    </>
  );
}