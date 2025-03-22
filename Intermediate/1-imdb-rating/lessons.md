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
