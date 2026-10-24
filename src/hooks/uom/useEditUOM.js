import { useCallback, useState } from 'react';
import { editUOM } from '../../services/uom/editUOM';
import { useAuth } from '../../auth/AuthContext';

export function useEditUOM() {
    const [data, setData] = useState(null);
    const [status, setStatus] = useState('idle'); // idle | loading | success | error
    const [error, setError] = useState(null);
    const { accessToken, setAccessToken } = useAuth();
    const updateUOM = useCallback(
        async (
            id,
            name,
            symbol,
            description
        ) => {
            if (!id?.trim()) return;
            if (!name?.trim()) return;
            if (!symbol?.trim()) return;
            if (!description?.trim()) return;
            if (!accessToken) return;
            setStatus('loading');
            setError(null);
            try {
                const result = await editUOM(
                    id.trim(),
                    accessToken,
                    setAccessToken,
                    name,
                    symbol,
                    description
                );
                setData(result)
                setStatus('success');
            } catch (err) {
                setError(err.message);
                setStatus('error');
            }
        }, []);

    return { data, status, error, updateUOM };
}