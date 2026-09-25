const CURRENCY_BASE_URL = import.meta.env.VITE_API_BASE_URL ||  'https://inventory-app-backend-production-3919.up.railway.app';

export async function postRegister(email, username, password) {
    const url = `${CURRENCY_BASE_URL}/api/register`;

    let response;
    try {
        response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                email,
                username,
                password,
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