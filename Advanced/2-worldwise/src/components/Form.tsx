// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

// This provided function is not working
// function convertToEmoji(countryCode: string) {
//     const codePoints = countryCode
//         .toUpperCase()
//         .split("")
//         .map((char) => 127397 + char.charCodeAt(0));
//     return String.fromCodePoint(...codePoints);
// }

import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

import styles from "../css-modules/Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import useURLPosition from "../hooks/useURLPosition";
import Spinner from "./Spinner";
import Message from "./Message";
import { CityType } from "./CityList";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

const URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export default function Form() {
    const navigate = useNavigate();
    const [latitude, longitude] = useURLPosition();
    const { createCity, isLoading } = useCities();
    const [cityName, setCityName] = useState("");
    const [country, setCountry] = useState("");
    const [date, setDate] = useState(new Date());
    const [notes, setNotes] = useState("");
    const [isCityLoading, setIsCityLoadin] = useState(false);
    const [emoji, setEmoji] = useState("");
    const [geocodingError, setGeoCodingError] = useState("");

    useEffect(() => {
        if (!latitude || !longitude) {
            return;
        }
        async function fetchCityData() {
            try {
                setIsCityLoadin(true);
                setGeoCodingError("");
                const res = await fetch(
                    `${URL}?latitude=${latitude}&longitude=${longitude}`
                );
                const data = await res.json();
                if (!data.countryCode) {
                    throw new Error(
                        "That doesn't seem to be a city. Click somewhere else.😊"
                    );
                }

                setCityName(data.city || data.locality || "");
                setCountry(data.countryName || "");
                // setEmoji(convertToEmoji(data.countryCode));
                setEmoji(data.countryCode);
            } catch (e) {
                setGeoCodingError((e as Error)?.message);
            } finally {
                setIsCityLoadin(false);
            }
        }
        fetchCityData();
    }, [latitude, longitude]);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!cityName || !date) return;

        const newCity: CityType = {
            cityName,
            country,
            emoji,
            date: date.toString(),
            notes,
            position: {
                lat: latitude ?? "",
                lng: longitude ?? "",
            },
        };

        createCity(newCity).then(() => {
            navigate("/app/cities");
        });
    }

    if (!latitude || !longitude) {
        return <Message message="Start by clicking somewhere on the map" />;
    }

    if (geocodingError) {
        return <Message message={geocodingError} />;
    }

    return isCityLoading ? (
        <Spinner />
    ) : (
        <form
            className={`${styles.form} ${isLoading ? styles.loading : ""}`}
            onSubmit={handleSubmit}
        >
            <div className={styles.row}>
                <label htmlFor="cityName">City name</label>
                <input
                    id="cityName"
                    onChange={(e) => setCityName(e.target.value)}
                    value={cityName}
                />
                <span className={styles.flag}>{emoji}</span>
            </div>

            <div className={styles.row}>
                <label htmlFor="date">When did you go to {cityName}?</label>
                {/* <input
                    id="date"
                    onChange={(e) => setDate(new Date(e.target.value))}
                    value={date.toString()}
                /> */}
                <DatePicker
                    id="date"
                    onChange={(date) => setDate(date ?? new Date())}
                    selected={date}
                    dateFormat="dd/MM/yyyy"
                />
            </div>

            <div className={styles.row}>
                <label htmlFor="notes">
                    Notes about your trip to {cityName}
                </label>
                <textarea
                    id="notes"
                    onChange={(e) => setNotes(e.target.value)}
                    value={notes}
                />
            </div>

            <div className={styles.buttons}>
                <BackButton />
                <Button type="primary" onClick={() => {}}>
                    Add
                </Button>
            </div>
        </form>
    );
}
