<template>
  <div class="home">
    <p>Home Page</p>
    <PlaylistWindow />
  </div>
</template>

<script>
// @ is an alias to /src
import PlaylistWindow from "@/components/PlaylistWindow.vue";

export default {
  name: "Home",
  components: {
    PlaylistWindow,
  },
};
</script>
