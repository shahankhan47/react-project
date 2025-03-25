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

Global Keypress Event:

-
