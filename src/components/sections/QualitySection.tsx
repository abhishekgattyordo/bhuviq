import React, { useState } from 'react';
import { FileCheck, CheckCircle2, FileText, Download, ShieldCheck } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { QUALITY_STAGES, DOCUMENTATION_LIBRARY, PRODUCT_SPEC_SHEET } from '../../data/quality';
import { useRouter } from '../../context/RouterContext';
import { downloadDocumentByCode, downloadSampleCoaTemplatePdf } from '../../lib/pdfDocuments';

export function QualitySection() {
  const { openSpecSheetModal, navigateToEnquiry } = useRouter();
  const [downloadedDoc, setDownloadedDoc] = useState<string | null>(null);

  const handleDownloadDocument = (code: string, title: string) => {
    downloadDocumentByCode(code);
    setDownloadedDoc(title);
    setTimeout(() => setDownloadedDoc(null), 4000);
  };

  const handleDownloadCoaTemplate = () => {
    downloadSampleCoaTemplatePdf();
    setDownloadedDoc('Sample Certificate of Analysis (CoA) Format');
    setTimeout(() => setDownloadedDoc(null), 4000);
  };

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
            Explore Science &amp; Quality
          </Button>
        </div>

        {/* 5-Stage Scientific Quality Flow */}
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-widest text-[#285943] font-semibold">
            Standard Verification Sequence
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {QUALITY_STAGES.map((stage) => (
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

        {/* Confirmed Standard Release Specification & Sample CoA Governance Box */}
        <div className="bg-[#102A43] text-white p-6 sm:p-8 rounded-sm border border-[#B89B5E]/30 space-y-6 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#B89B5E] font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Standard Release Parameters</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-white mt-1">
                Lot-Specific Certificate of Analysis (CoA) Governance
              </h3>
            </div>
            <div className="flex flex-wrap gap-2.5">
              <Button
                variant="gold"
                size="sm"
                icon={<Download className="w-4 h-4" />}
                onClick={handleDownloadCoaTemplate}
              >
                Sample CoA Format (PDF)
              </Button>
              <Button
                variant="outline-light"
                size="sm"
                onClick={openSpecSheetModal}
              >
                Inspect TDS
              </Button>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed max-w-3xl">
            Every production batch undergoes physical, chemical, and microbiological release testing prior to dispatch. Genuine analytical measurements are recorded exclusively on lot-specific CoAs issued upon shipment or formal quality enquiry.
          </p>

          {/* Confirmed Baseline Thresholds Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-3.5 bg-white/5 border border-white/10 rounded-sm">
              <span className="text-white/60 block text-[10px] uppercase font-mono">Moisture Threshold (LOD)</span>
              <span className="font-mono text-sm font-semibold text-[#B89B5E] mt-1 block">≤ 5.0% w/w</span>
              <span className="text-[11px] text-white/60 block mt-0.5">AOAC 925.10 / Karl Fischer</span>
            </div>

            <div className="p-3.5 bg-white/5 border border-white/10 rounded-sm">
              <span className="text-white/60 block text-[10px] uppercase font-mono">Mesh Particle Sieve</span>
              <span className="font-mono text-sm font-semibold text-[#FAF7F0] mt-1 block">≥ 95% pass 60–100 Mesh</span>
              <span className="text-[11px] text-white/60 block mt-0.5">ASTM Sieve Analysis</span>
            </div>

            <div className="p-3.5 bg-white/5 border border-white/10 rounded-sm">
              <span className="text-white/60 block text-[10px] uppercase font-mono">pH (10% Solution)</span>
              <span className="font-mono text-sm font-semibold text-[#FAF7F0] mt-1 block">4.8 – 5.6</span>
              <span className="text-[11px] text-white/60 block mt-0.5">Potentiometric Measurement</span>
            </div>

            <div className="p-3.5 bg-white/5 border border-white/10 rounded-sm">
              <span className="text-white/60 block text-[10px] uppercase font-mono">Microbiological Panel</span>
              <span className="font-mono text-sm font-semibold text-[#FAF7F0] mt-1 block">
                {PRODUCT_SPEC_SHEET.microbiological[0].specification}
              </span>
              <span className="text-[11px] text-white/60 block mt-0.5">ISO Validated Methods</span>
            </div>
          </div>
        </div>

        {/* Documentation Area & Quality Team CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-8 border border-[#102A43]/10 rounded-sm">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#285943] font-semibold">
              <FileCheck className="w-4 h-4" />
              <span>Downloadable Quality Documentation</span>
            </div>
            <h4 className="font-serif text-2xl text-[#102A43]">
              Technical Documentation &amp; Approved Reference Sheets
            </h4>
            <p className="text-sm text-[#667085] leading-relaxed">
              Download standardized Technical Data Sheets (TDS), Sample Certificate of Analysis (CoA) format, Allergen &amp; Non-GMO Statement, and Storage &amp; Handling Technical Guide in PDF format.
            </p>

            <div className="flex flex-wrap gap-2.5 pt-1">
              {DOCUMENTATION_LIBRARY.map((doc) => (
                <button
                  key={doc.code}
                  type="button"
                  onClick={() => handleDownloadDocument(doc.code, doc.title)}
                  className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#FAF8F2] border border-[#102A43]/15 rounded-sm text-xs text-[#102A43] hover:border-[#285943] hover:text-[#285943] transition-colors cursor-pointer font-medium"
                >
                  <Download className="w-3.5 h-3.5 text-[#B89B5E] shrink-0" />
                  <span>{doc.title} (PDF)</span>
                </button>
              ))}
            </div>

            {downloadedDoc && (
              <div className="inline-flex items-center gap-2 text-xs font-medium text-[#285943] bg-[#285943]/10 border border-[#285943]/25 px-3 py-1.5 rounded-sm">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Downloaded: {downloadedDoc}</span>
              </div>
            )}
          </div>

          <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center gap-3">
            <Button
              onClick={() =>
                navigateToEnquiry({
                  enquiryType: 'Ask a Technical Question',
                  productInterest: 'Banana Powder (100% Pure)'
                })
              }
              variant="primary"
              size="md"
              showArrow
              className="w-full sm:w-auto"
            >
              Request Lot CoA / Contact QA
            </Button>
            <Button
              href="/science-quality"
              variant="outline"
              size="sm"
              icon={<FileText className="w-3.5 h-3.5 text-[#285943]" />}
              className="w-full sm:w-auto"
            >
              Full Quality Library
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
