import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { clearTokens, fetchCurrentUser, getUser } from '../api';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const storedUser = await getUser();
      if (storedUser) {
        setUser(storedUser);
        // Optionally refresh user data in background
        fetchCurrentUser().then(setUser).catch(console.error);
      }
    } catch (error) {
      console.error('Failed to load user', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await clearTokens();
    setUser(null);
    router.replace('/(auth)/welcome');
  };

  return { user, loading, logout, refreshUser: loadUser };
};