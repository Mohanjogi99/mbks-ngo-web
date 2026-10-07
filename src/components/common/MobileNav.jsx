import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { NAVIGATION_LINKS, NGO_DETAILS } from '../../utils/constants';
import { useLanguage } from '../../context/LanguageContext';
import { Button } from '../ui/Button';
import { X, Heart, Users, Phone, MapPin, FileText } from 'lucide-react';

export const MobileNav = ({ isOpen, onClose }) => {
  const { isHindi } = useLanguage();

  // Disable background scrolling when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-2xl flex flex-col justify-between overflow-y-auto transform transition-transform">
        <div>
          {/* Header */}
          <div className="p-4 bg-ngo-green-950 text-white flex items-center justify-between border-b border-emerald-900">
            <div className="flex items-center gap-3">
              <img
                src="/logo.jpeg"
                alt="MBKS Logo"
                className="w-10 h-10 rounded-full border-2 border-ngo-gold-500 object-contain bg-white"
              />
              <div>
                <h3 className="text-xs font-bold leading-snug line-clamp-1">
                  {NGO_DETAILS.nameHi}
                </h3>
                <p className="text-[10px] text-ngo-gold-500 font-medium">
                  {isHindi ? 'पंजीकृत सामाजिक संस्था (छ.ग.)' : 'Registered NGO (C.G.)'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-white/10 text-white transition-colors"
              aria-label="Close Menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Quick Actions */}
          <div className="p-4 bg-slate-50 grid grid-cols-2 gap-2 border-b border-slate-200">
            <NavLink to="/donate" onClick={onClose}>
              <Button variant="gold" size="sm" icon={Heart} className="w-full">
                {isHindi ? 'दान करें' : 'Donate'}
              </Button>
            </NavLink>
            <NavLink to="/volunteer" onClick={onClose}>
              <Button variant="outline" size="sm" icon={Users} className="w-full">
                {isHindi ? 'स्वयंसेवक' : 'Volunteer'}
              </Button>
            </NavLink>
          </div>

          {/* Nav Links */}
          <nav className="p-4 space-y-1">
            {NAVIGATION_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-ngo-green-50 text-ngo-green-800 font-bold border-l-4 border-ngo-green-700'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`
                }
              >
                <span>{isHindi ? link.labelHi : link.labelEn}</span>
                <span className="text-xs text-slate-400">→</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Footer info in drawer */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 text-xs text-slate-600 space-y-2">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-ngo-green-700 shrink-0 mt-0.5" />
            <span>ग्राम भैसमुड़ी, पो. सिउंड, नवागढ़, जांजगीर-चांपा (छ.ग.) 495668</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-ngo-gold-700 shrink-0" />
            <span>{NGO_DETAILS.contact.phone}</span>
          </div>
          <div className="pt-2 text-center text-[10px] text-slate-400">
            © {new Date().getFullYear()} {NGO_DETAILS.nameEn}
          </div>
        </div>
      </div>
    </div>
  );
};
