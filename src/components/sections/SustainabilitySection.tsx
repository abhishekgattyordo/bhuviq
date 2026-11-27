import React, { useState } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import {
  Leaf,
  Recycle,
  Factory,
  Compass,
  MapPin,
  ClipboardCheck,
  Sprout,
  Tag,
  FileText,
  GitBranch
} from 'lucide-react';
import { Button } from '../ui/Button';

export function SustainabilitySection() {
  const [sourcingImgOk, setSourcingImgOk] = useState(true);

  const principles = [
    {
      title: 'Responsible Sourcing',
      description:
        'Direct collaboration with verified regional farmer clusters, fostering ethical farm-gate economics and predictable crop intake.',
      icon: <Leaf className="w-5 h-5" />
    },
    {
      title: 'Resource Efficiency',
      description:
        'Total agricultural utilization philosophy, redirecting botanical biomass toward organic composting and zero-landfill valorization.',
      icon: <Recycle className="w-5 h-5" />
    },
    {
      title: 'Responsible Manufacturing',
      description:
        'Optimized thermal recirculation loops and closed-loop process water systems to minimize operational energy footprint.',
      icon: <Factory className="w-5 h-5" />
    },
    {
      title: 'Future-Focused Sustainability',
      description:
        'Developing scalable natural ingredient architectures that replace synthetic additives with renewable, biodegradable alternatives.',
      icon: <Compass className="w-5 h-5" />
    }
  ];

  const traceabilityPillars = [
    {
      index: '01',
      title: 'Sourcing Origin',
      detail:
        'Bananas are sourced in India from approved agricultural suppliers and regional cultivation clusters across South India.',
      icon: MapPin
    },
    {
      index: '02',
      title: 'Raw-Material Quality',
      detail:
        'Incoming fruit consignments are inspected and graded for maturity, ripeness, size, and processing suitability prior to acceptance.',
      icon: ClipboardCheck
    },
    {
      index: '03',
      title: 'Banana Variety',
      detail:
        'Processed using ripe Musa acuminata / Musa balbisiana cultivars selected for consistent food-grade banana powder characteristics.',
      icon: Sprout
    },
    {
      index: '04',
      title: 'Batch / Lot Identification',
      detail:
        'Each production run is assigned a dedicated batch or lot identifier linking raw material intake to finished packaged drums and bags.',
      icon: Tag
    },
    {
      index: '05',
      title: 'Processing Records',
      detail:
        'Production logs document raw material intake, preparation, drying, milling & sieving, quality check parameters, and packing release.',
      icon: FileText
    },
    {
      index: '06',
      title: 'Traceability Practices',
      detail:
        'Lot-linked documentation maintains chain-of-custody from approved supplier origin through production logs and batch-specific CoAs.',
      icon: GitBranch
    }
  ];

  return (
    <section
      id="responsible-sourcing"
      className="py-24 sm:py-32 bg-[#1C3F30] text-[#FAF7F0] border-b border-[#B89B5E]/30 relative overflow-hidden"
    >
      {/* Subtle background ambient texture using verified local asset */}
      <div className="absolute inset-0 z-0 opacity-10 mix-blend-overlay pointer-events-none">
        <img
          src="/images/responsible_sourcing_traceability_1795783459588.jpg"
          alt=""
          aria-hidden="true"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-6 space-y-4">
            <SectionHeading
              theme="dark"
              eyebrow="Nature & Responsibility"
              title="Rooted in Nature"
              subtitle="Ethical stewardship, agricultural respect, and circular resource management."
            />
          </div>
          <div className="lg:col-span-6 space-y-4 pt-2">
            <p className="font-serif text-2xl sm:text-3xl text-[#FAF7F0] leading-snug font-normal">
              “We believe value creation should begin with respect for the resources that make it possible.”
            </p>
            <p className="text-sm text-[#FAF7F0]/80 leading-relaxed font-light">
              Our commitment to sustainability is operational, not promotional. By processing at the heart of agricultural basins, we eliminate excessive transport emissions, stabilize grower livelihoods, and establish clean, traceable chains of custody from the soil to finished B2B ingredient delivery.
            </p>
            <div className="pt-2">
              <Button href="/sustainability" variant="gold" size="sm" showArrow>
                Read Sustainability Charter
              </Button>
            </div>
          </div>
        </div>

        {/* 4 Principles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {principles.map((p, idx) => (
            <div
              key={p.title}
              className="p-6 bg-[#285943]/40 border border-[#B89B5E]/30 rounded-sm space-y-3.5 backdrop-blur-xs hover:border-[#B89B5E] transition-all duration-300 group"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-full bg-[#B89B5E]/20 text-[#B89B5E] flex items-center justify-center group-hover:bg-[#B89B5E] group-hover:text-[#102A43] transition-colors">
                  {p.icon}
                </div>
                <span className="font-mono text-xs text-[#B89B5E]/80 font-semibold">
                  0{idx + 1}
                </span>
              </div>

              <h4 className="font-serif text-xl text-[#FAF7F0] font-semibold">
                {p.title}
              </h4>

              <p className="text-xs text-[#FAF7F0]/75 leading-relaxed font-light">
                {p.description}
              </p>
            </div>
          ))}
        </div>

        {/* Dedicated Responsible Sourcing & Traceability Section */}
        <div
          id="responsible-sourcing-traceability"
          className="pt-14 border-t border-[#B89B5E]/30 space-y-10"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <SectionHeading
              theme="dark"
              eyebrow="Origin & Chain of Custody"
              title="Responsible Sourcing & Traceability"
              subtitle="Documented raw-material selection, variety evaluation, batch identification, and production records across every lot."
            />
            <Button href="/science-quality" variant="outline-light" size="sm" showArrow>
              Quality &amp; Lot CoA Standards
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Visual Card */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-[#102A43] border border-[#B89B5E]/30 rounded-sm overflow-hidden shadow-lg">
              <div className="relative aspect-[4/3] bg-[#102A43] overflow-hidden">
                {sourcingImgOk ? (
                  <img
                    src="/images/responsible_sourcing_traceability_1795783459588.jpg"
                    alt="Harvested bananas sorted and graded in food-grade crates for lot traceability"
                    referrerPolicy="no-referrer"
                    onError={() => setSourcingImgOk(false)}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#285943] to-[#102A43] flex flex-col items-center justify-center p-6 text-center text-[#FAF7F0]">
                    <Sprout className="w-8 h-8 text-[#B89B5E] mb-2" />
                    <span className="font-serif text-xl">Responsible Sourcing &amp; Traceability</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#102A43]/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 text-[#FAF7F0]">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#B89B5E] block">
                    Agricultural Intake &amp; Lot Grading
                  </span>
                  <p className="text-xs sm:text-sm font-medium mt-0.5 leading-snug">
                    Approved supplier intake graded prior to processing
                  </p>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="space-y-1.5">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#B89B5E] block font-semibold">
                    Chain-of-Custody Continuity
                  </span>
                  <p className="text-xs sm:text-sm text-[#FAF7F0]/80 leading-relaxed font-light">
                    Each batch maintains documented linkage from approved agricultural sourcing and cultivar intake through production records, quality verification, and sealed dispatch.
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#FAF7F0]/75">
                  <span>Supplier Intake</span>
                  <span aria-hidden="true" className="text-[#B89B5E]">·</span>
                  <span>Lot ID Assignment</span>
                  <span aria-hidden="true" className="text-[#B89B5E]">·</span>
                  <span>Batch Record Archival</span>
                </div>
              </div>
            </div>

            {/* Right 6 Traceability Pillars Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {traceabilityPillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.index}
                    className="p-6 bg-[#102A43]/75 border border-white/15 rounded-sm space-y-3 flex flex-col justify-between hover:border-[#B89B5E]/60 transition-colors"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="w-9 h-9 rounded-sm bg-[#285943]/40 border border-[#B89B5E]/35 text-[#B89B5E] flex items-center justify-center">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="font-mono tabular-nums text-xs font-bold text-[#B89B5E]">
                          {pillar.index}
                        </span>
                      </div>

                      <h4 className="font-serif text-xl font-semibold text-[#FAF7F0]">
                        {pillar.title}
                      </h4>

                      <p className="text-xs sm:text-sm text-[#FAF7F0]/80 leading-relaxed font-light">
                        {pillar.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
