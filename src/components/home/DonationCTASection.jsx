import React from 'react';
import { NavLink } from 'react-router-dom';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { NGO_DETAILS, BANK_DETAILS } from '../../utils/constants';
import { useLanguage } from '../../context/LanguageContext';
import { Heart, Building, ShieldCheck, FileText, QrCode } from 'lucide-react';

export const DonationCTASection = () => {
  const { isHindi } = useLanguage();

  return (
    <Section
      background="light"
      badge={isHindi ? 'ऑनलाइन दान व सहयोग' : 'Transparent Support'}
      badgeVariant="gold"
      title={isHindi ? 'आपका छोटा सा सहयोग, किसी का उज्ज्वल भविष्य' : 'Your Contribution Can Transform Lives Today'}
      subtitle={isHindi ? 'मां-बाबूजी जनकल्याण समिति के कार्यों में सहभागी बनें। आपका प्रत्येक रुपया सीधे ज़रूरतमंदों तक पहुँचता है:' : 'Partner with Maa-Babuji Jankalyan Samiti. Every rupee contributed goes directly to grassroots welfare projects:'}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Bank Account Details Card */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-ngo space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-ngo-gold-700 flex items-center justify-center font-bold">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {isHindi ? 'बैंक खाता विवरण (Bank Details)' : 'Official NGO Bank Account'}
                </h3>
                <p className="text-xs text-slate-500">
                  {isHindi ? 'डायरेक्ट बैंक ट्रांसफर (NEFT/RTGS/IMPS)' : 'Direct Bank Transfer'}
                </p>
              </div>
            </div>
            <Badge variant="green">{isHindi ? 'सत्यापित खाता' : 'Verified'}</Badge>
          </div>

          <div className="space-y-2.5 text-xs sm:text-sm text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex justify-between py-1 border-b border-slate-200/60">
              <span className="font-semibold text-slate-500">{isHindi ? 'खाता धारक का नाम:' : 'Account Name:'}</span>
              <span className="font-bold text-slate-900 text-right text-xs sm:text-sm">{BANK_DETAILS.accountName}</span>
            </div>

            <div className="flex justify-between py-1 border-b border-slate-200/60">
              <span className="font-semibold text-slate-500">{isHindi ? 'बैंक का नाम:' : 'Bank Name:'}</span>
              <span className="font-bold text-slate-900">{isHindi ? BANK_DETAILS.bankNameHi : BANK_DETAILS.bankName}</span>
            </div>

            <div className="flex justify-between py-1 border-b border-slate-200/60">
              <span className="font-semibold text-slate-500">{isHindi ? 'शाखा (Branch):' : 'Branch:'}</span>
              <span className="font-bold text-slate-900">{isHindi ? BANK_DETAILS.branchHi : BANK_DETAILS.branch}</span>
            </div>

            <div className="flex justify-between py-1 border-b border-slate-200/60">
              <span className="font-semibold text-slate-500">{isHindi ? 'खाता संख्या (A/C No):' : 'Account Number:'}</span>
              <span className="font-extrabold text-ngo-green-800 tracking-wider font-mono text-sm sm:text-base">{BANK_DETAILS.accountNo}</span>
            </div>

            <div className="flex justify-between py-1">
              <span className="font-semibold text-slate-500">{isHindi ? 'आईएफएससी कोड (IFSC):' : 'IFSC Code:'}</span>
              <span className="font-extrabold text-ngo-gold-800 tracking-wider font-mono text-sm sm:text-base">{BANK_DETAILS.ifsc}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
            <ShieldCheck className="w-4 h-4 text-ngo-green-700 shrink-0" />
            <span>{isHindi ? 'दान पश्चात् आधिकारिक रसीद एवं 80G टैक्स छूट प्रमाण पत्र प्राप्त करें।' : 'Tax exemption & official receipt issued for all contributions.'}</span>
          </div>
        </div>

        {/* Right Column: UPI QR Preview & Instant Donate CTA */}
        <div className="lg:col-span-6 bg-gradient-to-br from-ngo-green-900 to-ngo-green-950 text-white p-6 sm:p-8 rounded-2xl shadow-xl space-y-5 flex flex-col justify-between h-full border border-emerald-800">
          <div className="space-y-4">
            <Badge variant="gold" className="text-xs">
              <QrCode className="w-3.5 h-3.5 mr-1" />
              <span>{isHindi ? 'गूगल पे / फोनपे / पेटीएम / भीम UPI' : 'Instant UPI Payments'}</span>
            </Badge>

            <h3 className="text-xl font-bold text-white">
              {isHindi ? 'आधिकारिक QR कोड से तुरंत दान करें' : 'Scan & Donate via Official QR Code'}
            </h3>

            {/* Official QR Code & Info Display */}
            <div className="flex flex-col sm:flex-row items-center gap-4 bg-white/10 p-4 rounded-xl border border-white/20">
              <div className="w-28 h-36 bg-white p-1.5 rounded-lg shrink-0 shadow-md border border-white/40">
                <img
                  src={BANK_DETAILS.qrCodeImg}
                  alt="Union Bank Official QR Code"
                  className="w-full h-full object-contain rounded"
                />
              </div>

              <div className="space-y-2 text-xs text-center sm:text-left">
                <p className="font-bold text-ngo-gold-400 text-sm">{BANK_DETAILS.bankNameHi}</p>
                <p className="text-emerald-100 text-[11px] leading-tight font-medium">{BANK_DETAILS.accountName}</p>
                
                <div className="pt-1">
                  <span className="text-emerald-300 block text-[10px] uppercase tracking-wider">{isHindi ? 'आधिकारिक UPI ID:' : 'Official UPI ID:'}</span>
                  <span className="font-mono font-bold text-white text-[11px] sm:text-xs select-all bg-black/30 px-2 py-1 rounded block mt-0.5 break-all">
                    {BANK_DETAILS.upiId}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 space-y-2">
            <NavLink to="/donate" className="block">
              <Button variant="gold" size="lg" icon={Heart} className="w-full font-bold shadow-lg">
                {isHindi ? 'क्यूआर कोड स्कैन करें या ऑनलाइन दान करें' : 'Scan QR Code / Donate Online'}
              </Button>
            </NavLink>
            <p className="text-[11px] text-center text-emerald-300">
              {isHindi ? '100% सुरक्षित भुगतान एवं 80G टैक्स छूट रसीद' : '100% Secure Payment & Tax Exemption Receipt'}
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
};
