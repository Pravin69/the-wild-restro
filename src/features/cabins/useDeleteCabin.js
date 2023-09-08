import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  // Remote State Mutations using React Query : So the way we do mutations is not by doing "useQuery," but "useMutation." So just like this. And then here again, we need to paste in an object and the first element should be the "mutationFn." So this is the function that React Query will call, and so let's make this an arrow function, that will receive the ID and will then call the "deleteCabin" function that we just created with exactly that ID. And the way this is going to work will make sense to you when we actually then hook this up with the button there. So for now, just roll with this.

  // So all we need to do now is to save the results of "useMutation." And here let's just immediately de-structure this. So we will get again the "isLoading" flag and then what we also get is a "mutate" function. And so this is then basically a callback function that we can connect with the button in this case. All right. So here all we have to do now is on the "onClick" prop to call this "mutate" function with the current ID.

  // So let's just reload here and then as we click this will then delete the cabin. Okay, so something happened but this is not really that ground breaking yet. Because actually the UI didn't even update. So to make sure that cabin number two has actually been deleted, let's manually reload here. And so indeed cabin number two is gone. So our deletion worked, but again, up until this point, this is nothing so special, But we can make it special, or at least a bit more helpful, by also invalidating the cache as soon as this mutation is done. And so for that we can specify the "onSuccess" callback. So "onSuccess" and this then also accepts a function. And so here we can basically tell React Query what to do as soon as the mutation was successful. So, what do we want to do? Well, we basically want to re-fetch the data here in this situation. And the way this works in React Query, is by invalidating the cache.

  // But what matters is that as soon as we invalidate this cache, so this data with this key right here, then that will immediately fetch again. Because as the name says, this data is then invalid. Or the Query is invalid. So that's the same thing. So the way that we do this in our code, so of course we don't want our users to click there, is to get the Query client and then call "invalidateQueries" on there. So again, that "invalidateQueries" function actually needs to be called on the "queryClient." So right here. So how do we get access to our "queryClient" instance? Well, for that we have a special hook. So it's a hook which will give us the "queryClient" and it is simply called "useQueryClient." All right? And so now in here we can say "queryClient.invalidateQueries." And then here is where we tell it which exact Query, so which exact data, should be invalidated. So we specify exactly the same "queryKey" that we have there in our dev tools. Or in other words, this one that we defined for this Query. And so this is one of the reasons why it is so important that each Query is uniquely identified. Because then we can now invalidate this Query so that it will fetch again. So that's called "cabins," and this should now work.
  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      toast.success("Cabin was successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    // We also have the "onError" handler. And so this one receives the error that was actually thrown inside this function. So it receives it as an argument, and then here we can do anything we want with this. let's, for example, try to change something here. And so now this is wrong. And so now as we click here on Delete, we will not be able to delete this. So indeed we get the error: "Cabin could not be deleted," and this is exactly the error message that we throw right here. All right. So here, this "supabase" client will not be able to connect to our API. It will therefore create an error. And so here in case there is this error we then throw a new error with this error message. And so then this is exactly what we get here because... As I was saying, this "onError" event handler gets access to exactly that error. So the error thrown in the mutation function.
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteCabin };
}
