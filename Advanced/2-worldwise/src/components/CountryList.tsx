import { useCities } from "../contexts/CitiesContext";
import style from "../css-modules/CountryList.module.css";
import { CityType } from "./CityList";
import CountryItem, { CountryType } from "./CountryItem";
import Message from "./Message";
import Spinner from "./Spinner";

function CountryList() {
    const { cities, isLoading } = useCities();
    if (isLoading) {
        return <Spinner />;
    }

    if (!cities?.length) {
        return (
            <Message message="Add your first city by clicking on a city on the map" />
        );
    }

    const countries = cities.map((city) => {
        return { country: city.country, emoji: city.emoji };
    });
    cities.reduce((arr: CountryType[], city: CityType) => {
        if (!arr.map((el: CountryType) => el.country).includes(city.country)) {
            return [...arr, { country: city.country, emoji: city.emoji }];
        } else {
            return arr;
        }
    }, []);
    return (
        <ul className={style.countryList}>
            {countries.map((country, i) => (
                <CountryItem key={i} country={country} />
            ))}
        </ul>
    );
}

export default CountryList;
