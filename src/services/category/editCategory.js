import { authenticatedFetch } from '../apiClient';
import INVENTORY_BASE_URL from '../apiConfig';

export async function editCategory(
    id,
    token,
    setAccessToken,
    name,
    description
) {
    const url = `${INVENTORY_BASE_URL}/api/category/${encodeURIComponent(id)}`;

    let response;

    try {
        response = await authenticatedFetch(
            url,
            token,
            setAccessToken,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                }, body: JSON.stringify({
                    name,
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
            payload?.message || 'Something went wrong editting the Category.'
        );
    }

    return payload.data;
}