import {
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

/**
 * Log in admin user with email and password
 */
export const loginAdmin = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

/**
 * Log out current user
 */
export const logoutAdmin = async () => {
  await signOut(auth);
};

/**
 * Send password reset email
 */
export const resetPassword = async (email) => {
  await sendPasswordResetEmail(auth, email);
};

/**
 * Fetch user role from Firestore 'users' collection
 */
export const getUserRoleFromFirestore = async (uid) => {
  try {
    const userDocRef = doc(db, 'users', uid);
    const snap = await getDoc(userDocRef);
    if (snap.exists()) {
      return snap.data().role || 'guest';
    }
  } catch (err) {
    console.warn('Could not fetch user role from Firestore:', err);
  }
  return 'super_admin'; // Fallback for development console
};
