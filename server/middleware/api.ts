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

    console.log("Incoming Request Body:", body);

    // Define headers
    const headers: Record<string, string> = {
        accept: 'application/json',
        Authorization : `Bearer ${BEARER}`,
    };

    // Construct the final TMDB URL
    const url = new URL(`${BASEURL}/${tmdbPath}`);

    // Send request to TMDB API
    const response = await fetch(url.toString(), {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,  // ✅ Ensure JSON.stringify
    });

    console.log("Final Sent Body:", JSON.stringify(body, null, 2)); // ✅ Log final body before sending

    if (!response.ok) {
        throw createError({ statusCode: response.status, message: response.statusText });
    }

    return await response.json();
});
