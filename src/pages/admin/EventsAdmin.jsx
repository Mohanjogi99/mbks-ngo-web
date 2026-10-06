import React, { useState, useEffect } from 'react';
import { Container } from '../../components/ui/Container';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { EventFormModal } from '../../components/admin/EventFormModal';
import { DeleteConfirmModal } from '../../components/admin/DeleteConfirmModal';
import {
  getAdminEvents,
  createAdminEvent,
  updateAdminEvent,
  deleteAdminEvent,
} from '../../services/adminEventsService';
import { useAuth } from '../../context/AuthContext';
import {
  Calendar,
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  CheckCircle2,
  Clock,
  MapPin,
  Users,
  AlertCircle,
} from 'lucide-react';

export const EventsAdmin = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modals
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [saving, setSaving] = useState(false);

  const [deletingEvent, setDeletingEvent] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Toast
  const [toastMessage, setToastMessage] = useState(null);

  const loadEvents = async () => {
    setLoading(true);
    const data = await getAdminEvents();
    setEvents(data);
    setLoading(false);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ text: msg, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCreateNew = () => {
    setEditingEvent(null);
    setIsFormOpen(true);
  };

  const handleEdit = (evt) => {
    setEditingEvent(evt);
    setIsFormOpen(true);
  };

  const handleDeleteTrigger = (evt) => {
    setDeletingEvent(evt);
    setIsDeleteOpen(true);
  };

  const handleSaveEvent = async (formData) => {
    setSaving(true);
    try {
      if (editingEvent) {
        const updated = await updateAdminEvent(editingEvent.id, formData, user?.uid);
        setEvents((prev) => prev.map((e) => (e.id === editingEvent.id ? { ...e, ...updated } : e)));
        showToast('Event details updated successfully!');
      } else {
        const created = await createAdminEvent(formData, user?.uid);
        setEvents((prev) => [created, ...prev]);
        showToast('New event added successfully!');
      }
      setIsFormOpen(false);
    } catch (err) {
      showToast('Error saving event: ' + err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingEvent) return;
    setDeleting(true);
    try {
      await deleteAdminEvent(deletingEvent.id);
      setEvents((prev) => prev.filter((e) => e.id !== deletingEvent.id));
      showToast('Event deleted permanently!');
      setIsDeleteOpen(false);
    } catch (err) {
      showToast('Error deleting event: ' + err.message, 'error');
    } finally {
      setDeleting(false);
    }
  };

  // Filter events
  const filteredEvents = events.filter((evt) => {
    if (statusFilter !== 'all' && evt.status !== statusFilter) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = (evt.titleHi + ' ' + evt.titleEn).toLowerCase().includes(q);
      const matchVenue = (evt.venueHi || '').toLowerCase().includes(q);
      if (!matchTitle && !matchVenue) return false;
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
            <Calendar className="w-6 h-6 text-ngo-green-700" />
            <span>Event & Activity Management</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Create, edit, schedule, and track blood donation drives, health camps, and awareness rallies.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="primary" size="sm" icon={Plus} onClick={handleCreateNew}>
            Add New Event
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events, venues..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ngo-green-700"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs w-full sm:w-auto">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 font-semibold rounded-md transition-colors ${
              statusFilter === 'all' ? 'bg-white text-ngo-green-800 shadow-xs' : 'text-slate-600'
            }`}
          >
            All ({events.length})
          </button>
          <button
            onClick={() => setStatusFilter('upcoming')}
            className={`px-3 py-1.5 font-semibold rounded-md transition-colors ${
              statusFilter === 'upcoming' ? 'bg-white text-amber-800 shadow-xs' : 'text-slate-600'
            }`}
          >
            Upcoming ({events.filter((e) => e.status === 'upcoming').length})
          </button>
          <button
            onClick={() => setStatusFilter('completed')}
            className={`px-3 py-1.5 font-semibold rounded-md transition-colors ${
              statusFilter === 'completed' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600'
            }`}
          >
            Completed ({events.filter((e) => e.status === 'completed').length})
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500 text-xs">Loading event records...</div>
        ) : filteredEvents.length === 0 ? (
          <div className="p-12 text-center text-slate-500 space-y-2">
            <Calendar className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-sm font-semibold">No events found matching filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
                <tr>
                  <th className="p-4">Event</th>
                  <th className="p-4">Date & Time</th>
                  <th className="p-4">Venue</th>
                  <th className="p-4">Volunteers</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredEvents.map((evt) => {
                  const isUpcoming = evt.status === 'upcoming';
                  return (
                    <tr key={evt.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={evt.coverImage}
                            alt={evt.titleHi}
                            className="w-12 h-12 rounded-lg object-cover border border-slate-200 shrink-0"
                          />
                          <div>
                            <h4 className="font-bold text-slate-900 line-clamp-1">{evt.titleHi}</h4>
                            <p className="text-[11px] text-slate-500 font-mono line-clamp-1">{evt.titleEn}</p>
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="space-y-0.5">
                          <span className="font-bold text-slate-800 flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-ngo-gold-700 shrink-0" />
                            <span>{evt.eventDate || evt.date}</span>
                          </span>
                          <span className="text-[11px] text-slate-500 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                            <span>{evt.timeHi || evt.time}</span>
                          </span>
                        </div>
                      </td>

                      <td className="p-4 text-slate-600">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-ngo-green-700 shrink-0" />
                          <span className="line-clamp-1">{evt.venueHi || evt.venue}</span>
                        </span>
                      </td>

                      <td className="p-4 font-bold text-slate-800">
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{evt.registeredVolunteersCount || 0} / {evt.targetVolunteers || 20}</span>
                        </span>
                      </td>

                      <td className="p-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                            isUpcoming
                              ? 'bg-amber-50 text-amber-800 border-amber-300'
                              : 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          }`}
                        >
                          {isUpcoming ? 'Upcoming' : 'Completed'}
                        </span>
                      </td>

                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <a
                            href={`/events/${evt.id}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 text-slate-500 hover:text-ngo-green-700 hover:bg-slate-100 rounded-lg"
                            title="View Public Page"
                          >
                            <Eye className="w-4 h-4" />
                          </a>
                          <button
                            onClick={() => handleEdit(evt)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
                            title="Edit Event"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteTrigger(evt)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                            title="Delete Event"
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

      {/* Form Modal */}
      <EventFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveEvent}
        event={editingEvent}
        isLoading={saving}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Event Record"
        itemName={deletingEvent?.titleHi}
        isLoading={deleting}
      />
    </div>
  );
};
