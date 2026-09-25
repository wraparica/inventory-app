import { useCallback, useState } from 'react';
import { postLogin } from '../services/inventoryLoginApi';

export function useLogin() {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [error, setError] = useState(null);

  const login = useCallback( async (username, password) => {
    if (!username?.trim()) return;
    if (!password?.trim()) return;

    setStatus('loading');
    setError(null);

    try {
      const result = await postLogin(username.trim(), password.trim());
      console.log("pota", result)
      setData(result)
      setStatus('success');
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  }, []);
  
  return { data, status, error, login };
}