<template>
  <div>
    <h4>Create Playlist</h4>
    <form @submit.prevent="handleCreatePlaylist">
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
      <button>Create</button>
    </form>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import useCollection from "@/composables/useCollection.js";

export default {
  setup() {
    const title = ref("");
    const description = ref("");
    const error = ref(null);
    const file = ref(null);
    const fileError = ref(null);

    //  ------
    const { addDoc, isPending } = useCollection();
    //  ------

    const handleCreatePlaylist = async (collection) => {
      // we don't want to submit the form if we don't have a value
      if (file.value) {
        await console.log(title.value, description.value, file.value);
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
      handleCreatePlaylist,
      error,
      handleFileChange,
      fileError,
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