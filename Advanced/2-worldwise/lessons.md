===================================================================================================================
VITE
===================================================================================================================
Creating a new prroject with vite:

-   npm create vite@latest

Installing ESLint Manually:

-   npm i eslint vite-plugin-eslint eslint-config-react-app -- save-dev

Configure ES Lint:

-   Create .eslintrc.json
-   ```json
    { "extends": "react-app" }
    ```
-   Add the following code in vite.config.ts file:
    -   `import eslint from "vite-plugin-eslint"`
    -   `plugins: [react(), eslint()]` - eslint() added

===================================================================================================================
REACT ROUTER - SINGLE PAGE APPS
===================================================================================================================
Single Page Applications:

-   Applications that are built entirely on the client.
-   Rely heavily on routes - different URLs corresponds to different view.
-   Javascript is used to update the page (DOM)
-   Page is never reloaded.
-   Feels like a native app.
-   Additional data might be loaded from a Web API.
-   Install - `npm i react-router-dom@6 -- save-dev`

Routing between pages:

-   Define all routes within `<BrowserRouter> <Routes> <Route></Route> </Routes> </BRowserRouter>`
-   Instead of using `<a>` anchor tag we should use `<NavLink to="/route">Routed Page</NavLink>`

Nested Routes (/route1/route11/.../routex):

-   To create nested routes, declare routes inside a `<Route>` element.

Index Route:

-   Default child route that is going to be matched if none of the other child route matches.

Storing state in URL:

-   The url is an excellent place to store state and an alternative to useState in some situations
    -   Easy way to store state in a global place. Accessible to all components.
    -   Good way to pass data from one to another page without storing it into any temporary place.
    -   Makes it possible to bookmark or share the page with the exact UI state it had at that time.
-   This make routing dynamic.
-   Examples: open/close panels, currently selected list item, list sorting order, applied list filter, etc
-   Getting the params from the URL - `useParams()` hook is used. (only the param not the query)
-   Getting and setting the query variables:
    -   `const [searchParam, setSearchParams] = useSearchParams();`
    -   `const lat = searchParam.get("lat")`
    -   `setSearchParam({lat: value, lng: value})`

Programmatic navigation with `useNavigate` and `<Navigate />`:

-   We can also go back/forward a page with `useNavigate()(-1) or useNavigate()(+1)`
-   The `<Navigate />` is not used anymore except for especially inside nested routes.
-   `<Navigate/>` is used for default redirection inside nested routes. Check App.tsx

===================================================================================================================
STYLING IN REACT
===================================================================================================================
Option - Where - How - Scope - Based On

-   Inline CSS - JSX Elements - `style` prop - JSX ELement(Local) - CSS
-   CSS or SASS File - External File - `className` prop - Entire App(Global) - CSS - big problem
-   CSS Modules - One file per component - `className` prop - Component(Modular) - CSS - solution to the big problem
-   CSS-in-JS - External file - Creates new component - Component(Modular) - JS
-   Utility-first CSS - JSX Element - `className` prop - JSX Element(Local) - CSS

Alternative to using CSS (No CSS in application):

-   Using UI libraries: MUI, Chakra UI, Mantine, etc

In this project we have used CSS Modules, one css file per component. Importing the css file as a variable and
using it as a json object with the classes defined in the css file as json keys.

===================================================================================================================

-   using geoLocation as a reusable hook to fetch user's current location.
