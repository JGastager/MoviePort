<template>
    <div class="button" @click="handleLogout">
        <span class="i-ph-sign-out-bold size-6" />
        <span>Logout</span>
    </div>
</template>

<script lang="ts" setup>
import { useAccountStore } from "~/store/account";

const router = useRouter();
const accountStore = useAccountStore();
const { logout } = accountStore;

async function handleLogout() {
    try {
        await logout();
        router.push("/");
    } catch (error) {
        console.error(error);
    }
}
</script>
