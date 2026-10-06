import React from 'react';
import { SEOHead } from '../components/common/SEOHead';
import { HeroSection } from '../components/home/HeroSection';
import { ImpactStatsSection } from '../components/home/ImpactStatsSection';
import { AboutSection } from '../components/home/AboutSection';
import { FocusAreasSection } from '../components/home/FocusAreasSection';
import { FeaturedProjectsSection } from '../components/home/FeaturedProjectsSection';
import { UpcomingEventsSection } from '../components/home/UpcomingEventsSection';
import { SuccessStoriesSection } from '../components/home/SuccessStoriesSection';
import { WhySupportUsSection } from '../components/home/WhySupportUsSection';
import { VolunteerCTASection } from '../components/home/VolunteerCTASection';
import { DonationCTASection } from '../components/home/DonationCTASection';
import { LatestNewsSection } from '../components/home/LatestNewsSection';
import { GalleryPreviewSection } from '../components/home/GalleryPreviewSection';
import { FinalCTASection } from '../components/home/FinalCTASection';

export const Home = () => {
  return (
    <div className="space-y-0">
      <SEOHead
        title="मुख्य पृष्ठ - जनसेवा व समाज कल्याण संस्था"
        description="मां-बाबूजी जनकल्याण समिति छत्तीसगढ़ (पंजीयन जावक क्र. 347, नवागढ़, जांजगीर-चांपा)। शिक्षा, स्वास्थ्य, महिला सशक्तिकरण, पर्यावरण एवं रक्तदान अभियानों हेतु समर्पित संस्था।"
        canonicalUrl="https://mbks-cg.org"
      />
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Impact Statistics Counters */}
      <ImpactStatsSection />

      {/* 3. About NGO */}
      <AboutSection />

      {/* 4. Our Focus Areas */}
      <FocusAreasSection />

      {/* 5. Featured Projects */}
      <FeaturedProjectsSection />

      {/* 6. Upcoming Events */}
      <UpcomingEventsSection />

      {/* 7. Impact / Success Stories */}
      <SuccessStoriesSection />

      {/* 8. Why Support Us */}
      <WhySupportUsSection />

      {/* 9. Volunteer CTA */}
      <VolunteerCTASection />

      {/* 10. Donation CTA */}
      <DonationCTASection />

      {/* 11. Latest News */}
      <LatestNewsSection />

      {/* 12. Photo Gallery Preview */}
      <GalleryPreviewSection />

      {/* 13. Final Call-to-Action */}
      <FinalCTASection />
    </div>
  );
};

export default Home;
