import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addItem, getCurrentQntyById } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQnty from "../cart/UpdateItemQnty";

function MenuItem({ pizza }) {
    const dispatch = useDispatch();
    const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza ?? {};
    const currenQnty = useSelector(getCurrentQntyById(id));

    function handleAddToCart() {
        const newItem = {
            pizzaId: id,
            name,
            quantity: 1,
            unitPrice,
            totalPrice: unitPrice * 1,
        };
        dispatch(addItem(newItem));
    }

    return (
        <li className="flex gap-4 py-4">
            <img
                src={imageUrl}
                alt={name}
                className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
            />
            <div className="flex flex-col grow pt-0.5">
                <p className="font-medium">{name}</p>
                <p className="text-sm italic text-stone-500 capitalize">
                    {ingredients.join(", ")}
                </p>
                <div className="mt-auto flex items-center justify-between">
                    {!soldOut ? (
                        <p className="text-sm">{formatCurrency(unitPrice)}</p>
                    ) : (
                        <p className="text-red-500 text-sm uppercase font-medium">
                            Sold out
                        </p>
                    )}

                    <div className="flex items-center justify-between gap-4">
                        {currenQnty > 0 && (
                            <div className="flex items-center gap-3 sm:gap-8">
                                <UpdateItemQnty
                                    id={id}
                                    currentQnty={currenQnty}
                                />
                                <DeleteItem id={id} />
                            </div>
                        )}

                        {!soldOut && currenQnty === 0 && (
                            <Button type="small" onClick={handleAddToCart}>
                                Add to cart
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </li>
    );
}

export default MenuItem;
