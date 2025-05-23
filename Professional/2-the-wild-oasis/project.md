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
-   The render is happening in the same page for now but later will be moved to a modal.
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

=======================================================================================================================
Advanced react patterns (See 3-react-patterns project):

Creating a Modal Window (Adding a new cabin) (compound component pattern)

-   Refactoring Cabins.jsx page into AddCabin.jsx feature to make the page as simple as possible.
-   Instead of showing form, now showing the modal when button is clicked.
-   Passing the form as a children to the Modal.
-   Using react portal to move the Modal's position to the document body in DOM but stay the same in React element tree.
-   Converting the Modal into a compound component (advanced react pattern) for it to remember open/close state itself.
    -   created new versions for both AddCabin.jsx and Modal.jsx for compound component implementation
    -   during creation we used an advanced react feature called clone element.
    -   this is because when we passed the button into the <Modal.Open>, how can we set an event handler for it in the Modal component without passing it as a prop. (That is the whole point of Modal window is to not remember state itself).
        -   What we did is cloned the children (i.e. button) and edited its onClick prop there in the Modal itself.
-   Passed in onCloseModal prop to the createCabinForm.jsx and added logic for the styling and close in it.
    -   This way we won't be able to pass the onClose event handler to where we are calling the form because the logic to close the modal is inside the Modal component. Solution:
    -   cloneElement to the rescue again.
    -   cloned the children and passed onCloseModal to the close function.
    -   Now we can use this onCloseModal prop everywhere we use the modal.
-   Added logic (useState and useRef) to detect a click outside the modal window to close it.
    -   A very important lesson was learnt regarding event listeners. Events bubble up the DOM tree so if we just detect the click and close it, it will be opened for a milisecond and close back again because it detects the click on the button and then also on the outside of modal.
    -   To prevent this behaviour we used third arguement in the eventListener method to listen to the event in capturing phase.
-   Refactored all handle outside click logic into its own custom hook useOutsideClick.js

Edit/Delete Cabin:

-   Added modal window <ConfirmDelete> for deleting and <CreateCabinForm> for editing in CabinRow.jsx
-   Handled logic for asking for confirmation when deleting.

Creating a reusable table:

-   Table.jsx - created resuable table based on compound component pattern Created Header and Row only.
-   CabinTable.jsx - commented out styled components and used the above reusable Table instead.
    -   It also has Table.Header
    -   Left the map function as it is for now to refactor using render props pattern later.
-   CabinROw.jsx - commented out TableRow and instead used the above Table.Row.
-   CabinTable.jsx - passed render props into the Table.Body
-   created Table.Body

Creating a reusable menu

-   CabinRow.jsx version 2 used.
-   Files changed - CabinROw, CabinTable, Menus.jsx
-   There were lots and lots of changes (some very confusing but still ok)
-   Revisit how the Components are placed inside CabinRow.jsx.
-   Very small change in CabinTable.jsx
-   The weirdest thing is the handleClick function inside Menus.Toggle.

=======================================================================================================================
Other exciting features: Filter/Sort/Pagination/Auth/Dark Mode:
=======================================================================================================================
Reusable filter component:

-   In Cabins.jsx added <CabinTableOperations>.
-   In CabinTableOperations.jsx called <Filter> component.
-   In Filter.jsx created a reusable filtered component with basic react features like searchParams.
    -   Setting the url param with the filter selected.
-   In CabinTable.jsx, checking the url param and filtering out our data.

Reusable sort component

-   In <CabinTableOperations> added <SortBy> component
-   Created SortBy.jsx which uses a styled <Select> element.
-   In CabinTable.jsx added the sorting logic.

=======================================================================================================================
Building the bookings table:

-   Reused table components and did the same as Cabins for Bookings to build the bookings table.
-   Added a temporary button in the <Sidebar> to upload data for testing.

Using the reusable filter and sort component for API side filtering and sort:

-   See apiBookings.js, useBookings.js, Filter.jsx, BookingTable.jsx, BookingTableOperations.jsx.

Reusable Pagination component:

-   Pagination.jsx, useBookings.js, apiBookings.js, BookingTable.jsx
-   Prefetching data to store in cache (useBookings.js)

Creating the booking details page:

-   Booking.jsx in pages
-   Added side menu button in BookingRow.jsx which navigates to the booking page.
-   Writing all booking logic inside useBooking.js
-   Rendering the booking data in BookingDetail.jsx

Checking in a guest:

-   Created the <Checkin> page which redirects to CheckinBooking.jsx component.
-   Added a button to check in in BookingRow.jsx based on status.
-   Created useCheckin.js
-   Called useCheckin and useBooking hooks in the <CheckinBooking> component.

Checking out a guest:

-   Created the useCheckout.js hook.
-   Called the useCheckout and implemented it as a button event handler in both <BookingDetail> and <BookingRow>
-   Fixed a small bug in <Filter> component to set the page to 1 when it is not 1 and a filter is clicked.
    -   Because when the filter is clicked and api side filtering is happening, the data is re-fetched from api again.
    -   So when page is not 1 and there is very less data, it doesn't make sense and it should all fit in 1 page.

Deleting a booking:

-   Created useDeleteBooking hook copied the same from useDeleteCabin hook.
-   Called it inside event handler in both <BookingDetail> and <BookingRow>
    -   In both pages, it is called inside the Modal window as deleting anything should open a modal.

=======================================================================================================================
Authentication:

-   Added <Logo>, <Heading> and <LoginForm> in the Login page.
-   Disabled email confirmation from Authentication -> Sign In/Up -> Email in supabase.
-   Created new user in supabase.
-   Copied the Login User code and created a new file apiAuth.js inside services.
-   Created new function login inside apiAuth.js and pasted the login code there.
-   Created a new custom hook useLogin to actually login and handle errors using toast.

Authorization:

-   added the function getCurrentUser in the apiAuth.js.
-   create useUser custom hook.
-   Created <ProtectedRoute> component.
-   Wrapped the <AppLayout> inside the ProtectedRoute to only navigate when the user is Logged in.
-   Updated useLogin to pre-fetch the data and set the cache for the user.
-   In <LoginForm>, cleared the inputs after the onSubmit is clicked (onSettled - means whether it was success or error)

Logging out the user:

-   created function logout in apiAuth.js
-   created custom hook useLogout.
-   created Logout.jsx
-   called component <Logout> inside the <Header>

New User Sign-Up:

-   In the <Users> page, added <SignupForm>.
-   Updated the <SignupForm> with react-hook-form logic to input and handle form data.
-   Created the useSignUp custom hook and function signup in apiAuth.js.
-   called the signup mutation function in the onSubmit handler for the form.
-   Optional - enable email confirmation in supabase so that users need to verify their email first.
    -   we can setup our own email message to be sent to the user to get verified in supabase.
    -   can also setup the redirect urls once user gets verified or unverified in supabase.

Added Row Level Security (RLS) for all tables in supabase.

-   Edited the policies for all tables to only have scope set to "authenticated" users.

Creating user avatar in header:

-   Created UserAvatar.jsx
-   Created HeaderMenu.jsx
-   Added HeaderMenu in Header component, replacing it with the <Logout> component.
-   Moved the <Logout> component inside <HeaderMenu>
-   Modify RLS in the storage in supabase for both cabin and avatar images.

Account Management Page (Update user account, name, avatar and password):

-   create function updateCurrentUser in apiAuth.js
-   created custom hook useUpdateUser.js
-   In <Account> page, added <UpdateUserDataForm> and <UpdatePasswordForm>
-   <UpdatePasswordForm> was already completed.
-   Wrote the form submit logic inside UpdateUserDataForm.jsx using the useUpdateUser hook.

=======================================================================================================================
Adding Dark Mode:

-   Created a new context called DarkModeContext which manages global state.
    -   It has a provider and a hook.
    -   The provider stores the state in the local storage, constantly checks for the state.
    -   Adds or removes a class in the root element of html document.
    -   The hook returns the context values as it is standard ContextApi protocol.
-   Created a component <DarkModeToggle> - a button which uses the context by calling it's hook.
    -   This button only changes the icon on the header.
-   Used this <DarkModeToggle> in the <HeaderMenu>
-   Changed <Logo> component to switch logo based on light/dark mode state by using the context hook.
-   Finally added the CSS for root level classes `light-mode` and `dark-mode` in the GlobalStyles.js file.
    -   When the root level element has either of these class, the CSS values will be applied.
    -   This root element class is being added in the useEffect of the DarkModeProvider context.
