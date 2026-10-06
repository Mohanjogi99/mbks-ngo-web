import React from 'react';
import { Section } from '../ui/Section';
import { useLanguage } from '../../context/LanguageContext';
import { NGO_DETAILS } from '../../utils/constants';
import { ShieldCheck, Award, Heart, Users, FileCheck, CheckCircle2 } from 'lucide-react';

export const WhySupportUsSection = () => {
  const { isHindi } = useLanguage();

  const reasons = [
    {
      icon: ShieldCheck,
      titleHi: 'पंजीकृत एवं वैधानिक मान्यता',
      titleEn: 'Registered & Legally Compliant',
      descHi: `छत्तीसगढ़ सोसाइटी रजिस्ट्रीकरण नियम के तहत पंजीकृत (जावक क्रमांक 347, दिनांक 26/05/2025)।`,
      descEn: 'Officially registered under CG Society Registration Rules (Dispatch No. 347, Dated 26/05/2025).',
      color: 'green',
    },
    {
      icon: FileCheck,
      titleHi: 'पारदर्शिता एवं नियमित ऑडिट',
      titleEn: '100% Transparency & Audited',
      descHi: 'प्रत्येक दान एवं वित्तीय लेनदेन का पूर्ण लेखा-जोखा तथा प्रतिवर्ष ऑडिट रिपोर्ट सार्वजनिक।',
      descEn: 'Complete financial ledger maintenance and annual audited financial statements.',
      color: 'gold',
    },
    {
      icon: Users,
      titleHi: 'जमीनी स्तर पर प्रत्यक्ष प्रभाव',
      titleEn: 'Direct Grassroots Impact',
      descHi: 'नवागढ़ एवं जांजगीर-चांपा के ग्रामीण क्षेत्रों में बिना किसी मध्यस्थ के सीधे लाभार्थियों तक सहायता।',
      descEn: 'Direct support delivered directly to beneficiaries across Nawagarh and Janjgir-Champa without intermediaries.',
      color: 'blue',
    },
    {
      icon: Award,
      titleHi: '10 प्राथमिक विधान उद्देश्य',
      titleEn: '10 Mandated Objectives',
      descHi: 'शिक्षा, स्वास्थ्य, महिला कल्याण, जल संरक्षण, पर्यावरण व कुरीति निवारण हेतु सुस्पष्ट लक्ष्य।',
      descEn: 'Structured constitutional roadmap spanning education, health, environment, and social reform.',
      color: 'gold',
    },
  ];

  return (
    <Section
      background="light"
      badge={isHindi ? 'विश्वास एवं पारदर्शिता' : 'Why Support Us'}
      badgeVariant="gold"
      title={isHindi ? 'मां-बाबूजी जनकल्याण समिति पर क्यों करें विश्वास?' : 'Why Partner With & Support MBKS Chhattisgarh?'}
      subtitle={isHindi ? 'हमारी कार्यप्रणाली पूर्णतः पारदर्शी, नियमानुकूल एवं जनसेवा के लिए समर्पित है:' : 'Built on the bedrock of legal compliance, accountability, and grassroots dedication:'}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reasons.map((r, idx) => {
          const Icon = r.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-ngo space-y-3 relative overflow-hidden group hover:border-ngo-green-500 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-ngo-green-50 text-ngo-green-700 flex items-center justify-center group-hover:bg-ngo-green-700 group-hover:text-white transition-colors duration-300">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 leading-snug">
                {isHindi ? r.titleHi : r.titleEn}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isHindi ? r.descHi : r.descEn}
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-xs text-ngo-green-800 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-ngo-gold-700 shrink-0" />
                <span>{isHindi ? 'सत्यापित विधान' : 'Verified Standard'}</span>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
};
