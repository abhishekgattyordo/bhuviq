import React from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import { Leaf, Recycle, Factory, Compass, CheckCircle2, ShieldCheck, HeartHandshake, Trees } from 'lucide-react';
import { useRouter } from '../context/RouterContext';

export function SustainabilityPage() {
  const { navigate } = useRouter();

  const focusAreas = [
    {
      title: "Responsible Sourcing",
      subtitle: "Farmer Partnerships & Origin Transparency",
      icon: <Leaf className="w-6 h-6" />,
      description: "Direct engagement with grower cooperatives eliminates predatory intermediaries, guaranteeing transparent farm-gate compensation while ensuring full botanical traceability from orchard to processing floor.",
      practices: [
        "Long-term harvest agreements with regional farmer clusters",
        "Orchard-level batch tagging for complete chain-of-custody",
        "Promotion of regenerative agricultural soil practices",
        "Support for organic transition programs"
      ]
    },
    {
      title: "Resource Efficiency",
      subtitle: "Full Biomass Utilization & Circularity",
      icon: <Recycle className="w-6 h-6" />,
      description: "We view every part of agricultural intake as valuable. Secondary botanical fractions not destined for primary food-grade powders are redirected into organic soil enrichers, animal feeds, and bio-compost.",
      practices: [
        "Zero organic waste to landfill operational standard",
        "Peel and fibrous fraction diversion to regional bio-composting",
        "Process water condensation recapture for boiler pre-feed",
        "Optimized dry yield conversion algorithms"
      ]
    },
    {
      title: "Responsible Manufacturing",
      subtitle: "Energy-Conscious Clean Operations",
      icon: <Factory className="w-6 h-6" />,
      description: "Our processing facility integrates energy-efficient thermal exchangers, variable-frequency drives, and closed-loop heating cycles to minimize electrical and thermal consumption per kilogram produced.",
      practices: [
        "SS-316 insulated thermal drying chambers minimizing ambient heat loss",
        "Variable speed blowers mapped to real-time moisture release curves",
        "Continuous automated energy monitoring across all motor circuits",
        "Environmentally benign CIP (Clean-In-Place) sanitation agents"
      ]
    },
    {
      title: "Future-Focused Sustainability",
      subtitle: "Community Stewardship & Sustainable Growth",
      icon: <Compass className="w-6 h-6" />,
      description: "Sustainability is not a marketing checkbox — it is our core operating thesis. We invest in local rural workforce upskilling, hygienic processing certifications, and renewable energy integration.",
      practices: [
        "Skill enhancement training for local processing technicians",
        "Gender-inclusive operational staffing in sorting and QC roles",
        "Rooftop solar photovoltaic feasibility integration roadmap",
        "Biodegradable barrier packaging testing in collaboration with converters"
      ]
    }
  ];

  return (
    <PageWrapper
      title="Sustainability & Ethics | BhuviQ Nyra International"
      description="Rooted in Nature — Ethical sourcing, zero-landfill circularity, and responsible manufacturing practices across our natural ingredient supply chain."
    >
      {/* Hero */}
      <section className="relative bg-[#1C3F30] text-white pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/terrasynch_farm_supply_traceability_1795783124890.jpg"
            alt="Sustainable tropical banana plantation and traceable farming"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-25 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C3F30] via-[#1C3F30]/85 to-[#1C3F30]/60" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#B89B5E] text-xs font-semibold uppercase tracking-widest border border-[#B89B5E]/30">
            <span>Environmental Stewardship</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.1] text-[#FAF7F0]">
            Rooted in <span className="italic font-light">Nature</span>
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-xl text-[#FAF7F0]/85 font-light leading-relaxed">
            We believe commercial value creation must begin with profound respect for the natural ecosystems and agrarian communities that make our ingredients possible.
          </p>
        </div>
      </section>

      {/* Focus Areas Detail Grid */}
      <section className="py-20 bg-[#FAF8F2] text-[#17202A] border-b border-[#102A43]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <SectionHeading
            eyebrow="Charter & Implementation"
            title="Four Environmental Focus Areas"
            subtitle="Pragmatic, audited operational standards executed daily on our factory floor and within partner orchards."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {focusAreas.map((area, idx) => (
              <div
                key={area.title}
                className="p-8 sm:p-10 bg-white border border-[#102A43]/15 rounded-sm space-y-5 shadow-xs hover:border-[#285943] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-full bg-[#285943]/10 text-[#285943] flex items-center justify-center">
                    {area.icon}
                  </div>
                  <span className="font-mono text-xs font-bold text-[#B89B5E]">
                    PILLAR 0{idx + 1}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-2xl text-[#102A43] font-semibold">
                    {area.title}
                  </h3>
                  <p className="text-xs uppercase tracking-wider text-[#285943] font-semibold mt-0.5">
                    {area.subtitle}
                  </p>
                </div>

                <p className="text-sm text-[#667085] leading-relaxed font-light">
                  {area.description}
                </p>

                <div className="space-y-2 pt-2 border-t border-[#102A43]/10">
                  <span className="text-xs uppercase tracking-wider text-[#102A43] font-semibold block">
                    Verified Operating Standards:
                  </span>
                  <div className="space-y-1.5">
                    {area.practices.map((practice) => (
                      <div key={practice} className="flex items-start gap-2 text-xs text-[#17202A]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#285943] shrink-0 mt-0.5" />
                        <span>{practice}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sustainable Partner CTA */}
          <div className="p-8 sm:p-12 bg-[#102A43] text-white rounded-sm border border-[#B89B5E]/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 max-w-2xl">
              <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF7F0]">
                Partner With Us for Sustainable Ingredients
              </h3>
              <p className="text-sm text-[#FAF7F0]/80 font-light leading-relaxed">
                Connect with our supply chain team to request origin audit documentation, farmer cluster mapping, and sustainability dossiers for your ESG reporting.
              </p>
            </div>
            <Button
              href="/partner-with-us"
              variant="gold"
              size="md"
              showArrow
              className="shrink-0"
            >
              Initiate Collaboration
            </Button>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
