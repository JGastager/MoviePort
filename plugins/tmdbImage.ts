export default defineNuxtPlugin(() => {
    const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';

    // Define available image sizes for posters, backdrops, and profiles
    const sizes = {
        poster: ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original'],
        backdrop: ['w300', 'w780', 'w1280', 'original'],
        profile: ['w45', 'w185', 'h632', 'original'],
    };

    /**
     * Construct a full image URL for a poster, backdrop, or profile
     * @param path - Path of the image (usually from TMDB API response)
     * @param type - Type of the image ('poster', 'backdrop', or 'profile')
     * @param size - Optional. Size of the image (defaults are 'w500' for posters, 'w780' for backdrops, and 'w185' for profiles)
     * @returns Full URL to the image
     */
    const getImageUrl = (path: string, type: 'poster' | 'backdrop' | 'profile', size?: string): string => {
        if (!sizes[type]) {
        throw new Error(`Invalid type: ${type}. Valid types are 'poster', 'backdrop', and 'profile'.`);
        }

        // Set default size based on type if not provided
        const defaultSize = type === 'poster' ? 'w500' : type === 'backdrop' ? 'w780' : 'w185';
        const selectedSize = size || defaultSize;

        if (!sizes[type].includes(selectedSize)) {
        throw new Error(`Invalid size for ${type}: ${selectedSize}. Valid sizes are ${sizes[type].join(', ')}`);
        }

        return `${TMDB_IMAGE_BASE_URL}${selectedSize}${path}`;
    };

    return {
        provide: {
        getImageUrl,
        },
    };
});