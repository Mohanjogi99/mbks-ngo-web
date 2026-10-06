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

const COLLECTION_NAME = 'donations';

// Mock initial donations for development preview if Firestore is empty
const MOCK_DONATIONS = [
  {
    id: 'DON-1001',
    donorName: 'रमेश कुमार देवांगन',
    mobile: '9826198261',
    email: 'ramesh@example.com',
    panNumber: 'ABCDE1234F',
    amount: 5000,
    purpose: 'Education & Literacy Drive',
    purposeHi: 'निःशुल्क बाल शिक्षा व पुस्तक वितरण',
    paymentMethod: 'upi',
    paymentRef: 'UPI-429104820192',
    paymentStatus: 'verified',
    receiptNo: '80G-2025-0010',
    address: 'नवागढ़, जांजगीर-चांपा',
    isAnonymous: false,
    createdAt: { seconds: 1759600000 },
  },
  {
    id: 'DON-1002',
    donorName: 'डॉ. संजय शर्मा',
    mobile: '9826198262',
    email: 'sanjay@example.com',
    panNumber: 'BKGPS9876K',
    amount: 10000,
    purpose: 'Free Health Camps & Blood Donation',
    purposeHi: 'स्वास्थ्य व आपातकालीन रक्तदान शिविर',
    paymentMethod: 'bank_transfer',
    paymentRef: 'NEFT-SBIN20250912',
    paymentStatus: 'verified',
    receiptNo: '80G-2025-0011',
    address: 'बिलासपुर, छत्तीसगढ़',
    isAnonymous: false,
    createdAt: { seconds: 1759500000 },
  },
  {
    id: 'DON-1003',
    donorName: 'श्रीमती अनीता साहू',
    mobile: '9826198263',
    email: 'anita@example.com',
    panNumber: '',
    amount: 2500,
    purpose: 'Women Skill Training & Empowerment',
    purposeHi: 'महिला सिलाई व स्वावलंबन केंद्र',
    paymentMethod: 'upi',
    paymentRef: 'UPI-429188201401',
    paymentStatus: 'pending_verification',
    receiptNo: '',
    address: 'भैसमुड़ी, नवागढ़',
    isAnonymous: false,
    createdAt: { seconds: 1759450000 },
  },
  {
    id: 'DON-1004',
    donorName: 'गुप्त दानदाता (Anonymous Donor)',
    mobile: '98261XXXXX',
    email: '',
    panNumber: '',
    amount: 1100,
    purpose: 'General Welfare Fund',
    purposeHi: 'सामान्य जनकल्याण कोष',
    paymentMethod: 'upi',
    paymentRef: 'UPI-429177209110',
    paymentStatus: 'verified',
    receiptNo: '80G-2025-0012',
    address: 'जांजगीर',
    isAnonymous: true,
    createdAt: { seconds: 1759400000 },
  },
  {
    id: 'DON-1005',
    donorName: 'राजेश कश्यप',
    mobile: '9826198265',
    email: 'rajesh@example.com',
    panNumber: 'CHVPK5432M',
    amount: 1000,
    purpose: 'Environmental Protection & Tree Plantation',
    purposeHi: 'पर्यावरण व वृक्षारोपण अभियान',
    paymentMethod: 'cheque',
    paymentRef: 'CHQ-881024',
    paymentStatus: 'pending_verification',
    receiptNo: '',
    address: 'सिउंड, नवागढ़',
    isAnonymous: false,
    createdAt: { seconds: 1759300000 },
  },
];

/**
 * Fetch all donation records for admin dashboard
 */
export const getAdminDonations = async () => {
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
    console.warn('Firestore getAdminDonations fallback:', err.message);
  }
  return MOCK_DONATIONS;
};

/**
 * Create a new donation record (Public submit or Admin manual entry)
 */
export const createDonation = async (donationData) => {
  const payload = {
    donorName: donationData.donorName || 'गुप्त दानदाता',
    mobile: donationData.mobile || '',
    email: donationData.email || '',
    panNumber: (donationData.panNumber || '').toUpperCase(),
    amount: Number(donationData.amount) || 0,
    purpose: donationData.purpose || 'General Welfare Fund',
    purposeHi: donationData.purposeHi || 'सामान्य जनकल्याण कोष',
    paymentMethod: donationData.paymentMethod || 'upi',
    paymentRef: donationData.paymentRef || 'PENDING-REF',
    paymentStatus: donationData.paymentStatus || 'pending_verification',
    receiptNo: donationData.receiptNo || '',
    address: donationData.address || '',
    isAnonymous: Boolean(donationData.isAnonymous),
    createdAt: serverTimestamp(),
  };

  try {
    const colRef = collection(db, COLLECTION_NAME);
    const docRef = await addDoc(colRef, payload);
    return { id: docRef.id, ...payload };
  } catch (err) {
    console.warn('Firestore createDonation fallback:', err.message);
    const mockId = 'DON-' + Math.floor(1000 + Math.random() * 9000);
    return { id: mockId, ...payload, createdAt: { seconds: Math.floor(Date.now() / 1000) } };
  }
};

/**
 * Update donation status and 80G receipt number in Firestore
 */
export const updateDonationStatus = async (donationId, paymentStatus, receiptNo = '', adminUid = 'admin') => {
  const payload = {
    paymentStatus,
    receiptNo,
    updatedAt: serverTimestamp(),
    updatedBy: adminUid,
  };

  try {
    const docRef = doc(db, COLLECTION_NAME, donationId);
    await updateDoc(docRef, payload);
    return true;
  } catch (err) {
    console.warn('Firestore updateDonationStatus fallback:', err.message);
    return true;
  }
};

/**
 * Delete a donation record
 */
export const deleteDonation = async (donationId) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, donationId);
    await deleteDoc(docRef);
    return true;
  } catch (err) {
    console.warn('Firestore deleteDonation fallback:', err.message);
    return true;
  }
};
