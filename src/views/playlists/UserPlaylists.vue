<template>
  <div class="user-playlists">
    <h2>My Playlists</h2>
    <div v-if="playlist">
      <PlaylistWindow :playlist="playlist" />
    </div>

    <router-link :to="{ name: 'CreatePlaylist' }" class="btn"
      >Create a new playlist</router-link
    >
  </div>
</template>

<script>
import getCollection from "@/composables/getCollection.js";
import getUser from "@/composables/getUser.js";
import PlaylistWindow from "@/components/PlaylistWindow.vue";

export default {
  setup() {
    const { user } = getUser();
    console.log("user.uid: ", user.uid);
    const { documents: playlists } = getCollection("playlists", [
      "userId",
      "==",
      user.uid,
    ]);

    console.log("playlists: ", playlists);

    return { playlists, user };
  },
};
</script>

<style lang="scss" scoped></style>
