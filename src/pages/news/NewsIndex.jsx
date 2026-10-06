import React, { useState } from 'react';
import { SEOHead } from '../../components/common/SEOHead';
import { NavLink } from 'react-router-dom';
import { Container } from '../../components/ui/Container';
import { Section } from '../../components/ui/Section';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { NEWS_DATA } from '../../data/newsData';
import { NGO_DETAILS } from '../../utils/constants';
import { useLanguage } from '../../context/LanguageContext';
import { Calendar, User, FileCheck, ArrowRight, Search } from 'lucide-react';

export const NewsIndex = () => {
  const { isHindi } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNews = NEWS_DATA.filter((n) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (n.titleHi + ' ' + n.titleEn + ' ' + n.summaryHi).toLowerCase().includes(query);
  });

  const breadcrumbItems = [
    { labelHi: 'समाचार एवं ब्लॉग', labelEn: 'News & Articles', path: '/news' },
  ];

  return (
    <div className="py-6 sm:py-8 bg-slate-50 min-h-screen">
      <SEOHead
        title="समाचार एवं सामाजिक लेख - जांजगीर-चांपा"
        description="मां-बाबूजी जनकल्याण समिति के नवीनतम समाचार, प्रेस विज्ञप्तियां, सामाजिक लेख एवं क्षेत्र स्तरीय विकास की खबरें।"
        canonicalUrl="https://mbks-cg.org/news"
      />
      <Container>
        <Breadcrumbs items={breadcrumbItems} />

        {/* Hero Header */}
        <div className="bg-gradient-to-br from-ngo-green-950 via-ngo-green-900 to-slate-900 text-white rounded-2xl p-6 sm:p-10 shadow-xl border border-emerald-800 mb-8 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-ngo-gold-500 border border-white/20 text-xs font-semibold">
              <FileCheck className="w-4 h-4 text-ngo-gold-500" />
              <span>{NGO_DETAILS.regNo}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              {isHindi ? 'समाचार, प्रेस विज्ञप्ति एवं ब्लॉग' : 'News, Press Releases & Field Blogs'}
            </h1>

            <p className="text-xs sm:text-base text-emerald-100/90 leading-relaxed font-normal">
              {isHindi
                ? 'मां-बाबूजी जनकल्याण समिति की नवीनतम उपलब्धियां, मीडिया रिपोर्ट एवं सामाजिक गतिविधियों का संग्रह:'
                : 'Latest announcements, activity highlights, and official press releases from MBKS Chhattisgarh:'}
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-8">
          <div className="relative max-w-lg">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isHindi ? 'समाचार या प्रेस विज्ञप्ति खोजें...' : 'Search articles by title or keyword...'}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ngo-green-700 text-xs sm:text-sm"
            />
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredNews.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-ngo overflow-hidden flex flex-col justify-between group hover:shadow-xl hover:border-ngo-green-500 transition-all duration-300"
            >
              <div>
                <div className="relative h-52 overflow-hidden bg-slate-100">
                  <img
                    src={article.coverImage}
                    alt={isHindi ? article.titleHi : article.titleEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="gold">{isHindi ? article.categoryHi : article.categoryEn}</Badge>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-ngo-green-700" />
                      <span>{isHindi ? article.dateHi : article.dateEn}</span>
                    </span>
                    <span className="flex items-center gap-1 font-medium">
                      <User className="w-3.5 h-3.5 text-ngo-gold-700" />
                      <span>{isHindi ? article.authorNameHi : article.authorNameEn}</span>
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-ngo-green-700 transition-colors line-clamp-2 leading-snug">
                    {isHindi ? article.titleHi : article.titleEn}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {isHindi ? article.summaryHi : article.summaryEn}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <NavLink to={`/news/${article.slug}`}>
                  <Button variant="secondary" size="sm" icon={ArrowRight} iconPosition="right" className="w-full text-xs">
                    {isHindi ? 'पूरा लेख पढ़ें' : 'Read Full Article'}
                  </Button>
                </NavLink>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};
