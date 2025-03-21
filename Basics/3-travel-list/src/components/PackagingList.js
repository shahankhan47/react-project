import Item from "./Item";

function PackagingList({ initialItems, onPacked }) {
    return (
        <div className="list">
            <ul>
                {initialItems.map((item, i) => (
                    <Item item={item} key={item?.id} onPacked={onPacked} />
                ))}
            </ul>
        </div>
    );
}

export default PackagingList;
