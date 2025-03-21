import { useState } from "react";
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

    function handleAddItems(newItem) {
        setItems((items) => [...items, newItem]);
    }

    function onPacked(id) {
        // Below is incorrect way to update a state containing array of objects.
        // This is mutable way and react does not prefer to mutate objects
        // setItems((items) => {
        //     const index = items?.indexOf(item);
        //     items[index]["packed"] = true;
        //     return [...items];
        // });

        // Instead do this
        setItems((items) => {
            return items?.map((item) =>
                item?.id === id ? { ...item, packed: true } : item
            );
        });
    }

    return (
        <div className="App">
            <Logo />
            {/* Incorrect way is to send the setItems setter directly to the child component.
                Correct way is to create a new method handleAddItems to handle the change in state
                and pass that method down to the child component
             */}
            <Form onAddItems={handleAddItems} />
            <PackagingList initialItems={items} onPacked={onPacked} />
            <Stats items={items} />
        </div>
    );
}

export default App;
