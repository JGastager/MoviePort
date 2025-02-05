<template>
  <div>
    <h1>Login</h1>
    <div class="button" @click="createToken">Create Token</div>
    <form>
      <input v-model="user" type="text" placeholder="Username">
      <input v-model="psw" type="password" placeholder="Password">
    </form>
  </div>
</template>
<script lang="ts" setup>
import { useTMDB } from "#imports";
import{useRouter} from 'vue-router';

const user = ref('');
const psw = ref('');

const { fetchTMDB } = useTMDB();
const router = useRouter();
async function createToken() {
  console.log('Creating token...');

  // Step 1: Get a request token (uses Bearer Token)
  const tokenData = await fetchTMDB('/authentication/token/new', {}, 'GET', null, 'bearer');
  console.log('Token Data:', tokenData);

  if (!tokenData.success) {
    console.error('Failed to get request token:', tokenData.status_message);
    return;
  }

  // Step 2: Validate login (still needs Bearer Token)
  const loginResponse = await fetchTMDB(
    '/authentication/token/validate_with_login',
    {},
    'POST',
    {
      username: user.value,
      password: psw.value,
      request_token: tokenData.request_token
    },
    'bearer' // 🚨 Still required here!
  );
  console.log('Login Response:', loginResponse);

  if (!loginResponse.success) {
    console.error('Login failed:', loginResponse.status_message);
    return;
  }

  // Step 3: Create a session (still needs Bearer Token)
  const sessionResponse = await fetchTMDB(
    '/authentication/session/new',
    {},
    'POST',
    { request_token: loginResponse.request_token },
    'bearer'
  );
  console.log('Session:', sessionResponse);

  if (!sessionResponse.success) {
    console.error('Failed to create session:', sessionResponse.status_message);
    return;
  }

  // Save session_id for future authenticated requests
  localStorage.setItem('session_id', sessionResponse.session_id);

  // Step 4: Fetch user account details (✅ Now uses both session ID & Bearer Token)
  const account = await fetchTMDB('/account', {}, 'GET', null, 'session');
  console.log('Account:', account);
  localStorage.setItem('account', JSON.stringify(account));
  router.push('/account');
}




</script>
<style lang="scss"></style>