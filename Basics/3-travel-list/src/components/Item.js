function Item({ item, onPacked }) {
    function packItem(item) {
        onPacked(item);
    }

    return (
        <li>
            <span
                style={item?.packed ? { textDecoration: "line-through" } : {}}
            >
                {item?.quantity} {item?.description}
            </span>
            <button onClick={(e) => packItem(item?.id)}>X</button>
        </li>
    );
}

export default Item;
