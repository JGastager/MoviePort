export const useTMDB = () => {
    const config = useRuntimeConfig();
    const baseUrl = "https://api.themoviedb.org/3";

    const fetchTMDB = async (endpoint: string, params: Record<string, unknown> = {}, method: "GET" | "POST" | "PUT" | "DELETE" = "GET", body: Record<string, unknown> | null = null, authType: "bearer" | "session" | "none" = "bearer") => {
        const url = new URL(`${baseUrl}${endpoint}`);

        if (method === "GET") {
            url.search = new URLSearchParams(params).toString();
        }

        const sessionId = localStorage.getItem("session_id");
        const headers: Record<string, string> = {
            accept: "application/json",
        };

        // ✅ Always include the Bearer Token (even for session-based requests)
        headers.Authorization = `Bearer ${config.public.tmdbAuthToken}`;

        // ✅ Append session ID if needed
        if (authType === "session" && sessionId) {
            url.searchParams.append("session_id", sessionId);
        }

        try {
            return await $fetch(url.toString(), {
                method,
                headers,
                body: method !== "GET" ? body : undefined,
            });
        } catch (error) {
            console.error(`TMDB Fetch Error [${endpoint}]:`, error);
            throw new Error(`Failed to fetch data from TMDB (${endpoint}).`);
        }
    };

    return { fetchTMDB };
};
