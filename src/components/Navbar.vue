<template>
  <div class="navbar">
    <nav>
      <img src="@/assets/mountain_PNG10.png" alt="" />
      <h1><router-link :to="{ name: 'Home' }">Home</router-link></h1>
      <div class="links">
        <!-- These are not router-links because they do not link to another component -->

        <!-- Logged In -->
        <div v-if="user">
          <router-link :to="{ name: 'CreatePlaylist' }"
            >Create Playlist</router-link
          >
          <router-link :to="{ name: 'UserPlaylists' }">My Playlist</router-link>
          <span>Hello, {{ user.displayName }}</span>
          <button @click="handleLogout">Logout</button>
        </div>

        <!-- Not Logged In-->
        <div v-else>
          <router-link class="btn" :to="{ name: 'Login' }">Login</router-link>
          <router-link class="btn" :to="{ name: 'Signup' }"
            >Sign Up</router-link
          >
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
/*
TODO:
- [X] - Need to conditionally show the navbar buttons

FIXME:
- [] - Navbar buttons aren't showing unless if the page is refreshing.
*/

import useLogout from "@/composables/useLogout.js";
import getUser from "@/composables/getUser.js";
import { useRouter } from "vue-router";
import { ref } from "@vue/reactivity";
import UserPlaylists from "@/views/playlists/UserPlaylists.vue";

export default {
  components: { UserPlaylists },
  setup() {
    const { logout, error, isPending } = useLogout();
    const router = useRouter();

    const isLoggedIn = ref(false);

    const { user } = getUser();

    if (user == null) {
      isLoggedIn.value = false;
    } else {
      isLoggedIn.value = true;
    }
    // const navState = () => {
    // };

    const handleLogout = async () => {
      await logout();
      router.push({
        name: "Login",
      });
      console.log("user has been logged out");
    };

    return { handleLogout, user };
  },
};
</script>

<style scoped>
.navbar {
  padding: 16px 10px;
  margin-bottom: 60px;
  background: white;
}
nav {
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}
nav img {
  max-height: 60px;
}
nav h1 {
  margin-left: 20px;
}
nav .links {
  margin-left: auto;
}
nav .links a,
button {
  margin-left: 16px;
  font-size: 14px;
}
span {
  font-size: 14px;
  display: inline-block;
  margin-left: 16px;
  padding-left: 16px;
  border-left: 1px solid rgb(155, 148, 148);
}
</style>
