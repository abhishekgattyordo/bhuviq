import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';
import {
  Sprout,
  Droplets,
  Thermometer,
  Layers,
  ShieldCheck,
  PackageCheck,
  ArrowRight,
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';

interface ProcessingStage {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  inputLabel: string;
  processLabel: string;
  outputLabel: string;
  checkpoints: string[];
  icon: React.ComponentType<{ className?: string }>;
}

const PROCESSING_STAGES: ProcessingStage[] = [
  {
    step: '01',
    title: 'Raw Material',
    subtitle: 'Grading & Selection',
    description:
      'Ripe bananas are sourced from approved food-grade suppliers in India and graded for maturity, size, variety, and processing suitability prior to entering production.',
    inputLabel: 'Approved agricultural banana harvest',
    processLabel: 'Maturity, ripeness & visual intake grading',
    outputLabel: 'Traceable, uniform ripe fruit lot',
    checkpoints: [
      'Approved food-grade supplier sourcing',
      'Ripeness & visual quality sorting',
      'Supplier lot origin traceability'
    ],
    icon: Sprout
  },
  {
    step: '02',
    title: 'Preparation',
    subtitle: 'Cleaning & Peeling',
    description:
      'Graded bananas undergo sanitary washing and hygienic peeling—with the banana peel excluded—to prepare clean fruit material under food-grade hygiene controls.',
    inputLabel: 'Graded ripe whole bananas',
    processLabel: 'Sanitary washing & hygienic peeling',
    outputLabel: 'Clean peeled banana fruit (peel excluded)',
    checkpoints: [
      'Sanitary food-grade washing stage',
      'Complete banana peel exclusion',
      'Clean-handling preparation controls'
    ],
    icon: Droplets
  },
  {
    step: '03',
    title: 'Drying',
    subtitle: 'Controlled Dehydration',
    description:
      'Prepared fruit undergoes controlled low-temperature dehydration to remove moisture gently while retaining natural banana sweetness, aroma, and pale golden-ivory colour.',
    inputLabel: 'Clean prepared banana fruit',
    processLabel: 'Controlled low-temperature dehydration',
    outputLabel: 'Low-moisture dehydrated banana solids',
    checkpoints: [
      'Controlled low-temperature drying curve',
      'Preservation of natural fruit aroma & colour',
      'Moisture reduction toward ≤ 5.0% w/w target'
    ],
    icon: Thermometer
  },
  {
    step: '04',
    title: 'Milling & Sieving',
    subtitle: 'Particle Sizing',
    description:
      'Dehydrated banana solids are milled and sieved into a fine, free-flowing 100% pure powder graded to consistent particle size with zero carriers, fillers, or additives.',
    inputLabel: 'Dehydrated banana solids',
    processLabel: 'Controlled milling & mesh sieving',
    outputLabel: 'Fine, free-flowing 60–100 Mesh powder',
    checkpoints: [
      'Target particle size: ≥ 95% pass 60–100 Mesh',
      'Consistent bulk density (0.45–0.65 g/ml)',
      '100% pure composition with no carriers'
    ],
    icon: Layers
  },
  {
    step: '05',
    title: 'Quality Check',
    subtitle: 'Batch Verification',
    description:
      'Each production lot is verified against baseline physicochemical and microbiological limits, with genuine batch-specific Certificates of Analysis maintained per production lot.',
    inputLabel: 'Representative finished powder sample',
    processLabel: 'Analytical & microbiological verification',
    outputLabel: 'QA-released batch linked to Lot CoA',
    checkpoints: [
      'Moisture (≤ 5.0%), pH (4.8–5.6) & colour check',
      'Microbiological panel compliance',
      'Lot-specific Certificate of Analysis'
    ],
    icon: ShieldCheck
  },
  {
    step: '06',
    title: 'Packing',
    subtitle: 'Barrier Protection',
    description:
      'Approved banana powder is filled and sealed in moisture-barrier packaging formats with lot traceability labeling to protect powder flowability and 24-month shelf stability.',
    inputLabel: 'QA-approved banana powder lot',
    processLabel: 'Moisture-barrier filling & sealing',
    outputLabel: 'Sealed drums, barrier bags & pilot pouches',
    checkpoints: [
      '25 kg fiber drums & 20/25 kg barrier bags',
      '1 kg, 5 kg & 10 kg pilot barrier pouches',
      'Lot-coded sealing for 24-month shelf life'
    ],
    icon: PackageCheck
  }
];

export function JourneySection() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStage = PROCESSING_STAGES[activeStepIndex];
  const ActiveIcon = activeStage.icon;

  return (
    <section
      id="processing-journey"
      className="py-20 sm:py-28 bg-[#102A43] text-white border-b border-[#B89B5E]/30 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeading
            theme="dark"
            eyebrow="Processing Journey"
            title="From Raw Material to Pure Ingredient"
            subtitle="Six controlled stages—Raw Material, Preparation, Drying, Milling & Sieving, Quality Check, and Packing—built for consistency and clean-label purity."
          />
          <Button
            href="/manufacturing"
            variant="outline-light"
            size="sm"
            showArrow
          >
            Explore Facility Standards
          </Button>
        </div>

        {/* Interactive 6-Stage Horizontal Process Flow (Desktop) / Grid (Tablet & Mobile) */}
        <div role="tablist" aria-label="Processing journey stages" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 lg:gap-2.5">
          {PROCESSING_STAGES.map((stage, idx) => {
            const Icon = stage.icon;
            const isActive = activeStepIndex === idx;
            const isCompleted = idx < activeStepIndex;

            return (
              <div key={stage.step} className="relative flex items-stretch">
                <button
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveStepIndex(idx)}
                  className={cn(
                    'w-full text-left p-4 rounded-sm border transition-all duration-200 cursor-pointer flex flex-col justify-between gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B89B5E]',
                    isActive
                      ? 'bg-[#1D3B58] border-[#B89B5E] shadow-lg'
                      : isCompleted
                      ? 'bg-[#285943]/25 border-[#285943] hover:border-[#B89B5E]/60'
                      : 'bg-white/[0.04] border-white/15 hover:bg-white/[0.08] hover:border-white/35'
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div
                      className={cn(
                        'w-10 h-10 rounded-sm flex items-center justify-center border transition-colors shrink-0',
                        isActive
                          ? 'bg-[#B89B5E] text-[#102A43] border-[#B89B5E]'
                          : isCompleted
                          ? 'bg-[#285943] text-[#FAF7F0] border-[#285943]'
                          : 'bg-[#102A43] text-[#B89B5E] border-white/15'
                      )}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span
                      className={cn(
                        'font-mono tabular-nums text-xs font-bold',
                        isActive ? 'text-[#B89B5E]' : 'text-white/55'
                      )}
                    >
                      {stage.step}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-lg sm:text-xl font-semibold text-[#FAF7F0] leading-tight">
                      {stage.title}
                    </h3>
                    <p className="text-xs text-[#FAF7F0]/70 mt-0.5 leading-snug">
                      {stage.subtitle}
                    </p>
                  </div>
                </button>

                {/* Directional Flow Arrow between Desktop Columns */}
                {idx < PROCESSING_STAGES.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="hidden lg:flex items-center justify-center px-0.5 text-[#B89B5E]/70 shrink-0"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Active Stage Spotlight Card */}
        <div className="bg-[#1D3B58]/70 border border-[#B89B5E]/30 rounded-sm p-6 sm:p-10 shadow-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage.step}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
            >
              {/* Left Detail Column */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#B89B5E] font-semibold">
                    <span className="font-mono tabular-nums">Stage {activeStage.step} of 06</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#FAF7F0]/80">{activeStage.subtitle}</span>
                  </div>

                  <h3 className="font-serif text-3xl sm:text-4xl text-[#FAF7F0] font-semibold text-balance">
                    {activeStage.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#FAF7F0]/85 font-light leading-relaxed max-w-2xl">
                    {activeStage.description}
                  </p>
                </div>

                {/* Confirmed Stage Checkpoints */}
                <div className="space-y-3 pt-4 border-t border-white/15">
                  <span className="text-xs uppercase tracking-widest text-[#B89B5E] font-semibold block">
                    Key Stage Focus
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {activeStage.checkpoints.map((checkpoint) => (
                      <div
                        key={checkpoint}
                        className="p-3 bg-[#102A43]/80 border border-white/10 rounded-sm flex items-start gap-2 text-xs text-[#FAF7F0]/90"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#B89B5E] shrink-0 mt-0.5" />
                        <span className="leading-snug">{checkpoint}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stage Step Navigation */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      disabled={activeStepIndex === 0}
                      onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-sm bg-white/10 hover:bg-white/20 text-xs font-semibold uppercase tracking-wider disabled:opacity-35 disabled:cursor-not-allowed transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B89B5E]"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Previous</span>
                    </button>
                    <button
                      type="button"
                      disabled={activeStepIndex === PROCESSING_STAGES.length - 1}
                      onClick={() =>
                        setActiveStepIndex((prev) =>
                          Math.min(PROCESSING_STAGES.length - 1, prev + 1)
                        )
                      }
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-sm bg-[#B89B5E] text-[#102A43] hover:bg-[#C8AD72] text-xs font-semibold uppercase tracking-wider disabled:opacity-35 disabled:cursor-not-allowed transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      <span>Next Stage</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <span className="font-mono tabular-nums text-xs text-[#FAF7F0]/65">
                    {activeStepIndex + 1} / {PROCESSING_STAGES.length}
                  </span>
                </div>
              </div>

              {/* Right Stage Flow Schematic Panel */}
              <div className="lg:col-span-5 bg-[#102A43] border border-white/15 rounded-sm p-6 flex flex-col justify-between space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-sm bg-[#285943]/40 border border-[#B89B5E]/40 flex items-center justify-center text-[#B89B5E]">
                      <ActiveIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="font-mono text-[11px] uppercase tracking-wider text-[#B89B5E] block">
                        Stage {activeStage.step} Flow
                      </span>
                      <span className="font-serif text-xl font-semibold text-[#FAF7F0]">
                        {activeStage.title}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Input -> Process -> Output Progression */}
                <div className="space-y-3 text-xs">
                  <div className="p-3.5 bg-white/[0.04] border border-white/10 rounded-sm">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#FAF7F0]/60 block">
                      Stage Input
                    </span>
                    <p className="text-sm text-[#FAF7F0] font-medium mt-0.5">
                      {activeStage.inputLabel}
                    </p>
                  </div>

                  <div className="flex justify-center text-[#B89B5E]" aria-hidden="true">
                    <ArrowRight className="w-4 h-4 rotate-90" />
                  </div>

                  <div className="p-3.5 bg-[#285943]/25 border border-[#285943] rounded-sm">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#B89B5E] block">
                      Process Action
                    </span>
                    <p className="text-sm text-[#FAF7F0] font-medium mt-0.5">
                      {activeStage.processLabel}
                    </p>
                  </div>

                  <div className="flex justify-center text-[#B89B5E]" aria-hidden="true">
                    <ArrowRight className="w-4 h-4 rotate-90" />
                  </div>

                  <div className="p-3.5 bg-white/[0.04] border border-[#B89B5E]/35 rounded-sm">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#B89B5E] block">
                      Stage Output
                    </span>
                    <p className="text-sm text-[#FAF7F0] font-medium mt-0.5">
                      {activeStage.outputLabel}
                    </p>
                  </div>
                </div>

                {/* Linear 6-Step Progress Bar */}
                <div className="pt-2 space-y-2">
                  <div className="grid grid-cols-6 gap-1.5">
                    {PROCESSING_STAGES.map((s, idx) => (
                      <button
                        key={s.step}
                        type="button"
                        aria-label={`Go to stage ${s.step}: ${s.title}`}
                        onClick={() => setActiveStepIndex(idx)}
                        className={cn(
                          'h-1.5 rounded-sm transition-colors cursor-pointer',
                          idx === activeStepIndex
                            ? 'bg-[#B89B5E]'
                            : idx < activeStepIndex
                            ? 'bg-[#285943]'
                            : 'bg-white/15 hover:bg-white/30'
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
