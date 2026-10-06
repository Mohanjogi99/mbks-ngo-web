import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Header } from '../components/common/Header';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { ErrorBoundary } from '../components/ui/ErrorState';
import { useLanguage } from '../context/LanguageContext';
import { Heart, Users } from 'lucide-react';

export const PublicLayout = () => {
  const { isHindi } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800 antialiased">
      {/* Top Header info bar */}
      <Header />

      {/* Main sticky navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Sticky Quick Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200/80 p-2.5 sm:hidden flex gap-2 shadow-lg">
        <NavLink to="/volunteer" className="flex-1">
          <button className="w-full py-2.5 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-300">
            <Users className="w-4 h-4 text-ngo-green-700" />
            <span>{isHindi ? 'स्वयंसेवक बनें' : 'Volunteer'}</span>
          </button>
        </NavLink>
        <NavLink to="/donate" className="flex-1">
          <button className="w-full py-2.5 px-3 rounded-lg bg-ngo-gold-700 hover:bg-ngo-gold-800 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md shadow-ngo-gold-700/20">
            <Heart className="w-4 h-4" />
            <span>{isHindi ? 'दान करें' : 'Donate Now'}</span>
          </button>
        </NavLink>
      </div>
    </div>
  );
};
