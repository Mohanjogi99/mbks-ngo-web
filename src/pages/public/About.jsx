import React from 'react';
import { Section } from '../../components/ui/Section';
import { NGO_DETAILS } from '../../utils/constants';
import { useLanguage } from '../../context/LanguageContext';
import { FileCheck, MapPin, Building, ShieldCheck } from 'lucide-react';

export const About = () => {
  const { isHindi } = useLanguage();

  return (
    <div className="py-8">
      <Section
        badge={isHindi ? 'परिचय एवं कानूनी विवरण' : 'About & Registration'}
        title={NGO_DETAILS.nameHi}
        subtitle={NGO_DETAILS.nameEn}
      >
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
              <img
                src="/logo.jpeg"
                alt="Logo"
                className="w-16 h-16 rounded-full border-2 border-ngo-gold-700 object-contain p-1"
              />
              <div>
                <h3 className="text-xl font-bold text-slate-900">{NGO_DETAILS.nameHi}</h3>
                <p className="text-sm text-ngo-gold-700 font-semibold">{NGO_DETAILS.nameEn}</p>
                <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                  <FileCheck className="w-3.5 h-3.5 text-ngo-gold-700" />
                  <span>{NGO_DETAILS.regNo}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 text-slate-700 leading-relaxed">
              <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Building className="w-5 h-5 text-ngo-green-700" />
                {isHindi ? 'संस्था का प्रधान कार्यालय (Headquarters Address)' : 'Official Registered Address'}
              </h4>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm space-y-1">
                <p><strong>ग्राम:</strong> भैसमुड़ी (Bhaisamudi), पो. सिउंड (Siund)</p>
                <p><strong>पता:</strong> भाठा पारा, वार्ड नंबर 22, मकान नंबर 651</p>
                <p><strong>तहसील / विकासखण्ड:</strong> नवागढ़ (Nawagarh)</p>
                <p><strong>जिला:</strong> जांजगीर-चांपा (Janjgir-Champa), छत्तीसगढ़ (PIN: 495668)</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center gap-3 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-ngo-green-700" />
              <span>पंजीकृत सोसाइटी विधान के नियम 3 के तहत आधिकारिक ज्ञापन।</span>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};
