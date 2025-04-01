"use client";

import { useEffect, useState } from "react";
import Link from 'next/link';

const getDaysInSpace = (time) => {
  const regex = /^P(\d+)D/;
  const match = time.match(regex);
  return match ? parseInt(match[1], 10) : 0;
};

export const Astronauts = () => {
  const [astronauts, setAstronauts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAstronauts = async () => {
      try {
        const res = await fetch("https://lldev.thespacedevs.com/2.3.0/astronauts/?format=json&in_space=true&is_human=true");
        const data = await res.json();
        setAstronauts(data.results.sort((a, b) => getDaysInSpace(a.time_in_space) - getDaysInSpace(b.time_in_space)));
      } catch (error) {
        console.error("Fout bij ophalen van astronauten:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAstronauts();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div id="astronaut" style={{ textAlign: "center" }}>
      <h2>People in space 👽</h2>
      {astronauts.length === 0 ? (
        <p>No astronauts in space at the moment.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "20px" }}>
          {astronauts.slice(0, 10).map((astronaut) => (
            <div key={astronaut.id} style={{ textAlign: "center", border: "1px solid #ddd", padding: "10px", borderRadius: "10px" }}>
              <img
                style={{ width: "100%", height: "400px", objectFit: "cover", borderRadius: "10px" }}
                src={astronaut.image ? astronaut.image.image_url : "/spacewalkingastronaut.jpg"}
                onError={(e) => (e.target.src = "/spacewalkingastronaut.jpg")}
                alt={astronaut.name}
              />
              <span style={{ fontSize: "18px", fontWeight: "bold" }}>{astronaut.name}</span> <br />
              <span style={{ fontSize: "14px" }}>{astronaut.agency?.name || "Unknown Agency"}</span> <br />
              <span style={{ fontSize: "12px" }}>Days in space: {getDaysInSpace(astronaut.time_in_space)}</span><br />
              <Link
              href={`astronauten/${astronaut.name}`}
                style={{
                  width: "120px",
                  height: "40px", 
                  marginTop: "10px",
                  cursor: "pointer",
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  textAlign: "center",
                  display: "inline-block",
                  lineHeight: "40px",
                  fontWeight: "bold",
                  transition: "background-color 0.3s, color 0.3s", 
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#ddd"; 
                  e.target.style.color = "black"; 
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent"; 
                  e.target.style.color = "white"; 
                }}
              >
                Info
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
