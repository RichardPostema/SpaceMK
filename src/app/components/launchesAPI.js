"use client";

import Link from 'next/link';
import { useEffect, useState } from "react";

// Functie om de countdown te berekenen
const getCountdown = (launchDate) => {
  const now = new Date();
  const launchTime = new Date(launchDate);
  const difference = launchTime - now;

  if (difference <= 0) return null;

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
};

export const Launches = () => {
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLaunches = async () => {
      try {
        const res = await fetch("https://lldev.thespacedevs.com/2.3.0/launches/?format=json");
        const data = await res.json();
        setLaunches(data.results);
      } catch (error) {
        console.error("Fout bij ophalen van lanceringen:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLaunches();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div id="launches" style={{ textAlign: "center" }}>
      <h2 style={{ backgroundColor: "#E63946", color: "white", padding:"10px",borderRadius: "10px" }}>
        Launches 🛰️
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", textAlign: "center" }}>
        {launches.slice(0, 6).map((launch) => (
          <div key={launch.id} style={{ textAlign: "center", border: "1px solid #ddd", padding: "10px", borderRadius: "10px" }}>
            <img
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "10px",
                boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.6)"
              }}
              src={launch.image ? launch.image.image_url : "/spacelaunch.png"}
              onError={(e) => (e.target.src = "/spacelaunch.png")}
              alt={launch.name}
            />
            <strong>{launch.name}</strong> <br />
            {launch.launch_service_provider?.name || "Onbekend"} <br />
            <strong>Datum:</strong> {new Date(launch.net).toLocaleString()} <br />
            {getCountdown(launch.net) && (
              <>
                <strong>Countdown:</strong> {getCountdown(launch.net)}
              </>
            )}
            <Link
              href={`launches/${launch.name}`}
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
                color: "white", // Zorg ervoor dat de kleur van de link wit blijft
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
    </div>
  );
};
