<template>
  <div class="error" v-if="error">{{ error }}</div>
  <div v-if="playlist" class="playlist-details">
    <!-- playlist information -->
    <div class="playlist-info">
      <div class="cover">
        <img :src="playlist.coverURL" />
      </div>
      <h2>{{ playlist.title }}</h2>
      <p class="username">Created by {{ playlist.userName }}</p>
      <p class="description">{{ playlist.description }}</p>
      <button v-if="ownership" @click="deletePlaylist">Delete Playlist</button>
    </div>

    <!-- song list -->
    <div class="song-list">
      <div v-if="!playlist.songs.length">No songs have been added yet</div>
      <div v-for="song in playlist.songs" :key="song.id" class="single-song">
        <div class="details">
          <h3>{{ song.title }}</h3>
          <p>{{ song.artist }}</p>
        </div>
        <button v-if="ownership" @click="deleteSingleSong(song.id)">
          Delete
        </button>
      </div>
      <AddSong v-if="ownership" :playlist="playlist" />
    </div>
  </div>
</template>

<script>
import getDocument from "@/composables/getDocument";
import useDocument from "@/composables/useDocument";
import useStorage from "@/composables/useStorage";
import AddSong from "@/components/AddSong.vue";
import getUser from "@/composables/getUser";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { deleteObject } from "firebase/storage";

export default {
  components: { AddSong },
  props: ["id", "playlist"],
  setup(props) {
    const { error, document: playlist } = getDocument("playlist", props.id);
    const { deleteDocument, updateDocument } = useDocument(
      "playlist",
      props.id
    );
    const { deleteImage } = useStorage();
    const { user } = getUser();
    const router = useRouter();
    const songs = ref(false);

    const ownership = computed(() => {
      console.log("user.uid: ", user.uid);
      console.log("playlist: ", playlist.value.coverURL);
      console.log("playlist.value.userId: ", playlist.value.userId);
      console.log("user: ", user);

      return playlist.value && user.uid && user.uid == playlist.value.userId;
    });

    const deletePlaylist = async () => {
      await deleteImage(playlist.value.firebaseFilePath);
      await deleteDocument();

      router.push({ name: "Home" });
    };

    const deleteSingleSong = async (id) => {
      console.log("deleting song");

      // if they are not equal, we want to keep the song in the array
      const songs = playlist.value.songs.filter((song) => song.id != id);
      await updateDocument({ songs: songs });
    };

    return { error, playlist, ownership, deletePlaylist, deleteSingleSong };
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
.single-song {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px dashed var(--secondary);
  margin-bottom: 20px;
}
</style>
