import React from 'react';
import { SEOHead } from '../../components/common/SEOHead';
import { Container } from '../../components/ui/Container';
import { Section } from '../../components/ui/Section';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { AboutNavTabs } from '../../components/about/AboutNavTabs';
import { NGO_DETAILS } from '../../utils/constants';
import { LEADERSHIP_TEAM } from '../../data/mockData';
import { useLanguage } from '../../context/LanguageContext';
import { Badge } from '../../components/ui/Badge';
import { Building, MapPin, UserCheck, ShieldCheck, FileCheck, Layers } from 'lucide-react';

export const OrganizationStructure = () => {
  const { isHindi } = useLanguage();

  const breadcrumbItems = [
    { labelHi: 'हमारे बारे में', labelEn: 'About Us', path: '/about' },
    { labelHi: 'संगठन एवं विधान', labelEn: 'Organization Structure', path: '/about/organization' },
  ];

  const executiveRoles = [
    { roleHi: 'अध्यक्ष (President)', roleEn: 'President', descHi: 'संस्था का सर्वोच्च संवैधानिक एवं प्रशासनिक नेतृत्व।', descEn: 'Constitutional leadership and executive supervision.' },
    { roleHi: 'उपाध्यक्ष (Vice President)', roleEn: 'Vice President', descHi: 'अध्यक्षीय जिम्मेदारियों में सहयोग एवं कार्यक्रम पर्यवेक्षण।', descEn: 'Programmatic oversight and executive assistance.' },
    { roleHi: 'सचिव (Secretary)', roleEn: 'Secretary', descHi: 'संस्था का पत्राचार, दैनिक संचालन एवं वैधानिक अनुपालन।', descEn: 'Daily operations, administrative documentation, and legal compliance.' },
    { roleHi: 'कोषाध्यक्ष (Treasurer)', roleEn: 'Treasurer', descHi: 'वित्तीय प्रबंधन, बैंक खाता संचालन एवं नियमित लेखापरीक्षा।', descEn: 'Financial management, banking compliance, and annual audit.' },
    { roleHi: 'कार्यकारिणी सदस्य (Executive Board Members)', roleEn: 'Executive Board Members', descHi: 'विभिन्न परियोजना समितियों का नेतृत्व एवं जमीनी कार्यान्वयन।', descEn: 'Committee leadership and field execution oversight.' },
  ];

  return (
    <div className="py-6 sm:py-8 bg-slate-50 min-h-screen">
      <SEOHead
        title="संगठन ढांचा एवं कार्यकारिणी - मां-बाबूजी समिति"
        description="मां-बाबूजी जनकल्याण समिति का पंजीकृत मुख्यालय: भैसमुड़ी, नवागढ़ (जांजगीर-चांपा)। संस्था की कार्यकारिणी परिषद, अध्यक्ष, सचिव व कोषाध्यक्ष संरचना।"
        canonicalUrl="https://mbks-cg.org/about/organization"
      />
      <Container>
        <Breadcrumbs items={breadcrumbItems} />
        <AboutNavTabs />

        {/* Legal & Office Address Details */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm mb-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo.jpeg"
                alt="Logo Seal"
                className="w-12 h-12 rounded-full border-2 border-ngo-gold-700 bg-white object-contain p-0.5"
              />
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-slate-900">{NGO_DETAILS.nameHi}</h1>
                <p className="text-xs text-ngo-gold-700 font-semibold">{NGO_DETAILS.nameEn}</p>
              </div>
            </div>
            <Badge variant="green" className="text-xs">
              <FileCheck className="w-3.5 h-3.5 mr-1" />
              <span>{NGO_DETAILS.regNo}</span>
            </Badge>
          </div>

          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Building className="w-5 h-5 text-ngo-green-700" />
              <span>{isHindi ? 'प्रधान कार्यालय वैधानिक विवरण' : 'Registered Headquarters Detail'}</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-ngo-green-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">{isHindi ? 'कार्यालय का पूर्ण पता:' : 'Full Office Address:'}</strong>
                    <span className="text-slate-700 leading-relaxed block mt-1">
                      मु. भैसमुड़ी, पो. सिउंड, भाठा पारा, वार्ड नंबर 22, मकान नंबर 651 (मकान मालिक: सुखनंदन दास पिता श्री देवीदास), थाना + तहसील + विकासखण्ड नवागढ़, जिला जांजगीर-चांपा (छ.ग.) पि.नं. 495668
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-ngo-gold-700 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block">{isHindi ? 'पंजीयन विवरण:' : 'Registration Record:'}</strong>
                    <span className="text-slate-700 leading-relaxed block mt-1">
                      छत्तीसगढ़ सोसाइटी रजिस्ट्रीकरण नियम 3 के तहत पंजीकृत (जावक क्रमांक 347, दिनांक 26/05/2025)। सहायक रजिस्ट्रार सोसाइटीज जांजगीर-चांपा द्वारा मुहरंकित एवं स्वीकृत।
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Founder & Executive Leadership Showcase */}
        <Section
          className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm mb-8"
          badge={isHindi ? 'संस्थापक एवं नेतृत्व' : 'Founders & Leadership'}
          badgeVariant="gold"
          title={isHindi ? 'संस्थापक एवं प्रबंध कार्यकारिणी मंडल' : 'Founders & Board of Executive Leadership'}
          subtitle={isHindi ? 'मां-बाबूजी जनकल्याण समिति छत्तीसगढ़ के संस्थापक एवं मार्गदर्शक मंडल:' : 'Leadership team guiding the statutory social mission of MBKS Chhattisgarh:'}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {LEADERSHIP_TEAM.map((member) => (
              <div
                key={member.id}
                className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-center space-y-3 hover:shadow-md transition-shadow group"
              >
                <div className="relative w-32 h-32 mx-auto mb-2">
                  <img
                    src={member.imageUrl}
                    alt={isHindi ? member.nameHi : member.nameEn}
                    className="w-full h-full rounded-full object-cover border-4 border-ngo-gold-700 shadow-md group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute bottom-0 right-0 bg-ngo-green-700 text-white rounded-full p-1 border-2 border-white shadow-xs">
                    <ShieldCheck className="w-4 h-4 text-ngo-gold-500" />
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{isHindi ? member.nameHi : member.nameEn}</h3>
                  <p className="text-xs font-bold text-ngo-green-800">{isHindi ? member.roleHi : member.roleEn}</p>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">{isHindi ? member.bioHi : member.bioEn}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Governing Body Roles Structure */}
        <Section
          className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm mb-8"
          badge={isHindi ? 'प्रबंध कार्यकारिणी' : 'Governing Roles'}
          badgeVariant="green"
          title={isHindi ? 'प्रबंध कारिणी समिति का ढांचा' : 'Executive Board & Management Matrix'}
          subtitle={isHindi ? 'सोसाइटी विधान अनुसार प्रबंध कार्यकारिणी का पदानुक्रम:' : 'Executive hierarchy established under the Society Constitution Rules:'}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {executiveRoles.map((role, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 hover:border-ngo-green-500 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-ngo-green-700 text-white font-bold flex items-center justify-center text-sm shadow-xs mb-3">
                  <UserCheck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">{role.roleHi}</h3>
                <p className="text-xs font-semibold text-ngo-gold-700">{role.roleEn}</p>
                <p className="text-xs text-slate-600 pt-1 leading-relaxed">{isHindi ? role.descHi : role.descEn}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Field Execution Structure */}
        <Section
          className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm"
          badge={isHindi ? 'मैदानी ढांचा' : 'Operational Structure'}
          title={isHindi ? 'परियोजना क्रियान्वयन एवं मैदानी ढांचा' : 'Project Execution & Volunteer Network'}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 space-y-2">
              <Layers className="w-6 h-6 text-ngo-green-700" />
              <h4 className="font-bold text-slate-900 text-base">{isHindi ? 'परियोजना समन्वयक' : 'Project Coordinators'}</h4>
              <p className="text-slate-600 leading-relaxed">
                {isHindi ? 'स्वास्थ्य, शिक्षा, जल व पर्यावरण हेतु समर्पित विशेषज्ञ प्रभारी।' : 'Domain leads overseeing health, education, and water conservation drives.'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-amber-50 border border-amber-100 space-y-2">
              <Building className="w-6 h-6 text-ngo-gold-700" />
              <h4 className="font-bold text-slate-900 text-base">{isHindi ? 'ग्राम स्तरीय समितियां' : 'Village Committees'}</h4>
              <p className="text-slate-600 leading-relaxed">
                {isHindi ? 'नवागढ़ ब्लॉक के विभिन्न गांवों में स्थानीय नागरिक प्रहरी।' : 'Grassroots village level committees in Nawagarh block.'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 space-y-2">
              <UserCheck className="w-6 h-6 text-blue-700" />
              <h4 className="font-bold text-slate-900 text-base">{isHindi ? 'युवा स्वयंसेवक नेटवर्क' : 'Volunteer Network'}</h4>
              <p className="text-slate-600 leading-relaxed">
                {isHindi ? 'रक्तदान, टीकाकरण व वृक्षारोपण हेतु 150+ पंजीकृत स्वयंसेवक।' : 'Over 150+ registered youth volunteers across Janjgir-Champa.'}
              </p>
            </div>
          </div>
        </Section>
      </Container>
    </div>
  );
};
