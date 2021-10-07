<template>
  <form @submit.prevent="handleSubmit">
    <h3>Login</h3>
    <input type="email" placeholder="Email" v-model="email" />
    <label for=""></label>

    <input type="password" placeholder="Password" v-model="password" />
    <label for=""></label>
    <div class="error" v-if="error">{{ error }}</div>
    <button>Login</button>
  </form>
</template>

<script>
import useLogin from "@/composables/useLogin.js";
import { ref } from "@vue/reactivity";

export default {
  setup() {
    const { error, login } = useLogin();

    const email = ref("");
    const password = ref("");

    const handleSubmit = async () => {
      const res = await login(email.value, password.value);
      if (!error.value) {
        console.log("user logged in");
      }
    };

    return { email, password, handleSubmit, error };
  },
};
</script>

<style scoped>
</style>