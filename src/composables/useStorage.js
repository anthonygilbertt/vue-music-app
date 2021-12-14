import { ref as vref } from "vue";
import { ref, deleteObject } from "firebase/storage";
import { getStorage, uploadBytes, getDownloadURL } from "firebase/storage";
import getUser from "@/composables/getUser.js";
import { projectStorage } from "../firebase/config";

const useStorage = () => {
  const error = vref(null);
  const url = vref(null);
  const firebaseFilePath = vref(null);
  const { user } = getUser();

  const uploadImage = async (file) => {
    firebaseFilePath.value = `covers/${user.uid}/${file.name}`;
    console.log("firebaseFilePath.value: ", firebaseFilePath.value);

    const projectStorage = getStorage();
    const storageRef = ref(projectStorage, firebaseFilePath.value);

    try {
      // const res = await storageRef.put(file)
      const res = await uploadBytes(storageRef, file).then((snapshot) => {
        console.log("Uploaded a blob or file!");
      });

      // url.value = await res.ref.getDownloadURL()
      url.value = await getDownloadURL(
        ref(projectStorage, firebaseFilePath.value)
      ).then((url) => {
        return url;
      });

      if (!res) {
        throw new Error("Could not login");
      }

      console.log("file uploaded");
      error.value = null;
      return res;
    } catch (err) {
      console.log(err.message);
      error.value = err.message;
    }
  };

  const deleteImage = async (path) => {
    console.log("hello from the deleteImage function");

    const storage = getStorage();

    // Create a reference to the file to delete
    console.log(storage);
    const imagePath = ref(storage, path);

    // Delete the file
    await deleteObject(imagePath)
      .then(() => {
        console.log("File deleted successfully");
      })
      .catch((error) => {
        console.log("error: ", error.message);
        console.log("Uh-oh, an error occurred!");
      });
  };
  error.value = null;

  return { url, firebaseFilePath, error, uploadImage, deleteImage };
};

export default useStorage;
