import { useReducer } from "react";

// React specific - Very important - useReducer hook.

// set a reducer function:
// @params: state - current state
// @params: action - any value that is sent as a parameter of dispatch() call.

type stateType = {
    count: number;
    step: number;
};

type actionType = {
    type: string;
    payload: number;
};

const initialState = { count: 0, step: 1 };

function reducer(state: stateType, action: actionType) {
    // Very common to use a switch statement in reducer function:
    switch (action?.type) {
        case "inc":
            return { ...state, count: state?.count + state?.step };
        case "dec":
            return { ...state, count: state?.count - state?.step };
        case "setCount":
            return { ...state, count: action.payload };
        case "setStep":
            return { ...state, step: action.payload };
        case "reset":
            return initialState;
        default:
            throw new Error("Unknown Action - Resetting state and count");
    }
}

function DateCounter() {
    // const [count, setCount] = useState(0);
    // const [step, setStep] = useState(1);

    // useReducer hook - usually used when a state is an object and not a single value.
    // state - state name
    // dispatch - a function to call and pass a parameter that would be computed in the 'reducer' function as
    // it's second parameter.
    const [state, dispatch] = useReducer(reducer, initialState);
    const { count, step } = state;

    // This mutates the date object.
    const date = new Date();
    date.setDate(date.getDate() + count);

    const dec = function () {
        dispatch({ type: "dec", payload: step });
    };

    const inc = function () {
        dispatch({ type: "inc", payload: step });
    };

    const defineCount = function (e: React.ChangeEvent<HTMLInputElement>) {
        dispatch({ type: "setCount", payload: Number(e.target.value) });
    };

    const defineStep = function (e: React.ChangeEvent<HTMLInputElement>) {
        dispatch({ type: "setStep", payload: Number(e.target.value) });
    };

    const reset = function () {
        dispatch({ type: "reset", payload: 0 });
    };

    return (
        <div className="counter">
            <div>
                <input
                    type="range"
                    min="0"
                    max="10"
                    value={step}
                    onChange={defineStep}
                />
                <span>{step}</span>
            </div>

            <div>
                <button onClick={dec}>-</button>
                <input value={count} onChange={defineCount} />
                <button onClick={inc}>+</button>
            </div>

            <p>{date.toDateString()}</p>

            <div>
                <button onClick={reset}>Reset</button>
            </div>
        </div>
    );
}
export default DateCounter;
