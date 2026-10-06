import React, { useState, useEffect } from 'react';
import { Container } from '../../components/ui/Container';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { ReportUploadModal } from '../../components/admin/ReportUploadModal';
import { DeleteConfirmModal } from '../../components/admin/DeleteConfirmModal';
import {
  getAdminReports,
  createAdminReport,
  updateAdminReportStatus,
  deleteAdminReport,
  REPORT_CATEGORIES,
} from '../../services/adminReportsService';
import { useAuth } from '../../context/AuthContext';
import {
  FileText,
  Plus,
  Search,
  Eye,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Calendar,
  ExternalLink,
  Globe,
  EyeOff,
} from 'lucide-react';

export const ReportsAdmin = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Modals
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [deletingReport, setDeletingReport] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Toast
  const [toastMessage, setToastMessage] = useState(null);

  const loadReports = async () => {
    setLoading(true);
    const data = await getAdminReports();
    setReports(data);
    setLoading(false);
  };

  useEffect(() => {
    loadReports();
  }, []);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ text: msg, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleStatus = async (rep) => {
    const nextStatus = rep.status === 'published' ? 'draft' : 'published';
    try {
      await updateAdminReportStatus(rep.id, nextStatus, user?.uid);
      setReports((prev) =>
        prev.map((r) => (r.id === rep.id ? { ...r, status: nextStatus } : r))
      );
      showToast(
        nextStatus === 'published'
          ? `Report "${rep.titleHi}" is now Published on public portal!`
          : `Report "${rep.titleHi}" set to Draft.`
      );
    } catch (err) {
      showToast('Error updating status: ' + err.message, 'error');
    }
  };

  const handleCreateReport = async (formData) => {
    setUploading(true);
    try {
      const created = await createAdminReport(formData, user?.uid);
      setReports((prev) => [created, ...prev]);
      showToast('Report uploaded and published successfully!');
      setIsUploadOpen(false);
    } catch (err) {
      showToast('Error uploading report: ' + err.message, 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteTrigger = (rep) => {
    setDeletingReport(rep);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deletingReport) return;
    setDeleting(true);
    try {
      await deleteAdminReport(deletingReport.id);
      setReports((prev) => prev.filter((r) => r.id !== deletingReport.id));
      showToast('Report deleted permanently!');
      setIsDeleteOpen(false);
    } catch (err) {
      showToast('Error deleting report: ' + err.message, 'error');
    } finally {
      setDeleting(false);
    }
  };

  // Filter reports
  const filteredReports = reports.filter((rep) => {
    if (categoryFilter !== 'all' && rep.category !== categoryFilter) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = (rep.titleHi + ' ' + rep.titleEn).toLowerCase().includes(q);
      const matchYear = (rep.year || '').toLowerCase().includes(q);
      if (!matchTitle && !matchYear) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div
          className={`p-4 rounded-xl flex items-center justify-between text-xs sm:text-sm font-semibold shadow-md animate-fade-in ${
            toastMessage.type === 'error' ? 'bg-red-50 text-red-800 border border-red-200' : 'bg-emerald-50 text-emerald-900 border border-emerald-200'
          }`}
        >
          <div className="flex items-center gap-2">
            {toastMessage.type === 'error' ? <AlertCircle className="w-4 h-4 text-red-600" /> : <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-6 h-6 text-ngo-green-700" />
            <span>Reports & Publications Manager</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Upload PDF annual reports, financial audit balance sheets, and project assessments to Firebase Storage.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="primary" size="sm" icon={Plus} onClick={() => setIsUploadOpen(true)}>
            Upload New PDF Report
          </Button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search report title, year..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ngo-green-700"
          />
        </div>

        {/* Category Dropdown */}
        <div className="w-full sm:w-64">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ngo-green-700 bg-white font-medium"
          >
            <option value="all">All Categories (सभी श्रेणियां)</option>
            {REPORT_CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.labelHi} ({c.labelEn})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500 text-xs">Loading publication records...</div>
        ) : filteredReports.length === 0 ? (
          <div className="p-12 text-center text-slate-500 space-y-2">
            <FileText className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-sm font-semibold">No reports found matching criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
                <tr>
                  <th className="p-4">Report Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Period / Year</th>
                  <th className="p-4">Size</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredReports.map((rep) => {
                  const isPublished = rep.status === 'published';

                  return (
                    <tr key={rep.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-red-50 text-red-700 font-bold flex items-center justify-center border border-red-200 shrink-0">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 line-clamp-1">{rep.titleHi}</h4>
                            <p className="text-[11px] text-slate-400 font-mono line-clamp-1">{rep.titleEn}</p>
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        <Badge variant="green" size="sm">
                          {rep.categoryHi || rep.category}
                        </Badge>
                      </td>

                      <td className="p-4 font-mono font-bold text-slate-800">
                        {rep.year}
                      </td>

                      <td className="p-4 text-slate-500 font-mono text-xs">
                        {rep.fileSize || 'PDF'}
                      </td>

                      <td className="p-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                            isPublished
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : 'bg-slate-100 text-slate-700 border-slate-300'
                          }`}
                        >
                          {isPublished ? 'Published' : 'Draft'}
                        </span>
                      </td>

                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <a
                            href={rep.pdfUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 text-slate-500 hover:text-ngo-green-700 hover:bg-slate-100 rounded-lg"
                            title="View PDF Document"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>

                          <button
                            onClick={() => handleToggleStatus(rep)}
                            className={`p-1.5 rounded-lg transition-colors ${
                              isPublished ? 'text-amber-600 hover:bg-amber-50' : 'text-emerald-600 hover:bg-emerald-50'
                            }`}
                            title={isPublished ? 'Unpublish (Make Draft)' : 'Publish on Portal'}
                          >
                            {isPublished ? <EyeOff className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
                          </button>

                          <button
                            onClick={() => handleDeleteTrigger(rep)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                            title="Delete Report"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      <ReportUploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onSave={handleCreateReport}
        isLoading={uploading}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete PDF Report"
        itemName={deletingReport?.titleHi}
        isLoading={deleting}
      />
    </div>
  );
};
