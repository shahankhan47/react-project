import supabase, { SUPABASE_URL } from "./supabase";

export async function getCabins() {
    const { data, error } = await supabase.from("cabins").select("*");

    if (error) {
        console.error(error);
        throw new Error("Cabins could not be loaded");
    }

    return data;
}

export async function deleteCabin(id) {
    const { data, error } = await supabase.from("cabins").delete().eq("id", id);

    if (error) {
        console.error(error);
        throw new Error("Cabins could not be deleted");
    }

    return data;
}

export async function createEditCabin(newCabin, id) {
    const hasImagePath = newCabin?.image?.startsWith?.(SUPABASE_URL);
    const imageName = `${Math.random()}-${newCabin?.image?.name}`.replace(
        /\//g,
        ""
    );
    const imagePath = hasImagePath
        ? newCabin?.image
        : `${SUPABASE_URL}/storage/v1/object/public/cabin-images//${imageName}`;

    // #1 Create/Edit Cabin
    let query = supabase.from("cabins");

    // Create
    if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

    // Edit
    if (id)
        query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

    const { data, error } = await query.select().single();

    if (error) {
        console.error(error);
        throw new Error("Cabin could not be created");
    }

    // #2 Upload Image
    if (hasImagePath) {
        return data;
    }

    const { error: storageError } = await supabase.storage
        .from("cabin-images")
        .upload(imageName, newCabin?.image);

    // #3 Delete the cabin if there was an error during upload
    if (storageError) {
        await supabase.from("cabins").delete().eq("id", data?.id);
        console.error(storageError);
        throw new Error("Cabin image could not be uploaded");
    }

    return data;
}
