import { useCallback, useState } from 'react';
import { editCategory } from '../../services/category/editCategory';
import { useAuth } from '../../auth/AuthContext';

export function useEditCategory() {
    const [data, setData] = useState(null);
    const [status, setStatus] = useState('idle'); // idle | loading | success | error
    const [error, setError] = useState(null);
    const { accessToken, setAccessToken } = useAuth();
    const updateCategory = useCallback(
        async (
            id,
            name,
            description
        ) => {
            if (!id?.trim()) return;
            if (!name?.trim()) return;
            if (!description?.trim()) return;
            if (!accessToken) return;
            setStatus('loading');
            setError(null);
            try {
                const result = await editCategory(
                    id.trim(),
                    accessToken,
                    setAccessToken,
                    name,
                    description
                );
                setData(result)
                setStatus('success');
            } catch (err) {
                setError(err.message);
                setStatus('error');
            }
        }, []);

    return { data, status, error, updateCategory };
}