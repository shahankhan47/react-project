=======================================================================================================================
The Wild Oasis - Hotel Manangement
=======================================================================================================================
Project Requirements:

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
Initial App.jsx setup:

-   Using the declarative <BrowserRouter> and <Route>, instead of the imperative createBrowserRouter()
-   Add all the routes first.
-   Create the index route and replace it by default with dashboard.
-   All the pages components were already provided but they contained basic html div component only.

Initial App Layout setup:

-   create the AppLayout.jsx with basic <p> component first.
-   Create a new <Route> element with the AppLayout as the element (no path). Do not self close this Route element.
-   Place all the other routes that should be part of the main app as a children to this Route element.
    -   Login page and \* not included.
-   Remove the <p> and replace it with the <Outlet> component in the AppLayout.jsx file.
-   Create the Header.jsx and Sidebar.jsx as separate component to be used in AppLayout.
-   Header returns basic <header> element, Sidebar returns basic <aside> element for now.
-   Place the <Outlet> inside <main> component. Not necessary. This is because some components return fragment i.e. multiple elements which we would want to be placed directly inside the main component.
-   Style all your main, header and sidebar components. Experiment with colors and other stuff.
-   Style your AppLayout to position the sidebar, header and main app:
    -   display: grid;
        grid-template-columns: 26rem 1fr;
        grid-template-rows: auto 1fr;
        height: 100vh;
-   Style your sidebar to have the following css property `grid-row: 1 / -1`. This will make it span the full width of the page.

Build Navigation (Jump between pages):

-   Import the <Logo> and <MainNav> components inside <Sidebar> component.
-   The <MainNav> is a simple <nav> element and <Logo> returns a styled <div> component containing an <img> element for now.
-   place all your images in the public folder.
-   In the MainNav, add styled <ul> and inside that add all the <li> components. These are all the links.
-   Each <li></li> contains a styled <NavLink> component called StyledNavLink.
-   Each link contains an icon and a text wrapped in <span>.

=======================================================================================================================
Creating the backend with Supabase:

-   Created a new Supabase project.
-   Modeling data relationships
    -   State Domains ========================================================== Features
        Bookings ---------------------------------------------------- Bookings, Dashboard, Check in/out
        Cabins ----------------------------------------------------------------- Cabins
        Guests ----------------------------------------------------------------- Guests
        Settings --------------------------------------------------------------- Settings
        Users ------------------------------------------------------------------ Authentication
    -   The Booking state is unique as it will be linked to Guests and Cabins because:
        -   We need to know the booking is linked to which guest and is assigned which cabin.
    -   All are global states stored in Supabase.
    -   One table for each state (slice) in the database.

Creating Database:

-   create bookings, cabins, guests and settings table in supabase.
-   Supabase automatically creates users table for authentication.
-   Add policies in each table to enable read access to all users.

Connect to our react app:

-   npm i @supabase/supabase-js --save
-   import { createClient } from '@supabase/supabase-js'
    const supabaseUrl = 'https://xruibfoqjsllkkhebvoc.supabase.co'
    const supabaseKey = process.env.SUPABASE_KEY
    const supabase = createClient(supabaseUrl, supabaseKey)
-   Using specific api to read/write/delete data provided in the API docs for each table.
    -   Just compy and paste the code.

Setting Up storage buckets:

-   Create storage bucket under the storage section
-   Make the bucket public
-   Drag and drop images to store.
-   Get URL for the image.
