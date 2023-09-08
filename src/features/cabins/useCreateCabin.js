import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import { toast } from "react-hot-toast";

export function useCreateCabin() {
    // And so, we will call again use mutation because here, we are going to change of course, the cabin data. And so whenever we change something, just like the deleting in the previous lecture. Or creating a new role like we are going to do now. So this will then return us an object, with the mutate function and also the isLoading state. And then here, remember, we need to pass in the mutate function. So mutation function. And so this is going to be, create cabin. And again, it could also be like this. So like new cabin. And then call it, with that "newCabin => createCabin(newCabin)" like this. But this is also not really necessary. So it's exactly the same thing. But anyway, now let's also immediately declare the onSuccess handler. And so here what's going to happen is that we will again create a new toast. So that's toast.success. And then new cabin successfully created. And then we need to again, also invalidate all queries. And the reason for that, again is that so right after submitting the form. And so right when the new cabin has been created. So that it appears then in the UI. So basically whenever this mutation here happens. We will then want to invalidate the cabin's Query again. So that this component here, will then basically re-fetch the cabin's data. So, then when this state here changes. It will again re-render this table.

  // But anyway, for that we need to again get our Query client. So use queryClient. And then here, let's do queryClient.invalidateQueries where the Query key is again, that array and then cabins. And then, it's always a good idea to handle errors. And React Query makes this just so easy. So here, let's then say toast.error And then error.message. Now okay, and so with this, let's now then use the mutate function and the is loading state.

  //  Now, one other thing that we can do here on success, is to also close the form or well. Actually we don't have that state variable here. And of course we could pass this down into this component. But let's not do that. Because this is just temporary anyway. But what we can do is to also here manually reset the form. So right after the form has been submitted. Let's also reset it. So to empty all the fields. And we can do that, by getting here the reset function also from use form. So, then, we need to move this up here. Because we now want to use this function later. Which is right here. So again, also after the success, we want to then just call the reset function. Now, you might be wondering why we are not simply doing all that right here in the on submit handler. Well, the reason for that is that first of all, here we are really only doing this if the mutation was successful. So only if really a new cabin has been added. And really only after the fact. Not immediately. Which is what would happen here. Also, it's really nice to keep all this codes here, outside of the event handler. So just encapsulated right here where the mutation is already happening anyway. Because this stuff is in a way really related to that mutation. And so we want to keep it here, really close. And so then the onSubmit handler is just really nice and clean.

  // Setting defaultValues with React Hook Form : Alright, and now how do we get these values into the input? Well, thankfully for us, there is once again a very easy way to do it with React Hook Form. So here we can actually pass in some options. And so one of those options is the defaultValues. However, if we are just using this form to create a new cabin, then we will not want any default values. And therefore, first of all, let's actually figure out if we are using this form to edit or to add a new cabin. So let's create a variable here which will contain that information. So let's call it isEditSession. And then, let's simply convert the editId to a Boolean. So basically if there is an editId, then this will become true. And if it's not, then the Boolean will convert it to false. And so here we can just use that. So isEditSession, and if so, then we want the editValues to become the default values. And if not, then just an empty object.
  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("Successfully created new cabin ");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { createCabin, isCreating };
}

