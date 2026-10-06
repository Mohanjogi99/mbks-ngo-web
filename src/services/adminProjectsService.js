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
import { PROJECTS_DATA } from '../data/projectsData';

const COLLECTION_NAME = 'projects';

/**
 * Fetch all projects for admin console
 */
export const getAdminProjects = async () => {
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
    console.warn('Firestore getAdminProjects fallback to mock:', err.message);
  }
  return PROJECTS_DATA;
};

/**
 * Create a new project in Firestore
 */
export const createAdminProject = async (projectData, adminUid = 'admin') => {
  const payload = {
    ...projectData,
    progress: projectData.status === 'completed' ? 100 : Number(projectData.progress) || 50,
    beneficiariesCount: Number(projectData.beneficiariesCount) || 0,
    targetBeneficiariesCount: Number(projectData.targetBeneficiariesCount) || 100,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    createdBy: adminUid,
  };

  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), payload);
    return { id: docRef.id, ...payload };
  } catch (err) {
    console.warn('Firestore createAdminProject fallback:', err.message);
    // Return local mock object if Firestore offline
    return { id: 'proj-' + Date.now(), ...payload };
  }
};

/**
 * Update an existing project in Firestore
 */
export const updateAdminProject = async (projectId, projectData, adminUid = 'admin') => {
  const payload = {
    ...projectData,
    progress: projectData.status === 'completed' ? 100 : Number(projectData.progress) || 50,
    beneficiariesCount: Number(projectData.beneficiariesCount) || 0,
    targetBeneficiariesCount: Number(projectData.targetBeneficiariesCount) || 100,
    updatedAt: serverTimestamp(),
    updatedBy: adminUid,
  };

  try {
    const docRef = doc(db, COLLECTION_NAME, projectId);
    await updateDoc(docRef, payload);
    return { id: projectId, ...payload };
  } catch (err) {
    console.warn('Firestore updateAdminProject fallback:', err.message);
    return { id: projectId, ...payload };
  }
};

/**
 * Delete a project from Firestore
 */
export const deleteAdminProject = async (projectId) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, projectId);
    await deleteDoc(docRef);
    return true;
  } catch (err) {
    console.warn('Firestore deleteAdminProject fallback:', err.message);
    return true;
  }
};
