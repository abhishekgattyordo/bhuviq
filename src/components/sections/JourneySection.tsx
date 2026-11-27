import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SectionHeading } from '../ui/SectionHeading';
import { SEVEN_STEP_JOURNEY } from '../../data/manufacturing';
import { ArrowRight, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';

export function JourneySection() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const activeStep = SEVEN_STEP_JOURNEY[activeStepIndex];

  return (
    <section className="py-24 sm:py-32 bg-[#102A43] text-white border-b border-[#B89B5E]/30 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 -left-48 w-96 h-96 bg-[#285943]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeading
            theme="dark"
            eyebrow="The Journey"
            title="From Agriculture to Ingredient"
            subtitle="A rigorous seven-stage process engineered for batch integrity, pure retention, and international compliance."
          />
          <Button
            href="/manufacturing"
            variant="outline-light"
            size="sm"
            showArrow
          >
            Explore Full Facility Flow
          </Button>
        </div>

        {/* Step Indicator Bar (Desktop Horizontal) */}
        <div className="hidden lg:block relative pt-4">
          <div className="absolute top-10 left-8 right-8 h-[2px] bg-white/15 z-0" />
          
          <div className="grid grid-cols-7 gap-2 relative z-10">
            {SEVEN_STEP_JOURNEY.map((step, idx) => {
              const isActive = activeStepIndex === idx;
              const isPassed = idx < activeStepIndex;

              return (
                <button
                  key={step.step}
                  onClick={() => setActiveStepIndex(idx)}
                  className="flex flex-col items-center text-center group cursor-pointer focus:outline-none"
                >
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 border-2 relative",
                      isActive
                        ? "bg-[#B89B5E] text-[#102A43] border-white scale-110 shadow-lg shadow-[#B89B5E]/30"
                        : isPassed
                        ? "bg-[#285943] text-white border-[#B89B5E]"
                        : "bg-[#1D3B58] text-white/70 border-white/20 hover:border-white/60"
                    )}
                  >
                    {step.step}
                  </motion.div>

                  <span
                    className={cn(
                      "mt-3 text-xs uppercase tracking-wider font-semibold transition-colors duration-200",
                      isActive ? "text-[#B89B5E]" : "text-white/70 group-hover:text-white"
                    )}
                  >
                    {step.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Stage Detailed Spotlight Card */}
        <div className="bg-[#1D3B58]/60 border border-[#B89B5E]/30 rounded-sm p-6 sm:p-10 backdrop-blur-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xl min-h-[380px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${activeStep.number}`}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="lg:col-span-6 space-y-5"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm px-3 py-1 bg-[#B89B5E] text-[#102A43] font-bold rounded-sm shadow-sm">
                  STEP {activeStep.number}
                </span>
                <span className="text-xs uppercase tracking-widest text-[#B89B5E] font-semibold">
                  Manufacturing Node
                </span>
              </div>

              <div>
                <h3 className="font-serif text-3xl sm:text-4xl text-[#FAF7F0] font-semibold">
                  {activeStep.title}
                </h3>
                <p className="text-lg text-[#FAF7F0]/90 font-light mt-1">
                  {activeStep.description}
                </p>
              </div>

              <p className="text-sm text-[#FAF7F0]/75 leading-relaxed font-light">
                {activeStep.details}
              </p>

              <div className="space-y-2 pt-2 border-t border-white/10">
                <span className="text-xs uppercase tracking-widest text-[#B89B5E] font-semibold block">
                  Process Parameters:
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeStep.parameters.map((param) => (
                    <span
                      key={param}
                      className="text-xs px-3 py-1 bg-[#102A43] text-white/90 border border-white/15 rounded-full font-mono"
                    >
                      {param}
                    </span>
                  ))}
                </div>
              </div>

              {/* Step navigation controls */}
              <div className="flex items-center gap-3 pt-4">
                <button
                  disabled={activeStepIndex === 0}
                  onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                  className="px-3.5 py-1.5 rounded-sm bg-white/10 hover:bg-white/20 text-xs font-semibold uppercase tracking-wider disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  Previous Stage
                </button>
                <button
                  disabled={activeStepIndex === SEVEN_STEP_JOURNEY.length - 1}
                  onClick={() => setActiveStepIndex((prev) => Math.min(SEVEN_STEP_JOURNEY.length - 1, prev + 1))}
                  className="px-3.5 py-1.5 rounded-sm bg-[#B89B5E] text-[#102A43] hover:bg-[#A88B4E] text-xs font-semibold uppercase tracking-wider disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  Next Stage →
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={`img-${activeStep.number}`}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="relative rounded-sm overflow-hidden border border-white/20 shadow-lg aspect-[16/10] bg-[#102A43]"
              >
                <img
                  src={activeStep.image}
                  alt={`BhuviQ Nyra Manufacturing Stage: ${activeStep.title}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    // Fallback to high quality agriculture / food processing imagery
                    target.src = "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#102A43] via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-3 right-3 font-mono text-[11px] bg-[#102A43]/80 px-2.5 py-1 rounded text-[#B89B5E] border border-[#B89B5E]/30">
                  Phase {activeStep.number} / 07
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Vertical Timeline (shows all 7 with easy expanding) */}
        <div className="block lg:hidden space-y-4 pt-4">
          <p className="text-xs uppercase tracking-widest text-[#B89B5E] font-semibold text-center mb-4">
            Seven-Step Lifecycle Summary
          </p>
          <div className="space-y-3">
            {SEVEN_STEP_JOURNEY.map((step, idx) => (
              <motion.div
                key={step.step}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveStepIndex(idx)}
                className={cn(
                  "p-4 rounded-sm border transition-all cursor-pointer",
                  activeStepIndex === idx
                    ? "bg-[#1D3B58] border-[#B89B5E]"
                    : "bg-white/5 border-white/10"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-[#B89B5E]">
                      {step.step}
                    </span>
                    <span className="font-serif text-lg font-semibold">{step.title}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/50" />
                </div>
                <p className="text-xs text-white/70 mt-1">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
