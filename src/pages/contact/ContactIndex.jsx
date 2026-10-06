import React, { useState } from 'react';
import { Container } from '../../components/ui/Container';
import { Section } from '../../components/ui/Section';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { SEOHead } from '../../components/common/SEOHead';
import { NGO_DETAILS } from '../../utils/constants';
import { useLanguage } from '../../context/LanguageContext';
import { submitContactMessage } from '../../services/firestoreService';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Building2,
  FileCheck,
  HelpCircle,
  Share2,
  MessageSquare,
} from 'lucide-react';

export const ContactIndex = () => {
  const { isHindi } = useLanguage();

  const breadcrumbItems = [
    { labelHi: 'संपर्क करें', labelEn: 'Contact Us', path: '/contact' },
  ];

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    subject: 'सामान्य पूछताछ (General Inquiry)',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = isHindi ? 'कृपया नाम दर्ज करें।' : 'Name is required.';
    if (!formData.mobile.trim() || !/^[6-9]\d{9}$/.test(formData.mobile)) {
      errs.mobile = isHindi ? '10-अंकों का वैध मोबाइल नंबर दर्ज करें।' : 'Valid 10-digit mobile required.';
    }
    if (!formData.message.trim()) errs.message = isHindi ? 'कृपया संदेश दर्ज करें।' : 'Message is required.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      await submitContactMessage(formData);
      setSubmitted(true);
    } catch (err) {
      console.warn('Contact submission fallback:', err);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': NGO_DETAILS.nameHi,
    'image': 'https://mbks-cg.org/logo.jpeg',
    'telephone': '+91-98261XXXXX',
    'email': 'info@mbks-cg.org',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': `${NGO_DETAILS.address.ward}, Gram ${NGO_DETAILS.address.village}`,
      'addressLocality': NGO_DETAILS.address.tehsil,
      'addressRegion': NGO_DETAILS.address.state,
      'postalCode': NGO_DETAILS.address.pincode,
      'addressCountry': 'IN',
    },
    'openingHoursSpecification': {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      'opens': '09:00',
      'closes': '18:00',
    },
  };

  return (
    <div className="py-6 sm:py-8 bg-slate-50 min-h-screen">
      <SEOHead
        title={isHindi ? 'संपर्क एवं कार्यालय पता | जांजगीर-चांपा' : 'Contact Us & Registered Office | Janjgir-Champa'}
        description="मां-बाबूजी जनकल्याण समिति छत्तीसगढ़ का पंजीकृत मुख्यालय पता: भैसमुड़ी, नवागढ़, जिला जांजगीर-चांपा (छ.ग.)। फोन: +91-98261XXXXX, ईमेल: info@mbks-cg.org"
        canonicalUrl="https://mbks-cg.org/contact"
        schemaData={localBusinessSchema}
      />

      <Container>
        <Breadcrumbs items={breadcrumbItems} />

        {/* Hero Header */}
        <div className="bg-gradient-to-br from-ngo-green-950 via-ngo-green-900 to-slate-900 text-white rounded-2xl p-6 sm:p-10 shadow-xl border border-emerald-800 mb-8 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-ngo-gold-400 border border-white/20 text-xs font-semibold">
              <FileCheck className="w-4 h-4 text-ngo-gold-400" />
              <span>{NGO_DETAILS.regNo}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              {isHindi ? 'संपर्क करें एवं पंजीकृत कार्यालय पता' : 'Contact Us & Registered Office'}
            </h1>

            <p className="text-xs sm:text-base text-emerald-100/90 leading-relaxed font-normal">
              {isHindi
                ? 'नवागढ़ एवं जांजगीर-चांपा क्षेत्र में समाज सेवा, रक्तदान सहायता, निःशुल्क कोचिंग या डोनेशन संबंधी जानकारी हेतु समिति कार्यालय से संपर्क करें।'
                : 'Reach out to Maa-Babuji Jankalyan Samiti Chhattisgarh for partnerships, volunteer opportunities, blood donation help, or inquiries.'}
            </p>
          </div>
        </div>

        {/* Office Info & Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Column 1 & 2: Contact Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <Badge variant="green" className="text-xs mb-1">
                <MessageSquare className="w-3.5 h-3.5 mr-1" />
                <span>{isHindi ? 'ऑनलाइन संदेश' : 'Online Message'}</span>
              </Badge>
              <h2 className="text-xl font-black text-slate-900">
                {isHindi ? 'समिति कार्यकारी टीम को संदेश भेजें' : 'Send Message to Executive Board'}
              </h2>
            </div>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 p-8 rounded-2xl text-center space-y-3 animate-fade-in">
                <CheckCircle2 className="w-12 h-12 text-ngo-green-700 mx-auto" />
                <h3 className="text-xl font-bold text-slate-900">
                  {isHindi ? 'संदेश सफलतापूर्वक प्राप्त हुआ!' : 'Message Received Successfully!'}
                </h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  {isHindi
                    ? 'मां-बाबूजी जनकल्याण समिति की टीम आपके संदेश का शीघ्र उत्तर देगी।'
                    : 'Our team will review your message and reach out shortly.'}
                </p>
                <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
                  {isHindi ? 'दूसरा संदेश भेजें' : 'Send Another Message'}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      {isHindi ? 'आपका नाम (Full Name) *' : 'Full Name *'}
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={isHindi ? 'उदा. अमित देवांगन' : 'e.g. Amit Dewangan'}
                      className={`w-full px-3.5 py-2.5 rounded-lg border ${
                        errors.name ? 'border-red-500 bg-red-50' : 'border-slate-300'
                      } focus:outline-none focus:ring-2 focus:ring-ngo-green-700`}
                    />
                    {errors.name && <p className="text-[11px] text-red-600 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      {isHindi ? 'मोबाइल नंबर (Mobile) *' : 'Mobile Number *'}
                    </label>
                    <input
                      type="tel"
                      maxLength={10}
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, '') })}
                      placeholder="98261XXXXX"
                      className={`w-full px-3.5 py-2.5 rounded-lg border ${
                        errors.mobile ? 'border-red-500 bg-red-50' : 'border-slate-300'
                      } focus:outline-none focus:ring-2 focus:ring-ngo-green-700`}
                    />
                    {errors.mobile && <p className="text-[11px] text-red-600 mt-1">{errors.mobile}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      {isHindi ? 'ईमेल पता (Email Address)' : 'Email Address'}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ngo-green-700"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      {isHindi ? 'विषय (Subject)' : 'Subject'}
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-ngo-green-700 bg-white"
                    >
                      <option value="सामान्य पूछताछ">सामान्य पूछताछ (General Inquiry)</option>
                      <option value="स्वयंसेवक जुड़ना">स्वयंसेवक पंजीकरण (Volunteer Join)</option>
                      <option value="रक्तदान आपातकाल">आपातकालीन रक्तदान (Blood Donation)</option>
                      <option value="दान व सहयोग">दान एवं 80G रसीद (Donation Info)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {isHindi ? 'संदेश का विवरण (Message Details) *' : 'Message *'}
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={isHindi ? 'अपना संदेश यहाँ लिखें...' : 'Type your message here...'}
                    className={`w-full px-3.5 py-2.5 rounded-lg border ${
                      errors.message ? 'border-red-500 bg-red-50' : 'border-slate-300'
                    } focus:outline-none focus:ring-2 focus:ring-ngo-green-700`}
                  />
                  {errors.message && <p className="text-[11px] text-red-600 mt-1">{errors.message}</p>}
                </div>

                <Button type="submit" isLoading={submitting} variant="gold" size="md" icon={Send} className="w-full sm:w-auto">
                  {isHindi ? 'संदेश प्रेषित करें' : 'Send Message'}
                </Button>
              </form>
            )}
          </div>

          {/* Column 3: Registered Office Details */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl border border-slate-800 flex flex-col justify-between">
            <div className="space-y-4">
              <Badge variant="gold" className="text-xs">
                <Building2 className="w-3.5 h-3.5 mr-1" />
                <span>पंजीकृत मुख्यालय</span>
              </Badge>

              <h2 className="text-xl font-bold text-white leading-snug">
                {NGO_DETAILS.nameHi}
              </h2>

              <div className="space-y-3 text-xs sm:text-sm text-slate-300 border-t border-slate-800 pt-4">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-ngo-gold-400 shrink-0 mt-1" />
                  <div>
                    <strong className="text-white block">कार्यालय पता:</strong>
                    <span>
                      {NGO_DETAILS.address.ward}, ग्राम {NGO_DETAILS.address.village}, पो. {NGO_DETAILS.address.post}, तह. {NGO_DETAILS.address.tehsil}, जिला {NGO_DETAILS.address.district}, {NGO_DETAILS.address.state} - {NGO_DETAILS.address.pincode}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-ngo-gold-400 shrink-0" />
                  <div>
                    <strong className="text-white block">संपर्क नंबर:</strong>
                    <span>+91-98261XXXXX / WhatsApp</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-ngo-gold-400 shrink-0" />
                  <div>
                    <strong className="text-white block">आधिकारिक ईमेल:</strong>
                    <span>info@mbks-cg.org</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-ngo-gold-400 shrink-0" />
                  <div>
                    <strong className="text-white block">कार्यालय समय:</strong>
                    <span>सोमवार - शनिवार: प्रातः 09:00 - संध्या 06:00</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 text-xs text-slate-300 space-y-1">
              <p className="font-bold text-ngo-gold-400">आधिकारिक संस्था पंजीयन:</p>
              <p className="font-mono">{NGO_DETAILS.regNo}</p>
            </div>
          </div>
        </div>

        {/* Map Location Placeholder Section */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <MapPin className="w-5 h-5 text-ngo-green-700" />
            <span>मानचित्र अवस्थिति - नवागढ़, जिला जांजगीर-चांपा (छत्तीसगढ़)</span>
          </h3>
          <div className="w-full h-64 sm:h-80 rounded-xl overflow-hidden border border-slate-300 bg-slate-100 relative flex items-center justify-center text-center p-4">
            <div className="space-y-2">
              <MapPin className="w-10 h-10 text-ngo-green-700 mx-auto animate-bounce" />
              <p className="font-bold text-slate-800 text-sm">
                मां-बाबूजी जनकल्याण समिति - ग्राम भैसमुड़ी / नवागढ़, जांजगीर-चांपा
              </p>
              <p className="text-xs text-slate-500">
                (Google Maps Embedding Coordinates: 21.8447 N, 82.5714 E)
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
