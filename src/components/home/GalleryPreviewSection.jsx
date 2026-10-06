import React from 'react';
import { NavLink } from 'react-router-dom';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { GALLERY_PREVIEW } from '../../data/mockData';
import { useLanguage } from '../../context/LanguageContext';
import { Image as ImageIcon, ArrowRight } from 'lucide-react';

export const GalleryPreviewSection = ({ items = GALLERY_PREVIEW }) => {
  const { isHindi } = useLanguage();

  return (
    <Section
      background="light"
      badge={isHindi ? 'चित्र प्रदर्शनी' : 'Photo Gallery Preview'}
      badgeVariant="gold"
      title={isHindi ? 'जमीनी सामाजिक कार्यों की झलकियां' : 'Glance at Our Social Initiatives in Action'}
      subtitle={isHindi ? 'नवागढ़ एवं आसपास आयोजित स्वास्थ्य शिविर, रक्तदान, वृक्षारोपण एवं शिक्षा अभियानों के दृश्य:' : 'Photographic evidence of medical camps, afforestation, education drives, and water conservation:'}
    >
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {items.map((img) => (
          <div
            key={img.id}
            className="group relative h-40 sm:h-48 rounded-xl overflow-hidden shadow-sm border border-slate-200 cursor-pointer"
          >
            <img
              src={img.imageUrl}
              alt={isHindi ? img.titleHi : img.titleEn}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 flex flex-col justify-end text-white">
              <span className="text-[10px] font-bold uppercase tracking-wider text-ngo-gold-500">
                {img.category}
              </span>
              <h4 className="text-xs font-bold line-clamp-1">
                {isHindi ? img.titleHi : img.titleEn}
              </h4>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <NavLink to="/gallery">
          <Button variant="outline" size="md" icon={ImageIcon}>
            {isHindi ? 'संपूर्ण फोटो एवं वीडियो गैलरी देखें' : 'View Full Photo & Video Gallery'}
          </Button>
        </NavLink>
      </div>
    </Section>
  );
};
