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
-   Created some cabins rows.

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

=======================================================================================================================
Reading Cabin data:

-   Used react query to get Cabins Data inside CabinTable.jsx. Set a unique queryKey always.
-   Created styled div with role as table, containing styled header with role row component and then displaying all cabins.
-   Each cabinRow contains a styled div with role row and inside the div are:
    -   styled img to display cabin image.
    -   styled div to display cabin name
    -   normal div to display description and max capacity
    -   styled div to display price
    -   styled div to display discount
    -   normal button for now to delete the cabin

Deleting a Cabin:

-   created the deleteCabin api in apiCabins.js
-   enable public delete policy in supabase for now.
-   calling the api from the CabinROw.jsx using useMutate() hook.
-   alerting on error/success for now.
-   replacing alert with toast created by react-hot-toast

Creating a new Cabin (Working with react-hook-form):

-   in Cabins.jsx created a new local state called showForm.
-   added a button after CabinTable component which sets the showForm to true on click.
-   below the button conditionally rendered the <CreateCabinForm> component when showForm is true.
-   installed npm i react-hook-form@7
-   use the hook - useForm() and register all inputs.
-   create the onSubmit for the parent <Form> element
-   create the api in apiCabins.js file after setting up insert/update policy in supabase.
-   create the useMutate() hook with the api function created.
-   invalidate the cache for the relevant queryKey
-   call the `mutate(data)` inside your own onSubmit method.

Setting the app layout (sidebar and header) as fixed by adding `overflow: scroll;` to the <Main> in AppLayout.

Form Validation:

-   Form validation after setting the `{required: "This field is required"}` for each input.
-   Adding the onError method.
-   Validating some other fields using some more properties provided by react-hook-form like min/max/etc.
-   Adding custom validation to the discount field
-   Getting the errors from `formState`
-   Displaying the error conditionally for each input

Creating a new FormRow component because each Input in the form is almost the same.

-   The only weird thing is the `children.props.id`.
    -   This is because we know the component will always have only 1 children i.e. <Input> component.
    -   The <Label> is connected with the <Input> using the htmlFor prop.
    -   The htmlFor always has the same value as the id of the input.
    -   Therefore the id can be accessed inside the FormRow as children.props.id

Uploading an Image:

-   Registered the image in the form image input element.
-   Mutated the data to have image property as `data?.image?.[0]` as this is the actual image file.
-   Added code to create the new cabin with newly created image path in apiCabins.js
-   Added code to actually update the image to supabase bucket.
-   If there is an error, delete the newly created cabin.

Editing a Cabin:

-   Created clone of CreateCabinForm.jsx (v1)
-   In CabinRow.jsx passed the cabin as a prop named `cabinToEdit`
-   Also added a button and state to show/hide the CreateCabinForm for now. Will replace with modal in future.
-   Now in the new CreateCabinForm, extracted all data from `cabinToEdit` into id and all other values into editValues.
-   Checking if the <CreateCabinForm> when open is in edit mode or create mode by checking if id exists.
-   If edit mode:
    -   setting the defaultValues
    -   Submit button name changed to Edit Cabin
    -   Image input field not required because the image cannot be loaded as a default value.
-   In the apiCabins, renamed createCabin to createEditCabins and made changes based on optional param id.
    -   Also checked if the image property already has the imagePath for edit mode.
        -   the image property has imagePath when edit mode and has the image file when create mode.
        -   If in edit mode, the imagePath starts with the supabase url.
        -   If imagePath is already there, we keep it as it is.
        -   If image is a file, we create the new imagePath.
-   In the CreateCabinForm.jsx:
    -   Created separate mutations for create and edit.
    -   in the onSubmit called create mutate or edit mutate functions based on isEditSession
    -   Before that also set the image to whether it's the image path or image file.

=======================================================================================================================
Refactoring code into custom hooks:

-   Refactored all react query code into custom hooks:
    -   useDeleteCabin()
    -   useCreateCabin()
    -   useEditCabin()
    -   useCabins()
-   Called the reset function onSuccess as the second param of mutate functions instead of inside the useMutation().

Duplicating a cabin using useCreateCabin custom hook:

-   Added button in CabinRow.jsx to duplicate.
-   Replaced label names with icons.
-   called the useCreateCabins to duplicate a cabin when the button is clicked.

=======================================================================================================================
Working on App Settings

-   Created settings policy in supabase for read/write access.
-   apiSettings.js was already provided. It's almost same as apiCabins.js.
-   created custom hook useSettings.js
-   called the hook in UpdateSettingsForm.jsx
-   displayed the values in the relevant inputs.
-   copied useEditCabin.js hook and changed its name to useUpdateSetting.
    -   all variable names changed for cabin to settings.
-   called useUpdateSetting in UpdateSettingsForm.jsx
-   added onBlur event handler in all the field inpus. The handler calls the mutate function to update the setting.
