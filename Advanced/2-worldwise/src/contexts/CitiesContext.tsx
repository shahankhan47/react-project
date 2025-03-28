import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { CityType } from "../components/CityList";

const CitiesContext = createContext<{ cities: CityType[]; isLoading: boolean }>(
    { cities: [], isLoading: false }
);

const BASE_URL = "http://localhost:8000";

export default function CitiesProvider({ children }: { children: ReactNode }) {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchCities() {
            try {
                setIsLoading(true);
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                setCities(data);
            } catch (e) {
                alert("Error Loading data");
            } finally {
                setIsLoading(false);
            }
        }

        fetchCities();
    }, []);

    return (
        <CitiesContext.Provider
            value={{
                cities,
                isLoading,
            }}
        >
            {children}
        </CitiesContext.Provider>
    );
}

export function useCities() {
    const value = useContext(CitiesContext);
    if (value === undefined) {
        throw new Error("CitiesContext was used outside the CitiesProvider");
    }
    return value;
}
