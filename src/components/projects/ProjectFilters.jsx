import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Search, Filter, RotateCcw } from 'lucide-react';

export const ProjectFilters = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  categoryFilter,
  setCategoryFilter,
  locationFilter,
  setLocationFilter,
  onReset,
}) => {
  const { isHindi } = useLanguage();

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm mb-8 space-y-4">
      {/* Search & Reset Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full sm:flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isHindi ? 'परियोजना का नाम, स्थान या विषय खोजें...' : 'Search projects by title, location or category...'}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ngo-green-700 text-xs sm:text-sm bg-slate-50 focus:bg-white transition-all"
          />
        </div>

        {/* Reset Filters button */}
        {(searchQuery || statusFilter !== 'all' || categoryFilter !== 'all' || locationFilter !== 'all') && (
          <button
            onClick={onReset}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:text-red-600 hover:bg-red-50 border border-slate-200 transition-colors shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{isHindi ? 'फ़िल्टर रीसेट करें' : 'Reset Filters'}</span>
          </button>
        )}
      </div>

      {/* Filter Controls Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100 text-xs">
        {/* Status Filter Tabs */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-ngo-green-700" />
            <span>{isHindi ? 'स्थिति (Status):' : 'Status:'}</span>
          </label>
          <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setStatusFilter('all')}
              className={`py-1.5 text-center font-semibold rounded-md transition-colors ${
                statusFilter === 'all' ? 'bg-white text-ngo-green-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {isHindi ? 'सभी' : 'All'}
            </button>
            <button
              onClick={() => setStatusFilter('ongoing')}
              className={`py-1.5 text-center font-semibold rounded-md transition-colors ${
                statusFilter === 'ongoing' ? 'bg-white text-amber-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {isHindi ? 'जारी' : 'Ongoing'}
            </button>
            <button
              onClick={() => setStatusFilter('completed')}
              className={`py-1.5 text-center font-semibold rounded-md transition-colors ${
                statusFilter === 'completed' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {isHindi ? 'पूर्ण' : 'Done'}
            </button>
          </div>
        </div>

        {/* Category Area Dropdown */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1.5">
            {isHindi ? 'विषय क्षेत्र (Category):' : 'Category Area:'}
          </label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ngo-green-700 bg-white font-medium text-slate-700"
          >
            <option value="all">{isHindi ? 'सभी क्षेत्र (All Categories)' : 'All Categories'}</option>
            <option value="education">{isHindi ? 'शिक्षा (Education)' : 'Education'}</option>
            <option value="health">{isHindi ? 'स्वास्थ्य (Healthcare)' : 'Healthcare'}</option>
            <option value="water">{isHindi ? 'जल संरक्षण (Water)' : 'Water Conservation'}</option>
            <option value="women">{isHindi ? 'महिला सशक्तिकरण (Women)' : 'Women Welfare'}</option>
            <option value="environment">{isHindi ? 'पर्यावरण (Environment)' : 'Environment'}</option>
            <option value="youth">{isHindi ? 'युवा व बाल कल्याण (Youth/Child)' : 'Youth/Child'}</option>
          </select>
        </div>

        {/* Location Dropdown */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1.5">
            {isHindi ? 'स्थान (Location):' : 'Location:'}
          </label>
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ngo-green-700 bg-white font-medium text-slate-700"
          >
            <option value="all">{isHindi ? 'सभी स्थान (All Locations)' : 'All Locations'}</option>
            <option value="Bhaisamudi">{isHindi ? 'भैसमुड़ी (Bhaisamudi)' : 'Bhaisamudi'}</option>
            <option value="Siund">{isHindi ? 'सिउंड (Siund)' : 'Siund'}</option>
            <option value="Nawagarh">{isHindi ? 'नवागढ़ (Nawagarh)' : 'Nawagarh'}</option>
            <option value="Janjgir-Champa">{isHindi ? 'जांजगीर-चांपा (Janjgir-Champa)' : 'Janjgir-Champa'}</option>
          </select>
        </div>
      </div>
    </div>
  );
};
