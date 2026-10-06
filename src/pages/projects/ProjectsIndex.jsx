import React, { useState, useEffect } from 'react';
import { SEOHead } from '../../components/common/SEOHead';
import { useLocation } from 'react-router-dom';
import { Container } from '../../components/ui/Container';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { ProjectCard } from '../../components/projects/ProjectCard';
import { ProjectFilters } from '../../components/projects/ProjectFilters';
import { fetchProjects } from '../../services/firestoreService';
import { PROJECTS_DATA } from '../../data/projectsData';
import { NGO_DETAILS } from '../../utils/constants';
import { useLanguage } from '../../context/LanguageContext';
import { FileCheck, SearchX } from 'lucide-react';

export const ProjectsIndex = ({ initialStatus = 'all' }) => {
  const { isHindi } = useLanguage();
  const location = useLocation();

  const [projectsList, setProjectsList] = useState(PROJECTS_DATA);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState(initialStatus);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [loading, setLoading] = useState(false);

  // Sync route parameter (/projects/ongoing, /projects/completed)
  useEffect(() => {
    if (location.pathname.endsWith('/ongoing')) {
      setStatusFilter('ongoing');
    } else if (location.pathname.endsWith('/completed')) {
      setStatusFilter('completed');
    } else {
      setStatusFilter(initialStatus);
    }
  }, [location.pathname, initialStatus]);

  // Load from Firestore with automatic fallback
  useEffect(() => {
    let isMounted = true;
    const loadProjectsData = async () => {
      setLoading(true);
      const data = await fetchProjects(statusFilter);
      if (isMounted) {
        setProjectsList(data);
        setLoading(false);
      }
    };
    loadProjectsData();
    return () => { isMounted = false; };
  }, [statusFilter]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setCategoryFilter('all');
    setLocationFilter('all');
  };

  // Live filter logic
  const filteredProjects = projectsList.filter((proj) => {
    if (statusFilter !== 'all' && proj.status !== statusFilter) {
      return false;
    }
    if (categoryFilter !== 'all' && proj.category !== categoryFilter) {
      return false;
    }
    if (locationFilter !== 'all') {
      const locString = `${proj.location?.villageHi} ${proj.location?.villageEn} ${proj.location?.blockHi} ${proj.location?.blockEn}`;
      if (!locString.toLowerCase().includes(locationFilter.toLowerCase())) {
        return false;
      }
    }
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      const matchTitle = (proj.titleHi + ' ' + proj.titleEn).toLowerCase().includes(query);
      const matchDesc = (proj.shortDescHi + ' ' + proj.shortDescEn).toLowerCase().includes(query);
      if (!matchTitle && !matchDesc) {
        return false;
      }
    }
    return true;
  });

  const breadcrumbItems = [
    { labelHi: 'जमीनी परियोजनाएं', labelEn: 'Projects', path: '/projects' },
  ];

  return (
    <div className="py-6 sm:py-8 bg-slate-50 min-h-screen">
      <SEOHead
        title="फील्ड परियोजनाएं एवं कार्य - जांजगीर-चांपा"
        description="मां-बाबूजी जनकल्याण समिति द्वारा नवागढ़, भैसमुड़ी व सिउंड में संचालित एवं पूर्ण कल्याणकारी परियोजनाएं: कंप्यूटर कोचिंग, सिलाई केंद्र, जल संचयन व स्वास्थ्य शिविर।"
        canonicalUrl="https://mbks-cg.org/projects"
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
              {isHindi ? 'मां-बाबूजी जनकल्याण समिति की परियोजनाएं' : 'Field Projects & Initiatives'}
            </h1>

            <p className="text-xs sm:text-base text-emerald-100/90 leading-relaxed font-normal">
              {isHindi
                ? 'नवागढ़ एवं जांजगीर-चांपा जिले के गांवों में संचालित शिक्षा, स्वास्थ्य, जल संरक्षण, महिला स्वावलंबन एवं पर्यावरण परियोजनाएं:'
                : 'Active field projects delivering direct social impact across rural communities in Janjgir-Champa:'}
            </p>
          </div>
        </div>

        {/* Search & Filters */}
        <ProjectFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          locationFilter={locationFilter}
          setLocationFilter={setLocationFilter}
          onReset={handleResetFilters}
        />

        {/* Filter Results Summary */}
        <div className="flex items-center justify-between mb-6 text-xs text-slate-600 font-semibold px-1">
          <span>
            {isHindi
              ? `कुल ${filteredProjects.length} परियोजनाएं मिलीं`
              : `Found ${filteredProjects.length} project(s)`}
          </span>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm space-y-4 max-w-md mx-auto my-8">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <SearchX className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">
              {isHindi ? 'कोई परियोजना नहीं मिली' : 'No Projects Found'}
            </h3>
            <p className="text-xs text-slate-600">
              {isHindi
                ? 'आपके द्वारा चुने गए फ़िल्टर या खोज शब्द के अनुसार कोई परिणाम उपलब्ध नहीं है।'
                : 'No projects match your current search criteria.'}
            </p>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 bg-ngo-green-700 text-white text-xs font-semibold rounded-lg hover:bg-ngo-green-800 transition-colors"
            >
              {isHindi ? 'सभी फ़िल्टर हटाएं' : 'Reset All Filters'}
            </button>
          </div>
        )}
      </Container>
    </div>
  );
};
