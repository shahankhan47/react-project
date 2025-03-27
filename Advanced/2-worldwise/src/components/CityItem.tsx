import { CityType } from "./CityList";
import style from "../css-modules/CityItem.module.css";
import { Link } from "react-router-dom";

const formatDate = (date: string) =>
    new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
        weekday: "long",
    }).format(new Date(date));

function CityItem({ city }: { city: CityType }) {
    const { cityName, emoji, date, id, position } = city ?? {};
    const { lat, lng } = position ?? {};
    return (
        <li>
            <Link className={style.cityItem} to={`${id}?lat=${lat}&lng=${lng}`}>
                <span className={style.emoji}>{emoji}</span>
                <h3 className={style.name}>{cityName}</h3>
                <time className={style.date}>{formatDate(date)}</time>
                <button className={style.deleteBtn}>&times;</button>
            </Link>
        </li>
    );
}

export default CityItem;
