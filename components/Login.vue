<template>
    <div class="pointer-events-auto button" @click="openModal">
        <span class="i-ph-sign-in-bold size-6" />
    </div>
    <Teleport v-if="mounted" to="#modals">
        <Transition name="modal">
            <div v-if="modal" class="fixed left-0 top-0 z-100 h-screen w-screen flex items-center justify-center bg-primary/30 backdrop-blur-md" @click.self="closeModal">
                <div class="modal relative h-fit w-fit">
                    <div class="h-60vh w-50vw flex flex-col items-center justify-center overflow-hidden card px-20">
                        <h2 class="mb-6">Login</h2>
                        <form class="max-w-100 w-full flex flex-col items-center gap-2.5" @submit.prevent="handleLogin">
                            <div class="h-11 w-full flex flex-shrink-0 items-center card transition-colors duration-300 focus:bg-primary/50 hover:bg-primary/50">
                                <input v-model="username" class="h-full w-full rounded b-none bg-transparent px-4 py-0 text-1rem placeholder:text-muted text-white font-sans outline-none" type="text" placeholder="Username" required>
                                <div class="pointer-events-none h-full w-13 flex items-center justify-center pr-2">
                                    <span class="i-ph-user-bold size-6" />
                                </div>
                            </div>
                            <div class="h-11 w-full flex flex-shrink-0 items-center card transition-colors duration-300 focus:bg-primary/50 hover:bg-primary/50">
                                <input v-model="password" class="h-full w-full rounded b-none bg-transparent px-4 py-0 text-1rem placeholder:text-muted text-white font-sans outline-none" :type="showPassword ? 'text': 'password'" placeholder="Password" required>
                                <div class="h-full w-13 flex cursor-pointer items-center justify-center pr-2" @click="toggleShowPassword">
                                    <span class="size-6" :class="showPassword ? 'i-ph-eye-slash-bold': 'i-ph-eye-bold'" />
                                </div>
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
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAccountStore } from '~/store/account';

const username = ref('');
const password = ref('');
const showPassword = ref(false);
const router = useRouter();
const accountStore = useAccountStore();
const { login } = accountStore;

async function handleLogin() {
    try {
        await login(username.value, password.value);
        router.push('/account');
    } catch (error) {
        console.error(error);
    }
}

const modal = ref(false);

function closeModal() {
    modal.value = false;
}

function openModal() {
    modal.value = true;
}

function toggleShowPassword() {
    showPassword.value = !showPassword.value;
}

const mounted = ref(false);

onMounted(() => {
    mounted.value = true;
});
</script>