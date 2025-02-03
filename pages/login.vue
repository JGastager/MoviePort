<template>
  <div>
  <h1>Login</h1>
  <div class="button" @click="createToken">Create Token</div>
  <form>
    <input v-model="user" type="text" placeholder="Username" >
    <input v-model="psw" type="password" placeholder="Password">
  </form>
</div>
</template>
<script lang="ts" setup>
import {useTMDB} from "#imports";

const user = ref('');
const psw = ref('');

const {fetchTMDB} = useTMDB();
async function createToken() {
  console.log('create token')
  const data = await fetchTMDB('/authentication/token/new');
  console.log('token: ', data)
  const loginData = await fetchTMDB('/authentication/token/validate_with_login', {}, 'POST', {username: user.value, password: psw.value, request_token: data.request_token});
  console.log('login data: ', loginData)
  const account = await fetchTMDB('/account', {}, 'GET', {session_id: loginData.request_token});
  console.log('account: ', account)
  localStorage.setItem('account', JSON.stringify(account));
}
</script>
<style lang="scss">

</style>