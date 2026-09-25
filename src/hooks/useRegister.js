import { useCallback, useState } from 'react';
import { postRegister } from '../services/inventoryRegisterApi';

export function useRegister() {
    const [data, setData] = useState(null);
    const [status, setStatus] = useState('idle'); // idle | loading | success | error
    const [error, setError] = useState(null);

    const register = useCallback(async (email, username, password) => {
        if (!email?.trim()) return;
        if (!username?.trim()) return;
        if (!password?.trim()) return;

        setStatus('loading');
        setError(null);

        try {
            const result = await postRegister(email.trim(), username.trim(), password.trim());
            setData(result)
            setStatus('success');
        } catch (err) {
            setError(err.message);
            setStatus('error');
        }
    }, []);

    return { data, status, error, register };
}