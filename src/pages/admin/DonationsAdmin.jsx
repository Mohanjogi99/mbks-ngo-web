import React, { useState, useEffect } from 'react';
import { Container } from '../../components/ui/Container';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { DonationDetailModal } from '../../components/admin/DonationDetailModal';
import { DonationFormModal } from '../../components/admin/DonationFormModal';
import { DeleteConfirmModal } from '../../components/admin/DeleteConfirmModal';
import {
  getAdminDonations,
  createDonation,
  updateDonationStatus,
  deleteDonation,
} from '../../services/adminDonationsService';
import { useAuth } from '../../context/AuthContext';
import { DONATION_PURPOSES } from '../donate/DonateIndex';
import {
  IndianRupee,
  Search,
  Plus,
  Eye,
  Trash2,
  CheckCircle2,
  XCircle,
  Clock,
  Ban,
  AlertCircle,
  Building2,
  CreditCard,
  QrCode,
  FileCheck,
} from 'lucide-react';

export const DonationsAdmin = () => {
  const { user } = useAuth();
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [purposeFilter, setPurposeFilter] = useState('all');

  // Modals
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [savingStatus, setSavingStatus] = useState(false);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [creating, setCreating] = useState(false);

  const [deletingDonation, setDeletingDonation] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Toast
  const [toastMessage, setToastMessage] = useState(null);

  const loadDonations = async () => {
    setLoading(true);
    const data = await getAdminDonations();
    setDonations(data);
    setLoading(false);
  };

  useEffect(() => {
    loadDonations();
  }, []);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ text: msg, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleViewDetails = (don) => {
    setSelectedDonation(don);
    setIsDetailOpen(true);
  };

  const handleSaveStatus = async (donId, newStatus, newReceiptNo) => {
    setSavingStatus(true);
    try {
      await updateDonationStatus(donId, newStatus, newReceiptNo, user?.uid);
      setDonations((prev) =>
        prev.map((d) => (d.id === donId ? { ...d, paymentStatus: newStatus, receiptNo: newReceiptNo } : d))
      );
      showToast('Donation status and receipt number updated!');
      setIsDetailOpen(false);
    } catch (err) {
      showToast('Error updating status: ' + err.message, 'error');
    } finally {
      setSavingStatus(false);
    }
  };

  const handleCreateDonation = async (formData) => {
    setCreating(true);
    try {
      const created = await createDonation(formData);
      setDonations((prev) => [created, ...prev]);
      showToast('Manual offline donation recorded successfully!');
      setIsCreateOpen(false);
    } catch (err) {
      showToast('Error logging donation: ' + err.message, 'error');
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteTrigger = (don) => {
    setDeletingDonation(don);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deletingDonation) return;
    setDeleting(true);
    try {
      await deleteDonation(deletingDonation.id);
      setDonations((prev) => prev.filter((d) => d.id !== deletingDonation.id));
      showToast('Donation record deleted permanently!');
      setIsDeleteOpen(false);
    } catch (err) {
      showToast('Error deleting record: ' + err.message, 'error');
    } finally {
      setDeleting(false);
    }
  };

  // Filter donations
  const filteredDonations = donations.filter((don) => {
    // Status Filter
    if (statusFilter !== 'all' && don.paymentStatus !== statusFilter) return false;

    // Purpose Filter
    if (purposeFilter !== 'all' && don.purpose !== purposeFilter) return false;

    // Search Query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchName = (don.donorName || '').toLowerCase().includes(q);
      const matchId = (don.id || '').toLowerCase().includes(q);
      const matchRef = (don.paymentRef || '').toLowerCase().includes(q);
      const matchMobile = (don.mobile || '').includes(q);
      if (!matchName && !matchId && !matchRef && !matchMobile) return false;
    }

    return true;
  });

  // Calculate Metrics
  const totalCollected = donations
    .filter((d) => d.paymentStatus === 'verified')
    .reduce((sum, d) => sum + (Number(d.amount) || 0), 0);
  const pendingCount = donations.filter((d) => d.paymentStatus === 'pending_verification').length;
  const verifiedCount = donations.filter((d) => d.paymentStatus === 'verified').length;
  const avgDonation = verifiedCount > 0 ? Math.round(totalCollected / verifiedCount) : 0;

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
            <IndianRupee className="w-6 h-6 text-ngo-green-700" />
            <span>Donations & Financial Ledger</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Track online UPI, bank transfers, verify payment references, and issue 80G tax exemption receipts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="primary" size="sm" icon={Plus} onClick={() => setIsCreateOpen(true)}>
            Log Offline Donation
          </Button>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-emerald-50/80 p-4 rounded-xl border border-emerald-200 shadow-xs space-y-1">
          <p className="text-xs font-semibold text-emerald-800 flex items-center gap-1">
            <FileCheck className="w-3.5 h-3.5" /> Total Verified Funds
          </p>
          <p className="text-2xl font-black text-ngo-green-900">₹{totalCollected.toLocaleString('en-IN')}</p>
        </div>
        <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200/80 shadow-xs space-y-1">
          <p className="text-xs font-semibold text-amber-800 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> Pending Verification
          </p>
          <p className="text-2xl font-black text-amber-900">{pendingCount}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs space-y-1">
          <p className="text-xs font-semibold text-slate-500">Verified Donors</p>
          <p className="text-2xl font-black text-slate-900">{verifiedCount}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs space-y-1">
          <p className="text-xs font-semibold text-slate-500">Avg. Donation Amount</p>
          <p className="text-2xl font-black text-slate-900">₹{avgDonation.toLocaleString('en-IN')}</p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search donor name, ID, UTR, mobile..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ngo-green-700"
            />
          </div>

          {/* Purpose Filter */}
          <div>
            <select
              value={purposeFilter}
              onChange={(e) => setPurposeFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ngo-green-700 bg-white font-medium"
            >
              <option value="all">All Purposes (सभी उद्देश्य)</option>
              {DONATION_PURPOSES.map((p) => (
                <option key={p.id} value={p.titleEn}>
                  {p.titleHi} ({p.titleEn})
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
            All ({donations.length})
          </button>
          <button
            onClick={() => setStatusFilter('pending_verification')}
            className={`px-3 py-1.5 font-semibold rounded-md transition-colors shrink-0 ${
              statusFilter === 'pending_verification' ? 'bg-white text-amber-800 shadow-xs' : 'text-slate-600'
            }`}
          >
            Pending Verification ({pendingCount})
          </button>
          <button
            onClick={() => setStatusFilter('verified')}
            className={`px-3 py-1.5 font-semibold rounded-md transition-colors shrink-0 ${
              statusFilter === 'verified' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600'
            }`}
          >
            Verified ({verifiedCount})
          </button>
          <button
            onClick={() => setStatusFilter('failed')}
            className={`px-3 py-1.5 font-semibold rounded-md transition-colors shrink-0 ${
              statusFilter === 'failed' ? 'bg-white text-red-800 shadow-xs' : 'text-slate-600'
            }`}
          >
            Failed ({donations.filter((d) => d.paymentStatus === 'failed').length})
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500 text-xs">Loading donation records...</div>
        ) : filteredDonations.length === 0 ? (
          <div className="p-12 text-center text-slate-500 space-y-2">
            <IndianRupee className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-sm font-semibold">No donation records found matching filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
                <tr>
                  <th className="p-4">Donation ID</th>
                  <th className="p-4">Donor Name</th>
                  <th className="p-4">Amount (₹)</th>
                  <th className="p-4">Purpose</th>
                  <th className="p-4">Method & Ref</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredDonations.map((don) => {
                  const isVerified = don.paymentStatus === 'verified';
                  const isPending = don.paymentStatus === 'pending_verification';

                  return (
                    <tr key={don.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4 font-mono font-bold text-slate-800">
                        #{don.id}
                      </td>

                      <td className="p-4">
                        <div>
                          <h4 className="font-bold text-slate-900">{don.donorName}</h4>
                          <p className="text-[11px] text-slate-400 font-mono">{don.mobile || 'No Mobile'}</p>
                        </div>
                      </td>

                      <td className="p-4 font-black text-ngo-green-800 text-base">
                        ₹{Number(don.amount)?.toLocaleString('en-IN')}
                      </td>

                      <td className="p-4">
                        <Badge variant="green" size="sm" className="line-clamp-1">
                          {don.purposeHi || don.purpose}
                        </Badge>
                      </td>

                      <td className="p-4">
                        <div>
                          <span className="font-bold text-slate-800 uppercase block">{don.paymentMethod}</span>
                          <span className="text-[11px] text-slate-500 font-mono">{don.paymentRef || 'N/A'}</span>
                        </div>
                      </td>

                      <td className="p-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                            isVerified
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : isPending
                              ? 'bg-amber-50 text-amber-800 border-amber-300'
                              : 'bg-red-50 text-red-800 border-red-300'
                          }`}
                        >
                          {isVerified ? 'Verified' : isPending ? 'Pending' : 'Failed'}
                        </span>
                      </td>

                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleViewDetails(don)}
                            className="p-1.5 text-slate-600 hover:text-ngo-green-800 hover:bg-slate-100 rounded-lg"
                            title="View Details & Update Status"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteTrigger(don)}
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

      {/* Donation Detail & Verification Modal */}
      <DonationDetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        donation={selectedDonation}
        onSaveStatus={handleSaveStatus}
        isLoading={savingStatus}
      />

      {/* Manual Donation Form Modal */}
      <DonationFormModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSave={handleCreateDonation}
        isLoading={creating}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Donation Record"
        itemName={`#${deletingDonation?.id} (${deletingDonation?.donorName})`}
        isLoading={deleting}
      />
    </div>
  );
};
