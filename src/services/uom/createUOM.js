
import { authenticatedFetch } from '../apiClient';
import INVENTORY_BASE_URL from '../apiConfig';


export async function postUOM(
    name,
    symbol,
    description,
    token,
    setAccessToken
) {
    const url = `${INVENTORY_BASE_URL}/api/uom`;

    let response;

    try {
        response = await authenticatedFetch(
            url,
            token,
            setAccessToken,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    symbol,
                    description,
                }),
            }
        );
    } catch (error) {
        if (
            error instanceof Error &&
            error.message === 'Session expired. Please log in again.'
        ) {
            throw error;
        }

        throw new Error(
            'Could not reach the inventory server. Is the backend running?'
        );
    }

    const payload = await response.json().catch(() => null);

    if (!response.ok || !payload?.success) {
        throw new Error(
            payload?.message || 'Something went wrong creating the UOM.'
        );
    }

    return payload.data;
}
