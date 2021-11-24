<template>
  <div v-if="error" class="error">{{ error }}</div>
  <div v-if="playlist" class="playlist-details">
    <div class="playlist-info">
      <div class="cover">
        <img :src="playlist.coverURL" alt="" />
      </div>
      <h2>{{ playlist.title }}</h2>

      <p class="username">Created by: {{ playlist.userName }}</p>
      <p class="description">Description: {{ playlist.description }}</p>
    </div>
    <!-- song list -->
    <div class="song-list">
      <p>song list here</p>
    </div>
  </div>
</template>

<script>
import { watchEffect } from "vue";
import { useRoute } from "vue-router";
import getDocument from "@/composables/getDocument.js";

export default {
  props: ["id"],
  setup(props) {
    const route = useRoute();
    const { error, document: playlist } = getDocument("playlist", props.id);
    console.clear();

    console.log("playlist: ", playlist);
    watchEffect(() => console.log(playlist));
    console.log("playlist.title: ", playlist.title);

    // let myTarget = JSON.parse(JSON.stringify(document._rawValue.coverURL));

    // console.log("document._rawValue.coverURL: ", myTarget);

    console.log("route: ", route.path);
    console.log("route: ", route);
    const path = route.path;
    return { path, playlist };
  },
};
</script>

<style>
.playlist-details {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
}
.cover {
  overflow: hidden;
  border-radius: 20px;
  position: relative;
  padding: 160px;
}
.cover img {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  max-width: 200%;
  max-height: 200%;
}
.playlist-info {
  text-align: center;
}
.playlist-info h2 {
  text-transform: capitalize;
  font-size: 28px;
  margin-top: 20px;
}
.playlist-info p {
  margin-bottom: 20px;
}
.username {
  color: #999;
}
.description {
  text-align: left;
}
</style>