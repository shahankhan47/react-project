import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";

function CartOverview() {
    // React specific - Very Important - Redux suggests to centralize all functions to be used in useSelctors and put
    // them in the slice file itself.
    // getTotalCartQuantity defined in the cartSlice file itself.
    const totalQuantity = useSelector(getTotalCartQuantity);
    const totalPrice = useSelector(getTotalCartPrice);

    if (!totalQuantity) {
        return null;
    }

    return (
        <div
            className="bg-stone-800 text-stone-200 uppercase px-4 py-4 sm:px-6 text-sm md:text-base
        flex items-center justify-between"
        >
            <p className="text-stone-300 font-semibold space-x-4 sm:space-x-6">
                <span>{totalQuantity} pizzas</span>
                <span>${totalPrice}</span>
            </p>
            <Link to="/cart">Open cart &rarr;</Link>
        </div>
    );
}

export default CartOverview;
