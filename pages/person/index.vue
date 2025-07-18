<template>
    <div class="persons-page">
        <MediaListing v-if="popularPersons" title="Popular people" :media="popularPersons.results" type="person" :more="true" @load-more="loadMorePersons" />
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

const currentPage = ref(1);

await fetchPopularPersons(currentPage.value);

async function loadMorePersons() {
    currentPage.value++;
    await fetchPopularPersons(currentPage.value);
}
</script>
