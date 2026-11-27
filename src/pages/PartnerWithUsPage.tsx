import React from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { SectionHeading } from '../components/ui/SectionHeading';
import { PartnerSection } from '../components/sections/PartnerSection';
import { ShieldCheck, Truck, Sparkles, Sliders, CheckCircle2, Package, Globe, FileCheck } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useRouter } from '../context/RouterContext';

export function PartnerWithUsPage() {
  const { openSpecSheetModal } = useRouter();

  const partnerTiers = [
    {
      title: "Food & Beverage Brands",
      subtitle: "Clean-Label Reformulation",
      desc: "Incorporate 100% pure botanical banana powder to eliminate synthetic flavoring agents, stabilize bakery moisture, and deliver clean ingredient declarations.",
      perks: ["Custom mesh sizing (60–100 mesh)", "Low minimum trial orders", "Matrix compatibility guidance"]
    },
    {
      title: "Nutraceutical & Supplement Formulators",
      subtitle: "Active Nutrient Densities",
      desc: "Integrate high-potassium, gentle fiber-rich natural powders into sports electrolytes, meal replacement shakes, and digestive health blends.",
      perks: ["Rigorous microbial assay limits", "Full heavy metal testing dossiers", "Karl Fischer validated moisture"]
    },
    {
      title: "Clean Cosmetic & Personal Care Formulators",
      subtitle: "Botanical Actives",
      desc: "Harness rich potassium, fruit enzymes, and natural moisture-binding properties in gentle facial masks, scrubs, and dry haircare preparations.",
      perks: ["Sterile irradiation options upon request", "Non-GMO & allergen statements", "Fine micronized particle fraction"]
    },
    {
      title: "Global Ingredient Distributors & Importers",
      subtitle: "Secured Bulk Contracts",
      desc: "Establish direct multi-tonne supply agreements with guaranteed crop intake allocation, origin certificate clearance, and ocean-ready packaging.",
      perks: ["FCL containerized freight logistics", "Direct seaport origin dispatch", "Dedicated B2B account director"]
    }
  ];

  return (
    <PageWrapper
      title="Partner With Us | BhuviQ Nyra International"
      description="Collaborate with BhuviQ Nyra International for standardized B2B botanical supply, pilot evaluation batches, and custom natural ingredient co-development."
    >
      {/* Hero */}
      <section className="relative bg-[#102A43] text-white pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/responsible_sourcing_traceability_1795783459588.jpg"
            alt="Responsible agricultural partnership and ingredient sourcing"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-25 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#102A43] via-[#102A43]/85 to-[#102A43]/60" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#B89B5E] text-xs font-semibold uppercase tracking-widest border border-[#B89B5E]/30">
            <span>B2B Commercial & Technical Alliance</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.1] text-[#FAF7F0]">
            Partner with <span className="italic font-light">BhuviQ Nyra</span>
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-xl text-[#FAF7F0]/85 font-light leading-relaxed">
            Whether you need recurring container shipments of standardized Banana Powder or custom particle milling for specialized formulation trials, we are your reliable natural ingredient partner.
          </p>
        </div>
      </section>

      {/* Partner Profiles Grid */}
      <section className="py-20 bg-[#FAF8F2] text-[#17202A] border-b border-[#102A43]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionHeading
            eyebrow="Commercial Profiles"
            title="Tailored Solutions for Industrial Partners"
            subtitle="Explore how we support diverse formulation verticals and supply chain models."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {partnerTiers.map((tier, idx) => (
              <div
                key={tier.title}
                className="p-8 bg-white border border-[#102A43]/10 rounded-sm space-y-4 shadow-xs hover:border-[#285943] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#285943] font-bold">PROFILE 0{idx + 1}</span>
                  <span className="text-xs uppercase font-semibold text-[#B89B5E]">{tier.subtitle}</span>
                </div>

                <h3 className="font-serif text-2xl text-[#102A43] font-semibold">
                  {tier.title}
                </h3>

                <p className="text-sm text-[#667085] leading-relaxed font-light">
                  {tier.desc}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-[#102A43]/10">
                  {tier.perks.map((p) => (
                    <div key={p} className="flex items-center gap-2 text-xs text-[#17202A]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#285943] shrink-0" />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Technical Data Sheet & Specification Banner */}
          <div className="p-8 bg-[#285943]/10 border border-[#285943]/30 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#285943] text-white flex items-center justify-center shrink-0">
                <FileCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif text-xl font-semibold text-[#102A43]">
                  Review Technical Specifications & Release Parameters
                </h4>
                <p className="text-xs text-[#667085]">
                  Access physical, chemical, and microbiological release thresholds for pure banana powder.
                </p>
              </div>
            </div>
            <Button
              variant="primary"
              onClick={openSpecSheetModal}
              showArrow
            >
              View Specification Sheet
            </Button>
          </div>
        </div>
      </section>

      {/* Embedded Partner Form Component */}
      <PartnerSection />
    </PageWrapper>
  );
}
