<template>
    <div :class="{ 'modal-open': modal }" class="group relative">
        <!-- Button (Authenticated) -->
        <div v-if="isAuthenticated" class="pointer-events-auto relative flex cursor-pointer items-center overflow-hidden px-0 transition-all duration-300 ease-in-out button !gap-0">
            <span class="i-ph-user-bold mx-2.5 size-6 flex-shrink-0 transition-all duration-500 group-[.modal-open]:ml-4 group-hover:ml-4" />
            <span class="max-w-0 transform whitespace-nowrap opacity-0 transition-all duration-500 group-[.modal-open]:max-w-50 group-hover:max-w-50 group-[.modal-open]:pr-4 group-hover:pr-4 group-[.modal-open]:opacity-100 group-hover:opacity-100">
                {{ getUserInfo?.username }}
            </span>
        </div>

        <div v-else class="pointer-events-auto relative flex cursor-pointer items-center overflow-hidden px-0 transition-all duration-300 ease-in-out button !gap-0" @click="openModal">
            <span class="i-ph-identification-badge -bold mx-2.5 size-6 flex-shrink-0 transition-all duration-500 group-[.modal-open]:ml-4 group-hover:ml-4" />
            <span class="max-w-0 transform whitespace-nowrap opacity-0 transition-all duration-500 group-[.modal-open]:max-w-50 group-hover:max-w-50 group-[.modal-open]:pr-4 group-hover:pr-4 group-[.modal-open]:opacity-100 group-hover:opacity-100">
                Login
            </span>
        </div>

        <TransitionExpand v-if="isAuthenticated">
            <div
                class="pointer-events-none absolute right-0 top-full z-10 w-full flex flex-col scale-95 items-end gap-2.5 rounded bg-primary/30 p-2.5 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:scale-100 group-hover:opacity-100"
            >
                <NuxtLink to="/account">Account</NuxtLink>
                <span class="cursor-pointer" @click="handleLogout">Logout</span>
            </div>
        </TransitionExpand>
    </div>

    <!-- Login Modal -->
    <Teleport v-if="mounted" to="#modals">
        <Transition name="modal">
            <div v-if="modal" class="fixed left-0 top-0 z-100 h-screen w-screen flex items-center justify-center bg-primary/30 backdrop-blur-md" @click.self="closeModal">
                <div class="modal relative h-fit w-fit">
                    <div class="h-60vh w-50vw flex flex-col items-center justify-center overflow-hidden card px-20">
                        <h2 class="mb-6">Login</h2>
                        <form class="max-w-100 w-full flex flex-col items-center gap-2.5" @submit.prevent="handleLogin">
                            <div class="h-11 w-full flex flex-shrink-0 items-center card transition-colors duration-300 focus:bg-primary/50 hover:bg-primary/50">
                                <input v-model="username" class="h-full w-full rounded b-none bg-transparent px-4 py-0 text-1rem placeholder:text-muted text-white font-sans outline-none" type="text" placeholder="Username" required />
                                <div class="pointer-events-none h-full w-13 flex items-center justify-center pr-2">
                                    <span class="i-ph-user-bold size-6" />
                                </div>
                            </div>
                            <div class="h-11 w-full flex flex-shrink-0 items-center card transition-colors duration-300 focus:bg-primary/50 hover:bg-primary/50">
                                <input v-model="password" class="h-full w-full rounded b-none bg-transparent px-4 py-0 text-1rem placeholder:text-muted text-white font-sans outline-none" type="password" placeholder="Password" required />
                            </div>
                            <button class="mt-3 button" type="submit">Login</button>
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
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia"; // ✅ Import storeToRefs
import { useAccountStore } from "~/store/account";

defineOptions({
    name: "LoginComponent",
});

const router = useRouter();
const accountStore = useAccountStore();
const { login, logout } = accountStore;

const { isLoggedIn, getUserInfo } = storeToRefs(accountStore);

const username = ref("");
const password = ref("");

const isAuthenticated = computed(() => isLoggedIn.value);

const modal = ref(false);
const mounted = ref(false);

function openModal() {
    console.log("open modal");
    modal.value = true;
}

function closeModal() {
    modal.value = false;
}

async function handleLogin() {
    try {
        await login(username.value, password.value);
        username.value = "";
        password.value = "";
        closeModal();
        router.push("/account");
    } catch (error) {
        console.error(error);
    }
}

async function handleLogout() {
    try {
        await logout();
        router.push("/");
    } catch (error) {
        console.error(error);
    }
}

onMounted(() => {
    mounted.value = true;
});
</script>
