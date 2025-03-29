import { CityType } from "./CityList";
import style from "../css-modules/CityItem.module.css";
import { Link } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";

const formatDate = (date: string) =>
    new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
        weekday: "long",
    }).format(new Date(date));

function CityItem({ city }: { city: CityType }) {
    const { currentCity, deleteCity } = useCities();
    const { cityName, emoji, date, id, position } = city ?? {};
    const { lat, lng } = position ?? {};

    const activeStyle = id === currentCity?.id ? style["cityItem--active"] : "";

    function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        deleteCity(String(id));
    }
    return (
        <li>
            <Link
                className={`${style.cityItem} ${activeStyle}`}
                to={`${id}?lat=${lat}&lng=${lng}`}
            >
                <span className={style.emoji}>{emoji}</span>
                <h3 className={style.name}>{cityName}</h3>
                <time className={style.date}>{formatDate(date)}</time>
                <button className={style.deleteBtn} onClick={handleClick}>
                    &times;
                </button>
            </Link>
        </li>
    );
}

export default CityItem;
