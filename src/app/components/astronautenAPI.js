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

export const Astronauts = () => {
  const [astronauts, setAstronauts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAstronauts = async () => {
      try {
        const res = await fetch("https://lldev.thespacedevs.com/2.3.0/astronauts/?format=json&in_space=true&is_human=true");
        // "in space" zorgt er voor dat ik mensen in de ruimte zie. "is_human" zorgt ervoor dat ik Spaceman van SpaceX niet zie.
        const data = await res.json();
        setAstronauts(data.results);
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
      <ul>
        {astronauts.map((astronaut) => (
          <li key={astronaut.id}>
            <strong>{astronaut.name}</strong> – {astronaut.agency.name} <br />
            <strong>Tijd in de ruimte:</strong> {formatTimeInSpace(astronaut.time_in_space)}
          </li>
        ))}
      </ul>
    </div>
  );
};
