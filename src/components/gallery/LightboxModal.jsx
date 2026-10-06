import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin, Calendar } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const LightboxModal = ({ photo, onClose, onPrev, onNext, hasPrev, hasNext }) => {
  const { isHindi } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
      if (e.key === 'ArrowRight' && hasNext) onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  if (!photo) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-6 animate-fade-in">
      {/* Top Bar */}
      <div className="w-full flex items-center justify-between text-white border-b border-white/10 pb-3">
        <div>
          <h3 className="text-sm font-bold text-white">
            {isHindi ? photo.titleHi : photo.titleEn}
          </h3>
          <p className="text-[11px] text-ngo-gold-500 font-semibold">
            {isHindi ? photo.categoryLabelHi : photo.categoryLabelEn}
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
          title="Close (Esc)"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Center Main Photo with Prev/Next buttons */}
      <div className="relative flex-1 w-full max-w-5xl my-4 flex items-center justify-center">
        {hasPrev && (
          <button
            onClick={onPrev}
            className="absolute left-2 sm:left-4 z-10 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white transition-all cursor-pointer shadow-lg"
            title="Previous Photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        <img
          src={photo.imageUrl}
          alt={isHindi ? photo.titleHi : photo.titleEn}
          className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl border border-white/10"
        />

        {hasNext && (
          <button
            onClick={onNext}
            className="absolute right-2 sm:right-4 z-10 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white transition-all cursor-pointer shadow-lg"
            title="Next Photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Bottom Caption & Meta */}
      <div className="w-full max-w-3xl text-center bg-white/10 backdrop-blur-md p-3 sm:p-4 rounded-xl border border-white/10 text-white space-y-1">
        <p className="text-xs sm:text-sm text-slate-200">
          {isHindi ? photo.captionHi : photo.titleEn}
        </p>
        <div className="flex items-center justify-center gap-4 text-[11px] text-emerald-300 font-medium pt-1">
          {photo.locationHi && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-ngo-gold-500" />
              <span>{isHindi ? photo.locationHi : photo.locationEn}</span>
            </span>
          )}
          {photo.date && (
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-ngo-gold-500" />
              <span>{photo.date}</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
