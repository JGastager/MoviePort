<template>
    <div class="persons-page">
        <MediaListing v-if="popularPersons" title="Popular people" :media="popularPersons.results" type="person" @load-more="loadMorePersons" />
    </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { usePersonsStore } from "~/store/persons";

useHead({
    title: `People | MoviePort`,
});

const personsStore = usePersonsStore();
const { fetchPopularPersons } = personsStore;
const { popularPersons } = storeToRefs(personsStore);

const currentPage = computed(() => popularPersons.value.page || 1);

await fetchPopularPersons(currentPage.value);

async function loadMorePersons() {
    await fetchPopularPersons(currentPage.value + 1);
}
</script>
