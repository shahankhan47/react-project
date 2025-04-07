import { formatCurrency } from "../../utils/helpers";
import DeleteItem from "./DeleteItem";
import UpdateItemQnty from "./UpdateItemQnty";
import { getCurrentQntyById } from "../cart/cartSlice";
import { useSelector } from "react-redux";

function CartItem({ item }) {
    const { pizzaId, name, quantity, totalPrice } = item;
    const currenQnty = useSelector(getCurrentQntyById(pizzaId));

    return (
        <li className="py-3 sm:flex sm:items-center sm:justify-between">
            <p className="mb-1 sm:mb-0">
                {quantity}&times; {name}
            </p>
            <div className="flex items-center justify-between sm:gap-6">
                <p className="text-sm font-bold">
                    {formatCurrency(totalPrice)}
                </p>
                <UpdateItemQnty id={pizzaId} currentQnty={currenQnty} />
                <DeleteItem id={pizzaId} />
            </div>
        </li>
    );
}

export default CartItem;
