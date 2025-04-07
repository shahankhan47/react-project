import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action) {
            //payload = new cart item
            state.cart.push(action.payload);
        },

        deleteItem(state, action) {
            // payload = pizzaId
            state.cart = state.cart.filter(
                (item) => item.pizzaId !== action.payload
            );
        },

        increaseItemQuantity(state, action) {
            // payload = pizzaId
            const item = state.cart.find(
                (item) => item.pizzaId === action.payload
            );
            item.quantity++;
            item.totalPrice = item.quantity * item.unitPrice;
        },

        decreaseItemQuantity(state, action) {
            // payload = pizzaId
            const item = state.cart.find(
                (item) => item.pizzaId === action.payload
            );
            item.quantity--;
            item.totalPrice = item.quantity * item.unitPrice;

            if (item.quantity === 0) {
                // React specific - very important - trick to use other actions inside one action:
                cartSlice.caseReducers.deleteItem(state, action);
            }
        },

        clearCart(state, action) {
            state.cart = [];
        },
    },
});

export const {
    addItem,
    deleteItem,
    increaseItemQuantity,
    decreaseItemQuantity,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

// Redux syntax best practice - use the get keyword for functions to be used in useSelectors.
export const getTotalCartQuantity = (state) =>
    // React specific - Very Important - Redux encourages to do this complex calculations inside the useSelector
    // itself and not in the component.
    state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = (state) =>
    state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export const getCart = (state) => state.cart.cart;

export const getCurrentQntyById = (id) => (state) =>
    state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
