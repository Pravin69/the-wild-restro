import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*").order("created_at", { ascending: true });

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  // Uploading File : So, here we will first of all, of course, create the cabin itself. So, create the cabin. And if that is successful, then we upload the image. Upload image. Now, what we still need to do is to actually specify the image path here in this new cabin that we create. So, remember that in our data right here, for example, in this first row, we already have the image but the only way in which we specify the image in the cabin is by using the file name. So, with this file name, we basically connect this cabin row with the corresponding cabin image. And actually let's grab this URL here. So, we will need this in a minute. So, the format of that URL. But as I was saying, we need not only to upload the image itself, but to also specify the image name and actually the path to the image in the bucket right here in the new cabin that we insert. So, first of all, we need to create a URL like this. So, basically containing the path to the bucket itself and then a unique cabin name. So, let's do that. So, image name. And so, here, we need to really make sure that this name is unique.

  // creating unique filename and remove slashes to avoid errors with S3 bucket names and paths
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  // Creating image path similar to below one so that it follows the same pattern.
  // https://cgwuipbzalztlntafqxf.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create / Edit cabin

  let query = supabase.from("cabins");

  // a) create cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // b) edit cabin
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created");
  }

  // 2. If cabin was created successfully then Upload image to Supabase

  // So, it's superbase.storage. And then from and here, our bucket name is cabin images. And then here, we need to specify the name of the file and the file itself.

  if(hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete the newly created cabin if there was an error uploading image to supabase
  if (storageError) {
    const { data, error } = await supabase
      .from("cabins")
      .delete()
      .eq("id", data.id);
    console.error(error);
    throw new Error(
      "Cabin image could not be uploaded and the Cabin was not created"
    );
  }

  return data;
}

export async function deleteCabin(id) {

  console.log(id);

  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }

  return data;
}
