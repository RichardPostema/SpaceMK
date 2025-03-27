"use client";
import Link from 'next/link';

function Nav() {
  return (
    <ul style={{
      display: "flex",          // Flexbox om items naast elkaar te zetten
      justifyContent: "center", // Center de items horizontaal
      listStyle: "none",        // Verwijder de standaard lijststijl
      padding: "10px 0",        // Voeg padding toe voor meer hoogte
      margin: 0,                // Verwijder marge
      position: "sticky",       // Maak de navbar sticky
      top: 0,                   // Zorg ervoor dat de navbar bovenaan blijft
      backgroundColor: "#2E3D5A", // Zet de achtergrond op zwart
      zIndex: 1000,             // Zorg ervoor dat de navbar boven andere elementen blijft
      fontSize: "16px",         // Vergroot de tekst
    }}>
      <li style={{ margin: "0 20px" }}>
        <Link href="#" style={{ color: "white", textDecoration: "none" }}>Home</Link> {/* Link naar boven */}
      </li>
      <li style={{ margin: "0 20px" }}>
        <Link href="#astronauten" style={{ color: "white", textDecoration: "none" }}>Astronauts</Link>
      </li>
      <li style={{ margin: "0 20px" }}>
        <Link href="#launches" style={{ color: "white", textDecoration: "none" }}>Launches</Link>
      </li>
      <li style={{ margin: "0 20px" }}>
        <Link href="#events" style={{ color: "white", textDecoration: "none" }}>Events</Link>
      </li>
    </ul>
  );
}

export default Nav;
