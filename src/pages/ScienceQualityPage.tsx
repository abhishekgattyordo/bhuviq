import React, { useState } from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import { QUALITY_STAGES, MOCK_BATCH_RECORDS, DOCUMENTATION_LIBRARY } from '../data/quality';
import { ShieldCheck, FileCheck, CheckCircle2, FlaskConical, Database, Download, FileText, ArrowRight } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { cn } from '../lib/utils';

export function ScienceQualityPage() {
  const { openSpecSheetModal, navigate } = useRouter();
  const [selectedBatchIdx, setSelectedBatchIdx] = useState(0);

  const activeBatch = MOCK_BATCH_RECORDS[selectedBatchIdx];

  return (
    <PageWrapper
      title="Science & Quality | BhuviQ Nyra International"
      description="Precision Behind Every Ingredient — Controlled processing parameters, analytical testing, and comprehensive batch traceability."
    >
      {/* Hero */}
      <section className="relative bg-[#102A43] text-white pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=2000&q=80"
            alt="Scientific laboratory assay"
            className="w-full h-full object-cover opacity-20 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#102A43] via-[#102A43]/85 to-[#102A43]/60" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#B89B5E] text-xs font-semibold uppercase tracking-widest border border-[#B89B5E]/30">
            <span>Analytical Rigor & Compliance</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.1] text-[#FAF7F0]">
            Precision Behind <span className="italic font-light">Every Ingredient</span>
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-xl text-[#FAF7F0]/85 font-light leading-relaxed">
            From agricultural intake assay to final batch release, our quality assurance protocols ensure complete traceability, consistency, and compliance with international food and cosmetic standards.
          </p>
        </div>
      </section>

      {/* Scientific Approach Flow */}
      <section className="py-20 bg-[#FAF8F2] text-[#17202A] border-b border-[#102A43]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionHeading
            eyebrow="Verification Framework"
            title="Our Scientific Approach"
            subtitle="Five systematic checkpoints embedded directly across our production timeline."
          />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {QUALITY_STAGES.map((stage) => (
              <div
                key={stage.stepNumber}
                className="p-6 bg-white border border-[#102A43]/10 rounded-sm space-y-3 relative group hover:border-[#285943] transition-colors shadow-xs"
              >
                <span className="font-mono text-xs font-bold text-[#B89B5E]">
                  STAGE {stage.stepNumber}
                </span>
                <h4 className="font-serif text-lg font-semibold text-[#102A43]">
                  {stage.title}
                </h4>
                <p className="text-xs text-[#667085] leading-relaxed font-light">
                  {stage.description}
                </p>
                <div className="pt-2 border-t border-[#102A43]/10 space-y-1">
                  {stage.checkpoints.map((c) => (
                    <div key={c} className="flex items-center gap-1.5 text-[10px] text-[#285943] font-medium">
                      <CheckCircle2 className="w-3 h-3 text-[#285943]" />
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Batch COA Explorer Dashboard */}
      <section className="py-20 bg-[#102A43] text-white border-b border-[#B89B5E]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#B89B5E] font-semibold">
                <Database className="w-4 h-4" />
                <span>Interactive Quality Assurance Portal</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF7F0] mt-1">
                Batch Verification & Analytical Dossier
              </h2>
            </div>
            <Button
              variant="outline-light"
              size="sm"
              onClick={openSpecSheetModal}
              icon={<Download className="w-4 h-4" />}
            >
              Export Active Batch COA
            </Button>
          </div>

          {/* Batch Selector */}
          <div className="flex flex-wrap gap-2">
            {MOCK_BATCH_RECORDS.map((b, idx) => (
              <button
                key={b.batchId}
                onClick={() => setSelectedBatchIdx(idx)}
                className={cn(
                  "px-4 py-2 rounded-sm font-mono text-xs transition-all cursor-pointer",
                  selectedBatchIdx === idx
                    ? "bg-[#B89B5E] text-[#102A43] font-bold shadow-sm"
                    : "bg-white/10 text-white/70 hover:bg-white/20"
                )}
              >
                Lot #{b.batchId} ({b.productionDate})
              </button>
            ))}
          </div>

          {/* Active Batch Summary Card */}
          <div className="bg-[#1D3B58]/80 border border-white/20 rounded-sm p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="p-4 bg-white/5 border border-white/10 rounded-sm">
                <span className="text-white/50 block text-[10px] uppercase font-mono">Lot Identifier</span>
                <span className="font-mono text-base font-bold text-white">{activeBatch.batchId}</span>
              </div>
              <div className="p-4 bg-white/5 border border-white/10 rounded-sm">
                <span className="text-white/50 block text-[10px] uppercase font-mono">Manufacture Date</span>
                <span className="font-mono text-base font-semibold text-[#B89B5E]">{activeBatch.productionDate}</span>
              </div>
              <div className="p-4 bg-white/5 border border-white/10 rounded-sm">
                <span className="text-white/50 block text-[10px] uppercase font-mono">Origin & Cluster</span>
                <span className="font-mono text-xs font-semibold text-white truncate block">{activeBatch.traceabilityOrigin}</span>
              </div>
              <div className="p-4 bg-white/5 border border-white/10 rounded-sm">
                <span className="text-white/50 block text-[10px] uppercase font-mono">Release Status</span>
                <span className="inline-block font-mono text-xs px-2.5 py-0.5 rounded bg-[#285943] text-white font-semibold">
                  {activeBatch.status}
                </span>
              </div>
            </div>

            {/* Test Results Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/20 font-mono text-[#B89B5E] uppercase text-[11px]">
                    <th className="py-2.5">Parameter Assayed</th>
                    <th className="py-2.5">Target Specification</th>
                    <th className="py-2.5">Analytical Result</th>
                    <th className="py-2.5">Methodology</th>
                    <th className="py-2.5">Compliance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-white/90">
                  <tr>
                    <td className="py-2.5 font-medium">Moisture Content</td>
                    <td className="py-2.5 font-mono text-white/60">≤ 5.0% w/w</td>
                    <td className="py-2.5 font-mono font-bold text-[#B89B5E]">{activeBatch.moistureContent}</td>
                    <td className="py-2.5 text-white/60">AOAC 925.10 / Halogen LOD</td>
                    <td className="py-2.5 text-[#285943] bg-emerald-900/30 px-2 py-0.5 rounded font-mono font-bold">PASS</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-medium">Particle Mesh Sieve</td>
                    <td className="py-2.5 font-mono text-white/60">Min 95% pass 60 to 100 mesh</td>
                    <td className="py-2.5 font-mono font-bold text-white">{activeBatch.particleSizeMesh}</td>
                    <td className="py-2.5 text-white/60">Automated Sieve Ro-Tap</td>
                    <td className="py-2.5 text-[#285943] bg-emerald-900/30 px-2 py-0.5 rounded font-mono font-bold">PASS</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-medium">Solubility & Dispersion</td>
                    <td className="py-2.5 font-mono text-white/60">Complete in &lt;30s</td>
                    <td className="py-2.5 font-mono font-bold text-white">{activeBatch.solubility}</td>
                    <td className="py-2.5 text-white/60">Standard Aqueous Vortex Test</td>
                    <td className="py-2.5 text-[#285943] bg-emerald-900/30 px-2 py-0.5 rounded font-mono font-bold">PASS</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-medium">Sensory Profile</td>
                    <td className="py-2.5 font-mono text-white/60">Characteristic banana, no off-odor</td>
                    <td className="py-2.5 font-mono font-bold text-white">{activeBatch.sensoryProfile}</td>
                    <td className="py-2.5 text-white/60">Organoleptic Panel Evaluation</td>
                    <td className="py-2.5 text-[#285943] bg-emerald-900/30 px-2 py-0.5 rounded font-mono font-bold">PASS</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Regulatory & Documentation Catalog */}
      <section className="py-20 bg-[#FAF8F2] text-[#17202A] border-b border-[#102A43]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionHeading
            eyebrow="Commercial Documentation"
            title="Technical Dossier Library"
            subtitle="Standardized documentation provided with every commercial shipment and trial evaluation order."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {DOCUMENTATION_LIBRARY.map((doc) => (
              <div
                key={doc.code}
                className="p-6 bg-white border border-[#102A43]/10 rounded-sm space-y-3 shadow-xs hover:border-[#285943] transition-colors flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-[#285943] font-bold">{doc.code}</span>
                    <span className="text-[10px] text-[#667085] font-mono">{doc.status}</span>
                  </div>

                  <h4 className="font-serif text-lg font-semibold text-[#102A43]">{doc.title}</h4>
                  <p className="text-xs text-[#667085] leading-relaxed font-light">{doc.description}</p>
                </div>

                <div className="pt-3 border-t border-[#102A43]/5 flex justify-between items-center">
                  <button
                    onClick={openSpecSheetModal}
                    className="text-xs font-semibold text-[#285943] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Inspect Document</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Quality Team Box */}
          <div className="bg-white p-8 border border-[#102A43]/10 rounded-sm flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
            <div className="space-y-1">
              <h3 className="font-serif text-2xl text-[#102A43] font-semibold">
                Have specific quality parameters or custom testing requirements?
              </h3>
              <p className="text-sm text-[#667085]">
                Our QA department can prepare custom analytical protocols, heavy metal panels, and microbial assays upon request.
              </p>
            </div>
            <Button
              href="/partner-with-us"
              variant="primary"
              size="md"
              showArrow
              className="shrink-0"
            >
              Consult QA Specialist
            </Button>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
