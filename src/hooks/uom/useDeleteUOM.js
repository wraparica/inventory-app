import { useCallback, useState } from 'react';
import { removeUOM } from '../../services/uom/deleteUOM';
import { useAuth } from '../../auth/AuthContext';

export function useDelete() {
    const [data, setData] = useState(null);
    const [status, setStatus] = useState('idle'); // idle | loading | success | error
    const [error, setError] = useState(null);
    const { accessToken } = useAuth();
    const deleteUOM = useCallback(async (id) => {
        if (!id?.trim()) return;
        if (!accessToken) return;
        setStatus('loading');
        setError(null);
        try {
            const result = await removeUOM(id.trim(), accessToken);
            setData(result)
            setStatus('success');
        } catch (err) {
            setError(err.message);
            setStatus('error');
        }
    }, []);

    return { data, status, error, deleteUOM };
}