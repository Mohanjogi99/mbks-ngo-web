import React, { useState, useEffect } from 'react';
import { Container } from '../../components/ui/Container';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { VolunteerProfileModal } from '../../components/admin/VolunteerProfileModal';
import { DeleteConfirmModal } from '../../components/admin/DeleteConfirmModal';
import {
  getAdminVolunteers,
  updateAdminVolunteerStatus,
  deleteAdminVolunteer,
} from '../../services/adminVolunteersService';
import { useAuth } from '../../context/AuthContext';
import { AREAS_OF_INTEREST } from '../../components/volunteer/VolunteerForm';
import {
  Users,
  Search,
  Filter,
  Eye,
  Trash2,
  CheckCircle2,
  XCircle,
  Clock,
  Ban,
  AlertCircle,
  MapPin,
  Phone,
  HeartHandshake,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';

export const VolunteersAdmin = () => {
  const { user } = useAuth();
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [districtFilter, setDistrictFilter] = useState('all');
  const [interestFilter, setInterestFilter] = useState('all');

  // Modals
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [savingStatus, setSavingStatus] = useState(false);

  const [deletingVolunteer, setDeletingVolunteer] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Toast
  const [toastMessage, setToastMessage] = useState(null);

  const loadVolunteers = async () => {
    setLoading(true);
    const data = await getAdminVolunteers();
    setVolunteers(data);
    setLoading(false);
  };

  useEffect(() => {
    loadVolunteers();
  }, []);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ text: msg, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleViewProfile = (vol) => {
    setSelectedVolunteer(vol);
    setIsProfileOpen(true);
  };

  const handleQuickApprove = async (vol) => {
    try {
      await updateAdminVolunteerStatus(vol.id, 'approved', vol.internalNotes || '', user?.uid);
      setVolunteers((prev) =>
        prev.map((v) => (v.id === vol.id ? { ...v, status: 'approved' } : v))
      );
      showToast(`Volunteer application for "${vol.fullName}" approved!`);
    } catch (err) {
      showToast('Error approving volunteer: ' + err.message, 'error');
    }
  };

  const handleQuickReject = async (vol) => {
    try {
      await updateAdminVolunteerStatus(vol.id, 'rejected', vol.internalNotes || '', user?.uid);
      setVolunteers((prev) =>
        prev.map((v) => (v.id === vol.id ? { ...v, status: 'rejected' } : v))
      );
      showToast(`Volunteer application for "${vol.fullName}" rejected!`, 'error');
    } catch (err) {
      showToast('Error rejecting volunteer: ' + err.message, 'error');
    }
  };

  const handleSaveStatus = async (volId, newStatus, newNotes) => {
    setSavingStatus(true);
    try {
      await updateAdminVolunteerStatus(volId, newStatus, newNotes, user?.uid);
      setVolunteers((prev) =>
        prev.map((v) => (v.id === volId ? { ...v, status: newStatus, internalNotes: newNotes } : v))
      );
      showToast('Volunteer status updated successfully!');
      setIsProfileOpen(false);
    } catch (err) {
      showToast('Error updating status: ' + err.message, 'error');
    } finally {
      setSavingStatus(false);
    }
  };

  const handleDeleteTrigger = (vol) => {
    setDeletingVolunteer(vol);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deletingVolunteer) return;
    setDeleting(true);
    try {
      await deleteAdminVolunteer(deletingVolunteer.id);
      setVolunteers((prev) => prev.filter((v) => v.id !== deletingVolunteer.id));
      showToast('Volunteer application deleted!');
      setIsDeleteOpen(false);
    } catch (err) {
      showToast('Error deleting record: ' + err.message, 'error');
    } finally {
      setDeleting(false);
    }
  };

  // Filter volunteers
  const filteredVolunteers = volunteers.filter((vol) => {
    // Status Filter
    if (statusFilter !== 'all' && vol.status !== statusFilter) return false;

    // District Filter
    if (districtFilter !== 'all' && vol.district !== districtFilter) return false;

    // Interest Filter
    if (interestFilter !== 'all') {
      if (!vol.interests || !vol.interests.includes(interestFilter)) return false;
    }

    // Search Query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = (vol.fullName || '').toLowerCase().includes(q);
      const matchMobile = (vol.mobile || '').includes(q);
      const matchVillage = (vol.villageCity || '').toLowerCase().includes(q);
      const matchEmail = (vol.email || '').toLowerCase().includes(q);
      if (!matchName && !matchMobile && !matchVillage && !matchEmail) return false;
    }

    return true;
  });

  const totalCount = volunteers.length;
  const pendingCount = volunteers.filter((v) => v.status === 'pending').length;
  const approvedCount = volunteers.filter((v) => v.status === 'approved').length;
  const rejectedCount = volunteers.filter((v) => v.status === 'rejected').length;

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
            <Users className="w-6 h-6 text-ngo-green-700" />
            <span>Volunteer Applications & Profiles</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Review, approve, and manage registered volunteers across Nawagarh and Janjgir-Champa.
          </p>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs space-y-1">
          <p className="text-xs font-semibold text-slate-500">Total Applications</p>
          <p className="text-2xl font-black text-slate-900">{totalCount}</p>
        </div>
        <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200/80 shadow-xs space-y-1">
          <p className="text-xs font-semibold text-amber-800 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> Pending Review
          </p>
          <p className="text-2xl font-black text-amber-900">{pendingCount}</p>
        </div>
        <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-200/80 shadow-xs space-y-1">
          <p className="text-xs font-semibold text-emerald-800 flex items-center gap-1">
            <UserCheck className="w-3.5 h-3.5" /> Approved Volunteers
          </p>
          <p className="text-2xl font-black text-emerald-900">{approvedCount}</p>
        </div>
        <div className="bg-red-50/70 p-4 rounded-xl border border-red-200/80 shadow-xs space-y-1">
          <p className="text-xs font-semibold text-red-800 flex items-center gap-1">
            <XCircle className="w-3.5 h-3.5" /> Rejected / Inactive
          </p>
          <p className="text-2xl font-black text-red-900">{rejectedCount}</p>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search name, mobile, village..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ngo-green-700"
            />
          </div>

          {/* District Filter */}
          <div>
            <select
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ngo-green-700 bg-white font-medium"
            >
              <option value="all">All Districts (सभी जिले)</option>
              <option value="Janjgir-Champa">Janjgir-Champa (जांजगीर-चांपा)</option>
              <option value="Sakti">Sakti (सक्ती)</option>
              <option value="Bilaspur">Bilaspur (बिलासपुर)</option>
              <option value="Raipur">Raipur (रायपुर)</option>
              <option value="Korba">Korba (कोरबा)</option>
              <option value="Raigarh">Raigarh (रायगढ़)</option>
            </select>
          </div>

          {/* Interest Area Filter */}
          <div>
            <select
              value={interestFilter}
              onChange={(e) => setInterestFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ngo-green-700 bg-white font-medium"
            >
              <option value="all">All Interest Areas (सभी कार्य क्षेत्र)</option>
              {AREAS_OF_INTEREST.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.labelHi} ({item.id})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Status Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs overflow-x-auto">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 font-semibold rounded-md transition-colors shrink-0 ${
              statusFilter === 'all' ? 'bg-white text-ngo-green-800 shadow-xs' : 'text-slate-600'
            }`}
          >
            All ({totalCount})
          </button>
          <button
            onClick={() => setStatusFilter('pending')}
            className={`px-3 py-1.5 font-semibold rounded-md transition-colors shrink-0 ${
              statusFilter === 'pending' ? 'bg-white text-amber-800 shadow-xs' : 'text-slate-600'
            }`}
          >
            Pending ({pendingCount})
          </button>
          <button
            onClick={() => setStatusFilter('approved')}
            className={`px-3 py-1.5 font-semibold rounded-md transition-colors shrink-0 ${
              statusFilter === 'approved' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600'
            }`}
          >
            Approved ({approvedCount})
          </button>
          <button
            onClick={() => setStatusFilter('rejected')}
            className={`px-3 py-1.5 font-semibold rounded-md transition-colors shrink-0 ${
              statusFilter === 'rejected' ? 'bg-white text-red-800 shadow-xs' : 'text-slate-600'
            }`}
          >
            Rejected ({rejectedCount})
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500 text-xs">Loading volunteer records...</div>
        ) : filteredVolunteers.length === 0 ? (
          <div className="p-12 text-center text-slate-500 space-y-2">
            <Users className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-sm font-semibold">No volunteer applications found matching filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
                <tr>
                  <th className="p-4">Applicant Name</th>
                  <th className="p-4">Mobile & Location</th>
                  <th className="p-4">Interests & Skills</th>
                  <th className="p-4">Availability</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredVolunteers.map((vol) => {
                  const isApproved = vol.status === 'approved';
                  const isPending = vol.status === 'pending';
                  const isRejected = vol.status === 'rejected';

                  return (
                    <tr key={vol.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-ngo-green-50 text-ngo-green-800 font-bold flex items-center justify-center border border-ngo-green-200 shrink-0">
                            {vol.fullName?.charAt(0) || 'V'}
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900">{vol.fullName}</h4>
                            <p className="text-[11px] text-slate-400 font-mono">
                              {vol.gender === 'male' ? 'पुरुष' : 'महिला'}, {vol.age}y
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="space-y-0.5">
                          <a href={`tel:${vol.mobile}`} className="font-bold text-ngo-green-800 hover:underline flex items-center gap-1">
                            <Phone className="w-3 h-3 text-ngo-gold-700 shrink-0" />
                            <span>{vol.mobile}</span>
                          </a>
                          <p className="text-[11px] text-slate-500 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                            <span>{vol.villageCity}, {vol.district}</span>
                          </p>
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {vol.interests && vol.interests.slice(0, 2).map((intId) => (
                            <span key={intId} className="px-2 py-0.5 rounded-md bg-emerald-50 text-ngo-green-800 border border-emerald-200 text-[10px] font-semibold">
                              {intId}
                            </span>
                          ))}
                          {vol.interests && vol.interests.length > 2 && (
                            <span className="text-[10px] text-slate-400 font-bold self-center">
                              +{vol.interests.length - 2} more
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="p-4 text-slate-600 text-xs">
                        {vol.availability === 'weekends'
                          ? 'Weekends'
                          : vol.availability === 'weekdays'
                          ? 'Weekdays'
                          : vol.availability === 'full-time'
                          ? 'Full Time'
                          : 'Emergency'}
                      </td>

                      <td className="p-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                            isApproved
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : isPending
                              ? 'bg-amber-50 text-amber-800 border-amber-300'
                              : 'bg-red-50 text-red-800 border-red-300'
                          }`}
                        >
                          {isApproved ? 'Approved' : isPending ? 'Pending' : 'Rejected'}
                        </span>
                      </td>

                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleViewProfile(vol)}
                            className="p-1.5 text-slate-600 hover:text-ngo-green-800 hover:bg-slate-100 rounded-lg"
                            title="View Complete Profile & Notes"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {isPending && (
                            <>
                              <button
                                onClick={() => handleQuickApprove(vol)}
                                className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg"
                                title="Approve Application"
                              >
                                <CheckCircle2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleQuickReject(vol)}
                                className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg"
                                title="Reject Application"
                              >
                                <XCircle className="w-4 h-4" />
                              </button>
                            </>
                          )}

                          <button
                            onClick={() => handleDeleteTrigger(vol)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                            title="Delete Record"
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

      {/* Volunteer Profile & Status Modal */}
      <VolunteerProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        volunteer={selectedVolunteer}
        onSaveStatus={handleSaveStatus}
        isLoading={savingStatus}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Volunteer Record"
        itemName={deletingVolunteer?.fullName}
        isLoading={deleting}
      />
    </div>
  );
};
