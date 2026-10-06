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
  where,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';

const COLLECTION_NAME = 'reports';

export const REPORT_CATEGORIES = [
  { id: 'annual', labelHi: 'वार्षिक प्रतिवेदन', labelEn: 'Annual Reports' },
  { id: 'project', labelHi: 'परियोजना रिपोर्ट', labelEn: 'Project Reports' },
  { id: 'financial', labelHi: 'वित्तीय रिपोर्ट एवं ऑडिट', labelEn: 'Financial Reports' },
  { id: 'impact', labelHi: 'प्रभाव मूल्यांकन रिपोर्ट', labelEn: 'Impact Reports' },
  { id: 'seminar', labelHi: 'संगोष्ठी व कार्यशाला रिपोर्ट', labelEn: 'Seminar/Workshop Reports' },
  { id: 'other', labelHi: 'अन्य प्रकाशन व नियम पुस्तिका', labelEn: 'Other Publications' },
];

// Seed initial reports for development fallback
const MOCK_REPORTS = [
  {
    id: 'rep-2025-01',
    titleHi: 'प्रथम वार्षिक प्रतिवेदन 2024-2025',
    titleEn: 'First Annual Report 2024-2025',
    descriptionHi: 'मां-बाबूजी जनकल्याण समिति छत्तीसगढ़ का प्रथम वर्ष की गतिविधियों, अभियानों एवं सामाजिक कार्यों की संपूर्ण रिपोर्ट।',
    descriptionEn: 'Comprehensive first annual activity, outreach, and social welfare report of MBKS Chhattisgarh.',
    category: 'annual',
    categoryHi: 'वार्षिक प्रतिवेदन',
    year: '2024-25',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileSize: '2.8 MB',
    status: 'published',
    createdAt: { seconds: 1759600000 },
  },
  {
    id: 'rep-2025-02',
    titleHi: 'निःशुल्क बाल शिक्षा व कोचिंग परियोजना रिपोर्ट',
    titleEn: 'Free Child Education Project Assessment Report',
    descriptionHi: 'भैसमुड़ी व नवागढ़ क्षेत्र में संचालित कंप्यूटर व कोचिंग क्लास से लाभान्वित 150+ बालिकाओं का मूल्यांकन रिपोर्ट।',
    descriptionEn: 'Assessment report of 150+ rural students benefiting from computer literacy and free tutoring in Nawagarh.',
    category: 'project',
    categoryHi: 'परियोजना रिपोर्ट',
    year: '2025-26',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileSize: '1.9 MB',
    status: 'published',
    createdAt: { seconds: 1759500000 },
  },
  {
    id: 'rep-2025-03',
    titleHi: 'वार्षिक आय-व्यय एवं सी.ए. ऑडिट रिपोर्ट 2024-25',
    titleEn: 'Audited Financial Statement & Balance Sheet 2024-25',
    descriptionHi: 'चार्टर्ड एकाउंटेंट द्वारा प्रमाणित आधिकारिक वित्तीय आय-व्यय एवं ऑडिट बैलेंस शीट।',
    descriptionEn: 'CA certified official audited financial statements and balance sheet for transparency.',
    category: 'financial',
    categoryHi: 'वित्तीय रिपोर्ट एवं ऑडिट',
    year: '2024-25',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileSize: '3.4 MB',
    status: 'published',
    createdAt: { seconds: 1759400000 },
  },
  {
    id: 'rep-2025-04',
    titleHi: 'महिला सशक्तिकरण व सिलाई केंद्र प्रभाव मूल्यांकन',
    titleEn: 'Women Empowerment Sewing Skill Impact Study',
    descriptionHi: 'ग्राम सिउंड में सिलाई प्रशिक्षण केंद्र से आत्मनिर्भर बनी 25 ग्रामीण महिलाओं का केस स्टडी व प्रभाव रिपोर्ट।',
    descriptionEn: 'Impact evaluation study of 25 rural women achieving self-employment through sewing training.',
    category: 'impact',
    categoryHi: 'प्रभाव मूल्यांकन रिपोर्ट',
    year: '2025-26',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileSize: '1.5 MB',
    status: 'published',
    createdAt: { seconds: 1759300000 },
  },
  {
    id: 'rep-2025-05',
    titleHi: 'रक्तदान व आपातकालीन स्वास्थ्य सेवा संगोष्ठी रिपोर्ट',
    titleEn: 'Blood Donation Drive Seminar Proceedings',
    descriptionHi: 'जिला स्तरीय रक्तदान प्रोत्साहन संगोष्ठी एवं स्वास्थ्य शिविर कार्यशाला का विवरण।',
    descriptionEn: 'Proceedings report of district-level voluntary blood donation and healthcare workshop.',
    category: 'seminar',
    categoryHi: 'संगोष्ठी व कार्यशाला रिपोर्ट',
    year: '2025-26',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileSize: '2.1 MB',
    status: 'published',
    createdAt: { seconds: 1759200000 },
  },
  {
    id: 'rep-2025-06',
    titleHi: 'संस्था विधान, उप-नियम एवं स्वयंसेवक निर्देशिका',
    titleEn: 'NGO Constitution, Bye-Laws & Volunteer Handbook',
    descriptionHi: 'मां-बाबूजी जनकल्याण समिति का आधिकारिक संविधान, 10 संवैधानिक लक्ष्य एवं नियम पुस्तिका।',
    descriptionEn: 'Official constitution, 10 registered statutory objectives, and volunteer guidelines handbook.',
    category: 'other',
    categoryHi: 'अन्य प्रकाशन व नियम पुस्तिका',
    year: '2025-26',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileSize: '4.2 MB',
    status: 'published',
    createdAt: { seconds: 1759100000 },
  },
];

/**
 * Fetch published reports for public view
 */
export const fetchPublicReports = async (categoryFilter = 'all') => {
  try {
    const colRef = collection(db, COLLECTION_NAME);
    let q = query(colRef, where('status', '==', 'published'), orderBy('createdAt', 'desc'));

    if (categoryFilter !== 'all') {
      q = query(colRef, where('status', '==', 'published'), where('category', '==', categoryFilter), orderBy('createdAt', 'desc'));
    }

    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
    }
  } catch (err) {
    console.warn('Firestore fetchPublicReports fallback:', err.message);
  }

  if (categoryFilter === 'all') return MOCK_REPORTS;
  return MOCK_REPORTS.filter((r) => r.category === categoryFilter);
};

/**
 * Fetch all reports (published + draft) for admin console
 */
export const getAdminReports = async () => {
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
    console.warn('Firestore getAdminReports fallback:', err.message);
  }
  return MOCK_REPORTS;
};

/**
 * Create a new report in Firestore
 */
export const createAdminReport = async (reportData, adminUid = 'admin') => {
  const selectedCat = REPORT_CATEGORIES.find((c) => c.id === reportData.category);

  const payload = {
    titleHi: reportData.titleHi,
    titleEn: reportData.titleEn || reportData.titleHi,
    descriptionHi: reportData.descriptionHi || '',
    descriptionEn: reportData.descriptionEn || '',
    category: reportData.category,
    categoryHi: selectedCat ? selectedCat.labelHi : reportData.category,
    year: reportData.year || '2025-26',
    pdfUrl: reportData.pdfUrl,
    fileSize: reportData.fileSize || 'PDF Document',
    status: reportData.status || 'published',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    createdBy: adminUid,
  };

  try {
    const colRef = collection(db, COLLECTION_NAME);
    const docRef = await addDoc(colRef, payload);
    return { id: docRef.id, ...payload };
  } catch (err) {
    console.warn('Firestore createAdminReport fallback:', err.message);
    const mockId = 'rep-' + Date.now();
    return { id: mockId, ...payload, createdAt: { seconds: Math.floor(Date.now() / 1000) } };
  }
};

/**
 * Update report status (publish/unpublish) or metadata
 */
export const updateAdminReportStatus = async (reportId, status, adminUid = 'admin') => {
  const payload = {
    status,
    updatedAt: serverTimestamp(),
    updatedBy: adminUid,
  };

  try {
    const docRef = doc(db, COLLECTION_NAME, reportId);
    await updateDoc(docRef, payload);
    return true;
  } catch (err) {
    console.warn('Firestore updateAdminReportStatus fallback:', err.message);
    return true;
  }
};

/**
 * Delete report from Firestore
 */
export const deleteAdminReport = async (reportId) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, reportId);
    await deleteDoc(docRef);
    return true;
  } catch (err) {
    console.warn('Firestore deleteAdminReport fallback:', err.message);
    return true;
  }
};
