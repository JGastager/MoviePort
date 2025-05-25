import { eventHandler, getQuery, getHeader, readBody, createError } from "h3"; // adjust as needed

export default eventHandler(async (event) => {
    const config = useRuntimeConfig();
    const BASEURL = config.public.tmdbBaseUrl as string;
    const BEARER = config.public.tmdbAuthToken as string;

    if (!BASEURL || !BEARER) {
        throw createError({ statusCode: 500, statusMessage: "TMDB configuration missing" });
    }

    // Get route and query params
    const route = (event.context.params?._ ?? "").replace(/^\//, ""); // remove leading slash
    const queryParams = getQuery(event);
    const method = (event.method || "GET").toUpperCase();
    const payload = method !== "GET" ? await readBody(event) : undefined;

    // Validate method
    const allowedMethods = new Set(["GET", "POST", "DELETE", "PUT"]);
    if (!allowedMethods.has(method)) {
        throw createError({
            statusCode: 405,
            statusMessage: "Method Not Allowed",
        });
    }

    // Extract and sanitize session_id
    let sessionId = getHeader(event, "x-tmdb-session-id") || queryParams.session_id;
    if (sessionId && typeof sessionId !== "string") sessionId = String(sessionId);

    // Construct the full URL
    let url = `${BASEURL}/${route}`;
    const urlObj = new URL(url);

    // Append all query params dynamically, except session_id (handled below)
    Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined && key !== "session_id") {
            urlObj.searchParams.append(key, String(value));
        }
    });

    // Ensure session_id is included in query params
    if (sessionId) {
        urlObj.searchParams.set("session_id", String(sessionId));
    }

    url = urlObj.toString();

    // Set headers
    const headers: Record<string, string> = {
        Authorization: `Bearer ${BEARER}`,
    };
    if (method !== "GET") {
        headers["Content-Type"] = "application/json";
    }

    // Make request to TMDB
    try {
        const res = await $fetch(url, {
            method: method as "GET" | "HEAD" | "PATCH" | "POST" | "PUT" | "DELETE" | "CONNECT" | "OPTIONS" | "TRACE" | "get" | "head" | "patch" | "post" | "put" | "delete" | "connect" | "options" | "trace" | undefined,
            headers,
            body: payload,
        });
        return res ?? [];
    } catch {
        // Log error internally if possible
        throw createError({
            statusCode: 502,
            statusMessage: "TMDB Proxy Error",
        });
    }
});
