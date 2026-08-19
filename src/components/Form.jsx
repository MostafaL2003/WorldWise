import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Form.module.css";
import Button from "./Button";
import useUrlPosition from "../hooks/useUrlPosition";
import { useCities } from "../contexts/CitiesContext";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export default function Form() {
  const navigate = useNavigate();
  const [lat, lng] = useUrlPosition();
  const { createCity } = useCities();

  const [countryName, setCountryName] = useState("");
  const [cityName, setCityName] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [notes, setNotes] = useState("");
  const [isLoadingGeo, setIsLoadingGeo] = useState(false);

  useEffect(
    function () {
      if (!lat || !lng) return;

      async function fetchCityData() {
        try {
          setIsLoadingGeo(true);
          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();
          setCityName(data.city || data.locality || "");
          setCountryName(data.countryName || "");
        } catch (error) {
          alert("Error fetching location data.");
        } finally {
          setIsLoadingGeo(false);
        }
      }
      fetchCityData();
    },
    [lat, lng]
  );

  async function handleSubmit(e) {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity = {
      cityName,
      countryName,
      date,
      notes,
      position: {
        lat: Number(lat),
        lng: Number(lng),
      },
    };

    await createCity(newCity);
    navigate("/app/cities");
  }

  if (isLoadingGeo) return <p>Loading location details...</p>;

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          type="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <Button
          type="back"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          &larr; Back
        </Button>
      </div>
    </form>
  );
}