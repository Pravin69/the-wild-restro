import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // Filter
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue, method: "eq" };

  // SortBy
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // Pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // QUERY
  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    // So this Query que is not just this string right here, but it can be any other things. And so here, we now can add that filter object that we created earlier. And so now, basically whenever this filter changes, then React Query will re-fetch the data. And so we can think of this array here, basically as the dependency array of useQuery. So this works exactly in the same way . And so this data that is currently being displayed, is actually stored in the cache, with exactly this Query key right here. So what this means is that when we click here, then this new data also gets added to our cache. And then when I move back, we have the whole power of React Query in display. Because then, we immediately get this data right here. And then we also see here by this orange color, that this right now is the current active data, but all the other data still stays in the cache. So here, we go back to bookings. Now, and this one we hadn't loaded yet, but now we have. And so at this point, we have all these four different statuses right here in our cache. So we can then move between them in this really nice and fluid way. So this is one of the big, big strengths of React Query that we didn't learn up until this point.
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  // PREFETCHING : So let's now learn what Prefetching is and how we can implement it using React Query in order to make the pagination experience a lot better. But what actually is prefetching? Well, prefetching is all about fetching some data that we know might become necessary before we actually need that data to render it on the user interface. And in the context of pagination, usually that means that we fetch the next page before it is actually displayed. So in this case, that would mean that here in page number seven, we would already have page number eight here in the cache and so then when we move there, this data from page number eight could simply be get from the cache and rendered.

  // So here we have the Query itself and then before we return this stuff, let's have or prefetching. And the way this works is that we first need to QueryClient and then on there we call the Prefetch Query method. So to get that QueryClient, we need to use the use QueryClient hook. So just like we did earlier when we did Query invalidation. So QueryClient comes from UseQueryClient. And so then here on QueryClient we can call PrefetchQuery. And so now the way this works is basically exactly the same as the UseQuery hook itself. So we need a Query key and a Query function inside an object and so let's grab all of this and paste it here. But now what we want to actually load is not this page, but page plus one and the same thing here. So we then also add plus one here to the Query key.
  const pageCount = Math.ceil(count / PAGE_SIZE)

  if(page < pageCount)
  queryClient.prefetchQuery({
    queryKey: ["bookings", filter, sortBy, page + 1],
    queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
  });

  if(page > 1)
  queryClient.prefetchQuery({
    queryKey: ["bookings", filter, sortBy, page - 1],
    queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
  });

  // console.log(bookings,count);

  return { isLoading, bookings, error, count };
}
