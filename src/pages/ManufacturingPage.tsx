import React, { useState } from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import { MANUFACTURING_CAPABILITIES, NINE_STEP_FLOW } from '../data/manufacturing';
import { ShieldCheck, Gauge, Layers, Package, QrCode, Truck, CheckCircle2, ChevronRight, FileCheck, ArrowRight } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { cn } from '../lib/utils';

export function ManufacturingPage() {
  const { openSpecSheetModal, navigate } = useRouter();
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const activeStep = NINE_STEP_FLOW[activeStepIndex];

  return (
    <PageWrapper
      title="Manufacturing & Facility | BhuviQ Nyra International"
      description="Built for Consistency — SS-316 hygienic processing lines, precision thermal drying regimes, and comprehensive batch traceability."
    >
      {/* Hero */}
      <section className="relative bg-[#102A43] text-white pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/sector_ss316_processing_line_1790839222801.jpg"
            alt="SS-316 enclosed banana processing line"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-25 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#102A43] via-[#102A43]/85 to-[#102A43]/60" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#B89B5E] text-xs font-semibold uppercase tracking-widest border border-[#B89B5E]/30">
            <span>Engineering & Process Integrity</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.1] text-[#FAF7F0]">
            Built for <span className="italic font-light">Consistency</span>
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-xl text-[#FAF7F0]/85 font-light leading-relaxed">
            State-of-the-art enclosed botanical processing architecture engineered to deliver repeatable particle dynamics, uniform moisture profiles, and zero-compromise hygiene.
          </p>
        </div>
      </section>

      {/* Facility Highlights Bar */}
      <section className="bg-[#0B1D2E] text-white border-y border-[#B89B5E]/30 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-xs">
          <div className="space-y-1">
            <span className="font-mono text-[#B89B5E] text-base font-bold">SS-316L</span>
            <p className="text-white/80">Sanitary Food-Grade Contact Surfaces</p>
          </div>
          <div className="space-y-1">
            <span className="font-mono text-[#B89B5E] text-base font-bold">Class 100k</span>
            <p className="text-white/80">Cleanroom Packaging Enclosures</p>
          </div>
          <div className="space-y-1">
            <span className="font-mono text-[#B89B5E] text-base font-bold">PLC Controlled</span>
            <p className="text-white/80">Multi-Zone Thermal Monitoring</p>
          </div>
          <div className="space-y-1">
            <span className="font-mono text-[#B89B5E] text-base font-bold">100% Traceable</span>
            <p className="text-white/80">Lot-to-Orchard Barcode Identity</p>
          </div>
        </div>
      </section>

      {/* 9-Step Facility Workflow Interactive Dashboard */}
      <section className="py-20 bg-[#FAF8F2] text-[#17202A] border-b border-[#102A43]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionHeading
            eyebrow="Process Engineering"
            title="Integrated 9-Step Facility Workflow"
            subtitle="Click any processing node to examine operational parameters, quality gates, and mechanical controls."
          />

          {/* Stepper Navigation */}
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2">
            {NINE_STEP_FLOW.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setActiveStepIndex(idx)}
                className={cn(
                  "p-3 rounded-sm border text-left transition-all cursor-pointer space-y-1",
                  activeStepIndex === idx
                    ? "bg-[#102A43] text-white border-[#B89B5E] shadow-sm"
                    : "bg-white text-[#17202A] border-[#102A43]/10 hover:border-[#102A43]/40"
                )}
              >
                <span className={cn(
                  "font-mono text-[10px] font-bold block",
                  activeStepIndex === idx ? "text-[#B89B5E]" : "text-[#285943]"
                )}>
                  STEP 0{s.id}
                </span>
                <span className="font-semibold text-xs leading-tight block truncate">
                  {s.name}
                </span>
              </button>
            ))}
          </div>

          {/* Active Node Detail Card */}
          <div className="bg-white border border-[#102A43]/15 rounded-sm p-8 sm:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs px-3 py-1 bg-[#102A43] text-white font-bold rounded-sm">
                  NODE 0{activeStep.id}
                </span>
                <span className="text-xs uppercase tracking-widest text-[#285943] font-semibold">
                  Manufacturing Section
                </span>
              </div>

              <div>
                <h3 className="font-serif text-3xl text-[#102A43] font-semibold">
                  {activeStep.name}
                </h3>
                <p className="text-sm text-[#667085] mt-1 font-light leading-relaxed">
                  {activeStep.detail}
                </p>
              </div>

              <div className="p-4 bg-[#FAF8F2] border border-[#102A43]/10 rounded-sm space-y-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#102A43] block">
                  Processing & Hygiene Control Protocol:
                </span>
                <p className="text-xs text-[#285943] font-mono">
                  Enclosed SS-316 sanitary contact • Continuous temperature & humidity telemetry
                </p>
                <div className="pt-2 border-t border-[#102A43]/10 flex items-center justify-between text-xs">
                  <span className="text-[#667085]">Critical Quality Control:</span>
                  <span className="font-semibold text-[#102A43]">In-line automated verification pass</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  disabled={activeStepIndex === 0}
                  onClick={() => setActiveStepIndex(p => Math.max(0, p - 1))}
                  className="px-3.5 py-1.5 rounded-sm bg-[#FAF8F2] border border-[#102A43]/15 text-xs font-semibold uppercase disabled:opacity-30 cursor-pointer hover:bg-white"
                >
                  Previous Node
                </button>
                <button
                  disabled={activeStepIndex === NINE_STEP_FLOW.length - 1}
                  onClick={() => setActiveStepIndex(p => Math.min(NINE_STEP_FLOW.length - 1, p + 1))}
                  className="px-3.5 py-1.5 rounded-sm bg-[#102A43] text-white text-xs font-semibold uppercase disabled:opacity-30 cursor-pointer hover:bg-[#1D3B58]"
                >
                  Next Node →
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-sm overflow-hidden aspect-[4/3] bg-[#102A43] shadow-md border border-[#102A43]/15">
                <img
                  src={activeStep.image}
                  alt={`BhuviQ Nyra Facility - Stage 0${activeStep.id}: ${activeStep.name}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/images/sector_ss316_processing_line_1790839222801.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#102A43]/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-mono">
                  Stage {activeStep.id} of 09 — Operational In-Line Assay
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facility Audit & Technical Specs CTA */}
      <section className="py-20 bg-[#F7F3EA] text-[#17202A] border-b border-[#102A43]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <SectionHeading
            align="center"
            eyebrow="Commercial Compliance"
            title="Request Facility Audit & Technical Dossier"
            subtitle="We welcome technical audits by prospective multinational partners and provide full compliance packages upon request."
          />

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Button
              href="/partner-with-us"
              variant="primary"
              size="lg"
              showArrow
            >
              Schedule Supplier Audit
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={openSpecSheetModal}
              icon={<FileCheck className="w-4 h-4 text-[#285943]" />}
            >
              View Plant Specifications (TDS)
            </Button>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
