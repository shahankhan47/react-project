====================================================================================================================
ADVANCE STATE MANAGEMENT
====================================================================================================================
State management with useState is not enough in certain situations:

-   When components have a lot of state variables and state updates, spread across many event handlers all across the component.
-   When multiple state updates need to happen at the same time (as a reaction to same event).
-   When updating one piece of state depends on one or more other pieces of state.

State with useReducer:

-   Alternate way of setting state
-   Ideal for complex state and related pieces of state
-   Stores related piece of state in a state object
-   Syntax: `const [state, dispatch] = useReducer(reducer, initalState)`
-   Needs a reducer function containing all logic to update state:
    -   Syntax: `function reducer(state, action) {...do something; return newState}`
    -   Decouples state updating logic from component itself (making component readable and clean)
    -   Is a pure function with no side effects and not allowed to mutate a state.
    -   Takes current state and action and returns the next state:
        -   state: previous state. Syntax - `type initialState`
        -   action: object that describes how to update state. Syntax - `{type: string, payload: any}`
    -   To trigger state update we use the dispatch function by sending actions from eventHandlers to reducer.
        -   Syntax - `dispatch(action)`
