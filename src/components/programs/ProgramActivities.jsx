import React from 'react';
import { Section } from '../ui/Section';
import { useLanguage } from '../../context/LanguageContext';
import { Target, CheckCircle2, Sparkles } from 'lucide-react';

export const ProgramActivities = ({ objectives = [], activities = [] }) => {
  const { isHindi } = useLanguage();

  return (
    <Section className="bg-slate-50 py-12">
      <div className="space-y-12 max-w-5xl mx-auto">
        {/* Objectives Subsection */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-ngo-green-700 flex items-center justify-center font-bold shrink-0">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                {isHindi ? 'कार्यक्रम के मुख्य उद्देश्य (Program Objectives)' : 'Program Objectives'}
              </h2>
              <p className="text-xs text-slate-500">
                {isHindi ? 'विधान नियम अनुसार निर्धारित लक्ष्य' : 'Statutory targets'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            {objectives.map((obj) => (
              <div key={obj.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-ngo-green-700 shrink-0 mt-0.5" />
                <span className="text-slate-700 leading-relaxed font-medium">
                  {isHindi ? obj.textHi : obj.textEn}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Activities Subsection */}
        {activities.length > 0 && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-ngo-gold-700 flex items-center justify-center font-bold shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  {isHindi ? 'प्रमुख गतिविधियां एवं पहल (Key Activities)' : 'Key Field Activities'}
                </h2>
                <p className="text-xs text-slate-500">
                  {isHindi ? 'जमीनी स्तर पर संचालित नियमित अभियान' : 'Regular field drives'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
              {activities.map((act, idx) => (
                <div key={idx} className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 hover:border-ngo-gold-700 transition-colors">
                  <span className="w-6 h-6 rounded-md bg-ngo-gold-700 text-white font-bold text-xs flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm pt-1">
                    {isHindi ? act.titleHi : act.titleEn}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-xs">
                    {isHindi ? act.descHi : act.descEn}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Section>
  );
};
