"use client";

import { useState, useEffect, use } from "react";

export default function Astronaut({ params }) {
  const unwrappedParams = use(params); // Unwrap de Promise
  const { id } = unwrappedParams; // Nu kun je id gebruiken
  const [astronaut, setAstronaut] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAstronaut = async () => {
      try {
        const res = await fetch(
          `https://lldev.thespacedevs.com/2.3.0/astronauts/?format=json&search=${id}`
        );
        const data = await res.json();
        if (data.count > 0) {
          setAstronaut(data.results[0]);
        }
      } catch (error) {
        console.error("Fout bij ophalen van astronaut:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAstronaut();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!astronaut) return <p>No astronaut found..</p>;

  // Helper functie om de datum te parseren
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) {
      return "Invalid Date";
    }

    return date.toLocaleString(); // Gebruik een geschikt formaat voor je regio
  };

  return (
    <div id="astronauten" style={{padding: "20px", display: "flex" }}>
      {/* Afbeelding links */}
      <div style={{ paddingRight:"20px" }}>
        <img
          style={{ width: "80%", height: "600px", objectFit: "cover", borderRadius: "10px", border: "1px solid #ddd", padding: "1px" }}
          src={astronaut.image ? astronaut.image.image_url : "/spacewalkingastronaut.jpg"}
          onError={(e) => (e.target.src = "/spacewalkingastronaut.jpg")}
          alt={astronaut.name}
        />
      </div>

      {/* Tekst rechts */}
      <div style={{ flex: 2 }}>
        <h2>{astronaut.name}</h2>

        {astronaut.agency && <p>Agency: {astronaut.agency.name}</p>}
        {astronaut.date_of_birth && <p>Age: {astronaut.age}</p>}
        {astronaut.bio && <p>{astronaut.bio}</p>}

        {astronaut.wiki && (
          <p>
            <a href={astronaut.wiki} target="_blank" rel="noopener noreferrer">
              Wikipedia
            </a>
          </p>
        )}

        {/* Laatste vlucht */}
        {astronaut.last_flight && (
          <div>
            <h4>Last Flight:</h4>
            <p>{formatDate(astronaut.last_flight.net)}</p>
          </div>
        )}

        {/* Eerste vlucht */}
        {astronaut.first_flight && (
          <div>
            <h4>First Flight:</h4>
            <p>{formatDate(astronaut.first_flight.net)}</p>
          </div>
        )}

        {astronaut.flights && astronaut.flights.length > 0 && (
          <div>
            <h4>All Missions:</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {astronaut.flights.map((mission, index) => (
                <li key={index}>{mission.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}