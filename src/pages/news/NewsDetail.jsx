import React from 'react';
import { SEOHead } from '../../components/common/SEOHead';
import { useParams, Navigate, NavLink } from 'react-router-dom';
import { Container } from '../../components/ui/Container';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { Badge } from '../../components/ui/Badge';
import { SocialShareButtons } from '../../components/news/SocialShareButtons';
import { NEWS_DATA } from '../../data/newsData';
import { useLanguage } from '../../context/LanguageContext';
import { Calendar, User, ArrowLeft, ArrowRight } from 'lucide-react';

export const NewsDetail = () => {
  const { slug } = useParams();
  const { isHindi } = useLanguage();

  const article = NEWS_DATA.find((n) => n.slug === slug);

  if (!article) {
    return <Navigate to="/news" replace />;
  }

  const breadcrumbItems = [
    { labelHi: 'समाचार एवं ब्लॉग', labelEn: 'News', path: '/news' },
    { labelHi: article.titleHi, labelEn: article.titleEn, path: `/news/${article.slug}` },
  ];

  const relatedArticles = NEWS_DATA.filter((n) => n.slug !== slug).slice(0, 2);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': article.titleHi,
    'description': article.summaryHi,
    'image': article.image,
    'datePublished': article.publishedDate,
    'author': {
      '@type': 'Person',
      'name': article.author || 'MBKS Media Team',
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Maa-Babuji Jankalyan Samiti Chhattisgarh',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://mbks-cg.org/logo.jpeg',
      },
    },
  };

  return (
    <div className="py-6 sm:py-8 bg-slate-50 min-h-screen">
      <SEOHead
        title={`${article.titleHi}`}
        description={`${article.summaryHi} मां-बाबूजी जनकल्याण समिति, जांजगीर-चांपा।`}
        canonicalUrl={`https://mbks-cg.org/news/${article.slug}`}
        ogImage={article.image}
        ogType="article"
        schemaData={articleSchema}
      />
      <Container>
        <Breadcrumbs items={breadcrumbItems} />

        <div className="mb-4">
          <NavLink
            to="/news"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-ngo-green-700 hover:text-ngo-green-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{isHindi ? 'सभी समाचार पर वापस जाएं' : 'Back to All News'}</span>
          </NavLink>
        </div>

        {/* Article Header Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/90 shadow-sm mb-8 space-y-6 max-w-4xl mx-auto">
          <div className="space-y-4">
            <Badge variant="gold">{isHindi ? article.categoryHi : article.categoryEn}</Badge>

            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-snug">
              {isHindi ? article.titleHi : article.titleEn}
            </h1>

            {/* Author & Social Share Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-3 border-y border-slate-100 py-3">
              <div className="flex items-center gap-4 text-xs text-slate-600">
                <span className="flex items-center gap-1.5 font-medium">
                  <User className="w-4 h-4 text-ngo-gold-700" />
                  <span>
                    <strong>{isHindi ? article.authorNameHi : article.authorNameEn}</strong> ({isHindi ? article.authorRoleHi : article.authorRoleEn})
                  </span>
                </span>
                <span className="flex items-center gap-1 font-semibold text-ngo-green-800">
                  <Calendar className="w-4 h-4" />
                  <span>{isHindi ? article.dateHi : article.dateEn}</span>
                </span>
              </div>

              {/* Social Share Buttons */}
              <SocialShareButtons title={isHindi ? article.titleHi : article.titleEn} />
            </div>
          </div>

          {/* Cover Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-md aspect-video max-h-[450px] w-full bg-slate-100">
            <img src={article.coverImage} alt={isHindi ? article.titleHi : article.titleEn} className="w-full h-full object-cover" />
          </div>

          {/* Article Summary Lead */}
          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-100 text-sm font-semibold text-slate-800 leading-relaxed italic">
            "{isHindi ? article.summaryHi : article.summaryEn}"
          </div>

          {/* Article Content Sections */}
          <div className="space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed pt-2">
            {article.contentSections?.map((section, idx) => (
              <div key={idx} className="space-y-2">
                {section.headingHi && (
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 pt-2">
                    {isHindi ? section.headingHi : section.headingEn}
                  </h2>
                )}
                <p>{isHindi ? section.paragraphHi : section.paragraphEn}</p>
              </div>
            ))}
          </div>

          {/* Bottom Share Bar */}
          <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
            <SocialShareButtons title={isHindi ? article.titleHi : article.titleEn} />
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="max-w-4xl mx-auto space-y-4">
            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-2">
              {isHindi ? 'अन्य संबंधित समाचार (Related News)' : 'Related Articles'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedArticles.map((rel) => (
                <NavLink
                  key={rel.id}
                  to={`/news/${rel.slug}`}
                  className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-ngo-green-500 transition-all flex gap-4 group"
                >
                  <img src={rel.coverImage} alt="Rel" className="w-24 h-24 rounded-lg object-cover shrink-0" />
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-ngo-gold-700">{isHindi ? rel.dateHi : rel.dateEn}</span>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-ngo-green-700 line-clamp-2">
                      {isHindi ? rel.titleHi : rel.titleEn}
                    </h4>
                  </div>
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};
