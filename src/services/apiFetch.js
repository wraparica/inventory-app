const CURRENCY_BASE_URL = import.meta.env.VITE_API_BASE_URL ||  'https://inventory-app-backend-production-3919.up.railway.app';

//const CURRENCY_BASE_URL = import.meta.env.VITE_API_BASE_URL ||  'http://localhost:5000';


let accessToken = null;

export function setAccessToken(token) {
    accessToken = token;
}

export function clearAccessToken() {
    accessToken = null;
}

async function refreshAccessToken() {
    const response = await fetch(
        `${API_URL}/api/refresh`,
        {
            method: "POST",
            credentials: "include",
        }
    );

    if (!response.ok) {
        clearAccessToken();
        throw new Error("Session expired. Please log in again.");
    }

    const data = await response.json();

    setAccessToken(data.accessToken);

    return data.accessToken;
}

export async function apiFetch(path, options = {}) {
    const sendRequest = (token) => {
        const headers = new Headers(options.headers || {});

        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }

        return fetch(`${API_URL}${path}`, {
            ...options,
            headers,
            credentials: "include",
        });
    };

    let response = await sendRequest(accessToken);

    if (
        response.status !== 401 ||
        path === "/api/refresh"
    ) {
        return response;
    }

    const newToken = await refreshAccessToken();

    return sendRequest(newToken);
}