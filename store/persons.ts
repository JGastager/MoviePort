import { defineStore } from "pinia";

export const usePersonsStore = defineStore("personsStore", {
    state: () => ({
        popularPersons: {},
        personDetails: {},
        personImages: {},
    }),
    actions: {
        async fetchPopularPersons() {
            try {
                this.popularPersons = await $fetch("/api/person/popular");
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        },
        async fetchPersonDetails(personId: number) {
            try {
                this.personDetails = {} as any;

                this.personDetails = await $fetch(`/api/person/${personId}`, {
                    query: { append_to_response: "combined_credits,external_ids,images,translations" },
                });
            } catch (error) {
                console.error("Error fetching person details:", error);
            }
        },
        async fetchPersonImages(personId: number) {
            try {
                this.personImages = await $fetch(`/api/person/${personId}/images`);
            } catch (error) {
                console.error("Error fetching person images:", error);
            }
        },
    },
});
