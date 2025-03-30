=======================================================================================================================
PROPS
=======================================================================================================================
Prop drilling:

    When we need to use a prop in a child component which is nested far too deep from the parent component,
    it can create a chain of passing down to prop from the parent component to each component until the child
    is reached. This is called prop drilling and can be a problem in real world projects where the nesting is
    too many levels deep.

    What happens generally is when we create a component inside another component, the usability of that component
    decreases.

    To overcome this there are 2 ways:
        - Component Composition
        - Passing explicit prop

=======================================================================================================================
Component Composition:

    Composition is when instead of creating a component which has another component inside it, we simply add the children prop instead of that parent component props. This makes the component highly reusable as now we can pass any type of children, jsx or any other component to that component and reuse it however we want.
    See App.tsx

=======================================================================================================================
Passing explicit prop:

Instead of children prop, you can also pass any element of your given name as a prop with the value set as the JSX that needs to be passed down. This also works but not very popular.
E.g. `<MoviesBox myElement={<h3>Hello {prop.name}<h3>} />`

=======================================================================================================================
Creating isolated reusable components - StarRating

-   When creating a reusable component we should keep in mind that we should not expose too many props to public.
-   keep the abstraction necessary for the component.
-   Too many props will make the component difficult to use and expose too much complexity.
-   Too little props make component not flexible enough and might make it not very useful.

=======================================================================================================================
EFFECTS AND DATA FETCHING
=======================================================================================================================
Component Lifecycle:

1. Initial Render / Mount:

    - Component instance is rendered for the first time.
    - Fresh state and props are created.

2. Re-Rendering of a component (Optional):

    - It can be rendered unlimited number of times.
    - Happens when:
        - State changes
        - Props change
        - Parent re-renders
        - Context changes

3. Unmount:
    - Component dies, destroyed and removed from screen.
    - State and props are destroyed.

How not to fetch data in react application:

-   Fetching or calling an http request inside the component (render logic) and updating a state with the fetched data.
    -   This will make react call the http request infinite amount of times and it will keep on fetching and updating the state.
    -   This will happen because it will immediately cause the component to re-render and the fetch request gets hit again, which will set the state again, which will re-render again, which will update state again, ... and so on.

How to fetch data:

-   Use hooks like useEffect, etc.

Side Effects:

-   An interaction between a React component and the world outside the component.
-   Code that actually does something e.g. data fetching, setting subscriptions, setting timers, manually accessing DOM.
-   Side effects should not be in render logic but in:
    -   Event handlers - when a specific event is triggered.
    -   Effects (useEffect, etc) - after a component mounts or re-renders.
        -   Effects allow us to write code that will run at different moments (mount, re-render, unmount)
        -   Used to keep a component in sync with some external system.
        -   We should not overuse this.
        -   Effects are synchronous so never use async inside a useEffect. If you want to use asynch, create another function inside it.
        -   Every state and prop used inside a useEffect should be included in the dependency array - otherwise a bug called stale closure will occur.

Loading State and Loading Indicator.
Handling errors and no internet connection fail safe.
useEffect hook runs after the browser paint on initial render.
useLayoutEffect runs before the browser paint - highly discouraged to use.

Cleanup functions:

-   Function that we can return from an effect (optional).
-   Runs on 2 occasions:
    -   Before the effect is executed again
    -   After a component has unmounted.
-   Potential Uses:
    -   HTTP Request -> Cancel request
    -   API Subscription -> Cancel Subscription
    -   Start timer -> Stop timer
    -   Add event listener -> Remove listener

Race Condition Problems:

-   Race condition is when there is a lot of network requests (api calls) happening in your app.
-   In our example, it happens when we type in searchbar for a movie name:
    -   with each letter then api call is made which is:
        -   inefficient
        -   can have race condition.
    -   Race condition means that all the api calls are racing to be completed.
    -   If say, when we type half a movie name e.g. incept and this request takes very very long time.
        Even longer than the complete movie name e.g. inception, then the response with one with name "incept" will
        be stored in the state.
-   To prevent this for http fetch, we can write cleanup functions for data fetching.

Rules of useEffect dependency array:

-   Every state/prop used in affect must be included
-   All "reactive values" must be included. It means any functions or variables that reference any other state, etc.
-   Dependencies choose themselves. Never ignore the `exhaustive-deps` ES Lint rule.
-   Don't use objects or arrays as dependencies. They are not primitive types.

Removing unnecessary dependencies:

-   Removing function dependencies:

    -   Move function into the effect.
    -   If function is used in multiple places, memoize it.
    -   If function doesn't use any reactive value, move it out of the component.

-   Removing object dependencies:

    -   Include only the properties of the object that is dependent on (primitive types).
    -   if that doesn't work, use same strategy for functions mentioned above.

-   Other strategies:
    -   If multiple reative values are related, use useReducer.
    -   Don't include setState and dispatch as react guarantees that these are stable between renders.

When not to use an effect:

-   Should be used as last resort.
-   3 case when they are overused:
    -   React to a user event - should be handled by an eventHandler and not inside effect.
    -   Fetching data on component mount - fine for smaller apps. For real-world libraries like react query should be used.
    -   Synchronizing state changes with one another - Try to use derived state and event handlers.

=======================================================================================================================
REACT HOOKS
=======================================================================================================================
Special built-in functions that allow us to "hook" into React internals:

    - creating/accessing state from fibre tree.
    - registering side effects in fibre tree.
    - Manual DOM selections - Many more

Always starts with "use"
Enable easy reusing of non-visual logic - we can compose multiple hooks into our own custom hook.
Give functional components the ability to own state and run side effects at different lifecycle points

Examples:

-   useState
-   useEffect
-   useReducer
-   useContext
-   useRef
-   useCallback
-   useMemo
-   useTransition
-   many more

Rules of Hooks:

-   Can only be called at the top level.
    -   Do not call them inside conditionals, loops, or after an early return.
    -   This is necessary to ensure they are all called in the same order.
    -   The reason is because internally react maintains a linked-list of hooks and they are called in the same order everytime there's a re-render. So calling a hook in a conditional/loop/etc would break the linked-list.
-   Only call hooks from React functions (functional components)

The useRef Hook:

-   Box (object) with a mutable .current property that is persisted across renders (normal variables are always reset).
-   2 Big use cases:
    -   Creating a variable that stays the same between renders (prev state, setTimeout, etc)
    -   Selecting and storing/preserving DOM elements
-   Refs are for data that is not in the visual output of the component.
-   Usually only appear in event handlers or effects but not in JSX.
-   Do not read/write the .current property in render logic.

Refs | State

Persists Across Renders | Persists Across Renders
Updating does not cause re-render | Updating causes re-render
Mutable | Immutable
Synchronous Updates | Asynchronous Updates

Custom Hooks:

-   Does logic that I want to use contain any hooks?
    -   No - use regular functions
    -   Yes - use custom hook.
-   Allows us to reuse non-visual logic in multiple components
-   One custom hook should have only one purpose - to make it reusable and portable (even across multiple projects)
-   Rules of hooks apply to custom hooks too.
-   Unlike components, can receive and return any relevant data.
-   Need to use one or more react hooks.
