/**
 * Centralized Data Dictionary for All Programs
 * Structured for easy binding to Firestore collection 'programs' in Phase 4
 */

export const PROGRAMS_DATA = {
  'education': {
    slug: 'education',
    titleHi: 'शिक्षा एवं निरक्षरता उन्मूलन कार्यक्रम',
    titleEn: 'Education & Literacy Drive Program',
    badgeHi: 'शिक्षा मिशन',
    badgeEn: 'Education Drive',
    category: 'education',
    colorCategory: 'green',
    iconName: 'GraduationCap',
    coverImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
    introHi: 'मां-बाबूजी जनकल्याण समिति द्वारा संचालित "शिक्षा मिशन" का मुख्य ध्येय जांजगीर-चांपा जिले के ग्रामीण एवं वंचित क्षेत्रों के बच्चों को गुणवत्तापूर्ण शिक्षा से जोड़ना, निरक्षरता का उन्मूलन करना तथा गरीब छात्र-छात्राओं को नि:शुल्क पाठ्य सामग्री एवं डिजिटल शिक्षा सहायता उपलब्ध कराना है।',
    introEn: 'The Education Mission by MBKS Chhattisgarh aims to connect children in rural and underprivileged areas of Janjgir-Champa with quality education, eradicate illiteracy, and provide free learning kits and digital literacy.',
    objectives: [
      { id: 1, textHi: 'ग्रामीण विद्यालयों में निर्धन बच्चों को नि:शुल्क पुस्तकें, बैग व लेखन सामग्री उपलब्ध कराना।', textEn: 'Provide free textbooks, school bags, and stationery to needy rural students.' },
      { id: 2, textHi: 'निरक्षरता उन्मूलन हेतु वयस्क साक्षरता शिविर एवं रात्रि कालीन अध्ययन केंद्र का संचालन।', textEn: 'Conduct adult literacy drives and evening learning centers to eliminate illiteracy.' },
      { id: 3, textHi: 'कंप्यूटर साक्षरता एवं डिजिटल शिक्षा का प्राथमिक स्तर पर प्रसार।', textEn: 'Promote basic computer education and digital literacy skills among youth.' },
      { id: 4, textHi: 'मेधावी एवं जरूरतमंद छात्र-छात्राओं को छात्रवृत्ति मार्गदर्शन व कोचिंग सहायता।', textEn: 'Offer scholarship guidance and free coaching to meritorious underprivileged students.' },
    ],
    activities: [
      { titleHi: 'नि:शुल्क पाठ्य सामग्री वितरण ड्राइव', titleEn: 'Free School Kit Distribution', descHi: 'नवागढ़ ब्लॉक के 15+ प्राथमिक शालाओं में प्रतिवर्ष 500 से अधिक बच्चों को स्कूल किट वितरण।' },
      { titleHi: 'डिजिटल साक्षरता व कंप्यूटर लैब', titleEn: 'Digital Literacy Workshops', descHi: 'ग्रामीण युवाओं के लिए बुनियादी कंप्यूटर शिक्षा व इंटरनेट प्रयोग हेतु विशेष प्रशिक्षण।' },
      { titleHi: 'बालिका शिक्षा प्रोत्साहन अभियान', titleEn: 'Girl Child Education Support', descHi: 'बालिकाओं की ड्रॉपआउट दर कम करने हेतु अभिभावक परामर्श व प्रोत्साहन सहायता।' },
    ],
    targetBeneficiaries: {
      hi: 'नवागढ़ व जांजगीर-चांपा के प्राथमिक एवं माध्यमिक शालाओं के 1,000+ छात्र-छात्राएं, निरक्षर प्रौढ़ एवं ग्रामीण युवा।',
      en: '1,000+ primary school students, adult learners, and rural youth across Nawagarh block.',
    },
    expectedImpact: {
      hi: 'स्कूल ड्रॉपआउट दर में 40% की कमी, बालिकाओं की साक्षरता दर में सुधार, तथा 500+ युवाओं को डिजिटल साक्षरता का लाभ।',
      en: '40% reduction in school dropout rates, enhanced female literacy, and 500+ youth digitally empowered.',
    },
    relatedProjects: [
      { id: 'proj-01', titleHi: 'मिशन ज्ञानदीप: ग्रामीण शिक्षा प्रोत्साहन', titleEn: 'Mission Gyandeep: Rural Education Drive', statusHi: 'प्रगति पर', statusEn: 'In Progress' },
    ],
    relatedEvents: [
      { id: 'evt-03', titleHi: 'महिला स्वावलंबन एवं कंप्यूटर साक्षरता कार्यशाला', dateHi: '05 नवंबर 2026', dateEn: '05 Nov 2026' },
    ],
    gallery: [
      { id: 'g1', titleHi: 'स्कूल किट वितरण', imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80' },
      { id: 'g2', titleHi: 'डिजिटल साक्षरता', imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80' },
    ],
  },

  'health': {
    slug: 'health',
    titleHi: 'स्वास्थ्य सेवा एवं परिवार कल्याण कार्यक्रम',
    titleEn: 'Healthcare & Family Care Program',
    badgeHi: 'आरोग्य मिशन',
    badgeEn: 'Health Mission',
    category: 'health',
    colorCategory: 'blue',
    iconName: 'HeartPulse',
    coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    introHi: 'हमारा "आरोग्य मिशन" ग्रामीण एवं सुदूर इलाकों में प्राथमिक स्वास्थ्य सेवाएं, निशुल्क चिकित्सा शिविर, नियमित टीकाकरण जागरूकता, मोतियाबिंद जांच, तथा आपातकालीन रक्तदान सहायता उपलब्ध कराने हेतु समर्पित है।',
    introEn: 'The Healthcare Mission focuses on delivering primary health checkup camps, eye screening, maternal care, immunization drives, and emergency blood donation in rural Chhattisgarh.',
    objectives: [
      { id: 1, textHi: 'विशेषज्ञ डॉक्टरों द्वारा ग्रामीण क्षेत्रों में निशुल्क स्वास्थ्य जांच व दवा वितरण शिविर।', textEn: 'Conduct free multi-specialty health camps with free prescription medicine distribution.' },
      { id: 2, textHi: 'शिशु एवं मातृ स्वास्थ्य हेतु नियमित टीकाकरण व पोषण जागरूकता अभियान।', textEn: 'Drive awareness on maternal healthcare, infant nutrition, and routine immunization.' },
      { id: 3, textHi: 'युवाओं को स्वेच्छा से रक्तदान हेतु प्रोत्साहित करना एवं ब्लड बैंक नेटवर्क संचालित करना।', textEn: 'Promote voluntary blood donation drives and manage emergency donor networks.' },
      { id: 4, textHi: 'वृद्धजनों हेतु नेत्र जांच (मोतियाबिंद) एवं चश्मा वितरण शिविर।', textEn: 'Organize eye screening camps and free spectacle distribution for senior citizens.' },
    ],
    activities: [
      { titleHi: 'मासिक निशुल्क स्वास्थ्य शिविर', titleEn: 'Monthly Free Medical Camps', descHi: 'प्रतिमाह नवागढ़ के दूरस्थ गांवों में एलोपैथिक व होमियोपैथिक डॉक्टरों की टीम द्वारा जांच शिविर।' },
      { titleHi: 'बृहद रक्तदान शिविर एवं आपातकालीन रक्तदान', titleEn: 'Mega Blood Donation Drives', descHi: 'वर्ष में 4 विशाल रक्तदान शिविर तथा 24x7 आपातकालीन रक्त सेवा सहायता नेटवर्क।' },
      { titleHi: 'कुपोषण निवारण व सुपोषित छत्तीसगढ़ पहल', titleEn: 'Malnutrition Eradication Drive', descHi: 'आंगनबाड़ी केंद्रों में बच्चों व गर्भवती महिलाओं को पौष्टिक आहार व स्वास्थ्य परामर्श।' },
    ],
    targetBeneficiaries: {
      hi: 'ग्रामीण क्षेत्र के 2,500+ निवासी, गर्भवती महिलाएं, नवजात शिशु, तथा आपातकालीन रक्त की आवश्यकता वाले मरीज।',
      en: '2,500+ rural residents, expectant mothers, infants, and emergency blood recipient patients.',
    },
    expectedImpact: {
      hi: 'ग्रामीण स्वास्थ्य सूचकांक में सुधार, 100% नियमित टीकाकरण कवरेज, तथा आपात स्थिति में 30 मिनट के भीतर रक्त उपलब्धता।',
      en: 'Improved rural health metrics, 100% immunization awareness, and rapid blood donor matching.',
    },
    relatedProjects: [
      { id: 'proj-03', titleHi: 'आरोग्य छत्तीसगढ़ - निशुल्क स्वास्थ्य शिविर', titleEn: 'Arogya CG - Free Medical Camps', statusHi: 'प्रगति पर', statusEn: 'In Progress' },
    ],
    relatedEvents: [
      { id: 'evt-01', titleHi: 'बृहद रक्तदान शिविर एवं जागरूकता अभियान', dateHi: '15 अक्टूबर 2026', dateEn: '15 Oct 2026' },
    ],
    gallery: [
      { id: 'g3', titleHi: 'चिकित्सा शिविर जांच', imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80' },
      { id: 'g4', titleHi: 'रक्तदान शिविर', imageUrl: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=600&q=80' },
    ],
  },

  'women-empowerment': {
    slug: 'women-empowerment',
    titleHi: 'महिला सशक्तिकरण एवं स्वावलंबन कार्यक्रम',
    titleEn: 'Women Empowerment & Self-Reliance Program',
    badgeHi: 'महिला शक्ति',
    badgeEn: 'Women Empowerment',
    category: 'women-empowerment',
    colorCategory: 'pink',
    iconName: 'UserCheck',
    coverImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80',
    introHi: 'महिला सशक्तिकरण कार्यक्रम ग्रामीण महिलाओं को सिलाई-कढ़ाई, हस्तशिल्प, कंप्यूटर शिक्षा, स्वसहायता समूह (SHG) गठन एवं विधिक अधिकारों की जानकारी प्रदान कर उन्हें आर्थिक व सामाजिक रूप से आत्मनिर्भर बनाने हेतु समर्पित है।',
    introEn: 'Empowering rural women through vocational tailoring skills, self-help group formation, digital training, and legal awareness to achieve financial and social independence.',
    objectives: [
      { id: 1, textHi: 'महिलाओं के लिए सिलाई, बुनाई व हस्तशिल्प का नि:शुल्क व्यावसायिक प्रशिक्षण।', textEn: 'Free vocational training in tailoring, embroidery, and handicrafts.' },
      { id: 2, textHi: 'महिला स्वसहायता समूहों (SHG) का गठन एवं वित्तीय साक्षरता मार्गदर्शन।', textEn: 'Self-help group (SHG) formation and micro-finance literacy workshops.' },
      { id: 3, textHi: 'महिला असमानता, घरेलू हिंसा व दहेज प्रथा के खिलाफ विधिक जागरूकता अभियान।', textEn: 'Legal awareness camps against gender discrimination and domestic violence.' },
      { id: 4, textHi: 'मातृ स्वास्थ्य, स्वच्छता (Menstrual Hygiene) एवं सेनेटरी पैड वितरण जागरूकता।', textEn: 'Maternal health, menstrual hygiene education, and sanitary pad distribution.' },
    ],
    activities: [
      { titleHi: '3 महीने का निशुल्क सिलाई-कढ़ाई कोर्स', titleEn: '3-Month Tailoring Skill Course', descHi: 'नवागढ़ कौशल केंद्र में ग्रामीण महिलाओं हेतु नियमित सिलाई प्रशिक्षण एवं सिलाई मशीन सहायता परामर्श।' },
      { titleHi: 'महिला स्वसहायता समूह बैंक लिंकेज', titleEn: 'SHG Bank Linkage Drives', descHi: '20+ स्वसहायता समूहों का गठन कर छोटे कुटीर उद्योगों हेतु बैंक सहायता मार्गदर्शन।' },
      { titleHi: 'मासिक धर्म स्वच्छता जागरूकता शिविर', titleEn: 'Menstrual Hygiene Awareness', descHi: 'किशोरी बालिकाओं व महिलाओं हेतु स्वच्छता उत्पाद वितरण व स्वास्थ्य परिचर्चा।' },
    ],
    targetBeneficiaries: {
      hi: 'नवागढ़ व जांजगीर-चांपा की 500+ ग्रामीण महिलाएं, गृहिणी, तथा स्वसहायता समूहों की सदस्य।',
      en: '500+ rural women, homemakers, and self-help group members across Janjgir-Champa.',
    },
    expectedImpact: {
      hi: 'महिलाओं की औसत मासिक आय में ₹6,000-₹10,000 की वृद्धि, स्वावलंबन, तथा सामाजिक स्थिति में सुधार।',
      en: 'Average monthly income boost of ₹6,000-₹10,000 per trained woman, driving social empowerment.',
    },
    relatedProjects: [
      { id: 'proj-01', titleHi: 'स्वावलंबन: महिला सिलाई प्रशिक्षण', titleEn: 'Swavalamban: Women Tailoring Drive', statusHi: 'प्रगति पर', statusEn: 'In Progress' },
    ],
    relatedEvents: [
      { id: 'evt-03', titleHi: 'महिला स्वावलंबन एवं सिलाई कौशल कार्यशाला', dateHi: '05 नवंबर 2026', dateEn: '05 Nov 2026' },
    ],
    gallery: [
      { id: 'g5', titleHi: 'सिलाई प्रशिक्षण', imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80' },
      { id: 'g6', titleHi: 'स्वसहायता समूह बैठक', imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80' },
    ],
  },

  'child-welfare': {
    slug: 'child-welfare',
    titleHi: 'बाल अधिकार व बाल श्रम उन्मूलन कार्यक्रम',
    titleEn: 'Child Welfare & Protection Program',
    badgeHi: 'बाल सुरक्षा',
    badgeEn: 'Child Protection',
    category: 'child-welfare',
    colorCategory: 'gold',
    iconName: 'Smile',
    coverImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80',
    introHi: 'बाल कल्याण कार्यक्रम का उद्देश्य प्रत्येक बच्चे के बुनियादी अधिकारों, सुरक्षा, पोषण एवं शिक्षा को सुनिश्चित करना है। हम बाल श्रम उन्मूलन, बाल विवाह रोकथाम एवं कुपोषण मुक्ति हेतु संकल्पित हैं।',
    introEn: 'Ensuring fundamental rights, child protection, proper nutrition, and education for every child while actively working against child labor and child marriage.',
    objectives: [
      { id: 1, textHi: 'बाल श्रम, बाल विवाह एवं बाल तस्करी के खिलाफ कठोर जनजागरूकता अभियान।', textEn: 'Rigorous awareness drives against child labor, child marriage, and child exploitation.' },
      { id: 2, textHi: 'कुपोषित बच्चों की पहचान कर आंगनबाड़ी केंद्रों के माध्यम से पौष्टिक आहार वितरण।', textEn: 'Identifying malnourished infants and providing nutrition support via Anganwadi centers.' },
      { id: 3, textHi: 'अनाथ, बेसहारा व निर्धन बच्चों की पढ़ाई-लिखाई एवं देखभाल की व्यवस्था।', textEn: 'Educational and welfare support for orphaned, destitute, and vulnerable children.' },
    ],
    activities: [
      { titleHi: 'बाल श्रम मुक्ति एवं पुनर्वास अभियान', titleEn: 'Child Labor Rescue & Rehabilitation', descHi: 'ईंट भट्ठों व ढाबों पर बाल श्रम रोकने हेतु प्रशासनिक समन्वय व बच्चों को स्कूल में दाखिला।' },
      { titleHi: 'कुपोषण मुक्त नवागढ़ पहल', titleEn: 'Malnutrition-Free Nawagarh Initiative', descHi: 'विशेष पोषण किट वितरण व माताओं के लिए शिशु पोषण परामर्श कार्यशाला।' },
    ],
    targetBeneficiaries: {
      hi: '6 से 14 वर्ष की आयु के 600+ संकटग्रस्त व जरूरतमंद बच्चे, अनाथ शिशु एवं कुपोषित बालक।',
      en: '600+ vulnerable children aged 6-14, orphans, and malnourished infants.',
    },
    expectedImpact: {
      hi: 'क्षेत्र में शून्य बाल श्रम का लक्ष्य, बाल विवाह की घटनाओं पर विराम, तथा 100% बच्चों का स्कूल प्रवेश।',
      en: 'Targeting zero child labor, prevention of child marriages, and 100% school enrollment.',
    },
    relatedProjects: [],
    relatedEvents: [],
    gallery: [
      { id: 'g7', titleHi: 'बाल शिक्षा सुरक्षा', imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80' },
    ],
  },

  'environment': {
    slug: 'environment',
    titleHi: 'पर्यावरण संरक्षण एवं स्वच्छता अभियान',
    titleEn: 'Environmental Protection & Eco Drive',
    badgeHi: 'हरित छत्तीसगढ़',
    badgeEn: 'Green Environment',
    category: 'environment',
    colorCategory: 'green',
    iconName: 'Leaf',
    coverImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80',
    introHi: 'पर्यावरण संरक्षण एवं संवर्धन कार्यक्रम के तहत "हरित छत्तीसगढ़" अभियान का संचालन किया जाता है। इसके अंतर्गत बड़े पैमाने पर वृक्षारोपण, प्लास्टिक-मुक्त समाज, स्वच्छता अभियान एवं जल स्रोतों की सुरक्षा की जाती है।',
    introEn: 'The "Green Chhattisgarh" initiative promotes mass tree plantation drives, Swachhata Abhiyan cleanliness campaigns, anti-plastic awareness, and eco-conservation.',
    objectives: [
      { id: 1, textHi: 'प्रतिवर्ष वर्षा ऋतु में 1,000+ छायादार व फलदार पौधों का रोपण व सुरक्षा।', textEn: 'Planting and nurturing 1,000+ shade and fruit-bearing trees annually.' },
      { id: 2, textHi: 'ग्रामीण व शहरी सार्वजनिक स्थलों पर स्वच्छता अभियान (Swachhata Abhiyan)।', textEn: 'Organizing Swachhata Abhiyan cleanliness drives in public spaces and schools.' },
      { id: 3, textHi: 'एकल-उपयोग प्लास्टिक के उपयोग को रोकने हेतु कपड़े के थैलों का वितरण।', textEn: 'Distributing eco-friendly cloth bags to eliminate single-use plastic.' },
    ],
    activities: [
      { titleHi: 'वृक्षारोपण एवं ट्री-गार्ड वितरण', titleEn: 'Plantation & Tree-Guard Drive', descHi: 'स्कूलों, सड़कों के किनारे व सार्वजनिक परिसरों में नीम, बरगद व आम के पौधों का रोपण।' },
      { titleHi: 'स्वच्छ भारत ग्रामीण जागरूकता', titleEn: 'Swachh Bharat Village Cleanliness', descHi: 'कचरा प्रबंधन व तरल अपशिष्ट निपटान हेतु ग्राम पंचायतों में जन-जागृति रैलियां।' },
    ],
    targetBeneficiaries: {
      hi: 'नवागढ़ एवं आसपास की 10+ ग्राम पंचायतें, 5,000+ ग्रामीण नागरिक एवं भावी पीढ़ियां।',
      en: '10+ Village Panchayats across Nawagarh block and 5,000+ rural citizens.',
    },
    expectedImpact: {
      hi: 'हरित आवरण में वृद्धि, सार्वजनिक स्थानों पर स्वच्छता, तथा पर्यावरण सुरक्षा के प्रति जन-चेतना।',
      en: 'Increased green canopy, cleaner public surroundings, and heightened eco-awareness.',
    },
    relatedProjects: [
      { id: 'proj-02', titleHi: 'जल संचय - अमृत सरोवर जीर्णोद्धार', titleEn: 'Jal Sanchay - Pond Rejuvenation Drive', statusHi: 'प्रगति पर', statusEn: 'In Progress' },
    ],
    relatedEvents: [
      { id: 'evt-02', titleHi: 'पर्यावरण सुरक्षा - 1000 पौधे रोपण अभियान', dateHi: '28 अक्टूबर 2026', dateEn: '28 Oct 2026' },
    ],
    gallery: [
      { id: 'g8', titleHi: 'पौधारोपण अभियान', imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80' },
    ],
  },

  'youth-development': {
    slug: 'youth-development',
    titleHi: 'युवा व्यक्तित्व विकास व कौशल प्रशिक्षण',
    titleEn: 'Youth Skill & Leadership Program',
    badgeHi: 'युवा शक्ति',
    badgeEn: 'Youth Skills',
    category: 'youth-development',
    colorCategory: 'gold',
    iconName: 'Trophy',
    coverImage: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
    introHi: 'युवाओं के सर्वांगीण विकास हेतु खेलकूद प्रतियोगिताएं, सांस्कृतिक कार्यक्रम, कंप्यूटर शिक्षा, प्रतियोगी परीक्षा मार्गदर्शन एवं स्वरोजगार हेतु व्यावसायिक प्रशिक्षण प्रदान किया जाता है।',
    introEn: 'Empowering youth through sports tournaments, cultural festivals, competitive exam guidance, digital literacy, and self-employment skill workshops.',
    objectives: [
      { id: 1, textHi: 'युवाओं के व्यक्तित्व विकास हेतु खेलकूद (कबड्डी, क्रिकेट, फुटबॉल) व सांस्कृतिक आयोजन।', textEn: 'Organizing sports tournaments (Kabaddi, Cricket, Football) and cultural heritage events.' },
      { id: 2, textHi: 'स्वरोजगार एवं रोजगार हेतु कंप्यूटर, मोबाइल रिपेयरिंग व तकनीकी कौशल प्रशिक्षण।', textEn: 'Technical skill training in computers, mobile repair, and vocational trades.' },
      { id: 3, textHi: 'युवाओं में राष्ट्रभक्ति, अनुशासन व समाज सेवा के संस्कारों का बीजारोपण।', textEn: 'Instilling patriotism, discipline, and community service values in youth.' },
    ],
    activities: [
      { titleHi: 'वार्षिक ग्रामीण खेलकूद प्रतियोगिता', titleEn: 'Annual Rural Sports Tournament', descHi: 'प्रतिवर्ष जांजगीर-चांपा के युवाओं हेतु ग्रामीण खेल उत्सव का आयोजन।' },
      { titleHi: 'युवा स्वरोजगार व करियर मार्गदर्शन शिविर', titleEn: 'Career Guidance & Skill Camp', descHi: 'विशेषज्ञों द्वारा सरकारी नौकरी व स्वरोजगार योजनाओं की जानकारी।' },
    ],
    targetBeneficiaries: {
      hi: '15 से 35 वर्ष आयु के 1,500+ ग्रामीण युवा, छात्र-छात्राएं एवं बेरोजगार नवयुवक।',
      en: '1,500+ rural youth aged 15-35, college students, and aspiring entrepreneurs.',
    },
    expectedImpact: {
      hi: 'युवाओं में शारीरिक व मानसिक विकास, नशे की लत से मुक्ति, तथा 300+ युवाओं को रोजगार सहायता।',
      en: 'Physical/mental health enhancement, substance addiction prevention, and job placements.',
    },
    relatedProjects: [],
    relatedEvents: [],
    gallery: [
      { id: 'g9', titleHi: 'युवा खेलकूद', imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80' },
    ],
  },

  'elderly-divyang': {
    slug: 'elderly-divyang',
    titleHi: 'वृद्धजन सेवा व दिव्यांग पुनर्वास कार्यक्रम',
    titleEn: 'Elderly & Divyangjan Care Program',
    badgeHi: 'दिव्यांग व वृद्ध सेवा',
    badgeEn: 'Special Care',
    category: 'elderly-divyang',
    colorCategory: 'pink',
    iconName: 'Accessibility',
    coverImage: 'https://images.unsplash.com/photo-1581579438747-104c53d7fbc4?auto=format&fit=crop&w=1200&q=80',
    introHi: 'वरिष्ठ नागरिकों (वृद्धजनों) को सम्मानजनक जीवन प्रदान करने तथा दिव्यांग व्यक्तियों के पुनर्वास, सहायक उपकरण (व्हीलचेयर, बैसाखी, श्रवण यंत्र) एवं शासकीय पेंशन सहायता हेतु यह कार्यक्रम संचालित है।',
    introEn: 'Dedicated to providing dignity care for senior citizens, rehabilitation services, and assistive device distribution (wheelchairs, crutches, hearing aids) for Divyangjan.',
    objectives: [
      { id: 1, textHi: 'दिव्यांग जनों हेतु व्हीलचेयर, बैसाखी, कान की मशीन व ट्राई-साइकिल वितरण।', textEn: 'Distributing wheelchairs, crutches, hearing aids, and tricycles for Divyangjan.' },
      { id: 2, textHi: 'निराश्रित वृद्धजनों हेतु भोजन, वस्त्र, नि:शुल्क दवाइयां व चिकित्सा परामर्श।', textEn: 'Providing food, clothing, free healthcare, and medicines to destitute senior citizens.' },
      { id: 3, textHi: 'दिव्यांग व वृद्धावस्था पेंशन योजनाओं के आवेदन में सहायता।', textEn: 'Assisting eligible seniors and Divyangjan in accessing government pension schemes.' },
    ],
    activities: [
      { titleHi: 'सहायक उपकरण वितरण शिविर', titleEn: 'Assistive Device Distribution Camp', descHi: 'विशेषज्ञों द्वारा दिव्यांगता प्रमाणीकरण शिविर व नि:शुल्क सहायक उपकरण वितरण।' },
      { titleHi: 'वरिष्ठ नागरिक सम्मान व स्वास्थ्य सेवा', titleEn: 'Senior Citizen Health & Care Drive', descHi: 'वृद्धजनों के घरों पर नि:शुल्क दवाएं पहुंचाना व भावनात्मक संबल प्रदान करना।' },
    ],
    targetBeneficiaries: {
      hi: 'नवागढ़ ब्लॉक के 400+ वरिष्ठ नागरिक, अनाथ वृद्ध तथा शारीरिक रूप से दिव्यांग व्यक्ति।',
      en: '400+ senior citizens, destitute elderly, and persons with disabilities.',
    },
    expectedImpact: {
      hi: 'दिव्यांग जनों की सुगम आवाजाही व आत्मनिर्भरता, तथा वृद्धजनों के जीवन में गरिमा व सुरक्षा।',
      en: 'Enhanced mobility and independence for Divyangjan, ensuring dignified care for seniors.',
    },
    relatedProjects: [],
    relatedEvents: [],
    gallery: [
      { id: 'g10', titleHi: 'दिव्यांग सहायक उपकरण', imageUrl: 'https://images.unsplash.com/photo-1581579438747-104c53d7fbc4?auto=format&fit=crop&w=600&q=80' },
    ],
  },

  'social-awareness': {
    slug: 'social-awareness',
    titleHi: 'सामाजिक कुरीति उन्मूलन व जनजागरूकता कार्यक्रम',
    titleEn: 'Social Reform & Anti-Evil Drive Program',
    badgeHi: 'जनजागरूकता',
    badgeEn: 'Social Reform',
    category: 'social-awareness',
    colorCategory: 'red',
    iconName: 'ShieldAlert',
    coverImage: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=1200&q=80',
    introHi: 'सामाजिक कुरीतियों जैसे दहेज प्रथा, लिंग असमानता, नशा मुक्ति, बाल विवाह, बालश्रम एवं जातिगत भेदभाव के उन्मूलन हेतु निरंतर नुक्कड़ नाटक, पदयात्राएं व जनजागरण अभियानों का आयोजन किया जाता है।',
    introEn: 'Active campaign to eradicate social evils including dowry practices, gender inequality, substance addiction, child marriage, and caste discrimination through street plays and rallies.',
    objectives: [
      { id: 1, textHi: 'दहेज प्रथा, लिंग भेद एवं बाल विवाह जैसी सामाजिक बुराइयों के खिलाफ जन-आंदोलन।', textEn: 'Mass awareness against dowry, gender discrimination, and child marriage.' },
      { id: 2, textHi: 'युवाओं व ग्रामीणों को शराब व नशीले पदार्थों की लत से मुक्त कराने हेतु नशा मुक्ति अभियान।', textEn: 'Substance de-addiction campaigns encouraging healthy addiction-free living.' },
      { id: 3, textHi: 'सामाजिक समरसता, जातिगत भेदभाव अंत व बंधुत्व भावना का संवर्धन।', textEn: 'Fostering communal harmony, ending caste bias, and promoting universal brotherhood.' },
    ],
    activities: [
      { titleHi: 'नशा मुक्ति संकल्प पदयात्रा व परामर्श', titleEn: 'De-Addiction Rally & Counseling', descHi: 'गांवों में युवाओं हेतु नशा मुक्ति प्रतिज्ञा एवं परामर्श केंद्र का संचालन।' },
      { titleHi: 'दहेज विरोधी व बेटी बचाओ नुक्कड़ नाटक', titleEn: 'Anti-Dowry & Save Girl Child Street Plays', descHi: 'स्थानीय कलाकारों द्वारा सामाजिक चेतना जगाने हेतु सांस्कृतिक प्रस्तुतियां।' },
    ],
    targetBeneficiaries: {
      hi: 'जांजगीर-चांपा जिले के समस्त ग्रामीण नागरिक, युवा वर्ग एवं समस्त समाज।',
      en: 'Rural citizens, youth, and communities across Janjgir-Champa district.',
    },
    expectedImpact: {
      hi: 'नशा मुक्त गांव का निर्माण, दहेज रहित विवाहों का प्रोत्साहन, तथा सामाजिक सद्भावना में वृद्धि।',
      en: 'Creation of addiction-free villages, promotion of dowry-free marriages, and social unity.',
    },
    relatedProjects: [],
    relatedEvents: [],
    gallery: [
      { id: 'g11', titleHi: 'सामाजिक जागरूकता रैली', imageUrl: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=600&q=80' },
    ],
  },
};
