=======================================================================================================================
FAST-REACT-PIZZA-MENU - REAL WORLD APPLICATION BUILD FROM SCRATCH
=======================================================================================================================
Project Planning (For small apps with one page and few features):

1.  Break desired UI into components
2.  Build a static version (without state)
3.  Think about state management + data flow.

Project Planning (For real world large apps):

1. Gather application requirements and features.
2. Divide the application into multiple pages.
    - Think about the overall and page-level UI.
    - Break desired UI into components.
    - Design and build a static version (without state).
3. Divide features into multiple feature categories.
    - Think about state management + data flow.
4. Decide libraries you want to use (and tech-stack)

=======================================================================================================================

High Level Requirements:

-   Users can order one or more pizzas from a menu.
-   Requires no user accounts / login / auth.
-   Pizza menu can change, should be loaded from an api.
-   Cart management
-   Ordering requires just their name, phone numbers and address.
-   If possible, GPS location should be provided.
-   User's can mark their orders as a priority, for additional 20% of cart price.
-   Orders are made with post request with order data (user data + selected pizzas).
-   No payment processing.
-   Each new order should have unique id, so users can look up their order.
-   User's can mark orders as priority even after order is placed.

Feature Categories and Necessary Pages:

1. User
    1. Homepage (/)
2. Menu
    1. Menu (/menu)
3. Cart
    1. Cart (/cart)
4. Order
    1. New order (/order/new)
    2. Looking up an order (/order/:id)

State Management:

1. User -> Global UI state (no account, so stays in app)
2. Menu -> Global remote state (fetched from API)
3. Cart -> Global UI state (no need for API, just stored in app)
4. Order -> Global remote state (fetched and submitted to api)

Technology Decisions:

-   Routing: React Router
-   Styling: Tailwind CSS
-   State management (Remote): React Router (New way of fetching data - render-as-you-fetch and fetch-on-render). Not really state management as it doesn't persist state.
-   State management (UI):Redux

File Structure: Feature-based

-   features
    -   menu
    -   user
    -   cart
    -   order
-   ui (for other reusable components)
-   services
-   utils

=======================================================================================================================
NEW WAY OF IMPLEMENTING ROUTES - REACT ROUTER WITH DATA FETCHING
=======================================================================================================================
Installation:

-   npm install react-router-dom@6

Usage:

-   Create the router:
    -   `import { RouterProvider, createBrowserRouter } from "react-router-dom";`
    -   `const router = createBrowserRouter([{path: "/route", element: <Element />}])`
    -   In App.js: `return <RouterProvider router={router} />;`
-   For nested routes:
    -   `const router = createBrowserRouter([{path?: "/route", element: <Element />, children: []}])`

=======================================================================================================================
Data Fetching (render-as-you-fetch):

-   In the component file, outside the component, create a new `loaderFunction()` or `loader()` function containing all the async operations and api calls and return the data. This function can actually be placed anywhere (centralised place recommended).
-   This function receives a param `{params}` which contains the route path param that you defined in the path when creating the browserRouter.
-   In the router object set the object as: `{path: "/path", element: <Element />, loader: loaderFunction}`
-   Inside the component call `useLoaderData()` from `react-router-dom` to get the async data.

When we fetched data in the old way using useEffect is called fetch-as-you-render approach. It creates a so called data loading waterfalls

=======================================================================================================================
Displaying a loading indicator:

-   Modern react router (react-router-dom) provides a new way of displaying a loading indicator using `useNavigation()`.
-   This is for the whole application and the return value is an object that contains a property `state`.
-   This `state` property changes to `loading` whenever any react router element, defined with a loader function, is in the loading state.

=======================================================================================================================
Displaying error page:

-   In the new react router, we can just define a property called `errorElement` inside the createBrowserRouter parent object with its value as the Error component we create.
-   We create the element in the parent and not in any nested (child) components because react errors bubble up to the parent.
-   To get the error message inside the error component, we can use an in-built hook `useRouteError()` which is provided by `react-router-dom`

=======================================================================================================================
React Router Actions - Writing Data:

-   react-router-dom provides its own `<Form>` tag to be used to write data for react router.
-   the `<Form>` component takes a prop called `method="POST"` which is http method (POST/PUT/DELETE but not GET).
-   Also optionally takes in a prop called `action="/order/new"` which is the path the form is going to be submitted to. By default the value is the closest route/path.
-   Now create an async function in the same component file out of the component (recommended but not necessarily) called `actionFunction()` or `action()`. This function takes `{ request }` as a param.
-   Use the below code to retrieve form data from the request variable:
    -   `const data = Object.fromEntries(await request.formData())`
    -   this data contains the form data submitted but it will not work until we connect the action function with the router.
-   Connect the action function in the router by:
    -   `{ path: "/order/new", element: <CreateOrder />, action: actionFunction, },`

Getting the written data (Error handling is most common use case):

-   In the router object set the object as: `{path: "/path", element: <Element />, loader: loaderFunction}`
-   Inside the component call `useActionData()` from `react-router-dom` to get the async data.
-   Most common use case of this is to handle errors when the actionData returns an error.

=======================================================================================================================
React router redirect (instead of useNavigate()):

-   react-router-dom also provides a function for path redirect which is called `redirect`.
-   Syntax: `redirect("/path/nestedPath")`
