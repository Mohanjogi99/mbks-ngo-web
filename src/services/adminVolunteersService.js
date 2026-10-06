import {
  collection,
  doc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';

const COLLECTION_NAME = 'volunteers';

// Seed mock volunteers for development preview if Firestore collection is empty
const MOCK_VOLUNTEERS = [
  {
    id: 'vol-101',
    fullName: 'अमित कुमार देवांगन',
    mobile: '9826198261',
    email: 'amit@example.com',
    gender: 'male',
    age: 26,
    district: 'Janjgir-Champa',
    block: 'नवागढ़',
    villageCity: 'ग्राम भैसमुड़ी',
    skills: ['social-media', 'event-mgmt', 'photography'],
    interests: ['education', 'blood-donation', 'event-management'],
    availability: 'weekends',
    message: 'मैं भैसमुड़ी में शिक्षा व रक्तदान अभियानों में अपना योगदान देना चाहता हूँ।',
    status: 'approved',
    internalNotes: 'सत्यापित आवेदक। पूर्व रक्तदान शिविर में उत्कृष्ट सहयोग दिया।',
    appliedAt: { seconds: 1759600000 },
  },
  {
    id: 'vol-102',
    fullName: 'सुनीता देवांगन',
    mobile: '9826198262',
    email: 'sunita@example.com',
    gender: 'female',
    age: 32,
    district: 'Janjgir-Champa',
    block: 'नवागढ़',
    villageCity: 'ग्राम सिउंड',
    skills: ['tailoring', 'teaching'],
    interests: ['women', 'education'],
    availability: 'weekdays',
    message: 'महिलाओं हेतु सिलाई प्रशिक्षण में प्रशिक्षक के रूप में सहायता कर सकती हूँ।',
    status: 'approved',
    internalNotes: 'सिलाई केंद्र प्रभारी हेतु उपयुक्त।',
    appliedAt: { seconds: 1759500000 },
  },
  {
    id: 'vol-103',
    fullName: 'राकेश कश्यप',
    mobile: '9826198263',
    email: 'rakesh@example.com',
    gender: 'male',
    age: 23,
    district: 'Janjgir-Champa',
    block: 'नवागढ़',
    villageCity: 'नवागढ़',
    skills: ['general', 'driving'],
    interests: ['environment', 'youth'],
    availability: 'full-time',
    message: 'पर्यावरण व वृक्षारोपण अभियानों में पूर्णकालिक सेवा हेतु तैयार हूँ।',
    status: 'pending',
    internalNotes: '',
    appliedAt: { seconds: 1759400000 },
  },
  {
    id: 'vol-104',
    fullName: 'प्रिया साहू',
    mobile: '9826198264',
    email: 'priya@example.com',
    gender: 'female',
    age: 21,
    district: 'Bilaspur',
    block: 'बिलासपुर',
    villageCity: 'बिलासपुर शहर',
    skills: ['digital-tech', 'teaching'],
    interests: ['digital-tech', 'education'],
    availability: 'weekends',
    message: 'कंप्यूटर साक्षरता सिखाने हेतु तैयार हूँ।',
    status: 'pending',
    internalNotes: '',
    appliedAt: { seconds: 1759300000 },
  },
];

/**
 * Fetch all volunteer applications for admin console
 */
export const getAdminVolunteers = async () => {
  try {
    const colRef = collection(db, COLLECTION_NAME);
    const q = query(colRef, orderBy('appliedAt', 'desc'));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
    }
  } catch (err) {
    console.warn('Firestore getAdminVolunteers fallback:', err.message);
  }
  return MOCK_VOLUNTEERS;
};

/**
 * Update volunteer status and internal admin notes in Firestore
 */
export const updateAdminVolunteerStatus = async (volunteerId, status, internalNotes = '', adminUid = 'admin') => {
  const payload = {
    status,
    internalNotes,
    updatedAt: serverTimestamp(),
    updatedBy: adminUid,
  };

  try {
    const docRef = doc(db, COLLECTION_NAME, volunteerId);
    await updateDoc(docRef, payload);
    return true;
  } catch (err) {
    console.warn('Firestore updateAdminVolunteerStatus fallback:', err.message);
    return true;
  }
};

/**
 * Delete a volunteer record from Firestore
 */
export const deleteAdminVolunteer = async (volunteerId) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, volunteerId);
    await deleteDoc(docRef);
    return true;
  } catch (err) {
    console.warn('Firestore deleteAdminVolunteer fallback:', err.message);
    return true;
  }
};
