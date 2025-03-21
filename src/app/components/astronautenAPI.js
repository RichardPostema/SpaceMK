"use client";

import { useEffect, useState } from "react";

// Functie om ISO 8601 tijd om te zetten naar een leesbaar formaat
const formatTimeInSpace = (time) => {
  const regex = /^P(\d+D)?(T(\d+H)?(\d+M)?(\d+S)?)?$/;
  const match = time.match(regex);

  if (!match) return time;

  let formattedTime = "";
  if (match[1]) formattedTime += `${match[1].replace("D", " dag(en) ")}`;

  return formattedTime.trim() || "Onbekend";
};

// Functie om tijd in ISO 8601 formaat om te zetten naar het aantal dagen
const getDaysInSpace = (time) => {
  const regex = /^P(\d+)D/;
  const match = time.match(regex);
  if (match) {
    return parseInt(match[1], 10);
  }

  return 0; // Als geen dagen aanwezig zijn, return 0
};

export const Astronauts = () => {
  const [astronauts, setAstronauts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAstronauts = async () => {
      try {
        const res = await fetch("https://lldev.thespacedevs.com/2.3.0/astronauts/?format=json&in_space=true&is_human=true");
        const data = await res.json();
        // Sorteer astronauten op basis van de tijd in de ruimte (minst lang in de ruimte eerst)
        const sortedAstronauts = data.results.sort((a, b) => {
          return getDaysInSpace(a.time_in_space) - getDaysInSpace(b.time_in_space);
        });
        setAstronauts(sortedAstronauts);
      } catch (error) {
        console.error("Fout bij ophalen van astronauten:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAstronauts();
  }, []);

  if (loading) return <p>Bezig met laden...</p>;

  return (
    <div>
      <h2>Astronauten in de ruimte</h2>
      <ul
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          padding: 0,
          listStyle: "none",
        }}
      >
        {/* Alleen de eerste 6 astronauten die het minst lang in de ruimte zijn */}
        {astronauts.slice(0, 6).map((astronaut) => (
          <li
            key={astronaut.id}
            style={{
              display: "flex",
              flexWrap: "wrap",
              background: "#0D0D0D",
              padding: "15px",
              borderRadius: "15px",
              maxHeight: "200px",
              justifyContent: "center",
              listStyle: "none",
              width: "calc(16.666% - 20px)", // Zorgt ervoor dat er 6 items per rij komen
              boxSizing: "border-box", // Zorgt ervoor dat de padding geen extra ruimte inneemt
            }}
          >
            <strong>{astronaut.name}</strong> <br />
            {astronaut.agency.name} <br />
            {formatTimeInSpace(astronaut.time_in_space)}
          </li>
        ))}
      </ul>
    </div>
  );
};
