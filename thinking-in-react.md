React Mindset
Thinking about components, state, data-flow, effects, etc.
Thiking in state transitions not element mutations.

Process:

1. Break desired UI into components and establish a component tree.
2. Build a static version (without state)

-   Data Flow:

    3. Think about state - when to use, type of state (global or local), where to place each piece.
    4. Establish data-flow - one way, child to parent, accessing global state.

Questions:

-   how to break up a UI design into components?as
-   how to make some components reusable?
-   how to assemble UI from all components?
-   what pieces of state do I need for interactivity?
-   Where to place state?
-   what type of state can or should I use?
-   how to make data flow through app?

=======================================================================================================================
Local vs Global State:

Local State:

-   Needed only by one or fre components.
-   State that is defined in a component and only that and child components have access to it.
-   We should always start with local state.

Global State:

-   State that many components might need.
-   Shared state accessible to every component.

=======================================================================================================================
STATE: When and Where:

When:

-   Need to store data
-   Will data change at some point?
    -   No: Regular const variable.
    -   Yes: Can be computed from existing state props?
        -   Yes: Derive state
        -   No: Should it re-render component?
            -   No: Ref (useRef)
            -   Yes: place new piece of state in the component.

Where:

-   The state only used by current component?
    -   Yes: Leave in component.
    -   No: Also used by a child component?
        -   Yes: Pass to child via props.
        -   No: Used by one or few sibling components?
            -   Yes: Lift state up to first common parent.
            -   No: Probably a global state. (Will learn about this later)

=======================================================================================================================
Derived State:

-   Computed from another existing piece of state or from props.
-   If we want another variable to store a calculated value of a state, we do not have to initialize it as a state.
    -   It will cause react to render for each time the actual state and the calculated state changes.
    -   Instead use a const/let variable.
    -   E.g. const [total, setTotal] = useState(1000)
        -   const discountedPrice = 0.75 x total
