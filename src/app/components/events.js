"use client";

import { useEffect, useState } from "react";

export const SpaceEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("https://lldev.thespacedevs.com/2.3.0/events/?format=json");
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
    <div id="events" style={{ textAlign: "center" }}> {/* De hoofd container wordt gecentreerd */}      <h2>Events 🌌</h2>
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
                }}
                src={event.image ? event.image.image_url : "/spacelaunch.png"}
                onError={(e) => (e.target.src = "/spacelaunch.png")}
                alt={event.name}
              />
              <span style={{ fontSize: "18px", fontWeight: 'bold' }}>{event.name}</span> <br/>
              <span style={{ fontSize: "12px" }}>{event.description || "Onbekend"}</span> <br />
{event.location || "Onbekend"}<br/>
<a
  style={{
    width: "120px",
    height: "40px", // Vergroot de hoogte voor betere centrering
    marginTop: "10px",
    cursor: "pointer",
    border: "1px solid #ddd",
    borderRadius: "10px",
    textAlign: "center",
    display: "inline-block",
    lineHeight: "40px",
    fontWeight: "bold",
    transition: "background-color 0.3s, color 0.3s", // Voeg overgangseffecten toe
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
</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
