import { Form, redirect, useNavigation, useActionData } from "react-router-dom";
import { useState } from "react";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
    /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
        str
    );

const fakeCart = [
    {
        pizzaId: 12,
        name: "Mediterranean",
        quantity: 2,
        unitPrice: 16,
        totalPrice: 32,
    },
    {
        pizzaId: 6,
        name: "Vegetale",
        quantity: 1,
        unitPrice: 13,
        totalPrice: 13,
    },
    {
        pizzaId: 11,
        name: "Spinach and Mushroom",
        quantity: 1,
        unitPrice: 15,
        totalPrice: 15,
    },
];

function CreateOrder() {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";
    const [withPriority, setWithPriority] = useState(false);

    const formErrors = useActionData();

    const cart = fakeCart;

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

                <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
                    <label className="sm:basis-40">Address</label>
                    <div className="grow">
                        <input
                            type="text"
                            name="address"
                            required
                            className="input w-full"
                        />
                    </div>
                </div>

                <div className="px-4 py-4 flex items-center mb-12 gap-5">
                    <input
                        className="h-6 w-6 accent-yellow-400 focus:ring focus:ring-yellow-400 focus:outline-none
                        focus:ring-offset-2"
                        type="checkbox"
                        name="priority"
                        id="priority"
                        // value={withPriority}
                        // onChange={(e) => setWithPriority(e.target.checked)}
                    />
                    <label htmlFor="priority" className="font-medium">
                        Want to give your order priority?
                    </label>
                </div>

                <div>
                    <input
                        type="hidden"
                        name="cart"
                        value={JSON.stringify(cart)}
                    />
                    <Button type="primary">
                        {isSubmitting ? "Placing Order..." : "Order Now"}
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
        priority: data.priority === "on",
    };

    if (!isValidPhone(order.phone)) {
        return { phone: "Please enter correct phone number" };
    }

    const newOrder = await createOrder(order);
    console.log(newOrder);
    return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
