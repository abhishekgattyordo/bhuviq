import React, { useState } from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import { CURRENT_PRODUCT } from '../data/products';
import { PRODUCT_SPEC_SHEET } from '../data/quality';
import { downloadProductSpecificationPdf } from '../lib/pdfDocuments';
import {
  FileText,
  Download,
  Send,
  CheckCircle2,
  Package,
  ThermometerSnowflake,
  Clock,
  Scale,
  ShieldCheck,
  AlertCircle,
  Layers
} from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { cn } from '../lib/utils';

type SpecFilter = 'all' | 'physicochemical' | 'microbiological' | 'nutritional';
type SectionId = 'product-overview' | 'technical-specifications' | 'packaging-logistics' | 'applications';

export function BananaPowderPage() {
  const { openSpecSheetModal, navigateToEnquiry } = useRouter();
  const [specFilter, setSpecFilter] = useState<SpecFilter>('all');
  const [activeSection, setActiveSection] = useState<SectionId>('product-overview');
  const [pdfDownloaded, setPdfDownloaded] = useState(false);
  const [heroImgLoaded, setHeroImgLoaded] = useState(true);
  const [overviewImgLoaded, setOverviewImgLoaded] = useState(true);

  const scrollToSection = (id: SectionId) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleDownloadSpecificationPdf = () => {
    downloadProductSpecificationPdf();
    setPdfDownloaded(true);
    setTimeout(() => setPdfDownloaded(false), 4000);
  };

  const physicochemicalRows = [
    {
      parameter: 'Moisture Content (LOD)',
      specification: '≤ 5.0% w/w',
      method: 'Halogen LOD / AOAC 925.10 / Karl Fischer',
      confirmed: true
    },
    {
      parameter: 'Water Activity (aw)',
      specification: 'To be confirmed per lot COA upon request',
      method: 'Not published in baseline spec',
      confirmed: false
    },
    {
      parameter: 'Particle Size / Mesh',
      specification: '≥ 95% passes through 60 to 100 Mesh',
      method: 'ASTM Sieve Analysis',
      confirmed: true
    },
    {
      parameter: 'Colour & Appearance',
      specification: 'Pale golden-ivory to light cream, fine free-flowing powder',
      method: 'Visual / Sensory / Lovibond',
      confirmed: true
    },
    {
      parameter: 'pH (10% aqueous solution)',
      specification: '4.8 – 5.6',
      method: 'Potentiometric',
      confirmed: true
    },
    {
      parameter: 'Bulk Density',
      specification: '0.45 – 0.65 g/ml (Tapped)',
      method: 'USP <616>',
      confirmed: true
    },
    {
      parameter: 'Aroma & Taste',
      specification: 'Authentic ripe banana aroma, clean natural sweet profile',
      method: 'Organoleptic Panel',
      confirmed: true
    },
    {
      parameter: 'Carriers / Fillers',
      specification: 'None (100% Pure Banana derived)',
      method: 'Formulation Trace',
      confirmed: true
    }
  ];

  const packagingFormats = [
    {
      title: '25 kg Sealed Fiber Drum',
      spec: '25 kg Net Weight',
      detail: 'Fiber drum with double food-grade polyethylene moisture-barrier liner and tamper-evident band, suited for international ocean freight.'
    },
    {
      title: '20 kg / 25 kg Multi-Layer Barrier Bag',
      spec: '20 kg or 25 kg Net Weight',
      detail: 'Heavy-duty multi-wall kraft paper sack or 5-ply corrugated master carton with internal aluminum foil / PE moisture-barrier liner.'
    },
    {
      title: 'Pilot & R&D Barrier Pouches',
      spec: '1 kg / 5 kg / 10 kg Packs',
      detail: 'Nitrogen-flushed food-grade moisture-barrier pouches configured for pilot formulation trials and technical sampling.'
    }
  ];

  return (
    <PageWrapper
      title="Banana Powder (100% Pure) | BhuviQ Nyra International"
      description="Product specification dossier for BhuviQ Nyra 100% Pure Ripe Banana Powder: composition, peel exclusion, physicochemical & microbiological limits, packaging, storage, and downloadable PDF specification."
    >
      {/* Product Hero */}
      <section className="relative bg-[#102A43] text-white pt-32 pb-16 sm:pt-36 sm:pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#0B1D2E] via-[#102A43] to-[#17362A]">
          {heroImgLoaded && (
            <img
              src="/images/insight_banana_pure_ingredient_1790839554597.jpg"
              alt="BhuviQ Nyra 100% Pure Banana Powder"
              referrerPolicy="no-referrer"
              onError={() => setHeroImgLoaded(false)}
              className="w-full h-full object-cover opacity-20 mix-blend-luminosity"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#102A43] via-[#102A43]/85 to-[#102A43]/60" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#B89B5E] font-semibold">
              <span>Standardized Botanical Specification</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#FAF7F0]/80">Food & Nutritional Grade</span>
            </div>

            <div>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-normal leading-[1.06] text-[#FAF7F0] text-balance">
                BANANA <span className="italic font-light">POWDER</span>
              </h1>
              <p className="font-mono text-sm sm:text-base text-[#FAF7F0]/80 italic mt-2">
                Botanical Name: {CURRENT_PRODUCT.botanicalName}
              </p>
              <p className="text-xs uppercase tracking-[0.22em] text-[#B89B5E] font-semibold mt-1.5">
                100% Pure Ripe Banana · Peel Excluded · Natural. Controlled. Consistent.
              </p>
            </div>

            <p className="text-base sm:text-lg text-[#FAF7F0]/85 font-light leading-relaxed max-w-2xl">
              {CURRENT_PRODUCT.description}
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 pt-2">
              <Button
                variant="gold"
                size="md"
                onClick={handleDownloadSpecificationPdf}
                icon={<Download className="w-4 h-4" />}
                className="justify-center"
              >
                Download Product Specification (PDF)
              </Button>

              <Button
                variant="outline-light"
                size="md"
                onClick={() =>
                  navigateToEnquiry({
                    enquiryType: 'Request a Sample',
                    productInterest: 'Banana Powder (100% Pure)',
                    requiredQuantity: 'Sample Pack (1 kg – 5 kg)'
                  })
                }
                icon={<Send className="w-4 h-4" />}
                showArrow
                className="justify-center"
              >
                Request Sample or Quote
              </Button>
            </div>

            {pdfDownloaded && (
              <div className="inline-flex items-center gap-2 text-xs font-medium text-[#FAF7F0] bg-[#285943]/70 border border-[#B89B5E]/40 px-3.5 py-2 rounded-sm">
                <CheckCircle2 className="w-4 h-4 text-[#B89B5E] shrink-0" />
                <span>Product Specification PDF downloaded (BhuviQ-Nyra-Banana-Powder-Specification.pdf).</span>
              </div>
            )}
          </div>

          <div className="lg:col-span-5">
            <div className="bg-[#FAF8F2] text-[#102A43] p-6 sm:p-8 rounded-sm border border-[#B89B5E]/40 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-[#102A43]/10 pb-3">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#285943]">
                  Confirmed Product Profile
                </span>
                <span className="font-mono text-[11px] uppercase tracking-wider font-semibold text-[#8F7236]">
                  Active B2B Supply
                </span>
              </div>

              <dl className="space-y-2.5 text-xs">
                <div className="flex justify-between gap-4 py-1.5 border-b border-[#102A43]/8">
                  <dt className="text-[#667085]">Botanical Origin:</dt>
                  <dd className="font-semibold text-right">{CURRENT_PRODUCT.botanicalName}</dd>
                </div>
                <div className="flex justify-between gap-4 py-1.5 border-b border-[#102A43]/8">
                  <dt className="text-[#667085]">Banana Maturity:</dt>
                  <dd className="font-semibold text-[#285943] text-right">Ripe (Controlled °Brix)</dd>
                </div>
                <div className="flex justify-between gap-4 py-1.5 border-b border-[#102A43]/8">
                  <dt className="text-[#667085]">Composition:</dt>
                  <dd className="font-semibold text-right">100% Pure Banana</dd>
                </div>
                <div className="flex justify-between gap-4 py-1.5 border-b border-[#102A43]/8">
                  <dt className="text-[#667085]">Banana Peel:</dt>
                  <dd className="font-semibold text-right">Excluded (Hygienically Peeled)</dd>
                </div>
                <div className="flex justify-between gap-4 py-1.5 border-b border-[#102A43]/8">
                  <dt className="text-[#667085]">Moisture (Assayed):</dt>
                  <dd className="font-mono tabular-nums font-semibold text-[#285943]">≤ 5.0% w/w</dd>
                </div>
                <div className="flex justify-between gap-4 py-1.5 border-b border-[#102A43]/8">
                  <dt className="text-[#667085]">Particle Size:</dt>
                  <dd className="font-mono tabular-nums font-semibold">60 to 100 Mesh (≥ 95% pass)</dd>
                </div>
                <div className="flex justify-between gap-4 py-1.5">
                  <dt className="text-[#667085]">Shelf Life:</dt>
                  <dd className="font-mono tabular-nums font-semibold">24 Months (Unopened)</dd>
                </div>
              </dl>

              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={handleDownloadSpecificationPdf}
                  className="w-full py-2.5 px-3 bg-[#102A43] text-white hover:bg-[#1D3B58] rounded-sm text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                >
                  <Download className="w-3.5 h-3.5 text-[#B89B5E]" />
                  <span>Spec PDF</span>
                </button>
                <button
                  type="button"
                  onClick={openSpecSheetModal}
                  className="w-full py-2.5 px-3 bg-white border border-[#102A43]/20 text-[#102A43] hover:border-[#285943] hover:text-[#285943] rounded-sm text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                >
                  <FileText className="w-3.5 h-3.5 text-[#285943]" />
                  <span>Preview TDS</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Easy-to-Navigate Sticky Section Anchor Bar */}
      <nav
        aria-label="Product sections"
        className="sticky top-[56px] sm:top-[64px] xl:top-[72px] z-30 bg-[#FAF8F2]/95 backdrop-blur-md border-b border-[#102A43]/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 py-2 overflow-x-auto">
          <div className="flex items-center gap-2 sm:gap-4 text-xs font-semibold uppercase tracking-wider text-[#102A43]">
            {[
              { id: 'product-overview', label: '01. Overview & Composition' },
              { id: 'technical-specifications', label: '02. Technical Specs' },
              { id: 'packaging-logistics', label: '03. Packaging, Storage & MOQ' },
              { id: 'applications', label: '04. Applications' }
            ].map((nav) => (
              <button
                key={nav.id}
                type="button"
                onClick={() => scrollToSection(nav.id as SectionId)}
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
            onClick={handleDownloadSpecificationPdf}
            className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#102A43] text-[#FAF7F0] hover:bg-[#285943] rounded-sm text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#B89B5E]" />
            <span>Download Spec PDF</span>
          </button>
        </div>
      </nav>

      {/* 01. Product Overview, Maturity & Ingredient Composition */}
      <section id="product-overview" className="scroll-mt-36 py-16 sm:py-20 bg-[#FAF8F2] text-[#17202A] border-b border-[#102A43]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionHeading
            eyebrow="01. Ingredient Characterization"
            title="Product Overview & Composition"
            subtitle="Engineered from peeled ripe bananas for clean-label industrial formulations requiring authentic flavor, moisture binding, and botanical purity."
          />

          {/* Quick Confirmed Facts Summary Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-white border border-[#102A43]/12 rounded-sm">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#667085] block">
                Banana Maturity
              </span>
              <span className="font-serif text-xl sm:text-2xl font-semibold text-[#102A43] mt-1 block">
                Ripe
              </span>
              <span className="text-xs text-[#285943] mt-0.5 block">Controlled °Brix intake</span>
            </div>
            <div className="p-5 bg-white border border-[#102A43]/12 rounded-sm">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#667085] block">
                Ingredient Composition
              </span>
              <span className="font-serif text-xl sm:text-2xl font-semibold text-[#102A43] mt-1 block">
                100% Pure Banana
              </span>
              <span className="text-xs text-[#285943] mt-0.5 block">Zero carriers or fillers</span>
            </div>
            <div className="p-5 bg-white border border-[#102A43]/12 rounded-sm">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#667085] block">
                Banana Peel
              </span>
              <span className="font-serif text-xl sm:text-2xl font-semibold text-[#102A43] mt-1 block">
                Excluded
              </span>
              <span className="text-xs text-[#285943] mt-0.5 block">Hygienically peeled</span>
            </div>
            <div className="p-5 bg-white border border-[#102A43]/12 rounded-sm">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#667085] block">
                Moisture & Sieve
              </span>
              <span className="font-serif text-xl sm:text-2xl font-semibold text-[#102A43] tabular-nums mt-1 block">
                ≤ 5.0% · 60–100 Mesh
              </span>
              <span className="text-xs text-[#285943] mt-0.5 block">Standardized release</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Visual & Composition Breakdown */}
            <div className="lg:col-span-5 bg-white border border-[#102A43]/12 rounded-sm overflow-hidden shadow-xs flex flex-col">
              <div className="aspect-[16/10] bg-[#102A43] relative overflow-hidden">
                {overviewImgLoaded ? (
                  <img
                    src="/images/insight_banana_pure_ingredient_1790839554597.jpg"
                    alt="Ripe bananas and milled pure banana powder"
                    referrerPolicy="no-referrer"
                    onError={() => setOverviewImgLoaded(false)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#102A43] to-[#285943] text-[#FAF7F0] text-sm font-serif">
                    100% Pure Banana Powder
                  </div>
                )}
              </div>

              <div className="p-6 space-y-4 flex-1">
                <h3 className="font-serif text-2xl text-[#102A43] font-semibold">
                  Raw Material & Composition Standard
                </h3>

                <dl className="divide-y divide-[#102A43]/10 text-xs">
                  <div className="py-2.5 flex justify-between gap-4">
                    <dt className="text-[#667085] font-medium">Ingredient Composition</dt>
                    <dd className="text-[#102A43] font-semibold text-right">100% Pure Banana</dd>
                  </div>
                  <div className="py-2.5 flex justify-between gap-4">
                    <dt className="text-[#667085] font-medium">Banana Maturity</dt>
                    <dd className="text-[#285943] font-semibold text-right">Ripe (Optimal °Brix Graded)</dd>
                  </div>
                  <div className="py-2.5 flex justify-between gap-4">
                    <dt className="text-[#667085] font-medium">Banana Peel</dt>
                    <dd className="text-[#102A43] font-semibold text-right">Excluded (Peeled Prior to Milling)</dd>
                  </div>
                  <div className="py-2.5 flex justify-between gap-4">
                    <dt className="text-[#667085] font-medium">Carriers, Fillers & Additives</dt>
                    <dd className="text-[#102A43] font-semibold text-right">None (Zero Maltodextrin / Additives)</dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* 3 Characterization Pillars */}
            <div className="lg:col-span-7 grid grid-cols-1 gap-5">
              <div className="p-6 sm:p-7 bg-white border border-[#102A43]/12 rounded-sm space-y-2 shadow-xs">
                <span className="font-mono text-xs text-[#B89B5E] font-bold">01. MATURITY & ORIGIN</span>
                <h3 className="font-serif text-2xl text-[#102A43] font-semibold">
                  Ripe Banana Selection from Approved Suppliers
                </h3>
                <p className="text-sm text-[#667085] leading-relaxed font-light">
                  Sourced from approved food-grade suppliers across India and harvested at optimal ripeness. Incoming consignments are graded for maturity, size, variety, and °Brix soluble solids to preserve natural sweetness and volatile fruit aroma.
                </p>
              </div>

              <div className="p-6 sm:p-7 bg-white border border-[#102A43]/12 rounded-sm space-y-2 shadow-xs">
                <span className="font-mono text-xs text-[#B89B5E] font-bold">02. PREPARATION & PEEL EXCLUSION</span>
                <h3 className="font-serif text-2xl text-[#102A43] font-semibold">
                  Sanitary Washing & Hygienic Peeling
                </h3>
                <p className="text-sm text-[#667085] leading-relaxed font-light">
                  Bananas undergo multi-stage ozonated water washing and hygienic peeling prior to puree homogenization—ensuring banana peel is completely excluded from the finished ingredient while removed agricultural biomass is routed to composting and co-product streams.
                </p>
              </div>

              <div className="p-6 sm:p-7 bg-white border border-[#102A43]/12 rounded-sm space-y-2 shadow-xs">
                <span className="font-mono text-xs text-[#B89B5E] font-bold">03. PROCESSING & INTEGRITY</span>
                <h3 className="font-serif text-2xl text-[#102A43] font-semibold">
                  Precision Low-Temperature Dehydration
                </h3>
                <p className="text-sm text-[#667085] leading-relaxed font-light">
                  Manufactured inside enclosed SS-316 stainless-steel food-contact pipelines using controlled low-temperature dehydration and calibrated milling. Yields a free-flowing, pale golden-ivory to light cream powder with zero artificial flavors or carriers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02. Technical Specifications */}
      <section id="technical-specifications" className="scroll-mt-36 py-16 sm:py-20 bg-[#F7F3EA] text-[#17202A] border-b border-[#102A43]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <SectionHeading
              eyebrow="02. Technical Data Sheet (TDS)"
              title="Technical Specifications"
              subtitle="Confirmed baseline specifications alongside clear status notices for parameters verified per batch Certificate of Analysis."
            />

            <Button
              variant="primary"
              size="md"
              onClick={handleDownloadSpecificationPdf}
              icon={<Download className="w-4 h-4 text-[#B89B5E]" />}
              className="self-start lg:self-auto"
            >
              Download Specification PDF
            </Button>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-2 border-b border-[#102A43]/10 pb-4">
            {[
              { id: 'all', label: 'All Specifications' },
              { id: 'physicochemical', label: 'Physicochemical' },
              { id: 'microbiological', label: 'Microbiological & Heavy Metals' },
              { id: 'nutritional', label: 'Nutritional Values' }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSpecFilter(tab.id as SpecFilter)}
                className={cn(
                  'px-4 py-2 rounded-sm text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer whitespace-nowrap',
                  specFilter === tab.id
                    ? 'bg-[#102A43] text-white shadow-xs'
                    : 'bg-white text-[#667085] hover:bg-[#FAF8F2] hover:text-[#102A43] border border-[#102A43]/10'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="space-y-8">
            {/* A. Physicochemical Parameters */}
            {(specFilter === 'all' || specFilter === 'physicochemical') && (
              <div className="bg-white border border-[#102A43]/15 rounded-sm overflow-hidden shadow-xs">
                <div className="px-6 py-4 bg-[#102A43] text-[#FAF7F0] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-normal">
                      Physicochemical Specifications
                    </h3>
                    <p className="text-xs text-[#FAF7F0]/75">
                      Moisture, water activity, particle size, colour, pH, bulk density, and composition purity
                    </p>
                  </div>
                  <span className="font-mono text-[11px] text-[#B89B5E] uppercase tracking-wider">
                    Standard Release Panel
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-[#FAF8F2] border-b border-[#102A43]/10 text-[11px] uppercase tracking-wider text-[#667085]">
                      <tr>
                        <th className="py-3 px-6 font-semibold">Parameter</th>
                        <th className="py-3 px-6 font-semibold">Specification</th>
                        <th className="py-3 px-6 font-semibold sm:text-right">Method / Confirmation Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#102A43]/10">
                      {physicochemicalRows.map((row) => (
                        <tr key={row.parameter} className="hover:bg-[#FAF8F2]/60 transition-colors">
                          <td className="py-3.5 px-6 font-semibold text-[#102A43]">{row.parameter}</td>
                          <td
                            className={cn(
                              'py-3.5 px-6 font-mono tabular-nums text-xs sm:text-sm',
                              row.confirmed ? 'text-[#285943] font-semibold' : 'text-[#667085] italic font-sans'
                            )}
                          >
                            {row.specification}
                          </td>
                          <td className="py-3.5 px-6 text-xs text-[#667085] sm:text-right">{row.method}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* B. Microbiological Limits & Heavy Metals */}
            {(specFilter === 'all' || specFilter === 'microbiological') && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                {/* Microbiological Limits Table */}
                <div className="lg:col-span-8 bg-white border border-[#102A43]/15 rounded-sm overflow-hidden shadow-xs flex flex-col">
                  <div className="px-6 py-4 bg-[#FAF8F2] border-b border-[#102A43]/10 flex items-center justify-between gap-2">
                    <div>
                      <h3 className="font-serif text-xl font-semibold text-[#102A43]">
                        Microbiological Limits
                      </h3>
                      <p className="text-xs text-[#667085]">
                        Confirmed baseline limits assayed via validated ISO methodologies
                      </p>
                    </div>
                    <ShieldCheck className="w-5 h-5 text-[#285943] shrink-0" />
                  </div>

                  <div className="overflow-x-auto flex-1">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-white border-b border-[#102A43]/10 text-[11px] uppercase tracking-wider text-[#667085]">
                        <tr>
                          <th className="py-3 px-6 font-semibold">Organism / Parameter</th>
                          <th className="py-3 px-6 font-semibold">Limit</th>
                          <th className="py-3 px-6 font-semibold sm:text-right">Method</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#102A43]/10">
                        {PRODUCT_SPEC_SHEET.microbiological.map((item) => (
                          <tr key={item.parameter} className="hover:bg-[#FAF8F2]/60 transition-colors">
                            <td className="py-3 px-6 font-semibold text-[#102A43]">{item.parameter}</td>
                            <td className="py-3 px-6 font-mono tabular-nums text-xs sm:text-sm text-[#285943] font-semibold">
                              {item.specification}
                            </td>
                            <td className="py-3 px-6 text-xs text-[#667085] sm:text-right">{item.method}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Heavy Metals Card */}
                <div className="lg:col-span-4 bg-white border border-[#102A43]/15 rounded-sm p-6 shadow-xs flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-[#B89B5E] font-bold">
                        Contaminant Screening
                      </span>
                      <AlertCircle className="w-4 h-4 text-[#B89B5E]" />
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-[#102A43]">
                      Heavy Metals
                    </h3>
                    <p className="text-xs text-[#667085] leading-relaxed">
                      Batch heavy metal testing (Lead, Arsenic, Cadmium, and Mercury) is provided through accredited external laboratory dossiers for export compliance.
                    </p>
                  </div>

                  <div className="p-4 bg-[#FAF8F2] border border-[#102A43]/10 rounded-sm space-y-2 text-xs">
                    <span className="font-semibold text-[#102A43] block">
                      Confirmation Status: Lot-Specific COA
                    </span>
                    <p className="text-[#667085] leading-relaxed">
                      Numeric heavy metal limits are not published in this overview and are confirmed directly on the batch Certificate of Analysis upon request.
                    </p>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      navigateToEnquiry({
                        enquiryType: 'Ask a Technical Question',
                        productInterest: 'Banana Powder (100% Pure)',
                        requiredQuantity: 'Documentation Review'
                      })
                    }
                    className="w-full"
                    showArrow
                  >
                    Request Heavy Metals Dossier
                  </Button>
                </div>
              </div>
            )}

            {/* C. Nutritional Values */}
            {(specFilter === 'all' || specFilter === 'nutritional') && (
              <div className="bg-white border border-[#102A43]/15 rounded-sm p-6 sm:p-8 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#102A43]/10 pb-4">
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-[#285943] font-bold block mb-1">
                      Botanical Macronutrient & Mineral Profile
                    </span>
                    <h3 className="font-serif text-2xl font-semibold text-[#102A43]">
                      Nutritional Values
                    </h3>
                  </div>
                  <span className="text-xs font-medium px-3 py-1.5 bg-[#FAF8F2] border border-[#102A43]/15 rounded-sm text-[#102A43] self-start sm:self-auto">
                    Per-100g Lab Values: Pending Official Confirmation
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#102A43]">
                      Confirmed Nutritional Attributes
                    </h4>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-[#17202A]">
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#285943] shrink-0 mt-0.5" />
                        <span>100% single-ingredient ripe banana matrix with naturally occurring fruit carbohydrates (fructose and glucose).</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#285943] shrink-0 mt-0.5" />
                        <span>Preserves naturally occurring dietary potassium and natural soluble fruit fibers via low-temperature dehydration.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#285943] shrink-0 mt-0.5" />
                        <span>Zero added sugars, zero maltodextrin carriers, zero preservatives, and zero artificial colors or flavors.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-5 bg-[#FAF8F2] border border-[#102A43]/10 rounded-sm space-y-2.5 text-xs">
                    <div className="flex items-center gap-2 text-[#102A43] font-semibold">
                      <FileText className="w-4 h-4 text-[#B89B5E]" />
                      <span>Quantitative Nutritional Panel (Per 100g)</span>
                    </div>
                    <p className="text-[#667085] leading-relaxed">
                      Exact numeric per-100g values (energy, carbohydrates, sugars, dietary fiber, protein, fat, sodium, and potassium) are not published without a verified lot assay and are provided upon request with our accredited laboratory report.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 03. Packaging Formats, Storage, Shelf Life, MOQ & Lead Time */}
      <section id="packaging-logistics" className="scroll-mt-36 py-16 sm:py-20 bg-[#FAF8F2] text-[#17202A] border-b border-[#102A43]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionHeading
            eyebrow="03. Packaging & Commercial Logistics"
            title="Packaging, Storage, Shelf Life, MOQ & Lead Time"
            subtitle="Confirmed export-grade moisture-barrier packaging and supply parameters, with order-specific terms verified upon commercial inquiry."
          />

          {/* Packaging Formats */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#285943] font-semibold">
              <Package className="w-4 h-4" />
              <span>Confirmed Packaging Formats</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {packagingFormats.map((pack) => (
                <div
                  key={pack.title}
                  className="p-6 bg-white border border-[#102A43]/12 rounded-sm space-y-2.5 shadow-xs"
                >
                  <span className="font-mono tabular-nums text-xs font-bold text-[#B89B5E] block">
                    {pack.spec}
                  </span>
                  <h3 className="font-serif text-xl font-semibold text-[#102A43]">{pack.title}</h3>
                  <p className="text-xs sm:text-sm text-[#667085] leading-relaxed font-light">
                    {pack.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Storage, Shelf Life, MOQ, Lead Time Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-white border border-[#102A43]/12 rounded-sm space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#285943] font-bold">
                  Storage
                </span>
                <ThermometerSnowflake className="w-4 h-4 text-[#285943]" />
              </div>
              <p className="text-xs text-[#17202A] leading-relaxed">
                Store in a cool, dry, dark warehouse below <strong className="font-mono">25°C (77°F)</strong> and <strong className="font-mono">&lt; 60% RH</strong>, away from direct sunlight and strong odors.
              </p>
              <p className="text-[11px] text-[#667085] leading-relaxed border-t border-[#102A43]/10 pt-2">
                Hygroscopic product: heat-reseal or tightly clamp the inner barrier liner immediately after opening.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#102A43]/12 rounded-sm space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#285943] font-bold">
                  Shelf Life
                </span>
                <Clock className="w-4 h-4 text-[#285943]" />
              </div>
              <p className="font-serif text-2xl font-semibold text-[#102A43] tabular-nums">
                24 Months
              </p>
              <p className="text-xs text-[#667085] leading-relaxed">
                From manufacturing date when maintained in original unopened moisture-barrier packaging under recommended storage conditions.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#102A43]/12 rounded-sm space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#B89B5E] font-bold">
                  MOQ
                </span>
                <Scale className="w-4 h-4 text-[#B89B5E]" />
              </div>
              <p className="font-serif text-2xl font-semibold text-[#102A43] tabular-nums">
                From 25 kg (Pilot)
              </p>
              <p className="text-xs text-[#667085] leading-relaxed">
                Pilot evaluation runs are supported from 25 kg; commercial bulk MOQ is confirmed per order quotation and packaging selection.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#102A43]/12 rounded-sm space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#B89B5E] font-bold">
                  Lead Time
                </span>
                <Layers className="w-4 h-4 text-[#B89B5E]" />
              </div>
              <p className="font-serif text-xl font-semibold text-[#102A43]">
                Confirmed Upon Inquiry
              </p>
              <p className="text-xs text-[#667085] leading-relaxed">
                Fixed lead times are not generalized; production and dispatch schedules are confirmed per order volume, mesh size, and destination.
              </p>
            </div>
          </div>

          {/* Downloadable Product Specification PDF Banner */}
          <div className="p-6 sm:p-8 bg-[#102A43] text-[#FAF7F0] rounded-sm border border-[#B89B5E]/40 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-lg">
            <div className="space-y-1.5 max-w-2xl">
              <span className="font-mono text-xs uppercase tracking-widest text-[#B89B5E] font-semibold block">
                Official Technical Documentation
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal">
                Product Specification Sheet (PDF)
              </h3>
              <p className="text-xs sm:text-sm text-[#FAF7F0]/80 font-light leading-relaxed">
                Download the complete specification sheet covering maturity, composition, peel exclusion, physicochemical and microbiological standards, packaging, storage, and supply terms.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <Button
                variant="gold"
                size="md"
                onClick={handleDownloadSpecificationPdf}
                icon={<Download className="w-4 h-4" />}
              >
                Download PDF
              </Button>
              <Button
                variant="outline-light"
                size="md"
                onClick={openSpecSheetModal}
                icon={<FileText className="w-4 h-4" />}
              >
                View On-Screen TDS
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 04. Formulation Applications Overview */}
      <section id="applications" className="scroll-mt-36 py-16 sm:py-20 bg-[#F7F3EA] text-[#17202A] border-b border-[#102A43]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionHeading
            eyebrow="04. Integration Matrix"
            title="Applications Across Industries"
            subtitle="Where formulators deploy BhuviQ Nyra Banana Powder for consistent sensory and structural performance."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Bakery & Snack Foods',
                desc: 'Natural sweetening, moist crumb texture, authentic banana bread and muffin flavoring, and clean-label extruded snacks.'
              },
              {
                title: 'Sports & Clinical Nutrition',
                desc: 'Natural dietary potassium and easily digestible carbohydrates in pre/post-workout blends and infant porridge.'
              },
              {
                title: 'Beverages & Dairy',
                desc: 'Smoothie bases, ready-to-mix protein shakes, plant-based milks, ice creams, and yogurt fruit preparations.'
              },
              {
                title: 'Personal Care & Cosmetics',
                desc: 'Gentle natural facial scrubs, hydrating face masks, hair conditioning packs, and clean-beauty dry formulations.'
              }
            ].map((app) => (
              <div
                key={app.title}
                className="p-6 bg-white border border-[#102A43]/10 rounded-sm space-y-2.5 shadow-xs"
              >
                <h4 className="font-serif text-xl font-semibold text-[#102A43]">{app.title}</h4>
                <p className="text-xs sm:text-sm text-[#667085] leading-relaxed font-light">{app.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Action Footer CTA */}
      <section className="py-16 bg-[#102A43] text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h3 className="font-serif text-3xl sm:text-4xl text-[#FAF7F0] text-balance">
            Ready to request samples or confirm commercial specifications?
          </h3>
          <p className="text-sm text-[#FAF7F0]/80 font-light max-w-xl mx-auto">
            Connect with our commercial and quality assurance teams for lot-specific COAs, sample dispatch, lead times, and bulk quotations.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3.5">
            <Button
              onClick={() =>
                navigateToEnquiry({
                  enquiryType: 'Request a Sample',
                  productInterest: 'Banana Powder (100% Pure)',
                  requiredQuantity: 'Sample Pack (1 kg – 5 kg)'
                })
              }
              variant="gold"
              size="lg"
              showArrow
            >
              Request Sample &amp; Quotation
            </Button>
            <Button
              variant="outline-light"
              size="lg"
              onClick={handleDownloadSpecificationPdf}
              icon={<Download className="w-4 h-4" />}
            >
              Download Specification PDF
            </Button>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
