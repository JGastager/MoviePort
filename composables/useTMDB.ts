export const useTMDB = () => {
    const config = useRuntimeConfig();
    const baseUrl = 'https://api.themoviedb.org/3';

    console.log('Bearer Token:', config.public.tmdbAuthToken);

    const fetchTMDB = async (
        endpoint: string,
        params: Record<string, any> = {},
        method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
        body: Record<string, any> | null = null
    ) => {
        const url = new URL(`${baseUrl}${endpoint}`);
        
        // Only append params for GET requests
        if (method === 'GET') {
            url.search = new URLSearchParams(params).toString();
        }

        try {
            return await $fetch(url.toString(), {
                method,
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${config.public.tmdbAuthToken}`,
                },
                body: method !== 'GET' ? body : undefined,
            });
        } catch (error) {
            console.error('TMDB Fetch Error:', error);
            throw new Error('Failed to fetch data from TMDB.');
        }
    };

    return { fetchTMDB };
};
