import React from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { HeroSection } from '../components/sections/HeroSection';
import { WhoWeAre } from '../components/sections/WhoWeAre';
import { FeaturedIngredient } from '../components/sections/FeaturedIngredient';
import { JourneySection } from '../components/sections/JourneySection';
import { QualitySection } from '../components/sections/QualitySection';
import { ScienceSection } from '../components/sections/ScienceSection';
import { ApplicationsSection } from '../components/sections/ApplicationsSection';
import { SustainabilitySection } from '../components/sections/SustainabilitySection';
import { ManufacturingSection } from '../components/sections/ManufacturingSection';
import { FutureVisionSection } from '../components/sections/FutureVisionSection';
import { GlobalSection } from '../components/sections/GlobalSection';
import { InsightsSection } from '../components/sections/InsightsSection';
import { PartnerSection } from '../components/sections/PartnerSection';
import { TrustComplianceSection } from '../components/sections/TrustComplianceSection';

export function HomePage() {
  return (
    <PageWrapper
      title="BhuviQ Nyra International | Natural Ingredients"
      description="BhuviQ Nyra International transforms naturally sourced agricultural resources into high-quality ingredients for food, nutrition, wellness and beyond."
    >
      <HeroSection />
      <WhoWeAre />
      <FeaturedIngredient />
      <JourneySection />
      <QualitySection />
      <ScienceSection />
      <ApplicationsSection />
      <SustainabilitySection />
      <ManufacturingSection />
      <FutureVisionSection />
      <GlobalSection />
      <InsightsSection />
      <PartnerSection />
      <TrustComplianceSection />
    </PageWrapper>
  );
}
