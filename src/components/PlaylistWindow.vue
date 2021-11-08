<template>
  <div class="playlist-window">
    <div v-if="error">{{ error }}</div>
    <div v-if="documents" class="playlist" ref="playlist">
      <div v-for="doc in formattedDocuments" :key="doc.id" class="single">
        <div class="thumbnail">
          <img :src="doc.coverURL" alt="" />
        </div>
        <div class="info">
          <h3>Title: {{ doc.title }}</h3>
          <p class="description">Description: {{ doc.description }}</p>
          <span class="created-at">Created By: {{ doc.userName }}</span>
        </div>
        <div class="song-number">Songs: {{ doc.songs.length }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import getCollection from "@/composables/getCollection";
import { formatDistanceToNow } from "date-fns";
import { computed, ref } from "@vue/reactivity";
import { onUpdated } from "@vue/runtime-core";

export default {
  setup() {
    const { error, documents } = getCollection("playlist");
    console.log("documents: ", documents.value);

    const formattedDocuments = computed(() => {
      // First we cant to see if there are documents to cycle through
      if (documents.value) {
        return documents.value.map((doc) => {
          let time = formatDistanceToNow(doc.createdAt.toDate());
          return { ...doc, createdAt: time };
        });
      }
    });

    onUpdated(() => {
      // we want to scroll to the bottom whenever the component updates
      console.log("component has been updated");
      // playlist.value.scrollTop = playlist.value.scrollHeight;
    });

    // auto-scroll to bottom of playlist
    const playlist = ref(null);

    return { error, documents, formattedDocuments, playlist };
  },
};
</script>

<style scoped>
.single {
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  background: white;
  margin: 16px 0;
  transition: all ease 0.2s;
}
.single:hover {
  box-shadow: 1px 2px 3px rgba(50, 50, 50, 0.05);
  transform: scale(1.02);
  transition: all ease 0.2s;
}
.thumbnail {
  max-width: 100px;
  max-height: 100px;
  overflow: hidden;
  border-radius: 10px;
}
img {
  max-width: 150%;
  max-height: 150%;
  display: block;
}
.info {
  margin: 0 30px;
}
.song-number {
  margin-left: auto;
}
</style>