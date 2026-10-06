import React from 'react';
import { Section } from '../../components/ui/Section';
import { NGO_OBJECTIVES } from '../../utils/constants';
import { ObjectiveCard } from '../../components/ui/Card';
import { useLanguage } from '../../context/LanguageContext';

export const Objectives = () => {
  const { isHindi } = useLanguage();

  return (
    <div className="py-8">
      <Section
        badge={isHindi ? '10 मुख्य उद्देश्य' : 'Mandated Objectives'}
        badgeVariant="gold"
        title={isHindi ? 'संस्था के 10 मुख्य विधान उद्देश्य' : '10 Mandated Constitutional Objectives'}
        subtitle={isHindi ? 'सोसाइटी रजिस्ट्रीकरण के अंतर्गत पंजीकृत समस्त 10 कार्य क्षेत्र:' : 'All 10 constitutional objectives registered under the Chhattisgarh Societies Act:'}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {NGO_OBJECTIVES.map((obj) => (
            <ObjectiveCard key={obj.id} objective={obj} isHindi={isHindi} />
          ))}
        </div>
      </Section>
    </div>
  );
};
