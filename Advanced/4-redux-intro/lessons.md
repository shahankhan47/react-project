=======================================================================================================================
REDUX
=======================================================================================================================
A 3rd party standalone library to manage global state, integrate with react using react-redux library.
All global state can be stored in one globally accessible store which is easy to update using "actions" (in useReducer).
Conceptually it is similar to (Context Api + useReducer).
There are 2 versions:

-   Classic Redux
-   Modern Redux Toolkit.

Mechanism of Redux is just like useReducer but there is a store where there are multiple reducers defined, usually one reducer per feature of the app (e.g. shopping cart, user data, theme, etc).

There is also functions called "action creators" in order to automate writing actions, helpful to keep all posible actions in one central place. This is just a convention, not a must.

=======================================================================================================================
CLASSIC REDUX
=======================================================================================================================
Installation:

-   npm i redux
-   npm i react-redux

File Structure:

-   create a new folder src/features.
-   inside features folder create a folder for each feature with folder name = feature name.
-   create a file called `<featureName>Slice` inside each feature folder.
-   in this file, place all your redux logic (reducers, action creators, state update logic)
-   export the reducers from each `stateSlice` file as default export.
-   export all other functions from each file as named export.
-   create a file called `store` outside the features folder and import all the reducers there.
-   create the `rootReducer = combineReducer({reducerName: reducerFunction})` in the store file
-   export default `const store = createStore(rootReducer)` from the store file.

Importing redux store in your react application:

-   `import { Provider } from "react-redux` in your index.js file.
-   wrap the `<App />` component inside `<Provider>` component.
-   `<Provider store={your-redux-store}>`

Using the redux store in your react components:
Getting states:

-   `const stateObject  = useSelector((store) => store.reducerName)`
-   `const stateName  = useSelector((store) => store.reducerName.stateName)`
-   do as much calculations inside the useSelector function.
-   this reducerName must be the that you provided above. See 11 lines above.
-   Now you can access states like `reducerName.stateName` and set states like

Setting states:

-   `const dispatch = useDispatch()`
-   import the action creators you want to use for any feature.
-   `dispatch(actionCreator)`
-   react/redux automatically knows which actionCreator is for which reducerFunction based on function params, action type, etc.

=======================================================================================================================
Thunk
=======================================================================================================================
Making asynchronous API calls (or any other async operation) in Redux.
A reducer is a pure function (no async operations or api calls).
2 ways of storing data fetched from api calls into the redux store:

1. Make async api calls in the component and call dispatch to update the state - not ideal or efficient.
2. If not in store and not in components then where:
    - Introducing thunks middleware.
    - Allows developers to run some code after dispatching an action but before it reaches the reducer.
    - Perfect for async operations.
    - API calls, timers, logging, etc.
    - The place for side effects.

Thunks allows redux to wait before dispatching the state data into the store.

Install:

-   npm i redux-thunk

Use thunk:

-   `import thunk from "redux-thunk"`
-   In the store file instead of just `const store = createStore(rootReducer)` do:
-   `const store = createStore(rootReducer, applyMiddleware(thunk))`

How to make asynchronous api calls and other operations in your action creators:

-   Create a new async function inside the action-creator function and return that function.
-   Put your action (dispatch) call inside this 2nd order function.
-   When a function is returned from an action creator inside of the action itself, react knows that it is an async function and thunk gets activated.
-   This function should receive 2 params - 1st param is the dispatch method and 2nd is the global state (optional).

Thunks - createAsyncThunk - new way of creating thunk (See PRofessional -> 1-fast-react-pizza -> userSlice.js):

1. Place your async function code inside a function expression like this:
    - `export const fetchAddress = createAsyncThunk("user/fetchAddress", async () => {<async code here>}`
2. Inside the slice object create a new property called "extraReducers" with the value of:
    - `extraReducers: (builder) => builder.addCase(fetchAddress.pending, (state, action) => {state.status = "loading";}),`
    - Inside the builder.addCase, we can add a case for 3 different types of states of the async function:
        - pending, fulfilled, rejected
    - You can add a `builder.addCase()` for all the 3 cases.

=======================================================================================================================
Redux Dev Tools:
=======================================================================================================================

-   Redux DevTools extension for google chrome.
-   npm i redux-devtools-extension
-   `import { composeWithDevTools } from "redux-devtools-extension`
-   `const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk))`
-   Debug with the `Redux` tab in the chrome debugger.

=======================================================================================================================
Modern Redux: Redux Toolkit
=======================================================================================================================
Preferred way of writing redux code.
Opinionated approach.
Classic Redux is not obsolete but not used most of the time.
We can use classic and modern redux both at the same time together.
Allows us to write a lot less code to achieve the same result.

Gives us 3 big things:

-   We can write code that mutate states inside reducers (will be converted to immutable logic behind the scenes by a library called `immer`)
-   Action creators are automatically created.
-   Automatically sets up `thunk` middleware and `dev-tools`.

Install:

-   npm i @reduxjs/toolkit
-   `import { configureStore } from "@reduxjs/toolkit"`
-   no combineReducer needed and no explicit middleware and dev-tools syntax.
-   `const store = configureStore({ reducer: { account: accountReducer, customer: customerReducer }});`

Creating feature-slice (behaves both as reducer and action-creator):

-   `import { createSlice } from "@reduxjs/toolkit"`
-   `const stateSlice = createSlice({name: <featureName>, initialState, reducers: {}})`
-   Inside the `reducers` property add your actions in the following way:
    -   Instead of using switch case (switching by action.type), just create a method of same name.
    -   The method and name of slice is equivaltent to doing `dispatch({type: <name>/<method>, payload: something})`
    -   The method has 2 params - 1st is "state" i.e. global state and 2nd is "action".
    -   The 2nd param `action.payload` is where your `payload: something` can be accessed.
    -   Example: `const accountSlice = createSlice({name: account, initialState, reducers: {deposit(state, action) {amount = action.payload}, }, })`
    -   To update the state, instead of returning new {...state, updatedState}, mutate the state directly.
    -   E.g. `const accountSlice = createSlice({name: account, initialState, reducers: {deposit(state, action) {amount = action.payload; state.balance += amount (mutating state)} }, })`

Exporting:

-   Instead of exporting the full slice as in classic redux, we only export the `featureSlice.reducer`
-   `export default accountSlice.reducer`

Dispatching the action:

-   Dispatching the action is the same as in classic redux.
-   E.g.: `dispatch({ type: "account/deposit", payload: converted });` for the example above.
-   Can also call like `dispatch(requestLoan(loanAmount, loanPurpose));`
-   To do this we need to `export {requestLoan} from accountSlice.actions` first.

Limitation:

-   The `action.payload` in the modern redux action only receives one arguement due to which if you want to pass multiple arguements in your dispatch({payload: payloadObject}) (passing payload as an object), it won't work.
-   Resolution for this is to separate the custom action into prepare() and reducer() methods.
-   E.g. Instead of defining `deposit(state, action) {amount = action.payload.amount; purpose=action.payload.purpose}`, do something like below:
    -   `deposit: {prepare(amount, purpose) {return {payload: { amount, purpose }}, reducer(state, action) {amount = action.payload.amount; purpose=action.payload.purpose; (mutate state here)}}}`

=======================================================================================================================
Redux vs (Context API + useReducer)
=======================================================================================================================

-   Context API - built into react
-   Redux - external library (increases bundle size)

-   Context API - Easy to setup a single context but for each state slice, need to create context from scratch (provider hell in App.js).
-   Redux - More work to setup initially but easy to create additional slices.

-   Context API - No mechanism for async operations
-   Redux - uses thunk as middleware for async operations (or other middlewares also).

-   Context API - performance optimization is a pain
-   Redux - performance is optimized out of the box.

-   Context API - no dev tools (uses react dev tools)
-   Redux - has excellent dev-tools.

Usage:

-   Context API:
    -   Small apps
    -   When you just need to share a value that doesn't change often (theme, language, authenticated user, etc)
    -   When state structure is not too complex.
    -   When you need to solve simple prop drilling problem
    -   When you need to manage state in a local sub-tree of the app (e.g. compound component pattern)
-   Redux:
    -   Large apps
    -   When there's lot of global UI states that needs to be updated frequently (shopping cart, opened tabs, etc).
    -   When using complex state with nested objects and arrays.
