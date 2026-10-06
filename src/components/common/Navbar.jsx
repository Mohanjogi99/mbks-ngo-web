import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { NAVIGATION_LINKS, NGO_DETAILS } from '../../utils/constants';
import { useLanguage } from '../../context/LanguageContext';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { MobileNav } from './MobileNav';
import { Menu, Heart, Users, ShieldCheck } from 'lucide-react';

export const Navbar = () => {
  const { isHindi } = useLanguage();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200/80">
      <Container className="flex items-center justify-between h-20">
        {/* Brand identity: Official Logo Emblem only */}
        <NavLink to="/" className="flex items-center group" title={NGO_DETAILS.nameHi}>
          <div className="relative shrink-0">
            <img
              src="/logo.jpeg"
              alt="Maa-Babuji Jankalyan Samiti Official Logo"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-ngo-gold-700 shadow-md object-contain bg-white group-hover:scale-105 transition-transform duration-200"
            />
            <span className="absolute -bottom-1 -right-1 bg-ngo-green-700 text-white rounded-full p-0.5 border border-white" title="Registered NGO">
              <ShieldCheck className="w-3.5 h-3.5 text-ngo-gold-400" />
            </span>
          </div>
        </NavLink>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {NAVIGATION_LINKS.slice(0, 6).map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `px-3 py-2 text-sm font-medium transition-colors relative rounded-md ${
                  isActive
                    ? 'text-ngo-green-800 font-bold bg-ngo-green-50'
                    : 'text-slate-700 hover:text-ngo-green-700 hover:bg-slate-50'
                }`
              }
            >
              {isHindi ? link.labelHi : link.labelEn}
            </NavLink>
          ))}
          
          {/* More menu dropdown indicator or extra links */}
          <NavLink
            to="/reports"
            className={({ isActive }) =>
              `px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                isActive
                  ? 'text-ngo-green-800 font-bold bg-ngo-green-50'
                  : 'text-slate-700 hover:text-ngo-green-700 hover:bg-slate-50'
              }`
            }
          >
            {isHindi ? 'रिपोर्ट्स' : 'Reports'}
          </NavLink>
        </nav>

        {/* Desktop CTA Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <NavLink to="/volunteer">
            <Button variant="outline" size="sm" icon={Users}>
              {isHindi ? 'स्वयंसेवक' : 'Volunteer'}
            </Button>
          </NavLink>

          <NavLink to="/donate">
            <Button variant="gold" size="sm" icon={Heart}>
              {isHindi ? 'दान करें' : 'Donate'}
            </Button>
          </NavLink>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setIsMobileNavOpen(true)}
          className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 hover:text-ngo-green-700 focus:outline-none focus:ring-2 focus:ring-ngo-green-700 transition-colors"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </Container>

      {/* Mobile Drawer Navigation */}
      <MobileNav isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
    </header>
  );
};
