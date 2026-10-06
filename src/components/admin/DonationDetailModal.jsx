import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Clock, XCircle, Ban, Save, FileText, User, Phone, Mail, Building2, CreditCard, Hash, Copy, Check } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export const DonationDetailModal = ({ isOpen, onClose, donation, onSaveStatus, isLoading }) => {
  const [paymentStatus, setPaymentStatus] = useState('pending_verification');
  const [receiptNo, setReceiptNo] = useState('');
  const [copiedField, setCopiedField] = useState('');

  useEffect(() => {
    if (donation) {
      setPaymentStatus(donation.paymentStatus || 'pending_verification');
      setReceiptNo(donation.receiptNo || '');
    }
  }, [donation]);

  if (!isOpen || !donation) return null;

  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(''), 2000);
  };

  const handleSave = () => {
    onSaveStatus(donation.id, paymentStatus, receiptNo);
  };

  const statusBadge = (st) => {
    switch (st) {
      case 'verified':
        return <Badge variant="green" className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Verified (सत्यापित)</Badge>;
      case 'failed':
        return <Badge variant="red" className="flex items-center gap-1"><XCircle className="w-3.5 h-3.5" /> Failed (असफल)</Badge>;
      case 'refunded':
        return <Badge variant="outline" className="flex items-center gap-1"><Ban className="w-3.5 h-3.5" /> Refunded</Badge>;
      default:
        return <Badge variant="gold" className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Pending Verification</Badge>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-2xl max-w-xl w-full my-8 border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-ngo-green-800 text-ngo-gold-400 font-black text-xl flex items-center justify-center border border-ngo-green-600">
              ₹
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">Donation #{donation.id}</h3>
                {statusBadge(paymentStatus)}
              </div>
              <p className="text-xs text-slate-400 font-mono">Date: {donation.createdAt?.seconds ? new Date(donation.createdAt.seconds * 1000).toLocaleDateString('hi-IN') : 'Recent'}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs sm:text-sm">
          {/* Amount & Purpose Banner */}
          <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 flex items-center justify-between">
            <div>
              <span className="text-slate-500 text-xs block">दान राशि (Donation Amount):</span>
              <span className="text-2xl font-black text-ngo-green-900">₹{donation.amount?.toLocaleString('en-IN')}</span>
            </div>
            <div className="text-right max-w-xs">
              <span className="text-slate-500 text-xs block">उद्देश्य (Purpose):</span>
              <span className="font-bold text-slate-800 line-clamp-1">{donation.purposeHi || donation.purpose}</span>
            </div>
          </div>

          {/* Section 1: Donor Info */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5 text-ngo-green-800">
              <User className="w-4 h-4 text-ngo-gold-700" />
              <span>दानदाता विवरण (Donor Details)</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span className="text-slate-500 text-xs block">नाम:</span>
                <span className="font-bold text-slate-900">{donation.donorName}</span>
                {donation.isAnonymous && <span className="text-[10px] text-amber-700 font-bold block">(गुप्त दानदाता)</span>}
              </div>

              <div>
                <span className="text-slate-500 text-xs block">मोबाइल:</span>
                <div className="flex items-center gap-2 mt-0.5">
                  <a href={`tel:${donation.mobile}`} className="font-bold text-ngo-green-800 hover:underline flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5" />
                    <span>{donation.mobile || 'उपलब्ध नहीं'}</span>
                  </a>
                  {donation.mobile && (
                    <button onClick={() => handleCopy(donation.mobile, 'mobile')} className="p-1 text-slate-400">
                      {copiedField === 'mobile' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  )}
                </div>
              </div>

              <div>
                <span className="text-slate-500 text-xs block">ईमेल:</span>
                <span className="font-medium text-slate-800">{donation.email || 'उपलब्ध नहीं'}</span>
              </div>

              <div>
                <span className="text-slate-500 text-xs block">PAN कार्ड नंबर (80G ਰਸੀਦ):</span>
                <span className="font-mono font-bold text-slate-900">{donation.panNumber || 'दर्ज नहीं'}</span>
              </div>
            </div>

            {donation.address && (
              <div>
                <span className="text-slate-500 text-xs block">पता:</span>
                <span className="font-medium text-slate-800">{donation.address}</span>
              </div>
            )}
          </div>

          {/* Section 2: Payment Reference Details */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5 text-ngo-green-800">
              <CreditCard className="w-4 h-4 text-ngo-gold-700" />
              <span>भुगतान सन्दर्भ विवरण (Payment Reference)</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span className="text-slate-500 text-xs block">भुगतान माध्यम (Method):</span>
                <span className="font-bold text-slate-800 uppercase">{donation.paymentMethod}</span>
              </div>
              <div>
                <span className="text-slate-500 text-xs block">UTR / Trans Ref No.:</span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="font-mono font-extrabold text-ngo-green-900">{donation.paymentRef || 'N/A'}</span>
                  {donation.paymentRef && (
                    <button onClick={() => handleCopy(donation.paymentRef, 'ref')} className="p-1 text-slate-400">
                      {copiedField === 'ref' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Status & 80G Receipt Assignment */}
          <div className="border-t border-slate-200 pt-4 space-y-4">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-ngo-green-900">
              सत्यापन एवं 80G रसीद आवंटन (Admin Controls)
            </h4>

            <div className="space-y-2">
              <label className="block font-semibold text-slate-700 text-xs">
                भुगतान स्थिति (Payment Status):
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentStatus('pending_verification')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                    paymentStatus === 'pending_verification'
                      ? 'bg-amber-100 text-amber-900 border-amber-400 ring-2 ring-amber-300'
                      : 'bg-white text-slate-600 border-slate-300'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Pending</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentStatus('verified')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                    paymentStatus === 'verified'
                      ? 'bg-emerald-100 text-emerald-900 border-emerald-400 ring-2 ring-emerald-300'
                      : 'bg-white text-slate-600 border-slate-300'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Verified</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentStatus('failed')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                    paymentStatus === 'failed'
                      ? 'bg-red-100 text-red-900 border-red-400 ring-2 ring-red-300'
                      : 'bg-white text-slate-600 border-slate-300'
                  }`}
                >
                  <XCircle className="w-3.5 h-3.5 text-red-700" />
                  <span>Failed</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentStatus('refunded')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                    paymentStatus === 'refunded'
                      ? 'bg-slate-200 text-slate-900 border-slate-400 ring-2 ring-slate-300'
                      : 'bg-white text-slate-600 border-slate-300'
                  }`}
                >
                  <Ban className="w-3.5 h-3.5" />
                  <span>Refunded</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 text-xs mb-1">
                आधिकारिक 80G रसीद नंबर (80G Tax Receipt Number):
              </label>
              <input
                type="text"
                value={receiptNo}
                onChange={(e) => setReceiptNo(e.target.value)}
                placeholder="उदा. 80G-2025-0015"
                className="w-full p-2.5 rounded-lg border border-slate-300 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-ngo-green-700"
              />
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-end gap-3 shrink-0">
          <Button variant="ghost" size="sm" onClick={onClose} isDisabled={isLoading}>
            बंद करें (Close)
          </Button>
          <Button variant="primary" size="sm" icon={Save} isLoading={isLoading} onClick={handleSave}>
            स्थिति अपडेट करें (Save Status)
          </Button>
        </div>
      </div>
    </div>
  );
};
