import {
  collection,
  doc,
  getDocs,
  addDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { PHOTOS_DATA, VIDEOS_DATA } from '../data/galleryData';

/**
 * Fetch photos for admin
 */
export const getAdminPhotos = async () => {
  try {
    const colRef = collection(db, 'gallery');
    const q = query(colRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
    }
  } catch (err) {
    console.warn('Firestore getAdminPhotos fallback:', err.message);
  }
  return PHOTOS_DATA;
};

/**
 * Fetch videos for admin
 */
export const getAdminVideos = async () => {
  try {
    const colRef = collection(db, 'videos');
    const snapshot = await getDocs(colRef);
    if (!snapshot.empty) {
      return snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
    }
  } catch (err) {
    console.warn('Firestore getAdminVideos fallback:', err.message);
  }
  return VIDEOS_DATA;
};

/**
 * Upload new photo item to Firestore
 */
export const createAdminPhoto = async (photoData, adminUid = 'admin') => {
  const payload = {
    titleHi: photoData.titleHi,
    titleEn: photoData.titleEn || photoData.titleHi,
    category: photoData.category || 'education',
    locationHi: photoData.locationHi || 'नवागढ़',
    imageUrl: photoData.imageUrl,
    thumbUrl: photoData.thumbUrl || photoData.imageUrl,
    captionHi: photoData.captionHi || '',
    status: 'published',
    createdAt: serverTimestamp(),
    createdBy: adminUid,
  };

  try {
    const docRef = await addDoc(collection(db, 'gallery'), payload);
    return { id: docRef.id, ...payload };
  } catch (err) {
    console.warn('Firestore createAdminPhoto fallback:', err.message);
    const mockId = 'p-' + Date.now();
    return { id: mockId, ...payload };
  }
};

/**
 * Add new video embed to Firestore
 */
export const createAdminVideo = async (videoData, adminUid = 'admin') => {
  const payload = {
    titleHi: videoData.titleHi,
    titleEn: videoData.titleEn || videoData.titleHi,
    category: videoData.category || 'awareness',
    youtubeId: videoData.youtubeId || 'dQw4w9WgXcQ',
    youtubeUrl: videoData.youtubeUrl || '',
    thumbnailUrl: `https://img.youtube.com/vi/${videoData.youtubeId}/hqdefault.jpg`,
    descriptionHi: videoData.descriptionHi || '',
    createdAt: serverTimestamp(),
    createdBy: adminUid,
  };

  try {
    const docRef = await addDoc(collection(db, 'videos'), payload);
    return { id: docRef.id, ...payload };
  } catch (err) {
    console.warn('Firestore createAdminVideo fallback:', err.message);
    const mockId = 'v-' + Date.now();
    return { id: mockId, ...payload };
  }
};

/**
 * Delete photo item
 */
export const deleteAdminPhoto = async (photoId) => {
  try {
    const docRef = doc(db, 'gallery', photoId);
    await deleteDoc(docRef);
    return true;
  } catch (err) {
    console.warn('Firestore deleteAdminPhoto fallback:', err.message);
    return true;
  }
};

/**
 * Delete video item
 */
export const deleteAdminVideo = async (videoId) => {
  try {
    const docRef = doc(db, 'videos', videoId);
    await deleteDoc(docRef);
    return true;
  } catch (err) {
    console.warn('Firestore deleteAdminVideo fallback:', err.message);
    return true;
  }
};
