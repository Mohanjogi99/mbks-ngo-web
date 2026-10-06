import React, { useState, useEffect } from 'react';
import { Container } from '../../components/ui/Container';
import { Section } from '../../components/ui/Section';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { fetchPublicReports, REPORT_CATEGORIES } from '../../services/adminReportsService';
import { NGO_DETAILS } from '../../utils/constants';
import { useLanguage } from '../../context/LanguageContext';
import {
  FileText,
  Download,
  Eye,
  Search,
  Calendar,
  ShieldCheck,
  Building2,
  FileCheck,
  CheckCircle2,
  AlertCircle,
  X,
  ExternalLink,
} from 'lucide-react';

export const ReportsIndex = () => {
  const { isHindi } = useLanguage();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewPdf, setPreviewPdf] = useState(null);

  const breadcrumbItems = [
    { labelHi: 'वार्षिक रिपोर्ट एवं प्रकाशन', labelEn: 'Reports & Publications', path: '/reports' },
  ];

  useEffect(() => {
    const loadReports = async () => {
      setLoading(true);
      const data = await fetchPublicReports(selectedCategory);
      setReports(data);
      setLoading(false);
    };
    loadReports();
  }, [selectedCategory]);

  const filteredReports = reports.filter((rep) => {
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = (rep.titleHi + ' ' + rep.titleEn).toLowerCase().includes(q);
      const matchYear = (rep.year || '').toLowerCase().includes(q);
      const matchDesc = (rep.descriptionHi || '').toLowerCase().includes(q);
      if (!matchTitle && !matchYear && !matchDesc) return false;
    }
    return true;
  });

  return (
    <div className="py-6 sm:py-8 bg-slate-50 min-h-screen">
      <Container>
        <Breadcrumbs items={breadcrumbItems} />

        {/* Hero Header */}
        <div className="bg-gradient-to-br from-ngo-green-950 via-ngo-green-900 to-slate-900 text-white rounded-2xl p-6 sm:p-10 shadow-xl border border-emerald-800 mb-8 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-ngo-gold-400 border border-white/20 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-ngo-gold-400" />
              <span>{NGO_DETAILS.regNo}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              {isHindi ? 'वार्षिक रिपोर्ट, ऑडिट एवं आधिकारिक प्रकाशन' : 'Annual Reports, Audits & Official Publications'}
            </h1>

            <p className="text-xs sm:text-base text-emerald-100/90 leading-relaxed font-normal">
              {isHindi
                ? 'मां-बाबूजी जनकल्याण समिति छत्तीसगढ़ की पूर्ण पारदर्शिता हेतु वार्षिक ऑडिट रिपोर्ट, परियोजना मूल्यांकन व नियम पुस्तिकाएं।'
                : 'Access public annual reports, audited financial balance sheets, project evaluation documents, and publications for complete organizational transparency.'}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-emerald-200">
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/15">
                <FileCheck className="w-4 h-4 text-ngo-gold-400" />
                <span>100% सार्वजनिक एवं सत्यापित प्रतिवेदन</span>
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/15">
                <Building2 className="w-4 h-4 text-ngo-gold-400" />
                <span>C.A. ऑडिटेड वित्तीय विवरण</span>
              </span>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search report by title, year..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ngo-green-700"
              />
            </div>

            <span className="text-xs text-slate-500 font-medium">
              कुल {filteredReports.length} प्रतिवेदन उपलब्ध
            </span>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-2 rounded-xl font-bold transition-all shrink-0 ${
                selectedCategory === 'all'
                  ? 'bg-ngo-green-800 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              सभी (All Reports)
            </button>
            {REPORT_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl font-bold transition-all shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-ngo-green-800 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {isHindi ? cat.labelHi : cat.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Reports Grid */}
        {loading ? (
          <div className="p-12 text-center text-slate-500 text-sm font-semibold">Loading publication records...</div>
        ) : filteredReports.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-2 max-w-md mx-auto my-8">
            <FileText className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-sm font-bold text-slate-700">कोई प्रतिवेदन उपलब्ध नहीं है</p>
            <p className="text-xs text-slate-500">चुने गए श्रेणी में कोई रिपोर्ट नहीं मिली।</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReports.map((report) => (
              <div
                key={report.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="green" size="sm" className="line-clamp-1">
                      {report.categoryHi || report.category}
                    </Badge>
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                      <Calendar className="w-3 h-3 text-amber-700" />
                      <span>{report.year}</span>
                    </span>
                  </div>

                  <div className="flex items-start gap-3 pt-1">
                    <div className="w-10 h-10 rounded-xl bg-red-50 text-red-700 font-bold flex items-center justify-center shrink-0 border border-red-200 group-hover:scale-105 transition-transform">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2">
                        {report.titleHi}
                      </h3>
                      <p className="text-[11px] text-slate-400 font-mono line-clamp-1">{report.titleEn}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {report.descriptionHi}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                    <span>प्रारूप: PDF Document</span>
                    <span className="font-mono font-bold text-slate-700">{report.fileSize || 'PDF'}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setPreviewPdf(report)}
                      className="py-2 px-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5 text-ngo-green-700" />
                      <span>{isHindi ? 'देखें (Preview)' : 'Preview PDF'}</span>
                    </button>

                    <a
                      href={report.pdfUrl}
                      target="_blank"
                      rel="noreferrer"
                      download
                      className="py-2 px-3 rounded-xl bg-ngo-green-800 text-white hover:bg-ngo-green-900 text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                    >
                      <Download className="w-3.5 h-3.5 text-ngo-gold-400" />
                      <span>{isHindi ? 'डाउनलोड' : 'Download'}</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PDF Preview Modal */}
        {previewPdf && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-2xl max-w-4xl w-full h-[85vh] shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
              <div className="bg-slate-900 text-white p-4 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-ngo-gold-400" />
                  <h3 className="font-bold text-sm sm:text-base text-white line-clamp-1">{previewPdf.titleHi}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={previewPdf.pdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 text-slate-300 hover:text-white rounded-lg"
                    title="Open Full Window"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button onClick={() => setPreviewPdf(null)} className="p-1.5 text-slate-400 hover:text-white rounded-lg">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex-1 bg-slate-100 p-2 relative">
                <iframe
                  src={previewPdf.pdfUrl}
                  title={previewPdf.titleHi}
                  className="w-full h-full rounded-xl border border-slate-300 bg-white"
                />
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};
