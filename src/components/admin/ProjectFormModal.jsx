import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { uploadFileToStorage } from '../../services/storageService';
import { X, Upload, Plus, Trash2, CheckCircle2, Image as ImageIcon, FileText } from 'lucide-react';

export const ProjectFormModal = ({ isOpen, onClose, onSave, project, isLoading }) => {
  const [formData, setFormData] = useState({
    titleHi: '',
    titleEn: '',
    slug: '',
    category: 'education',
    categoryLabelHi: 'शिक्षा',
    categoryLabelEn: 'Education',
    status: 'ongoing',
    statusLabelHi: 'जारी (Ongoing)',
    statusLabelEn: 'Ongoing',
    villageHi: '',
    villageEn: '',
    blockHi: 'नवागढ़',
    blockEn: 'Nawagarh',
    districtHi: 'जांजगीर-चांपा',
    districtEn: 'Janjgir-Champa',
    startDate: '',
    endDate: '',
    beneficiariesCount: 100,
    targetBeneficiariesCount: 500,
    shortDescHi: '',
    shortDescEn: '',
    impactHi: '',
    impactEn: '',
    coverImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
    objectives: [{ id: 1, textHi: '' }],
  });

  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (project) {
      setFormData({
        titleHi: project.titleHi || '',
        titleEn: project.titleEn || '',
        slug: project.slug || project.id || '',
        category: project.category || 'education',
        categoryLabelHi: project.categoryLabelHi || 'शिक्षा',
        categoryLabelEn: project.categoryLabelEn || 'Education',
        status: project.status || 'ongoing',
        statusLabelHi: project.statusLabelHi || 'जारी (Ongoing)',
        statusLabelEn: project.statusLabelEn || 'Ongoing',
        villageHi: project.location?.villageHi || '',
        villageEn: project.location?.villageEn || '',
        blockHi: project.location?.blockHi || 'नवागढ़',
        blockEn: project.location?.blockEn || 'Nawagarh',
        districtHi: project.location?.districtHi || 'जांजगीर-चांपा',
        districtEn: project.location?.districtEn || 'Janjgir-Champa',
        startDate: project.startDate || '',
        endDate: project.endDate || '',
        beneficiariesCount: project.beneficiariesCount || 0,
        targetBeneficiariesCount: project.targetBeneficiariesCount || 100,
        shortDescHi: project.shortDescHi || '',
        shortDescEn: project.shortDescEn || '',
        impactHi: project.impactHi || '',
        impactEn: project.impactEn || '',
        coverImage: project.coverImage || 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
        objectives: project.objectives && project.objectives.length > 0 ? project.objectives : [{ id: 1, textHi: '' }],
      });
    } else {
      setFormData({
        titleHi: '',
        titleEn: '',
        slug: '',
        category: 'education',
        categoryLabelHi: 'शिक्षा',
        categoryLabelEn: 'Education',
        status: 'ongoing',
        statusLabelHi: 'जारी (Ongoing)',
        statusLabelEn: 'Ongoing',
        villageHi: '',
        villageEn: '',
        blockHi: 'नवागढ़',
        blockEn: 'Nawagarh',
        districtHi: 'जांजगीर-चांपा',
        districtEn: 'Janjgir-Champa',
        startDate: new Date().toISOString().split('T')[0],
        endDate: '',
        beneficiariesCount: 50,
        targetBeneficiariesCount: 200,
        shortDescHi: '',
        shortDescEn: '',
        impactHi: '',
        impactEn: '',
        coverImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
        objectives: [{ id: 1, textHi: '' }],
      });
    }
    setErrors({});
  }, [project, isOpen]);

  if (!isOpen) return null;

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    setUploadProgress(0);

    try {
      const url = await uploadFileToStorage(file, 'projects/images', (progress) => {
        setUploadProgress(progress);
      });
      setFormData((prev) => ({ ...prev, coverImage: url }));
    } catch (err) {
      console.warn('Image upload fallback:', err);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleAddObjective = () => {
    setFormData((prev) => ({
      ...prev,
      objectives: [...prev.objectives, { id: Date.now(), textHi: '' }],
    }));
  };

  const handleRemoveObjective = (index) => {
    setFormData((prev) => ({
      ...prev,
      objectives: prev.objectives.filter((_, i) => i !== index),
    }));
  };

  const handleObjectiveChange = (index, val) => {
    const updated = [...formData.objectives];
    updated[index].textHi = val;
    setFormData({ ...formData, objectives: updated });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.titleHi.trim()) newErrors.titleHi = 'Title in Hindi is required.';
    if (!formData.shortDescHi.trim()) newErrors.shortDescHi = 'Description in Hindi is required.';
    if (!formData.villageHi.trim()) newErrors.villageHi = 'Village location is required.';
    if (!formData.startDate) newErrors.startDate = 'Start date is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      titleHi: formData.titleHi,
      titleEn: formData.titleEn || formData.titleHi,
      slug: formData.slug || formData.titleEn.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      category: formData.category,
      categoryLabelHi: formData.categoryLabelHi,
      categoryLabelEn: formData.categoryLabelEn,
      status: formData.status,
      statusLabelHi: formData.status === 'ongoing' ? 'जारी (Ongoing)' : 'पूर्ण (Completed)',
      statusLabelEn: formData.status === 'ongoing' ? 'Ongoing' : 'Completed',
      location: {
        villageHi: formData.villageHi,
        villageEn: formData.villageEn || formData.villageHi,
        blockHi: formData.blockHi,
        blockEn: formData.blockEn,
        districtHi: formData.districtHi,
        districtEn: formData.districtEn,
      },
      startDate: formData.startDate,
      endDate: formData.endDate,
      beneficiariesCount: Number(formData.beneficiariesCount),
      targetBeneficiariesCount: Number(formData.targetBeneficiariesCount),
      shortDescHi: formData.shortDescHi,
      shortDescEn: formData.shortDescEn || formData.shortDescHi,
      impactHi: formData.impactHi,
      impactEn: formData.impactEn || formData.impactHi,
      coverImage: formData.coverImage,
      objectives: formData.objectives.filter((o) => o.textHi.trim() !== ''),
    };

    onSave(payload);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto border border-slate-200">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h2 className="text-lg font-bold text-slate-900">
            {project ? 'Edit Field Project' : 'Add New Field Project'}
          </h2>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 text-xs sm:text-sm">
          {/* Section 1: Titles & Category */}
          <div className="space-y-4">
            <h3 className="font-bold text-ngo-green-800 uppercase tracking-wider text-xs border-b pb-1">
              1. Title & Classification
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Title (Hindi) *</label>
                <input
                  type="text"
                  value={formData.titleHi}
                  onChange={(e) => setFormData({ ...formData, titleHi: e.target.value })}
                  placeholder="उदा. मिशन ज्ञानदीप: शिक्षा प्रोत्साहन"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-ngo-green-700"
                />
                {errors.titleHi && <p className="text-[11px] text-red-600 mt-1">{errors.titleHi}</p>}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Title (English)</label>
                <input
                  type="text"
                  value={formData.titleEn}
                  onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                  placeholder="e.g. Mission Gyandeep: Rural Education"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-ngo-green-700"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Category Area *</label>
                <select
                  value={formData.category}
                  onChange={(e) => {
                    const cat = e.target.value;
                    const labels = {
                      education: ['शिक्षा', 'Education'],
                      health: ['स्वास्थ्य', 'Healthcare'],
                      water: ['जल संरक्षण', 'Water Conservation'],
                      women: ['महिला सशक्तिकरण', 'Women Welfare'],
                      environment: ['पर्यावरण', 'Environment'],
                      youth: ['युवा व बाल सुरक्षा', 'Youth/Child'],
                    };
                    setFormData({
                      ...formData,
                      category: cat,
                      categoryLabelHi: labels[cat]?.[0] || 'अन्य',
                      categoryLabelEn: labels[cat]?.[1] || 'Other',
                    });
                  }}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white"
                >
                  <option value="education">Education (शिक्षा)</option>
                  <option value="health">Healthcare (स्वास्थ्य)</option>
                  <option value="water">Water Conservation (जल संरक्षण)</option>
                  <option value="women">Women Welfare (महिला सशक्तिकरण)</option>
                  <option value="environment">Environment (पर्यावरण)</option>
                  <option value="youth">Youth & Child Care (युवा/बाल)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Status *</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white"
                >
                  <option value="ongoing">Ongoing (जारी)</option>
                  <option value="completed">Completed (पूर्ण)</option>
                  <option value="planned">Planned (प्रस्तावित)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Location & Dates */}
          <div className="space-y-4">
            <h3 className="font-bold text-ngo-green-800 uppercase tracking-wider text-xs border-b pb-1">
              2. Location & Dates
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Village / City *</label>
                <input
                  type="text"
                  value={formData.villageHi}
                  onChange={(e) => setFormData({ ...formData, villageHi: e.target.value })}
                  placeholder="उदा. ग्राम भैसमुड़ी"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-ngo-green-700"
                />
                {errors.villageHi && <p className="text-[11px] text-red-600 mt-1">{errors.villageHi}</p>}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Start Date *</label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-ngo-green-700"
                />
                {errors.startDate && <p className="text-[11px] text-red-600 mt-1">{errors.startDate}</p>}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">End Date</label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-ngo-green-700"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Current Beneficiaries</label>
                <input
                  type="number"
                  value={formData.beneficiariesCount}
                  onChange={(e) => setFormData({ ...formData, beneficiariesCount: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Target Beneficiaries</label>
                <input
                  type="number"
                  value={formData.targetBeneficiariesCount}
                  onChange={(e) => setFormData({ ...formData, targetBeneficiariesCount: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Descriptions & Image Upload */}
          <div className="space-y-4">
            <h3 className="font-bold text-ngo-green-800 uppercase tracking-wider text-xs border-b pb-1">
              3. Description & Cover Image
            </h3>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Short Description (Hindi) *</label>
              <textarea
                rows={2}
                value={formData.shortDescHi}
                onChange={(e) => setFormData({ ...formData, shortDescHi: e.target.value })}
                placeholder="परियोजना का संक्षिप्त विवरण..."
                className="w-full px-3 py-2 rounded-lg border border-slate-300"
              />
              {errors.shortDescHi && <p className="text-[11px] text-red-600 mt-1">{errors.shortDescHi}</p>}
            </div>

            {/* Image Upload */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Cover Image (Upload to Firebase Storage or URL)</label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  placeholder="https://..."
                  className="flex-1 px-3 py-2 rounded-lg border border-slate-300 text-xs"
                />
                <label className="px-3 py-2 bg-ngo-green-50 text-ngo-green-800 border border-ngo-green-300 rounded-lg font-semibold text-xs cursor-pointer hover:bg-ngo-green-100 flex items-center gap-1 shrink-0">
                  <Upload className="w-3.5 h-3.5" />
                  <span>{uploadingImage ? `${uploadProgress}%` : 'Upload'}</span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>
            </div>
          </div>

          {/* Section 4: Objectives List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b pb-1">
              <h3 className="font-bold text-ngo-green-800 uppercase tracking-wider text-xs">
                4. Objectives List
              </h3>
              <button
                type="button"
                onClick={handleAddObjective}
                className="text-xs font-bold text-ngo-green-700 hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Objective</span>
              </button>
            </div>

            {formData.objectives.map((obj, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={obj.textHi}
                  onChange={(e) => handleObjectiveChange(idx, e.target.value)}
                  placeholder={`उद्देश्य ${idx + 1}`}
                  className="flex-1 px-3 py-2 rounded-lg border border-slate-300 text-xs"
                />
                {formData.objectives.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveObjective(idx)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button variant="ghost" size="sm" onClick={onClose} isDisabled={isLoading}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" isLoading={isLoading} icon={CheckCircle2}>
              {project ? 'Update Project' : 'Save Project'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
