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
      .then(res => console.log(res.request_token))
      .then(res => useFetch(`https://www.themoviedb.org/authenticate/${res?.request_token}?redirect_to=http://localhost:3000/profile`)
          .then(res => console.log(res))
          .catch(err => console.error(err))
      )
      .catch(err => console.error(err));
}
</script>
<style lang="scss">

</style>