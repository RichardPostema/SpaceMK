"use client";

import { useEffect, useState } from "react";
import Link from "next/link"; // Voeg de juiste import van Link toe

export const SpaceEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("https://lldev.thespacedevs.com/2.3.0/events/?format=json&limit=10&offset=963");
        const data = await res.json();
        setEvents(data.results);
      } catch (error) {
        console.error("Fout bij ophalen van events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div id="events" style={{ textAlign: "center" }}>
      <h2 style={{ backgroundColor: "#4B0082", color: "white", padding: "10px", borderRadius: "5px" }}>Events 🌌</h2>
      {events.length === 0 ? (
        <p>There are currently no events available.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          {events.slice(0, 6).map((event) => (
            <div key={event.id} style={{ textAlign: "center", border: "1px solid #ddd", padding: "10px", borderRadius: "10px" }}>
              <img
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.6)"
                }}
                src={event.image ? event.image.image_url : "/space-event.jpg"}
                onError={(e) => (e.target.src = "/space-event.jpg")}
                alt={event.name}
              />
              <span style={{ fontSize: "18px", fontWeight: 'bold' }}>{event.name}</span> <br/>
              <span style={{ fontSize: "14px" }}>{event.description || "Onbekend"}</span> <br />
              {event.location || "Onbekend"}<br/>
              <Link
                href={`events/${event.name}`} // Verander naar event.name
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
                  e.target.style.backgroundColor = "#ddd"; // Verander de achtergrondkleur bij hover
                  e.target.style.color = "black"; // Verander de tekstkleur bij hover
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent"; // Herstel de achtergrondkleur
                  e.target.style.color = "white"; // Herstel de tekstkleur
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
