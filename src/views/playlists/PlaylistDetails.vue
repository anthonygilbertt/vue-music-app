<template>
  <div class="error"></div>
  <div v-if="document" class="playlist-details">
    <div class="playlist-info">
      <div class="cover">
        <p>Image goes here</p>
        <img :src="document.coverURL" alt="" />
      </div>
      <p>Playlist Details:</p>
      <p>Path: {{ path }}</p>
      <p>ID: {{ id }}</p>
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
    const { error, document } = getDocument("playlist", props.id);
    console.clear();

    console.log("document: ", document);
    watchEffect(() => console.log(document));
    console.log("document.title: ", document.title);

    // let myTarget = JSON.parse(JSON.stringify(document._rawValue.coverURL));

    // console.log("document._rawValue.coverURL: ", myTarget);

    console.log("route: ", route.path);
    console.log("route: ", route);
    const path = route.path;
    return { path, document };
  },
};
</script>

<style lang="scss" scoped>
</style>