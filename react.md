=======================================================================================================================
REACT
=======================================================================================================================
Extremely popular - Huge job market. Gigantic third-party ecosystem.
Declarative - Telling react what a component should look like based on current state away from DOM using jsx.
Component-based - Each unit in the UI is a component.
State-driven - React updates dom away from dom reacting to states (automatically re-rendering)
Javascript library - React is only the view layer. To complete app, we need other layers like routing, api, etc.
Used for building interfaces
Created by Facebook - Created in 2011 by Jordan Walke. Open-sourced in 2013.

=======================================================================================================================
A component is:

-   something that a react application is entirely made out of.
-   building blocks of UI.
-   has it's own UI, data and logic.
-   can be reused, nested and data can be passed from one to another.
-   Each component is concerned with only 1 piece of UI.
-   Has to be a pure function in terms of props and state.

=======================================================================================================================
A JSX is:

-   Declarative syntax to describe what components look like and how they work.
-   Components must return a block of JSX.
-   Extension of JS that allows us to embed JS, CSS and React components into HTML.
-   It looks like HTML but is not.
-   Each JSX element is coverted into React.createElement function call.
-   We can use React without JSX.

Rules of JSX:

-   Just like HTML but can enter JS by using {}
-   Statements are not allowed inside {}. E.g. (for loop, if/else, switch, etc)
-   JSX produces a JS expression.
-   We can place other pieces of JSX inside {}
-   We can write JSX anywhere in the component.
-   A piece of JSX can only have one root element. If you need more use React.Fragment.

=======================================================================================================================
Imperative vs Declarative in React:
Imperative (How to do things):

-   Manual DOM element selection and DOM traversing.
-   Step-by-step DOM manipulation until desired UI is reached.

Declarative (What we want):

-   Describe how UI should look like using JSX, based on current data.
-   React is an abstraction away from DOM. We never touch the DOM.
-   We think of UI as a reflection of current data.

=======================================================================================================================
Data in React means:

-   State
-   Props

React is a one way data-flow framework.

-   makes apps predictable and easier to understand.
-   makes apps easier to debug.
-   is more performant.

=======================================================================================================================
Props:

-   Used to pass data from parent to child component
-   Essential tool to configure and customise component.
-   Parent component control how child component look and work.
-   Anything can be passed as props. Even other components.
-   React.Strict makes props read-only and immutable. Mutate props would affect the parent, creating side-effects.
-   If you need to mutate props, you actually need state.

=======================================================================================================================
State:

-   internal data that can be updated by the component's logic.
-   is the data that component holds over time. necessary for information that it needs to remember throughout app life cycle.
-   can be looked as a component's memory.
-   state variable / piece of state - A single variable in a component.
-   Updating a state triggers react to re-render the component.
-   Allows developers to persist local variable between renders.
-   For data that should not trigger component re-render, do not use state.

=======================================================================================================================
The children prop:

-   Very important and useful prop to pass JSX down to children components.
-   Essential tool to make reusable and configurable components

=======================================================================================================================
How to split UI into components

-   Component size matters:
    -   Size is Huge:
        -   Too many responsibilities for one component.
        -   Might need too many props
        -   Hard to reuse
        -   Complex code, hard to understand
    -   Size is too small:
        -   Ending up with 100s of mini-components.
        -   Confusing codebase.
        -   Too abstracted.
-   Goal is to get the balance between the component being too specific (too small) and too broad (huge).
-   Ideal size should be:
    The questions below are all when you might want to use a new component (split the component into multiple)

    -   Logical separation (of content or layout of UI):
        -   Does the component has pieces of content/layout that does not belong together?
    -   Some or all components can be reusable:
        -   Is it possible to reuse part of the component?
        -   Do you want or need to reuse it?
    -   Each should have well defined responsibilities:
        -   Is the component doing too many things?
        -   Does the component rely on too many props?
        -   Does the component has too many states/effects?
        -   Code (including JSX) is too confusing?
    -   Shouldn't be overly complex

-   Personal coding style also matters (to what you should use - small/huge/ideal size).
-   When in doubt, start with a bigger component and separate it into smaller components as needed.

General Guidelines:

-   Creating new components, comes with abstractions which comes with more mental energy.
-   Name a component acc to what it does or what it displays.
-   Never declare a component inside another.
-   Co-locate related components inside same file.

=======================================================================================================================
Component Categories:

-   Most components will naturally fall into one of 3 categories:
    -   Stateless / Presentational
        -   No state
        -   Can receive props only to display
        -   USually small and reusable
    -   Stateful
        -   Have state
        -   Can still be reusable
    -   Structural
        -   Pages, layouts or screens
        -   Result of composition
        -   Can be huge and non-reusable

=======================================================================================================================
Some Performance Optimization Tools:

-   Prevent Wasted Renders:
    -   memoization: memo, useMemo, useCallback
    -   passing elements as children or normal prop
-   Improve app speed / responsiveness:
    -   useMemo, useCallback, useTransition
-   Reduce bundle size:
    -   Using fewer 3rd party packages
    -   Code splitting and lazy loading.

Optimizing wasted renders:

-   When does a component re-render?
    -   In 3 different situations:
        -   state changes
        -   context changes
        -   parent component re-renders
        -   One more partial situation - when props change (this is because parent re-renders)
-   Wasted render is a render that didn't produce any change in dom.
-   It is only a problem when that happens too frequently or a component is very slow.

Optimization trick with children prop (See Advanced -> 3-atomic-blog -> Test.js file):

-   If a component has some state changes and it returns a piece of JSX which does not depend on those state,
    whenever the state will change, it will also re-render the component (meaning it will return the JSX again).
    This is usual react behaviour.
-   If the state change is too slow, the JSX render will also take lot of time. But since the JSX is independent,
    we can also make it not re-render itself everytime the state is changed by making a separate component out of the JSX and passing it as a children prop.
-   This way react will not render the children everytime the state is changed in the parent. This is because when
    children prop is passed, we never pass any other data into the children so react knows that the it is
    independent of the state changes but with JSX returned in parent itself, react wouldn't know.

Memoization:

-   Memoize components with memo (See Advanced -> 3-atomic-blog -> App-Memo.js file)
    -   Used to create a component that will not re-render when its parent re-render, as long as the props stay the same between renders.
    -   Only works with props. Not local state changes or context changes.
    -   Only makes sense with component which is heavy (slow rendering), re-renders often, and does so with same props.
-   Memoize objects with useMemo
-   Memoize functions with useCallback

Issue with memo:

-   If we pass an object or function to child component as a prop, the child component will see them as new prop in each re-render. This is because in JS {} !== {}.
-   If it sees them as new prop, memo will not work.
-   This is why we would want to use useMemo and useCallback to memoize value (useMemo) and functions (useCallback)

useMemo and useCallback:

-   Values will be stored in memory and preserved in subsequent re-renders, as long as input (dependencies) stays the same.
-   Also have a dependency array.
-   When a dependency changes, value will not be returned from cache but will be calculated.
-   setter functions from useState are automatically memoized.
-   3 big use cases:
    -   Memoizing props to prevetn wasted re-renders.
    -   Memoizing values to avoid expensive re-renders.
    -   Memoizing values that are used in the dependency array of another hook (avoid infinite loops).

Code optimization using code-splitting and lazy loading:

-   Load a component (usually a page) instead of normal import do `const Page = lazy(() => import("./pages/Page"));`.
-   Wrap all the lazy loaded components in a `<Suspense fallback={FallbackElement}>` tag.

=======================================================================================================================
Some tips and cheatsheet:

-   callback function passed in useEffect means it will only run in the initial render and not on every re-render.
-   useEffect is run only after the component is rendered. So for the first render, it is run. Then if a state is changed inside it, it runs again. That is why you see 2 console.logs when you change a state once.
