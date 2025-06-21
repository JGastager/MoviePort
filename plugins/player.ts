import { usePlayerStore } from "~/store/player";

export default defineNuxtPlugin((nuxtApp) => {
    const player = usePlayerStore();
    const router = useRouter();

    router.beforeEach(() => {
        player.reset(); // Reset Player store on every route change
    });
});
