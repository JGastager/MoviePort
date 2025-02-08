<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="handleLogin" class="flex flex-col space-y-4 w-max">
      <input class="rounded-md px-3 py-2" v-model="username" type="text" placeholder="Username" required>
      <input class="rounded-md px-3 py-2" v-model="password" type="password" placeholder="Password" required>
      <button class="button" type="submit">Login</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAccountStore } from '~/store/account';

const username = ref('');
const password = ref('');
const router = useRouter();
const accountStore = useAccountStore();
const { login } = accountStore;

async function handleLogin() {
  try {
    await login({ username: username.value, password: password.value });
    router.push('/account');
  } catch (error) {
    console.error(error);
  }
}
</script>

<style lang="scss"></style>
