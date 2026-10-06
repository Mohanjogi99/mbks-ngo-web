import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';

// Import local fallback mock datasets
import { PROJECTS_DATA } from '../data/projectsData';
import { PROGRAMS_DATA } from '../data/programsData';
import { EVENTS_DATA } from '../data/eventsData';
import { PHOTOS_DATA, VIDEOS_DATA } from '../data/galleryData';
import { NEWS_DATA } from '../data/newsData';

/**
 * Generic Helper: Formats Firestore document with ID and timestamps
 */
const formatDoc = (docSnap) => {
  if (!docSnap.exists()) return null;
  return {
    id: docSnap.id,
    ...docSnap.data(),
  };
};

// In-Memory Cache for Firestore Reads Optimization (3-minute TTL)
const serviceCache = new Map();
const CACHE_TTL = 3 * 60 * 1000;

const getCachedData = (key) => {
  const cached = serviceCache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  return null;
};

const setCachedData = (key, data) => {
  serviceCache.set(key, { data, timestamp: Date.now() });
};

// ============================================================================
// 1. PROJECTS FIRESTORE SERVICE
// ============================================================================
export const fetchProjects = async (statusFilter = 'all') => {
  const cacheKey = `projects_${statusFilter}`;
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  try {
    const colRef = collection(db, 'projects');
    let q = query(colRef, orderBy('createdAt', 'desc'));

    if (statusFilter !== 'all') {
      q = query(colRef, where('status', '==', statusFilter), orderBy('createdAt', 'desc'));
    }

    const snapshot = await getDocs(q);
    let result = [];
    if (snapshot.empty) {
      result = statusFilter === 'all' ? PROJECTS_DATA : PROJECTS_DATA.filter((p) => p.status === statusFilter);
    } else {
      result = snapshot.docs.map((d) => formatDoc(d));
    }
    setCachedData(cacheKey, result);
    return result;
  } catch (error) {
    console.warn('Firestore fetchProjects fallback:', error.message);
    const fallback = statusFilter === 'all' ? PROJECTS_DATA : PROJECTS_DATA.filter((p) => p.status === statusFilter);
    setCachedData(cacheKey, fallback);
    return fallback;
  }
};

export const fetchProjectById = async (projectId) => {
  try {
    const docRef = doc(db, 'projects', projectId);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return formatDoc(snap);
    }
  } catch (error) {
    console.warn('Firestore fetchProjectById fallback:', error.message);
  }
  return PROJECTS_DATA.find((p) => p.id === projectId) || null;
};

// ============================================================================
// 2. PROGRAMS FIRESTORE SERVICE
// ============================================================================
export const fetchPrograms = async () => {
  try {
    const colRef = collection(db, 'programs');
    const snapshot = await getDocs(colRef);
    if (!snapshot.empty) {
      return snapshot.docs.map((d) => formatDoc(d));
    }
  } catch (error) {
    console.warn('Firestore fetchPrograms fallback:', error.message);
  }
  return Object.values(PROGRAMS_DATA);
};

export const fetchProgramBySlug = async (slug) => {
  try {
    const docRef = doc(db, 'programs', slug);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return formatDoc(snap);
    }
  } catch (error) {
    console.warn('Firestore fetchProgramBySlug fallback:', error.message);
  }
  return PROGRAMS_DATA[slug] || null;
};

// ============================================================================
// 3. EVENTS FIRESTORE SERVICE
// ============================================================================
export const fetchEvents = async (statusFilter = 'all') => {
  const cacheKey = `events_${statusFilter}`;
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  try {
    const colRef = collection(db, 'events');
    let q = query(colRef, orderBy('eventDate', 'desc'));
    if (statusFilter !== 'all') {
      q = query(colRef, where('status', '==', statusFilter));
    }
    const snapshot = await getDocs(q);
    let result = [];
    if (!snapshot.empty) {
      result = snapshot.docs.map((d) => formatDoc(d));
    } else {
      result = statusFilter === 'all' ? EVENTS_DATA : EVENTS_DATA.filter((e) => e.status === statusFilter);
    }
    setCachedData(cacheKey, result);
    return result;
  } catch (error) {
    console.warn('Firestore fetchEvents fallback:', error.message);
    const fallback = statusFilter === 'all' ? EVENTS_DATA : EVENTS_DATA.filter((e) => e.status === statusFilter);
    setCachedData(cacheKey, fallback);
    return fallback;
  }
};

export const fetchEventById = async (eventId) => {
  try {
    const docRef = doc(db, 'events', eventId);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return formatDoc(snap);
    }
  } catch (error) {
    console.warn('Firestore fetchEventById fallback:', error.message);
  }
  return EVENTS_DATA.find((e) => e.id === eventId) || null;
};

// ============================================================================
// 4. GALLERY & VIDEOS FIRESTORE SERVICE
// ============================================================================
export const fetchPhotos = async (category = 'all') => {
  try {
    const colRef = collection(db, 'gallery');
    let q = query(colRef, where('status', '==', 'published'));
    if (category !== 'all') {
      q = query(colRef, where('category', '==', category), where('status', '==', 'published'));
    }
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return snapshot.docs.map((d) => formatDoc(d));
    }
  } catch (error) {
    console.warn('Firestore fetchPhotos fallback:', error.message);
  }
  if (category === 'all') return PHOTOS_DATA;
  return PHOTOS_DATA.filter((p) => p.category === category);
};

export const fetchVideos = async () => {
  try {
    const colRef = collection(db, 'videos');
    const snapshot = await getDocs(colRef);
    if (!snapshot.empty) {
      return snapshot.docs.map((d) => formatDoc(d));
    }
  } catch (error) {
    console.warn('Firestore fetchVideos fallback:', error.message);
  }
  return VIDEOS_DATA;
};

// ============================================================================
// 5. NEWS / BLOG FIRESTORE SERVICE
// ============================================================================
export const fetchNews = async () => {
  try {
    const colRef = collection(db, 'news');
    const q = query(colRef, where('status', '==', 'published'), orderBy('publishedDate', 'desc'));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return snapshot.docs.map((d) => formatDoc(d));
    }
  } catch (error) {
    console.warn('Firestore fetchNews fallback:', error.message);
  }
  return NEWS_DATA;
};

export const fetchNewsBySlug = async (slug) => {
  try {
    const colRef = collection(db, 'news');
    const q = query(colRef, where('slug', '==', slug), limit(1));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return formatDoc(snapshot.docs[0]);
    }
  } catch (error) {
    console.warn('Firestore fetchNewsBySlug fallback:', error.message);
  }
  return NEWS_DATA.find((n) => n.slug === slug) || null;
};

// ============================================================================
// 6. VOLUNTEERS FIRESTORE SERVICE
// ============================================================================
export const submitVolunteerForm = async (formData) => {
  const payload = {
    ...formData,
    status: 'pending',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    createdBy: 'public_applicant',
  };
  const docRef = await addDoc(collection(db, 'volunteers'), payload);
  return docRef.id;
};

// ============================================================================
// 7. DONATIONS FIRESTORE SERVICE
// ============================================================================
export const submitDonationRecord = async (donationData) => {
  const payload = {
    ...donationData,
    status: 'pending',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    createdBy: 'donor_self',
  };
  const docRef = await addDoc(collection(db, 'donations'), payload);
  return docRef.id;
};

// ============================================================================
// 8. CONTACT MESSAGES FIRESTORE SERVICE
// ============================================================================
export const submitContactMessage = async (messageData) => {
  const payload = {
    ...messageData,
    status: 'unread',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    createdBy: 'public_user',
  };
  const docRef = await addDoc(collection(db, 'contact_messages'), payload);
  return docRef.id;
};
