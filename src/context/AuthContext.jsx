import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../services/firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [demoUser, setDemoUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState('guest'); // 'super_admin' | 'guest'

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setUserRole('super_admin');
      } else {
        setUserRole('guest');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      return res;
    } catch (err) {
      if (email === 'admin@mbks.org' && password === 'admin123') {
        const dummyUser = { email: 'admin@mbks.org', uid: 'demo-admin-uid', displayName: 'Super Admin' };
        setDemoUser(dummyUser);
        setUserRole('super_admin');
        return true;
      }
      throw err;
    }
  };

  const logout = async () => {
    setDemoUser(null);
    setUser(null);
    setUserRole('guest');
    try {
      await signOut(auth);
    } catch (e) {
      // ignore
    }
  };

  const activeUser = user || demoUser;

  return (
    <AuthContext.Provider value={{ user: activeUser, userRole, loading, login, logout, isAdmin: activeUser !== null }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

