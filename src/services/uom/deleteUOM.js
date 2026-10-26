import { authenticatedFetch } from '../apiClient';
import INVENTORY_BASE_URL from '../apiConfig';


export async function removeUOM(id, token, setAccessToken) {
    const url = `${INVENTORY_BASE_URL}/api/uom/${encodeURIComponent(id)}`;

    let response;

    try {
        response = await authenticatedFetch(
            url,
            token,
            setAccessToken,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
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
            payload?.message || 'Something went wrong deleting the UOM.'
        );
    }

    return payload.data;
}