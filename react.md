Extremely popular - Huge job market. Gigantic third-party ecosystem.
Declarative - Telling react what a component should look like based on current state away from DOM using jsx.
Component-based - Each unit in the UI is a component.
State-driven - React updates dom away from dom reacting to states (automatically re-rendering)
Javascript library - React is only the view layer. To complete app, we need other layers like routing, api, etc.
Used for building interfaces
Created by Facebook - Created in 2011 by Jordan Walke. Open-sourced in 2013.

====================================================================================================================================
A component is:

- something that a react application is entirely made out of.
- building blocks of UI.
- has it's own UI, data and logic.
- can be reused, nested and data can be passed from one to another.
- Each component is concerned with only 1 piece of UI.
- Has to be a pure function in terms of props and state.

====================================================================================================================================
A JSX is:

- Declarative syntax to describe what components look like and how they work.
- Components must return a block of JSX.
- Extension of JS that allows us to embed JS, CSS and React components into HTML.
- It looks like HTML but is not.
- Each JSX element is coverted into React.createElement function call.
- We can use React without JSX.

Rules of JSX:

- Just like HTML but can enter JS by using {}
- Statements are not allowed inside {}. E.g. (for loop, if/else, switch, etc)
- JSX produces a JS expression.
- We can place other pieces of JSX inside {}
- We can write JSX anywhere in the component.
- A piece of JSX can only have one root element. If you need more use React.Fragment.

====================================================================================================================================
Imperative vs Declarative in React:
Imperative (How to do things):

- Manual DOM element selection and DOM traversing.
- Step-by-step DOM manipulation until desired UI is reached.

Declarative (What we want):

- Describe how UI should look like using JSX, based on current data.
- React is an abstraction away from DOM. We never touch the DOM.
- We think of UI as a reflection of current data.

====================================================================================================================================
Data in React means:

- State
- Props

React is a one way data-flow framework.

- makes apps predictable and easier to understand.
- makes apps easier to debug.
- is more performant.

====================================================================================================================================
Props:

- Used to pass data from parent to child component
- Essential tool to configure and customise component.
- Parent component control how child component look and work.
- Anything can be passed as props. Even other components.
- React.Strict makes props read-only and immutable. Mutate props would affect the parent, creating side-effects.
- If you need to mutate props, you actually need state.

====================================================================================================================================
State:

- internal data that can be updated by the component's logic.

====================================================================================================================================
