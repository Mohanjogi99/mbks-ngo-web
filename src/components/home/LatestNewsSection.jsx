import React from 'react';
import { NavLink } from 'react-router-dom';
import { Section } from '../ui/Section';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { LATEST_NEWS } from '../../data/mockData';
import { useLanguage } from '../../context/LanguageContext';
import { Calendar, ArrowRight } from 'lucide-react';

export const LatestNewsSection = ({ news = LATEST_NEWS }) => {
  const { isHindi } = useLanguage();

  return (
    <Section
      badge={isHindi ? 'समाचार व सूचनाएं' : 'News & Press Releases'}
      badgeVariant="green"
      title={isHindi ? 'संस्था की नवीनतम गतिविधियां एवं प्रेस विज्ञप्ति' : 'Latest NGO News & Activity Updates'}
      subtitle={isHindi ? 'मां-बाबूजी जनकल्याण समिति के हालिया कार्यक्रमों एवं अभियानों की जानकारी:' : 'Stay informed on our recent community initiatives, awareness campaigns, and media reports:'}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {news.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200/90 shadow-ngo overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300"
          >
            <div>
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={item.imageUrl}
                  alt={isHindi ? item.titleHi : item.titleEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="gold">{isHindi ? item.categoryHi : item.categoryEn}</Badge>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-3">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Calendar className="w-3.5 h-3.5 text-ngo-green-700 shrink-0" />
                  <span>{isHindi ? item.dateHi : item.dateEn}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-ngo-green-700 transition-colors line-clamp-2">
                  {isHindi ? item.titleHi : item.titleEn}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {isHindi ? item.excerptHi : item.excerptEn}
                </p>
              </div>
            </div>

            {/* Footer CTA */}
            <div className="p-5 pt-0">
              <NavLink to={`/news`}>
                <Button variant="ghost" size="sm" icon={ArrowRight} iconPosition="right" className="w-full text-xs justify-between font-semibold text-ngo-green-800 hover:text-ngo-gold-800">
                  <span>{isHindi ? 'पूरा समाचार पढ़ें' : 'Read Full Story'}</span>
                </Button>
              </NavLink>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <NavLink to="/news">
          <Button variant="outline" size="md" icon={ArrowRight} iconPosition="right">
            {isHindi ? 'सभी समाचार व ब्लॉग देखें' : 'View All News & Blog'}
          </Button>
        </NavLink>
      </div>
    </Section>
  );
};
