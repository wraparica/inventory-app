import { useCallback, useState } from 'react';
import { removeCategory } from '../../services/category/deleteCategory';
import { useAuth } from '../../auth/AuthContext';

export function useDelete() {
    const [data, setData] = useState(null);
    const [status, setStatus] = useState('idle'); // idle | loading | success | error
    const [error, setError] = useState(null);
    const { accessToken, setAccessToken } = useAuth();
    const deleteCategory = useCallback(async (id) => {
        if (!id?.trim()) return;
        if (!accessToken) return;
        setStatus('loading');
        setError(null);
        try {
            const result = await removeCategory(id.trim(), accessToken, setAccessToken);
            setData(result)
            setStatus('success');
        } catch (err) {
            setError(err.message);
            setStatus('error');
        }
    }, []);

    return { data, status, error, deleteCategory };
}