const CURRENCY_BASE_URL = import.meta.env.VITE_API_BASE_URL ||  'https://inventory-app-backend-production-3919.up.railway.app';

//const CURRENCY_BASE_URL = import.meta.env.VITE_API_BASE_URL ||  'http://localhost:5000';

export async function removeUOM(id, token) {
    console.log("pota", id)
    console.log("pota", token)
    const url = `${CURRENCY_BASE_URL}/api/uom/${encodeURIComponent(id)}`;
    let response;
    try {
        response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });
        console.log(response)
    } catch {
        console.error('Delete request failed:', error);
        throw new Error('Could not reach the inventory server. Is the backend running?');
    }

    const payload = await response.json().catch(() => null);

    if (!response.ok || !payload?.success) {
        throw new Error(
            payload?.message || 'Something went wrong registering.'
        );
    }

    return payload.data;
}