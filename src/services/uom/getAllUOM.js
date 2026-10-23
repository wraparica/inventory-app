import { authenticatedFetch } from '../apiClient';

const INVENTORY_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ||
    'https://inventory-app-backend-production-3919.up.railway.app';

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