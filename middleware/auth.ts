import { useAccountStore } from "~/store/account";

export default defineNuxtRouteMiddleware(() => {
    const accountStore = useAccountStore();

    if (!accountStore.isLoggedIn) {
        return navigateTo("/login");
    }
});
