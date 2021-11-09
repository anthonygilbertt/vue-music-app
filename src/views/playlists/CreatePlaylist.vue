<template>
  <div>
    <h4>Create Playlist</h4>
    <form @submit.prevent="handleFileUpload">
      <input
        type="text"
        required
        placeholder="Playlist Title"
        v-model="title"
      />
      <textarea
        name=""
        required
        placeholder="Playlist Description..."
        v-model="description"
      ></textarea>
      <label>Upload Playlist Cover Image</label>
      <input type="file" name="" id="" @change="handleFileChange" />
      <div class="error">{{ fileError }}</div>
      <button v-if="isPending == true" disabled>Loading...</button>
      <button v-else>Create</button>
    </form>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import useCollection from "@/composables/useCollection.js";
import useStorage from "@/composables/useStorage.js";
// import { uploadBytes } from "firebase/storage";
import { timestamp } from "@/firebase/config.js";
import getUser from "@/composables/getUser.js";
import { useRouter } from "vue-router";

export default {
  setup() {
    const title = ref("");
    const description = ref("");
    const file = ref(null);
    const fileError = ref(null);
    let isPending = ref(false);

    const { firebaseFilePath, url, uploadImage } = useStorage();
    const { error, addDoc } = useCollection("playlist");
    const { user } = getUser();
    const router = useRouter();

    // const handleFileUpload = async (collection) => {
    const handleFileUpload = async () => {
      // we don't want to submit the form if we don't have a value
      if (file.value) {
        isPending.value = true;
        try {
          console.log(title.value, description.value, file.value);
          await uploadImage(file.value);
          console.log("image uploaded, url: ", url.value);
          const res = await addDoc({
            title: title.value,
            description: description.value,
            userId: user.value.uid,
            userName: user.value.displayName,
            coverURL: url.value,
            firebaseFilePath: firebaseFilePath.value,
            songs: [],
            createdAt: timestamp(),
          });
          if (!error.value) {
            console.log("image uploaded");
            router.push({
              name: "PlaylistDetails",
              params: { id: res.id },
            });
          }

          isPending.value = false;
        } catch (error) {
          console.log(error.message);
          isPending.value = false;
        }
      }
    };

    // Allowed file types
    const fileTypes = ["image/png", "image/jpeg"];

    const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];

      console.log(selectedFile);

      if (selectedFile && fileTypes.includes(selectedFile.type)) {
        file.value = selectedFile;
        fileError.value = null;
      } else {
        file.value = null;
        fileError.value = "Please select an image file(png or jpeg)";
      }
    };

    return {
      title,
      description,
      handleFileUpload,
      error,
      handleFileChange,
      fileError,
      isPending,
    };
  },
};
</script>

<style scoped>
input[type="file"] {
  border: 0;
  padding: 0;
}
label {
  font-size: 12px;
  display: block;
  margin-top: 30px;
}
button {
  margin-top: 20px;
}
.error {
  color: red;
}
</style>