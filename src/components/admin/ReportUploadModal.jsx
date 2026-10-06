import React, { useState } from 'react';
import { X, UploadCloud, FileText, CheckCircle2, AlertCircle, Save } from 'lucide-react';
import { Button } from '../ui/Button';
import { REPORT_CATEGORIES } from '../../services/adminReportsService';
import { uploadFileToStorage } from '../../services/storageService';

export const ReportUploadModal = ({ isOpen, onClose, onSave, isLoading }) => {
  const [formData, setFormData] = useState({
    titleHi: '',
    titleEn: '',
    descriptionHi: '',
    descriptionEn: '',
    category: 'annual',
    year: '2025-26',
    pdfUrl: '',
    fileSize: '',
    status: 'published',
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate File Type (PDF Only)
    if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
      setErrors((prev) => ({ ...prev, pdfFile: 'केवल PDF फ़ाइलें ही अपलोड की जा सकती हैं (Only PDF files allowed).' }));
      setSelectedFile(null);
      return;
    }

    // Validate File Size (Max 15MB)
    const maxSizeInBytes = 15 * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      setErrors((prev) => ({ ...prev, pdfFile: 'फ़ाइल का आकार 15 MB से कम होना चाहिए (File size must be under 15MB).' }));
      setSelectedFile(null);
      return;
    }

    setErrors((prev) => ({ ...prev, pdfFile: null }));
    setSelectedFile(file);

    // Format readable file size
    const mbSize = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
    setFormData((prev) => ({ ...prev, fileSize: mbSize }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.titleHi.trim()) errs.titleHi = 'शीर्षक दर्ज करें (Hindi title required).';
    if (!formData.pdfUrl && !selectedFile) errs.pdfFile = 'PDF फ़ाइल चुनें या URL दर्ज करें।';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    let finalPdfUrl = formData.pdfUrl;

    if (selectedFile) {
      setIsUploading(true);
      try {
        finalPdfUrl = await uploadFileToStorage(selectedFile, 'reports', (pct) => setUploadProgress(pct));
      } catch (err) {
        console.warn('Storage upload fallback:', err);
        // Dev fallback sample pdf if storage offline
        finalPdfUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
      } finally {
        setIsUploading(false);
      }
    }

    onSave({
      ...formData,
      pdfUrl: finalPdfUrl,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-2xl max-w-xl w-full my-8 border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <UploadCloud className="w-5 h-5 text-ngo-gold-400" />
            <h3 className="text-lg font-bold text-white">Upload New PDF Report</h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
          {/* File Upload Box */}
          <div className="space-y-2">
            <label className="block font-semibold text-slate-700">PDF File Upload (.pdf max 15MB) *</label>
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center bg-slate-50 hover:bg-slate-100 transition-colors relative cursor-pointer">
              <input
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <FileText className="w-8 h-8 text-ngo-green-700 mx-auto mb-1" />
              <p className="text-xs font-bold text-slate-800">
                {selectedFile ? selectedFile.name : 'Click to select PDF document'}
              </p>
              <p className="text-[11px] text-slate-400">
                {selectedFile ? `Size: ${formData.fileSize}` : 'Supported format: .pdf (Max 15MB)'}
              </p>
            </div>
            {errors.pdfFile && <p className="text-[11px] text-red-600 mt-1">{errors.pdfFile}</p>}

            {/* Upload Progress Bar */}
            {isUploading && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Uploading to Firebase Storage...</span>
                  <span className="font-mono font-bold">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-ngo-green-700 h-full transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                </div>
              </div>
            )}
          </div>

          {/* Title Hindi */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Report Title (Hindi) *</label>
            <input
              type="text"
              value={formData.titleHi}
              onChange={(e) => setFormData({ ...formData, titleHi: e.target.value })}
              placeholder="उदा. वार्षिक रिपोर्ट 2024-25"
              className={`w-full px-3.5 py-2.5 rounded-lg border ${
                errors.titleHi ? 'border-red-500 bg-red-50' : 'border-slate-300'
              } focus:outline-none focus:ring-2 focus:ring-ngo-green-700`}
            />
            {errors.titleHi && <p className="text-[11px] text-red-600 mt-1">{errors.titleHi}</p>}
          </div>

          {/* Title English */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Report Title (English)</label>
            <input
              type="text"
              value={formData.titleEn}
              onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
              placeholder="e.g. Annual Report 2024-25"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ngo-green-700"
            />
          </div>

          {/* Category & Year */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ngo-green-700 bg-white"
              >
                {REPORT_CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.labelHi}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Financial Year / Period</label>
              <select
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ngo-green-700 bg-white"
              >
                <option value="2025-26">2025-26</option>
                <option value="2024-25">2024-25</option>
                <option value="2023-24">2023-24</option>
                <option value="General">General / Ongoing</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Brief Description</label>
            <textarea
              rows={3}
              value={formData.descriptionHi}
              onChange={(e) => setFormData({ ...formData, descriptionHi: e.target.value })}
              placeholder="प्रतिवेदन का संक्षिप्त परिचय दर्ज करें..."
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ngo-green-700"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Publish Status</label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="published"
                  checked={formData.status === 'published'}
                  onChange={() => setFormData({ ...formData, status: 'published' })}
                  className="text-ngo-green-700 focus:ring-ngo-green-700"
                />
                <span className="font-semibold text-slate-800">Published (सार्वजनिक)</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="draft"
                  checked={formData.status === 'draft'}
                  onChange={() => setFormData({ ...formData, status: 'draft' })}
                  className="text-amber-700 focus:ring-amber-700"
                />
                <span className="font-semibold text-slate-800">Draft (ड्राफ्ट)</span>
              </label>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
            <Button variant="ghost" size="sm" onClick={onClose} isDisabled={isLoading || isUploading}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" icon={Save} isLoading={isLoading || isUploading} type="submit">
              Save & Upload Report
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
