import React, { useState } from 'react';
import { X, Upload, Save, Image as ImageIcon, Video, Youtube } from 'lucide-react';
import { Button } from '../ui/Button';
import { GALLERY_CATEGORIES } from '../../data/galleryData';
import { uploadFileToStorage } from '../../services/storageService';

export const GalleryUploadModal = ({ isOpen, onClose, onSavePhoto, onSaveVideo, isLoading }) => {
  const [mediaType, setMediaType] = useState('photo'); // 'photo' | 'video'
  const [formData, setFormData] = useState({
    titleHi: '',
    titleEn: '',
    category: 'education',
    locationHi: 'नवागढ़, जांजぎर-चांपा',
    captionHi: '',
    youtubeUrl: '',
    imageUrl: '',
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const extractYoutubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const validate = () => {
    const errs = {};
    if (!formData.titleHi.trim()) errs.titleHi = 'शीर्षक दर्ज करें।';
    if (mediaType === 'photo' && !selectedFile && !formData.imageUrl) {
      errs.file = 'कृपया फोटो चुनें।';
    }
    if (mediaType === 'video') {
      if (!formData.youtubeUrl.trim()) {
        errs.youtubeUrl = 'YouTube वीडियो लिंक दर्ज करें।';
      } else if (!extractYoutubeId(formData.youtubeUrl)) {
        errs.youtubeUrl = 'अमान्य YouTube URL (उदा. https://www.youtube.com/watch?v=XXXXX)।';
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (mediaType === 'photo') {
      let photoUrl = formData.imageUrl || 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80';
      if (selectedFile) {
        setIsUploading(true);
        try {
          photoUrl = await uploadFileToStorage(selectedFile, 'gallery', (pct) => setUploadProgress(pct));
        } catch (err) {
          console.warn('Storage upload fallback:', err);
        } finally {
          setIsUploading(false);
        }
      }
      onSavePhoto({
        ...formData,
        imageUrl: photoUrl,
        thumbUrl: photoUrl,
      });
    } else {
      const ytId = extractYoutubeId(formData.youtubeUrl);
      onSaveVideo({
        ...formData,
        youtubeId: ytId,
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full my-8 border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-ngo-gold-400" />
            <h3 className="text-lg font-bold text-white">Upload Media to Gallery</h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
          {/* Media Type Selector */}
          <div className="flex rounded-xl bg-slate-100 p-1 font-bold text-xs">
            <button
              type="button"
              onClick={() => setMediaType('photo')}
              className={`flex-1 py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                mediaType === 'photo' ? 'bg-white text-ngo-green-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              <ImageIcon className="w-4 h-4" /> Photo Upload
            </button>
            <button
              type="button"
              onClick={() => setMediaType('video')}
              className={`flex-1 py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                mediaType === 'video' ? 'bg-white text-red-700 shadow-xs' : 'text-slate-600'
              }`}
            >
              <Youtube className="w-4 h-4 text-red-600" /> YouTube Video
            </button>
          </div>

          {/* Title */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Title (शीर्षक) *</label>
            <input
              type="text"
              value={formData.titleHi}
              onChange={(e) => setFormData({ ...formData, titleHi: e.target.value })}
              placeholder="उदा. नि:शुल्क पुस्तक वितरण कार्यक्रम"
              className={`w-full px-3.5 py-2.5 rounded-lg border ${
                errors.titleHi ? 'border-red-500 bg-red-50' : 'border-slate-300'
              } focus:outline-none focus:ring-2 focus:ring-ngo-green-700`}
            />
            {errors.titleHi && <p className="text-[11px] text-red-600 mt-1">{errors.titleHi}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Category (श्रेणी) *</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ngo-green-700 bg-white"
            >
              {GALLERY_CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                <option key={c.id} value={c.id}>
                  {c.labelHi}
                </option>
              ))}
            </select>
          </div>

          {/* Dynamic input for Photo or Video */}
          {mediaType === 'photo' ? (
            <div className="space-y-2">
              <label className="block font-semibold text-slate-700">Select Image File *</label>
              <input type="file" accept="image/*" onChange={(e) => setSelectedFile(e.target.files[0])} className="text-xs text-slate-600" />
              {errors.file && <p className="text-[11px] text-red-600">{errors.file}</p>}
              {isUploading && <div className="text-[11px] text-ngo-green-800 font-bold">Uploading to Firebase Storage: {uploadProgress}%</div>}
            </div>
          ) : (
            <div>
              <label className="block font-semibold text-slate-700 mb-1">YouTube Video Link (URL) *</label>
              <input
                type="url"
                value={formData.youtubeUrl}
                onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                className={`w-full px-3.5 py-2.5 rounded-lg border ${
                  errors.youtubeUrl ? 'border-red-500 bg-red-50' : 'border-slate-300'
                } focus:outline-none focus:ring-2 focus:ring-ngo-green-700 font-mono text-xs`}
              />
              {errors.youtubeUrl && <p className="text-[11px] text-red-600 mt-1">{errors.youtubeUrl}</p>}
            </div>
          )}

          {/* Location / Caption */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Location / Caption</label>
            <input
              type="text"
              value={formData.locationHi}
              onChange={(e) => setFormData({ ...formData, locationHi: e.target.value })}
              placeholder="उदा. ग्राम भैसमुड़ी, नवागढ़"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ngo-green-700"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
            <Button variant="ghost" size="sm" onClick={onClose} isDisabled={isLoading || isUploading}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" icon={Save} isLoading={isLoading || isUploading} type="submit">
              Save Media Item
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
