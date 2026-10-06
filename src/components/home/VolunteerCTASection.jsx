import React from 'react';
import { NavLink } from 'react-router-dom';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useLanguage } from '../../context/LanguageContext';
import { Users, HeartHandshake, CheckCircle2, ArrowRight } from 'lucide-react';

export const VolunteerCTASection = () => {
  const { isHindi } = useLanguage();

  const benefits = [
    isHindi ? 'अपनी सुविधानुसार समय देकर समाज सेवा का अवसर' : 'Flexible time contribution for social cause',
    isHindi ? 'संस्था द्वारा आधिकारिक स्वयंसेवक पहचान पत्र (ID Card)' : 'Official Volunteer Identity Card',
    isHindi ? 'सराहनीय सेवा हेतु अनुभव प्रमाण पत्र (Certificate)' : 'Service Appreciation Certificate',
    isHindi ? 'युवा नेतृत्व व व्यक्तित्व विकास का सुनहरा अवसर' : 'Leadership & personality development skills',
  ];

  return (
    <Section className="bg-gradient-to-br from-emerald-900 via-ngo-green-900 to-slate-900 text-white relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Heading & Content */}
        <div className="lg:col-span-7 space-y-6">
          <Badge variant="gold" className="text-xs">
            <HeartHandshake className="w-3.5 h-3.5 mr-1" />
            <span>{isHindi ? 'युवा शक्ति - राष्ट्र शक्ति' : 'Volunteer Movement'}</span>
          </Badge>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            {isHindi
              ? 'स्वयंसेवक के रूप में जुड़ें और समाज में लाएं सकारात्मक बदलाव'
              : 'Join as a Volunteer and Make a Real Difference'}
          </h2>

          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
            {isHindi
              ? 'यदि आपके पास समाज सेवा की तड़प है, और आप अपने ज्ञान, कौशल या समय का सदुपयोग करना चाहते हैं, तो मां-बाबूजी जनकल्याण समिति आपका हार्दिक स्वागत करती है।'
              : 'If you possess a passion for social upliftment and wish to contribute your skills, knowledge, or time, MBKS Chhattisgarh invites you with open arms.'}
          </p>

          <div className="space-y-2.5 pt-2">
            {benefits.map((b, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-emerald-100 font-medium">
                <CheckCircle2 className="w-4 h-4 text-ngo-gold-500 shrink-0" />
                <span>{b}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 flex flex-wrap gap-3">
            <NavLink to="/volunteer">
              <Button variant="gold" size="lg" icon={Users}>
                {isHindi ? 'निःशुल्क स्वयंसेवक पंजीकरण करें' : 'Apply as Volunteer'}
              </Button>
            </NavLink>
          </div>
        </div>

        {/* Right Column: Visual Card */}
        <div className="lg:col-span-5 bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/20 text-center space-y-4 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-ngo-gold-700 text-white flex items-center justify-center mx-auto shadow-lg">
            <Users className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white">
            {isHindi ? 'स्वयंसेवक पंजीयन प्रक्रिया' : 'Simple 3-Step Registration'}
          </h3>
          <ol className="text-xs text-emerald-100 space-y-2 text-left bg-black/20 p-4 rounded-xl border border-white/10">
            <li>1. {isHindi ? 'ऑनलाइन फॉर्म में अपनी मूलभूत जानकारी भरें' : 'Fill online application form'}</li>
            <li>2. {isHindi ? 'अपनी रुचि के कार्य क्षेत्र (10 उद्देश्य) चुनें' : 'Select preferred focus objective'}</li>
            <li>3. {isHindi ? 'समिति द्वारा सत्यापन पश्चात आईडी कार्ड प्राप्त करें' : 'Receive official ID card post verification'}</li>
          </ol>
          <NavLink to="/volunteer" className="block pt-2">
            <Button variant="outline" size="sm" icon={ArrowRight} iconPosition="right" className="w-full border-white text-white hover:bg-white/10">
              {isHindi ? 'फॉर्म अभी भरें' : 'Fill Form Now'}
            </Button>
          </NavLink>
        </div>
      </div>
    </Section>
  );
};
