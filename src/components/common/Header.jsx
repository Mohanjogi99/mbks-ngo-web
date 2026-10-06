import React from 'react';
import { NGO_DETAILS } from '../../utils/constants';
import { useLanguage } from '../../context/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MapPin, Phone, FileCheck, Mail } from 'lucide-react';
import { Container } from '../ui/Container';

export const Header = () => {
  const { isHindi } = useLanguage();

  return (
    <div className="bg-ngo-green-950 text-white text-xs py-2 border-b border-emerald-900/60 select-none">
      <Container className="flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* Left: Registration & Location */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-emerald-100/90">
          <div className="flex items-center gap-1.5 font-medium">
            <FileCheck className="w-3.5 h-3.5 text-ngo-gold-500 shrink-0" />
            <span className="text-ngo-gold-500 font-semibold">{NGO_DETAILS.regNo}</span>
          </div>
          <div className="hidden md:flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>{isHindi ? 'भैसमुड़ी, नवागढ़, जांजगीर-चांपा (छ.ग.)' : 'Bhaisamudi, Nawagarh, Janjgir-Champa (C.G.)'}</span>
          </div>
        </div>

        {/* Right: Helpline & Email & Language Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          <a
            href={`tel:${NGO_DETAILS.contact.phone.replace(/\s+/g, '')}`}
            className="flex items-center gap-1.5 hover:text-ngo-gold-500 transition-colors font-medium text-emerald-100"
          >
            <Phone className="w-3.5 h-3.5 text-ngo-gold-500 shrink-0" />
            <span className="font-semibold text-white">{NGO_DETAILS.contact.phone}</span>
          </a>
          <a
            href={`mailto:${NGO_DETAILS.contact.email}`}
            className="flex items-center gap-1.5 hover:text-ngo-gold-500 transition-colors text-emerald-200"
          >
            <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="font-medium text-emerald-100">{NGO_DETAILS.contact.email}</span>
          </a>
          <LanguageSwitcher />
        </div>
      </Container>
    </div>
  );
};
