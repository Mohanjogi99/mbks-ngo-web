import React, { useState, useEffect } from 'react';
import { Container } from '../../components/ui/Container';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { GalleryUploadModal } from '../../components/admin/GalleryUploadModal';
import { DeleteConfirmModal } from '../../components/admin/DeleteConfirmModal';
import {
  getAdminPhotos,
  getAdminVideos,
  createAdminPhoto,
  createAdminVideo,
  deleteAdminPhoto,
  deleteAdminVideo,
} from '../../services/adminGalleryService';
import { useAuth } from '../../context/AuthContext';
import { GALLERY_CATEGORIES } from '../../data/galleryData';
import {
  Image as ImageIcon,
  Video,
  Plus,
  Search,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Play,
} from 'lucide-react';

export const GalleryAdmin = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('photos'); // 'photos' | 'videos'
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Modals
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [deletingItem, setDeletingItem] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Toast
  const [toastMessage, setToastMessage] = useState(null);

  const loadData = async () => {
    setLoading(true);
    const [pData, vData] = await Promise.all([getAdminPhotos(), getAdminVideos()]);
    setPhotos(pData);
    setVideos(vData);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ text: msg, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSavePhoto = async (photoData) => {
    setUploading(true);
    try {
      const created = await createAdminPhoto(photoData, user?.uid);
      setPhotos((prev) => [created, ...prev]);
      showToast('Photo uploaded successfully to Cloud Storage & Firestore!');
      setIsUploadOpen(false);
    } catch (err) {
      showToast('Error uploading photo: ' + err.message, 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleSaveVideo = async (videoData) => {
    setUploading(true);
    try {
      const created = await createAdminVideo(videoData, user?.uid);
      setVideos((prev) => [created, ...prev]);
      showToast('YouTube video embed added successfully!');
      setIsUploadOpen(false);
    } catch (err) {
      showToast('Error adding video: ' + err.message, 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteTrigger = (item) => {
    setDeletingItem(item);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deletingItem) return;
    setDeleting(true);
    try {
      if (activeTab === 'photos') {
        await deleteAdminPhoto(deletingItem.id);
        setPhotos((prev) => prev.filter((p) => p.id !== deletingItem.id));
      } else {
        await deleteAdminVideo(deletingItem.id);
        setVideos((prev) => prev.filter((v) => v.id !== deletingItem.id));
      }
      showToast('Item deleted successfully!');
      setIsDeleteOpen(false);
    } catch (err) {
      showToast('Error deleting item: ' + err.message, 'error');
    } finally {
      setDeleting(false);
    }
  };

  const currentList = activeTab === 'photos' ? photos : videos;

  const filteredItems = currentList.filter((item) => {
    if (categoryFilter !== 'all' && item.category !== categoryFilter) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = (item.titleHi + ' ' + (item.titleEn || '')).toLowerCase().includes(q);
      if (!matchTitle) return false;
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
            <ImageIcon className="w-6 h-6 text-ngo-green-700" />
            <span>Media & Gallery Manager</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Upload HD event photos to Firebase Storage or embed YouTube video coverage.
          </p>
        </div>

        <Button variant="primary" size="sm" icon={Plus} onClick={() => setIsUploadOpen(true)}>
          Upload Photo / Add Video
        </Button>
      </div>

      {/* Tabs & Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-100 pb-3">
          {/* Tab Switcher */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('photos')}
              className={`px-4 py-2 font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'photos' ? 'bg-white text-ngo-green-800 shadow-xs' : 'text-slate-600'
              }`}
            >
              <ImageIcon className="w-4 h-4" /> Photos ({photos.length})
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`px-4 py-2 font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'videos' ? 'bg-white text-red-800 shadow-xs' : 'text-slate-600'
              }`}
            >
              <Video className="w-4 h-4 text-red-600" /> Videos ({videos.length})
            </button>
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search title..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ngo-green-700"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          {GALLERY_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all shrink-0 ${
                categoryFilter === cat.id
                  ? 'bg-ngo-green-800 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.labelHi}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Display */}
      {loading ? (
        <div className="p-8 text-center text-slate-500 text-xs">Loading media records...</div>
      ) : filteredItems.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-500">
          No media items found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const isPhoto = activeTab === 'photos';
            const src = isPhoto ? item.imageUrl || item.thumbUrl : item.thumbnailUrl;

            return (
              <div key={item.id} className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs space-y-3 p-4 flex flex-col justify-between group">
                <div className="space-y-3">
                  <div className="relative h-44 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                    <img src={src} alt={item.titleHi} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    {!isPhoto && (
                      <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg">
                          <Play className="w-5 h-5 fill-white translate-x-0.5" />
                        </div>
                      </div>
                    )}
                    <div className="absolute top-2 left-2">
                      <Badge variant="green" size="sm">
                        {item.category}
                      </Badge>
                    </div>
                  </div>

                  <h4 className="font-bold text-slate-900 text-sm line-clamp-2">{item.titleHi}</h4>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono text-[11px]">{item.locationHi || 'जांजगीर-चांपा'}</span>
                  <button
                    onClick={() => handleDeleteTrigger(item)}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                    title="Delete Media"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Upload Modal */}
      <GalleryUploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onSavePhoto={handleSavePhoto}
        onSaveVideo={handleSaveVideo}
        isLoading={uploading}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Media Item"
        itemName={deletingItem?.titleHi}
        isLoading={deleting}
      />
    </div>
  );
};
