import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { PublicLayout } from '../layouts/PublicLayout';
import { AdminLayout } from '../layouts/AdminLayout';
import { Home } from '../pages/Home';
import { FullPageLoader } from '../components/ui/Loading';

// Lazy-loaded Public Pages for Code-Splitting & Mobile Speed Optimization
const AboutMain = lazy(() => import('../pages/about/AboutMain').then((m) => ({ default: m.AboutMain })));
const VisionMission = lazy(() => import('../pages/about/VisionMission').then((m) => ({ default: m.VisionMission })));
const RegisteredObjectives = lazy(() => import('../pages/about/RegisteredObjectives').then((m) => ({ default: m.RegisteredObjectives })));
const OrganizationStructure = lazy(() => import('../pages/about/OrganizationStructure').then((m) => ({ default: m.OrganizationStructure })));

const ProgramsIndex = lazy(() => import('../pages/programs/ProgramsIndex').then((m) => ({ default: m.ProgramsIndex })));
const ProgramDetail = lazy(() => import('../pages/programs/ProgramDetail').then((m) => ({ default: m.ProgramDetail })));

const ProjectsIndex = lazy(() => import('../pages/projects/ProjectsIndex').then((m) => ({ default: m.ProjectsIndex })));
const ProjectDetail = lazy(() => import('../pages/projects/ProjectDetail').then((m) => ({ default: m.ProjectDetail })));

const EventsIndex = lazy(() => import('../pages/events/EventsIndex').then((m) => ({ default: m.EventsIndex })));
const EventDetail = lazy(() => import('../pages/events/EventDetail').then((m) => ({ default: m.EventDetail })));

const GalleryIndex = lazy(() => import('../pages/gallery/GalleryIndex').then((m) => ({ default: m.GalleryIndex })));

const NewsIndex = lazy(() => import('../pages/news/NewsIndex').then((m) => ({ default: m.NewsIndex })));
const NewsDetail = lazy(() => import('../pages/news/NewsDetail').then((m) => ({ default: m.NewsDetail })));

const VolunteerIndex = lazy(() => import('../pages/volunteer/VolunteerIndex').then((m) => ({ default: m.VolunteerIndex })));
const ImpactIndex = lazy(() => import('../pages/impact/ImpactIndex').then((m) => ({ default: m.ImpactIndex })));
const DonateIndex = lazy(() => import('../pages/donate/DonateIndex').then((m) => ({ default: m.DonateIndex })));
const ReportsIndex = lazy(() => import('../pages/reports/ReportsIndex').then((m) => ({ default: m.ReportsIndex })));
const ContactIndex = lazy(() => import('../pages/contact/ContactIndex').then((m) => ({ default: m.ContactIndex })));

// Lazy-loaded Admin Pages
const AdminLogin = lazy(() => import('../pages/admin/AdminLogin').then((m) => ({ default: m.AdminLogin })));
const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard').then((m) => ({ default: m.AdminDashboard })));
const ProjectsAdmin = lazy(() => import('../pages/admin/ProjectsAdmin').then((m) => ({ default: m.ProjectsAdmin })));
const VolunteersAdmin = lazy(() => import('../pages/admin/VolunteersAdmin').then((m) => ({ default: m.VolunteersAdmin })));
const DonationsAdmin = lazy(() => import('../pages/admin/DonationsAdmin').then((m) => ({ default: m.DonationsAdmin })));
const EventsAdmin = lazy(() => import('../pages/admin/EventsAdmin').then((m) => ({ default: m.EventsAdmin })));
const GalleryAdmin = lazy(() => import('../pages/admin/GalleryAdmin').then((m) => ({ default: m.GalleryAdmin })));
const ImpactAdmin = lazy(() => import('../pages/admin/ImpactAdmin').then((m) => ({ default: m.ImpactAdmin })));
const ReportsAdmin = lazy(() => import('../pages/admin/ReportsAdmin').then((m) => ({ default: m.ReportsAdmin })));
const SettingsAdmin = lazy(() => import('../pages/admin/SettingsAdmin').then((m) => ({ default: m.SettingsAdmin })));

const PagePlaceholder = lazy(() => import('../pages/public/PagePlaceholder').then((m) => ({ default: m.PagePlaceholder })));
const NotFound = lazy(() => import('../pages/NotFound').then((m) => ({ default: m.NotFound })));

export const AppRoutes = () => {
  return (
    <Suspense fallback={<FullPageLoader message="लोड हो रहा है... / Loading..." />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />

          {/* About Us Sub-routes */}
          <Route path="about" element={<AboutMain />} />
          <Route path="about/vision-mission" element={<VisionMission />} />
          <Route path="about/objectives" element={<RegisteredObjectives />} />
          <Route path="about/organization" element={<OrganizationStructure />} />
          <Route path="objectives" element={<RegisteredObjectives />} />

          {/* Programs Module Routes */}
          <Route path="programs" element={<ProgramsIndex />} />
          <Route path="programs/:slug" element={<ProgramDetail />} />

          {/* Projects Module Routes */}
          <Route path="projects" element={<ProjectsIndex initialStatus="all" />} />
          <Route path="projects/ongoing" element={<ProjectsIndex initialStatus="ongoing" />} />
          <Route path="projects/completed" element={<ProjectsIndex initialStatus="completed" />} />
          <Route path="projects/:projectId" element={<ProjectDetail />} />

          {/* Events Module Routes */}
          <Route path="events" element={<EventsIndex />} />
          <Route path="events/:eventId" element={<EventDetail />} />

          {/* Gallery Module Routes */}
          <Route path="gallery" element={<GalleryIndex />} />
          <Route path="gallery/photos" element={<GalleryIndex />} />
          <Route path="gallery/videos" element={<GalleryIndex />} />

          {/* News Module Routes */}
          <Route path="news" element={<NewsIndex />} />
          <Route path="news/:slug" element={<NewsDetail />} />

          {/* Volunteer & Impact Routes */}
          <Route path="volunteer" element={<VolunteerIndex />} />
          <Route path="impact" element={<ImpactIndex />} />

          <Route path="reports" element={<ReportsIndex />} />
          <Route path="donate" element={<DonateIndex />} />
          <Route path="contact" element={<ContactIndex />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="projects" element={<ProjectsAdmin />} />
          <Route path="events" element={<EventsAdmin />} />
          <Route path="volunteers" element={<VolunteersAdmin />} />
          <Route path="donations" element={<DonationsAdmin />} />
          <Route path="impact" element={<ImpactAdmin />} />
          <Route path="gallery" element={<GalleryAdmin />} />
          <Route path="reports" element={<ReportsAdmin />} />
          <Route path="settings" element={<SettingsAdmin />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
