<template>
    <div class="group relative aspect-2/3 cursor-pointer overflow-hidden card" @click="openModal">
        <img src="~/assets/images/poster.jpg" alt="Poster" class="h-full w-full object-cover transition-all duration-300 group-hover:scale-102 group-hover:blur-sm">
        <div class="durtation-300 absolute inset-0 flex items-center justify-center bg-primary/20 opacity-0 transition-opacity group-hover:opacity-100">
                    <div class="i-ph-arrows-out size-10"/>
                </div>
    </div>
    <Teleport to="#modals">
        <Transition name="modal">
            <div v-if="modal" class="fixed left-0 top-0 z-100 h-screen w-screen flex items-center justify-center bg-primary/30 backdrop-blur-md" @click.self="closeModal">
                <div class="modal relative h-fit w-fit">
                    <div class="aspect-2/3 h-80vh overflow-hidden card">
                        <img src="~/assets/images/poster.jpg" alt="Poster" class="h-full w-full object-cover">
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
import { ref } from 'vue';

const modal = ref(false);

function closeModal() {
    modal.value = false;
}

function openModal() {
    modal.value = true;
}
</script>

<style lang="scss">
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s;
  .modal {
    transition: transform 0.3s;
  }
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
    .modal {
        transform: scale(0.5);
    }
}
</style>