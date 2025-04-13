"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Voeg de juiste import van Link toe

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

export default function Event({ params }) {
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  const router = useRouter();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(
          `https://lldev.thespacedevs.com/2.3.0/events/?format=json&search=${id}`
        );
        const data = await res.json();
        console.log("API response:", data);

        if (data.count > 0) {
          setEvent(data.results[0]);
        }
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEvent();
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!event) return <p>No event found..</p>;

  return (
    <div>
      {/* Event Header */}
      <div id="events" style={{ textAlign: "center", marginTop: "20px" }}>
        <h2 style={{ backgroundColor: "#4B0082", color: "white", padding: "10px", borderRadius: "5px" }}>
          Event 🌌
        </h2>
      </div>

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
          margin: "20px 178px"
        }}
      >
        ← Back to homepage
      </button>

      {/* Event Info */}
      <div style={{ padding: "20px", display: "flex", gap: "20px" }}>
        {/* Event Image */}
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
            src={event.image?.image_url || "/space-event.jpg"}
            onError={(e) => (e.target.src = "/space-event.jpg")}
            alt={event.name}
          />
        </div>

        {/* Event Details */}
        <div style={{ flex: "1", textAlign: "left" }}>
          <h2>{event.name}</h2>
          {event.date && <p><strong>Date:</strong> {formatDate(event.date)}</p>}
          {event.location && <p><strong>Location:</strong> {event.location}</p>}
          {event.description && <p>{event.description}</p>}
        </div>
      </div>

      {/* Add link to event listing */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Link
          href="/events" // Link naar de overzichtspagina van events
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
            backgroundColor: "#333",
            color: "white",
            transition: "background-color 0.3s, color 0.3s", 
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#ddd"; // Verander de achtergrondkleur bij hover
            e.target.style.color = "black"; // Verander de tekstkleur bij hover
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#333"; // Herstel de achtergrondkleur
            e.target.style.color = "white"; // Herstel de tekstkleur
          }}
        >
          Back to Events
        </Link>
      </div>
    </div>
  );
}
