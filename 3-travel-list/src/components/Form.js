import { useState } from "react";

function Form({ setItems }) {
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(1);

    function handleSubmit(event) {
        // React specific - prevent page from loading when button is clicked. Very important.
        event.preventDefault();

        if (!description) {
            return;
        }

        const newItem = {
            id: Date.now(),
            description,
            quantity,
            packed: false,
        };
        setItems((items) => [...items, newItem]);

        // Controlled elements - setting back to default by updating just the state
        setDescription("");
        setQuantity(1);
    }

    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h3>What do you need for you trip?</h3>
            <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
            >
                {Array.from({ length: 20 }, (_, i) => i + 1).map((item, i) => (
                    <option value={item} key={item}>
                        {item}
                    </option>
                ))}
            </select>
            <input
                type="text"
                placeholder="Item..."
                value={description}
                // React Specific - Controlled Elements - Very Important
                // To change the input field use onChange method and store the value in a state.
                onChange={(e) => setDescription(e.target.value)}
            />
            <button>Add</button>
        </form>
    );
}

export default Form;
