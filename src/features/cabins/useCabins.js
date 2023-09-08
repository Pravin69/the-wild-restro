import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
  // Fetching Data using React Query : So the most important function that we're going to use all the time is called the useQuery custom hook. So useQuery, and now here we need to pass in an object with two things. First, the queryKey. And so this will uniquely identify this data that we're going to query here. So this can be a complex array, or it can just be an array with a string, but it needs to be an array like this. So this cabin is what we will later also see insight or React Query dev tools. And again, this is what identifies each data. And so if later we would useQuery again on another page with this exact key, then the data would be read from the cache as we learned at the beginning. Now, right, and second is the actual query function. And so this is the function which, as the name says, is responsible for actually querying. So basically for fetching the data from the API. Now what's important is that the function that we specify here needs to return a promise. So in the most simple form, we could, for example, use the fetch API here, and then do some request to some URL here. However, this is not what we're going to do. Instead, we will again use the function that we already created. So this getCabins function here is an async function, and therefore it returns a promise. And that promise, when resolved, will return this data here, right? So that's how promises and async/await work. And so this data is standard one that will be stored into the cache. So all we need to do here is to specify that function. So getCabins, and then that's it. Now this, of course, will return something.

  // So we have the data, we have an error string, then we have all other kinds of things. And we also automatically get that isLoading state that I mentioned earlier. And actually in addition to that, we get a bunch of other states, so similar to that. So like isSuccess, or isPaused, or isFetching, or isError, or all of these other ones. Now instead of using these, we could also use the status. So for example, this one is right now at success, but in the beginning it will be at loading, probably. And so here the status, as I was saying, was initially loading. So we can use this one or we can just use isLoading, which, again, was true at the beginning.
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  return { isLoading, cabins, error };
}
