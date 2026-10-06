import React, { useState, useEffect } from 'react';
import { X, Upload, Save, Calendar, Clock, MapPin, Users } from 'lucide-react';
import { Button } from '../ui/Button';
import { uploadFileToStorage } from '../../services/storageService';

export const EventFormModal = ({ isOpen, onClose, onSave, event, isLoading }) => {
  const [formData, setFormData] = useState({
    titleHi: '',
    titleEn: '',
    eventDate: '',
    timeHi: 'प्रातः 09:00 बजे से',
    venueHi: '',
    descriptionHi: '',
    organizerHi: 'मां-बाबूजी जनकल्याण समिति',
    status: 'upcoming',
    targetVolunteers: '20',
    coverImage: '',
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (event) {
      setFormData({
        titleHi: event.titleHi || '',
        titleEn: event.titleEn || '',
        eventDate: event.eventDate || event.date || '',
        timeHi: event.timeHi || event.time || 'प्रातः 09:00 बजे से',
        venueHi: event.venueHi || event.venue || '',
        descriptionHi: event.descriptionHi || event.description || '',
        organizerHi: event.organizerHi || event.organizer || 'मां-बाबूजी जनकल्याण समिति',
        status: event.status || 'upcoming',
        targetVolunteers: event.targetVolunteers || '20',
        coverImage: event.coverImage || '',
      });
    } else {
      setFormData({
        titleHi: '',
        titleEn: '',
        eventDate: new Date().toISOString().split('T')[0],
        timeHi: 'प्रातः 09:00 बजे से',
        venueHi: 'नवागढ़, जांजगीर-चांपा',
        descriptionHi: '',
        organizerHi: 'मां-बाबूजी जनकल्याण समिति',
        status: 'upcoming',
        targetVolunteers: '20',
        coverImage: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=800',
      });
    }
  }, [event]);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.titleHi.trim()) errs.titleHi = 'शीर्षक दर्ज करें।';
    if (!formData.venueHi.trim()) errs.venueHi = 'स्थान (Venue) दर्ज करें।';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    let imageUrl = formData.coverImage;

    if (selectedFile) {
      setIsUploading(true);
      try {
        imageUrl = await uploadFileToStorage(selectedFile, 'events', (pct) => setUploadProgress(pct));
      } catch (err) {
        console.warn('Storage upload fallback:', err);
      } finally {
        setIsUploading(false);
      }
    }

    onSave({
      ...formData,
      coverImage: imageUrl,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full my-8 border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-ngo-gold-400" />
            <h3 className="text-lg font-bold text-white">
              {event ? 'Edit Event Details' : 'Add New Event / Activity'}
            </h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
          {/* Cover Image */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Cover Image</label>
            <div className="flex items-center gap-4">
              <img
                src={selectedFile ? URL.createObjectURL(selectedFile) : formData.coverImage}
                alt="Preview"
                className="w-20 h-20 rounded-xl object-cover border border-slate-200 shrink-0"
              />
              <div className="space-y-1 flex-1">
                <input type="file" accept="image/*" onChange={handleFileChange} className="text-xs text-slate-600" />
                {isUploading && (
                  <div className="text-[11px] text-ngo-green-800 font-bold">Uploading Image: {uploadProgress}%</div>
                )}
              </div>
            </div>
          </div>

          {/* Title Hindi & English */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Event Title (Hindi) *</label>
              <input
                type="text"
                value={formData.titleHi}
                onChange={(e) => setFormData({ ...formData, titleHi: e.target.value })}
                placeholder="उदा. विशाल रक्तदान एवं स्वास्थ्य जांच शिविर"
                className={`w-full px-3.5 py-2.5 rounded-lg border ${
                  errors.titleHi ? 'border-red-500 bg-red-50' : 'border-slate-300'
                } focus:outline-none focus:ring-2 focus:ring-ngo-green-700`}
              />
              {errors.titleHi && <p className="text-[11px] text-red-600 mt-1">{errors.titleHi}</p>}
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Event Title (English)</label>
              <input
                type="text"
                value={formData.titleEn}
                onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                placeholder="e.g. Mega Blood Donation Drive"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ngo-green-700"
              />
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Event Date *</label>
              <input
                type="date"
                value={formData.eventDate}
                onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ngo-green-700"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Time (समय)</label>
              <input
                type="text"
                value={formData.timeHi}
                onChange={(e) => setFormData({ ...formData, timeHi: e.target.value })}
                placeholder="प्रातः 09:00 बजे से शाम 04:00 बजे तक"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ngo-green-700"
              />
            </div>
          </div>

          {/* Venue & Volunteers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Venue / Location *</label>
              <input
                type="text"
                value={formData.venueHi}
                onChange={(e) => setFormData({ ...formData, venueHi: e.target.value })}
                placeholder="उदा. सामुदायिक भवन, भैसमुड़ी, नवागढ़"
                className={`w-full px-3.5 py-2.5 rounded-lg border ${
                  errors.venueHi ? 'border-red-500 bg-red-50' : 'border-slate-300'
                } focus:outline-none focus:ring-2 focus:ring-ngo-green-700`}
              />
              {errors.venueHi && <p className="text-[11px] text-red-600 mt-1">{errors.venueHi}</p>}
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Target Volunteers Count</label>
              <input
                type="number"
                value={formData.targetVolunteers}
                onChange={(e) => setFormData({ ...formData, targetVolunteers: e.target.value })}
                placeholder="20"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ngo-green-700 font-bold"
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Event Status</label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="evtStatus"
                  value="upcoming"
                  checked={formData.status === 'upcoming'}
                  onChange={() => setFormData({ ...formData, status: 'upcoming' })}
                  className="text-amber-700 focus:ring-amber-700"
                />
                <span className="font-semibold text-slate-800">Upcoming (आगामी कार्यक्रम)</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="evtStatus"
                  value="completed"
                  checked={formData.status === 'completed'}
                  onChange={() => setFormData({ ...formData, status: 'completed' })}
                  className="text-ngo-green-700 focus:ring-ngo-green-700"
                />
                <span className="font-semibold text-slate-800">Completed (संपन्न)</span>
              </label>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Description (विवरण)</label>
            <textarea
              rows={3}
              value={formData.descriptionHi}
              onChange={(e) => setFormData({ ...formData, descriptionHi: e.target.value })}
              placeholder="गतिविधि का विस्तृत विवरण दर्ज करें..."
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ngo-green-700"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
            <Button variant="ghost" size="sm" onClick={onClose} isDisabled={isLoading || isUploading}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" icon={Save} isLoading={isLoading || isUploading} type="submit">
              Save Event Record
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
