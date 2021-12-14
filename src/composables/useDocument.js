import { ref } from "vue";
import { projectFirestore } from "../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";

const useDocument = (collection, id) => {
  const isPending = ref(false);
  const error = ref(null);

  const deleteDocument = async () => {
    isPending.value = true;
    error.value = null;

    let documentReference = projectFirestore.collection("playlist").doc(id);

    try {
      const res = await documentReference.delete();

      isPending.value = false;
      return res;
    } catch (err) {
      console.log("error.message: ", error.message);
      error.value = err;
      isPending.value = false;
    }
  };

  const updateDocument = async (updates) => {
    isPending.value = true;
    error.value = null;

    let documentReference = projectFirestore.collection("playlist").doc(id);

    try {
      const res = await documentReference.update(updates);

      isPending.value = false;
      return res;
    } catch (err) {
      console.log("error.message: ", error.message);
      error.value = err;
      isPending.value = false;
      console.log("could not update the object");
    }
  };

  return { error, deleteDocument, isPending, updateDocument };
};

export default useDocument;
