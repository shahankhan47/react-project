import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Logo from "./components/Logo";
import Form from "./components/Form";
import PackagingList from "./components/PackagingList";
import "./index.css";
import Stats from "./components/Stats";

const initialItems = [
    { id: 1, description: "Passports", quantity: 2, packed: false },
    { id: 2, description: "Socks", quantity: 12, packed: false },
    { id: 3, description: "Charger", quantity: 1, packed: true },
    { id: 4, description: "Tshirts", quantity: 5, packed: false },
    { id: 5, description: "Pants", quantity: 5, packed: false },
    { id: 6, description: "Phone", quantity: 1, packed: false },
    { id: 7, description: "Bag", quantity: 2, packed: false },
    { id: 8, description: "Headphones", quantity: 1, packed: true },
    { id: 9, description: "Documents", quantity: 5, packed: false },
    { id: 10, description: "Shorts", quantity: 3, packed: false },
];

function App() {
    const [items, setItems] = useState(initialItems);

    return (
        <div className="App">
            <Logo />
            <Form setItems={setItems} />
            <PackagingList initialItems={items} setItems={setItems} />
            <Stats />
        </div>
    );
}

export default App;
