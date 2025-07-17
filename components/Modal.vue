<template>
    <Teleport to="body">
        <Transition name="modal">
            <div v-if="modelValue" class="fixed left-0 top-0 z-100 h-screen w-screen overflow-y-auto overscroll-contain bg-primary/20 backdrop-blur-md">
                <div class="min-h-full w-full flex items-center justify-center py-10vh" @click.self="closeModal">
                    <div class="modal relative h-fit w-fit">
                        <div class="overflow-hidden card" :class="[$attrs.class, $attrs.staticClass]">
                            <slot />
                        </div>
                        <div class="absolute top-0 translate-x-full transform -right-3 button" @click="closeModal">
                            <span class="i-ph-x-bold size-6" />
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script lang="ts" setup>
defineComponent({
    name: "ModalComponent",
});

const _props = defineProps<{
    modelValue: boolean;
}>();

const emit = defineEmits<{
    (e: "update:modelValue", value: boolean): void;
}>();

function closeModal() {
    emit("update:modelValue", false);
}
</script>
