import React from 'react';
import { SEOHead } from '../../components/common/SEOHead';
import { useParams, Navigate } from 'react-router-dom';
import { PROGRAMS_DATA } from '../../data/programsData';
import { ProgramHeader } from '../../components/programs/ProgramHeader';
import { ProgramActivities } from '../../components/programs/ProgramActivities';
import { ProgramBeneficiariesImpact } from '../../components/programs/ProgramBeneficiariesImpact';
import { ProgramCTA } from '../../components/programs/ProgramCTA';

export const ProgramDetail = ({ customSlug }) => {
  const params = useParams();
  const slug = customSlug || params.slug;

  const program = PROGRAMS_DATA[slug];

  if (!program) {
    return <Navigate to="/programs" replace />;
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <SEOHead
        title={`${program.titleHi} (${program.titleEn})`}
        description={`${program.introHi} मां-बाबूजी जनकल्याण समिति, नवागढ़, जांजगीर-चांपा।`}
        canonicalUrl={`https://mbks-cg.org/programs/${slug}`}
      />
      {/* 1. Header with Title, Cover & Intro */}
      <ProgramHeader program={program} />

      {/* 2. Objectives & Activities */}
      <ProgramActivities objectives={program.objectives} activities={program.activities} />

      {/* 3. Target Beneficiaries & Impact */}
      <ProgramBeneficiariesImpact
        targetBeneficiaries={program.targetBeneficiaries}
        expectedImpact={program.expectedImpact}
      />

      {/* 4. Call to Action */}
      <ProgramCTA programTitleHi={program.titleHi} programTitleEn={program.titleEn} />
    </div>
  );
};
