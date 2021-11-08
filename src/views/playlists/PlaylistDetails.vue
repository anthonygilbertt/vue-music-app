<template>
  <div>
    <p>Playlist Details:</p>
    <p>Path: {{ path }}</p>
    <p>ID: {{ id }}</p>
  </div>
</template>

<script>
import { useRouter, useRoute } from "vue-router";

export default {
  props: ["id"],
  setup() {
    const route = useRoute();
    console.log("route: ", route.path);
    const path = route.path;
    return { path };
  },
};
</script>

<style lang="scss" scoped>
</style>