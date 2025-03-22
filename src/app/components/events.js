"use client";

import { useEffect, useState } from "react";

// Functie om de events op te halen
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

  if (loading) return <p>Bezig met laden...</p>;

  return (
    <div>
      <h2>Events</h2>
      {events.length === 0 ? (
        <p>Er zijn momenteel geen evenementen beschikbaar.</p>
      ) : (
        <ul>
          {events.map((event) => {
            const eventDate = new Date(event.net);
            
            // Controleer of de datum geldig is
            const formattedDate = eventDate instanceof Date && !isNaN(eventDate)
              ? eventDate.toLocaleString()
              : "Onbekend";

            return (
              <li key={event.id} style={{ marginBottom: "20px" }}>
                <strong>{event.name}</strong> <br />
                <em>{formattedDate}</em> <br />
                <strong>Status:</strong> {event.status || "Onbekend"} <br />
                <strong>Missie:</strong> {event.mission?.name || "Geen missie vermeld"} <br />
                <strong>Locatie:</strong> {event.location?.name || "Onbekend"}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
