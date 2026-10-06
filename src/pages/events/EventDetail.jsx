import React from 'react';
import { SEOHead } from '../../components/common/SEOHead';
import { useParams, Navigate, NavLink } from 'react-router-dom';
import { Container } from '../../components/ui/Container';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { EVENTS_DATA } from '../../data/eventsData';
import { NGO_DETAILS } from '../../utils/constants';
import { useLanguage } from '../../context/LanguageContext';
import { Calendar, Clock, MapPin, Users, UserCheck, Phone, Heart, ArrowLeft, Image as ImageIcon } from 'lucide-react';

export const EventDetail = () => {
  const { eventId } = useParams();
  const { isHindi } = useLanguage();

  const event = EVENTS_DATA.find((e) => e.id === eventId);

  if (!event) {
    return <Navigate to="/events" replace />;
  }

  const breadcrumbItems = [
    { labelHi: 'गतिविधियां एवं शिविर', labelEn: 'Events', path: '/events' },
    { labelHi: event.titleHi, labelEn: event.titleEn, path: `/events/${event.id}` },
  ];

  const isUpcoming = event.status === 'upcoming';

  const eventSchema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    'name': event.titleHi,
    'description': event.descriptionHi,
    'startDate': event.date,
    'location': {
      '@type': 'Place',
      'name': event.venueHi,
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Nawagarh',
        'addressRegion': 'Chhattisgarh',
        'addressCountry': 'IN',
      },
    },
    'organizer': {
      '@type': 'Organization',
      'name': 'Maa-Babuji Jankalyan Samiti Chhattisgarh',
      'url': 'https://mbks-cg.org',
    },
  };

  return (
    <div className="py-6 sm:py-8 bg-slate-50 min-h-screen">
      <SEOHead
        title={`${event.titleHi} (${event.titleEn})`}
        description={`${event.descriptionHi} दिनांक: ${event.date}, स्थान: ${event.venueHi}। मां-बाबूजी जनकल्याण समिति।`}
        canonicalUrl={`https://mbks-cg.org/events/${event.id}`}
        ogImage={event.coverImage}
        schemaData={eventSchema}
      />
      <Container>
        <Breadcrumbs items={breadcrumbItems} />

        <div className="mb-4">
          <NavLink
            to="/events"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-ngo-green-700 hover:text-ngo-green-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{isHindi ? 'सभी गतिविधियों पर वापस जाएं' : 'Back to All Events'}</span>
          </NavLink>
        </div>

        {/* Header Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm mb-8 space-y-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Badge variant="green">{isHindi ? event.categoryHi : event.categoryEn}</Badge>
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                isUpcoming ? 'bg-emerald-100 text-emerald-900 border-emerald-300' : 'bg-slate-100 text-slate-800 border-slate-300'
              }`}>
                {isHindi ? event.statusLabelHi : event.statusLabelEn}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {isHindi ? event.titleHi : event.titleEn}
            </h1>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-video max-h-[400px] w-full bg-slate-100">
            <img src={event.coverImage} alt={isHindi ? event.titleHi : event.titleEn} className="w-full h-full object-cover" />
          </div>

          {/* Key Meta Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm">
            <div className="space-y-1">
              <span className="text-slate-500 font-semibold block">{isHindi ? 'दिनांक:' : 'Date:'}</span>
              <span className="font-bold text-ngo-gold-800 flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{isHindi ? event.dateHi : event.dateEn}</span>
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-slate-500 font-semibold block">{isHindi ? 'समय:' : 'Time:'}</span>
              <span className="font-bold text-slate-900 flex items-center gap-1">
                <Clock className="w-4 h-4 text-ngo-green-700" />
                <span>{isHindi ? event.timeHi : event.timeEn}</span>
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-slate-500 font-semibold block">{isHindi ? 'स्थान:' : 'Venue:'}</span>
              <span className="font-bold text-slate-900 flex items-center gap-1">
                <MapPin className="w-4 h-4 text-ngo-gold-700 shrink-0" />
                <span className="line-clamp-1">{isHindi ? event.venueHi : event.venueEn}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Event Description & Organizer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
              {isHindi ? 'कार्यक्रम विवरण' : 'Event Description'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
              {isHindi ? event.descriptionHi : event.descriptionEn}
            </p>
          </div>

          <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-ngo-green-700" />
              <span>{isHindi ? 'आयोजक एवं संपर्क' : 'Organizer Contact'}</span>
            </h3>
            <div className="space-y-2 text-xs text-slate-700">
              <p><strong>आयोजक:</strong> {isHindi ? event.organizerHi : event.organizerEn}</p>
              <p><strong>संपर्क व्यक्ति:</strong> {event.contactPerson}</p>
              <p><strong>संस्था पंजीयन:</strong> {NGO_DETAILS.regNo}</p>
            </div>

            {isUpcoming && (
              <div className="pt-2">
                <NavLink to="/volunteer" className="block">
                  <Button variant="primary" size="sm" icon={Users} className="w-full text-xs">
                    {isHindi ? 'भाग लेने हेतु पंजीकृत हों' : 'Register for Event'}
                  </Button>
                </NavLink>
              </div>
            )}
          </div>
        </div>

        {/* Photos (Completed Events) */}
        {event.photos?.length > 0 && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-sm mb-8 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <ImageIcon className="w-5 h-5 text-ngo-gold-700" />
              <span>{isHindi ? 'कार्यक्रम की झलकियां (Photos)' : 'Event Photos'}</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {event.photos.map((photoUrl, idx) => (
                <div key={idx} className="h-44 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                  <img src={photoUrl} alt="Event" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};
