import React from 'react';
import { SEOHead } from '../../components/common/SEOHead';
import { Container } from '../../components/ui/Container';
import { Section } from '../../components/ui/Section';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { AboutNavTabs } from '../../components/about/AboutNavTabs';
import { NGO_DETAILS } from '../../utils/constants';
import { useLanguage } from '../../context/LanguageContext';
import { Badge } from '../../components/ui/Badge';
import { FileCheck, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const RegisteredObjectives = () => {
  const { isHindi } = useLanguage();

  const breadcrumbItems = [
    { labelHi: 'हमारे बारे में', labelEn: 'About Us', path: '/about' },
    { labelHi: '10 पंजीकृत उद्देश्य', labelEn: '10 Objectives', path: '/about/objectives' },
  ];

  const categories = [
    {
      titleHi: '1. शासकीय योजनाएं एवं राष्ट्रीय कल्याण',
      titleEn: '1. Government Schemes & National Welfare',
      badge: 'शासकीय योजनाएं',
      colorCategory: 'green',
      objectives: [
        {
          id: 1,
          textHi: 'केन्द्र एवं राज्य शासन के समस्त जनकल्याणकारी योजनाओं का प्रचार-प्रसार करना।',
          textEn: 'Spreading widespread awareness regarding all Central and State government welfare schemes to the grassroots level.',
        },
        {
          id: 2,
          textHi: 'राष्ट्रीय कल्याण और समाज सेवा के कार्यक्रमों के संचालन में सहयोग करना जैसे :- परिवार कल्याण, टीकाकरण, शिक्षा को बढ़ावा, निरक्षरता उन्मूलन, महिला असमानता इत्यादि।',
          textEn: 'Supporting national welfare and social service programs including family welfare, immunization drives, educational promotion, literacy drives, and gender equality.',
        },
        {
          id: 4,
          textHi: 'राष्ट्रीय एकता सदभावना शांति एवं सामाजिक कार्य के क्षेत्र में कार्य करना।',
          textEn: 'Working actively in the fields of national integration, social harmony, peace, and community welfare.',
        },
      ],
    },
    {
      titleHi: '2. सामाजिक कुरीति उन्मूलन एवं सुधार',
      titleEn: '2. Eradication of Social Evils & Reform',
      badge: 'सामाजिक सुधार',
      colorCategory: 'red',
      objectives: [
        {
          id: 3,
          textHi: 'सामाजिक कुरीतियों के उन्मूलन में मदद करना जैसे दहेज प्रथा, लिंग असमानता, नशा मुक्ति, बाल विवाह, बालश्रम, जातिगत भेदभाव इत्यादि।',
          textEn: 'Helping eradicate social evils such as dowry, gender inequality, substance addiction, child marriage, child labor, and caste discrimination.',
        },
      ],
    },
    {
      titleHi: '3. युवा विकास, शिक्षा एवं कौशल प्रशिक्षण',
      titleEn: '3. Youth Development, Education & Skills',
      badge: 'युवा एवं शिक्षा',
      colorCategory: 'gold',
      objectives: [
        {
          id: 7,
          textHi: 'युवाओं के व्यक्तित्व विकास के लिए कार्य करना जैसे खेलकूद, सांस्कृतिक कार्यक्रम एवं अन्य गतिविधि इत्यादि।',
          textEn: 'Working for youth personality development through sports, cultural programs, and co-curricular activities.',
        },
        {
          id: 8,
          textHi: 'युवाओं के शिक्षा एवं व्यावसायिक शिक्षा के लिए कार्य करना।',
          textEn: 'Promoting formal education, digital literacy, and vocational skill-building workshops for youth.',
        },
        {
          id: 9,
          textHi: 'युवाओं को रक्तदान हेतु प्रोत्साहित करने के लिए कार्य करना।',
          textEn: 'Encouraging youth for voluntary blood donation and managing emergency blood assistance support.',
        },
      ],
    },
    {
      titleHi: '4. पर्यावरण, जल संरक्षण, वृद्धजन व दिव्यांग पुनर्वास',
      titleEn: '4. Environment, Water Conservation & Care',
      badge: 'पर्यावरण व पुनर्वास',
      colorCategory: 'blue',
      objectives: [
        {
          id: 5,
          textHi: 'पर्यावरण संरक्षण एवं संवर्धन के लिए कार्य करना।',
          textEn: 'Executing campaigns for environmental protection, afforestation, cleanliness, and ecological balance.',
        },
        {
          id: 6,
          textHi: 'वृद्धजन एवं दिव्यांगों के पुनर्वास के लिए कार्य करना।',
          textEn: 'Providing rehabilitation support, assistive device distribution, and care for senior citizens and persons with disabilities.',
        },
        {
          id: 10,
          textHi: 'जल संरक्षण के लिए कार्य करना।',
          textEn: 'Working actively for rainwater harvesting, pond restoration, and water preservation campaigns.',
        },
      ],
    },
  ];

  return (
    <div className="py-6 sm:py-8 bg-slate-50 min-h-screen">
      <SEOHead
        title="10 पंजीकृत संवैधानिक उद्देश्य - मां-बाबूजी समिति"
        description="सरकारी दस्तावेज क्र. 347 अनुसार संस्था के 10 मुख्य उद्देश्य: शासकीय योजनाओं का प्रचार, स्वास्थ्य, सामाजिक कुरीति उन्मूलन, राष्ट्रीय एकता, पर्यावरण, दिव्यांग सेवा व रक्तदान।"
        canonicalUrl="https://mbks-cg.org/about/objectives"
      />
      <Container>
        <Breadcrumbs items={breadcrumbItems} />
        <AboutNavTabs />

        {/* Title Header */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm mb-8 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Badge variant="gold" className="text-xs">
              <FileCheck className="w-3.5 h-3.5 mr-1" />
              <span>{NGO_DETAILS.regNo}</span>
            </Badge>
            <span className="text-xs text-slate-500 font-medium">
              {isHindi ? 'पंजीकृत विधान नियम 3 के अनुसार' : 'Under Registered Rule 3 Memorandum'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {isHindi ? 'सोसाइटी के 10 पंजीकृत संविधानिक उद्देश्य' : 'Official 10 Registered Society Objectives'}
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
            {isHindi
              ? 'छत्तीसगढ़ सोसाइटी रजिस्ट्रीकरण अधिनियम के तहत जारी आधिकारिक ज्ञापन (जावक क्र. 347, दिनांक 26/05/2025) में दर्ज संस्था के 10 मुख्य कार्य क्षेत्र निम्नलिखित 4 श्रेणियों में व्यवस्थित किए गए हैं:'
              : 'The official 10 objectives stated in the registration memorandum (Dispatch No. 347, Dated 26/05/2025) organized into 4 clear functional categories:'}
          </p>
        </div>

        {/* Categories List */}
        <div className="space-y-6">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4 hover:border-ngo-green-500 transition-colors"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span>{isHindi ? cat.titleHi : cat.titleEn}</span>
                </h2>
                <Badge variant={cat.colorCategory}>{cat.badge}</Badge>
              </div>

              <div className="space-y-3">
                {cat.objectives.map((obj) => (
                  <div
                    key={obj.id}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 flex items-start gap-3"
                  >
                    <span className="w-7 h-7 rounded-lg bg-ngo-green-700 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      #{obj.id.toString().padStart(2, '0')}
                    </span>
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-slate-900">
                        {isHindi ? `उद्देश्य क्रमांक ${obj.id}` : `Objective Clause ${obj.id}`}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        {isHindi ? obj.textHi : obj.textEn}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Legal Seal Note */}
        <div className="mt-8 bg-emerald-950 text-white p-6 rounded-2xl border border-emerald-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-ngo-gold-500 shrink-0" />
            <div>
              <h4 className="font-bold text-sm text-white">{NGO_DETAILS.nameHi}</h4>
              <p className="text-emerald-200">{NGO_DETAILS.regNo} | नवागढ़, जांजगीर-चांपा (छ.ग.)</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-ngo-gold-500 font-semibold bg-white/10 px-3 py-1.5 rounded-lg border border-white/20">
            <CheckCircle2 className="w-4 h-4" />
            <span>{isHindi ? 'सत्यापित विधान ज्ञापन' : 'Verified Statutory Memorandum'}</span>
          </div>
        </div>
      </Container>
    </div>
  );
};
