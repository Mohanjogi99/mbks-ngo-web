import React from 'react';
import { Section } from '../ui/Section';
import { useLanguage } from '../../context/LanguageContext';
import { Users, TrendingUp, Award } from 'lucide-react';

export const ProgramBeneficiariesImpact = ({ targetBeneficiaries, expectedImpact }) => {
  const { isHindi } = useLanguage();

  return (
    <Section className="bg-white py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Target Beneficiaries */}
        <div className="bg-gradient-to-br from-emerald-50 to-ngo-green-50 p-6 sm:p-8 rounded-2xl border border-ngo-green-200 space-y-4 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-ngo-green-700 text-white flex items-center justify-center font-bold">
            <Users className="w-6 h-6" />
          </div>

          <h3 className="text-lg font-bold text-slate-900">
            {isHindi ? 'लक्षित लाभार्थी (Target Beneficiaries)' : 'Target Beneficiaries'}
          </h3>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            {isHindi ? targetBeneficiaries.hi : targetBeneficiaries.en}
          </p>

          <div className="pt-2 text-xs font-semibold text-ngo-green-800 flex items-center gap-1.5 border-t border-ngo-green-200">
            <Award className="w-4 h-4 text-ngo-gold-700" />
            <span>{isHindi ? 'नवागढ़ एवं जांजगीर-चांपा क्षेत्र' : 'Janjgir-Champa District Focus'}</span>
          </div>
        </div>

        {/* Expected Impact */}
        <div className="bg-gradient-to-br from-amber-50 to-ngo-gold-50 p-6 sm:p-8 rounded-2xl border border-ngo-gold-200 space-y-4 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-ngo-gold-700 text-white flex items-center justify-center font-bold">
            <TrendingUp className="w-6 h-6" />
          </div>

          <h3 className="text-lg font-bold text-slate-900">
            {isHindi ? 'अपेक्षित दीर्घकालिक प्रभाव (Expected Impact)' : 'Expected Long-Term Impact'}
          </h3>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            {isHindi ? expectedImpact.hi : expectedImpact.en}
          </p>

          <div className="pt-2 text-xs font-semibold text-ngo-gold-800 flex items-center gap-1.5 border-t border-ngo-gold-200">
            <Award className="w-4 h-4 text-ngo-green-700" />
            <span>{isHindi ? 'सतत सामाजिक विकास लक्ष्य' : 'Sustainable Social Development'}</span>
          </div>
        </div>
      </div>
    </Section>
  );
};
