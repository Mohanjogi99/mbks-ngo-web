import React, { useState } from 'react';
import { Container } from '../../components/ui/Container';
import { Section } from '../../components/ui/Section';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { NGO_DETAILS } from '../../utils/constants';
import { useLanguage } from '../../context/LanguageContext';
import { createDonation } from '../../services/adminDonationsService';
import {
  Heart,
  ShieldCheck,
  Building2,
  QrCode,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Sparkles,
  GraduationCap,
  HeartPulse,
  Leaf,
  UserCheck,
  Accessibility,
  HelpCircle,
  Printer,
  FileCheck,
  ArrowRight,
} from 'lucide-react';

export const DONATION_PURPOSES = [
  {
    id: 'general',
    titleHi: 'सामान्य जनकल्याण कोष',
    titleEn: 'General Welfare Fund',
    icon: Sparkles,
    descHi: 'समिति के समस्त सामाजिक एवं आपातकालीन सहायता कार्यों हेतु सर्वोपयोगी कोष।',
    descEn: 'Support all general social welfare and emergency relief drives.',
  },
  {
    id: 'education',
    titleHi: 'निःशुल्क बाल शिक्षा व पुस्तक वितरण',
    titleEn: 'Education & Literacy Drive',
    icon: GraduationCap,
    descHi: 'जरूरतमंद बच्चों को पाठ्य सामग्री, बैग, कोचिंग एवं कंप्यूटर साक्षरता।',
    descEn: 'Provide free study kits, school bags, and coaching to underprivileged children.',
  },
  {
    id: 'health',
    titleHi: 'स्वास्थ्य सेवा व आपातकालीन रक्तदान',
    titleEn: 'Health Camps & Blood Donation',
    icon: HeartPulse,
    descHi: 'निःशुल्क स्वास्थ्य जांच शिविर, मोतियाबिंद शिविर व आपातकालीन रक्त व्यवस्था।',
    descEn: 'Fund health camps, eye checkups, and emergency blood donation drives.',
  },
  {
    id: 'women',
    titleHi: 'महिला सिलाई व स्वावलंबन केंद्र',
    titleEn: 'Women Skill & Empowerment',
    icon: UserCheck,
    descHi: 'ग्रामीण महिलाओं को सिलाई मशीन, हस्तशिल्प व लघु उद्योग प्रशिक्षण।',
    descEn: 'Provide sewing machines and handicraft vocational training for rural women.',
  },
  {
    id: 'environment',
    titleHi: 'पर्यावरण संरक्षण व वृक्षारोपण',
    titleEn: 'Environment & Plantation',
    icon: Leaf,
    descHi: 'पौधरोपण, ट्री-गार्ड व्यवस्था, जल संरक्षण एवं स्वच्छता अभियान।',
    descEn: 'Fund mass sapling plantation, tree guards, and water preservation drives.',
  },
  {
    id: 'divyang',
    titleHi: 'दिव्यांग व वृद्धजन सेवा',
    titleEn: 'Divyangjan & Elderly Care',
    icon: Accessibility,
    descHi: 'वरिष्ठ नागरिकों व दिव्यांग जनों हेतु सहायक उपकरण व सहायता।',
    descEn: 'Provide assistive devices and dignity care for senior citizens and divyangjan.',
  },
];

const PRESET_AMOUNTS = [500, 1000, 2500, 5000, 10000];

export const DonateIndex = () => {
  const { isHindi } = useLanguage();

  const breadcrumbItems = [
    { labelHi: 'ऑनलाइन दान', labelEn: 'Donate Now', path: '/donate' },
  ];

  // Form State
  const [selectedPurpose, setSelectedPurpose] = useState('general');
  const [selectedAmount, setSelectedAmount] = useState(1000);
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'bank_transfer' | 'gateway_placeholder'

  const [donorData, setDonorData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    panNumber: '',
    address: '',
    isAnonymous: false,
    paymentRef: '',
  });

  const [copiedField, setCopiedField] = useState('');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [confirmedDonation, setConfirmedDonation] = useState(null);

  const getEffectiveAmount = () => {
    if (customAmount && !isNaN(customAmount) && Number(customAmount) > 0) {
      return Number(customAmount);
    }
    return selectedAmount;
  };

  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(''), 2000);
  };

  const validateForm = () => {
    const newErrors = {};

    const amount = getEffectiveAmount();
    if (!amount || amount < 50) {
      newErrors.amount = isHindi ? 'कृपया कम से कम ₹50 की दान राशि दर्ज करें।' : 'Minimum donation amount is ₹50.';
    }

    if (!donorData.fullName.trim() && !donorData.isAnonymous) {
      newErrors.fullName = isHindi ? 'कृपया पूरा नाम दर्ज करें।' : 'Full Name is required.';
    }

    const mobileRegex = /^[6-9]\d{9}$/;
    if (!donorData.mobile.trim()) {
      newErrors.mobile = isHindi ? 'कृपया 10-अंकों का मोबाइल नंबर दर्ज करें।' : 'Mobile number is required.';
    } else if (!mobileRegex.test(donorData.mobile.trim())) {
      newErrors.mobile = isHindi ? 'अमान्य मोबाइल नंबर। (10 अंक होना चाहिए)' : 'Invalid 10-digit mobile number.';
    }

    if (donorData.email && !/\S+@\S+\.\S+/.test(donorData.email)) {
      newErrors.email = isHindi ? 'अमान्य ईमेल पता।' : 'Invalid email address.';
    }

    if (donorData.panNumber && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i.test(donorData.panNumber.trim())) {
      newErrors.panNumber = isHindi ? 'अमान्य PAN कार्ड नंबर (उदा. ABCDE1234F)।' : 'Invalid PAN format (e.g. ABCDE1234F).';
    }

    if (!donorData.paymentRef.trim() && paymentMethod !== 'gateway_placeholder') {
      newErrors.paymentRef = isHindi
        ? 'कृपया दान भुगतान के पश्चात प्राप्त UTR / UPI सन्दर्भ संख्या दर्ज करें।'
        : 'Payment UTR / Transaction Reference Number is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitDonation = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSubmitting(true);

    const targetPurposeObj = DONATION_PURPOSES.find((p) => p.id === selectedPurpose);

    const payload = {
      donorName: donorData.isAnonymous ? 'गुप्त दानदाता (Anonymous Donor)' : donorData.fullName,
      mobile: donorData.mobile,
      email: donorData.email,
      panNumber: donorData.panNumber.toUpperCase(),
      amount: getEffectiveAmount(),
      purpose: targetPurposeObj ? targetPurposeObj.titleEn : 'General Welfare Fund',
      purposeHi: targetPurposeObj ? targetPurposeObj.titleHi : 'सामान्य जनकल्याण कोष',
      paymentMethod: paymentMethod,
      paymentRef: donorData.paymentRef || 'PENDING-VERIFICATION',
      paymentStatus: 'pending_verification', // Verification flow
      address: donorData.address,
      isAnonymous: donorData.isAnonymous,
    };

    try {
      const created = await createDonation(payload);
      setConfirmedDonation(created);
    } catch (err) {
      console.error('Donation submission error:', err);
      // Fallback display
      setConfirmedDonation({
        id: 'DON-' + Math.floor(100000 + Math.random() * 900000),
        ...payload,
        createdAt: { seconds: Math.floor(Date.now() / 1000) },
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-6 sm:py-8 bg-slate-50 min-h-screen">
      <Container>
        <Breadcrumbs items={breadcrumbItems} />

        {/* Hero Header Banner */}
        <div className="bg-gradient-to-br from-ngo-green-950 via-ngo-green-900 to-slate-900 text-white rounded-2xl p-6 sm:p-10 shadow-xl border border-emerald-800 mb-8 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-ngo-gold-400 border border-white/20 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-ngo-gold-400" />
              <span>{NGO_DETAILS.regNo}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              {isHindi ? 'ऑनलाइन दान एवं समाज कल्याण सहयोग' : 'Support Our Welfare Initiatives'}
            </h1>

            <p className="text-xs sm:text-base text-emerald-100/90 leading-relaxed font-normal">
              {isHindi
                ? 'आपका छोटा सा योगदान जांजगीर-चांपा के जरूरतमंद बच्चों की शिक्षा, महिलाओं के स्वावलंबन एवं निःशुल्क स्वास्थ्य शिविरों में बड़ा बदलाव ला सकता है।'
                : 'Your generous contribution directly powers education, free healthcare, and women empowerment initiatives across Chhattisgarh.'}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-emerald-200">
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/15">
                <FileCheck className="w-4 h-4 text-ngo-gold-400" />
                <span>100% पारदर्शी एवं आधिकारिक रसीद</span>
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/15">
                <Building2 className="w-4 h-4 text-ngo-gold-400" />
                <span>80G आयकर छूट रसीद योग्य</span>
              </span>
            </div>
          </div>
        </div>

        {/* Confirmation Receipt View if Form Submitted */}
        {confirmedDonation ? (
          <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-xl max-w-3xl mx-auto space-y-6 my-8 animate-fade-in">
            <div className="text-center space-y-2 border-b border-slate-100 pb-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-ngo-green-700 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10 text-ngo-green-700" />
              </div>
              <Badge variant="gold" className="text-xs">
                {isHindi ? 'दान प्रविष्टि दर्ज की गई' : 'Donation Intent Recorded'}
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                {isHindi ? 'सहयोग हेतु हार्दिक धन्यवाद!' : 'Thank You for Your Support!'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                {isHindi
                  ? 'मां-बाबूजी जनकल्याण समिति आपके इस पावन सहयोग के लिए कृतज्ञ है।'
                  : 'Maa-Babuji Jankalyan Samiti Chhattisgarh deeply appreciates your generous contribution.'}
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4 text-xs sm:text-sm">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <span className="text-slate-400 text-xs font-mono block">रसीद सन्दर्भ संख्या (Receipt Ref ID):</span>
                  <span className="text-base font-extrabold text-ngo-green-900 font-mono">#{confirmedDonation.id}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 text-xs block">भुगतान स्थिति:</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                    Pending Verification (सत्यापन प्रक्रियाधीन)
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-slate-500 block text-xs">दानदाता का नाम:</span>
                  <span className="font-bold text-slate-900 text-sm">{confirmedDonation.donorName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-xs">दान राशि (Donation Amount):</span>
                  <span className="font-black text-ngo-green-800 text-lg">₹{confirmedDonation.amount.toLocaleString('en-IN')}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-xs">दान का उद्देश्य (Purpose):</span>
                  <span className="font-semibold text-slate-800">{confirmedDonation.purposeHi}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-xs">भुगतान माध्यम & UTR/Ref:</span>
                  <span className="font-mono text-slate-800 font-bold uppercase">{confirmedDonation.paymentMethod} - {confirmedDonation.paymentRef}</span>
                </div>
                {confirmedDonation.panNumber && (
                  <div>
                    <span className="text-slate-500 block text-xs">PAN कार्ड (80G रसीद हेतु):</span>
                    <span className="font-mono font-bold text-slate-900">{confirmedDonation.panNumber}</span>
                  </div>
                )}
                <div>
                  <span className="text-slate-500 block text-xs">सत्यापन विवरण:</span>
                  <span className="text-slate-600 text-xs">कोषाध्यक्ष द्वारा बैंक पासबुक/स्टेटमेंट मिलान पश्चात 80G रसीद आपके पंजीकृत मोबाइल/ईमेल पर भेजी जाएगी।</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <Button variant="outline" size="sm" icon={Printer} onClick={() => window.print()}>
                {isHindi ? 'रसीद विवरण प्रिंट करें' : 'Print Receipt Summary'}
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setConfirmedDonation(null);
                  setDonorData({
                    fullName: '',
                    mobile: '',
                    email: '',
                    panNumber: '',
                    address: '',
                    isAnonymous: false,
                    paymentRef: '',
                  });
                }}
              >
                {isHindi ? 'दूसरा दान करें' : 'Make Another Donation'}
              </Button>
            </div>
          </div>
        ) : (
          /* Main Donation Form Container */
          <form onSubmit={handleSubmitDonation} className="space-y-8">
            {/* Step 1: Select Purpose */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <span className="w-7 h-7 rounded-lg bg-ngo-green-800 text-white font-black text-xs flex items-center justify-center">
                  1
                </span>
                <h2 className="text-lg font-bold text-slate-900">
                  {isHindi ? 'दान का उद्देश्य चुनें (Select Donation Purpose)' : '1. Choose Donation Purpose'}
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {DONATION_PURPOSES.map((purp) => {
                  const Icon = purp.icon;
                  const isSelected = selectedPurpose === purp.id;
                  return (
                    <div
                      key={purp.id}
                      onClick={() => setSelectedPurpose(purp.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all space-y-2 select-none ${
                        isSelected
                          ? 'bg-ngo-green-50 border-ngo-green-600 ring-2 ring-ngo-green-500/30 shadow-xs'
                          : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold ${
                            isSelected ? 'bg-ngo-green-700 text-white' : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        {isSelected && <CheckCircle2 className="w-5 h-5 text-ngo-green-700" />}
                      </div>
                      <div>
                        <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                          {isHindi ? purp.titleHi : purp.titleEn}
                        </h3>
                        <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                          {isHindi ? purp.descHi : purp.descEn}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Select Amount */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <span className="w-7 h-7 rounded-lg bg-ngo-green-800 text-white font-black text-xs flex items-center justify-center">
                  2
                </span>
                <h2 className="text-lg font-bold text-slate-900">
                  {isHindi ? 'दान राशि चुनें (Select Amount)' : '2. Select Amount'}
                </h2>
              </div>

              {/* Preset Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {PRESET_AMOUNTS.map((amt) => {
                  const isSelected = selectedAmount === amt && !customAmount;
                  return (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => {
                        setSelectedAmount(amt);
                        setCustomAmount('');
                      }}
                      className={`py-3 px-4 rounded-xl text-sm sm:text-base font-black border transition-all ${
                        isSelected
                          ? 'bg-ngo-gold-500 text-slate-950 border-ngo-gold-600 ring-2 ring-ngo-gold-400 shadow-xs'
                          : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      ₹{amt.toLocaleString('en-IN')}
                    </button>
                  );
                })}
              </div>

              {/* Custom Amount Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {isHindi ? 'या अपनी इच्छानुसार राशि दर्ज करें (Custom Amount):' : 'Or enter custom amount:'}
                </label>
                <div className="relative max-w-xs">
                  <span className="absolute left-3.5 top-2.5 font-bold text-slate-500">₹</span>
                  <input
                    type="number"
                    min={50}
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(0);
                    }}
                    placeholder={isHindi ? 'उदा. 2100' : 'e.g. 2100'}
                    className={`w-full pl-8 pr-3.5 py-2 text-sm rounded-xl border ${
                      errors.amount ? 'border-red-500 bg-red-50' : 'border-slate-300'
                    } focus:outline-none focus:ring-2 focus:ring-ngo-green-700 font-bold`}
                  />
                </div>
                {errors.amount && <p className="text-xs text-red-600 mt-1">{errors.amount}</p>}
              </div>

              <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200 text-xs text-ngo-green-900 flex items-center justify-between">
                <span>कुल चुना गया योगदान (Selected Contribution):</span>
                <span className="text-lg font-black text-ngo-green-900">₹{getEffectiveAmount().toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Step 3: Payment Method & Banking Details */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <span className="w-7 h-7 rounded-lg bg-ngo-green-800 text-white font-black text-xs flex items-center justify-center">
                  3
                </span>
                <h2 className="text-lg font-bold text-slate-900">
                  {isHindi ? 'भुगतान माध्यम (Select Payment Method)' : '3. Select Payment Method'}
                </h2>
              </div>

              {/* Payment Method Tabs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Method 1: Instant UPI */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 rounded-xl border text-left space-y-1 transition-all ${
                    paymentMethod === 'upi'
                      ? 'bg-emerald-50 border-ngo-green-600 ring-2 ring-ngo-green-500/30'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <QrCode className="w-5 h-5 text-ngo-green-700" />
                    {paymentMethod === 'upi' && <CheckCircle2 className="w-4 h-4 text-ngo-green-700" />}
                  </div>
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900">UPI QR & Mobile Apps</h3>
                  <p className="text-[11px] text-slate-500">GPay, PhonePe, Paytm, BHIM</p>
                </button>

                {/* Method 2: Direct Bank Transfer */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('bank_transfer')}
                  className={`p-4 rounded-xl border text-left space-y-1 transition-all ${
                    paymentMethod === 'bank_transfer'
                      ? 'bg-emerald-50 border-ngo-green-600 ring-2 ring-ngo-green-500/30'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Building2 className="w-5 h-5 text-ngo-green-700" />
                    {paymentMethod === 'bank_transfer' && <CheckCircle2 className="w-4 h-4 text-ngo-green-700" />}
                  </div>
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900">Bank Transfer (NEFT/RTGS)</h3>
                  <p className="text-[11px] text-slate-500">SBI Nawagarh Account</p>
                </button>

                {/* Method 3: Online Gateway Placeholder */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('gateway_placeholder')}
                  className={`p-4 rounded-xl border text-left space-y-1 transition-all ${
                    paymentMethod === 'gateway_placeholder'
                      ? 'bg-amber-50 border-amber-600 ring-2 ring-amber-500/30'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <CreditCard className="w-5 h-5 text-amber-700" />
                    {paymentMethod === 'gateway_placeholder' && <CheckCircle2 className="w-4 h-4 text-amber-700" />}
                  </div>
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900">Credit/Debit Card (Gateway)</h3>
                  <p className="text-[11px] text-amber-800 font-semibold">Testing Stage (परीक्षण चरण)</p>
                </button>
              </div>

              {/* Dynamic Payment Method Display Content */}
              {paymentMethod === 'upi' && (
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4 animate-fade-in">
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    {/* Simulated QR Code Box */}
                    <div className="w-40 h-40 bg-white p-3 rounded-2xl border border-slate-300 shadow-md flex flex-col items-center justify-center shrink-0 text-center">
                      <div className="w-32 h-32 bg-slate-900 rounded-xl p-2 flex items-center justify-center text-white text-[10px] font-mono text-center">
                        [ Official NGO UPI QR Code Scanner ]
                      </div>
                    </div>

                    <div className="space-y-2 text-xs sm:text-sm text-slate-800">
                      <h4 className="font-bold text-slate-900 text-base">स्कैन कर किसी भी UPI ऐप से भुगतान करें</h4>
                      <p className="text-slate-600">
                        आप Google Pay, PhonePe, Paytm या BHIM ऐप से नीचे दिए गए UPI ID पर सीधे ₹{getEffectiveAmount()} ट्रान्सफर कर सकते हैं:
                      </p>

                      <div className="inline-flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-300 font-mono font-bold text-ngo-green-900">
                        <span>mbks.ngo@sbi</span>
                        <button
                          type="button"
                          onClick={() => handleCopy('mbks.ngo@sbi', 'upi')}
                          className="p-1 text-slate-400 hover:text-slate-700"
                        >
                          {copiedField === 'upi' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'bank_transfer' && (
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3 text-xs sm:text-sm animate-fade-in">
                  <h4 className="font-bold text-slate-900 text-sm border-b border-slate-200 pb-2">
                    मां-बाबूजी जनकल्याण समिति - आधिकारिक बैंक खाता विवरण
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <span className="text-slate-500 block text-xs">खाताधारक का नाम (Account Name):</span>
                      <span className="font-bold text-slate-900">Maa-Babuji Jankalyan Samiti Chhattisgarh</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-xs">बैंक का नाम (Bank Name):</span>
                      <span className="font-bold text-slate-900">State Bank of India (SBI)</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-xs">खाता संख्या (Account No.):</span>
                      <span className="font-mono font-extrabold text-ngo-green-900 text-sm">432100982614</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-xs">IFSC कोड (IFSC Code):</span>
                      <span className="font-mono font-bold text-slate-900">SBIN0002874</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-xs">शाखा (Branch):</span>
                      <span className="font-medium text-slate-800">Nawagarh (Janjgir-Champa, C.G.)</span>
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'gateway_placeholder' && (
                <div className="bg-amber-50 p-5 rounded-2xl border border-amber-200 space-y-2 text-xs sm:text-sm text-amber-900 animate-fade-in">
                  <div className="flex items-center gap-2 font-bold text-amber-900 text-sm">
                    <AlertCircle className="w-5 h-5 text-amber-700" />
                    <span>गेटवे एकीकरण सूचना (Payment Gateway Notice)</span>
                  </div>
                  <p className="leading-relaxed">
                    स्वचालित कार्ड/नेटबैंकिंग गेटवे वर्तमान में परीक्षण एवं बैंक सत्यापन चरण में है। कृपया सीधे <strong>UPI QR</strong> या <strong>बैंक खाता ट्रांसफर (NEFT/IMPS)</strong> विकल्प का उपयोग करें।
                  </p>
                </div>
              )}

              {/* UTR / Transaction Ref Number Input */}
              {paymentMethod !== 'gateway_placeholder' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">
                    {isHindi
                      ? 'भुगतान के बाद प्राप्त 12-अंकों का UTR / UPI Reference / Cheque No. *'
                      : 'Payment UTR / Transaction Reference Number *'}
                  </label>
                  <input
                    type="text"
                    value={donorData.paymentRef}
                    onChange={(e) => setDonorData({ ...donorData, paymentRef: e.target.value })}
                    placeholder={isHindi ? 'उदा. UPI-429104820192 या NEFT-12345' : 'e.g. UPI-429104820192'}
                    className={`w-full max-w-md px-3.5 py-2.5 rounded-xl border ${
                      errors.paymentRef ? 'border-red-500 bg-red-50' : 'border-slate-300'
                    } focus:outline-none focus:ring-2 focus:ring-ngo-green-700 text-xs sm:text-sm font-mono`}
                  />
                  {errors.paymentRef && <p className="text-xs text-red-600 mt-1">{errors.paymentRef}</p>}
                </div>
              )}
            </div>

            {/* Step 4: Donor Information */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <span className="w-7 h-7 rounded-lg bg-ngo-green-800 text-white font-black text-xs flex items-center justify-center">
                  4
                </span>
                <h2 className="text-lg font-bold text-slate-900">
                  {isHindi ? 'दानदाता का विवरण (Donor Information)' : '4. Donor Details'}
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs sm:text-sm">
                {/* Full Name */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {isHindi ? 'पूरा नाम (Full Name) *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    disabled={donorData.isAnonymous}
                    value={donorData.fullName}
                    onChange={(e) => setDonorData({ ...donorData, fullName: e.target.value })}
                    placeholder={isHindi ? 'उदा. रमेश देवांगन' : 'e.g. Ramesh Dewangan'}
                    className={`w-full px-3.5 py-2.5 rounded-lg border ${
                      errors.fullName ? 'border-red-500 bg-red-50' : 'border-slate-300'
                    } focus:outline-none focus:ring-2 focus:ring-ngo-green-700 ${donorData.isAnonymous ? 'bg-slate-100' : ''}`}
                  />
                  {errors.fullName && <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>}
                </div>

                {/* Mobile */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {isHindi ? 'मोबाइल नंबर (Mobile) *' : 'Mobile Number *'}
                  </label>
                  <input
                    type="tel"
                    maxLength={10}
                    value={donorData.mobile}
                    onChange={(e) => setDonorData({ ...donorData, mobile: e.target.value.replace(/\D/g, '') })}
                    placeholder="98261XXXXX"
                    className={`w-full px-3.5 py-2.5 rounded-lg border ${
                      errors.mobile ? 'border-red-500 bg-red-50' : 'border-slate-300'
                    } focus:outline-none focus:ring-2 focus:ring-ngo-green-700`}
                  />
                  {errors.mobile && <p className="text-[11px] text-red-600 mt-1">{errors.mobile}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {isHindi ? 'ईमेल (Email Address for 80G PDF)' : 'Email Address'}
                  </label>
                  <input
                    type="email"
                    value={donorData.email}
                    onChange={(e) => setDonorData({ ...donorData, email: e.target.value })}
                    placeholder="name@example.com"
                    className={`w-full px-3.5 py-2.5 rounded-lg border ${
                      errors.email ? 'border-red-500 bg-red-50' : 'border-slate-300'
                    } focus:outline-none focus:ring-2 focus:ring-ngo-green-700`}
                  />
                  {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>}
                </div>

                {/* PAN Number */}
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {isHindi ? 'PAN कार्ड नंबर (80G रसीद छूट हेतु)' : 'PAN Card Number (For 80G Tax Exemption)'}
                  </label>
                  <input
                    type="text"
                    maxLength={10}
                    value={donorData.panNumber}
                    onChange={(e) => setDonorData({ ...donorData, panNumber: e.target.value.toUpperCase() })}
                    placeholder="ABCDE1234F"
                    className={`w-full px-3.5 py-2.5 rounded-lg border ${
                      errors.panNumber ? 'border-red-500 bg-red-50' : 'border-slate-300'
                    } focus:outline-none focus:ring-2 focus:ring-ngo-green-700 uppercase font-mono`}
                  />
                  {errors.panNumber && <p className="text-[11px] text-red-600 mt-1">{errors.panNumber}</p>}
                </div>

                {/* Address */}
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">
                    {isHindi ? 'पता / नगर / जिला' : 'Full Address'}
                  </label>
                  <input
                    type="text"
                    value={donorData.address}
                    onChange={(e) => setDonorData({ ...donorData, address: e.target.value })}
                    placeholder={isHindi ? 'उदा. भाठा पारा, नवागढ़, जांजगीर-चांपा' : 'Address details'}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ngo-green-700"
                  />
                </div>
              </div>

              {/* Anonymous Checkbox */}
              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={donorData.isAnonymous}
                    onChange={(e) => setDonorData({ ...donorData, isAnonymous: e.target.checked })}
                    className="w-4 h-4 text-ngo-green-700 rounded focus:ring-ngo-green-700"
                  />
                  <span className="text-xs font-semibold text-slate-700">
                    {isHindi ? 'मेरा नाम गुप्त रखें (Make donation anonymous)' : 'Keep my donation anonymous on public website'}
                  </span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <Button
                type="submit"
                isLoading={submitting}
                variant="gold"
                size="lg"
                className="w-full text-base py-3.5 shadow-lg"
              >
                {isHindi
                  ? `₹${getEffectiveAmount().toLocaleString('en-IN')} का दान जमा करें (Submit Donation)`
                  : `Submit ₹${getEffectiveAmount().toLocaleString('en-IN')} Donation`}
              </Button>
            </div>
          </form>
        )}
      </Container>
    </div>
  );
};
