import React from 'react';
import { SEOHead } from '../../components/common/SEOHead';
import { Container } from '../../components/ui/Container';
import { Section } from '../../components/ui/Section';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { AboutNavTabs } from '../../components/about/AboutNavTabs';
import { useLanguage } from '../../context/LanguageContext';
import { Target, Compass, Eye, Heart, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const VisionMission = () => {
  const { isHindi } = useLanguage();

  const breadcrumbItems = [
    { labelHi: 'हमारे बारे में', labelEn: 'About Us', path: '/about' },
    { labelHi: 'विजन एवं मिशन', labelEn: 'Vision & Mission', path: '/about/vision-mission' },
  ];

  return (
    <div className="py-6 sm:py-8 bg-slate-50 min-h-screen">
      <SEOHead
        title="विजन एवं मिशन - सामाजिक बदलाव का लक्ष्य"
        description="मां-बाबूजी जनकल्याण समिति का विजन एवं मिशन: जांजगीर-चांपा व नवागढ़ के हर वर्ग को निःशुल्क शिक्षा, स्वास्थ्य सेवा, महिला सशक्तिकरण एवं स्वावलंबन से जोड़ना।"
        canonicalUrl="https://mbks-cg.org/about/vision-mission"
      />
      <Container>
        <Breadcrumbs items={breadcrumbItems} />
        <AboutNavTabs />

        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Vision */}
          <div className="bg-gradient-to-br from-ngo-green-900 via-ngo-green-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-emerald-800 space-y-4 relative overflow-hidden">
            <div className="w-12 h-12 rounded-xl bg-white/10 text-ngo-gold-500 flex items-center justify-center font-bold">
              <Eye className="w-6 h-6" />
            </div>

            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              {isHindi ? 'हमारा विजन (Vision)' : 'Our Vision'}
            </h2>

            <p className="text-emerald-100 text-sm sm:text-base leading-relaxed font-normal">
              {isHindi
                ? 'एक ऐसा समरस, शिक्षित, स्वस्थ और स्वावलंबी समाज जहां प्रत्येक नागरिक, महिला, बालक, बुजुर्ग और दिव्यांग जन गरिमा, समानता और अवसरों के साथ जीवन यापन कर सकें।'
                : 'A harmonious, educated, healthy, and self-reliant society where every citizen—women, children, elderly, and Divyangjan—enjoys dignity, equality, and opportunity.'}
            </p>

            <div className="pt-2 border-t border-emerald-800/80 text-xs text-ngo-gold-500 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>{isHindi ? 'सर्व समावेशी समाज कल्याण का संकल्प' : 'Inclusive Social Welfare Commitment'}</span>
            </div>
          </div>

          {/* Mission */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-ngo-green-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-700 space-y-4 relative overflow-hidden">
            <div className="w-12 h-12 rounded-xl bg-white/10 text-ngo-gold-500 flex items-center justify-center font-bold">
              <Target className="w-6 h-6" />
            </div>

            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              {isHindi ? 'हमारा मिशन (Mission)' : 'Our Mission'}
            </h2>

            <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-normal">
              {isHindi
                ? 'शासन की समस्त जनकल्याणकारी योजनाओं को जन-जन तक पहुंचाना, साक्षरता व स्वास्थ्य सेवाओं को बढ़ावा देना, सामाजिक कुरीतियों का उन्मूलन करना और जल एवं पर्यावरण संरक्षण के माध्यम से सतत विकास सुनिश्चित करना।'
                : 'To bridge government welfare schemes to the grassroots, promote literacy and healthcare, eradicate social evils, and ensure sustainable development through water and environmental conservation.'}
            </p>

            <div className="pt-2 border-t border-slate-700 text-xs text-ngo-gold-500 font-semibold flex items-center gap-1.5">
              <Compass className="w-4 h-4" />
              <span>{isHindi ? '10 पंजीकृत विधान उद्देश्यों की प्राप्ति' : 'Pursuit of 10 Statutory Objectives'}</span>
            </div>
          </div>
        </div>

        {/* Guiding Principles */}
        <Section
          className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm"
          badge={isHindi ? 'नैतिक सिद्धांत' : 'Guiding Principles'}
          badgeVariant="gold"
          title={isHindi ? 'संस्था के मुख्य नैतिक मूल्य एवं सिद्धांत' : 'Core Values & Organizational Philosophy'}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs sm:text-sm">
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <ShieldCheck className="w-6 h-6 text-ngo-green-700" />
              <h3 className="font-bold text-slate-900 text-base">{isHindi ? 'सत्य निष्ठा व सेवा' : 'Integrity & Service'}</h3>
              <p className="text-slate-600 leading-relaxed">
                {isHindi ? 'निःस्वार्थ भाव से समाज के अंतिम व्यक्ति तक सहायता पहुंचाना।' : 'Serving the most vulnerable with honesty and dedication.'}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <Heart className="w-6 h-6 text-ngo-gold-700" />
              <h3 className="font-bold text-slate-900 text-base">{isHindi ? 'सहानुभूति व सम्मान' : 'Empathy & Respect'}</h3>
              <p className="text-slate-600 leading-relaxed">
                {isHindi ? 'बुजुर्गों, दिव्यांगों व महिलाओं के प्रति विशेष सम्मान व देखभाल।' : 'Deep care and dignity for seniors, women, and Divyangjan.'}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <Compass className="w-6 h-6 text-blue-700" />
              <h3 className="font-bold text-slate-900 text-base">{isHindi ? 'सामूहिक सहभागिता' : 'Collective Action'}</h3>
              <p className="text-slate-600 leading-relaxed">
                {isHindi ? 'युवाओं और समुदाय के सामूहिक प्रयासों से सतत परिवर्तन लाना।' : 'Empowering youth and community to drive sustained change.'}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <CheckCircle2 className="w-6 h-6 text-emerald-700" />
              <h3 className="font-bold text-slate-900 text-base">{isHindi ? 'पर्यावरण उत्तरदायित्व' : 'Eco Responsibility'}</h3>
              <p className="text-slate-600 leading-relaxed">
                {isHindi ? 'जल संरक्षण व वृक्षारोपण से प्रकृति की सुरक्षा।' : 'Safeguarding nature through tree planting and water conservation.'}
              </p>
            </div>
          </div>
        </Section>
      </Container>
    </div>
  );
};
