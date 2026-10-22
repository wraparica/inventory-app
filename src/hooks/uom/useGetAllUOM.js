import { useCallback, useState, useEffect } from 'react';
import { getAllUOM } from '../../services/uom/getAllUOM';
import { useAuth } from '../../auth/AuthContext';

export function useGetAllUOM(refreshTrigger = 0) {
    const [data, setData] = useState(null);
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState(null);
    const { accessToken } = useAuth();

    useEffect(() => {
        let cancelled = false;

        async function loadData() {
            if (!accessToken) {
                setStatus('idle');
                return;
            }

            setStatus('loading');
            setError(null);

            try {
                const result = await getAllUOM(accessToken);

                if (!cancelled) {
                    setData(result);
                    setStatus('success');
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err.message);
                    setStatus('error');
                }
            }
        }

        console.log('Fetching UOM');

        loadData();

        return () => {
            cancelled = true;
        };
    }, [refreshTrigger, accessToken]);

    return { data, status, error };
}