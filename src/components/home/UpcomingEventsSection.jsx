import React from 'react';
import { NavLink } from 'react-router-dom';
import { Section } from '../ui/Section';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { UPCOMING_EVENTS } from '../../data/mockData';
import { useLanguage } from '../../context/LanguageContext';
import { Calendar, Clock, MapPin, Users, ArrowRight } from 'lucide-react';

export const UpcomingEventsSection = ({ events = UPCOMING_EVENTS }) => {
  const { isHindi } = useLanguage();

  return (
    <Section
      background="light"
      badge={isHindi ? 'आगामी गतिविधियां' : 'Upcoming Events & Drives'}
      badgeVariant="gold"
      title={isHindi ? 'आगामी शिविर एवं जागरूकता कार्यक्रम' : 'Upcoming Social Campaigns & Camps'}
      subtitle={isHindi ? 'आप भी इन अभियानों में भाग लेकर या स्वयंसेवक बनकर समाज सेवा में योगदान दें:' : 'Participate or volunteer in our upcoming field drives across Nawagarh and Janjgir-Champa:'}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {events.map((evt) => (
          <div
            key={evt.id}
            className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-ngo flex flex-col justify-between hover:border-ngo-green-500 transition-all duration-300 group"
          >
            <div className="space-y-4">
              {/* Category & Date badge */}
              <div className="flex items-center justify-between">
                <Badge variant="green">{isHindi ? evt.categoryHi : evt.categoryEn}</Badge>
                <div className="flex items-center gap-1 text-xs font-bold text-ngo-gold-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{isHindi ? evt.dateHi : evt.dateEn}</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-slate-900 group-hover:text-ngo-green-700 transition-colors">
                {isHindi ? evt.titleHi : evt.titleEn}
              </h3>

              {/* Details */}
              <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-ngo-green-700 shrink-0" />
                  <span>{isHindi ? evt.timeHi : evt.timeEn}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-ngo-gold-700 shrink-0 mt-0.5" />
                  <span>{isHindi ? evt.venueHi : evt.venueEn}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>
                    {isHindi ? 'आवश्यक स्वयंसेवक:' : 'Volunteers needed:'}{' '}
                    <strong className="text-slate-800">{evt.registeredVolunteers} / {evt.volunteersNeeded}</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-6 pt-4 border-t border-slate-100">
              <NavLink to="/volunteer">
                <Button variant="primary" size="sm" icon={ArrowRight} iconPosition="right" className="w-full text-xs">
                  {isHindi ? 'भाग लेने हेतु पंजीकृत हों' : 'Register for Event'}
                </Button>
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};
