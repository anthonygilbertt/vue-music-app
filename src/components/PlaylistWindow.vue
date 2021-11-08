<template>
  <div class="playlist-window">
    <div v-if="error">{{ error }}</div>
    <div v-if="documents" class="playlist" ref="playlist">
      <div v-for="doc in formattedDocuments" :key="doc.id" class="single">
        <!--
      -->
        <div class="thumbnail">
          <img :src="doc.coverURL" alt="" />
        </div>
        <div class="info">
          <p class="title">Title: {{ doc.title }}</p>
          <p class="description">Description: {{ doc.description }}</p>
          <p class="coverURL">URL: {{ doc.coverURL }}</p>
          <span class="created-at">Created {{ doc.createdAt }} ago</span>
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
.playlist-window {
  background: #fafafa;
  padding: 30px 20px;
}
.single {
  margin: 18px 0;
}
.created-at {
  display: block;
  color: #999;
  font-size: 12px;
  margin-bottom: 4px;
}
.name {
  font-weight: bold;
  margin-right: 6px;
}
.playlist {
  max-height: 400px;
  overflow: auto;
}
</style>