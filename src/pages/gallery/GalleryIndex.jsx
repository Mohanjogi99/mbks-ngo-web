import React, { useState, useEffect } from 'react';
import { SEOHead } from '../../components/common/SEOHead';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container } from '../../components/ui/Container';
import { Section } from '../../components/ui/Section';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { Badge } from '../../components/ui/Badge';
import { LightboxModal } from '../../components/gallery/LightboxModal';
import { PHOTOS_DATA, VIDEOS_DATA, GALLERY_CATEGORIES } from '../../data/galleryData';
import { NGO_DETAILS } from '../../utils/constants';
import { useLanguage } from '../../context/LanguageContext';
import { Image as ImageIcon, Video, FileCheck, Maximize2, Play } from 'lucide-react';

export const GalleryIndex = () => {
  const { isHindi } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  // Tab: 'photos' | 'videos'
  const [activeTab, setActiveTab] = useState('photos');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Lightbox state
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    if (location.pathname.endsWith('/videos')) {
      setActiveTab('videos');
    } else {
      setActiveTab('photos');
    }
  }, [location.pathname]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'videos') {
      navigate('/gallery/videos');
    } else {
      navigate('/gallery/photos');
    }
  };

  // Filtered Photos
  const filteredPhotos = PHOTOS_DATA.filter((p) => {
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  });

  const activePhoto = lightboxIndex !== null ? filteredPhotos[lightboxIndex] : null;

  const breadcrumbItems = [
    { labelHi: 'गैलरी', labelEn: 'Gallery', path: '/gallery' },
    { labelHi: activeTab === 'photos' ? 'फोटो गैलरी' : 'वीडियो गैलरी', labelEn: activeTab === 'photos' ? 'Photos' : 'Videos', path: location.pathname },
  ];

  return (
    <div className="py-6 sm:py-8 bg-slate-50 min-h-screen">
      <SEOHead
        title="फोटो व वीडियो गैलरी - मां-बाबूजी समिति"
        description="मां-बाबूजी जनकल्याण समिति द्वारा आयोजित रक्तदान शिविर, स्वास्थ्य शिविर, वृक्षारोपण एवं सिलाई केंद्र की HD तस्वीरें व वीडियो गैलरी।"
        canonicalUrl="https://mbks-cg.org/gallery"
      />
      <Container>
        <Breadcrumbs items={breadcrumbItems} />

        {/* Hero Header */}
        <div className="bg-gradient-to-br from-ngo-green-950 via-ngo-green-900 to-slate-900 text-white rounded-2xl p-6 sm:p-10 shadow-xl border border-emerald-800 mb-8 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-ngo-gold-500 border border-white/20 text-xs font-semibold">
              <FileCheck className="w-4 h-4 text-ngo-gold-500" />
              <span>{NGO_DETAILS.regNo}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              {isHindi ? 'चित्र एवं वीडियो प्रदर्शनी (गैलरी)' : 'Photo & Video Activity Gallery'}
            </h1>

            <p className="text-xs sm:text-base text-emerald-100/90 leading-relaxed font-normal">
              {isHindi
                ? 'नवागढ़ एवं जांजगीर-चांपा जिले के ग्रामीण क्षेत्रों में आयोजित स्वास्थ्य शिविर, रक्तदान, वृक्षारोपण एवं शिक्षा अभियानों के चित्र:'
                : 'Photographic & video records of healthcare camps, afforestation, education drives, and water conservation initiatives:'}
            </p>
          </div>
        </div>

        {/* Main Tab Switcher (Photos / Videos) */}
        <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-xs mb-6 flex max-w-sm mx-auto">
          <button
            onClick={() => handleTabChange('photos')}
            className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'photos' ? 'bg-ngo-green-700 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>{isHindi ? 'फोटो गैलरी (Photos)' : 'Photo Gallery'}</span>
          </button>
          <button
            onClick={() => handleTabChange('videos')}
            className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'videos' ? 'bg-ngo-green-700 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>{isHindi ? 'वीडियो (Videos)' : 'Video Gallery'}</span>
          </button>
        </div>

        {/* Category Pills Filter (For Photos) */}
        {activeTab === 'photos' && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-6 whitespace-nowrap">
            {GALLERY_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-ngo-gold-700 text-white border-ngo-gold-800 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {isHindi ? cat.labelHi : cat.labelEn}
              </button>
            ))}
          </div>
        )}

        {/* Render Photos Grid */}
        {activeTab === 'photos' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredPhotos.map((photo, index) => (
              <div
                key={photo.id}
                onClick={() => setLightboxIndex(index)}
                className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-100">
                  <img
                    src={photo.thumbUrl}
                    alt={isHindi ? photo.titleHi : photo.titleEn}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge variant="green" size="sm">
                      {isHindi ? photo.categoryLabelHi : photo.categoryLabelEn}
                    </Badge>
                  </div>
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <div className="p-2 rounded-full bg-white/20 backdrop-blur-md">
                      <Maximize2 className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>

                <div className="p-3.5 space-y-1">
                  <h3 className="text-xs font-bold text-slate-900 line-clamp-1 group-hover:text-ngo-green-700 transition-colors">
                    {isHindi ? photo.titleHi : photo.titleEn}
                  </h3>
                  <p className="text-[11px] text-slate-500 line-clamp-1">{photo.locationHi}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Render Videos Grid */}
        {activeTab === 'videos' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VIDEOS_DATA.map((video) => (
              <div key={video.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-3 p-4">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-black shadow-inner">
                  <iframe
                    src={video.youtubeUrl}
                    title={isHindi ? video.titleHi : video.titleEn}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="space-y-1">
                  <Badge variant="gold" size="sm">{video.categoryLabelHi}</Badge>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug">
                    {isHindi ? video.titleHi : video.titleEn}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Lightbox Modal */}
        {lightboxIndex !== null && (
          <LightboxModal
            photo={activePhoto}
            onClose={() => setLightboxIndex(null)}
            onPrev={() => setLightboxIndex((prev) => (prev > 0 ? prev - 1 : filteredPhotos.length - 1))}
            onNext={() => setLightboxIndex((prev) => (prev < filteredPhotos.length - 1 ? prev + 1 : 0))}
            hasPrev={filteredPhotos.length > 1}
            hasNext={filteredPhotos.length > 1}
          />
        )}
      </Container>
    </div>
  );
};
