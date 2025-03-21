"use client";

import { useEffect, useState } from "react";

// Functie om de countdown te berekenen
const getCountdown = (launchDate) => {
  const now = new Date();
  const launchTime = new Date(launchDate);
  const difference = launchTime - now;

  if (difference <= 0) return null;  // Geen countdown tonen als lancering al geweest is

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

  if (loading) return <p>Bezig met laden...</p>;

  return (
    <div>
      <h2>Launches</h2>
      <ul>
        {launches.map((launch) => (
          <li key={launch.id}>
            <strong>{launch.name}</strong> <br/> {launch.launch_service_provider?.name || "Onbekend"} <br />
            <strong>Datum:</strong> {new Date(launch.net).toLocaleString()} <br />
            {getCountdown(launch.net) && (
              <>
                <strong>Countdown:</strong> {getCountdown(launch.net)}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
