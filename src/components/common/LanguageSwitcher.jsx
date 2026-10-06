import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Globe } from 'lucide-react';

export const LanguageSwitcher = ({ className = '' }) => {
  const { isHindi, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all cursor-pointer ${className}`}
      title="भाषा बदलें / Change Language"
    >
      <Globe className="w-3.5 h-3.5" />
      <span>{isHindi ? 'English' : 'हिन्दी'}</span>
    </button>
  );
};
