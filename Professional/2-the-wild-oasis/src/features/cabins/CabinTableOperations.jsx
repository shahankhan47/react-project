import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function CabinTableOperations() {
    return (
        <div>
            <TableOperations>
                <Filter
                    fiteredField="discount"
                    options={[
                        { value: "all", label: "All" },
                        { value: "no-discount", label: "No Discount" },
                        { value: "with-discount", label: "With Discount" },
                    ]}
                />
                <SortBy
                    options={[
                        { value: "name-asc", label: "Sort by name (A-Z)" },
                        { value: "name-desc", label: "Sort by name (Z-A)" },
                        {
                            value: "regularPrice-asc",
                            label: "Sort by price (low-high)",
                        },
                        {
                            value: "regularPrice-desc",
                            label: "Sort by price (high-low)",
                        },
                    ]}
                />
            </TableOperations>
        </div>
    );
}

export default CabinTableOperations;
