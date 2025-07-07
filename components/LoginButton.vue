<template>
    <div class="group relative">
        <div v-if="isAuthenticated" class="pointer-events-auto overflow-hidden card transition-colors duration-300 focus:bg-primary/50 hover:bg-primary/50">
            <NuxtLink to="/account" class="pointer-events-auto relative h-11 flex cursor-pointer items-center overflow-hidden px-0 transition-all duration-300 ease-in-out !gap-0">
                <span class="i-ph-user-bold mx-2.5 size-6 flex-shrink-0 transition-all duration-500 group-hover:ml-4" />
                <span class="max-w-0 transform whitespace-nowrap opacity-0 transition-all duration-500 group-hover:max-w-50 group-hover:pr-4 group-hover:opacity-100">
                    {{ getUserInfo?.username }}
                </span>
            </NuxtLink>
        </div>

        <PlusModalLink v-else to="/login" class="pointer-events-auto relative flex cursor-pointer items-center overflow-hidden px-0 transition-all duration-300 ease-in-out button !gap-0">
            <span class="i-ph-sign-in-bold mx-2.5 size-6 flex-shrink-0 transition-all duration-500 group-hover:ml-4" />
            <span class="max-w-0 transform whitespace-nowrap opacity-0 transition-all duration-500 group-hover:max-w-50 group-hover:pr-4 group-hover:opacity-100"> Login </span>
        </PlusModalLink>
    </div>
    <PlusModalPage name="login" />
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia"; // ✅ Import storeToRefs
import { useAccountStore } from "~/store/account";

const accountStore = useAccountStore();

const { isLoggedIn, getUserInfo } = storeToRefs(accountStore);

const isAuthenticated = computed(() => isLoggedIn.value);
</script>

<style lang="scss">
body:has(.login-modal) {
    .group-hover\:ml-4 {
        margin-left: 1rem !important;
    }
    .group-hover\:max-w-50 {
        max-width: 200px !important;
    }
    .group-hover\:pr-4 {
        padding-right: 1rem !important;
    }
    .group-hover\:opacity-100 {
        opacity: 1 !important;
    }
}
</style>
