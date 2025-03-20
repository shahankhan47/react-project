import Item from "./Item";

function PackagingList({ initialItems, setItems }) {
    return (
        <div className="list">
            <ul>
                {initialItems.map((item, i) => (
                    <Item item={item} key={item?.id} setItems={setItems} />
                ))}
            </ul>
        </div>
    );
}

export default PackagingList;
