import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { fetchProjects, fetchEvents } from './firestoreService';

const IMPACT_DOC_ID = 'main_impact_stats';

// Baseline fallback data for impact stats if Firestore document is uninitialized
const DEMO_IMPACT_DATA = {
  totalProjects: 6,
  completedProjects: 4,
  ongoingProjects: 2,
  totalBeneficiaries: 3500,
  totalVolunteers: 28,
  totalEvents: 12,
  villagesReached: 18,
  awarenessProgramsCount: 15,
  geographicReach: [
    { villageHi: 'भैसमुड़ी (Bhaisamudi)', blockHi: 'नवागढ़', beneficiaries: 850, type: 'Primary HQ & Center' },
    { villageHi: 'सिउंड (Siund)', blockHi: 'नवागढ़', beneficiaries: 620, type: 'Health & Tailoring' },
    { villageHi: 'नवागढ़ (Nawagarh City)', blockHi: 'नवागढ़', beneficiaries: 950, type: 'Coaching & Events' },
    { villageHi: 'सिल्दा (Silda)', blockHi: 'नवागढ़', beneficiaries: 410, type: 'Plantation Drive' },
    { villageHi: 'मुरपार (Murpar)', blockHi: 'नवागढ़', beneficiaries: 380, type: 'Awareness Rally' },
    { villageHi: 'हसौद (Hasaud)', blockHi: 'जयजयपुर', beneficiaries: 290, type: 'Blood Donation' },
  ],
  yearWiseActivity: [
    {
      year: '2025',
      titleHi: 'संस्था पंजीकरण एवं संरचना निर्माण',
      titleEn: 'Official Registration & Setup',
      achievementsHi: 'जावक क्रमांक 347, दिनांक 26/05/2025 को आधिकारिक समिति पंजीकरण। 10 मुख्य संवैधानिक उद्देश्यों का निर्धारण एवं 28 सक्रिय स्वयंसेवकों का जुड़ना।',
      projectsCount: 2,
      eventsCount: 4,
      beneficiaries: 1200,
    },
    {
      year: '2026',
      titleHi: 'जमीनी कल्याणकारी अभियानों का विस्तार',
      titleEn: 'Grassroots Welfare Expansion',
      achievementsHi: 'भैसमुड़ी व सिउंड में सिलाई प्रशिक्षण एवं निःशुल्क कंप्यूटर साक्षरता केंद्र का संचालन। 15+ रक्तदान एवं पर्यावरण जागरूकता शिविर आयोजित।',
      projectsCount: 4,
      eventsCount: 8,
      beneficiaries: 2300,
    },
  ],
  successStories: [
    {
      id: 'story-1',
      titleHi: 'ग्रामीण बालिकाओं के लिए निःशुल्क कंप्यूटर शिक्षा क्रांति',
      titleEn: 'Free Computer Coaching for Rural Girls',
      category: 'Education',
      categoryHi: 'शिक्षा',
      location: 'नवागढ़ (Nawagarh)',
      impactCount: '150+ छात्राएं लाभान्वित',
      descHi: 'भैसमुड़ी व नवागढ़ क्षेत्र की 150 से अधिक ग्रामीण बेटियों को बेसिक कंप्यूटर, एमएस ऑफिस व इंटरनेट साक्षरता का निःशुल्क प्रशिक्षण दिया गया, जिससे वे डिजिटल रूप से सक्षम बन रही हैं।',
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 'story-2',
      titleHi: 'आपातकालीन रक्तदान नेटवर्क - 50+ जिंदगियों की रक्षा',
      titleEn: 'Emergency Blood Donation Life-Saving Network',
      category: 'Health',
      categoryHi: 'स्वास्थ्य व रक्तदान',
      location: 'जांजगीर-चांपा (Janjgir-Champa)',
      impactCount: '50+ आपातकालीन डोनेशन',
      descHi: 'समिति के स्वयंसेवकों ने 24x7 रक्तदान हेल्पलाइन के माध्यम से जिला अस्पताल जांजगीर व जिला बिलासपुर के जरूरतमंद मरीजों हेतु त्वरित नि:शुल्क रक्त उपलब्ध कराया।',
      image: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 'story-3',
      titleHi: 'महिला स्वावलंबन - 25 महिलाओं को सिलाई टूलकिट',
      titleEn: 'Women Self-Employment & Sewing Machine Drive',
      category: 'Women',
      categoryHi: 'महिला सशक्तिकरण',
      location: 'ग्राम सिउंड (Siund)',
      impactCount: '25 सिलाई मशीनें वितरित',
      descHi: '3 माह के सिलाई व हस्तशिल्प प्रशिक्षण के उपरांत निर्धन वर्ग की 25 महिलाओं को निःशुल्क सिलाई मशीन व टूलकिट वितरित की गई, जिससे वे घर बैठे आत्मनिर्भर बन रही हैं।',
      image: 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&q=80&w=800',
    },
  ],
  updatedAt: { seconds: Math.floor(Date.now() / 1000) },
  isDemoData: true,
};

/**
 * Fetch composite impact statistics combining live Firestore collection aggregations
 * with admin-managed impact statistics document.
 */
export const fetchImpactData = async () => {
  try {
    // 1. Fetch live projects, events, volunteers count
    const [projects, events] = await Promise.all([
      fetchProjects('all'),
      fetchEvents('all'),
    ]);

    const totalProjects = projects.length || DEMO_IMPACT_DATA.totalProjects;
    const completedProjects = projects.filter((p) => p.status === 'completed').length;
    const ongoingProjects = projects.filter((p) => p.status === 'ongoing').length;

    // Sum beneficiaries from projects
    const computedBeneficiaries = projects.reduce((acc, p) => acc + (p.beneficiariesCount || 0), 0);

    // Fetch volunteers count from Firestore
    let volunteerCount = DEMO_IMPACT_DATA.totalVolunteers;
    try {
      const volSnap = await getDocs(collection(db, 'volunteers'));
      if (!volSnap.empty) {
        volunteerCount = volSnap.size;
      }
    } catch (e) {
      console.warn('Firestore volunteers count fallback:', e.message);
    }

    // Category breakdown calculation
    const categoryBreakdown = {};
    projects.forEach((p) => {
      const catKey = p.categoryLabelHi || p.category || 'सामान्य';
      categoryBreakdown[catKey] = (categoryBreakdown[catKey] || 0) + 1;
    });

    // 2. Fetch admin-managed impact stats document if exists
    let adminCustomStats = {};
    try {
      const docRef = doc(db, 'impact_statistics', IMPACT_DOC_ID);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        adminCustomStats = snap.data();
      }
    } catch (e) {
      console.warn('Firestore impact_statistics doc read fallback:', e.message);
    }

    return {
      totalProjects,
      completedProjects,
      ongoingProjects,
      totalBeneficiaries: computedBeneficiaries || adminCustomStats.totalBeneficiaries || DEMO_IMPACT_DATA.totalBeneficiaries,
      totalVolunteers: volunteerCount,
      totalEvents: events.length || DEMO_IMPACT_DATA.totalEvents,
      villagesReached: adminCustomStats.villagesReached || DEMO_IMPACT_DATA.villagesReached,
      awarenessProgramsCount: adminCustomStats.awarenessProgramsCount || DEMO_IMPACT_DATA.awarenessProgramsCount,
      categoryBreakdown: Object.keys(categoryBreakdown).length > 0 ? categoryBreakdown : { 'शिक्षा': 1, 'स्वास्थ्य': 1, 'जल संरक्षण': 1, 'महिला': 1, 'पर्यावरण': 1 },
      geographicReach: adminCustomStats.geographicReach || DEMO_IMPACT_DATA.geographicReach,
      yearWiseActivity: adminCustomStats.yearWiseActivity || DEMO_IMPACT_DATA.yearWiseActivity,
      successStories: adminCustomStats.successStories || DEMO_IMPACT_DATA.successStories,
      isDemoData: Boolean(!adminCustomStats.villagesReached && import.meta.env.DEV),
    };
  } catch (err) {
    console.warn('fetchImpactData fallback:', err.message);
    return DEMO_IMPACT_DATA;
  }
};

/**
 * Update impact statistics in Firestore (Admin tool)
 */
export const updateImpactData = async (impactPayload, adminUid = 'admin') => {
  const payload = {
    ...impactPayload,
    updatedAt: serverTimestamp(),
    updatedBy: adminUid,
  };

  try {
    const docRef = doc(db, 'impact_statistics', IMPACT_DOC_ID);
    await setDoc(docRef, payload, { merge: true });
    return true;
  } catch (err) {
    console.warn('Firestore updateImpactData fallback:', err.message);
    return true;
  }
};
