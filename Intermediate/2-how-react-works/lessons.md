=======================================================================================================================
HOW REACT WORKS
=======================================================================================================================

Component vs Instance vs Element:

Component:

-   Description of a piece of UI.
-   Is a function/class that returns react elements (element tree) usually written as JSX.
-   Blueprint or a template

Instance:

-   Instances are created when we use a component.
-   Actual physical manifestation of a component.
-   Has its own state and props.
-   Has a lifecycle.
-   Instances returns react elements.

React Elements:

-   JSX is converted into React.createElement() function calls.
-   A React element is the result of these function calls.
-   React element creates all information neceessary to create DOM elements for the current component instance.

DOM Elements:

-   The DOM elements created by the above function calls are actually what gets rendered in the UI.
-   It is the actual visual representation of the component instance in the browser.

=======================================================================================================================
Practical difference between calling a component as an instance and calling it as a function call:
Instance:

-   <ComponentName />
-   This is an instance of type "function ComponentName()" (or class ComponentName {} in case of class Component)
-   This will not modify the actual blueprint but will use as an instance

Function Call:

-   ComponentName()
-   This directly calls the component and returns the JSX that is getting returned.
-   This has a type of the element that gets returned. E.g. type of div in case of `return <div/>`
-   This will modify the actual blueprint. React will no longer see it as an instance.
-   Never use this way. It cannot manage its state when calling this way. It will violate the rules of hooks, etc.

=======================================================================================================================
How react protects from Cross Site Scripting attacks:

-   The react elements are of type Symbol.
-   Symbol is a primitive type in JS.
-   Symbol types cannot be trasmitted via json in an api.

=======================================================================================================================
How React updates the DOM:

-   When a state changes, react re-renders the UI.
-   In React, rendering is NOT updating the DOM or displaying elements on screen.
    Rendering only happens internally inside React, it doesn not produce visual changes.
-   Then is a "Commit" phase, where react actually writes to the DOM.
-   Final step is the "Browser Paint" step which actually writes to the screen.

When a render happens, it is for the entire application, not just for single component. It may look like the component is just getting rendered but that's not what happens behind the scenes.

=======================================================================================================================
How rendering actually works:

1. React creates a new virtual DOM in initial render:
    - A tree of all react elements created from all instances.
    - Cheap and fast to create multiple trees.
    - Nothing to do with shadow DOM.
2. Component instances triggered re-render.
3. React internally converts the updated JSX to React Elements.
4. Updates the virtual DOM.
    - Only the component that triggered re-render and all it's children gets updated.
5. Reconciliation + Diffing happens between the updated virtual DOM and Current Fibre Tree.
6. Updated Fibre Tree will be used to write to the DOM.
7. The updated fibre tree produces a list of DOM updates called "list of effects"
8. This list is used in the "Commit" phase.

Writing directly to the DOM everytime a render is triggered would be very inefficient and slow.
Usually only a small part needs to be updated.
React re-uses as much of existing DOM as possible.

=======================================================================================================================
Reconciliation and Fibre Tree:

-   Reconciliation is deciding exactly what DOM elements have updated, deleted, inserted so that other DOM elements do
    not get impacted if react updates those and their children.
-   Reconciliation is called Fibre in React.
-   Fibre Tree - internal tree of components before the state update, that has a "fibre" for each component instance and DOM element. It is a linked list.
-   Fibres are not re-created on every render.
-   Unit of fibre:
    -   Current state
    -   Props
    -   Side effects
    -   Used hooks
    -   Queue of work
-   Reconciliation can be done asynchronously:
    -   Rendering process can be split into chunks, tasks can be prioritized.
    -   Work can be paused, reused, thrown away.
    -   Enables concurrent features like Suspense and Transitions.
    -   Long renders won't block JS engine.

=======================================================================================================================
Reconciliation Process:

1. state updated.
2. triggers re-render
3. a new virtual DOM is created.
4. Reconciliation + Diffing happens with the Fibre Tree.
    - Components that needs update/insert gets updated/inserted first.
    - Components that got deleted, gets removed.
    - Components that were a children but had no impact stays the same.

Diffing - comparing elements based on their position in the tree.

=======================================================================================================================
The Commit Phase:

-   React writes to the DOM.
-   Commit phase is synchronous.
-   After the commit phase completes, the latest fibre tree becomes the current tree for the next render cycle.
-   The commit phase is done not by React but by ReactDOM (separate library).

ReactDOM, React Native, Remotion, etc are called renderers, not because they render but because they commit the results produced by the render to the DOM (or other hosts in case of mobile app - react native, video - remotion, etc)

=======================================================================================================================
RECAP:
Render Phase (asynchronous):

0. Fibre Tree (current element) already exists before trigger.
1. Render is triggered.
2. React elements got updated
3. New virtual DOM is created
4. Reconciliation and Diffing happens between Fibre Tree and New Virtual DOM.
5. Output is an updated fibre tree and list of DOM updates.

Commit Phase (synchronous):

1. DOM is updated

Browser Paint:

1. Updated UI is displayed on screen

=======================================================================================================================
How Diffing works and the key prop:

Assumptions:

1. 2 elements of different types will produce different trees.
    - Same Position. Different Element. E.g. is you change a `<div>` to a `<header>`:
        - react assumes entire sub-tree is no longer valid.
        - Old components are destroyed and removed from DOM, including state.
        - Tree might be re-built if children stayed the same but state is reset. Very important. React specific.
    - Same Position. Same Element:
        - Element will be kept (with child element), including state, in DOM.
        - New props are passed if they are changed between renders but state will not be destroyed.
        - Sometimes this is not what we want. Then we can use key prop. Very important. React specific.
2. Elements with a stable key prop stay the same across renders.
   These 2 assumptions allow react to go from O(n^3) to O(n) complexity.

=======================================================================================================================
The Key Prop:

-   Special prop we use to tell the diffing algorithm that an element is unique.
-   Allows react to distinguish between multiple instamces of the same component type.
-   When a key stays the same across renders (stable key), the element will be kept in the DOM even if the position in the tree has changed - Use: Using keys in lists.
-   When a key changes across renders (changing key), the element will be destroyed and a new one will be created in it's place, even if the position in the tree stays the same. - Use: Using keys to reset state.

=======================================================================================================================
LOGIC IN REACT COMPONENTS
=======================================================================================================================
2 types of logic in react components:

-   Render Logic:

    -   Code that lives at top level of component function.
    -   Participates in describing how the view should look like.

-   Event Handler Functions:
    -   Executed as a consequence of event that the handler is listening for (e.g. an onChange event handler)

=======================================================================================================================
Rules for Render Logic:

-   Components must be pure when it comes to render logic:
    -   Given the same props (input), a component instance should always return the same JSX (output).
-   Render logic must not produce side effects - no interaction with outide world is allowed:
    -   Do not perform network requests.
    -   Do not start timers.
    -   Do not directly use DOM API's
    -   Do not mutate objects or variables outside the scope of the component.
    -   Do not update state or refs, this will create infinite loop.

=======================================================================================================================
REACT STATES
=======================================================================================================================
Batch State Updates:

If we have multiple, state updates one after the other in an event handler, you would think that react would update every state and trigger a re-render for each of those state but that's not what happens.
React updates state in batch, so if there are 4 state updates one after the other, there are not 4 re-renders but only 1 re-render because all the state updates are batched.

State updates are also asynchronous, which means if there are multiple state updates and react chooses to update them as batch and you are using one of those states in between the updates, you would find that the state is the previous state and not the updated state.

-   Updated state variables are not immediately available after the setState call, but only after re-render.
-   This also applies for just one state update.
-   If we need to update state based on previous state value, we use a callback function to set state i.e.:
    -   `setState((state) => {...update the state})`

React 18+ provides automatic batching for state updates in event handlers, setTimeouts, WebAPI's, Promises, etc.

We can opt out of automatic batching by wrapping a state update in:

-   ReactDOM.flushSync() - very important. React specific.

=======================================================================================================================
REACT EVENTS
=======================================================================================================================
How react event works:

1. When an event is triggered a new event object is created at the root of DOM tree.
2. It travels down all the way to the element that triggered it. This is called capturing phase.
3. Immediately after that the event object travels up to the root again and traverses through every single child and parent element. This is called bubbling phase.
4. Event handler(s) that is attached to the element not only listens to the events on the target element but also during the bubbling phase:
    - E.g. if we added the same onClick handler in the <header> element, it will also be executed when the click happens in let's say a child <button> element.
5. We can prevent bubbling with `e.stopPropagation()`

=======================================================================================================================
React adds event handlers not in the element itself but to the root not of the react fibre tree.
When you add an onClick event listener to an element `<button onClick={function}>`:

-   Internally react does not do this: `document.querySelector("button").addEventListener("click", function)`
-   But react does this: `document.querySelector("#root").addEventListener("click", function)`

=======================================================================================================================
Event delegation:
Due to bubbling, we can make use of a concept called event delegation.

-   Handling events for multiple elements centrally in one single parent element.
-   Better for performance and memory usage, as it needs only one handler function.
-   Steps:
    -   Add handler to parent (.options)
    -   Check for target element (e.target)
    -   If target is one of the <buttons>, handle it.
    -   This is very common in vanilla JS apps but not so much in react.

Sometimes you may find strange behaviours related to events in react apps, so you know this may be the problem.
React automatically does this behind the scenes by default.

=======================================================================================================================
Synthetic Events:
React events are not vanilla JS event object but it is a synthetic event wrapped around the DOM's native event object.

-   has same interfaces. E.g. stopPropagation() and preventDefault()
-   Fixes browser inconsistencies, so that event works the same in all browsers.
-   Most syntetic events bubble. E.g. focus, blur and change except for scroll event.

Differences between react synthetic events and vanilla JS events:

-   Camel Case - `onClick` instead of `onclick`
-   Default behavious cannot be prevented by returning false but only by using `preventDefault()`
-   Attach "Capture" if you need to handle it during capture phase. E.g. `onClickCapture()`

=======================================================================================================================
LIBRARY VS FRAMEWORK
=======================================================================================================================
Framework:

-   All in one kit to build an application. E.g. Angular - provides everything that is needed to build a web app e.g.
    http requests, styling, routing, form management, etc.

Library:

-   Separate tools (ingredients) you can pick and choose to combine and build an application. E.g React:

    -   Routing - React Router, React Location
    -   Http Request - JS fetch(), axios
    -   Remote State Management - React Query, Apollo, SWR
    -   Global State Management - Contex API, redux, zustand
    -   Styling - Any CSS Module, Tailwind CSS.
    -   Form Management - React Hook Form, Formik
    -   Animations/Transitions - Motion, react-spring
    -   UI components - Material UI, Chakra, etc

-   Frameworks build on top of react:

    -   Next.JS
    -   Remix
    -   Gatsby
