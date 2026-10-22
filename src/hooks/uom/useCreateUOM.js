import { useCallback, useState } from 'react';
import { postUOM } from '../../services/uom/createUOM';
import { useAuth } from '../../auth/AuthContext';

export function usePost() {
    const [data, setData] = useState(null);
    const [status, setStatus] = useState('idle'); // idle | loading | success | error
    const [error, setError] = useState(null);
    const { accessToken } = useAuth();
    const createUOM = useCallback(async (name, symbol, description) => {
        if (!name?.trim()) return;
        if (!symbol?.trim()) return;
        if (!description?.trim()) return;
        if (!accessToken) return;
        setStatus('loading');
        setError(null);
        try {
            const result = await postUOM(name.trim(), symbol.trim(), description.trim(), accessToken);
            setData(result)
            setStatus('success');
        } catch (err) {
            setError(err.message);
            setStatus('error');
        }
    }, []);

    return { data, status, error, createUOM };
}