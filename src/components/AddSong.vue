<template>
  <div class="add-song">
    <button v-if="!toggleShowForm" @click="toggleShowForm = true">
      Add Songs
    </button>
    <form v-if="toggleShowForm == true" @click.prevent="handleSubmit">
      <h4>Add a New Song</h4>
      <input
        type="text"
        placeholder="Song title"
        required
        v-model="title"
        id=""
      />
      <input type="text" placeholder="Artist" required v-model="artist" id="" />
      <button>Add</button>
    </form>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import useDocument from "@/composables/useDocument.js";

export default {
  props: ["playlist"],
  setup(props) {
    const title = ref("");
    const artist = ref("");
    const toggleShowForm = ref(false);

    //Get the ID of the individual playlist
    const { updateDocument } = useDocument("playlist", props.playlist.id);

    const handleSubmit = async () => {
      console.log("button has been clicked");
      const song = {
        title: title.value,
        artist: artist.value,
        id: Math.floor(Math.random() * 1000000),
      };
      console.log("song ", song);
      await updateDocument({
        //this keeps all of the current songs && it also adds the new one
        songs: [...props.playlist.songs, song],
      });
      title.value = "";
      artist.value = "";
    };

    return { title, artist, toggleShowForm, handleSubmit };
  },
};
</script>

<style scoped>
.add-song {
  text-align: center;
  margin-top: 40px;
}
form {
  max-width: 100%;
  text-align: left;
}
</style>
