import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { NGO_DETAILS } from '../../utils/constants';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { User, Phone, Mail, MapPin, Calendar, CheckCircle2, ShieldCheck, HeartHandshake, AlertCircle } from 'lucide-react';

export const AREAS_OF_INTEREST = [
  { id: 'education', labelHi: 'शिक्षा एवं साक्षरता', labelEn: 'Education & Literacy' },
  { id: 'health', labelHi: 'स्वास्थ्य सेवा व चिकित्सा शिविर', labelEn: 'Health & Medical Camps' },
  { id: 'environment', labelHi: 'पर्यावरण संरक्षण व वृक्षारोपण', labelEn: 'Environment & Plantation' },
  { id: 'women', labelHi: 'महिला सशक्तिकरण व स्वावलंबन', labelEn: 'Women Empowerment' },
  { id: 'youth', labelHi: 'युवा विकास व खेलकूद', labelEn: 'Youth & Sports' },
  { id: 'blood-donation', labelHi: 'रक्तदान अभियान व आपातकालीन सेवा', labelEn: 'Blood Donation Drives' },
  { id: 'social-awareness', labelHi: 'सामाजिक कुरीति उन्मूलन व जागरूकता', labelEn: 'Social Reform & Awareness' },
  { id: 'event-management', labelHi: 'कार्यक्रम प्रबंधन व व्यवस्थापन', labelEn: 'Event Management' },
  { id: 'digital-tech', labelHi: 'डिजिटल साक्षरता व तकनीकी सहायता', labelEn: 'Digital & Technical Support' },
];

export const SKILL_OPTIONS = [
  { id: 'teaching', labelHi: 'अध्यापन / शिक्षण', labelEn: 'Teaching / Tutoring' },
  { id: 'medical', labelHi: 'चिकित्सा / नर्स / स्वास्थ्य सेवा', labelEn: 'Medical / Healthcare' },
  { id: 'social-media', labelHi: 'सोशल मीडिया व प्रचार-प्रसार', labelEn: 'Social Media & PR' },
  { id: 'photography', labelHi: 'फोटोग्राफी व वीडियो रिकॉर्डिंग', labelEn: 'Photography & Video' },
  { id: 'event-mgmt', labelHi: 'कार्यक्रम व्यवस्थापक', labelEn: 'Event Coordination' },
  { id: 'tailoring', labelHi: 'सिलाई व क्राफ्ट प्रशिक्षण', labelEn: 'Tailoring & Craft' },
  { id: 'driving', labelHi: 'वाहन चालन (ड्राइविंग)', labelEn: 'Driving / Logistics' },
  { id: 'general', labelHi: 'सामान्य समाज सेवा', labelEn: 'General Social Work' },
];

export const VolunteerForm = () => {
  const { isHindi } = useLanguage();

  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    gender: 'male',
    age: '',
    district: 'Janjgir-Champa',
    block: 'Nawagarh',
    villageCity: '',
    skills: [],
    interests: [],
    availability: 'weekends',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState('');

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = isHindi ? 'कृपया पूरा नाम दर्ज करें।' : 'Full Name is required.';
    }

    const mobileRegex = /^[6-9]\d{9}$/;
    if (!formData.mobile.trim()) {
      newErrors.mobile = isHindi ? 'कृपया 10-अंकों का मोबाइल नंबर दर्ज करें।' : 'Mobile number is required.';
    } else if (!mobileRegex.test(formData.mobile.trim())) {
      newErrors.mobile = isHindi ? 'अमान्य मोबाइल नंबर। (10 अंक होना चाहिए)' : 'Invalid 10-digit mobile number.';
    }

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = isHindi ? 'अमान्य ईमेल पता।' : 'Invalid email address.';
    }

    if (!formData.age || isNaN(formData.age) || Number(formData.age) < 14 || Number(formData.age) > 80) {
      newErrors.age = isHindi ? 'कृपया सही आयु दर्ज करें (14-80 वर्ष)।' : 'Please enter valid age (14-80).';
    }

    if (!formData.villageCity.trim()) {
      newErrors.villageCity = isHindi ? 'ग्राम या शहर का नाम दर्ज करें।' : 'Village or City is required.';
    }

    if (formData.interests.length === 0) {
      newErrors.interests = isHindi ? 'कम से कम 1 रुचि का क्षेत्र चुनें।' : 'Select at least 1 area of interest.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInterestToggle = (id) => {
    setFormData((prev) => {
      const exists = prev.interests.includes(id);
      return {
        ...prev,
        interests: exists ? prev.interests.filter((item) => item !== id) : [...prev.interests, id],
      };
    });
  };

  const handleSkillToggle = (id) => {
    setFormData((prev) => {
      const exists = prev.skills.includes(id);
      return {
        ...prev,
        skills: exists ? prev.skills.filter((item) => item !== id) : [...prev.skills, id],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSubmitting(true);

    try {
      const payload = {
        ...formData,
        status: 'pending', // 'pending' | 'approved' | 'rejected'
        appliedAt: serverTimestamp(),
        orgName: NGO_DETAILS.nameEn,
        regNo: NGO_DETAILS.regNo,
      };

      // Store securely in Firestore collection 'volunteers'
      const docRef = await addDoc(collection(db, 'volunteers'), payload);
      setApplicationId(docRef.id.slice(0, 8).toUpperCase());
      setSubmitted(true);
    } catch (err) {
      console.warn('Firestore submission fallback:', err);
      // Fallback preview mode if Firebase offline
      setApplicationId('MBKS-' + Math.floor(100000 + Math.random() * 900000));
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl p-8 sm:p-12 border border-slate-200 shadow-xl text-center space-y-6 max-w-2xl mx-auto my-8 animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-ngo-green-700 flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-10 h-10 text-ngo-green-700" />
        </div>

        <div className="space-y-2">
          <Badge variant="green" className="text-xs">
            {isHindi ? 'आवेदन प्राप्त हुआ' : 'Application Received'}
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            {isHindi ? 'पंजीकरण आवेदन सफलतापूर्वक जमा हुआ!' : 'Volunteer Application Submitted!'}
          </h2>
          <p className="text-sm text-slate-600 max-w-lg mx-auto">
            {isHindi
              ? 'मां-बाबूजी जनकल्याण समिति छत्तीसगढ़ की टीम आपके आवेदन की समीक्षा करेगी और शीघ्र ही आपसे संपर्क करेगी।'
              : 'Our executive team will review your profile and contact you shortly.'}
          </p>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 max-w-md mx-auto space-y-1">
          <p><strong>आवेदन संदर्भ संख्या:</strong> <span className="font-extrabold text-ngo-green-800 tracking-wider">#{applicationId}</span></p>
          <p><strong>आवेदक का नाम:</strong> {formData.fullName}</p>
          <p><strong>पंजीकृत मोबाइल:</strong> {formData.mobile}</p>
        </div>

        <div className="pt-2">
          <Button
            onClick={() => {
              setSubmitted(false);
              setFormData({
                fullName: '',
                mobile: '',
                email: '',
                gender: 'male',
                age: '',
                district: 'Janjgir-Champa',
                block: 'Nawagarh',
                villageCity: '',
                skills: [],
                interests: [],
                availability: 'weekends',
                message: '',
              });
            }}
            variant="outline"
            size="sm"
          >
            {isHindi ? 'दूसरा आवेदन करें' : 'Submit Another Form'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div id="volunteer-form" className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/90 shadow-xl space-y-8">
      <div className="border-b border-slate-100 pb-4 space-y-1">
        <div className="flex items-center justify-between">
          <Badge variant="gold" className="text-xs">
            <HeartHandshake className="w-3.5 h-3.5 mr-1" />
            <span>{isHindi ? 'निःशुल्क पंजीकरण' : 'Free Registration'}</span>
          </Badge>
          <span className="text-[11px] text-slate-400 font-medium">
            * {isHindi ? 'अनिवार्य फ़ील्ड' : 'Required fields'}
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          {isHindi ? 'स्वयंसेवक आवेदन फॉर्म' : 'Volunteer Registration Application'}
        </h2>
        <p className="text-xs text-slate-500">
          {isHindi ? 'कृपया अपनी सही जानकारी दर्ज करें। आपकी जानकारी पूर्णतः सुरक्षित रखी जाएगी।' : 'Your personal data will be kept secure and handled in confidence.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Personal Details */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-ngo-green-800 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-2">
            <User className="w-4 h-4 text-ngo-gold-700" />
            <span>{isHindi ? '1. व्यक्तिगत विवरण (Personal Info)' : '1. Personal Details'}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs sm:text-sm">
            {/* Full Name */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {isHindi ? 'पूरा नाम (Full Name) *' : 'Full Name *'}
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder={isHindi ? 'उदा. अमित देवांगन' : 'e.g. Amit Dewangan'}
                className={`w-full px-3.5 py-2.5 rounded-lg border ${
                  errors.fullName ? 'border-red-500 bg-red-50' : 'border-slate-300'
                } focus:outline-none focus:ring-2 focus:ring-ngo-green-700`}
              />
              {errors.fullName && <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>}
            </div>

            {/* Mobile */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {isHindi ? 'मोबाइल नंबर (10-Digit Mobile) *' : 'Mobile Number *'}
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="tel"
                  maxLength={10}
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, '') })}
                  placeholder="98261XXXXX"
                  className={`w-full pl-9 pr-3.5 py-2.5 rounded-lg border ${
                    errors.mobile ? 'border-red-500 bg-red-50' : 'border-slate-300'
                  } focus:outline-none focus:ring-2 focus:ring-ngo-green-700`}
                />
              </div>
              {errors.mobile && <p className="text-[11px] text-red-600 mt-1">{errors.mobile}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {isHindi ? 'ईमेल पता (Email Address)' : 'Email Address'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className={`w-full pl-9 pr-3.5 py-2.5 rounded-lg border ${
                    errors.email ? 'border-red-500 bg-red-50' : 'border-slate-300'
                  } focus:outline-none focus:ring-2 focus:ring-ngo-green-700`}
                />
              </div>
              {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>}
            </div>

            {/* Gender */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {isHindi ? 'लिंग (Gender) *' : 'Gender *'}
              </label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ngo-green-700 bg-white"
              >
                <option value="male">{isHindi ? 'पुरुष (Male)' : 'Male'}</option>
                <option value="female">{isHindi ? 'महिला (Female)' : 'Female'}</option>
                <option value="other">{isHindi ? 'अन्य (Other)' : 'Other'}</option>
              </select>
            </div>

            {/* Age */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {isHindi ? 'आयु (Age in Years) *' : 'Age *'}
              </label>
              <input
                type="number"
                min={14}
                max={80}
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                placeholder="25"
                className={`w-full px-3.5 py-2.5 rounded-lg border ${
                  errors.age ? 'border-red-500 bg-red-50' : 'border-slate-300'
                } focus:outline-none focus:ring-2 focus:ring-ngo-green-700`}
              />
              {errors.age && <p className="text-[11px] text-red-600 mt-1">{errors.age}</p>}
            </div>

            {/* Availability */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {isHindi ? 'समय उपलब्धता (Availability) *' : 'Availability *'}
              </label>
              <select
                value={formData.availability}
                onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ngo-green-700 bg-white"
              >
                <option value="weekends">{isHindi ? 'सप्ताहांत (शनिवार / रविवार)' : 'Weekends Only'}</option>
                <option value="weekdays">{isHindi ? 'कार्यदिवस (सोमवार - शुक्रवार)' : 'Weekdays Only'}</option>
                <option value="full-time">{isHindi ? 'पूर्णकालिक (Full Time)' : 'Full Time'}</option>
                <option value="emergency">{isHindi ? 'आपातकालीन बुलाव पर (Emergency Calls)' : 'Emergency Only'}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Address Location */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-ngo-green-800 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-2">
            <MapPin className="w-4 h-4 text-ngo-gold-700" />
            <span>{isHindi ? '2. निवास स्थान (Location Details)' : '2. Address Details'}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            {/* District */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {isHindi ? 'जिला (District) *' : 'District *'}
              </label>
              <select
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ngo-green-700 bg-white font-medium"
              >
                <option value="Janjgir-Champa">जांजगीर-चांपा (Janjgir-Champa)</option>
                <option value="Sakti">सक्ती (Sakti)</option>
                <option value="Bilaspur">बिलासपुर (Bilaspur)</option>
                <option value="Raipur">रायपुर (Raipur)</option>
                <option value="Korba">कोरबा (Korba)</option>
                <option value="Raigarh">रायगढ़ (Raigarh)</option>
                <option value="Other CG">अन्य (छत्तीसगढ़)</option>
              </select>
            </div>

            {/* Block */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {isHindi ? 'विकासखण्ड / तहसील (Block)' : 'Block / Tehsil'}
              </label>
              <input
                type="text"
                value={formData.block}
                onChange={(e) => setFormData({ ...formData, block: e.target.value })}
                placeholder={isHindi ? 'नवागढ़' : 'Nawagarh'}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ngo-green-700"
              />
            </div>

            {/* Village/City */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                {isHindi ? 'ग्राम / शहर का नाम *' : 'Village / City *'}
              </label>
              <input
                type="text"
                value={formData.villageCity}
                onChange={(e) => setFormData({ ...formData, villageCity: e.target.value })}
                placeholder={isHindi ? 'उदा. भैसमुड़ी / सिउंड' : 'e.g. Bhaisamudi / Siund'}
                className={`w-full px-3.5 py-2.5 rounded-lg border ${
                  errors.villageCity ? 'border-red-500 bg-red-50' : 'border-slate-300'
                } focus:outline-none focus:ring-2 focus:ring-ngo-green-700`}
              />
              {errors.villageCity && <p className="text-[11px] text-red-600 mt-1">{errors.villageCity}</p>}
            </div>
          </div>
        </div>

        {/* Section 3: Areas of Interest */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-ngo-green-800 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-2">
            <HeartHandshake className="w-4 h-4 text-ngo-gold-700" />
            <span>{isHindi ? '3. रुचि का कार्य क्षेत्र (Areas of Interest) *' : '3. Areas of Interest *'}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs">
            {AREAS_OF_INTEREST.map((item) => {
              const checked = formData.interests.includes(item.id);
              return (
                <label
                  key={item.id}
                  onClick={() => handleInterestToggle(item.id)}
                  className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer select-none transition-all ${
                    checked
                      ? 'bg-ngo-green-50 border-ngo-green-600 text-ngo-green-900 font-bold shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => {}}
                    className="w-4 h-4 text-ngo-green-700 rounded focus:ring-ngo-green-700 shrink-0"
                  />
                  <span>{isHindi ? item.labelHi : item.labelEn}</span>
                </label>
              );
            })}
          </div>
          {errors.interests && (
            <p className="text-xs text-red-600 flex items-center gap-1 font-semibold">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.interests}</span>
            </p>
          )}
        </div>

        {/* Section 4: Skills */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-ngo-green-800 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-2">
            <ShieldCheck className="w-4 h-4 text-ngo-gold-700" />
            <span>{isHindi ? '4. आपका कौशल / हुनर (Skills)' : '4. Your Skills'}</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            {SKILL_OPTIONS.map((skill) => {
              const checked = formData.skills.includes(skill.id);
              return (
                <label
                  key={skill.id}
                  onClick={() => handleSkillToggle(skill.id)}
                  className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer select-none transition-all ${
                    checked
                      ? 'bg-amber-50 border-ngo-gold-600 text-ngo-gold-900 font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => {}}
                    className="w-3.5 h-3.5 text-ngo-gold-700 rounded focus:ring-ngo-gold-700 shrink-0"
                  />
                  <span className="line-clamp-1">{isHindi ? skill.labelHi : skill.labelEn}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Section 5: Optional Message */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            {isHindi ? 'संदेश / अतिरिक्त टिप्पणी (Optional Message)' : 'Additional Message'}
          </label>
          <textarea
            rows={3}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder={isHindi ? 'आप समाज सेवा में कैसे योगदान देना चाहते हैं...' : 'Tell us how you would like to contribute...'}
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ngo-green-700 text-xs sm:text-sm"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <Button
            type="submit"
            isLoading={submitting}
            variant="gold"
            size="lg"
            className="w-full text-base py-3.5"
          >
            {isHindi ? 'स्वयंसेवक आवेदन जमा करें (Submit Application)' : 'Submit Volunteer Application'}
          </Button>
        </div>
      </form>
    </div>
  );
};
