import { useCities } from "../contexts/CitiesContext";
import style from "../css-modules/CityList.module.css";
import CityItem from "./CityItem";
import Message from "./Message";
import Spinner from "./Spinner";

export type CityType = {
    id: number;
    cityName: string;
    country: string;
    emoji: string;
    date: string;
    notes: string;
    position: {
        lat: string;
        lng: string;
    };
};

function CityList() {
    const { cities, isLoading } = useCities();
    if (isLoading) {
        return <Spinner />;
    }

    if (!cities?.length) {
        return (
            <Message message="Add your first city by clicking on a city on the map" />
        );
    }
    return (
        <ul className={style.cityList}>
            {cities.map((city) => (
                <CityItem key={city.id} city={city} />
            ))}
        </ul>
    );
}

export default CityList;
