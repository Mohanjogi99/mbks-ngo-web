import React from 'react';
import { SEOHead } from '../../components/common/SEOHead';
import { Container } from '../../components/ui/Container';
import { Section } from '../../components/ui/Section';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { AboutNavTabs } from '../../components/about/AboutNavTabs';
import { NGO_DETAILS } from '../../utils/constants';
import { useLanguage } from '../../context/LanguageContext';
import { NavLink } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  FileCheck,
  ShieldCheck,
  Heart,
  Building,
  Award,
  CheckCircle2,
  ArrowRight,
  Laptop,
  Users,
  GraduationCap,
  Sparkles,
  FileText,
  TrendingUp,
  Target,
  Briefcase
} from 'lucide-react';

export const AboutMain = () => {
  const { isHindi } = useLanguage();

  const breadcrumbItems = [
    { labelHi: 'हमारे बारे में', labelEn: 'About Us', path: '/about' },
  ];

  const consultantStats = [
    { stat: '942+', labelHi: 'NGO & SHG पंजीयन', labelEn: 'NGO & SHG Registrations', color: 'emerald' },
    { stat: '12A & 80G', labelHi: '19+ संस्थाओं हेतु प्रावधिक', labelEn: '12A & 80G Approvals (19+)', color: 'amber' },
    { stat: '500+', labelHi: 'NGO Darpan पंजीयन', labelEn: 'NGO Darpan Registrations', color: 'blue' },
    { stat: '300+', labelHi: 'E-Anudan पंजीयन', labelEn: 'E-Anudan Registrations', color: 'indigo' },
    { stat: '1000+', labelHi: 'MSME / उद्यम पंजीयन', labelEn: 'MSME Registrations', color: 'gold' },
    { stat: '10+', labelHi: 'CSR-1 पंजीयन', labelEn: 'CSR-1 MCA Registrations', color: 'rose' },
  ];

  return (
    <div className="py-6 sm:py-8 bg-slate-50 min-h-screen">
      <SEOHead
        title="हमारे बारे में - मां-बाबूजी जनकल्याण समिति छत्तीसगढ़"
        description="मां-बाबूजी जनकल्याण समिति छत्तीसगढ़ (पंजीयन जावक क्रमांक 347, नवागढ़, जांजगीर-चांपा)। शिक्षा, महिला सशक्तिकरण, आजीविका संवर्धन एवं मां बाबूजी ऑनलाइन कंसल्टेंट प्रकल्प।"
        canonicalUrl="https://mbks-cg.org/about"
      />
      <Container>
        <Breadcrumbs items={breadcrumbItems} />
        <AboutNavTabs />

        {/* Hero Card */}
        <div className="bg-gradient-to-br from-ngo-green-950 via-ngo-green-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-emerald-800/80 mb-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-ngo-gold-700/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-ngo-gold-500 border border-white/20 text-xs font-semibold backdrop-blur-md">
              <FileCheck className="w-4 h-4 text-ngo-gold-500" />
              <span>{NGO_DETAILS.regNo}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {NGO_DETAILS.nameHi}
            </h1>
            <p className="text-sm sm:text-lg text-ngo-gold-500 font-semibold tracking-wide">
              {NGO_DETAILS.nameEn}
            </p>

            <p className="text-xs sm:text-base text-emerald-100/95 leading-relaxed font-normal">
              {isHindi
                ? 'मां बाबूजी जनकल्याण समिति छत्तीसगढ़ एक पंजीकृत सामाजिक संस्था है, जो शिक्षा, महिला सशक्तिकरण, युवा विकास, आजीविका संवर्धन एवं सामुदायिक विकास के क्षेत्र में निरंतर कार्यरत है।'
                : 'A registered social development organization working dedicatedly across education, women empowerment, youth development, livelihood promotion, and grassroots community welfare.'}
            </p>
          </div>
        </div>

        {/* 1. About Organization Introduction */}
        <Section
          className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm mb-10"
          badge={isHindi ? 'संस्था परिचय' : 'About Organization'}
          badgeVariant="green"
          title={isHindi ? 'संस्था की पृष्ठभूमि एवं उद्देश्य' : 'Organization Background & Core Mandate'}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
              <p className="font-semibold text-slate-900 leading-relaxed text-base sm:text-lg border-l-4 border-ngo-green-700 pl-4 py-1 bg-emerald-50/60 rounded-r-xl">
                {isHindi
                  ? 'संस्था का उद्देश्य ग्रामीण, वंचित एवं कमजोर वर्गों को शिक्षा, मार्गदर्शन, कौशल, अवसर एवं संसाधनों से जोड़कर उन्हें आत्मनिर्भर, सशक्त एवं सम्मानजनक जीवन की ओर अग्रसर करना है।'
                  : 'Our core objective is to empower rural, underprivileged, and marginalized communities by connecting them with education, skill guidance, opportunities, and resources for self-reliance.'}
              </p>

              <p>
                {isHindi
                  ? 'मां-बाबूजी जनकल्याण समिति छत्तीसगढ़ का पंजीयन जावक क्रमांक 347, दिनांक 26/05/2025 के अंतर्गत नवागढ़, जांजगीर-चांपा (छ.ग.) में संपन्न हुआ। संस्था का प्रधान कार्यालय ग्राम भैसमुड़ी, पो. सिउंड, भाठा पारा, वार्ड नंबर 22, मकान नंबर 651 में स्थित है।'
                  : 'Maa-Babuji Jankalyan Samiti Chhattisgarh is officially registered vide Dispatch No. 347, Dated 26/05/2025 based in Nawagarh, Janjgir-Champa (C.G.).'}
              </p>

              <p>
                {isHindi
                  ? 'संस्था युवाओं के लिए निःशुल्क कोचिंग कक्षाओं, निःशुल्क कंप्यूटर शिक्षा, करियर मार्गदर्शन, नेतृत्व विकास, व्यक्तित्व निर्माण एवं नशा मुक्ति जागरूकता कार्यक्रमों का संचालन करती है। महिलाओं के लिए स्वयं सहायता समूहों (SHGs) को संगठित कर सिलाई, हस्तशिल्प, सूक्ष्म उद्यमिता एवं आजीविका गतिविधियों के माध्यम से आर्थिक स्वावलंबन को बढ़ावा दिया जाता है।'
                  : 'We run free youth coaching classes, computer literacy, career guidance, leadership development, and anti-substance addiction awareness. For women, we facilitate Self-Help Groups (SHGs) providing tailoring, handicraft, and micro-entrepreneurship skill training.'}
              </p>
            </div>

            <div className="lg:col-span-4 bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center space-y-4 shadow-sm">
              <img
                src="/logo.jpeg"
                alt="Logo Seal"
                className="w-28 h-28 rounded-full border-4 border-ngo-gold-700 bg-white object-contain mx-auto p-1 shadow-md"
              />
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 text-sm sm:text-base">{NGO_DETAILS.nameHi}</h4>
                <p className="text-xs text-ngo-gold-700 font-semibold">{NGO_DETAILS.regNo}</p>
                <p className="text-xs text-slate-500">पंजीकृत प्रधान कार्यालय: नवागढ़, जांजगीर-चांपा (छ.ग.)</p>
              </div>
              <div className="pt-2">
                <NavLink to="/about/organization">
                  <Button variant="gold" size="sm" icon={ArrowRight} iconPosition="right" className="w-full text-xs">
                    {isHindi ? 'संगठन ढांचा एवं कार्यकारिणी देखें' : 'View Leadership Structure'}
                  </Button>
                </NavLink>
              </div>
            </div>
          </div>
        </Section>

        {/* 2. Special Wing: Maa Babuji Online & Consultant */}
        <Section
          className="bg-gradient-to-br from-slate-900 via-ngo-green-950 to-emerald-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-emerald-800/80 mb-10 relative overflow-hidden"
          badge={isHindi ? 'विशेष प्रकल्प' : 'Special Flagship Initiative'}
          badgeVariant="gold"
          title={isHindi ? 'विशेष प्रकल्प: "मां बाबूजी ऑनलाइन एंड कंसल्टेंट"' : 'Flagship Initiative: "Maa Babuji Online & Consultant"'}
          subtitle={isHindi ? 'देशभर की सामाजिक संस्थाओं, ट्रस्टों एवं कार्यकर्ताओं को वैधानिक अनुपालन व तकनीकी सहायता' : 'Providing statutory guidance, NGO Darpan, 12A/80G, and technical documentation support for NGOs nationwide'}
        >
          <div className="space-y-6 text-emerald-100/90 text-sm sm:text-base leading-relaxed">
            <p className="text-white font-medium text-base sm:text-lg">
              {isHindi
                ? 'संस्था का एक विशेष प्रकल्प "मां बाबूजी ऑनलाइन एंड कंसल्टेंट" है, जिसके माध्यम से देशभर की सामाजिक संस्थाओं, ट्रस्टों, सेक्शन-8 कंपनियों, स्वयं सहायता समूहों एवं सामाजिक कार्यकर्ताओं को NGO से संबंधित विभिन्न वैधानिक प्रक्रियाओं के लिए निःशुल्क मार्गदर्शन प्रदान किया जाता है।'
                : 'A dedicated flagship initiative "Maa Babuji Online & Consultant" offers free guidance and minimal-cost technical documentation assistance to NGOs, Trusts, Section-8 Companies, and SHGs across India.'}
            </p>

            <p>
              {isHindi
                ? 'आवश्यकता अनुसार अत्यंत न्यूनतम सहयोग राशि पर पंजीयन, अनुपालन एवं दस्तावेजीकरण संबंधी तकनीकी सहायता भी उपलब्ध कराई जाती है, जिससे नवगठित संस्थाओं को शीघ्र एवं सरल प्रक्रिया के माध्यम से आवश्यक दस्तावेज प्राप्त करने में सहायता मिलती है।'
                : 'Providing minimal-cost technical support for registration, statutory compliance, and documentation to help newly established non-profits secure legal recognitions efficiently.'}
            </p>

            {/* Achievement Statistics Grid */}
            <div className="pt-4 border-t border-emerald-800/80">
              <h3 className="text-base sm:text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-ngo-gold-500" />
                <span>{isHindi ? 'मां बाबूजी ऑनलाइन कंसल्टेंट द्वारा अब तक का महत्वपूर्ण योगदान:' : 'Impact Milestones Achieved Under Consultancy Wing:'}</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                {consultantStats.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center space-y-1 hover:bg-white/20 transition-all"
                  >
                    <div className="text-xl sm:text-2xl font-black text-ngo-gold-500 tracking-tight">
                      {item.stat}
                    </div>
                    <div className="text-xs font-bold text-white">
                      {isHindi ? item.labelHi : item.labelEn}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* 3. Core Program Verticals */}
        <Section
          className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm mb-10"
          badge={isHindi ? 'कार्य गतिविधियां' : 'Key Field Activities'}
          badgeVariant="green"
          title={isHindi ? 'संस्था की प्रमुख सामाजिक गतिविधियां' : 'Core Programs & Livelihood Initiatives'}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
            <div className="p-6 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-3">
              <GraduationCap className="w-8 h-8 text-ngo-green-700" />
              <h4 className="font-bold text-slate-900 text-base">{isHindi ? 'युवा विकास व शिक्षा' : 'Youth & Education'}</h4>
              <p className="text-slate-600 leading-relaxed">
                {isHindi
                  ? 'निःशुल्क कोचिंग कक्षाएं, कंप्यूटर साक्षरता, करियर मार्गदर्शन, व्यक्तित्व निर्माण एवं नशा मुक्ति जागरूकता अभियान।'
                  : 'Free youth tutoring, digital computer education, career counseling, personality building, and anti-addiction drives.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-100 space-y-3">
              <Users className="w-8 h-8 text-ngo-gold-700" />
              <h4 className="font-bold text-slate-900 text-base">{isHindi ? 'महिला स्वावलंबन (SHG)' : 'Women Empowerment'}</h4>
              <p className="text-slate-600 leading-relaxed">
                {isHindi
                  ? 'स्वयं सहायता समूहों (SHGs) का गठन, सिलाई व हस्तशिल्प प्रशिक्षण, सूक्ष्म उद्यमिता और आजीविका प्रोत्साहन।'
                  : 'Organizing Self-Help Groups (SHGs), tailoring & handicraft vocational skills, and micro-entrepreneurship support.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-blue-50/70 border border-blue-100 space-y-3">
              <Heart className="w-8 h-8 text-blue-700" />
              <h4 className="font-bold text-slate-900 text-base">{isHindi ? 'सामुदायिक विकास व कल्याण' : 'Community Welfare'}</h4>
              <p className="text-slate-600 leading-relaxed">
                {isHindi
                  ? 'निःशुल्क स्वास्थ्य शिविर, रक्तदान सेवा, बाल अधिकार संरक्षण, जल संरक्षण एवं पर्यावरण संवर्धन कार्यक्रम।'
                  : 'Free medical camps, blood donation network, child rights, rainwater harvesting, and environmental protection.'}
              </p>
            </div>
          </div>
        </Section>

        {/* 4. Vision & Impact Commitment */}
        <Section
          className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm"
          badge={isHindi ? 'हमारा सामाजिक लक्ष्य' : 'Our Social Vision'}
          badgeVariant="gold"
          title={isHindi ? 'समावेशी एवं आत्मनिर्भर समाज का निर्माण' : 'Building an Inclusive & Self-Reliant Society'}
        >
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-ngo-green-50 via-emerald-50 to-amber-50 border border-emerald-200/80 space-y-4">
            <p className="text-slate-800 text-sm sm:text-base leading-relaxed font-medium">
              {isHindi
                ? 'संस्था द्वारा अब तक अनेक गांवों एवं समुदायों में शिक्षा, महिला सशक्तिकरण, युवा विकास, स्वास्थ्य, पर्यावरण एवं आजीविका से जुड़े कार्यक्रम सफलतापूर्वक संचालित किए गए हैं, जिनसे बच्चों, युवाओं, महिलाओं एवं जरूरतमंद परिवारों को प्रत्यक्ष लाभ प्राप्त हुआ है।'
                : 'Through our programs in education, healthcare, women empowerment, and livelihood across rural Chhattisgarh, hundreds of families have directly benefited.'}
            </p>

            <div className="pt-3 border-t border-emerald-200/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm font-semibold text-ngo-green-900">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-ngo-green-700 shrink-0" />
                <span>{isHindi ? 'प्रत्येक बच्चे को गुणवत्तापूर्ण शिक्षा' : 'Quality education for every child'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-ngo-gold-700 shrink-0" />
                <span>{isHindi ? 'प्रत्येक युवा को प्रगति के अवसर' : 'Empowering youth for bright career'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-ngo-green-700 shrink-0" />
                <span>{isHindi ? 'प्रत्येक महिला को आर्थिक स्वावलंबन' : 'Financial independence for women'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-ngo-gold-700 shrink-0" />
                <span>{isHindi ? 'प्रत्येक परिवार को सम्मानजनक जीवन' : 'Dignified life for every family'}</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4 justify-center sm:justify-start">
              <NavLink to="/volunteer">
                <Button variant="gold" size="md" icon={Users}>
                  {isHindi ? 'स्वयंसेवक के रूप में जुड़ें' : 'Join as Volunteer'}
                </Button>
              </NavLink>
              <NavLink to="/donate">
                <Button variant="primary" size="md" icon={Heart}>
                  {isHindi ? 'सहयोग एवं दान करें' : 'Support Our Cause'}
                </Button>
              </NavLink>
            </div>
          </div>
        </Section>
      </Container>
    </div>
  );
};
