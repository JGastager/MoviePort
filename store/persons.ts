import { defineStore } from "pinia";

export const usePersonsStore = defineStore("personsStore", {
    state: () => ({
        popularPersons: {},
        personDetails: {},
        personImages: {},
    }),
    actions: {
        async fetchPopularPersons(page = 1) {
            try {
                const response = await $fetch("/api/person/popular", {
                    query: { page },
                });
                if (page === 1) {
                    this.popularPersons = response;
                } else {
                    this.popularPersons = {
                        ...response,
                        results: [...this.popularPersons.results, ...response.results],
                    };
                }
            } catch (error) {
                console.error("Error fetching popular persons:", error);
                console.timeEnd("fetchPopularPersons"); // Ensure timer ends even if an error occurs
            }
        },
        async fetchPersonDetails(personId: number) {
            try {
                this.personDetails = {} as never;

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
