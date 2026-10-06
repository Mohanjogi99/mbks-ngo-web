import React from 'react';
import { NavLink } from 'react-router-dom';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { NGO_DETAILS } from '../../utils/constants';
import { useLanguage } from '../../context/LanguageContext';
import { FileCheck, ShieldCheck, Heart, Award, ArrowRight, Building } from 'lucide-react';

export const AboutSection = () => {
  const { isHindi } = useLanguage();

  return (
    <Section
      badge={isHindi ? 'संस्था परिचय' : 'About NGO'}
      badgeVariant="green"
      title={isHindi ? 'मां-बाबूजी जनकल्याण समिति छत्तीसगढ़' : 'Maa-Babuji Jankalyan Samiti Chhattisgarh'}
      subtitle={isHindi ? 'छत्तीसगढ़ के ग्रामीण क्षेत्रों में जनकल्याण, विकास एवं समरसता हेतु समर्पित सामाजिक संस्था' : 'Dedicated to community welfare, rural development, and social harmony in Chhattisgarh'}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left text column */}
        <div className="lg:col-span-7 space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
          <p className="font-medium text-slate-900">
            {isHindi
              ? 'मां-बाबूजी जनकल्याण समिति छत्तीसगढ़ (पंजीयन जावक क्र. 347, दिनांक 26/05/2025) नवागढ़, जांजगीर-चांपा में स्थित एक पंजीकृत गैर-सरकारी गैर-लाभकारी संस्था है।'
              : 'Maa-Babuji Jankalyan Samiti Chhattisgarh (Reg. Dispatch No. 347, Dated 26/05/2025) is a registered non-governmental organization based in Nawagarh, Janjgir-Champa.'}
          </p>

          <p>
            {isHindi
              ? 'संस्था का मूल उद्देश्य समाज के निर्धन, वंचित एवं जरूरतमंद वर्गों तक स्वास्थ्य, शिक्षा, जल संरक्षण, महिला सशक्तिकरण एवं शासकीय कल्याणकारी योजनाओं का लाभ पहुंचाना है।'
              : 'Our mission is to extend healthcare, quality education, water conservation, women empowerment, and government welfare benefits to underprivileged sections of society.'}
          </p>

          {/* 3 Core Values Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-100 space-y-1">
              <ShieldCheck className="w-5 h-5 text-ngo-green-700" />
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                {isHindi ? '100% पारदर्शिता' : '100% Transparency'}
              </h4>
              <p className="text-[11px] text-slate-600">
                {isHindi ? 'लेखापरीक्षित व पंजीकृत।' : 'Fully audited & registered.'}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-100 space-y-1">
              <Award className="w-5 h-5 text-ngo-gold-700" />
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                {isHindi ? '10 मुख्य उद्देश्य' : '10 Objectives'}
              </h4>
              <p className="text-[11px] text-slate-600">
                {isHindi ? 'विधान अनुसार समर्पित।' : 'Statutory objectives.'}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-100 space-y-1">
              <Heart className="w-5 h-5 text-blue-700" />
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                {isHindi ? 'निःस्वार्थ जनसेवा' : 'Selfless Service'}
              </h4>
              <p className="text-[11px] text-slate-600">
                {isHindi ? 'निष्ठावान युवा नेटवर्क।' : 'Dedicated volunteer force.'}
              </p>
            </div>
          </div>
        </div>

        {/* Right Info Box */}
        <div className="lg:col-span-5">
          <div className="bg-gradient-to-br from-ngo-green-900 via-ngo-green-950 to-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-xl space-y-5 border border-emerald-800/80 relative overflow-hidden">
            <div className="flex items-center gap-4 border-b border-emerald-800/80 pb-4">
              <img
                src="/logo.jpeg"
                alt="Logo Seal"
                className="w-14 h-14 rounded-full border-2 border-ngo-gold-500 bg-white object-contain p-0.5"
              />
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base leading-tight">
                  {NGO_DETAILS.nameHi}
                </h3>
                <p className="text-xs text-ngo-gold-500 font-medium">
                  {NGO_DETAILS.regNo}
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-emerald-100">
              <div className="flex items-start gap-2.5">
                <Building className="w-4 h-4 text-ngo-gold-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  <strong>प्रधान कार्यालय:</strong> मु. भैसमुड़ी, पो. सिउंड, भाठा पारा, वार्ड न. 22, म.न. 651, नवागढ़, जांजगीर-चांपा (छ.ग.) 495668
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <FileCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><strong>सोसाइटी पंजीयन:</strong> नियम 3 के तहत स्वीकृत विधान</span>
              </div>
            </div>

            <div className="pt-2">
              <a href="/about" className="block">
                <Button variant="gold" size="sm" icon={ArrowRight} iconPosition="right" className="w-full">
                  {isHindi ? 'संस्था के बारे में विस्तार से पढ़ें' : 'Read Detailed History'}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
