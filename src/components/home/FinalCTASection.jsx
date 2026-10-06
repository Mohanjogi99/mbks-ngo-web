import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useLanguage } from '../../context/LanguageContext';
import { NGO_DETAILS } from '../../utils/constants';
import { Heart, Users, ShieldCheck, FileCheck } from 'lucide-react';

export const FinalCTASection = () => {
  const { isHindi } = useLanguage();

  return (
    <div className="relative bg-gradient-to-r from-ngo-green-950 via-ngo-green-900 to-slate-900 text-white py-16 lg:py-24 overflow-hidden border-t-4 border-ngo-gold-700">
      {/* Background logo watermark */}
      <img
        src="/logo.jpeg"
        alt="Watermark Emblem"
        className="w-96 h-96 absolute -right-20 -bottom-20 opacity-[0.04] rounded-full pointer-events-none"
      />

      <Container className="relative z-10 text-center space-y-6 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-ngo-gold-500">
          <FileCheck className="w-4 h-4 shrink-0 text-ngo-gold-500" />
          <span>{NGO_DETAILS.regNo}</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
          {isHindi
            ? 'आएं, हाथ मिलाकर एक समृद्ध और सशक्त समाज का निर्माण करें'
            : 'Let us Come Together to Build a Stronger, Self-Reliant Community'}
        </h2>

        <p className="text-emerald-100/90 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          {isHindi
            ? 'आपकी सहभागिता से किसी बालक को शिक्षा, किसी रोगी को उपचार और किसी परिवार को सम्मानजनक जीवन मिल सकता है।'
            : 'Your participation can give a child education, a patient healthcare, and a family a life of dignity across Chhattisgarh.'}
        </p>

        <div className="pt-4 flex flex-wrap gap-4 justify-center">
          <NavLink to="/donate">
            <Button variant="gold" size="lg" icon={Heart}>
              {isHindi ? 'ऑनलाइन दान करें (Donate)' : 'Donate Online Now'}
            </Button>
          </NavLink>

          <NavLink to="/volunteer">
            <Button variant="outline" size="lg" icon={Users} className="border-white text-white hover:bg-white/10">
              {isHindi ? 'स्वयंसेवक के रूप में जुड़ें' : 'Join as Volunteer'}
            </Button>
          </NavLink>
        </div>

        <div className="pt-6 flex items-center justify-center gap-2 text-xs text-emerald-300 font-medium">
          <ShieldCheck className="w-4 h-4 text-ngo-gold-500" />
          <span>{isHindi ? 'पंजीकृत सामाजिक संस्था • नवागढ़, जांजगीर-चांपा (छ.ग.)' : 'Registered Social NGO • Nawagarh, Janjgir-Champa (C.G.)'}</span>
        </div>
      </Container>
    </div>
  );
};
