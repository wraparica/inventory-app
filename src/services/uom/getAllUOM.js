import { authenticatedFetch } from '../apiClient';
import INVENTORY_BASE_URL from '../apiConfig';

export async function getAllUOM(token, setAccessToken) {
    const response = await authenticatedFetch(
        `${INVENTORY_BASE_URL}/api/uom`,
        token,
        setAccessToken,
        {
            method: 'GET',
        }
    );

    const payload = await response.json().catch(() => null);

    if (!response.ok || !payload?.success) {
        throw new Error(
            payload?.message ||
            'Something went wrong retrieving UOM.'
        );
    }

    return payload.data;
}