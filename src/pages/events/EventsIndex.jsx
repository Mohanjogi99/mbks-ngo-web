import React, { useState, useEffect } from 'react';
import { SEOHead } from '../../components/common/SEOHead';
import { NavLink } from 'react-router-dom';
import { Container } from '../../components/ui/Container';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { fetchEvents } from '../../services/firestoreService';
import { EVENTS_DATA } from '../../data/eventsData';
import { NGO_DETAILS } from '../../utils/constants';
import { useLanguage } from '../../context/LanguageContext';
import { Calendar, Clock, MapPin, FileCheck, ArrowRight } from 'lucide-react';

export const EventsIndex = () => {
  const { isHindi } = useLanguage();
  const [tab, setTab] = useState('upcoming');
  const [eventsList, setEventsList] = useState(EVENTS_DATA);

  useEffect(() => {
    let isMounted = true;
    const loadEvents = async () => {
      const data = await fetchEvents(tab);
      if (isMounted) {
        setEventsList(data);
      }
    };
    loadEvents();
    return () => { isMounted = false; };
  }, [tab]);

  const breadcrumbItems = [
    { labelHi: 'गतिविधियां एवं शिविर', labelEn: 'Events', path: '/events' },
  ];

  return (
    <div className="py-6 sm:py-8 bg-slate-50 min-h-screen">
      <SEOHead
        title="सामाजिक गतिविधियां एवं शिविर - जांजगीर-चांपा"
        description="मां-बाबूजी समिति द्वारा आयोजित आगामी एवं संपन्न सामाजिक गतिविधियां: रक्तदान शिविर, निःशुल्क स्वास्थ्य जांच, वृक्षारोपण एवं जागरूकता रैलियां।"
        canonicalUrl="https://mbks-cg.org/events"
      />
      <Container>
        <Breadcrumbs items={breadcrumbItems} />

        {/* Hero Banner */}
        <div className="bg-gradient-to-br from-ngo-green-950 via-ngo-green-900 to-slate-900 text-white rounded-2xl p-6 sm:p-10 shadow-xl border border-emerald-800 mb-8 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-ngo-gold-500 border border-white/20 text-xs font-semibold">
              <FileCheck className="w-4 h-4 text-ngo-gold-500" />
              <span>{NGO_DETAILS.regNo}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              {isHindi ? 'गतिविधियां, शिविर एवं जन-जागरूकता अभियान' : 'Events, Camps & Public Awareness Drives'}
            </h1>

            <p className="text-xs sm:text-base text-emerald-100/90 leading-relaxed font-normal">
              {isHindi
                ? 'मां-बाबूजी समिति द्वारा आयोजित स्वास्थ्य शिविर, रक्तदान अभियान, वृक्षारोपण एवं जनजागरूकता कार्यक्रम:'
                : 'Upcoming and concluded medical camps, blood donation drives, afforestation, and workshops in Janjgir-Champa:'}
            </p>
          </div>
        </div>

        {/* Status Tabs */}
        <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-xs mb-8 flex max-w-md mx-auto">
          <button
            onClick={() => setTab('upcoming')}
            className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-colors cursor-pointer ${
              tab === 'upcoming' ? 'bg-ngo-green-700 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {isHindi ? 'आगामी शिविर (Upcoming)' : 'Upcoming Drives'}
          </button>
          <button
            onClick={() => setTab('completed')}
            className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-colors cursor-pointer ${
              tab === 'completed' ? 'bg-ngo-green-700 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {isHindi ? 'संपन्न शिविर (Completed)' : 'Completed Events'}
          </button>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {eventsList.map((evt) => {
            const isUpcoming = evt.status === 'upcoming';
            return (
              <div
                key={evt.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-ngo overflow-hidden flex flex-col justify-between group hover:shadow-xl hover:border-ngo-green-500 transition-all duration-300"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img
                      src={evt.coverImage}
                      alt={isHindi ? evt.titleHi : evt.titleEn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant={isUpcoming ? 'green' : 'slate'}>
                        {isHindi ? evt.categoryHi : evt.categoryEn}
                      </Badge>
                    </div>
                    <div className="absolute bottom-3 right-3 text-[11px] font-bold px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-xs text-white">
                      {isHindi ? evt.statusLabelHi : evt.statusLabelEn}
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-ngo-gold-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 w-fit">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{isHindi ? evt.dateHi : evt.dateEn}</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 group-hover:text-ngo-green-700 transition-colors line-clamp-2 leading-snug">
                      {isHindi ? evt.titleHi : evt.titleEn}
                    </h3>

                    <div className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-ngo-green-700 shrink-0" />
                        <span>{isHindi ? evt.timeHi : evt.timeEn}</span>
                      </div>

                      <div className="flex items-start gap-2">
                        <MapPin className="w-3.5 h-3.5 text-ngo-gold-700 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{isHindi ? evt.venueHi : evt.venueEn}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <NavLink to={`/events/${evt.id}`}>
                    <Button variant="secondary" size="sm" icon={ArrowRight} iconPosition="right" className="w-full text-xs">
                      {isHindi ? 'पूर्ण विवरण देखें' : 'View Full Details'}
                    </Button>
                  </NavLink>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
};
