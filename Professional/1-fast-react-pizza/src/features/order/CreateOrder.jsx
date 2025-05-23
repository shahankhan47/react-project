import { Form, redirect, useNavigation, useActionData } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
    /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
        str
    );

function CreateOrder() {
    const {
        username,
        address,
        position,
        status,
        error: errorAddress,
    } = useSelector((state) => state.user);
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";
    const [withPriority, setWithPriority] = useState(false);

    const formErrors = useActionData();
    const dispatch = useDispatch();

    const cart = useSelector(getCart);
    const totalCartPrice = useSelector(getTotalCartPrice);
    const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
    const totalPrice = totalCartPrice + priorityPrice;

    function handleGetPosition(e) {
        e.preventDefault();
        dispatch(fetchAddress());
    }

    if (!cart.length) {
        return <EmptyCart />;
    }

    return (
        <div className="py-6 px-4">
            <h2 className="text-xl font-semibold mb-8">
                Ready to order? Let&apos;s go!
            </h2>

            <Form method="POST">
                <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
                    <label className="sm:basis-40">First Name</label>
                    <input
                        type="text"
                        name="customer"
                        defaultValue={username}
                        required
                        className="input grow"
                    />
                </div>

                <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
                    <label className="sm:basis-40">Phone number</label>
                    <div className="grow">
                        <input
                            type="tel"
                            name="phone"
                            required
                            className="input w-full"
                        />
                    </div>
                    {formErrors?.phone && (
                        <p className="text-xs mt-2 text-red-700 bg-red-100 p-2 rounded">
                            {formErrors.phone}
                        </p>
                    )}
                </div>

                <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center relative">
                    <label className="sm:basis-40">Address</label>
                    <div className="grow">
                        <input
                            type="text"
                            name="address"
                            required
                            disabled={status === "loading"}
                            defaultValue={address}
                            className="input w-full"
                        />
                        {status === "error" && (
                            <p className="text-xs mt-2 text-red-700 bg-red-100 p-2 rounded">
                                {errorAddress}
                            </p>
                        )}
                    </div>
                    {!position.latitude && !position.longitude && (
                        <span className="absolute right-1 z-50 top-1">
                            <Button
                                type="small"
                                onClick={handleGetPosition}
                                disabled={status === "loading" || isSubmitting}
                            >
                                Get Position
                            </Button>
                        </span>
                    )}
                </div>

                <div className="px-4 py-4 flex items-center mb-12 gap-5">
                    <input
                        className="h-6 w-6 accent-yellow-400 focus:ring focus:ring-yellow-400 focus:outline-none
                        focus:ring-offset-2"
                        type="checkbox"
                        name="priority"
                        id="priority"
                        value={withPriority}
                        onChange={(e) => setWithPriority(e.target.checked)}
                    />
                    <label htmlFor="priority" className="font-medium">
                        Want to give your order priority?
                    </label>
                </div>

                <div>
                    {/* React specific - Hack to store a value in an element and make it hidden */}
                    {/* The name field is what will be the key in the formData object */}
                    <input
                        type="hidden"
                        name="cart"
                        value={JSON.stringify(cart)}
                    />
                    <input
                        type="hidden"
                        name="position"
                        value={`${position?.latitude}, ${position?.longitude}`}
                    />
                    <Button type="primary">
                        {isSubmitting
                            ? "Placing Order..."
                            : `Order Now for ${formatCurrency(totalPrice)}`}
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export async function action({ request }) {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    const order = {
        ...data,
        cart: JSON.parse(data.cart),
        priority: data.priority === "true",
    };

    if (!isValidPhone(order.phone)) {
        return { phone: "Please enter correct phone number" };
    }

    const newOrder = await createOrder(order);

    //Do not overuse this trick to call dispatch method after importing the store. Not recommended.
    store.dispatch(clearCart());
    return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
