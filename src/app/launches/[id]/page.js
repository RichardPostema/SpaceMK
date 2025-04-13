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

  const provider = launch.launch_service_provider;

  return (
    <div>
      {/* Launch Header */}
      <div id="launches" style={{ textAlign: "center", marginTop: "20px" }}>
        <h2
          style={{
            backgroundColor: "#E63946",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
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
          margin: "20px 178px",
        }}
      >
        ← Back to homepage
      </button>

      {/* Launch Info */}
      <div style={{ padding: "20px", display: "flex", gap: "20px" }}>
        {/* Launch Image */}
        <div
          style={{
            flex: "1",
            minWidth: "300px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            style={{
              width: "60%",
              height: "800px",
              aspectRatio: "3/2",
              objectFit: "cover",
              borderRadius: "10px",
              border: "1px solid #ddd",
              padding: "10px",
              boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.6)",
            }}
            src={launch.image?.image_url || "/spacelaunch.png"}
            onError={(e) => (e.target.src = "/spacelaunch.png")}
            alt={launch.name}
          />
        </div>

        {/* Launch Details */}
        <div style={{ flex: "1", textAlign: "left" }}>
          <h2>{launch.name}</h2>
          {launch.net && (
            <p>
              <strong>Date:</strong> {formatDate(launch.net)}
            </p>
          )}
          {launch.pad?.location?.name && (
            <p>
              <strong>Location:</strong> {launch.pad.location.name}
            </p>
          )}
          {launch.mission?.description && (
            <p>
              <strong>Mission:</strong> {launch.mission.description}
            </p>
          )}

          {/* Launch Status */}
          {launch.status?.name && (
            <p>
              <strong>Status:</strong>{" "}
              <span
                style={{
                  backgroundColor:
                    launch.status.abbrev === "Success"
                      ? "#4CAF50"
                      : launch.status.abbrev === "Failure"
                      ? "#F44336"
                      : "#FFC107",
                  color: "white",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  marginLeft: "8px",
                }}
              >
                {launch.status.name}
              </span>
            </p>
          )}
          {launch.status?.description && (
            <p style={{ fontStyle: "italic", color: "#666" }}>
              {launch.status.description}
            </p>
          )}

            {/* Weather Concerns */}
  {launch.weather_concerns && (
    <div style={{ marginTop: "20px", borderTop: "1px solid #ccc", paddingTop: "15px" }}>
      <h3>Weather Concerns</h3>
      <p>{launch.weather_concerns}</p>
    </div>
  )}

          {/* Launch Service Provider Info */}
          {provider && (
            <div style={{ borderTop: "1px solid #ccc" }}>
              <h3>Launch Provider</h3>
              <p><strong>Name:</strong> {provider.name}</p>
              <p><strong>Type:</strong> {provider.type?.name}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
