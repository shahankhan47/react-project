=======================================================================================================================
PROJECT REQUIREMENTS - The Wild Oasis - Hotel Manangement
=======================================================================================================================

1.  Users are hotel employees. They need to be logged in to use the app.
2.  New users can only be signed up inside the app.
3.  Users can upload avatar and change their username and password.
4.  Table view - Cabins. All cabins with cabin photo, name, capacity, price and current discount.
5.  Users can update or delete a cabin.
6.  Users can create new cabin (including uploading a photo)
7.  Table View - Bookings. Check-in and Check-out dates, status, paid amount, cabin data, guest data.
8.  Statuses - unconfirmed, checked-in, checked-out. Table should be filterable.
9.  Other booking data - no. of guests, no. of nights, guest observations, breakfast?, breakfast price.
10. Users can delete, check-in or check-out a booking as guest arrive.
11. On check-in, users need to accept payment (outside the app). Confirm payment is received (inside the app)
12. On check-in, guest can add breakfast for entire stay (if they haven't).
13. Guest data - full name, email, national-id, nationality, country flag
14. Homepage - dashboard containing important info about last 7, 30 or 90 days:
    -   List of guests checking in and out on current day. Users can perform these tasks from here.
    -   Statistics on recent bookings, sales, check-ins and occupancy rate.
    -   Chart showing daily hotel sales (both total and extra (breakfast) sales)
    -   Chart with statistics on stay durations.
15. Users can define few app wide settings like - breakfast price, min/max nights/bookings, max guests
16. App needs a dark mode.

Feature Categories:

1. Authentication: Points 1, 2, 3.
2. Cabins: Points 4, 5, 6.
3. Bookings: Points 7, 8, 9
4. Check-In/Check-Out: Points 10, 11, 12
5. Guests: Point 13
6. Dashboard: Point 14
7. Settings: Points 15, 16

Pages:

1. Dashboard -------------------------------- /dashboard
2. Bookings --------------------------------- /bookings
3. Cabins ----------------------------------- /cabins
4. Check In/Out ----------------------------- /checkin/:bookingID
5. Settings --------------------------------- /settings
6. Sign-Up ---------------------------------- /users
7. Login ------------------------------------ /login
8. Account ---------------------------------- /account

Tech Decisions:

Routing --------------------------------- React Router
Styling --------------------------------- Styled Components
Remote state management ----------------- React Query
UI State Manangement -------------------- Context API
Form Management ------------------------- React Hook Form
Other tools ----------------------------- React icons / React hot toast / Recharts / date-fns / Supabase

=======================================================================================================================
Project Setup:

-   npm create vite@4
-   cd <project-dir>
-   npm i
-   npm i --save-dev vite-plugin-eslint eslint-config-react-app eslint
-   create new file `.eslintrc.json`
    -   `{ "extends": "react-app" }`
-   In vite.config.js:
    -   import eslint from vite-plugin-eslint
    -   add `eslint()` to the plugins array
-   Delete everything inside src folder except main.jsx and App.jsx
-   Cleanup the main.jsx and App.jsx file removing unused imports, etc.
-   Return hello world from App.jsx
-   npm run dev
-   good to go

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
