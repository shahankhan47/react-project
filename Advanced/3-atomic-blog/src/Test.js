import { useState } from "react";

function SlowComponent() {
    // If this is too slow on your maching, reduce the `length`
    const words = Array.from({ length: 100_000 }, () => "WORD");
    return (
        <ul>
            {words.map((word, i) => (
                <li key={i}>
                    {i}: {word}
                </li>
            ))}
        </ul>
    );
}

// This method didn't exist before optimization
function Counter({ children }) {
    const [count, setCount] = useState(0);
    return (
        <div>
            <h1>Slow counter?!?</h1>
            <button onClick={() => setCount((c) => c + 1)}>
                Increase: {count}
            </button>
            {children}
        </div>
    );
}

export default function Test() {
    // Previous Code before optimization:
    // const [count, setCount] = useState(0);
    // return (
    //     <div>
    //         <h1>Slow counter?!?</h1>
    //         <button onClick={() => setCount((c) => c + 1)}>
    //             Increase: {count}
    //         </button>
    //         <SlowComponent />
    //     </div>
    // );

    // New code after optimization
    return (
        <div>
            <h1>Slow counter?!?</h1>
            <Counter>
                <SlowComponent />
            </Counter>
        </div>
    );
}
