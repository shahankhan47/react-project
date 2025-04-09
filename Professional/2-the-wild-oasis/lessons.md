=======================================================================================================================
Styled Components
=======================================================================================================================

-   npm i styled-components
-   VS Code extension: Styled Components

Styling:

-   `import styled from styled-components`
-   "const CustomH1 = styled.h1`write your css here`"
-   Instead of normal h1, use the above <CustomH1></CutomH1>

Global Styling:

-   Inside styles folder, create new file called GlobalStyles.js.
-   `import { createGlobalStyle } from "styled-components";`
-   export default GlobalStyles = createGlobalStyle`write global css here`
-   Usage:
    -   import this GlobalStyles component and place it at the top of your App.jsx file.
    -   do not make the whole app as a children of it but make it a sibling.
    -   return the <> </> fragment from the App.jsx file.
    -   To use any of the global css variables defined, we can use the `var()` method in our styled component like:
        -   `background-color: var(--color-brand-500)`

CSS Function (See Heading.jsx):

-   The styling defined in the styled component is inside a template literal (``) which means we can do any javascript operation using ${}.
-   We can define external variables and write css there and then place that inside the styled component. E.g.:
    -   "const test = `text-align: center`"
    -   inside the syled component just place it like: styled.div`other: styles; ${test}`
-   When we create the css for the external variable, we will not get the auto-complete feature. To avoid this, we can use the css class from styled-component like:
    -   "const test = css`text-align: center`"

Styled Component Props (See Heading.jsx):

-   styled components can receive props just like a react component.
-   we can check the props value and set the css conditionally like (here prop can be anything not just `type`):
    -   `const Heading = styled.h1`${(props) => props.type === "h2" && css`font-size: 3rem; font-weight: 600;`}``
-   In the above example, we are styling an h1 tag but setting the css for h2 if the prop `type = h2`. This is not recommended because it will make the component appear as an h2 tag even though it will render as an h1 element.
-   To avoid this react gives us a special prop called `as` and when we set this prop, the component will be rendered as the value we will provide
-   We can even set the default prop to a styled component like: `Row.defaultProps = {type: "vertical"}`. This way we wouldn't have to set the prop if it is of the default prop value.

Styling third party components:

-   Example { NavLink } from "react-router-dom.
-   We can just do `styled(NavLink)` instead of `styled.div`

=======================================================================================================================
React Icons
=======================================================================================================================

-   npm i reat-icons
-   import { IconName } from react-icons/<iconset>
-   See documentation. All the icon names and icon sets are there.
