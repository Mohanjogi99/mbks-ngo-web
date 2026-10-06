import React, { useState } from 'react';
import { X, Plus, Save, IndianRupee } from 'lucide-react';
import { Button } from '../ui/Button';
import { DONATION_PURPOSES } from '../../pages/donate/DonateIndex';

export const DonationFormModal = ({ isOpen, onClose, onSave, isLoading }) => {
  const [formData, setFormData] = useState({
    donorName: '',
    mobile: '',
    email: '',
    panNumber: '',
    amount: '',
    purpose: 'general',
    paymentMethod: 'cash', // 'cash' | 'cheque' | 'upi' | 'bank_transfer'
    paymentRef: 'OFFLINE-CASH',
    paymentStatus: 'verified', // manual offline entry defaults to verified
    address: '',
    isAnonymous: false,
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.donorName.trim() && !formData.isAnonymous) {
      errs.donorName = 'Donor name is required.';
    }
    if (!formData.amount || isNaN(formData.amount) || Number(formData.amount) <= 0) {
      errs.amount = 'Enter valid amount.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const selectedPurpObj = DONATION_PURPOSES.find((p) => p.id === formData.purpose);

    onSave({
      ...formData,
      amount: Number(formData.amount),
      purpose: selectedPurpObj ? selectedPurpObj.titleEn : 'General Welfare Fund',
      purposeHi: selectedPurpObj ? selectedPurpObj.titleHi : 'सामान्य जनकल्याण कोष',
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-2xl max-w-xl w-full my-8 border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Plus className="w-5 h-5 text-ngo-gold-400" />
            <h3 className="text-lg font-bold text-white">Log Manual Offline Donation</h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
          {/* Donor Name */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Donor Name *</label>
            <input
              type="text"
              value={formData.donorName}
              onChange={(e) => setFormData({ ...formData, donorName: e.target.value })}
              placeholder="e.g. Ramesh Dewangan"
              className={`w-full px-3.5 py-2.5 rounded-lg border ${
                errors.donorName ? 'border-red-500 bg-red-50' : 'border-slate-300'
              } focus:outline-none focus:ring-2 focus:ring-ngo-green-700`}
            />
            {errors.donorName && <p className="text-[11px] text-red-600 mt-1">{errors.donorName}</p>}
          </div>

          {/* Amount & Purpose */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Amount (₹) *</label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                placeholder="1000"
                className={`w-full px-3.5 py-2.5 rounded-lg border ${
                  errors.amount ? 'border-red-500 bg-red-50' : 'border-slate-300'
                } focus:outline-none focus:ring-2 focus:ring-ngo-green-700 font-bold text-ngo-green-900`}
              />
              {errors.amount && <p className="text-[11px] text-red-600 mt-1">{errors.amount}</p>}
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Donation Purpose</label>
              <select
                value={formData.purpose}
                onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ngo-green-700 bg-white"
              >
                {DONATION_PURPOSES.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.titleHi}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Payment Method & Ref */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Payment Method</label>
              <select
                value={formData.paymentMethod}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ngo-green-700 bg-white"
              >
                <option value="cash">Cash (नकद)</option>
                <option value="cheque">Cheque (चेक)</option>
                <option value="upi">UPI / Online</option>
                <option value="bank_transfer">Bank Transfer (NEFT/RTGS)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Payment Ref / Cheque No.</label>
              <input
                type="text"
                value={formData.paymentRef}
                onChange={(e) => setFormData({ ...formData, paymentRef: e.target.value })}
                placeholder="e.g. CHQ-991204"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ngo-green-700 font-mono"
              />
            </div>
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Mobile Number</label>
              <input
                type="tel"
                maxLength={10}
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, '') })}
                placeholder="98261XXXXX"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ngo-green-700"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">PAN Number (80G)</label>
              <input
                type="text"
                maxLength={10}
                value={formData.panNumber}
                onChange={(e) => setFormData({ ...formData, panNumber: e.target.value.toUpperCase() })}
                placeholder="ABCDE1234F"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ngo-green-700 uppercase font-mono"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Address / Location</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="e.g. Nawagarh, Janjgir-Champa"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ngo-green-700"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
            <Button variant="ghost" size="sm" onClick={onClose} isDisabled={isLoading}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" icon={Save} isLoading={isLoading} type="submit">
              Save Donation Record
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
