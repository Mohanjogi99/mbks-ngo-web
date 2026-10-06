import React from 'react';
import { SEOHead } from '../../components/common/SEOHead';
import { NavLink } from 'react-router-dom';
import { Container } from '../../components/ui/Container';
import { Section } from '../../components/ui/Section';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { PROGRAMS_DATA } from '../../data/programsData';
import { NGO_DETAILS } from '../../utils/constants';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowRight, FileCheck, ShieldCheck, GraduationCap, HeartPulse, UserCheck, Smile, Leaf, Trophy, Accessibility, ShieldAlert } from 'lucide-react';

const iconMap = {
  GraduationCap,
  HeartPulse,
  UserCheck,
  Smile,
  Leaf,
  Trophy,
  Accessibility,
  ShieldAlert,
};

export const ProgramsIndex = () => {
  const { isHindi } = useLanguage();
  const programsList = Object.values(PROGRAMS_DATA);

  const breadcrumbItems = [
    { labelHi: 'जनकल्याणकारी कार्यक्रम', labelEn: 'Programs', path: '/programs' },
  ];

  return (
    <div className="py-6 sm:py-8 bg-slate-50 min-h-screen">
      <SEOHead
        title="मुख्य समाज कल्याण कार्यक्रम - 8 मुख्य क्षेत्र"
        description="मां-बाबूजी समिति के 8 मुख्य सामाजिक कार्यक्रम: बाल शिक्षा, स्वास्थ्य सेवा, महिला स्वावलंबन, पर्यावरण व वृक्षारोपण, दिव्यांग सेवा, युवा विकास व सामाजिक जागरूकता।"
        canonicalUrl="https://mbks-cg.org/programs"
      />
      <Container>
        <Breadcrumbs items={breadcrumbItems} />

        {/* Hero Header */}
        <div className="bg-gradient-to-br from-ngo-green-950 via-ngo-green-900 to-slate-900 text-white rounded-2xl p-6 sm:p-10 shadow-xl border border-emerald-800 mb-10 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-ngo-gold-500 border border-white/20 text-xs font-semibold">
              <FileCheck className="w-4 h-4 text-ngo-gold-500" />
              <span>{NGO_DETAILS.regNo}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              {isHindi ? 'संस्था के जनकल्याणकारी कार्यक्रम' : 'Our Welfare Programs & Initiatives'}
            </h1>

            <p className="text-xs sm:text-base text-emerald-100/90 leading-relaxed font-normal">
              {isHindi
                ? 'मां-बाबूजी जनकल्याण समिति द्वारा शिक्षा, स्वास्थ्य, महिला सशक्तिकरण, जल संरक्षण, पर्यावरण एवं समाज सुधार के क्षेत्र में संचालित मुख्य कार्यक्रम:'
                : 'Core thematic programs operated by MBKS Chhattisgarh spanning education, health, women empowerment, environment, and social reform:'}
            </p>
          </div>
        </div>

        {/* Programs Grid */}
        <Section
          className="p-0 bg-transparent"
          badge={isHindi ? 'कार्यक्रम सूची' : 'Program Directory'}
          badgeVariant="green"
          title={isHindi ? 'समस्त कार्यक्षेत्र आधारित कार्यक्रम' : 'All Domain Welfare Programs'}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {programsList.map((prog) => {
              const Icon = iconMap[prog.iconName] || GraduationCap;
              return (
                <div
                  key={prog.slug}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-ngo overflow-hidden flex flex-col justify-between group hover:shadow-xl hover:border-ngo-green-500 transition-all duration-300"
                >
                  <div>
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden bg-slate-100">
                      <img
                        src={prog.coverImage}
                        alt={isHindi ? prog.titleHi : prog.titleEn}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge variant={prog.colorCategory}>
                          {isHindi ? prog.badgeHi : prog.badgeEn}
                        </Badge>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 space-y-3">
                      <div className="flex items-center gap-2 text-ngo-green-700">
                        <Icon className="w-5 h-5 shrink-0" />
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          {isHindi ? prog.badgeHi : prog.badgeEn}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 group-hover:text-ngo-green-700 transition-colors leading-snug">
                        {isHindi ? prog.titleHi : prog.titleEn}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                        {isHindi ? prog.introHi : prog.introEn}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="p-5 pt-0">
                    <NavLink to={`/programs/${prog.slug}`}>
                      <Button variant="secondary" size="sm" icon={ArrowRight} iconPosition="right" className="w-full text-xs">
                        {isHindi ? 'विस्तृत कार्यक्रम पढ़ें' : 'View Full Program Details'}
                      </Button>
                    </NavLink>
                  </div>
                </div>
              );
            })}
          </div>
        </Section>
      </Container>
    </div>
  );
};
