import { defineStore } from 'pinia';

export const useAccountStore = defineStore('accountStore', {
    state: () => ({
        user: {},
    }),
    actions: {
        async login(username: string, password: string) {
            const requestToken = await this.createRequestToken();
            const requestBody = { username, password, request_token: requestToken.request_token };
                
            try {
                this.user = await $fetch('/api/authentication/token/validate_with_login', { 
                    method: 'POST', 
                    headers: { 'Content-Type': 'application/json' }, 
                    body: JSON.stringify(requestBody) // Ensure it's correctly formatted
                });
            }
            catch (error) {
                return error;
            }
        },         
        logout() {
            // do something
        },
        async createRequestToken() {
            try {
                return await $fetch('/api/authentication/token/new');
            } catch (error) {
                return error;
            }
        }
    }
});
