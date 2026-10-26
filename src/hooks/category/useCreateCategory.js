import { useCallback, useState } from 'react';
import { postCategory } from '../../services/category/createCategory';
import { useAuth } from '../../auth/AuthContext';

export function usePost() {
    const [data, setData] = useState(null);
    const [status, setStatus] = useState('idle'); // idle | loading | success | error
    const [error, setError] = useState(null);
    const { accessToken, setAccessToken } = useAuth();
    const createCategory = useCallback(async (name, description) => {
        if (!name?.trim()) return;
        if (!description?.trim()) return;
        if (!accessToken) return;
        setStatus('loading');
        setError(null);
        try {
            const result = await postCategory(name.trim(), description.trim(), accessToken, setAccessToken);
            setData(result)
            setStatus('success');
        } catch (err) {
            setError(err.message);
            setStatus('error');
        }
    }, []);

    return { data, status, error, createCategory };
}