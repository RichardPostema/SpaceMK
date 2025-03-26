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
    // Code die uitgevoerd moet worden na het laden van de component
    const fetchAstronauts = async () => {
      try {
        const res = await fetch("https://lldev.thespacedevs.com/2.3.0/astronauts/?format=json&in_space=true&is_human=true");
        const data = await res.json();
        //  // Verder verwerken van de data
        // Sorteer astronauten op basis van de tijd in de ruimte (minst lang in de ruimte eerst)
        const sortedAstronauts = data.results.sort((a, b) => {
          return getDaysInSpace(a.time_in_space) - getDaysInSpace(b.time_in_space);
        });
        setAstronauts(sortedAstronauts);
        // Bijwerken van de staat
      } catch (error) {
        console.error("Fout bij ophalen van astronauten:", error);
      } finally {
        setLoading(false);
        // Loading State
      }
    };

    fetchAstronauts();
  }, []);

  if (loading) return <p>Bezig met laden...</p>;

  return (
    <div>
      <h2 >Astronauten in de ruimte 👽</h2>
      <ul
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          padding: 0,
          listStyle: "none",
        }}
      >
        {/* Alleen de eerste 7 astronauten die het minst lang in de ruimte zijn */}
        {astronauts.slice(0, 10).map((astronaut) => (
          <li
            key={astronaut.id}
            style={{
              display: "flex",
              flexWrap: "wrap",
              background: "#072326",
              padding: "15px",
              borderRadius: "15px",
              maxHeight: "100%",
              justifyContent: "center",
              width: "calc(20% - 20px)", // Zorgt ervoor dat er items per rij komen, (-) is belangrijk
              boxSizing: "border-box", // Zorgt ervoor dat de padding geen extra ruimte inneemt
              textAlign: "center", // Zorgt ervoor dat de tekst in center staat!
            }}
          >
  {astronaut.image ? (
  <img
    style={{
      width: "200px",
      height: "500px",
      objectFit: "cover",
      borderRadius: "10px",
      justifyContent: "center",
    }}
    src={astronaut.image.image_url}
    onError={(e) => (e.target.src = "/spacewalkingastronaut.jpg")}
    alt={astronaut.name}
  />
) : (
  <img
    style={{
      width: "200px",
      height: "500px",
      objectFit: "cover",
      borderRadius: "10px",
      justifyContent: "center",
    }}
    src="/spacewalkingastronaut.jpg"
    alt="Placeholder astronaut"
  />
)}
            <span style={{fontSize:"18px",fontWeight: 'bold'}}>{astronaut.name}</span> <br />
            <span style={{fontSize:"14px"}}>{astronaut.agency.name}</span> <br />
            <span style={{fontSize:"12px"}}>{formatTimeInSpace(astronaut.time_in_space)}</span><br/>
            <a style={{width:"100%", height:"20px", marginTop:"10px",}}>Meer informatie</a>
          </li>
        ))}
      </ul>
    </div>
  );
};
