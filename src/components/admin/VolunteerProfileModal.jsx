import React, { useState, useEffect } from 'react';
import { X, User, Phone, Mail, MapPin, Calendar, CheckCircle2, XCircle, Clock, Ban, Save, FileText, HeartHandshake, ShieldCheck, Copy, Check } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { AREAS_OF_INTEREST, SKILL_OPTIONS } from '../volunteer/VolunteerForm';

export const VolunteerProfileModal = ({ isOpen, onClose, volunteer, onSaveStatus, isLoading }) => {
  const [status, setStatus] = useState('pending');
  const [internalNotes, setInternalNotes] = useState('');
  const [copiedField, setCopiedField] = useState('');

  useEffect(() => {
    if (volunteer) {
      setStatus(volunteer.status || 'pending');
      setInternalNotes(volunteer.internalNotes || '');
    }
  }, [volunteer]);

  if (!isOpen || !volunteer) return null;

  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(''), 2000);
  };

  const handleSave = () => {
    onSaveStatus(volunteer.id, status, internalNotes);
  };

  const getInterestLabel = (id) => {
    const found = AREAS_OF_INTEREST.find((item) => item.id === id);
    return found ? found.labelHi : id;
  };

  const getSkillLabel = (id) => {
    const found = SKILL_OPTIONS.find((item) => item.id === id);
    return found ? found.labelHi : id;
  };

  const statusBadge = (st) => {
    switch (st) {
      case 'approved':
        return <Badge variant="green" className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> स्वीकृत (Approved)</Badge>;
      case 'rejected':
        return <Badge variant="red" className="flex items-center gap-1"><XCircle className="w-3.5 h-3.5" /> अस्वीकृत (Rejected)</Badge>;
      case 'inactive':
        return <Badge variant="outline" className="flex items-center gap-1"><Ban className="w-3.5 h-3.5" /> निष्क्रीय (Inactive)</Badge>;
      default:
        return <Badge variant="gold" className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> लंबित (Pending)</Badge>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full my-8 border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-ngo-green-800 text-ngo-gold-400 font-black text-xl flex items-center justify-center border border-ngo-green-600 shadow-sm">
              {volunteer.fullName?.charAt(0) || 'V'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">{volunteer.fullName}</h3>
                {statusBadge(status)}
              </div>
              <p className="text-xs text-slate-400 font-mono">ID: {volunteer.id}</p>
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
        <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm">
          {/* Section 1: Contact & Personal Info */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5 text-ngo-green-800">
              <User className="w-4 h-4 text-ngo-gold-700" />
              <span>संपर्क व व्यक्तिगत जानकारी</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span className="text-slate-500 text-xs block">मोबाइल नंबर:</span>
                <div className="flex items-center gap-2 mt-0.5">
                  <a href={`tel:${volunteer.mobile}`} className="font-bold text-ngo-green-800 hover:underline flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5" />
                    <span>{volunteer.mobile}</span>
                  </a>
                  <button
                    onClick={() => handleCopy(volunteer.mobile, 'mobile')}
                    className="p-1 text-slate-400 hover:text-slate-700"
                    title="Copy Mobile"
                  >
                    {copiedField === 'mobile' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div>
                <span className="text-slate-500 text-xs block">ईमेल पता:</span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="font-medium text-slate-800">{volunteer.email || 'उपलब्ध नहीं'}</span>
                  {volunteer.email && (
                    <button
                      onClick={() => handleCopy(volunteer.email, 'email')}
                      className="p-1 text-slate-400 hover:text-slate-700"
                    >
                      {copiedField === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  )}
                </div>
              </div>

              <div>
                <span className="text-slate-500 text-xs block">लिंग एवं आयु:</span>
                <span className="font-medium text-slate-800 capitalize">
                  {volunteer.gender === 'male' ? 'पुरुष' : volunteer.gender === 'female' ? 'महिला' : 'अन्य'} ({volunteer.age} वर्ष)
                </span>
              </div>

              <div>
                <span className="text-slate-500 text-xs block">समय उपलब्धता:</span>
                <span className="font-medium text-slate-800">
                  {volunteer.availability === 'weekends'
                    ? 'सप्ताहांत (Weekends)'
                    : volunteer.availability === 'weekdays'
                    ? 'कार्यदिवस (Weekdays)'
                    : volunteer.availability === 'full-time'
                    ? 'पूर्णकालिक (Full Time)'
                    : 'आपातकालीन सेवा (Emergency)'}
                </span>
              </div>
            </div>
          </div>

          {/* Section 2: Address Location */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5 text-ngo-green-800">
              <MapPin className="w-4 h-4 text-ngo-gold-700" />
              <span>निवास पता</span>
            </h4>
            <p className="text-slate-800 font-medium">
              {volunteer.villageCity}, {volunteer.block ? `ब्लॉक: ${volunteer.block}, ` : ''}जिला: <span className="font-bold text-ngo-green-900">{volunteer.district}</span>
            </p>
          </div>

          {/* Section 3: Interests & Skills */}
          <div className="space-y-3">
            <div>
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5 text-ngo-green-800">
                <HeartHandshake className="w-4 h-4 text-ngo-gold-700" />
                <span>रुचि के कार्य क्षेत्र (Areas of Interest)</span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {volunteer.interests && volunteer.interests.length > 0 ? (
                  volunteer.interests.map((intId) => (
                    <span key={intId} className="px-2.5 py-1 rounded-lg bg-emerald-50 text-ngo-green-900 border border-emerald-200 text-xs font-semibold">
                      {getInterestLabel(intId)}
                    </span>
                  ))
                ) : (
                  <span className="text-slate-400 text-xs italic">कोई क्षेत्र निर्दिष्ट नहीं</span>
                )}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5 text-ngo-green-800">
                <ShieldCheck className="w-4 h-4 text-ngo-gold-700" />
                <span>विशेष कौशल (Skills)</span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {volunteer.skills && volunteer.skills.length > 0 ? (
                  volunteer.skills.map((skId) => (
                    <span key={skId} className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-900 border border-amber-200 text-xs font-semibold">
                      {getSkillLabel(skId)}
                    </span>
                  ))
                ) : (
                  <span className="text-slate-400 text-xs italic">कोई विशेष कौशल नहीं दर्शाया</span>
                )}
              </div>
            </div>
          </div>

          {/* Section 4: Applicant Message */}
          {volunteer.message && (
            <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200/80 space-y-1">
              <h4 className="font-bold text-amber-900 text-xs flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-amber-700" />
                <span>आवेदक का संदेश / टिप्पणी</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-800 italic leading-relaxed">
                "{volunteer.message}"
              </p>
            </div>
          )}

          {/* Section 5: Admin Controls (Status & Internal Notes) */}
          <div className="border-t border-slate-200 pt-5 space-y-4">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-ngo-green-900">
              एडमिन स्थिति एवं आंतरिक टिपण्णी (Admin Controls)
            </h4>

            <div className="space-y-2">
              <label className="block font-semibold text-slate-700 text-xs">
                आवेदन स्थिति बदलें (Change Status):
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setStatus('pending')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                    status === 'pending'
                      ? 'bg-amber-100 text-amber-900 border-amber-400 ring-2 ring-amber-300'
                      : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Pending</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStatus('approved')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                    status === 'approved'
                      ? 'bg-emerald-100 text-emerald-900 border-emerald-400 ring-2 ring-emerald-300'
                      : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Approve</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStatus('rejected')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                    status === 'rejected'
                      ? 'bg-red-100 text-red-900 border-red-400 ring-2 ring-red-300'
                      : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <XCircle className="w-3.5 h-3.5 text-red-700" />
                  <span>Reject</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStatus('inactive')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                    status === 'inactive'
                      ? 'bg-slate-200 text-slate-900 border-slate-400 ring-2 ring-slate-300'
                      : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <Ban className="w-3.5 h-3.5 text-slate-600" />
                  <span>Inactive</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 text-xs mb-1">
                आंतरिक नोट (Internal Notes - केवल एडमिन हेतु):
              </label>
              <textarea
                rows={2}
                value={internalNotes}
                onChange={(e) => setInternalNotes(e.target.value)}
                placeholder="सत्यापन विवरण, आईडी कार्ड स्थिति या टिप्पणी यहाँ दर्ज करें..."
                className="w-full p-2.5 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-ngo-green-700"
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
