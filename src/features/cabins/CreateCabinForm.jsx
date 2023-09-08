/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();

  const isWorking = isCreating || isEditing;

  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  // React Hook Form : So the library that we're going to use is really only about handling the form submission and form errors and things like that. So it doesn't give us any prebuilt components. So instead what we have already is the create cabin form.

  // Alright, so notice that we didn't make any of these inputs here, controlled elements. So we don't have a state variable for any of them, right? And we won't need to create one because now we will handle everything about this form using this library that we just installed. And so let me show you how. So we will call the use, form hook. And so this will give us a few functions that we can use. And the most fundamental one is the register function and then also very fundamental as well, is the handle submit function. And later we will use a few more things. But really one of the most fundamental things about React Hook Form, is to essentially register inputs into this hook. So into the form that we are setting up using, use form. And the way that this works is by coming here, entering JavaScript mode and then spread the result of calling register. So this looks very strange, but just roll with it for now. And then here we give it the name of the field. So let's just call it "name" which is exactly the same as ID here.

  // And now in order to see what this actually does let's come to our components tree which we haven't seen in a long time. And apparently it's at the very end. So let's check this input right here. So notice how this got, these new props here that we actually didn't place there ourselves. So there is no on blur and no on change to be seen on this input field. But now they are here and they have these functions. And so all of this was placed there by React Hook Form simply by us doing this. So basically the results of calling this register will be these props associated with these functions. So this next input should have it as well.

  // So always the first step is to register all the input fields that we actually want React hook form, to handle. And then the second part is to specify the on submit form here. And then, as you can guess, here we are going to call that handle submit function that we also received from use form. So handle submit, but here we really need to call it. And what we need to call it with, is our own function that we want to be called whenever the form is submitted.
  // const { register, handleSubmit,reset, getValues, formState } = useForm();
  // const { errors } = formState;

  // And so it is this function, that React Hook Form will then call whenever the form is submitted. So again, this form gets submitted whenever we click on this button. So this is pretty normal stuff. And then we specify an event handler function. And so that event handler will be the results of calling this handle submit, that we received from useform, with or on submit function. And so this will then be called with the actual data, so the data from all the fields that we register it.

  // Uploading File : So, let's select this file, open it, and so then we can take a look at what kind of data we get here. So, the image is this file list here where we will want to retrieve the very first element. So, this file right here. So, this is of the type of file. Then here we get the name and some other stuff. But this really does contain the image itself. And so, we now need to pass this also into our mutate function. So, then here, let's actually create a new object with all the data in it. So, we need to spread it out. And then we define the image property. And again, it is called image for the exact same reason that all these other fields have their names. So, ID, max capacity and so on. And so, that's because in super base, that's exactly the name that we gave our fields so to our columns. And so, here, we then of course, need to match exactly those. So, here, that's going to be data.image and then the very first one. Okay. And so now, let's go here to or create cabin function because this is where we will actually upload the image.
  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession)
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else {
      // Setting reset function on MutateFn onSucccessHandler : So now creating a cabin should work the same except again that as soon as we are finished here it will then not reset the form but luckily for us React query has thought of situations like this so we can not only use the on success handler here on use mutation but also right where the mutation actually happens, or in other words we can also pass a similar thing right here into the mutation function which in this case we renamed to create cabin but that's the same thing so this is just simply the mutate function that is coming from React query so basically that is coming from right here so it's the result of use mutation and so again we can place this on success handler function not only right here but also right in the function where the mutation actually happens so all we need to do is to pass in an object of options and so then there we can do on success and then here we can very simply call the reset function and also this call back right here actually gets access to the data that the mutation function returns or in other words we can here get access to this new cabin data that we return right here and so this data again is going to be the newly created cabin or the edited one
      createCabin(
        { ...data, image: image },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  }

  function onError(errors) {
    // console.log(errors);
  }

  // Handling form errors and validations with React Hook Form  : So probably where React hook form shines the most is in form error validation. Now let's move to form validation. So as I hinted at earlier, we can add some more stuff here to this register function. And in particular, we can as a second argument pass in an object for validation. So here we can do many, many things, but the simplest one is simply to define the required property and then here we can actually set an error message. So, for example, "This field is required". And let's grab this and paste this into all of our fields because all of them are actually required.

  // So with this, we made all of our fields required and so let's see what happens if validation fails for one of them. So this handlesubmit function here is actually called each time that we attempt to submit the form and at that point all our validations will be executed. So all of this here will then be checked. And in case that there is one error in one of the validations, then handlesubmit will not call this onSubmit function here, but instead it'll call the second function that we pass in here. So let's call it onError. So then onError here again and this one instead of the data receives the actual errors. And so as I attempt to submit the form, then here we do actually get these errors, so from this line 69, which is exactly this. So again, the reason is that validation failed for this field and for this one. And so then not this function was called, but instead the second one that we pass in. So here we can exactly see what errors we have. So again, in the description and the regularPrice field, great. So that's the most basic validation, but we can go a bit further.

  // So here for example, we can also set a minimum value, or we could also set a maximum value, but in this case, let's just go with the minimum. And then here we need to specify the value, so the minimum should be 1 and then we can also specify the message in case data validation fails. So capacity should be at least 1.

  // So the discount might actually be 0 which is even the default value, however, there is something really important, which is that the discount needs to be less than the regular price. So we cannot have a price of 100, but a discount of 200, that's just not possible, right? And so for that, so for that kind of situation, we can write our own custom validation functions. So for that we specify validate and then here we write a callback function. And this callback gets as an argument the current value that is currently being input in the field. And then here we can write any kind of logic that we want and as soon as that logic returns true, then the field will be correctly validated.

  // There just isn't a message because we didn't return one. So we can also return a message here. So basically if it is not true, then we will return this second part. And so then whatever we return from the validate function will become the error message. So let's say "Discount should be less than the regular price", okay. So of course we don't want to compare the value with 100, but really with the actual price, so with this one. So how do we get that value? Well, there's a nice function that comes here also from use form, which is called getValues. And so here we can call that function which as the name says gets all the values from the field, or from the entire form. And so then after calling that, this returns an object and then from there we can get the regular price, so regularPrice. And here this regular price should of course be actually greater or equal than the value or in other words, the value should be less than the regular price, only in this case this will be true and the validation will go through, but otherwise, then we get this problem right here.

  // All right, so this was a nice use case for writing our own validate function, but this can really be helpful in all kinds of situations. Okay, but now how do we actually get these kind of error message from our console.log right here into our application? So basically we will want to display something here or here on the site telling the user that something is wrong. Well, we can get these errors once again from the use form hook by using formState and then from that object we can read the errors property. So errors, taking that from formState. All right, and so now here we can use that error style component that we already have and display that here so in case data is an error. So let's use optional chaining for that. So .name because that's the name that we registered here and then let's grab the message from there, so .message. And if that exists, then we want to use that error component that I just mentioned. So here it's done, again, errors.name.message.

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Price should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          disabled={isWorking}
          defaultValue=""
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            validate: (fileData) => {
              if (typeof fileData === "string" || fileData?.length === 1)
                return true;
              return "File is required";
            },
          })}
        />
      </FormRow>

      <FormRow>
        {/* 
        
        Calling Function Conditionallly : And so if this form is ever used in some place where it isn't contained in a modal then it's not going to receive this onCloseModal prop, right? And so that means that we need to call this function here conditionally because again, it might not even exist. And so in that case, if it doesn't exist, then this will create a bug. 
        
        So let's actually create a callback here and then we can conditionally call a function with the optional chaining operator. So that's really convenient. And so if this is undefined then the function will not get called because of this optional chaining operator. 
        
        */}
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
