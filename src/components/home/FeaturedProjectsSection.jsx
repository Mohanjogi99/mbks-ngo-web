import React from 'react';
import { NavLink } from 'react-router-dom';
import { Section } from '../ui/Section';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { FEATURED_PROJECTS } from '../../data/mockData';
import { useLanguage } from '../../context/LanguageContext';
import { MapPin, Users, ArrowRight } from 'lucide-react';

export const FeaturedProjectsSection = ({ projects = FEATURED_PROJECTS }) => {
  const { isHindi } = useLanguage();

  return (
    <Section
      badge={isHindi ? 'जमीनी परियोजनाएं' : 'Featured Field Projects'}
      badgeVariant="green"
      title={isHindi ? 'नवागढ़ एवं जांजगीर-चांपा में जारी परियोजनाएं' : 'Ongoing Field Projects in Janjgir-Champa'}
      subtitle={isHindi ? 'हमारे द्वारा चलाए जा रहे प्रमुख विकास एवं सहायता कार्यक्रम:' : 'Active ground initiatives impacting lives directly across rural communities:'}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="bg-white rounded-2xl border border-slate-200/90 shadow-ngo overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300"
          >
            <div>
              {/* Cover Image */}
              <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-100">
                <img
                  src={proj.imageUrl}
                  alt={isHindi ? proj.titleHi : proj.titleEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <Badge variant="green">{isHindi ? proj.categoryHi : proj.categoryEn}</Badge>
                </div>
                <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-md">
                  {isHindi ? proj.statusHi : proj.statusEn}
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-ngo-gold-700">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>{isHindi ? proj.locationHi : proj.locationEn}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-ngo-green-700 transition-colors line-clamp-2">
                  {isHindi ? proj.titleHi : proj.titleEn}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {isHindi ? proj.descriptionHi : proj.descriptionEn}
                </p>

                {/* Progress bar */}
                <div className="pt-2 space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-slate-700">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-ngo-green-700" />
                      <span>{proj.beneficiaries} / {proj.targetBeneficiaries} {isHindi ? 'लाभार्थी' : 'Target'}</span>
                    </span>
                    <span className="text-ngo-green-700">{proj.progress}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-ngo-green-600 to-ngo-gold-600 rounded-full"
                      style={{ width: `${proj.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="p-5 pt-0">
              <NavLink to={`/projects/${proj.id}`}>
                <Button variant="secondary" size="sm" icon={ArrowRight} iconPosition="right" className="w-full text-xs">
                  {isHindi ? 'परियोजना का विवरण देखें' : 'View Project Details'}
                </Button>
              </NavLink>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <NavLink to="/projects">
          <Button variant="outline" size="md" icon={ArrowRight} iconPosition="right">
            {isHindi ? 'सभी परियोजनाएं देखें' : 'View All Projects'}
          </Button>
        </NavLink>
      </div>
    </Section>
  );
};
