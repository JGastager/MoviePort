<template>
  <h1>Login</h1>
  <div @click="createToken" class="button">Create Token</div>
</template>
<script lang="ts" setup>
import {useTMDB} from "#imports";

const {fetchTMDB} = useTMDB();
async function createToken() {
  console.log('create token')
  const data = await fetchTMDB('/authentication/token/new');
  await fetchTMDB('/authentication/session/new', {}, 'POST', JSON.stringify({request_token: data.request_token}));

}
</script>
<style lang="scss">

</style>