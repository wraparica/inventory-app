
import { refreshAccessToken } from './authService';

export async function authenticatedFetch(
    url,
    accessToken,
    setAccessToken,
    options = {}
) {
    const sendRequest = (token) => {
        const headers = new Headers(options.headers || {});

        headers.set('Authorization', `Bearer ${token}`);

        return fetch(url, {
            ...options,
            headers,
            credentials: 'include',
        });
    };

    let response = await sendRequest(accessToken);

    if (response.status === 401) {
        const newToken = await refreshAccessToken();

        setAccessToken(newToken);

        // Retry only once to avoid an infinite refresh loop.
        response = await sendRequest(newToken);
    }

    return response;
}
