import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { CityType } from "../components/CityList";

type ContextType = {
    cities: CityType[];
    isLoading: boolean;
    currentCity: CityType;
    getCity: (id: string | undefined) => void;
    createCity: (newCity: CityType) => Promise<void>;
    deleteCity: (id: string | undefined) => void;
};

const defaultCity: CityType = {
    id: 0,
    cityName: "",
    country: "",
    emoji: "",
    date: "",
    notes: "",
    position: {
        lat: "",
        lng: "",
    },
};

const CitiesContext = createContext<ContextType>({
    cities: [],
    isLoading: false,
    currentCity: defaultCity,
    getCity: async () => {},
    createCity: async () => {},
    deleteCity: async () => {},
});

const BASE_URL = "http://localhost:8000";

export default function CitiesProvider({ children }: { children: ReactNode }) {
    const [cities, setCities] = useState<CityType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentCity, setCurrentCity] = useState<CityType>(defaultCity);

    async function getCity(id: string | undefined) {
        try {
            setIsLoading(true);
            const res = await fetch(`${BASE_URL}/cities/${id}`);
            const data = await res.json();
            setCurrentCity(data);
        } catch (e) {
            alert("Error Loading data");
        } finally {
            setIsLoading(false);
        }
    }

    async function createCity(newCity: CityType) {
        try {
            setIsLoading(true);
            const res = await fetch(`${BASE_URL}/cities`, {
                method: "POST",
                body: JSON.stringify(newCity),
                headers: { "Content-Type": "application/json" },
            });
            const data = await res.json();
            setCities((cities) => [...cities, data]);
        } catch (e) {
            alert("Error Creating new city");
        } finally {
            setIsLoading(false);
        }
    }

    async function deleteCity(id: string | undefined) {
        console.log(id);
        try {
            setIsLoading(true);
            await fetch(`${BASE_URL}/cities/${id}`, {
                method: "DELETE",
            });
            setCities(cities.filter((city) => String(city.id) !== String(id)));
        } catch (e) {
            alert("Error Deleting City");
        } finally {
            setIsLoading(false);
        }
    }

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
                currentCity,
                getCity,
                createCity,
                deleteCity,
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
