
const CURRENCY_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ||
    'https://inventory-app-backend-production-3919.up.railway.app';

// Share one refresh request if multiple API calls receive 401 together.
let refreshPromise = null;

async function refreshAccessToken() {
    if (!refreshPromise) {
        refreshPromise = (async () => {
            const response = await fetch(
                `${CURRENCY_BASE_URL}/api/refresh`,
                {
                    method: 'POST',
                    credentials: 'include',
                }
            );

            const payload = await response.json().catch(() => null);

            // Your backend returns { success, data: { accessToken } }.
            const newToken = payload?.data?.accessToken;

            if (!response.ok || !payload?.success || !newToken) {
                throw new Error(
                    payload?.message || 'Session expired. Please log in again.'
                );
            }

            return newToken;
        })().finally(() => {
            refreshPromise = null;
        });
    }

    return refreshPromise;
}

export async function getAllUOM(token, setAccessToken) {
    const url = `${CURRENCY_BASE_URL}/api/uom`;

    const sendRequest = (accessToken) =>
        fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            credentials: 'include',
        });

    let response;

    try {
        response = await sendRequest(token);

        if (response.status === 401) {
            const newToken = await refreshAccessToken();

            // Update the existing AuthContext.
            setAccessToken(newToken);

            // Retry once with the new access token.
            response = await sendRequest(newToken);
        }
    } catch (error) {
        if (error instanceof Error &&
            error.message === 'Session expired. Please log in again.') {
            throw error;
        }

        throw new Error(
            'Could not reach the inventory server. Is the backend running?'
        );
    }

    const payload = await response.json().catch(() => null);

    if (!response.ok || !payload?.success) {
        throw new Error(
            payload?.message || 'Something went wrong retrieving UOM.'
        );
    }

    return payload.data;
}
