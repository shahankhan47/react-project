import { ReactNode } from "react";
import style from "../css-modules/Button.module.css";

function Button({
    children,
    onClick,
    type,
}: {
    children: ReactNode;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    type: string;
}) {
    return (
        <button onClick={onClick} className={`${style.btn} ${style[type]}`}>
            {children}
        </button>
    );
}

export default Button;
