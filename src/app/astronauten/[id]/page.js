"use client";

import { useState, use, useEffect } from "react";

export default function Austronaut({params}) {
  const { id } = use(params);
  const [astronaut, setAstronaut] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAstronaut = async () => {
      try {
        const res = await fetch(`https://lldev.thespacedevs.com/2.3.0/astronauts/?format=json&search=${id}`);
        const data = await res.json();
        if(data.count > 0) {
            setAstronaut(data.results[0]);
        }

        // console.log(data.results[0]);
      } catch (error) {
        console.error("Fout bij ophalen van astronauten:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAstronaut();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div id="astronauten" style={{ textAlign: "center" }}>
      <h2>People in space 👽</h2>
      {astronaut.name}
      
    </div>
  );
};
