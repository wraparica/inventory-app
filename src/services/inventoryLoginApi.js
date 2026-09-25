const CURRENCY_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export async function postLogin(username, password) {
    const url = `${CURRENCY_BASE_URL}/api/login`;

    let response;
    try {
        response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
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
            payload?.message || 'Something went wrong logging in.'
        );
    }

    return payload.data;
}