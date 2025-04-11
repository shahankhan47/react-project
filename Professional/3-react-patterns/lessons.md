=======================================================================================================================
Highly Advanced React Patterns
=======================================================================================================================
Reusability in react:

-   UI
    -   components and props
    -   children prop
-   stateful logic
    -   custom hooks

Another resuability pattern (this is just a pattern and not a built-in react feature):

-   Render props pattern.
    -   Complete control over what the component renders by passing in a function that tells the component what to render.
-   Compound component pattern (this is just a pattern and not a built-in react feature):
    -   For very self contained components that need to manage their own state.
-   Higher Order Components.

=======================================================================================================================
Render Props pattern (See render-props project)
=======================================================================================================================

-   Our goal is to use the List component also for companies. It is currently only returning the list of products.
    -   One option could be to centralize the stateful logic (custom hooks) and share it for diiferent list components (ListProducts / ListCompanies) but with that way we won't be able to use the same buttons and some other UI components as well and also have to duplicate the List component.
-   Render props pattern goal is just to use the same List component but the only difference in code would be the lines:
    ```javascript
    {
        displayItems.map((product) => (
            <ProductItem key={product.productName} product={product} />
        ));
    }
    ```
    -   How can we achieve this?
    -   One option is to use the children prop. But the problem - no access to `displayItems`
    -   Best option - render props pattern.

Usage:

-   In the component (App.jsx) where the <List> component is called, pass a prop called render.
-   This render prop should contain the function that we want to call inside the <List> component.
-   This prop should always be a function
-   E.g.

    -   In App.jsx call:

    ```javascript
    <List
        title="Products"
        items={products}
        render={(product) => (
            <ProductItem key={product.productName} product={product} />
        )}
    />
    ```

    -   In the List component accept the render prop and pass it inside the map function like:

    ```javascript
    displayItems.map(render);
    ```

This is also a software development principle called Inversion of Control

=======================================================================================================================
Higher Order Components (HOC.js)
=======================================================================================================================

Let's imagine that we got a component <ProductList> in App.jsx from a third-party library which contains the function that we would want to pass in the render prop. This means that we cannot change the component but now have to figure out a way to reuse the <List> by passing this component without changing it.

We can create a higher order component to enhance/improve the third-party component.

-   a component whose name starts with "with" keyword (convention).
-   takes in another component as a prop (wrappedComponent)
-   returns a new component which is an improvement of the component (<List>) that we would want to reuse.
-   In this returned component, we do some operations on the wrappedComponent or it's props.

Summary -> Call the HOC component with the original one. It will return an enhanced component.

=======================================================================================================================
Compound Component Pattern
=======================================================================================================================
Very useful for modal windows, pagination, tables, etc.

Create a parent component, then a few different child components that really belong to the parent and only makes sense when used together with the parent. E.g. html select and option elements.

Uses context api (mostly) for implementation
