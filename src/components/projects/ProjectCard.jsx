import React from 'react';
import { NavLink } from 'react-router-dom';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useLanguage } from '../../context/LanguageContext';
import { MapPin, Users, Calendar, ArrowRight } from 'lucide-react';

export const ProjectCard = ({ project }) => {
  const { isHindi } = useLanguage();

  const isOngoing = project.status === 'ongoing';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-ngo overflow-hidden flex flex-col justify-between group hover:shadow-xl hover:border-ngo-green-500 transition-all duration-300">
      <div>
        {/* Cover Image & Status Badge */}
        <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-100">
          <img
            src={project.coverImage || '/data-01/WhatsApp Image 2026-10-05 at 7.30.40 PM4.jpeg'}
            alt={isHindi ? project.titleHi : project.titleEn}
            loading="lazy"
            decoding="async"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/data-01/WhatsApp Image 2026-10-05 at 7.30.40 PM4.jpeg';
            }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge variant="green">
              {isHindi ? project.categoryLabelHi : project.categoryLabelEn}
            </Badge>
          </div>
          <div className={`absolute bottom-3 right-3 text-[11px] font-bold px-2.5 py-1 rounded-md shadow-xs border ${
            isOngoing
              ? 'bg-amber-500 text-slate-900 border-amber-400'
              : 'bg-emerald-600 text-white border-emerald-500'
          }`}>
            {isHindi ? project.statusLabelHi : project.statusLabelEn}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-3">
          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-ngo-gold-700">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span>
              {isHindi
                ? `${project.location.villageHi}, ${project.location.blockHi}`
                : `${project.location.villageEn}, ${project.location.blockEn}`}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-base font-bold text-slate-900 group-hover:text-ngo-green-700 transition-colors line-clamp-2 leading-snug">
            {isHindi ? project.titleHi : project.titleEn}
          </h3>

          {/* Description */}
          <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
            {isHindi ? project.shortDescHi : project.shortDescEn}
          </p>

          {/* Dates & Beneficiaries Meta */}
          <div className="pt-2 border-t border-slate-100 space-y-2 text-xs text-slate-600">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-ngo-green-700" />
                <span className="font-semibold">{project.beneficiariesCount}</span> {isHindi ? 'लाभार्थी' : 'Beneficiaries'}
              </span>
              <span className="flex items-center gap-1 text-[11px] text-slate-500">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{project.startDate}</span>
              </span>
            </div>

            {/* Progress bar */}
            {isOngoing && (
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-bold">
                  <span className="text-slate-500">{isHindi ? 'प्रगति:' : 'Progress:'}</span>
                  <span className="text-ngo-green-700">{project.progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-ngo-green-600 to-ngo-gold-600 rounded-full"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-5 pt-0">
        <NavLink to={`/projects/${project.id}`}>
          <Button variant="secondary" size="sm" icon={ArrowRight} iconPosition="right" className="w-full text-xs">
            {isHindi ? 'परियोजना का विवरण देखें' : 'View Project Details'}
          </Button>
        </NavLink>
      </div>
    </div>
  );
};
