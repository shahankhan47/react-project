import { useState, useEffect } from "react";
import styles from "../css-modules/Login.module.css";
import PageNav from "../components/PageNav";
import { useAuth } from "../contexts/FakeAuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Login() {
    // PRE-FILL FOR DEV PURPOSES
    const [email, setEmail] = useState("jack@example.com");
    const [password, setPassword] = useState("qwerty");

    const { isAuthenticated, login } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (isAuthenticated) {
            // replace true means that it current path /login will be replaced by /app so that
            // when going back, it won't go back to the /login page.
            navigate("/app", { replace: true });
        }
    }, [isAuthenticated, navigate]);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (email && password) login({ email, password });
    }

    return (
        <main className={styles.login}>
            <PageNav />
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.row}>
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>

                <div className={styles.row}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>

                <div>
                    <Button type="primary">Login</Button>
                </div>
            </form>
        </main>
    );
}
