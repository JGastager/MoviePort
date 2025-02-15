<template>
    <div :class="{ 'modal-open': modal }" class="group relative">
        <div v-if="isAuthenticated" class="pointer-events-auto overflow-hidden card transition-colors duration-300 focus:bg-primary/50 hover:bg-primary/50">
            <NuxtLink to="/account" class="pointer-events-auto relative h-11 flex cursor-pointer items-center overflow-hidden px-0 transition-all duration-300 ease-in-out !gap-0">
                <span class="i-ph-user-bold mx-2.5 size-6 flex-shrink-0 transition-all duration-500 group-[.modal-open]:ml-4 group-hover:ml-4" />
                <span
                    class="max-w-0 transform whitespace-nowrap opacity-0 transition-all duration-500 group-[.modal-open]:max-w-50 group-hover:max-w-50 group-[.modal-open]:pr-4 group-hover:pr-4 group-[.modal-open]:opacity-100 group-hover:opacity-100"
                >
                    {{ getUserInfo?.username }}
                </span>
            </NuxtLink>
        </div>

        <div v-else class="pointer-events-auto relative flex cursor-pointer items-center overflow-hidden px-0 transition-all duration-300 ease-in-out button !gap-0" @click="openModal">
            <span class="i-ph-sign-in-bold mx-2.5 size-6 flex-shrink-0 transition-all duration-500 group-[.modal-open]:ml-4 group-hover:ml-4" />
            <span class="max-w-0 transform whitespace-nowrap opacity-0 transition-all duration-500 group-[.modal-open]:max-w-50 group-hover:max-w-50 group-[.modal-open]:pr-4 group-hover:pr-4 group-[.modal-open]:opacity-100 group-hover:opacity-100">
                Login
            </span>
        </div>
    </div>

    <!-- Login Modal -->
    <Teleport v-if="mounted" to="#modals">
        <Transition name="modal">
            <div v-if="modal" class="fixed left-0 top-0 z-100 h-screen w-screen flex items-center justify-center bg-primary/30 backdrop-blur-md" @click.self="closeModal">
                <div class="modal relative h-fit w-fit">
                    <div class="h-60vh w-50vw flex flex-col items-center justify-center overflow-hidden card px-20">
                        <h2 class="mb-6">Login</h2>
                        <form class="login-form relative max-w-100 w-full" @submit.prevent="handleLogin">
                            <div class="flex flex-col items-center gap-2.5 transition-opacity duration-300" :class="{ 'opacity-0 pointer-events-0': isAuthenticated && loginSuccess }">
                                <div
                                    class="h-11 w-full flex flex-shrink-0 items-center border-2 border-transparent card border-solid transition-colors duration-300 focus:bg-primary/50 hover:bg-primary/50"
                                    :class="{ 'animate-wiggle': triggerAnimation }"
                                >
                                    <input v-model="username" class="h-full w-full rounded b-none bg-transparent px-4 py-0 text-1rem placeholder:text-muted text-white font-sans outline-none" type="text" placeholder="Username" required />
                                    <div class="pointer-events-none h-full w-13 flex items-center justify-center pr-2">
                                        <span class="i-ph-user-bold size-6" />
                                    </div>
                                </div>
                                <div
                                    class="h-11 w-full flex flex-shrink-0 items-center border-2 border-transparent card border-solid transition-colors duration-300 focus:bg-primary/50 hover:bg-primary/50"
                                    :class="{ 'animate-wiggle': triggerAnimation }"
                                >
                                    <input
                                        v-model="password"
                                        class="h-full w-full rounded b-none bg-transparent px-4 py-0 text-1rem placeholder:text-muted text-white font-sans outline-none"
                                        :type="showPassword ? 'text' : 'password'"
                                        placeholder="Password"
                                        required
                                    />
                                    <div class="h-full w-13 flex cursor-pointer items-center justify-center pr-2" @click="toggleShowPassword">
                                        <span class="size-6" :class="showPassword ? 'i-ph-eye-slash-bold' : 'i-ph-eye-bold'" />
                                    </div>
                                </div>
                                <button class="mt-3 button" type="submit">Login</button>
                            </div>
                            <TransitionFade>
                                <div v-if="isAuthenticated && loginSuccess" class="absolute left-1/2 top-0 h-auto w-full flex flex-col transform items-center gap-2.5 -translate-x-1/2">
                                    <span class="i-ph-check-circle-thin size-24 text-green-400"></span>
                                    <span>Succesfully logged in!</span>
                                </div>
                            </TransitionFade>
                            <TransitionFade>
                                <div v-if="loginError && !loginSuccess" class="absolute bottom-0 left-1/2 h-auto w-full flex flex-col translate-y-full transform items-center gap-2.5 pt-6 -translate-x-1/2">
                                    <div class="flex items-center gap-2.5">
                                        <span class="i-ph-warning-circle-bold size-6 text-red-500"></span>
                                        <span>Login failed!</span>
                                    </div>
                                    <span class="text-center">Please check your credentials and try again.</span>
                                </div>
                            </TransitionFade>
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
const { login } = accountStore;

const { isLoggedIn, getUserInfo } = storeToRefs(accountStore);

const username = ref("");
const password = ref("");
const showPassword = ref(false);

const isAuthenticated = computed(() => isLoggedIn.value);
const loginSuccess = ref(false);
const loginError = ref(false);
const triggerAnimation = ref(false);

const modal = ref(false);
const mounted = ref(false);

function openModal() {
    console.log("open modal");
    modal.value = true;
}

function closeModal() {
    modal.value = false;
    loginError.value = false;
    loginSuccess.value = false;
    username.value = "";
    password.value = "";
}

function toggleShowPassword() {
    showPassword.value = !showPassword.value;
}

async function handleLogin() {
    try {
        await login(username.value, password.value);
        loginSuccess.value = true;
        username.value = "";
        password.value = "";
        setTimeout(() => {
            closeModal();
            router.push("/account");
        }, 1000);
    } catch (error) {
        loginError.value = true;
        triggerAnimation.value = true;
        setTimeout(() => {
            triggerAnimation.value = false;
        }, 300);
        console.error(error);
    }
}

onMounted(() => {
    mounted.value = true;
});
</script>

<style lang="scss">
.login-form {
    @keyframes wiggle {
        0%,
        100% {
            transform: translateX(0px);
        }
        45% {
            transform: translateX(6px);
        }
        75% {
            transform: translateX(-6px);
        }
    }
    .animate-wiggle {
        animation: wiggle 0.3s ease-in-out;
    }
}
</style>
