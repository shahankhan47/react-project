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
-   The `role` prop can be used if we want to style an element and want the browser to display it as some other element without rendering it as that other element.
    -   E.g. StyledDiv = styled.div``
    -   If we use <StyledDiv role="table"> it will act as table but will render in browser as div.

Styling third party components:

-   Example { NavLink } from "react-router-dom.
-   We can just do `styled(NavLink)` instead of `styled.div`

Adding default props to the styled component in the following way:

-   "StyledBUtton = styled.button.attrs({onClick: method})``"

=======================================================================================================================
React Icons
=======================================================================================================================

-   npm i reat-icons
-   import { IconName } from react-icons/<iconset>
-   See documentation. All the icon names and icon sets are there.

=======================================================================================================================
Supabase
=======================================================================================================================

-   Service to easily create a backend with Postgres.
-   Automatically creates a database and api. We don't need to create the backend.
-   No backend development needed.
-   Perfect to get up and running quickly.
-   Also comes with easy-to-use user auth and file storage

=======================================================================================================================
React Query
=======================================================================================================================

-   Powerful library for managing remote (server) state.
-   Many features that allow us to write a lot less code.
-   Also makes UI/UX better.

Why react query:

-   Data is stored in a cache.
-   Automatic loading and error states
-   Automatic re-fetching to keep the state synced.
-   Pre-fetch data -> fetch before displaying data (e.g. pagination).
-   Easy remote state mutation (updating)
-   Offline support.
-   Needed because remote state is fundamentally different from UI state.

Installation:

-   npm i @tanstack/react-query@4
-   In App.jsx:
    -   `const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: 60 \* 1000, },},});`
    -   Wrap the whole component inside <QueryClientProvider client={queryClient}>
-   Dev Tools: npm i @tanstack/react-query-devtools --save-dev
    -   `import { ReactQueryDevtools } from "@tanstack/react-query-devtools";`
    -   Add <ReactQueryDevtools initialIsOpen={false} /> just below the QueryClientProvider

The staleTime means how long react query should wait before fetching the data again as react query unlike useEffect does not fetch on every render but waits for a period of time to fetch again. If you want the fetch to happen before staleTime, just refresh the page.

Usage:

-   Fetching data:

    -   `const {...otherProperties, data} = useQuery({queryKey: ['your state key'], queryFn: fetchDataFn})`
    -   the query key should always be defined like: `['your state key']` as an array of 1 string.

-   Updating (Mutating a state) React Specific - Very Important:
    -   First use `useQueryClient()` hook to use existing client: `const queryClient = useQueryClient()`
    -   Use the `useMutation()` hook to mutate a state like:
        -   ```javascript
            const { isLoading: isDeleting, mutate } = useMutation({
                mutationFn: deleteCabin,
                onSuccess: () => {
                    alert("Cabin Successfully Deleted");
                    queryClient.invalidateQueries({
                        queryKey: ["cabins"],
                    });
                },
                onError: (err) => alert(err.message),
            });
            ```
        -   the method returns a function mutate which can be used in any eventHandler.
        -   the method accepts an object as param. The keys of the object are:
            -   mutationFn - your async api method
                -   mutationFn returns a callback which accepts only 1 param which is an object.
            -   onSuccess - what to do when the api returns success.
            -   onError - what to do on error.
            -   there are other keys as well. You can check out.
    -   Without invalidating the cache, when you mutate an object, react-query will not refetch the data and re-render the component. To make it refetch data, we need to invalidate the cache. To do this, we can call:
        -   `queryClient.invalidateQueries({queryKey: ["your state key"],})` inside the `onSuccess` function.

The reset function provided by useForm is not accessible in the custom hooks (different file). Solution:

-   The returned mutate function from the custom hooks takes in a second param as object having all the keys similar to what we set during useMutation().
-   We can just do something like this when calling the mutate functions:
    -   ```javascript
        editCabin(
            { newCabinData: { ...data, image: image }, id: editId },
            { onSuccess: () => reset() }
        );
        ```
-   storing data in the query cache when the query is set before actually using the query data:
    -   `queryClient.setQueryData(["user"], user);`
    -   see useLogin.js

Advantages of using custom hooks:

-   We can call custom hook in a prior page to get the data before we even load the page using the data.
-   This way there will be no wait time and the page will load in an instant.

=======================================================================================================================
Notifications in React (react-hot-toast):

-   npm i react-hot-toast --save

Usage:

-   In your App.jsx, create another self closing tag called <Toaster /> after <BrowserRouter/>.
-   The Toaster element should have the following props:

    -   ```javascript
        <Toaster
            position="top-center"
            gutter={12} //Space between window and the toast
            containerStyle={{ margin: "8px" }}
            toastOptions={{
                success: { duration: 3000 },
                error: { duration: 5000 },
                style: {
                    fontSize: "16px",
                    maxWidth: "500px",
                    padding: "16px 24px",
                    backgroundColor: "var(--color-grey-0)",
                    color: "var(--color-grey-700)",
                },
            }}
        />
        ```

=======================================================================================================================
React Hook Form:

-   npm i react-hook-form (version 7 is used here)
-   Inside your form component, use the hook `const { register, handleSubmit, reset, getValues, formState } = useForm();`
-   Register all Inputs:
    -   The register function needs to be placed in the following way in almost every input element:
        `<Input type="text" id="nameOfInput" {...register("nameOfInput" {required: "This field is required"})} />`
        -   This will create new props for the Input element like onChange() and onBlur() automatically.
        -   `{required: "This field is required"}` is only if the field is required and the value is the error message.
-   Create the onSubmit function in the parent <Form> element like:
    -   `<Form onSubmit={handleSubmit(yourOwnOnSubmitFunction, yourOwnErrorFunction)}>`
-   Now your own onSubmit function takes a param `data` which will have all the form inputs.
    -   keys of data are the `nameOfInput`.
    -   access the input data like `data.nameOfInput`
-   `yourOwnErrorFunction` receives param `errors` which contains the field names with errors as keys.
    -   E.g. `errors.description`
    -   This errors can also be retrieved when called like: `const {errors} = formState`
-   The `reset()` when called will reset the form and make it blank.
-   The `getValues()` can be used to get all values of all inputs.
    -   Get value of specific input: `getValues().nameOfInput`
-   Custom Validation - Checkout below code:
    -   ```javascript
        {...register("discount", {
            required: "This field is required",
            validate: (value) =>
                value <= getValues().regularPrice ||  // the discount value should be less than regular price
                "Discount should be less than the regular price",
        })}
        ```

Open your form with default values already there:

-   use the hook like: `useForm({defaultValues: values});`

=======================================================================================================================
Miscellaneous
=======================================================================================================================

Uploading an image:

-   Make the input type as file.
-   Upload an image and get the data from the form.
-   Create the image name: `const imageName = `${Math.random()}-${newCabin?.image?.name}`.replace(/\//g,"");`
    -   replacing all / to blank because if there's a blank, supabase creates a new folder.
-   Create image path: `const imagePath = `${SUPABASE_URL}/storage/v1/object/public/cabin-images//${imageName}`;`
-   Set the RLS policy to allow all users for your storage bucket in supabase.
-   When creating the new object containing the image property, set the image property to the imagePath:
    -   `.insert([{ ...newCabin, image: imagePath }])`
-   Upload the image to supabase: `const { error: storageError } = await supabase.storage.from("cabin-images").upload(imageName, newCabin?.image);`
-   Delete the cabin if there was an error:
    -   `if (storageError) {await supabase.from("cabins").delete().eq("id", data?.id);}`

React Portal:
Feature that allows us to render a component outside the parent component's DOM structure while still keeping the element in the same position in the element tree. Basically, we can render a component in any place we want inside the DOM tree but still leave the component in the dame place in the react component tree.
Generally used for elements that we want to use on top of other elements. E.g. modal windows, tooltips, menu, etc.
Part of react-dom.

Why this is needed when just setting some css style would work:
To avoid conflict with the css property {overflow: hidden} set to the parent. The element will not be shown in that case.

cloneElement:
create a new element based on other element. You can edit the components props in another component.
E.g. To edit the onClick property of a button passed as children without any onClick prop.

```javascript
cloneElement(children, { onClick: () => open(opensWindowName) });
```

Preventing event bubble up in eventListener:
Pass in a third arguement `true` to the eventListener method. `document.removeEventListener("click", handleClick, true);` to listen to the event in capturing phase.
