export default eventHandler(async (event) => {
    const config = useRuntimeConfig();
    const BASEURL = config.public.tmdbBaseUrl as string;
    const BEARER = config.public.tmdbAuthToken as string;

    // Get route and query params
    const route = event.context.params?._ ?? ``;
    const queryParams = getQuery(event);
    const method = event.method || "GET";
    const payload = method !== "GET" ? await readBody(event) : null;

    // Extract session_id from headers or query params
    const sessionId = (getHeader(event, "x-tmdb-session-id") || queryParams.session_id)?.toString();

    // Construct the full URL
    let url = `${BASEURL}/${route}`;
    const urlObj = new URL(url);

    // Append all query params dynamically
    Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined) {
            urlObj.searchParams.append(key, String(value));
        }
    });

    // Ensure session_id is included in query params
    if (sessionId) {
        urlObj.searchParams.set("session_id", sessionId);
    }

    url = urlObj.toString();

    // Define allowed methods
    const allowedMethods = ["GET", "POST", "DELETE", "PUT"];
    if (!allowedMethods.includes(method)) {
        throw createError({
            statusCode: 405,
            statusMessage: "Method Not Allowed",
        });
    }

    // Set headers
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${BEARER}`,
    };

    // Make request to TMDB
    try {
        const res = await $fetch(url, {
            method,
            headers,
            body: payload ?? undefined,
        });
        return res || [];
    } catch (error) {
        throw createError({ statusCode: 500, statusMessage: `❌ TMDB Proxy Error [${method} ${route}]: ${error}` });
    }
});
