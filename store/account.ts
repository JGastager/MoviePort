import { defineStore } from 'pinia';

export const useAccountStore = defineStore('accountStore', {
    state: () => ({
        user: {},
    }),
    actions: {
        async login(username: string, password: string) {
            const requestToken = await this.createRequestToken();
            console.log(requestToken);
            try {
                this.user = await fetch('/api/authentication/token/validate_with_login', { method: 'POST', body: { username, password, request_token: requestToken.request_token } });
                console.log(this.user);
            }
            catch (error) {
               return console.log("login: " + error);
            }
        },  
        logout() {
            // do something
        },
        async createRequestToken() {
            try {
                return await $fetch('/api/authentication/token/new');
            } catch (error) {
                return console.log("createRequestToken: " + error);
            }
        }
    }
});
