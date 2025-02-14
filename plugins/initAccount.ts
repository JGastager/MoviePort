import { useAccountStore } from "~/store/account";
import { watch } from "vue";

export default defineNuxtPlugin(async () => {
    const accountStore = useAccountStore();

    console.log("🔄 Initializing account store...");
    await accountStore.initializeAccountStore();

    // ✅ Auto-fetch account details when sessionId changes
    watch(
        () => accountStore.sessionId,
        async (newSessionId) => {
            if (newSessionId) {
                console.log("🔄 Session ID changed, reloading account details...");
                await accountStore.fetchAccountDetails();
            }
        }
    );
});
