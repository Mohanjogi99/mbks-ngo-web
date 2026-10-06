import React, { useState, useEffect } from 'react';
import { Container } from '../../components/ui/Container';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { getAdminSettings, saveAdminSettings } from '../../services/adminSettingsService';
import { useAuth } from '../../context/AuthContext';
import { Settings, Save, CheckCircle2, AlertCircle, Building2, Phone, CreditCard, ShieldCheck } from 'lucide-react';

export const SettingsAdmin = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    const loadSettings = async () => {
      setLoading(true);
      const data = await getAdminSettings();
      setFormData(data);
      setLoading(false);
    };
    loadSettings();
  }, []);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ text: msg, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await saveAdminSettings(formData, user?.uid);
      showToast('Organization settings & bank credentials updated in Firestore!');
    } catch (err) {
      showToast('Error saving settings: ' + err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !formData) {
    return <div className="p-8 text-center text-slate-500 text-xs">Loading organization settings...</div>;
  }

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
            <Settings className="w-6 h-6 text-ngo-green-700" />
            <span>Organization Settings & Financial Credentials</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Update statutory registration numbers, helpline contacts, registered office location, and bank credentials.
          </p>
        </div>

        <Button variant="primary" size="sm" icon={Save} isLoading={saving} onClick={handleSubmit}>
          Save Settings
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 text-xs sm:text-sm">
        {/* Section 1: NGO Registration & Contact Details */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-3 flex items-center gap-2 text-ngo-green-800">
            <ShieldCheck className="w-4 h-4 text-ngo-gold-700" />
            <span>1. संस्था पंजीयन एवं संपर्क विवरण (Statutory & Contact Details)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">संस्था का नाम (हिंदी)</label>
              <input
                type="text"
                value={formData.nameHi}
                onChange={(e) => setFormData({ ...formData, nameHi: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ngo-green-700 font-bold"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Organization Name (English)</label>
              <input
                type="text"
                value={formData.nameEn}
                onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ngo-green-700"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">पंजीयन जावक क्रमांक (Registration No.)</label>
              <input
                type="text"
                value={formData.regNo}
                onChange={(e) => setFormData({ ...formData, regNo: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ngo-green-700 font-mono font-bold text-ngo-green-900"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">आधिकारिक ईमेल (Email)</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ngo-green-700"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Bank Account Credentials */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-3 flex items-center gap-2 text-ngo-green-800">
            <CreditCard className="w-4 h-4 text-ngo-gold-700" />
            <span>2. बैंक खाता एवं UPI क्यूआर विवरण (Official Bank Credentials)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">खाताधारक का नाम (Account Name)</label>
              <input
                type="text"
                value={formData.bankAccountName}
                onChange={(e) => setFormData({ ...formData, bankAccountName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ngo-green-700 font-bold"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">बैंक का नाम (Bank Name)</label>
              <input
                type="text"
                value={formData.bankName}
                onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ngo-green-700"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">खाता संख्या (Account No.)</label>
              <input
                type="text"
                value={formData.bankAccountNo}
                onChange={(e) => setFormData({ ...formData, bankAccountNo: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ngo-green-700 font-mono font-bold text-ngo-green-900"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">IFSC कोड (IFSC Code)</label>
              <input
                type="text"
                value={formData.bankIfsc}
                onChange={(e) => setFormData({ ...formData, bankIfsc: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ngo-green-700 font-mono font-bold"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">आधिकारिक UPI ID</label>
              <input
                type="text"
                value={formData.upiId}
                onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ngo-green-700 font-mono font-bold text-ngo-green-900"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">बैंक शाखा (Branch Location)</label>
              <input
                type="text"
                value={formData.bankBranch}
                onChange={(e) => setFormData({ ...formData, bankBranch: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ngo-green-700"
              />
            </div>
          </div>
        </div>

        {/* Submit Save Button */}
        <div className="flex justify-end pt-2">
          <Button variant="primary" size="lg" icon={Save} isLoading={saving} type="submit">
            Save All Settings to Firestore
          </Button>
        </div>
      </form>
    </div>
  );
};
