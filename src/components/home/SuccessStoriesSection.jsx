import React from 'react';
import { Section } from '../ui/Section';
import { Badge } from '../ui/Badge';
import { SUCCESS_STORIES } from '../../data/mockData';
import { useLanguage } from '../../context/LanguageContext';
import { Quote } from 'lucide-react';

export const SuccessStoriesSection = ({ stories = SUCCESS_STORIES }) => {
  const { isHindi } = useLanguage();

  return (
    <Section
      badge={isHindi ? 'प्रभाव गाथा' : 'Impact Stories'}
      badgeVariant="green"
      title={isHindi ? 'परिवर्तन की जमीनी कहानियां' : 'Real Stories of Transformation'}
      subtitle={isHindi ? 'हमारे अभियानों से बदलाव महसूस करने वाले ग्रामीणों के अनुभव:' : 'Hear directly from the individuals whose lives have been transformed through our initiatives:'}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {stories.map((story) => (
          <div
            key={story.id}
            className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-ngo flex flex-col justify-between relative overflow-hidden group hover:border-ngo-green-500 transition-all duration-300"
          >
            {/* Quote watermark icon */}
            <Quote className="w-24 h-24 text-ngo-green-50 absolute -top-4 -right-4 pointer-events-none group-hover:scale-110 transition-transform duration-300" />

            <div className="relative z-10 space-y-4">
              <Badge variant="gold">{isHindi ? story.categoryHi : story.categoryEn}</Badge>

              <h3 className="text-lg font-bold text-slate-900 leading-snug">
                "{isHindi ? story.titleHi : story.titleEn}"
              </h3>

              <p className="text-sm text-slate-600 italic leading-relaxed">
                "{isHindi ? story.quoteHi : story.quoteEn}"
              </p>
            </div>

            {/* Author profile */}
            <div className="relative z-10 mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
              <img
                src={story.imageUrl}
                alt={isHindi ? story.nameHi : story.nameEn}
                className="w-12 h-12 rounded-full object-cover border-2 border-ngo-gold-500 shadow-sm"
              />
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  {isHindi ? story.nameHi : story.nameEn}
                </h4>
                <p className="text-xs text-ngo-green-800 font-medium">
                  {isHindi ? 'लाभार्थी, नवागढ़ क्षेत्र' : 'Beneficiary, Nawagarh Block'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};
