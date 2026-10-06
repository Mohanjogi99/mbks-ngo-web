import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { EVENTS_DATA } from '../data/eventsData';

const COLLECTION_NAME = 'events';

/**
 * Fetch all events for admin console
 */
export const getAdminEvents = async () => {
  try {
    const colRef = collection(db, COLLECTION_NAME);
    const q = query(colRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
    }
  } catch (err) {
    console.warn('Firestore getAdminEvents fallback:', err.message);
  }
  return EVENTS_DATA;
};

/**
 * Create a new event in Firestore
 */
export const createAdminEvent = async (eventData, adminUid = 'admin') => {
  const payload = {
    titleHi: eventData.titleHi,
    titleEn: eventData.titleEn || eventData.titleHi,
    category: eventData.category || 'health',
    categoryLabelHi: eventData.categoryLabelHi || 'स्वास्थ्य व रक्तदान',
    categoryLabelEn: eventData.categoryLabelEn || 'Health & Blood Donation',
    eventDate: eventData.eventDate || '2026-03-20',
    timeHi: eventData.timeHi || 'प्रातः 09:00 बजे से',
    timeEn: eventData.timeEn || '09:00 AM onwards',
    venueHi: eventData.venueHi || 'नवागढ़',
    venueEn: eventData.venueEn || 'Nawagarh',
    descriptionHi: eventData.descriptionHi || '',
    descriptionEn: eventData.descriptionEn || '',
    organizerHi: eventData.organizerHi || 'मां-बाबूजी जनकल्याण समिति',
    organizerEn: eventData.organizerEn || 'MBKS Chhattisgarh',
    status: eventData.status || 'upcoming',
    targetVolunteers: Number(eventData.targetVolunteers) || 20,
    registeredVolunteersCount: Number(eventData.registeredVolunteersCount) || 0,
    coverImage: eventData.coverImage || 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=800',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    createdBy: adminUid,
  };

  try {
    const colRef = collection(db, COLLECTION_NAME);
    const docRef = await addDoc(colRef, payload);
    return { id: docRef.id, ...payload };
  } catch (err) {
    console.warn('Firestore createAdminEvent fallback:', err.message);
    const mockId = 'evt-' + Date.now();
    return { id: mockId, ...payload, createdAt: { seconds: Math.floor(Date.now() / 1000) } };
  }
};

/**
 * Update an existing event in Firestore
 */
export const updateAdminEvent = async (eventId, eventData, adminUid = 'admin') => {
  const payload = {
    ...eventData,
    updatedAt: serverTimestamp(),
    updatedBy: adminUid,
  };

  try {
    const docRef = doc(db, COLLECTION_NAME, eventId);
    await updateDoc(docRef, payload);
    return { id: eventId, ...payload };
  } catch (err) {
    console.warn('Firestore updateAdminEvent fallback:', err.message);
    return { id: eventId, ...payload };
  }
};

/**
 * Delete an event from Firestore
 */
export const deleteAdminEvent = async (eventId) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, eventId);
    await deleteDoc(docRef);
    return true;
  } catch (err) {
    console.warn('Firestore deleteAdminEvent fallback:', err.message);
    return true;
  }
};
