<template>
  <form @submit.prevent="handleSubmit">
    <h3>Login</h3>
    <input type="email" placeholder="Email" v-model="email" />
    <label for=""></label>

    <input type="password" placeholder="Password" v-model="password" />
    <label for=""></label>
    <div class="error" v-if="error">{{ error }}</div>
    <button v-if="!isPending">Login</button>

    <button v-if="isPending" disabled>Loading...</button>
  </form>
</template>

<script>
import useLogin from "@/composables/useLogin.js";
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";

export default {
  setup() {
    const { error, login, isPending } = useLogin();

    const email = ref("");
    const password = ref("");
    const router = useRouter();

    const handleSubmit = async () => {
      await login(email.value, password.value);

      if (!error.value) {
        // router.push({ name: "Home" });
        router.push({ name: "Home" });

        console.log("user logged in");
      }
    };

    return { email, password, handleSubmit, error, isPending };
  },
};
</script>

<style scoped></style>
