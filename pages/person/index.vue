<template>
    <div class="persons-page"></div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(() => {
    router.push("/");
});
</script>

<style></style>
