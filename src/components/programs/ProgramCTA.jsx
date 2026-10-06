import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { useLanguage } from '../../context/LanguageContext';
import { Heart, Users } from 'lucide-react';

export const ProgramCTA = ({ programTitleHi, programTitleEn }) => {
  const { isHindi } = useLanguage();

  return (
    <div className="bg-gradient-to-r from-ngo-green-950 via-ngo-green-900 to-slate-900 text-white py-14">
      <Container className="text-center space-y-5 max-w-3xl">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          {isHindi
            ? `इस अभियान में हमारे साथ जुड़ें`
            : `Support & Participate in this Campaign`}
        </h2>
        <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
          {isHindi
            ? `आप स्वयंसेवक के रूप में समय देकर या ऑनलाइन सहयोग करके इस अभियान को सफल बना सकते हैं।`
            : `Contribute your time as a volunteer or provide financial support to scale this campaign.`}
        </p>

        <div className="pt-2 flex flex-wrap gap-4 justify-center">
          <NavLink to="/donate">
            <Button variant="gold" size="md" icon={Heart}>
              {isHindi ? 'ऑनलाइन दान करें (Donate)' : 'Donate Online'}
            </Button>
          </NavLink>
          <NavLink to="/volunteer">
            <Button variant="outline" size="md" icon={Users} className="border-white text-white hover:bg-white/10">
              {isHindi ? 'स्वयंसेवक के रूप में जुड़ें' : 'Join as Volunteer'}
            </Button>
          </NavLink>
        </div>
      </Container>
    </div>
  );
};
