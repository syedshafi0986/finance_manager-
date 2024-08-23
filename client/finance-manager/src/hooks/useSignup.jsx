import { useState } from 'react';
import { useAuthContext } from './useAuthcontext';

export const useRegister = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const register = async (name, password) => {
    setError(null);
    setIsLoading(true);

    const response = await fetch('http://localhost:3000/user/register', {
      method: 'POST',
      body: JSON.stringify({ name, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.message || 'An error occurred');
    }

    if (response.ok) {
      localStorage.setItem('user', JSON.stringify(json));
      dispatch({ type: 'LOGIN', payload: json });
      setIsLoading(false);
      return true; // Login successful

    }
  };

  return { register, error, isLoading };
};
