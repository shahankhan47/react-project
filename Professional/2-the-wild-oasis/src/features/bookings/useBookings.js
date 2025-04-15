import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
    const queryClient = useQueryClient();
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

    // PAGINATION
    const page = !searchParams.get("page")
        ? 1
        : Number(searchParams.get("page"));

    // QUERY
    const {
        isLoading,
        data: bookings,
        error,
    } = useQuery({
        // Very important - React specific - this array can have all dependencies which will tell react to refetch when
        // the value is changed.
        queryKey: ["bookings", sortBy, filter, page],
        queryFn: () => getBookings({ filter, sortBy, page }),
    });

    // PRE-FETCHING
    const pageCount = Math.ceil(bookings?.count / PAGE_SIZE);
    if (page < pageCount)
        queryClient.prefetchQuery({
            queryKey: ["bookings", sortBy, filter, page + 1],
            queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
        });

    if (page > 1)
        queryClient.prefetchQuery({
            queryKey: ["bookings", sortBy, filter, page - 1],
            queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
        });

    return { isLoading, bookings, error };
}
