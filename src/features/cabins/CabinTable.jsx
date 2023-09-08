import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();
  if (isLoading) return <Spinner />;

  if (!cabins.length) return <Empty resourceName="cabins" />;


  // 1. Filter
  const filterValue = searchParams.get("discount") || "all";

  let filteredCabins;
  if (filterValue === "all") {
    filteredCabins = cabins;
  }

  if (filterValue === "no-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  }

  if (filterValue === "with-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  }

  // 2. Sorting
  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  function compareText(a, b) {
    if (a["name"].toLowerCase() < b["name"].toLowerCase()) {
      return -1 * modifier;
    }
    if (a["name"].toLowerCase() > b["name"].toLowerCase()) {
      return 1 * modifier;
    }
    return 0;
  }

  const sortedCabins =
    field === "name"
      ? filteredCabins.sort(compareText)
      : filteredCabins.sort((a, b) => (a[field] - b[field]) * modifier);

  // Let's just give this element here the role of a row, and this one the role of a table. So this is just to make the HTML a bit more accessible, because this will actually function as a table, but we do implement it not using the table HTML element, but instead using divs and this header here. But by specifying the role, we then make sure that the browser knows that this actually should be a table and a row.
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        {/* Render Prop Pattern:  */}
        <Table.Body
          // data={cabins}
          // data={filteredCabins}
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;

// About React Query DevTools : Now, up until this point, all of this is really nothing not so new. So everything works here in the exact same way as before, even though we simplified our code a bit. But yeah, here it seems that everything is the same. However, watch what happens if I go now to another page, so if I move away from this component which has therefore unmounted. So now we can see that our state here so that this cabin data is inactive. But watch what happens if I go back here. So here is the same data again, and we didn't have to do any new fetch request. So there wasn't a loading spinner this time, because we already had the data from before. Now of course, if we loaded the page here first, then we don't have the cabin's data yet. And as we move here, it first needs to be fetched. And so then we get that loading spinner, and the data gets stored in our cache. Then again, as we move away the component amounts but the data stays in our cache. So traditionally, if we were doing it using a use effect hook, then as soon as we moved back to the page, the use effect hook would then fetch the data again. But here again, the data is already there. It's still in our cache. Now after some time, notice how the color here changed from green and fresh to stale. So this stale basically means inside React Query that the data is now old so that it's basically invalid. And so therefore when we do certain things, it will now automatically re-fetch the data.

// And one of the things that we can do, which will then trigger a re-fetch, is to move away from this browser tab and then come back to it later. So that will trigger a re-fetch as soon as the data is stale. All right, now at this point, the data is still fresh. And so if we go here now and then come back, it will not immediately re-fetch the page. Now we can't really see that because we didn't change anything, but let's change it to 100. So again, in this case, it didn't automatically re-fetch yet because the data is still fresh. And the time that it takes until the data becomes old, so until it becomes stale, is exactly that stale time that we defined in the previous lecture. So this value right here, this one minute that we set is the time that it takes for this data, as I just said, to become stale. So now that happened, that one minute has passed. And so as soon as I leave, for example, I can go to another browser tab or also just here. And then as I come back here, it will move from stale to fetching and then to fresh. So now we are back to that $100 there. So again, it is defined by this time right here how long it takes for the data to become stale. So here we can define that, and actually let's change it. So let's leave that there just as a reference and let's set a to 0. And so what this means is that now the data will always automatically become stale. So now the data is always invalid. So as soon as something here changes and we come back, it will immediately then re-fetch that.
