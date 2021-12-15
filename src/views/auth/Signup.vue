<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <h3>Sign up</h3>
      <input type="text" v-model="displayName" placeholder="Name" />
      <label for=""></label>

      <input type="email" placeholder="Email" v-model="email" />
      <label for=""></label>

      <input type="password" placeholder="Password" v-model="password" />
      <label for=""></label>
      <div class="error" v-if="error">{{ error }}</div>
      <button v-if="!isPending">Sign up</button>

      <button v-if="isPending" disabled>Loading...</button>
    </form>
  </div>
</template>

<script>
import useSignup from "@/composables/useSignup.js";
import { useRouter } from "vue-router";
import { ref } from "vue";

export default {
  setup() {
    const { error, signup, isPending } = useSignup();
    const router = useRouter();
    const displayName = ref("");
    const email = ref("");
    const password = ref("");

    const handleSubmit = async () => {
      const res = await signup(email.value, password.value, displayName.value);
      if (!error.value) {
        console.log("user signed up in");
        router.push({ name: "Home" });
      }
    };

    return { email, password, handleSubmit, error, isPending, displayName };
  },
};
</script>

<style scoped></style>
