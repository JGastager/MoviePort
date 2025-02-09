<template>
    <div class="pointer-events-auto button" @click="openModal">
        <span class="i-ph-sign-in-bold size-6" />
    </div>
    <Teleport v-if="mounted" to="#modals">
        <Transition name="modal">
            <div v-if="modal" class="fixed left-0 top-0 z-100 h-screen w-screen flex items-center justify-center bg-primary/30 backdrop-blur-md" @click.self="closeModal">
                <div class="modal relative h-fit w-fit">
                    <div class="h-80vh w-50vw flex flex-col items-center justify-center overflow-hidden card">
                        <h2 class="mb-6">Login</h2>
                        <form class="flex flex-col items-center gap-2.5">
                            <input class="rounded-md px-3 py-2"  type="text" placeholder="Username" required>
                            <input class="rounded-md px-3 py-2"  type="password" placeholder="Password" required>
                            <button class="button" type="submit">Login</button>
                        </form>
                    </div>
                    <div class="absolute top-0 translate-x-full transform -right-3 button" @click="closeModal">
                        <span class="i-ph-x-bold size-6" />
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const modal = ref(false);

function closeModal() {
    modal.value = false;
}

function openModal() {
    modal.value = true;
}

const mounted = ref(false);

onMounted(() => {
    mounted.value = true;
});
</script>