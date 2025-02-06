export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const BASEURL = config.public.tmdbBaseUrl as string;
    const BEARER = config.public.tmdbAuthToken as string;

    // Get the request path
    const path = getRequestURL(event).pathname;

    // Only intercept requests that start with "/api/"
    if (!path.startsWith('/api/')) {
        return;
    }

    // Remove "/api/" prefix so we get the correct TMDB path
    const tmdbPath = path.replace('/api/', '');

    const method = event.method; // GET, POST, etc.
    const body = method === 'GET' ? null : await readBody(event);

    const response = await fetch(`${BASEURL}/${tmdbPath}`, {
        method,
        headers: {
            'Authorization': `Bearer ${BEARER}`,
            'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
        throw createError({ statusCode: response.status, message: response.statusText });
    }

    return await response.json();
});
