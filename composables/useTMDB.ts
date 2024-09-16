export const useTMDB = () => {
    const config = useRuntimeConfig();  // Access server-side config
    const baseUrl = 'https://api.themoviedb.org/3';  // TMDB v3 base URL

    console.log('Bearer Token:', config.public.tmdbAuthToken);

    const fetchTMDB = async (endpoint: string, params = {}) => {
        const url = new URL(`${baseUrl}${endpoint}`);
        url.search = new URLSearchParams({ ...params }).toString();

        try {
            const response = await $fetch(url.toString(), {
                headers: {
                  accept: 'application/json',
                  Authorization: `Bearer ${config.public.tmdbAuthToken}`,  // Bearer token in headers
                },
            });
            return response;
        } catch (error) {
            console.error('TMDB Fetch Error:', error);
            throw error;
        }
    };

    return { fetchTMDB };
};