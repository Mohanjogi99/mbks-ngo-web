import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { NGO_DETAILS } from '../../utils/constants';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { FileCheck, Heart, Users, ArrowDown, ShieldCheck, MapPin } from 'lucide-react';

export const HeroSection = () => {
  const { isHindi } = useLanguage();

  return (
    <div className="relative bg-gradient-to-br from-ngo-green-950 via-ngo-green-900 to-slate-900 text-white pt-12 pb-20 lg:pt-16 lg:pb-28 overflow-hidden select-none">
      {/* Decorative background glow blobs */}
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-ngo-gold-700/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-ngo-green-500/15 rounded-full blur-3xl pointer-events-none" />
      
      {/* Decorative subtle grid line pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`, backgroundSize: `24px 24px` }} 
      />

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
          {/* Top Registration Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold text-ngo-gold-500 shadow-md">
            <FileCheck className="w-4 h-4 shrink-0 text-ngo-gold-500" />
            <span>{NGO_DETAILS.regNo}</span>
            <span className="hidden xs:inline border-l border-white/20 pl-2 text-emerald-200">
              {isHindi ? 'छत्तीसगढ़ सोसायटी पंजीयन' : 'Registered CG Society'}
            </span>
          </div>

          {/* Official NGO Logo Emblem */}
          <div className="flex justify-center my-2">
            <div className="relative group">
              <img
                src="/logo.jpeg"
                alt="Maa-Babuji Jankalyan Samiti Official Emblem"
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-ngo-gold-700 shadow-2xl bg-white object-contain p-1.5 transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute -bottom-1 -right-1 bg-ngo-green-700 text-white rounded-full p-1 border-2 border-white shadow-md" title="Official Registered NGO Seal">
                <ShieldCheck className="w-5 h-5 text-ngo-gold-500" />
              </span>
            </div>
          </div>

          {/* Main Organization Title */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white drop-shadow-md">
              {NGO_DETAILS.nameHi}
            </h1>
            <p className="text-base sm:text-xl lg:text-2xl font-semibold text-ngo-gold-500 tracking-wide">
              {NGO_DETAILS.nameEn}
            </p>
          </div>

          {/* Location Badge */}
          <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-emerald-200 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800/80">
            <MapPin className="w-4 h-4 text-ngo-gold-500 shrink-0" />
            <span>
              {isHindi
                ? 'प्रधान कार्यालय: मु. भैसमुड़ी, पो. सिउंड, नवागढ़, जांजगीर-चांपा (छ.ग.)'
                : 'Headquarters: Vill. Bhaisamudi, Post: Siund, Nawagarh, Janjgir-Champa (C.G.)'}
            </span>
          </div>

          {/* Tagline & Short Description */}
          <p className="text-base sm:text-lg lg:text-xl text-emerald-100/90 max-w-2xl mx-auto leading-relaxed font-normal">
            {isHindi
              ? 'शिक्षा, स्वास्थ्य, महिला सशक्तिकरण, जल संरक्षण, पर्यावरण एवं समाज कल्याण हेतु समर्पित छत्तीसगढ़ की पंजीकृत गैर-लाभकारी सामाजिक संस्था।'
              : 'Dedicated to education, healthcare, women empowerment, water conservation, environment, and social welfare across Chhattisgarh.'}
          </p>

          {/* 3 Call-to-Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {/* CTA 1: हमारे कार्य देखें */}
            <a href="#focus-areas">
              <Button variant="outline-white" size="lg" icon={ArrowDown}>
                {isHindi ? 'हमारे कार्य देखें' : 'Explore Our Work'}
              </Button>
            </a>

            {/* CTA 2: स्वयंसेवक बनें */}
            <NavLink to="/volunteer">
              <Button variant="secondary" size="lg" icon={Users}>
                {isHindi ? 'स्वयंसेवक बनें' : 'Become a Volunteer'}
              </Button>
            </NavLink>

            {/* CTA 3: सहयोग करें */}
            <NavLink to="/donate">
              <Button variant="gold" size="lg" icon={Heart}>
                {isHindi ? 'सहयोग करें (Donate)' : 'Support Us'}
              </Button>
            </NavLink>
          </div>
        </div>
      </Container>
    </div>
  );
};
