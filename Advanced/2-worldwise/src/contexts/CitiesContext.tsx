import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useReducer,
} from "react";
import { CityType } from "../components/CityList";

type ContextType = {
    cities: CityType[];
    isLoading: boolean;
    currentCity: CityType;
    getCity: (id: string | undefined) => void;
    createCity: (newCity: CityType) => Promise<void>;
    deleteCity: (id: string | undefined) => void;
    error: string;
};

type actionType = {
    type: string;
    // es-lint-disable
    payload?: any;
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

const initialState = {
    cities: [defaultCity],
    isLoading: false,
    currentCity: defaultCity,
    getCity: async () => {},
    createCity: async () => {},
    deleteCity: async () => {},
    error: "",
};

function reducer(state: ContextType, action: actionType) {
    switch (action.type) {
        case "loading":
            return { ...state, isLoading: true };

        case "cities/loaded":
            return {
                ...state,
                isLoading: false,
                cities: action.payload,
            };

        case "city/loaded":
            return { ...state, isLoading: false, currentCity: action.payload };

        case "city/created":
            return {
                ...state,
                isLoading: false,
                cities: [...state.cities, action.payload],
                currentCity: action.payload,
            };

        case "city/deleted":
            return {
                ...state,
                isLoading: false,
                cities: state.cities.filter(
                    (city) => String(city.id) !== String(action.payload)
                ),
                currentCity: {},
            };

        case "rejected":
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };

        default:
            throw new Error("Unknown action type");
    }
}

const CitiesContext = createContext<ContextType>({
    cities: [],
    isLoading: false,
    currentCity: defaultCity,
    getCity: async () => {},
    createCity: async () => {},
    deleteCity: async () => {},
    error: "",
});

const BASE_URL = "http://localhost:8000";

export default function CitiesProvider({ children }: { children: ReactNode }) {
    const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
        reducer,
        initialState
    );
    // const [cities, setCities] = useState<CityType[]>([]);
    // const [isLoading, setIsLoading] = useState(false);
    // const [currentCity, setCurrentCity] = useState<CityType>(defaultCity);

    useEffect(() => {
        async function fetchCities() {
            try {
                dispatch({ type: "loading" });
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                dispatch({ type: "cities/loaded", payload: data });
            } catch (e) {
                dispatch({
                    type: "rejected",
                    payload: "There was an error loading cities...",
                });
            }
        }

        fetchCities();
    }, []);

    async function getCity(id: string | undefined) {
        if (String(id) === String(currentCity.id)) {
            return;
        }
        try {
            dispatch({ type: "loading" });
            const res = await fetch(`${BASE_URL}/cities/${id}`);
            const data = await res.json();
            dispatch({ type: "city/loaded", payload: data });
        } catch (e) {
            dispatch({
                type: "rejected",
                payload: "There was an error loading the city...",
            });
        }
    }

    async function createCity(newCity: CityType) {
        try {
            dispatch({ type: "loading" });
            const res = await fetch(`${BASE_URL}/cities`, {
                method: "POST",
                body: JSON.stringify(newCity),
                headers: { "Content-Type": "application/json" },
            });
            const data = await res.json();
            dispatch({ type: "city/created", payload: data });
        } catch (e) {
            dispatch({
                type: "rejected",
                payload: "There was an error creating the city...",
            });
        }
    }

    async function deleteCity(id: string | undefined) {
        try {
            dispatch({ type: "loading" });
            await fetch(`${BASE_URL}/cities/${id}`, {
                method: "DELETE",
            });
            dispatch({ type: "city/deleted", payload: id });
        } catch (e) {
            dispatch({
                type: "rejected",
                payload: "There was an error deleting the city...",
            });
        }
    }

    return (
        <CitiesContext.Provider
            value={{
                cities,
                isLoading,
                currentCity,
                getCity,
                createCity,
                deleteCity,
                error,
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
