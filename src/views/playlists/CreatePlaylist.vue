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
      <input type="file" name="" id="" />
      <div>{{ error }}</div>
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

    //  ------
    const { addDoc, isPending } = useCollection;
    //  ------

    const handleCreatePlaylist = async (collection) => {
      await console.log(title.value, description.value);
    };

    // try {

    // } catch (error) {
    //     error.value = 'Could Not Create Playlist'
    // }

    return { title, description, handleCreatePlaylist, error };
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
</style>