import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSettings } from "./useSettings";
import Spinner from "../../ui/Spinner";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
  // So right here in the beginning this data does actually not exist. So it is still undefined. So we can then not really do this because settings, as I just said, is undefined. But we can do a hack around this by basically setting the settings here to an empty array or an empty object here initially. And so then we will try to get these four from the empty object. And so then they're undefined, which is no problem. So notice how in the beginning they were actually empty and then these values got populated in there. And so let's actually also display a loading spinner there.
  const {
    isLoading,
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();

  const { isUpdating, updateSetting } = useUpdateSetting();

  if (isLoading) return <Spinner />;

  function handleUpdate(e, field) {
    const { value } = e.target;

    if (!value) return;

    // And so, here is where we need to pass in that object. So the object should have the field name. For example, minBookingLength, and the value. So we already passed the name of the fields here. And so let's accept that. And then we can dynamically generate an object, simply by passing that field name here. And so then, that will be replaced with whatever we pass in. And so here, then we get the value.
    updateSetting({ [field]: value });
  }

  // OnBlur event :  And so, let's do the actual updating right now. Getting a bit more space here. And so, the way that we want to do this is that whenever we click here, then we write some new value. And then as soon as we leave the field, we want the updating to happen. And so, we can do that with the onBlur event handler. So we can do onBlur. And then as always, we define our event handler function. So let's actually create a function out here. handleUpdate, which gets that event, and which also gets the name of the field that should be updated. So this one right here. And so, in this way, we can basically just create this one function, and then reuse it. So let's define that here. So handleUpdate. So it receives this. And then we can start by getting the value from there. So e.target.value, basically.

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          disabled={isUpdating}
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          disabled={isUpdating}
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          disabled={isUpdating}
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          disabled={isUpdating}
          id="breakfast-price"
          defaultValue={breakfastPrice}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
