import dayjs from "dayjs";

export default defineNuxtPlugin((nuxtApp) => {
    // Make dayjs available globally
    nuxtApp.provide("dayjs", dayjs);
});
