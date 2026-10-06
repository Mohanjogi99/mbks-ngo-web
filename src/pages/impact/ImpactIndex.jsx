import React, { useState, useEffect } from 'react';
import { Container } from '../../components/ui/Container';
import { Section } from '../../components/ui/Section';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { Badge } from '../../components/ui/Badge';
import { fetchImpactData } from '../../services/impactService';
import { NGO_DETAILS } from '../../utils/constants';
import { useLanguage } from '../../context/LanguageContext';
import {
  TrendingUp,
  FolderKanban,
  CheckCircle2,
  Clock,
  Users,
  HeartHandshake,
  Calendar,
  MapPin,
  Megaphone,
  Award,
  Sparkles,
  PieChart as PieChartIcon,
  Layers,
  ArrowRight,
  ShieldCheck,
  Building2,
  Info,
} from 'lucide-react';

export const ImpactIndex = () => {
  const { isHindi } = useLanguage();
  const [impactStats, setImpactStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const breadcrumbItems = [
    { labelHi: 'सामाजिक प्रभाव रिपोर्ट', labelEn: 'Impact Dashboard', path: '/impact' },
  ];

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchImpactData();
      setImpactStats(data);
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading || !impactStats) {
    return (
      <div className="py-12 bg-slate-50 min-h-screen">
        <Container>
          <div className="p-12 text-center text-slate-500 font-semibold text-sm">
            Loading real organization impact statistics...
          </div>
        </Container>
      </div>
    );
  }

  const metricCards = [
    {
      titleHi: 'कुल परियोजनाएं',
      titleEn: 'Total Projects',
      value: impactStats.totalProjects,
      icon: FolderKanban,
      color: 'bg-emerald-50 text-ngo-green-700 border-emerald-200',
    },
    {
      titleHi: 'पूर्ण परियोजनाएं',
      titleEn: 'Completed Projects',
      value: impactStats.completedProjects,
      icon: CheckCircle2,
      color: 'bg-teal-50 text-teal-800 border-teal-200',
    },
    {
      titleHi: 'संचालित परियोजनाएं',
      titleEn: 'Ongoing Projects',
      value: impactStats.ongoingProjects,
      icon: Clock,
      color: 'bg-amber-50 text-amber-800 border-amber-200',
    },
    {
      titleHi: 'कुल लाभार्थी जन',
      titleEn: 'Beneficiaries Reached',
      value: `${impactStats.totalBeneficiaries.toLocaleString('en-IN')}+`,
      icon: Users,
      color: 'bg-blue-50 text-blue-800 border-blue-200',
    },
    {
      titleHi: 'पंजीकृत स्वयंसेवक',
      titleEn: 'Registered Volunteers',
      value: `${impactStats.totalVolunteers}+`,
      icon: HeartHandshake,
      color: 'bg-purple-50 text-purple-800 border-purple-200',
    },
    {
      titleHi: 'आयोजित गतिविधियां',
      titleEn: 'Events Organized',
      value: `${impactStats.totalEvents}+`,
      icon: Calendar,
      color: 'bg-pink-50 text-pink-800 border-pink-200',
    },
    {
      titleHi: 'आच्छादित ग्राम / क्षेत्र',
      titleEn: 'Villages Reached',
      value: `${impactStats.villagesReached}+`,
      icon: MapPin,
      color: 'bg-amber-50 text-ngo-gold-800 border-amber-200',
    },
    {
      titleHi: 'जागरूकता अभियान',
      titleEn: 'Awareness Programs',
      value: `${impactStats.awarenessProgramsCount}+`,
      icon: Megaphone,
      color: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    },
  ];

  return (
    <div className="py-6 sm:py-8 bg-slate-50 min-h-screen">
      <Container>
        <Breadcrumbs items={breadcrumbItems} />

        {/* Hero Header */}
        <div className="bg-gradient-to-br from-ngo-green-950 via-ngo-green-900 to-slate-900 text-white rounded-2xl p-6 sm:p-10 shadow-xl border border-emerald-800 mb-8 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-ngo-gold-400 border border-white/20 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 text-ngo-gold-400" />
                <span>{NGO_DETAILS.regNo}</span>
              </span>
              {impactStats.isDemoData && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-[11px] font-mono">
                  <Info className="w-3.5 h-3.5" /> [Development Placeholder Baseline Data]
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              {isHindi ? 'संगठन प्रभाव एवं सामाजिक प्रगति रिपोर्ट' : 'Organization Impact & Social Reach'}
            </h1>

            <p className="text-xs sm:text-base text-emerald-100/90 leading-relaxed font-normal">
              {isHindi
                ? 'मां-बाबूजी जनकल्याण समिति छत्तीसगढ़ द्वारा जांजगीर-चांपा व नवागढ़ क्षेत्र में शिक्षा, स्वास्थ्य, पर्यावरण व महिला स्वावलंबन के क्षेत्र में प्राप्त परिणाम।'
                : 'Empirical welfare milestones, beneficiary reach, and village-level transformations across Janjgir-Champa.'}
            </p>
          </div>
        </div>

        {/* 8 Primary Metrics Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {metricCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className={`p-5 rounded-2xl border shadow-xs transition-transform hover:-translate-y-0.5 space-y-2 ${card.color}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider opacity-80">
                    {isHindi ? card.titleHi : card.titleEn}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-white/60 backdrop-blur-xs flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-2xl sm:text-3xl font-black tracking-tight">{card.value}</p>
              </div>
            );
          })}
        </div>

        {/* Section 1: Project Category Breakdown */}
        <Section
          className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm mb-10"
          badge={isHindi ? 'विषयवार विभाजन' : 'Category Breakdown'}
          badgeVariant="green"
          title={isHindi ? 'कार्य क्षेत्रों के अनुसार परियोजनाओं का वितरण' : 'Project Distribution by Focus Area'}
          subtitle={isHindi ? 'समिति के 10 मुख्य संवैधानिक लक्ष्यों के अंतर्गत संचालित प्रोजेक्ट्स:' : 'Active projects split across core constitutional objectives:'}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(impactStats.categoryBreakdown).map(([catName, count], idx) => {
              const total = impactStats.totalProjects || 1;
              const pct = Math.round((count / total) * 100);
              return (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm">{catName}</span>
                    <Badge variant="gold" size="sm">
                      {count} {isHindi ? 'प्रोजेक्ट्स' : 'Projects'}
                    </Badge>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-ngo-green-700 h-full rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                    <span>कुल हिस्सेदारी: {pct}%</span>
                    <span>सक्रिय</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Section>

        {/* Section 2: Geographic Reach */}
        <Section
          className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm mb-10"
          badge={isHindi ? 'भौगोलिक आच्छादन' : 'Geographic Reach'}
          badgeVariant="gold"
          title={isHindi ? 'जांजगीर-चांपा एवं नवागढ़ क्षेत्र में जमीनी उपस्थिति' : 'Grassroots Footprint across Janjgir-Champa'}
          subtitle={isHindi ? 'समिति की प्रत्यक्ष पहुंच वाले प्रमुख ग्राम एवं ब्लॉक स्तर:' : 'Key villages and tehsils benefiting from MBKS field operations:'}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {impactStats.geographicReach.map((geo, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-ngo-gold-700 shrink-0" />
                    <span>{geo.villageHi}</span>
                  </h4>
                  <Badge variant="green" size="sm">
                    {geo.blockHi}
                  </Badge>
                </div>
                <p className="text-xs text-slate-600">
                  प्राथमिक कार्य: <strong className="text-ngo-green-900">{geo.type}</strong>
                </p>
                <div className="pt-1 border-t border-emerald-200/60 flex items-center justify-between text-xs font-bold text-slate-800">
                  <span>लाभार्थी संख्या:</span>
                  <span className="text-ngo-green-800">{geo.beneficiaries}+</span>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Section 3: Year-Wise Activity Timeline */}
        <Section
          className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm mb-10"
          badge={isHindi ? 'वर्षवार विकास यात्रा' : 'Annual Activity'}
          title={isHindi ? 'संगठनात्मक विकास एवं उपलब्धियों की समय-रेखा' : 'Year-Wise Activity & Growth Milestones'}
        >
          <div className="space-y-6 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {impactStats.yearWiseActivity.map((item, idx) => (
              <div key={idx} className="relative pl-10 space-y-2">
                <div className="absolute left-1.5 top-1 w-5 h-5 rounded-full bg-ngo-green-700 text-white font-black text-[10px] flex items-center justify-center ring-4 ring-white shadow-xs">
                  ✓
                </div>
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="text-lg font-black text-ngo-green-900">वर्ष {item.year}</span>
                    <h3 className="font-bold text-slate-900 text-base">{isHindi ? item.titleHi : item.titleEn}</h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{isHindi ? item.achievementsHi : item.titleEn}</p>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-700 pt-1">
                    <span>परियोजनाएं: {item.projectsCount}</span>
                    <span>गतिविधियां: {item.eventsCount}</span>
                    <span className="text-ngo-green-800">लाभार्थी: {item.beneficiaries}+</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Section 4: Success Stories */}
        <Section
          className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm mb-10"
          badge={isHindi ? 'सफलता की गाथाएं' : 'Success Stories'}
          badgeVariant="gold"
          title={isHindi ? 'बदलाव के प्रत्यक्ष साक्षी - वास्तविक प्रभाव कहानियां' : 'Real Beneficiary Transformation Stories'}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {impactStats.successStories.map((story) => (
              <div key={story.id} className="rounded-xl border border-slate-200 bg-slate-50 overflow-hidden space-y-3 flex flex-col">
                <div className="relative h-44 overflow-hidden shrink-0">
                  <img src={story.image} alt={story.titleHi} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3">
                    <Badge variant="green" size="sm">
                      {story.categoryHi}
                    </Badge>
                  </div>
                </div>
                <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                      <MapPin className="w-3 h-3 text-ngo-gold-700" />
                      <span>{story.location}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm line-clamp-2">{story.titleHi}</h3>
                    <p className="text-xs text-slate-600 line-clamp-3">{story.descHi}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs font-extrabold text-ngo-green-900">
                    <span>{story.impactCount}</span>
                    <Sparkles className="w-4 h-4 text-ngo-gold-600" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </Container>
    </div>
  );
};
