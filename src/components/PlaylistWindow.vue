<template>
  <div class="playlist-window">
    <div v-if="error">{{ error }}</div>
    <div v-if="documents" class="playlists" ref="playlists">
      <div v-for="doc in formattedDocuments" :key="doc.id" class="single">
        <span class="created-at">{{ doc.createdAt }}</span>
        <span class="title">{{ doc.title }}</span>
        <span class="description">{{ doc.description }}</span>
        <span class="coverURL">{{ doc.coverURL }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import getCollection from "@/composables/getCollection";
import { formatDistanceToNow } from "date-fns";
import { computed, ref as vref } from "@vue/reactivity";
import { onUpdated } from "@vue/runtime-core";
// import { getStorage, ref, listAll } from "firebase/storage";
import { getStorage, ref } from "firebase/storage";
import { projectStorage } from "../firebase/config";

export default {
  setup() {
    const { error, documents } = getCollection("playlist");
    // TODO -- Get the

    const projectStorage = getStorage();

    // // Create a reference under which you want to list
    // const listRef = ref(projectStorage, "files/uid");

    // // Find all the prefixes and items.
    // listAll(listRef)
    //   .then((res) => {
    //     res.prefixes.forEach((folderRef) => {
    //       // All the prefixes under listRef.
    //       // You may call listAll() recursively on them.
    //     });
    //     res.items.forEach((itemRef) => {
    //       // All the items under listRef.
    //     });
    //   })
    //   .catch((error) => {
    //     // Uh-oh, an error occurred!
    //   });

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
      playlists.value.scrollTop = playlists.value.scrollHeight;
    });

    // auto-scroll to bottom of playlists
    const playlists = vref(null);

    return { error, documents, formattedDocuments, playlists };
    // return { error, documents };
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
.title {
  font-weight: bold;
  margin-right: 6px;
}
.playlists {
  max-height: 400px;
  overflow: auto;
}
</style>