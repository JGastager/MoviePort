export default eventHandler(async (event) => {
    const config = useRuntimeConfig();
    const BASEURL = config.public.tmdbBaseUrl as string;
    const BEARER = config.public.tmdbAuthToken as string;

    const route = event.context.params._ || ``;
    const query = getQuery(event);
    const method = event.method || 'GET'; // Ensure method is always set
    const payload = method !== 'GET' ? await readBody(event) : null;

    // Extract session_id from headers or query params
    const sessionId = getHeader(event, 'x-tmdb-session-id') || query.session_id;

    // Set up headers
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${BEARER}`,
    };

    // Append session_id if present
    let url = `${BASEURL}/${route}`;
    if (sessionId) {
        const urlObj = new URL(url);
        urlObj.searchParams.append('session_id', sessionId);
        url = urlObj.toString();
    }

    // ✅ Ensure method is allowed by TMDB
    const allowedMethods = ['GET', 'POST', 'DELETE', 'PUT'];
    if (!allowedMethods.includes(method)) {
        throw createError({
            statusCode: 405,
            statusMessage: 'Method Not Allowed',
        });
    }

    // ✅ Make request with the correct method
    try {
        const res = await $fetch(url, {
            method,
            headers,
            body: payload ?? undefined,
        });
        return res || [];
    } catch (error) {
        console.error(`TMDB Proxy Error [${method} ${route}]:`, error);
        throw createError({ statusCode: 500, statusMessage: 'TMDB API Error' });
    }
});
