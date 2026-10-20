const INVENTORY_BASE_URL = import.meta.env.VITE_API_BASE_URL ||  'https://inventory-app-backend-production-3919.up.railway.app';

export async function logoutUser() {
    const url = `${INVENTORY_BASE_URL}/api/logout`;

    let response;

    try {
        response = await fetch(url, {
            method: "POST",
            credentials: "include",
        });
    } catch (error) {
        console.error("Logout network error:", error);

        throw new Error(
            "Could not reach the inventory server. Check the backend URL and CORS settings."
        );
    }

    const payload = await response.json().catch(() => null);

    if (!response.ok || !payload?.success) {
        throw new Error(
            payload?.message || "Something went wrong logging out."
        );
    }

    return payload;
}
