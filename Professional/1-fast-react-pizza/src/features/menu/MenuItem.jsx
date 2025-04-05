import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";

function MenuItem({ pizza }) {
    const { name, unitPrice, ingredients, soldOut, imageUrl } = pizza ?? {};

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

                    <Button type="small">Add to cart</Button>
                </div>
            </div>
        </li>
    );
}

export default MenuItem;
