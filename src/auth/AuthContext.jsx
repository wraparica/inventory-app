import { createContext, useContext, useState } from "react";
import { logoutUser } from "../services/inventoryLogoutApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [accessToken, setAccessToken] = useState(null);
    const [user, setUser] = useState(null);

    async function logout() {
        console.log("Logout function called");

        try {
            const result = await logoutUser();
            console.log("Logout API response:", result);
        } catch (error) {
            console.error("Logout API failed:", error);
            throw error;
        } finally {
            setAccessToken(null);
            setUser(null);
        }
    }

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                setAccessToken,
                user,
                setUser,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    return context;
}