import React, { useState } from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import { QUALITY_STAGES, PRODUCT_SPEC_SHEET, DOCUMENTATION_LIBRARY } from '../data/quality';
import { downloadSampleCoaTemplatePdf, downloadDocumentByCode } from '../lib/pdfDocuments';
import {
  ShieldCheck,
  FileCheck,
  CheckCircle2,
  Download,
  FileText,
  BookOpen,
  Microscope,
  Layers,
  Send,
  Lock
} from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { cn } from '../lib/utils';

type QualitySectionId =
  | 'quality-framework'
  | 'specifications-scope'
  | 'parameter-guide'
  | 'sample-coa';

export function ScienceQualityPage() {
  const { openSpecSheetModal, navigateToEnquiry } = useRouter();
  const [activeSection, setActiveSection] = useState<QualitySectionId>('quality-framework');
  const [heroImgLoaded, setHeroImgLoaded] = useState(true);
  const [downloadMessage, setDownloadMessage] = useState<string | null>(null);

  const scrollToSection = (id: QualitySectionId) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const parameterExplanations = [
    {
      parameter: 'Moisture Content (LOD)',
      target: '≤ 5.0% w/w',
      method: 'Halogen LOD / AOAC 925.10 / Karl Fischer',
      indication:
        'Confirms low residual free moisture after dehydration, inhibiting microbial growth, reducing hygroscopic clumping, and supporting the 24-month shelf-life stability.'
    },
    {
      parameter: 'Particle Size Distribution',
      target: '≥ 95% pass through 60 to 100 Mesh',
      method: 'ASTM Vibratory Sieve Analysis',
      indication:
        'Indicates uniform milling and sifting consistency for predictable dispersion in aqueous systems, smooth mouthfeel, and reliable flowability in automated dosing hoppers.'
    },
    {
      parameter: 'pH (10% Aqueous Solution)',
      target: '4.8 – 5.6',
      method: 'Potentiometric pH Meter',
      indication:
        'Reflects the natural mild acidity of ripe banana solids without added acidulants or buffering chemicals, helping formulators assess matrix compatibility in food and cosmetic blends.'
    },
    {
      parameter: 'Bulk Density (Tapped)',
      target: '0.45 – 0.65 g/ml',
      method: 'USP <616> Tapped Density',
      indication:
        'Measures powder mass-to-volume ratio for accurate volumetric filling, dry-mix homogeneity, and consistent barrier bag or fiber drum packing.'
    },
    {
      parameter: 'Colour & Organoleptic Profile',
      target: 'Pale golden-ivory to light cream; characteristic ripe aroma',
      method: 'Visual / Lovibond & Organoleptic Panel',
      indication:
        'Verifies gentle low-temperature drying without thermal scorching or off-odors, confirming intact volatile banana aroma and natural fruit sweetness.'
    },
    {
      parameter: 'Microbiological Panel',
      target: 'TPC < 5,000 CFU/g; Yeast & Mold < 100 CFU/g; Pathogens Absent',
      method: 'ISO 4833-1, ISO 21527-2, ISO 16649-2, ISO 6579-1, ISO 6888-1',
      indication:
        'Demonstrates sanitary processing hygiene inside enclosed SS-316 contact lines and confirms absence of target indicator and pathogenic organisms prior to batch release.'
    }
  ];

  const handleDownloadSampleCoaPdf = () => {
    const filename = downloadSampleCoaTemplatePdf();
    setDownloadMessage(`Sample CoA Template PDF downloaded (${filename}).`);
    setTimeout(() => setDownloadMessage(null), 4000);
  };

  const handleDownloadDocument = (code: string, title: string) => {
    const filename = downloadDocumentByCode(code);
    setDownloadMessage(`${title} downloaded (${filename}).`);
    setTimeout(() => setDownloadMessage(null), 4000);
  };

  return (
    <PageWrapper
      title="Quality & Documentation | BhuviQ Nyra International"
      description="Standard product specifications, analytical testing scope, parameter explanations, sample CoA format, and lot-linked quality documentation governance."
    >
      {/* Hero */}
      <section className="relative bg-[#102A43] text-white pt-32 pb-20 sm:pt-36 sm:pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#0B1D2E] via-[#102A43] to-[#17362A]">
          {heroImgLoaded && (
            <img
              src="/images/verify_lab_quality_test_1790837631222.jpg"
              alt="Analytical moisture and quality laboratory verification"
              referrerPolicy="no-referrer"
              onError={() => setHeroImgLoaded(false)}
              className="w-full h-full object-cover opacity-20 mix-blend-luminosity"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#102A43] via-[#102A43]/85 to-[#102A43]/60" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.22em] text-[#B89B5E] font-semibold">
            <span>Quality Assurance & Documentation</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#FAF7F0]/80">Verified Standards</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-normal leading-[1.08] text-[#FAF7F0] text-balance">
            Precision Behind <span className="italic font-light">Every Ingredient</span>
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-xl text-[#FAF7F0]/85 font-light leading-relaxed">
            Transparent baseline product specifications, validated laboratory testing methods, and lot-linked Certificates of Analysis maintained separately for each production batch.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Button
              variant="gold"
              size="md"
              onClick={handleDownloadSampleCoaPdf}
              icon={<Download className="w-4 h-4" />}
            >
              Download Sample CoA Format (PDF)
            </Button>
            <Button
              variant="outline-light"
              size="md"
              onClick={() => scrollToSection('specifications-scope')}
              icon={<FileText className="w-4 h-4" />}
            >
              View Product Specifications
            </Button>
          </div>

          {downloadMessage && (
            <div className="inline-flex items-center gap-2 text-xs font-medium text-[#FAF7F0] bg-[#285943]/70 border border-[#B89B5E]/40 px-4 py-2 rounded-sm">
              <CheckCircle2 className="w-4 h-4 text-[#B89B5E] shrink-0" />
              <span>{downloadMessage}</span>
            </div>
          )}
        </div>
      </section>

      {/* Sticky Section Anchor Bar */}
      <nav
        aria-label="Quality documentation sections"
        className="sticky top-[56px] sm:top-[64px] xl:top-[72px] z-30 bg-[#FAF8F2]/95 backdrop-blur-md border-b border-[#102A43]/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 py-2 overflow-x-auto">
          <div className="flex items-center gap-2 sm:gap-4 text-xs font-semibold uppercase tracking-wider text-[#102A43]">
            {[
              { id: 'quality-framework', label: '01. Testing Flow' },
              { id: 'specifications-scope', label: '02. Specs & Testing Scope' },
              { id: 'parameter-guide', label: '03. Parameters & Methods' },
              { id: 'sample-coa', label: '04. Sample CoA & Documents' }
            ].map((nav) => (
              <button
                key={nav.id}
                type="button"
                onClick={() => scrollToSection(nav.id as QualitySectionId)}
                className={cn(
                  'px-3 py-1.5 rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer',
                  activeSection === nav.id
                    ? 'bg-[#102A43] text-[#FAF7F0]'
                    : 'hover:bg-[#102A43]/5 hover:text-[#285943]'
                )}
              >
                {nav.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() =>
              navigateToEnquiry({
                enquiryType: 'Ask a Technical Question',
                productInterest: 'Banana Powder (100% Pure)'
              })
            }
            className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#102A43] text-[#FAF7F0] hover:bg-[#285943] rounded-sm text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5 text-[#B89B5E]" />
            <span>Request Lot CoA</span>
          </button>
        </div>
      </nav>

      {/* 01. Quality Verification Flow & Document Governance */}
      <section id="quality-framework" className="scroll-mt-36 py-16 sm:py-20 bg-[#FAF8F2] text-[#17202A] border-b border-[#102A43]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionHeading
            eyebrow="01. Verification Framework"
            title="Quality Control & Document Governance"
            subtitle="Five systematic checkpoints from raw agricultural intake through verified batch release."
          />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {QUALITY_STAGES.map((stage) => (
              <div
                key={stage.stepNumber}
                className="p-6 bg-white border border-[#102A43]/10 rounded-sm space-y-3 hover:border-[#285943] transition-colors shadow-xs"
              >
                <span className="font-mono text-xs font-bold text-[#B89B5E]">
                  STAGE {stage.stepNumber}
                </span>
                <h3 className="font-serif text-lg font-semibold text-[#102A43]">
                  {stage.title}
                </h3>
                <p className="text-xs text-[#667085] leading-relaxed font-light">
                  {stage.description}
                </p>
                <div className="pt-2 border-t border-[#102A43]/10 space-y-1">
                  {stage.checkpoints.map((c) => (
                    <div key={c} className="flex items-center gap-1.5 text-[11px] text-[#285943] font-medium">
                      <CheckCircle2 className="w-3 h-3 text-[#285943] shrink-0" />
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Two-Tier Documentation Governance Principles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 sm:p-8 bg-white border border-[#102A43]/15 rounded-sm space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-[#285943] font-bold">
                  Standard Master Documents
                </span>
                <BookOpen className="w-4 h-4 text-[#285943]" />
              </div>
              <h3 className="font-serif text-2xl text-[#102A43] font-semibold">
                Controlled Product Specifications
              </h3>
              <p className="text-xs sm:text-sm text-[#667085] leading-relaxed">
                Product specifications are maintained as standardized master reference documents defining confirmed botanical origin, physical thresholds, microbiological limits, and packaging integrity. They are updated only when official specifications change—daily website updates are not required.
              </p>
            </div>

            <div className="p-6 sm:p-8 bg-white border border-[#102A43]/15 rounded-sm space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-[#B89B5E] font-bold">
                  Production Lot Records
                </span>
                <Lock className="w-4 h-4 text-[#B89B5E]" />
              </div>
              <h3 className="font-serif text-2xl text-[#102A43] font-semibold">
                Separate Batch-Specific CoAs
              </h3>
              <p className="text-xs sm:text-sm text-[#667085] leading-relaxed">
                Batch-specific Certificates of Analysis (CoAs) are kept as separate documents linked directly to individual production lots with genuine laboratory measurements. They are supplied upon commercial request, with sample dispatches, or via authorized release channels where applicable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 02. Product Specifications & Testing Scope */}
      <section id="specifications-scope" className="scroll-mt-36 py-16 sm:py-20 bg-[#F7F3EA] text-[#17202A] border-b border-[#102A43]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <SectionHeading
              eyebrow="02. Standard Specification & Testing Scope"
              title="Product Specifications & Analytical Scope"
              subtitle={`Baseline reference limits for ${PRODUCT_SPEC_SHEET.productName} (${PRODUCT_SPEC_SHEET.botanicalSource}).`}
            />

            <Button
              variant="primary"
              size="md"
              onClick={openSpecSheetModal}
              icon={<FileText className="w-4 h-4 text-[#B89B5E]" />}
              className="self-start lg:self-auto"
            >
              View Standard TDS Sheet
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Physicochemical Standard Specifications */}
            <div className="lg:col-span-7 bg-white border border-[#102A43]/15 rounded-sm overflow-hidden shadow-xs">
              <div className="px-6 py-4 bg-[#102A43] text-[#FAF7F0] flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-xl font-normal">
                    Physicochemical Specifications
                  </h3>
                  <p className="text-xs text-[#FAF7F0]/75">
                    Confirmed baseline release parameters
                  </p>
                </div>
                <span className="font-mono text-[11px] text-[#B89B5E] uppercase">
                  Standard Spec
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#FAF8F2] border-b border-[#102A43]/10 text-[11px] uppercase tracking-wider text-[#667085]">
                    <tr>
                      <th className="py-3 px-5 font-semibold">Parameter</th>
                      <th className="py-3 px-5 font-semibold">Specification</th>
                      <th className="py-3 px-5 font-semibold sm:text-right">Method</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#102A43]/10">
                    {PRODUCT_SPEC_SHEET.physicalChemical.map((item) => (
                      <tr key={item.parameter} className="hover:bg-[#FAF8F2]/60 transition-colors">
                        <td className="py-3 px-5 font-semibold text-[#102A43]">{item.parameter}</td>
                        <td className="py-3 px-5 font-mono tabular-nums text-xs text-[#285943] font-semibold">
                          {item.specification}
                        </td>
                        <td className="py-3 px-5 text-xs text-[#667085] sm:text-right">{item.method}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Microbiological + Extended Testing Scope */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white border border-[#102A43]/15 rounded-sm overflow-hidden shadow-xs">
                <div className="px-6 py-4 bg-[#FAF8F2] border-b border-[#102A43]/10 flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-[#102A43]">
                      Microbiological Limits
                    </h3>
                    <p className="text-xs text-[#667085]">ISO validated testing scope</p>
                  </div>
                  <ShieldCheck className="w-5 h-5 text-[#285943]" />
                </div>

                <div className="divide-y divide-[#102A43]/10 text-xs">
                  {PRODUCT_SPEC_SHEET.microbiological.map((item) => (
                    <div key={item.parameter} className="px-6 py-3 flex items-center justify-between gap-4">
                      <div>
                        <span className="font-semibold text-[#102A43] block">{item.parameter}</span>
                        <span className="text-[11px] text-[#667085]">{item.method}</span>
                      </div>
                      <span className="font-mono tabular-nums font-semibold text-[#285943] shrink-0">
                        {item.specification}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-white border border-[#102A43]/15 rounded-sm space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#B89B5E] font-bold">
                    Lot-Specific & Requested Testing Scope
                  </span>
                  <Microscope className="w-4 h-4 text-[#B89B5E]" />
                </div>
                <p className="text-xs text-[#667085] leading-relaxed">
                  Additional analytical verification—including water activity (aw), heavy metals screening (Pb, As, Cd, Hg), pesticide residue screening, and per-100g nutritional assays—is conducted per batch or customer regulatory requirement and reported solely on genuine lot-specific laboratory documentation upon request.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03. Quality Parameters, Testing Methods & What Results Indicate */}
      <section id="parameter-guide" className="scroll-mt-36 py-16 sm:py-20 bg-[#FAF8F2] text-[#17202A] border-b border-[#102A43]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionHeading
            eyebrow="03. Analytical Reference Guide"
            title="Quality Parameters, Testing Methods & Interpretation"
            subtitle="Understanding what each analytical measurement tests and what the results indicate for formulation performance and product stability."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {parameterExplanations.map((item) => (
              <div
                key={item.parameter}
                className="p-6 bg-white border border-[#102A43]/12 rounded-sm space-y-3.5 shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2 border-b border-[#102A43]/10 pb-2.5">
                    <h3 className="font-serif text-xl font-semibold text-[#102A43]">
                      {item.parameter}
                    </h3>
                  </div>

                  <div className="space-y-1 text-xs">
                    <div>
                      <span className="text-[#667085] font-medium">Target Spec: </span>
                      <span className="font-mono tabular-nums font-semibold text-[#285943]">
                        {item.target}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#667085] font-medium">Testing Method: </span>
                      <span className="text-[#102A43] font-medium">{item.method}</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#B89B5E] font-bold block mb-1">
                      What the Result Indicates
                    </span>
                    <p className="text-xs sm:text-sm text-[#667085] leading-relaxed font-light">
                      {item.indication}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04. Sample Certificate of Analysis (CoA) & Applicable Quality Documents */}
      <section id="sample-coa" className="scroll-mt-36 py-16 sm:py-20 bg-[#102A43] text-white border-b border-[#B89B5E]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          {/* Sample CoA Format Section */}
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#B89B5E] font-semibold">
                  <FileCheck className="w-4 h-4" />
                  <span>04. Sample CoA Structure & Lot Issuance</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF7F0] mt-1">
                  Sample Certificate of Analysis (CoA) Format
                </h2>
                <p className="text-sm text-[#FAF7F0]/75 font-light mt-2 max-w-2xl">
                  Standard CoA structure issued per production lot. No synthetic batch results are shown below—actual analytical measurements are populated exclusively from verified lot testing.
                </p>
              </div>

              <Button
                variant="gold"
                size="md"
                onClick={handleDownloadSampleCoaPdf}
                icon={<Download className="w-4 h-4" />}
                className="self-start md:self-auto"
              >
                Download Sample CoA Format (PDF)
              </Button>
            </div>

            {/* Clean Sample CoA Template Card */}
            <div className="bg-[#FAF8F2] text-[#17202A] border border-[#B89B5E]/40 rounded-sm overflow-hidden shadow-2xl">
              <div className="px-6 py-4 bg-[#1D3B58] text-[#FAF7F0] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#B89B5E] block">
                    Reference Template Only — Doc Code: DOC-BQNP-COA-STD
                  </span>
                  <h3 className="font-serif text-xl font-normal">
                    Batch-Specific Certificate of Analysis Layout
                  </h3>
                </div>
                <span className="font-mono text-xs text-[#FAF7F0]/80">
                  Linked to Individual Production Lot
                </span>
              </div>

              {/* Lot Traceability Fields */}
              <div className="p-6 bg-white border-b border-[#102A43]/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <div className="p-3.5 bg-[#FAF8F2] border border-[#102A43]/10 rounded-sm">
                  <span className="text-[#667085] block text-[10px] uppercase font-mono">
                    Production Lot ID
                  </span>
                  <span className="font-mono font-semibold text-[#102A43] mt-1 block">
                    [Assigned per Lot]
                  </span>
                </div>
                <div className="p-3.5 bg-[#FAF8F2] border border-[#102A43]/10 rounded-sm">
                  <span className="text-[#667085] block text-[10px] uppercase font-mono">
                    Mfg & Expiry Date
                  </span>
                  <span className="font-mono font-semibold text-[#102A43] mt-1 block">
                    [Lot Dates · 24M Shelf Life]
                  </span>
                </div>
                <div className="p-3.5 bg-[#FAF8F2] border border-[#102A43]/10 rounded-sm">
                  <span className="text-[#667085] block text-[10px] uppercase font-mono">
                    Raw Material Origin
                  </span>
                  <span className="font-mono font-semibold text-[#102A43] mt-1 block">
                    [Cluster Traceability ID]
                  </span>
                </div>
                <div className="p-3.5 bg-[#FAF8F2] border border-[#102A43]/10 rounded-sm">
                  <span className="text-[#667085] block text-[10px] uppercase font-mono">
                    QA Authorization
                  </span>
                  <span className="font-mono font-semibold text-[#285943] mt-1 block">
                    [Verified Release Sign-off]
                  </span>
                </div>
              </div>

              {/* CoA Parameter Structure Table */}
              <div className="overflow-x-auto bg-white">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#FAF8F2] border-b border-[#102A43]/10 text-[11px] uppercase tracking-wider text-[#667085]">
                    <tr>
                      <th className="py-3 px-6 font-semibold">Parameter</th>
                      <th className="py-3 px-6 font-semibold">Standard Specification</th>
                      <th className="py-3 px-6 font-semibold">Testing Method</th>
                      <th className="py-3 px-6 font-semibold sm:text-right">Lot Test Result</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#102A43]/10">
                    {[
                      ['Moisture Content (LOD)', '≤ 5.0% w/w', 'Halogen LOD / AOAC 925.10', '[Recorded from Lot Assay]'],
                      ['Particle Size / Mesh', '≥ 95% pass 60 to 100 Mesh', 'ASTM Sieve Analysis', '[Recorded from Lot Assay]'],
                      ['Colour & Appearance', 'Pale golden-ivory to light cream', 'Visual / Lovibond', '[Recorded from Lot Assay]'],
                      ['pH (10% aqueous)', '4.8 – 5.6', 'Potentiometric', '[Recorded from Lot Assay]'],
                      ['Bulk Density', '0.45 – 0.65 g/ml', 'USP <616>', '[Recorded from Lot Assay]'],
                      ['Microbiological Panel', 'TPC < 5,000; Y&M < 100; Pathogens Absent', 'ISO 4833 / 21527 / 6579', '[Recorded from Lot Assay]']
                    ].map(([param, spec, method, result]) => (
                      <tr key={param} className="hover:bg-[#FAF8F2]/50">
                        <td className="py-3 px-6 font-semibold text-[#102A43]">{param}</td>
                        <td className="py-3 px-6 font-mono tabular-nums text-xs text-[#285943] font-semibold">{spec}</td>
                        <td className="py-3 px-6 text-xs text-[#667085]">{method}</td>
                        <td className="py-3 px-6 font-mono text-xs text-[#667085] italic sm:text-right">{result}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="px-6 py-4 bg-[#FAF8F2] border-t border-[#102A43]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                <span className="text-[#667085]">
                  Need a genuine Certificate of Analysis for an active batch or evaluation sample?
                </span>
                <Button
                  onClick={() =>
                    navigateToEnquiry({
                      enquiryType: 'Ask a Technical Question',
                      productInterest: 'Banana Powder (100% Pure)'
                    })
                  }
                  variant="primary"
                  size="sm"
                  showArrow
                >
                  Request Lot-Specific CoA
                </Button>
              </div>
            </div>
          </div>

          {/* Applicable Quality Documents Library */}
          <div className="space-y-6 pt-4 border-t border-white/15">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#B89B5E] font-semibold block">
                  Applicable Quality Documents
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF7F0] mt-1">
                  Standard Commercial &amp; Compliance Documentation
                </h3>
              </div>
              {downloadMessage && (
                <div className="inline-flex items-center gap-2 text-xs font-medium text-[#FAF7F0] bg-[#285943] border border-[#B89B5E]/40 px-3.5 py-2 rounded-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#B89B5E] shrink-0" />
                  <span>{downloadMessage}</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {DOCUMENTATION_LIBRARY.map((doc) => (
                <div
                  key={doc.code}
                  className="p-6 bg-white/5 border border-white/15 rounded-sm space-y-3 flex flex-col justify-between hover:border-[#B89B5E]/60 transition-colors"
                >
                  <div className="space-y-2">
                    <span className="font-mono text-[11px] text-[#B89B5E] font-bold block">
                      {doc.code}
                    </span>
                    <h4 className="font-serif text-lg font-semibold text-[#FAF7F0]">{doc.title}</h4>
                    <p className="text-xs text-[#FAF7F0]/75 leading-relaxed font-light">{doc.description}</p>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                    <span className="text-[11px] font-mono text-[#FAF7F0]/60">{doc.category}</span>
                    <button
                      type="button"
                      onClick={() => handleDownloadDocument(doc.code, doc.title)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B89B5E] hover:text-white transition-colors cursor-pointer shrink-0"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Quality Team CTA */}
      <section className="py-16 bg-[#FAF8F2] text-[#17202A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 border border-[#102A43]/15 rounded-sm flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#285943] font-semibold">
                <Layers className="w-4 h-4" />
                <span>Direct QA &amp; Regulatory Support</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#102A43] font-semibold">
                Request lot-specific CoAs or custom analytical documentation
              </h3>
              <p className="text-sm text-[#667085]">
                Connect with our quality assurance team for genuine production-lot CoAs, third-party laboratory screening, and regulatory declaration packages.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
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
              >
                Request Batch CoA / Consult QA
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
