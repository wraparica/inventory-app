import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function PublicRoute({ children }) {
    const { accessToken } = useAuth();

    if (accessToken) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}