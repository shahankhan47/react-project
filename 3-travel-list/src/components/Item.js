function Item({ item, setItems }) {
    function onClick(e) {
        setItems((items) => {
            const index = items?.indexOf(item);
            items[index]["packed"] = true;
            return [...items];
        });
    }

    return (
        <li>
            <span
                style={item?.packed ? { textDecoration: "line-through" } : {}}
            >
                {item?.quantity} {item?.description}
            </span>
            <button onClick={(e) => onClick(e)}>X</button>
        </li>
    );
}

export default Item;
