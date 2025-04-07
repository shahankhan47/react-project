import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice";

function UpdateItemQnty({ id, currentQnty }) {
    const dispatch = useDispatch();
    return (
        <div className="flex gap-2 items-center md:gap-3">
            <Button
                type="round"
                onClick={() => dispatch(decreaseItemQuantity(id))}
            >
                -
            </Button>
            <span className="text-sm font-medium">{currentQnty}</span>
            <Button
                type="round"
                onClick={() => dispatch(increaseItemQuantity(id))}
            >
                +
            </Button>
        </div>
    );
}

export default UpdateItemQnty;
