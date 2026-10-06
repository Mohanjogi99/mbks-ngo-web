import React from 'react';
import { Section } from '../../components/ui/Section';
import { useLanguage } from '../../context/LanguageContext';
import { Construction } from 'lucide-react';

export const PagePlaceholder = ({ titleHi, titleEn, badgeHi, badgeEn }) => {
  const { isHindi } = useLanguage();

  return (
    <div className="py-12">
      <Section
        badge={isHindi ? (badgeHi || 'मॉड्यूल') : (badgeEn || 'Module')}
        title={isHindi ? titleHi : titleEn}
        subtitle={isHindi ? 'यह पृष्ठ जल्द ही संपूर्ण सामग्री और लाइव डेटा के साथ उपलब्ध होगा।' : 'This module is under active construction and will feature live data.'}
        centered
      >
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-amber-50 text-ngo-gold-700 flex items-center justify-center mx-auto">
            <Construction className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            {isHindi ? titleHi : titleEn}
          </h3>
          <p className="text-xs text-slate-600">
            {isHindi
              ? 'मां-बाबूजी जनकल्याण समिति छत्तीसगढ़ का यह अनुभाग अगले चरण में क्रियान्वित किया जाएगा।'
              : 'This section for Maa-Babuji Jankalyan Samiti Chhattisgarh will be fully powered in subsequent implementation phases.'}
          </p>
        </div>
      </Section>
    </div>
  );
};
