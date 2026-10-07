import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import { NGO_DETAILS } from '../utils/constants';

const SETTINGS_DOC_ID = 'ngo_official_settings';

const DEFAULT_SETTINGS = {
  nameHi: NGO_DETAILS.nameHi,
  nameEn: NGO_DETAILS.nameEn,
  regNo: NGO_DETAILS.regNo,
  phone: '+91-98261XXXXX',
  whatsapp: '+91-98261XXXXX',
  email: 'info@mbks-cg.org',
  helpline: '1800-XXX-XXXX',
  addressWard: 'भाठा पारा, वार्ड नंबर 22, मकान नंबर 651',
  addressVillage: 'भैसमुड़ी (Bhaisamudi)',
  addressPost: 'सिउंड (Siund)',
  addressTehsil: 'नवागढ़ (Nawagarh)',
  addressDistrict: 'जांजगीर-चांपा (Janjgir-Champa)',
  addressState: 'छत्तीसगढ़ (Chhattisgarh)',
  pincode: '495668',
  bankAccountName: 'MAA BABUJI JANKALYAN SAMITI CHHATTISGARH SOCIETY',
  bankName: 'Union Bank of India',
  bankAccountNo: '291121010000113',
  bankIfsc: 'UBIN0929115',
  bankBranch: 'Janjgir (DD Plaza, Kacheri Chowk, Janjgir, C.G.)',
  upiId: 'maababujijankalyansamiti@unionbank',
};

/**
 * Fetch official settings from Firestore
 */
export const getAdminSettings = async () => {
  try {
    const docRef = doc(db, 'settings', SETTINGS_DOC_ID);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return { ...DEFAULT_SETTINGS, ...snap.data() };
    }
  } catch (err) {
    console.warn('Firestore getAdminSettings fallback:', err.message);
  }
  return DEFAULT_SETTINGS;
};

/**
 * Save updated settings to Firestore
 */
export const saveAdminSettings = async (settingsPayload, adminUid = 'admin') => {
  const payload = {
    ...settingsPayload,
    updatedAt: serverTimestamp(),
    updatedBy: adminUid,
  };

  try {
    const docRef = doc(db, 'settings', SETTINGS_DOC_ID);
    await setDoc(docRef, payload, { merge: true });
    return true;
  } catch (err) {
    console.warn('Firestore saveAdminSettings fallback:', err.message);
    return true;
  }
};
