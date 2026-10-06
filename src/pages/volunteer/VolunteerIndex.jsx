import React from 'react';
import { SEOHead } from '../../components/common/SEOHead';
import { Container } from '../../components/ui/Container';
import { Section } from '../../components/ui/Section';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { Badge } from '../../components/ui/Badge';
import { VolunteerForm } from '../../components/volunteer/VolunteerForm';
import { NGO_DETAILS } from '../../utils/constants';
import { useLanguage } from '../../context/LanguageContext';
import { HeartHandshake, ShieldCheck, Award, FileCheck, Users, CheckCircle2, ArrowDown, GraduationCap, HeartPulse, Leaf, UserCheck, Smile, Trophy, Accessibility, ShieldAlert } from 'lucide-react';

export const VolunteerIndex = () => {
  const { isHindi } = useLanguage();

  const breadcrumbItems = [
    { labelHi: 'स्वयंसेवक बनें', labelEn: 'Volunteer', path: '/volunteer' },
  ];

  const whyVolunteer = [
    {
      icon: HeartHandshake,
      titleHi: 'निःस्वार्थ समाज सेवा का अवसर',
      titleEn: 'Opportunity for Social Service',
      descHi: 'अपने समय, कौशल एवं समर्पण से जांजगीर-चांपा के जरूरतमंद परिवारों का जीवन बदलने का अवसर।',
      descEn: 'Transform lives across Janjgir-Champa through your time, skills, and dedication.',
    },
    {
      icon: Trophy,
      titleHi: 'युवा नेतृत्व व व्यक्तित्व विकास',
      titleEn: 'Leadership & Personality Growth',
      descHi: 'टीम वर्क, कार्यक्रम प्रबंधन, सार्वजनिक संवाद एवं नेतृत्व क्षमता का विकास।',
      descEn: 'Enhance teamwork, event management, public speaking, and leadership qualities.',
    },
    {
      icon: Award,
      titleHi: 'आधिकारिक पहचान व प्रमाण पत्र',
      titleEn: 'Official ID Card & Certificate',
      descHi: 'संस्था द्वारा आधिकारिक स्वयंसेवक पहचान पत्र (ID Card) तथा उत्कृष्ट सेवा हेतु अनुभव प्रमाण पत्र।',
      descEn: 'Official NGO Volunteer Identity Card and formal Certificate of Appreciation.',
    },
    {
      icon: Users,
      titleHi: 'सशक्त नेटवर्क व प्रेरणादायी मंच',
      titleEn: 'Strong Network & Community',
      descHi: 'समान विचारधारा वाले समाजसेवियों, डॉक्टरों, शिक्षकों व युवाओं के साथ जुड़ने का सुनहरा मौका।',
      descEn: 'Connect with like-minded social workers, doctors, teachers, and passionate youth.',
    },
  ];

  const processSteps = [
    { step: '01', titleHi: 'ऑनलाइन फॉर्म भरें', titleEn: 'Fill Online Form', descHi: 'अपनी मूलभूत जानकारी व रुचि का क्षेत्र चुनकर आवेदन जमा करें।' },
    { step: '02', titleHi: 'सत्यापन व ओरिएंटेशन', titleEn: 'Verification & Call', descHi: 'समिति टीम द्वारा संपर्क कर संक्षिप्त परिचयात्मक चर्चा।' },
    { step: '03', titleHi: 'आईडी कार्ड जारी होना', titleEn: 'ID Card Issuance', descHi: 'आधिकारिक स्वयंसेवक कोड व पहचान पत्र प्राप्त करें।' },
    { step: '04', titleHi: 'जमीनी अभियानों में भाग लें', titleEn: 'Active Service', descHi: 'स्वास्थ्य शिविरों, वृक्षारोपण व शिक्षा अभियानों में योगदान दें।' },
  ];

  const contributionAreas = [
    { icon: GraduationCap, titleHi: 'शिक्षा व कोचिंग', titleEn: 'Education & Tutoring', descHi: 'गरीब बच्चों को पढाना व साक्षरता।' },
    { icon: HeartPulse, titleHi: 'स्वास्थ्य व रक्तदान', titleEn: 'Health & Blood Donation', descHi: 'शिविर व्यवस्थापन व आपातकालीन मदद।' },
    { icon: Leaf, titleHi: 'पर्यावरण व वृक्षारोपण', titleEn: 'Environment & Plantation', descHi: 'पौधरोपण व स्वच्छता अभियान।' },
    { icon: UserCheck, titleHi: 'महिला सशक्तिकरण', titleEn: 'Women Empowerment', descHi: 'सिलाई प्रशिक्षण व SHG मार्गदर्शन।' },
    { icon: Trophy, titleHi: 'खेलकूद व युवा विकास', titleEn: 'Sports & Youth Skills', descHi: 'खेल प्रतियोगिताएं व कंप्यूटर क्लास।' },
    { icon: ShieldAlert, titleHi: 'सामाजिक जागरूकता', titleEn: 'Social Reform', descHi: 'नशा मुक्ति व कुरीति निवारण रैली।' },
  ];

  return (
    <div className="py-6 sm:py-8 bg-slate-50 min-h-screen">
      <SEOHead
        title="स्वयंसेवक पंजीकरण फॉर्म - समाज सेवा हेतु जुड़ें"
        description="मां-बाबूजी जनकल्याण समिति नवागढ़ (जांजगीर-चांपा) से स्वयंसेवक के रूप में जुड़ें। निःशुल्क पहचान पत्र, अनुभव प्रमाण पत्र एवं बाल शिक्षा, रक्तदान व पर्यावरण संरक्षण में योगदान का अवसर।"
        canonicalUrl="https://mbks-cg.org/volunteer"
      />
      <Container>
        <Breadcrumbs items={breadcrumbItems} />

        {/* Hero Banner */}
        <div className="bg-gradient-to-br from-ngo-green-950 via-ngo-green-900 to-slate-900 text-white rounded-2xl p-6 sm:p-10 shadow-xl border border-emerald-800 mb-10 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-ngo-gold-500 border border-white/20 text-xs font-semibold">
              <FileCheck className="w-4 h-4 text-ngo-gold-500" />
              <span>{NGO_DETAILS.regNo}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              {isHindi ? 'स्वयंसेवक के रूप में जुड़ें (Join as Volunteer)' : 'Become a Volunteer with MBKS'}
            </h1>

            <p className="text-xs sm:text-base text-emerald-100/90 leading-relaxed font-normal">
              {isHindi
                ? 'यदि आपके दिल में जनसेवा का जज्बा है और आप समाज में बदलाव लाना चाहते हैं, तो मां-बाबूजी समिति का मंच आपका स्वागत करता है।'
                : 'Empower communities across Nawagarh and Janjgir-Champa by dedicating your skills and time for social good.'}
            </p>

            <div className="pt-2">
              <a href="#volunteer-form">
                <Button variant="gold" size="lg" icon={ArrowDown}>
                  {isHindi ? 'पंजीकरण फॉर्म अभी भरें' : 'Fill Registration Form'}
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Why Volunteer */}
        <Section
          className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm mb-10"
          badge={isHindi ? 'प्रेरणा व उद्देश्य' : 'Why Join Us'}
          badgeVariant="green"
          title={isHindi ? 'स्वयंसेवक क्यों बनें?' : 'Why Become a Volunteer?'}
          subtitle={isHindi ? 'समाज सेवा के साथ स्वयं के व्यक्तित्व विकास का एक सशक्त माध्यम:' : 'Key benefits of dedicating your time and energy to social upliftment:'}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyVolunteer.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3 hover:border-ngo-green-500 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-ngo-green-50 text-ngo-green-700 flex items-center justify-center font-bold">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {isHindi ? item.titleHi : item.titleEn}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {isHindi ? item.descHi : item.descEn}
                  </p>
                </div>
              );
            })}
          </div>
        </Section>

        {/* How the Process Works */}
        <Section
          className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm mb-10"
          badge={isHindi ? 'पंजीकरण प्रक्रिया' : 'How it Works'}
          badgeVariant="gold"
          title={isHindi ? 'पंजीकरण की 4 सरल चरण प्रक्रिया' : 'Simple 4-Step Onboarding Process'}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-emerald-50/60 border border-emerald-200/80 space-y-2 relative">
                <span className="w-8 h-8 rounded-lg bg-ngo-green-700 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                  {step.step}
                </span>
                <h3 className="text-sm font-bold text-slate-900 pt-1">
                  {isHindi ? step.titleHi : step.titleEn}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isHindi ? step.descHi : step.descEn}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* Contribution Areas Grid */}
        <Section
          className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm mb-10"
          badge={isHindi ? 'कार्य क्षेत्र' : 'Contribution Areas'}
          title={isHindi ? 'आप किन क्षेत्रों में योगदान दे सकते हैं?' : 'Areas Where You Can Contribute'}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {contributionAreas.map((area, idx) => {
              const Icon = area.icon;
              return (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-ngo-green-50 text-ngo-green-700 flex items-center justify-center mx-auto">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{isHindi ? area.titleHi : area.titleEn}</h4>
                  <p className="text-[11px] text-slate-500 line-clamp-1">{isHindi ? area.descHi : area.descEn}</p>
                </div>
              );
            })}
          </div>
        </Section>

        {/* Registration Form Component */}
        <VolunteerForm />
      </Container>
    </div>
  );
};
