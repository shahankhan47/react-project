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
