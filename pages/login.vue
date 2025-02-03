<template>
  <h1>Login</h1>
  <button @click="createToken" class="button">Create Token</button>
</template>
<script lang="ts" setup>
import {useTMDB} from "#imports";

const {fetchTMDB} = useTMDB();
async function createToken() {
  console.log('create token')
  await fetchTMDB('/authentication/token/new')
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(err => console.error(err));
}

</script>
<style lang="scss">

</style>