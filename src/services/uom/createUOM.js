const CURRENCY_BASE_URL = import.meta.env.VITE_API_BASE_URL ||  'https://inventory-app-backend-production-3919.up.railway.app';

//const CURRENCY_BASE_URL = import.meta.env.VITE_API_BASE_URL ||  'http://localhost:5000';



export async function postUOM(name, symbol, description, token) {
    const url = `${CURRENCY_BASE_URL}/api/uom`;
    console.log("potatoken", token)
    let response;
    try {
        response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }, body: JSON.stringify({
                name,
                symbol,
                description,
            }),
        });
        console.log(response)
    } catch {
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