import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
    const [searchParams] = useSearchParams();

    // FILTER
    const filterValue = searchParams.get("status");
    const filter =
        !filterValue || filterValue === "all"
            ? null
            : { field: "status", value: filterValue };

    // SORT
    const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
    const [field, direction] = sortByRaw?.split("-");
    const sortBy = { field, direction };

    const {
        isLoading,
        data: bookings,
        error,
    } = useQuery({
        // Very important - React specific - this array can have all dependencies which will tell react to refetch when
        // the value is changed.
        queryKey: ["bookings", , sortBy],
        queryFn: () => getBookings({ filter, sortBy }),
    });

    return { isLoading, bookings, error };
}
