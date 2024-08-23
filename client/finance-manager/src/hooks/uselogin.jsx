import { useState } from 'react';
import { useAuthContext } from './useAuthcontext'; // Fixed typo in import path

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Initialize with false
  const { dispatch } = useAuthContext();

  const login = async (name, password) => {
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3000/user/login', {
        method: 'POST',
        body: JSON.stringify({ name, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.message || 'An error occurred');
        return false; // Login failed
      }

      localStorage.setItem('user', JSON.stringify(json));
      dispatch({ type: 'LOGIN', payload: json });
      return true; // Login successful
    } catch (err) {
      setError('An unexpected error occurred');
      return false; // Login failed
    } finally {
      setIsLoading(false);
    }
  };

  return { login, error, isLoading };
};
