"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";

const formatDate = (dateString) => {
  if (!dateString) return "Unknown";
  const date = new Date(dateString);
  return isNaN(date.getTime())
    ? "Unknown"
    : date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
};

export default function Astronaut({ params }) {
  const unwrappedParams = use(params); 
  const { id } = unwrappedParams;
  const router = useRouter();
  const [astronaut, setAstronaut] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAstronaut = async () => {
      try {
        const res = await fetch(
          `https://lldev.thespacedevs.com/2.3.0/astronauts/?format=json&search=${id}`
        );
        const data = await res.json();
        console.log(data); // Toegevoegd om de API-respons te loggen
  
        if (data.count > 0) {
          setAstronaut(data.results[0]);
        }
      } catch (error) {
        console.error("Fout bij ophalen van astronaut:", error);
      } finally {
        setLoading(false);
      }
    };
  
    if (id) {
      fetchAstronaut();
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!astronaut) return <p>No astronaut found..</p>;

  const flight = astronaut?.flights?.length > 0 ? astronaut.flights[0] : null;

  return (
    <div>
      {/* Back button */}
      <button
        onClick={() => router.push("/")}
        style={{
          marginBottom: "20px",
          padding: "10px 20px",
          backgroundColor: "#024C8B",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          margin:"20px 178px"
        }}
      >
        ← Back to homepage
      </button>

      {/* Astronaut Information */}
      <div style={{ padding: "20px", display: "flex" }}>
        {/* Astronaut Image */}
        <div style={{ flex: "1", minWidth: "300px", display: "flex", justifyContent: "center" }}>
          <img
            style={{
              width: "60%",
              height: "400px",
              aspectRatio: "3/2",
              objectFit: "cover",
              borderRadius: "10px",
              border: "1px solid #ddd",
              padding: "10px",
              boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.6)"
            }}
            src={astronaut.image ? astronaut.image.image_url : "/spacewalkingastronaut.jpg"}
            onError={(e) => (e.target.src = "/spacewalkingastronaut.jpg")}
            alt={astronaut.name}
          />
        </div>

        {/* Astronaut Information */}
        <div style={{ flex: "1", textAlign: "left", gap: "-20px" }}>
          <h2>{astronaut.name}</h2>
          {astronaut.agency && <p>Agency: {astronaut.agency.name}</p>}
          {astronaut.date_of_birth && <p>Age: {astronaut.age}</p>}
          {astronaut.bio && <p>{astronaut.bio}</p>}

          {astronaut.wiki && (
            <p>
              <a style={{ color: "white" }} href={astronaut.wiki} target="_blank" rel="noopener noreferrer">
                Wikipedia
              </a>
            </p>
          )}

          {astronaut.flights_count && (
            <p><strong>Flights Count:</strong> {astronaut.flights_count}</p>
          )}

          {astronaut.last_flight && (
            <div>
              <h4>Last Flight:</h4>
              <p>{formatDate(astronaut.last_flight)}</p>
            </div>
          )}

          {astronaut.first_flight && (
            <div>
              <h4>First Flight:</h4>
              <p>{formatDate(astronaut.first_flight)}</p>
            </div>
          )}

          {astronaut?.flights && astronaut.flights.length > 0 ? (
            <div>
              <h2>Laatste missie</h2>
              <p><strong>Naam:</strong> {flight.name}</p>
              <p><strong>ID:</strong> {flight.id}</p>
            </div>
          ) : (
            <p>Geen missies gevonden.</p>
          )}
        </div>
      </div>
    </div>
  );
}
