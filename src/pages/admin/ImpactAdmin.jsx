import React, { useState, useEffect } from 'react';
import { Container } from '../../components/ui/Container';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { fetchImpactData, updateImpactData } from '../../services/impactService';
import { useAuth } from '../../context/AuthContext';
import {
  TrendingUp,
  Save,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Megaphone,
  Users,
  FolderKanban,
  Calendar,
  Sparkles,
  Plus,
  Trash2,
} from 'lucide-react';

export const ImpactAdmin = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      setLoading(true);
      const data = await fetchImpactData();
      setFormData(data);
      setLoading(false);
    };
    loadStats();
  }, []);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ text: msg, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateImpactData(formData, user?.uid);
      showToast('Impact statistics updated successfully in Firestore!');
    } catch (err) {
      showToast('Error saving statistics: ' + err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !formData) {
    return <div className="p-8 text-center text-slate-500 text-xs">Loading impact statistics...</div>;
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
            <TrendingUp className="w-6 h-6 text-ngo-green-700" />
            <span>Impact Statistics & Reach Management</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Update organization-wide numbers, villages covered, and success stories rendered on the public /impact dashboard.
          </p>
        </div>

        <Button variant="primary" size="sm" icon={Save} isLoading={saving} onClick={handleSave}>
          Save All Changes
        </Button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Core Numbers Overview */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-ngo-gold-700" />
            <span>1. Core Organization Totals</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs sm:text-sm">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Total Beneficiaries Reached</label>
              <input
                type="number"
                value={formData.totalBeneficiaries}
                onChange={(e) => setFormData({ ...formData, totalBeneficiaries: Number(e.target.value) })}
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 font-bold text-ngo-green-900"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Villages / Towns Reached</label>
              <input
                type="number"
                value={formData.villagesReached}
                onChange={(e) => setFormData({ ...formData, villagesReached: Number(e.target.value) })}
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 font-bold"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Awareness Programs Count</label>
              <input
                type="number"
                value={formData.awarenessProgramsCount}
                onChange={(e) => setFormData({ ...formData, awarenessProgramsCount: Number(e.target.value) })}
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 font-bold"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Registered Volunteers Baseline</label>
              <input
                type="number"
                value={formData.totalVolunteers}
                onChange={(e) => setFormData({ ...formData, totalVolunteers: Number(e.target.value) })}
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 font-bold"
              />
            </div>
          </div>
        </div>

        {/* Geographic Reach Management */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <MapPin className="w-4 h-4 text-ngo-gold-700" />
              <span>2. Geographic Reach Footprint (Village/Block Coverage)</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {formData.geographicReach?.map((geo, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-medium text-slate-500 text-[10px]">Village (ग्राम)</label>
                    <input
                      type="text"
                      value={geo.villageHi}
                      onChange={(e) => {
                        const updated = [...formData.geographicReach];
                        updated[idx].villageHi = e.target.value;
                        setFormData({ ...formData, geographicReach: updated });
                      }}
                      className="w-full px-2 py-1 rounded border border-slate-300 bg-white font-bold"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-500 text-[10px]">Tehsil/Block</label>
                    <input
                      type="text"
                      value={geo.blockHi}
                      onChange={(e) => {
                        const updated = [...formData.geographicReach];
                        updated[idx].blockHi = e.target.value;
                        setFormData({ ...formData, geographicReach: updated });
                      }}
                      className="w-full px-2 py-1 rounded border border-slate-300 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-medium text-slate-500 text-[10px]">Beneficiaries</label>
                    <input
                      type="number"
                      value={geo.beneficiaries}
                      onChange={(e) => {
                        const updated = [...formData.geographicReach];
                        updated[idx].beneficiaries = Number(e.target.value);
                        setFormData({ ...formData, geographicReach: updated });
                      }}
                      className="w-full px-2 py-1 rounded border border-slate-300 bg-white font-bold text-ngo-green-800"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-500 text-[10px]">Activity Type</label>
                    <input
                      type="text"
                      value={geo.type}
                      onChange={(e) => {
                        const updated = [...formData.geographicReach];
                        updated[idx].type = e.target.value;
                        setFormData({ ...formData, geographicReach: updated });
                      }}
                      className="w-full px-2 py-1 rounded border border-slate-300 bg-white"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Save Button */}
        <div className="flex justify-end pt-2">
          <Button variant="primary" size="lg" icon={Save} isLoading={saving} type="submit">
            Save Impact Statistics to Firestore
          </Button>
        </div>
      </form>
    </div>
  );
};
