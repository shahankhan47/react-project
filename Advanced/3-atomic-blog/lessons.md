===============================================================================================================
THE CONTEXT API - ADVANCED STATE MANAGEMENT
===============================================================================================================
To overcome the problem of prop drilling, component composition (children prop) is not always the best solution.
React has also provided us a way to pass states from a parent component to a deeply nested component.
This way is called the context api:

-   System to pass data throughout the app without manually passing props down the tree.
-   Allows us to "broadcast" global state to the entire app.
-   Also makes a component more independent and standalone and significantly increases it's reusability.
-   Parts:
    -   Provider: gives all child components access to a so called "value". The Provider usually sits at the very top of the component tree.
    -   value: data that we want to make available (usually state and functions)
    -   Consumers: all components that read the provided context value.
-   Whenever the context "value" is updated, all consumers are re-rendered.

Types of State:
In terms of state accessibility:

-   Local state
    -   Needed only by 1 or few components
    -   Only accessible in component and child components
-   Global State
    -   Might be needed by many components (including deeply nested)
    -   Accessible to every component in the app.

In terms of state domain:

-   Remote State
    -   All app data loaded from a remote server (API)
    -   Needs refetching + updating
-   UI State
    -   Everything else.
    -   Theme, list filters, form data, etc
    -   Usually synchronous and stored in the app itself.

Where to place state:

1. Child Component - When we have a local state - Tools: useState, useReducer, useRef.
2. Parent Component - When we need to lift up state - Tools: useState, useReducer, useRef.
3. Context - Global State (preferrably UI state) - Tools: Context API + useState, useReducer
4. 3rd-Party Libraries - Global State (remote or UI) - Tools: Redux, React Query, SWR, Zustand, etc.
5. URL - Global state passing between pages - Tools: React Router.
6. Browser - Caching data in browser - Tools: Local Storage, Session Storage, etc.

What tools to use when:

1. UI and Local - useState, useReducer, useRef
2. Remote and Local - fetch + useEffect + (useState/useReducer) - this is mostly in small apps
3. UI and Global - React Router, Context API + useState/useReducer OR Redux, React Query, SWR, Zustand, etc.
4. Remote and Global - Context API + useState/useReducer OR Redux, React Query, SWR, Zustand, etc.
