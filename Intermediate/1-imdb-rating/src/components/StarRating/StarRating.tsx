// React specific - Very important - Creating an isolated reusable component

import style from "./StarRatingStyle.json";
// import fullStar from "./full-star.svg";
import { ReactComponent as FullStar } from "./full-star.svg";
import { ReactComponent as EmptyStar } from "./empty-star.svg";
import { ReactEventHandler, useState } from "react";

function RateWithStars({
    onRate,
    isFull,
    onHoverIn,
    onHoverOut,
    color,
    size,
}: {
    onRate: ReactEventHandler;
    onHoverIn: ReactEventHandler;
    onHoverOut: ReactEventHandler;
    isFull: boolean;
    color: string;
    size: number;
}) {
    return (
        <span
            role="button"
            style={{
                ...style.starStyle,
                width: `${size}px`,
                height: `${size}px`,
            }}
            onClick={onRate}
            onMouseEnter={onHoverIn}
            onMouseLeave={onHoverOut}
        >
            {isFull ? (
                <FullStar fill={color} stroke={color} />
            ) : (
                <EmptyStar stroke={color} />
            )}
        </span>
    );
}

// maxRating = 5 when destructuring means a default value is set
export default function StarRating({
    maxRating = 5,
    color = "#fcc419",
    size = 48,
    className = "",
    defaultRating = 0,
    // Very important - React specific - When we creat a reusable component we want to pass out the information updated
    // inside the component to the one calling it. So need to pass a setter variable to update the rating:
    onSetRating,
}: {
    maxRating?: number;
    color?: string;
    size?: number;
    className?: string;
    defaultRating?: number;
    onSetRating?: Function;
}) {
    const [rating, setRating] = useState(defaultRating);
    const [tempRating, setTempRating] = useState(0);

    function handleRating(newRating: number) {
        setRating(newRating);
        if (onSetRating) {
            onSetRating(newRating);
        }
    }

    function handleHoverIn(newtempRating: number) {
        setTempRating(newtempRating);
    }

    function handleHoverOut() {
        setTempRating(0);
    }

    return (
        <div style={style.containerStyle} className={className}>
            <div style={style.starContainerStyle}>
                {Array.from({ length: maxRating }, (_, i) => (
                    <RateWithStars
                        key={i}
                        onRate={() => handleRating(i + 1)}
                        isFull={rating > i || tempRating > i}
                        onHoverIn={() => handleHoverIn(i + 1)}
                        onHoverOut={() => handleHoverOut()}
                        color={color}
                        size={size}
                    />
                ))}
            </div>
            <p
                style={{
                    ...style.textStyle,
                    color: color,
                    fontSize: `${size / 1.5}px`,
                }}
            >
                {tempRating || rating || ""}
            </p>
        </div>
    );
}
