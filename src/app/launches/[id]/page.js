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

export default function Launch({ params }) {
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  const router = useRouter();
  const [launch, setLaunch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLaunch = async () => {
      try {
        const res = await fetch(
          `https://lldev.thespacedevs.com/2.3.0/launches/?format=json&search=${id}`
        );
        const data = await res.json();
        console.log("API response:", data);

        if (data.count > 0) {
          setLaunch(data.results[0]);
        }
      } catch (error) {
        console.error("Error fetching launch:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchLaunch();
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!launch) return <p>No launch found..</p>;

  return (
    <div>
    {/* Launch Header */}
    <div id="launches" style={{ textAlign: "center", marginTop: "20px" }}>
      <h2 style={{ backgroundColor: "#E63946", color: "white", padding: "10px", borderRadius: "5px" }}>
        Launches 🛰️
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

      {/* Launch Info */}
      <div style={{ padding: "20px", display: "flex" }}>
        {/* Launch Image */}
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
            src={launch.image?.image_url || "/placeholder-launch.jpg"}
            onError={(e) => (e.target.src = "/placeholder-launch.jpg")}
            alt={launch.name}
          />
        </div>

        {/* Launch Details */}
        <div style={{ flex: "1", textAlign: "left" }}>
          <h2>{launch.name}</h2>
          {launch.net && <p><strong>Date:</strong> {formatDate(launch.net)}</p>}
          {launch.pad?.location?.name && (
            <p><strong>Location:</strong> {launch.pad.location.name}</p>
          )}
          {launch.mission?.description && (
            <p><strong>Mission:</strong> {launch.mission.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
