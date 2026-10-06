import React from 'react';
import { SEOHead } from '../../components/common/SEOHead';
import { useParams, Navigate, NavLink } from 'react-router-dom';
import { Container } from '../../components/ui/Container';
import { Section } from '../../components/ui/Section';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { PROJECTS_DATA } from '../../data/projectsData';
import { NGO_DETAILS } from '../../utils/constants';
import { useLanguage } from '../../context/LanguageContext';
import { MapPin, Calendar, Users, Target, Award, Download, CheckCircle2, Heart, ArrowLeft, Image as ImageIcon } from 'lucide-react';

export const ProjectDetail = () => {
  const { projectId } = useParams();
  const { isHindi } = useLanguage();

  const project = PROJECTS_DATA.find((p) => p.id === projectId);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const breadcrumbItems = [
    { labelHi: 'जमीनी परियोजनाएं', labelEn: 'Projects', path: '/projects' },
    { labelHi: project.titleHi, labelEn: project.titleEn, path: `/projects/${project.id}` },
  ];

  const isOngoing = project.status === 'ongoing';

  return (
    <div className="py-6 sm:py-8 bg-slate-50 min-h-screen">
      <SEOHead
        title={`${project.titleHi} (${project.titleEn})`}
        description={`${project.descriptionHi} स्थान: ${project.location?.villageHi || 'नवागढ़'}, जांजगीर-चांपा। मां-बाबूजी जनकल्याण समिति।`}
        canonicalUrl={`https://mbks-cg.org/projects/${project.id}`}
        ogImage={project.coverImage}
      />
      <Container>
        <Breadcrumbs items={breadcrumbItems} />

        {/* Back Link */}
        <div className="mb-4">
          <NavLink
            to="/projects"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-ngo-green-700 hover:text-ngo-green-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{isHindi ? 'सभी परियोजनाओं पर वापस जाएं' : 'Back to All Projects'}</span>
          </NavLink>
        </div>

        {/* Main Title & Cover Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm mb-8 space-y-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Badge variant="green">
                {isHindi ? project.categoryLabelHi : project.categoryLabelEn}
              </Badge>
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                isOngoing
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : 'bg-emerald-100 text-emerald-900 border-emerald-300'
              }`}>
                {isHindi ? project.statusLabelHi : project.statusLabelEn}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {isHindi ? project.titleHi : project.titleEn}
            </h1>
            <p className="text-sm sm:text-base font-semibold text-ngo-gold-700">
              {isHindi ? project.titleEn : project.titleHi}
            </p>
          </div>

          {/* Cover Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-video max-h-[420px] w-full bg-slate-100">
            <img
              src={project.coverImage || '/data-01/WhatsApp Image 2026-10-05 at 7.30.40 PM4.jpeg'}
              alt={isHindi ? project.titleHi : project.titleEn}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/data-01/WhatsApp Image 2026-10-05 at 7.30.40 PM4.jpeg';
              }}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Key Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm">
            <div className="space-y-1">
              <span className="text-slate-500 font-semibold block">{isHindi ? 'स्थान (Location):' : 'Location:'}</span>
              <span className="font-bold text-slate-900 flex items-center gap-1">
                <MapPin className="w-4 h-4 text-ngo-gold-700 shrink-0" />
                <span className="line-clamp-1">{isHindi ? project.location.villageHi : project.location.villageEn}</span>
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-slate-500 font-semibold block">{isHindi ? 'प्रारंभ तिथि:' : 'Start Date:'}</span>
              <span className="font-bold text-slate-900 flex items-center gap-1">
                <Calendar className="w-4 h-4 text-ngo-green-700 shrink-0" />
                <span>{project.startDate}</span>
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-slate-500 font-semibold block">{isHindi ? 'संपन्न तिथि:' : 'End Date:'}</span>
              <span className="font-bold text-slate-900 flex items-center gap-1">
                <Calendar className="w-4 h-4 text-slate-500 shrink-0" />
                <span>{project.endDate || 'सतत'}</span>
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-slate-500 font-semibold block">{isHindi ? 'लाभार्थी संख्या:' : 'Beneficiaries:'}</span>
              <span className="font-bold text-slate-900 flex items-center gap-1">
                <Users className="w-4 h-4 text-blue-600 shrink-0" />
                <span>{project.beneficiariesCount} / {project.targetBeneficiariesCount}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Objectives & Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          {/* Objectives */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Target className="w-5 h-5 text-ngo-green-700" />
              <h2 className="text-lg font-bold text-slate-900">
                {isHindi ? 'परियोजना के मुख्य उद्देश्य' : 'Project Objectives'}
              </h2>
            </div>
            <div className="space-y-2.5 text-xs sm:text-sm">
              {project.objectives.map((obj) => (
                <div key={obj.id} className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-200/60">
                  <CheckCircle2 className="w-4 h-4 text-ngo-green-700 shrink-0 mt-0.5" />
                  <span className="text-slate-700 font-medium leading-relaxed">{obj.textHi}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Award className="w-5 h-5 text-ngo-gold-700" />
              <h2 className="text-lg font-bold text-slate-900">
                {isHindi ? 'मुख्य उपलब्धियां (Achievements)' : 'Key Achievements'}
              </h2>
            </div>
            <div className="space-y-2.5 text-xs sm:text-sm">
              {project.achievements.map((ach, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-amber-50/60 border border-amber-200/60">
                  <Award className="w-4 h-4 text-ngo-gold-700 shrink-0 mt-0.5" />
                  <span className="text-slate-800 font-semibold leading-relaxed">{ach.titleHi}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Target Beneficiaries & Impact */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-sm mb-8 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
            {isHindi ? 'लाभार्थी एवं दीर्घकालिक सामाजिक प्रभाव' : 'Beneficiaries & Social Impact'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <strong className="text-slate-900 block">{isHindi ? 'लक्षित समूह:' : 'Target Group:'}</strong>
              <p className="text-slate-700">{isHindi ? project.targetBeneficiariesTextHi : project.targetBeneficiariesTextEn}</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <strong className="text-slate-900 block">{isHindi ? 'सामाजिक प्रभाव:' : 'Social Impact:'}</strong>
              <p className="text-slate-700">{isHindi ? project.impactHi : project.impactEn}</p>
            </div>
          </div>
        </div>

        {/* Reports & Gallery */}
        {(project.reports?.length > 0 || project.gallery?.length > 0) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Reports */}
            {project.reports?.length > 0 && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                  <Download className="w-4 h-4 text-ngo-green-700" />
                  <span>{isHindi ? 'डाउनलोड रिपोर्ट (PDF)' : 'Downloadable Reports'}</span>
                </h3>
                {project.reports.map((rep, idx) => (
                  <a
                    key={idx}
                    href={rep.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-emerald-50 border border-slate-200 text-xs font-semibold text-slate-800 hover:text-ngo-green-800 transition-colors"
                  >
                    <span>{rep.titleHi}</span>
                    <span className="text-[11px] text-slate-400 font-mono">{rep.fileSize}</span>
                  </a>
                ))}
              </div>
            )}

            {/* Gallery */}
            {project.gallery?.length > 0 && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                  <ImageIcon className="w-4 h-4 text-ngo-gold-700" />
                  <span>{isHindi ? 'परियोजना तस्वीरें' : 'Project Photos'}</span>
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {project.gallery.map((g) => (
                    <div key={g.id} className="h-28 rounded-lg overflow-hidden border border-slate-200">
                      <img src={g.imageUrl} alt={g.titleHi} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* CTA */}
        <div className="bg-gradient-to-r from-ngo-green-950 via-ngo-green-900 to-slate-900 text-white p-8 rounded-2xl text-center space-y-4 shadow-xl">
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            {isHindi ? 'इस परियोजना में सहयोग करें' : 'Support This Project'}
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-xl mx-auto">
            {isHindi
              ? 'आपकी एक छोटी सी मदद से जांजगीर-चांपा के ग्रामीण क्षेत्रों में जीवन बदल सकता है।'
              : 'Your support helps scale this ground project to more villages in Janjgir-Champa.'}
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <NavLink to="/donate">
              <Button variant="gold" size="md" icon={Heart}>
                {isHindi ? 'दान करें (Donate)' : 'Donate Online'}
              </Button>
            </NavLink>
            <NavLink to="/volunteer">
              <Button variant="outline" size="md" className="border-white text-white hover:bg-white/10">
                {isHindi ? 'स्वयंसेवक बनें' : 'Volunteer'}
              </Button>
            </NavLink>
          </div>
        </div>
      </Container>
    </div>
  );
};
