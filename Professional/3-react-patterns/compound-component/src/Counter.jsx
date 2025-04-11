import { createContext, useContext, useState } from "react";

// How o create a compound component:

// 1) Create a context
const counterContext = createContext();

// 2) Create parent Component
function Counter({ children }) {
    const [count, setCount] = useState(0);
    const increase = () => setCount((c) => c + 1);
    const decrease = () => setCount((c) => c - 1);
    return (
        <counterContext.Provider value={{ count, increase, decrease }}>
            <span>{children}</span>
        </counterContext.Provider>
    );
}

// 3) Create the child components
function Count() {
    const { count } = useContext(counterContext);
    return <span>{count}</span>;
}

function Label({ children }) {
    return <span>{children}</span>;
}

function Increase({ icon }) {
    const { increase } = useContext(counterContext);
    return <button onClick={increase}>{icon}</button>;
}

function Decrease({ icon }) {
    const { decrease } = useContext(counterContext);
    return <button onClick={decrease}>{icon}</button>;
}

// 4) Add child component as properties of the parent component
Counter.Count = Count;
Counter.Label = Label;
Counter.Increase = Increase;
Counter.Decrease = Decrease;

export default Counter;
