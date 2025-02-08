export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const BASEURL = config.public.tmdbBaseUrl as string;
    const BEARER = config.public.tmdbAuthToken as string;

    const path = getRequestURL(event).pathname;

    // Only intercept requests that start with "/api/"
    if (!path.startsWith('/api/')) {
        return;
    }

    // Remove "/api/" prefix
    const tmdbPath = path.replace('/api/', '');

    // Extract method and body
    const method = getMethod(event);
    const body = method === 'GET' ? null : await readBody(event);
    
    // Define headers
    const headers: Record<string, string> = {
        accept: 'application/json',
        Authorization: `Bearer ${BEARER}`,
    };

    // Construct the final TMDB URL
    const url = new URL(`${BASEURL}/${tmdbPath}`);

    // Perform the request
    const response = await fetch(url.toString(), {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
        console.error('❌ TMDB API Error:', response.status, response.statusText);
        throw createError({ statusCode: response.status, message: response.statusText });
    }

    return await response.json();
});
