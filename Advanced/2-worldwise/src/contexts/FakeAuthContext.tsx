import { ReactNode, createContext, useContext, useReducer } from "react";

type Login = {
    email: string | undefined;
    password: string | undefined;
};

type User = {
    name: string;
    email: string;
    password: string;
    avatar: string;
};

type AuthContextType = {
    login: (Login: Login) => void;
    logout: () => void;
    user: User | null;
    isAuthenticated: boolean;
};

type StateType = {
    user: User | null;
    isAuthenticated: boolean;
};

type ActionType = {
    type: string;
    payload?: any;
};

const initialState: StateType = {
    user: null,
    isAuthenticated: false,
};

const AuthContext = createContext<AuthContextType>({
    login: async () => {},
    logout: async () => {},
    user: null,
    isAuthenticated: false,
});

const FAKE_USER = {
    name: "Shahan",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
};

function reducer(state: StateType, action: ActionType) {
    switch (action.type) {
        case "login":
            return { ...state, user: action.payload, isAuthenticated: true };
        case "logout":
            return { ...state, isAuthenticated: false, user: null };
        default:
            throw new Error("Unknown Action");
    }
}

export default function AuthProvider({ children }: { children: ReactNode }) {
    const [{ user, isAuthenticated }, dispatch] = useReducer(
        reducer,
        initialState
    );

    function login({ email, password }: Login) {
        if (email === FAKE_USER.email && password === FAKE_USER.password) {
            dispatch({ type: "login", payload: FAKE_USER });
        }
    }

    function logout() {
        dispatch({ type: "logout" });
    }
    return (
        <AuthContext.Provider value={{ login, logout, user, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("AuthContext was used outside the AuthProvider");
    }
    return context;
}
