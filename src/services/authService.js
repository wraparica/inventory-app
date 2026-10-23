
const INVENTORY_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ||
    'https://inventory-app-backend-production-3919.up.railway.app';

let refreshPromise = null;

export function refreshAccessToken() {
    if (!refreshPromise) {
        refreshPromise = (async () => {
            const response = await fetch(
                `${INVENTORY_BASE_URL}/api/refresh`,
                {
                    method: 'POST',
                    credentials: 'include',
                }
            );

            const payload = await response.json().catch(() => null);
            const newToken = payload?.data?.accessToken;

            if (!response.ok || !payload?.success || !newToken) {
                throw new Error(
                    payload?.message ||
                    'Session expired. Please log in again.'
                );
            }

            return newToken;
        })().finally(() => {
            refreshPromise = null;
        });
    }

    return refreshPromise;
}
