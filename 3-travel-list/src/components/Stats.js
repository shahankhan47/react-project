function Stats({ items }) {
    if (items?.length === 0) {
        return (
            <footer className="stats">
                <em>Add some items to the list</em>
            </footer>
        );
    }

    const totalItems = items.length;
    const packedItems = items?.filter((item) => item?.packed)?.length;
    return (
        <footer className="stats">
            <em>
                You have {totalItems} items on your list and you have already
                packed {packedItems} ({(packedItems / totalItems) * 100} %)
            </em>
        </footer>
    );
}

export default Stats;
