import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(() => (i18n && typeof i18n.language === 'string') ? i18n.language : 'hi');

  useEffect(() => {
    if (i18n && typeof i18n.language === 'string') {
      setCurrentLang(i18n.language);
    }
  }, [i18n?.language]);

  const toggleLanguage = () => {
    const safeLang = typeof currentLang === 'string' ? currentLang : 'hi';
    const nextLang = safeLang.startsWith('hi') ? 'en' : 'hi';
    if (i18n && i18n.changeLanguage) {
      i18n.changeLanguage(nextLang);
    }
    setCurrentLang(nextLang);
  };

  const setLanguage = (lang) => {
    if (i18n && i18n.changeLanguage) {
      i18n.changeLanguage(lang);
    }
    setCurrentLang(lang);
  };

  const isHindi = typeof currentLang === 'string' ? currentLang.startsWith('hi') : true;

  return (
    <LanguageContext.Provider value={{ currentLang: currentLang || 'hi', isHindi, toggleLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
