import React from 'react';
import { NavLink } from 'react-router-dom';
import { NGO_DETAILS, NGO_OBJECTIVES } from '../../utils/constants';
import { useLanguage } from '../../context/LanguageContext';
import { Container } from '../ui/Container';
import { MapPin, Phone, Mail, FileCheck, ShieldCheck, Heart } from 'lucide-react';

export const Footer = () => {
  const { isHindi } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t-4 border-ngo-gold-700">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          {/* Col 1: Organization Brief & Logo */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo.jpeg"
                alt="Maa-Babuji Jankalyan Samiti Logo"
                className="w-14 h-14 rounded-full border-2 border-ngo-gold-700 bg-white object-contain p-0.5"
              />
              <div>
                <h3 className="text-base font-bold text-white leading-tight">
                  {NGO_DETAILS.nameHi}
                </h3>
                <p className="text-xs text-ngo-gold-500 font-medium mt-0.5">
                  {NGO_DETAILS.nameEn}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {isHindi
                ? 'छत्तीसगढ़ शासन द्वारा पंजीकृत एक गैर-लाभकारी सामाजिक संस्था, जो शिक्षा, स्वास्थ्य, महिला सशक्तिकरण, जल संरक्षण एवं समाज कल्याण हेतु समर्पित है।'
                : 'A registered non-profit social organization in Chhattisgarh dedicated to education, health, women empowerment, water conservation, and community welfare.'}
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-800/60 text-xs text-emerald-300 font-medium">
              <FileCheck className="w-4 h-4 text-ngo-gold-500 shrink-0" />
              <span>{NGO_DETAILS.regNo}</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2 text-ngo-gold-500">
              {isHindi ? 'त्वरित नेविगेशन' : 'Quick Links'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <NavLink to="/about" className="hover:text-ngo-gold-500 transition-colors">
                  {isHindi ? '• संस्था का परिचय एवं इतिहास' : '• About Organization'}
                </NavLink>
              </li>
              <li>
                <NavLink to="/objectives" className="hover:text-ngo-gold-500 transition-colors">
                  {isHindi ? '• 10 मुख्य उद्देश्य' : '• 10 Mandated Objectives'}
                </NavLink>
              </li>
              <li>
                <NavLink to="/programs" className="hover:text-ngo-gold-500 transition-colors">
                  {isHindi ? '• जनकल्याणकारी कार्यक्रम' : '• Welfare Programs'}
                </NavLink>
              </li>
              <li>
                <NavLink to="/projects" className="hover:text-ngo-gold-500 transition-colors">
                  {isHindi ? '• जमीनी परियोजनाएं' : '• Field Projects'}
                </NavLink>
              </li>
              <li>
                <NavLink to="/events" className="hover:text-ngo-gold-500 transition-colors">
                  {isHindi ? '• आगामी गतिविधियां एवं शिविर' : '• Events & Camps'}
                </NavLink>
              </li>
              <li>
                <NavLink to="/reports" className="hover:text-ngo-gold-500 transition-colors">
                  {isHindi ? '• वार्षिक रिपोर्ट एवं दस्तावेज' : '• Reports & Documents'}
                </NavLink>
              </li>
              <li>
                <NavLink to="/volunteer" className="hover:text-ngo-gold-500 transition-colors">
                  {isHindi ? '• स्वयंसेवक आवेदन' : '• Volunteer Registration'}
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/login" className="text-slate-500 hover:text-slate-300 transition-colors">
                  {isHindi ? '• एडमिन लॉगिन पोर्टल' : '• Admin Login Portal'}
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Col 3: 10 Objectives preview */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2 text-ngo-gold-500">
              {isHindi ? 'मुख्य कार्य क्षेत्र' : 'Focus Objectives'}
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {NGO_OBJECTIVES.slice(0, 5).map((obj) => (
                <li key={obj.id} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-ngo-green-500 shrink-0" />
                  <span className="line-clamp-1">{isHindi ? obj.titleHi : obj.titleEn}</span>
                </li>
              ))}
              <li className="pt-1">
                <NavLink to="/objectives" className="text-ngo-gold-500 hover:underline font-semibold text-[11px]">
                  {isHindi ? '+ सभी 10 उद्देश्य देखें' : '+ View All 10 Objectives'} →
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Office Location */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2 text-ngo-gold-500">
              {isHindi ? 'प्रधान कार्यालय' : 'Headquarters'}
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-ngo-green-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  मु. भैसमुड़ी, पो. सिउंड, भाठा पारा, वार्ड न. 22, म.न. 651, थाना + तहसील + वि.ख. नवागढ़, जिला जांजगीर-चांपा (छ.ग.) पि.नं. 495668
                </span>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Phone className="w-4 h-4 text-ngo-gold-500 shrink-0" />
                <span>{NGO_DETAILS.contact.phone}</span>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{NGO_DETAILS.contact.email}</span>
              </div>

              <div className="pt-3">
                <NavLink to="/donate" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-ngo-gold-700 hover:bg-ngo-gold-800 text-white font-semibold text-xs transition-colors shadow-sm">
                  <Heart className="w-4 h-4" />
                  <span>{isHindi ? 'ऑनलाइन सहयोग करें' : 'Support Our Cause'}</span>
                </NavLink>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <ShieldCheck className="w-4 h-4 text-ngo-green-500 shrink-0" />
            <span>
              © {new Date().getFullYear()} {NGO_DETAILS.nameHi}. {isHindi ? 'सर्वाधिकार सुरक्षित।' : 'All Rights Reserved.'}
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <NavLink to="/privacy" className="hover:text-white transition-colors">
              {isHindi ? 'गोपनीयता नीति' : 'Privacy Policy'}
            </NavLink>
            <span>•</span>
            <NavLink to="/terms" className="hover:text-white transition-colors">
              {isHindi ? 'नियम एवं शर्तें' : 'Terms & Conditions'}
            </NavLink>
          </div>
        </div>
      </Container>
    </footer>
  );
};
