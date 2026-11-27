import React, { useState } from 'react';
import { ShieldCheck, FileCheck, ArrowRight, CheckCircle2, ChevronRight, FileText, Database, Lock } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { QUALITY_STAGES, MOCK_BATCH_RECORDS, DOCUMENTATION_LIBRARY } from '../../data/quality';
import { useRouter } from '../../context/RouterContext';
import { cn } from '../../lib/utils';

export function QualitySection() {
  const { openSpecSheetModal, navigate } = useRouter();
  const [selectedBatchIndex, setSelectedBatchIndex] = useState(0);

  const activeBatch = MOCK_BATCH_RECORDS[selectedBatchIndex];

  return (
    <section className="py-24 sm:py-32 bg-[#FAF8F2] text-[#17202A] border-b border-[#102A43]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Scientific Assurance"
            title="Quality You Can Build On"
            subtitle="Quality at Every Stage — Precision control from agricultural intake through final batch release."
          />
          <Button
            href="/science-quality"
            variant="outline"
            size="sm"
            showArrow
          >
            Explore Science & Quality
          </Button>
        </div>

        {/* 5-Stage Scientific Quality Flow */}
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-widest text-[#285943] font-semibold">
            Standard Verification Sequence
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {QUALITY_STAGES.map((stage, idx) => (
              <div
                key={stage.stepNumber}
                className="p-5 bg-white border border-[#102A43]/10 rounded-sm relative space-y-2.5 shadow-xs hover:border-[#285943] transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#B89B5E] font-bold">
                    STAGE {stage.stepNumber}
                  </span>
                  <div className="w-6 h-6 rounded-full bg-[#285943]/10 text-[#285943] flex items-center justify-center text-xs">
                    ✓
                  </div>
                </div>

                <h4 className="font-serif text-lg font-semibold text-[#102A43] group-hover:text-[#285943] transition-colors">
                  {stage.title}
                </h4>

                <p className="text-xs text-[#667085] leading-relaxed">
                  {stage.description}
                </p>

                <div className="pt-2 border-t border-[#102A43]/5">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#285943] block">
                    {stage.checkpoints[0]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Mock Quality & Batch Verification Box */}
        <div className="bg-[#102A43] text-white p-6 sm:p-8 rounded-sm border border-[#B89B5E]/30 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#B89B5E] font-semibold">
                <Database className="w-4 h-4" />
                <span>Batch Verification Demo Dashboard</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-white mt-1">
                Sample Certificate of Analysis (COA) Monitor
              </h3>
            </div>
            <span className="text-[11px] font-mono px-3 py-1 bg-white/10 text-white/80 rounded border border-white/20 self-start sm:self-auto">
              Demonstration & Testing Data
            </span>
          </div>

          {/* Batch Selector */}
          <div className="flex flex-wrap gap-2">
            {MOCK_BATCH_RECORDS.map((b, idx) => (
              <button
                key={b.batchId}
                onClick={() => setSelectedBatchIndex(idx)}
                className={cn(
                  "px-3.5 py-1.5 rounded-sm font-mono text-xs transition-all",
                  selectedBatchIndex === idx
                    ? "bg-[#B89B5E] text-[#102A43] font-bold"
                    : "bg-white/5 text-white/70 hover:bg-white/10"
                )}
              >
                Batch: {b.batchId}
              </button>
            ))}
          </div>

          {/* Batch details grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-3.5 bg-white/5 border border-white/10 rounded-sm">
              <span className="text-white/50 block text-[10px] uppercase font-mono">Batch ID & Status</span>
              <span className="font-mono text-sm font-semibold text-[#FAF7F0]">{activeBatch.batchId}</span>
              <span className="inline-block ml-2 text-[10px] px-2 py-0.5 rounded bg-[#285943] text-white font-medium">
                {activeBatch.status}
              </span>
            </div>

            <div className="p-3.5 bg-white/5 border border-white/10 rounded-sm">
              <span className="text-white/50 block text-[10px] uppercase font-mono">Assayed Moisture</span>
              <span className="font-mono text-sm font-semibold text-[#B89B5E]">{activeBatch.moistureContent}</span>
            </div>

            <div className="p-3.5 bg-white/5 border border-white/10 rounded-sm">
              <span className="text-white/50 block text-[10px] uppercase font-mono">Mesh Particle Sieve</span>
              <span className="font-mono text-sm font-semibold text-[#FAF7F0]">{activeBatch.particleSizeMesh}</span>
            </div>

            <div className="p-3.5 bg-white/5 border border-white/10 rounded-sm">
              <span className="text-white/50 block text-[10px] uppercase font-mono">Rehydration Velocity</span>
              <span className="font-mono text-sm font-semibold text-[#FAF7F0]">{activeBatch.solubility}</span>
            </div>
          </div>
        </div>

        {/* Documentation Area & Quality Team CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-8 border border-[#102A43]/10 rounded-sm">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#285943] font-semibold">
              <FileCheck className="w-4 h-4" />
              <span>Commercial Compliance Catalog</span>
            </div>
            <h4 className="font-serif text-2xl text-[#102A43]">
              Technical Documentation & Regulatory Dossiers
            </h4>
            <p className="text-sm text-[#667085] leading-relaxed">
              Every shipment is supported by comprehensive documentation including Technical Data Sheets (TDS), Certificate of Analysis (COA), Allergen Declarations, and Batch Traceability logs.
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              {DOCUMENTATION_LIBRARY.map((doc) => (
                <button
                  key={doc.code}
                  onClick={openSpecSheetModal}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF8F2] border border-[#102A43]/10 rounded text-xs text-[#102A43] hover:border-[#285943] hover:text-[#285943] transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-[#B89B5E]" />
                  <span>{doc.title}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center gap-3">
            <Button
              href="/contact"
              variant="primary"
              size="md"
              showArrow
            >
              Quality Team Contact
            </Button>
            <span className="text-[11px] text-[#667085]">
              Response within 24 business hours
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
