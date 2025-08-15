import { useState, useEffect } from 'react';
import { User } from '../types';

// Mock user data
const mockUser: User = {
  id: '1',
  name: 'Kim Soo Min',
  email: 'soomin@student.upm.edu.my',
  imageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
  position: 'President, PPMK UPM',
  bio: 'Passionate about Korean culture and building bridges between Malaysia and Korea.',
  university: 'UPM',
  batch: 'B21',
  clubs: ['ppmk-upm', 'korean-dance'],
  roles: ['admin'],
  createdAt: '2023-01-15T00:00:00Z'
};

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate auth check
    setTimeout(() => {
      setUser(mockUser);
      setLoading(false);
    }, 1000);
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login
    setUser(mockUser);
    return mockUser;
  };

  const logout = () => {
    setUser(null);
  };

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };
};
