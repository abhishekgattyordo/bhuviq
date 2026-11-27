import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import { PageWrapper } from '../components/layout/PageWrapper';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { CURRENT_PRODUCT } from '../data/products';
import { PRODUCT_SPEC_SHEET } from '../data/quality';
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

export function BananaPowderPage() {
  const { openSpecSheetModal, navigate } = useRouter();
  const [specFilter, setSpecFilter] = useState<SpecFilter>('all');
  const [pdfDownloaded, setPdfDownloaded] = useState(false);
  const [heroImgLoaded, setHeroImgLoaded] = useState(true);
  const [overviewImgLoaded, setOverviewImgLoaded] = useState(true);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleDownloadSpecificationPdf = () => {
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 44;
    const contentWidth = pageWidth - margin * 2;
    let y = 0;

    const ensureSpace = (needed: number) => {
      if (y + needed > pageHeight - 54) {
        doc.addPage();
        y = 48;
      }
    };

    const addSectionTitle = (title: string) => {
      ensureSpace(34);
      doc.setFillColor(247, 243, 234);
      doc.rect(margin, y, contentWidth, 22, 'F');
      doc.setDrawColor(184, 155, 94);
      doc.line(margin, y + 22, margin + contentWidth, y + 22);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(16, 42, 67);
      doc.text(title.toUpperCase(), margin + 8, y + 15);
      y += 32;
    };

    const addRow = (label: string, value: string, extra?: string) => {
      const valueText = extra ? `${value}  (${extra})` : value;
      const wrapped = doc.splitTextToSize(valueText, contentWidth - 185);
      const rowHeight = Math.max(18, wrapped.length * 13 + 6);
      ensureSpace(rowHeight + 4);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(16, 42, 67);
      doc.text(label, margin + 4, y + 11);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(40, 55, 71);
      doc.text(wrapped, margin + 180, y + 11);

      doc.setDrawColor(225, 225, 220);
      doc.line(margin, y + rowHeight, margin + contentWidth, y + rowHeight);
      y += rowHeight + 2;
    };

    // Header Banner
    doc.setFillColor(16, 42, 67);
    doc.rect(0, 0, pageWidth, 88, 'F');
    doc.setFillColor(184, 155, 94);
    doc.rect(0, 88, pageWidth, 3, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(184, 155, 94);
    doc.text('BHUVIQ NYRA INTERNATIONAL  |  PRODUCT SPECIFICATION SHEET', margin, 30);

    doc.setFontSize(19);
    doc.setTextColor(250, 247, 240);
    doc.text('Banana Powder (100% Pure)', margin, 54);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(225, 225, 220);
    doc.text(`Botanical Name: ${CURRENT_PRODUCT.botanicalName}   |   Doc Ref: TDS-BQNP-2026`, margin, 73);

    y = 112;

    // 1. Product Overview & Composition
    addSectionTitle('1. Product Overview, Maturity & Composition');
    addRow('Product Name', 'Banana Powder (100% Pure)');
    addRow('Botanical Source', CURRENT_PRODUCT.botanicalName);
    addRow('Geographic Origin', 'India (Approved agricultural clusters)');
    addRow('Banana Maturity', 'Ripe (controlled maturity & °Brix graded prior to dehydration)');
    addRow('Ingredient Composition', '100% Pure Banana (zero carriers, fillers, maltodextrin, or additives)');
    addRow('Banana Peel Status', 'Excluded (sanitary washed and hygienically peeled prior to processing)');
    addRow('Processing Method', 'Enclosed SS-316 low-temperature dehydration and calibrated milling');
    y += 8;

    // 2. Physicochemical Specifications
    addSectionTitle('2. Physicochemical Specifications');
    addRow('Moisture Content (LOD)', '≤ 5.0% w/w', 'Halogen / AOAC 925.10 / Karl Fischer');
    addRow('Water Activity (aw)', 'Pending batch-specific lab confirmation (issued on COA upon request)');
    addRow('Particle Size / Mesh', '≥ 95% passes through 60 to 100 Mesh', 'ASTM Sieve Analysis');
    addRow('Colour / Appearance', 'Pale golden-ivory to light cream fine free-flowing powder', 'Visual / Lovibond');
    addRow('pH (10% aqueous solution)', '4.8 – 5.6', 'Potentiometric');
    addRow('Bulk Density', '0.45 – 0.65 g/ml (Tapped)', 'USP <616>');
    addRow('Aroma & Taste', 'Characteristic ripe banana aroma, clean natural sweet profile', 'Organoleptic');
    y += 8;

    // 3. Microbiological Limits & Heavy Metals
    addSectionTitle('3. Microbiological Limits & Heavy Metals');
    PRODUCT_SPEC_SHEET.microbiological.forEach((item) => {
      addRow(item.parameter, item.specification, item.method);
    });
    addRow(
      'Heavy Metals (Pb, As, Cd, Hg)',
      'Pending batch-specific accredited lab confirmation (full screening dossier available per COA on request)'
    );
    y += 8;

    // 4. Nutritional Information
    addSectionTitle('4. Nutritional Information');
    addRow(
      'Confirmed Profile',
      '100% single-ingredient banana carbohydrates, naturally occurring dietary potassium and soluble fibers; zero added sugars or carriers.'
    );
    addRow(
      'Quantitative Nutrition Panel',
      'Pending accredited per-100g lab assay (verified values issued with commercial technical dossier upon request).'
    );
    y += 8;

    // 5. Packaging, Storage, Shelf Life, MOQ & Lead Time
    addSectionTitle('5. Packaging, Storage, Shelf Life & Commercial Supply');
    addRow(
      'Packaging Formats',
      '25 kg fiber drum with double PE barrier liner; 20 kg / 25 kg multi-layer kraft bag with aluminum/PE moisture barrier; 1 kg / 5 kg / 10 kg pilot pouches.'
    );
    addRow(
      'Storage Instructions',
      'Store in cool, dry, dark conditions below 25°C (77°F) and < 60% RH. Hygroscopic material: heat-reseal or tightly clamp inner liner after opening.'
    );
    addRow('Shelf Life', '24 months from manufacturing date in unopened original barrier packaging.');
    addRow('MOQ', 'Pilot evaluation runs from 25 kg; commercial bulk MOQ confirmed per quotation.');
    addRow('Lead Time', 'Confirmed per order quantity, mesh specification, and export schedule upon inquiry.');

    // Footer on all pages
    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i += 1) {
      doc.setPage(i);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(102, 112, 133);
      doc.text(
        'BhuviQ Nyra International  •  Only confirmed baseline specifications are listed; lot-specific values are issued on the official Batch COA.',
        margin,
        pageHeight - 24
      );
      doc.text(`Page ${i} of ${totalPages}`, pageWidth - margin - 48, pageHeight - 24);
    }

    doc.save('BhuviQ-Nyra-Banana-Powder-Specification.pdf');
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
      specification: 'Pending analytical confirmation (available per Batch COA on request)',
      method: 'Lot-specific verification',
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
      description="Product specification dossier for BhuviQ Nyra 100% Pure Ripe Banana Powder: composition, physicochemical & microbiological standards, packaging, storage, and downloadable PDF specification."
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
              <p className="text-xs uppercase tracking-[0.25em] text-[#B89B5E] font-semibold mt-1.5">
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
                onClick={() => navigate('/partner-with-us')}
                icon={<Send className="w-4 h-4" />}
                showArrow
                className="justify-center"
              >
                Request Sample or Quote
              </Button>
            </div>

            {pdfDownloaded && (
              <div className="inline-flex items-center gap-2 text-xs font-medium text-[#FAF7F0] bg-[#285943]/60 border border-[#B89B5E]/40 px-3.5 py-2 rounded-sm">
                <CheckCircle2 className="w-4 h-4 text-[#B89B5E] shrink-0" />
                <span>Product Specification PDF downloaded (`BhuviQ-Nyra-Banana-Powder-Specification.pdf`).</span>
              </div>
            )}
          </div>

          <div className="lg:col-span-5">
            <div className="bg-[#FAF8F2] text-[#102A43] p-6 sm:p-8 rounded-sm border border-[#B89B5E]/40 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-[#102A43]/10 pb-3">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#285943]">
                  Confirmed Product Profile
                </span>
                <Badge variant="gold">Active B2B Supply</Badge>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between gap-4 py-1.5 border-b border-[#102A43]/8">
                  <span className="text-[#667085]">Botanical Origin:</span>
                  <span className="font-semibold text-right">{CURRENT_PRODUCT.botanicalName}</span>
                </div>
                <div className="flex justify-between gap-4 py-1.5 border-b border-[#102A43]/8">
                  <span className="text-[#667085]">Banana Maturity:</span>
                  <span className="font-semibold text-[#285943] text-right">Ripe (Controlled °Brix)</span>
                </div>
                <div className="flex justify-between gap-4 py-1.5 border-b border-[#102A43]/8">
                  <span className="text-[#667085]">Composition:</span>
                  <span className="font-semibold text-right">100% Pure Banana</span>
                </div>
                <div className="flex justify-between gap-4 py-1.5 border-b border-[#102A43]/8">
                  <span className="text-[#667085]">Banana Peel:</span>
                  <span className="font-semibold text-right">Excluded (Hygienically Peeled)</span>
                </div>
                <div className="flex justify-between gap-4 py-1.5 border-b border-[#102A43]/8">
                  <span className="text-[#667085]">Moisture (Assayed):</span>
                  <span className="font-mono tabular-nums font-semibold text-[#285943]">≤ 5.0% w/w</span>
                </div>
                <div className="flex justify-between gap-4 py-1.5 border-b border-[#102A43]/8">
                  <span className="text-[#667085]">Particle Size:</span>
                  <span className="font-mono tabular-nums font-semibold">60 to 100 Mesh (≥ 95% pass)</span>
                </div>
                <div className="flex justify-between gap-4 py-1.5">
                  <span className="text-[#667085]">Shelf Life:</span>
                  <span className="font-mono tabular-nums font-semibold">24 Months (Unopened)</span>
                </div>
              </div>

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

      {/* Easy-to-Navigate Quick Anchor Bar */}
      <nav
        aria-label="Product sections"
        className="sticky top-[62px] sm:top-[68px] z-30 bg-[#FAF8F2]/95 backdrop-blur-md border-b border-[#102A43]/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 py-3 overflow-x-auto">
          <div className="flex items-center gap-2 sm:gap-5 text-xs font-semibold uppercase tracking-wider text-[#102A43]">
            {[
              { id: 'product-overview', label: '01. Overview & Composition' },
              { id: 'technical-specifications', label: '02. Technical Specs' },
              { id: 'packaging-logistics', label: '03. Packaging, Storage & MOQ' },
              { id: 'applications', label: '04. Applications' }
            ].map((nav) => (
              <button
                key={nav.id}
                type="button"
                onClick={() => scrollToSection(nav.id)}
                className="px-2.5 py-1.5 rounded-sm hover:bg-[#102A43]/5 hover:text-[#285943] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
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
      <section id="product-overview" className="scroll-mt-32 py-16 sm:py-20 bg-[#FAF8F2] text-[#17202A] border-b border-[#102A43]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionHeading
            eyebrow="01. Ingredient Characterization"
            title="Product Overview & Composition"
            subtitle="Engineered from peeled ripe bananas for clean-label industrial formulations requiring authentic flavor, moisture binding, and botanical purity."
          />

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
                    <dd className="text-[#102A43] font-semibold text-right">None (Zero Maltodextrin / Sulfites)</dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* 3 Characterization Pillars */}
            <div className="lg:col-span-7 grid grid-cols-1 gap-5">
              <div className="p-6 sm:p-7 bg-white border border-[#102A43]/12 rounded-sm space-y-2 shadow-xs">
                <span className="font-mono text-xs text-[#B89B5E] font-bold">01. MATURITY & ORIGIN</span>
                <h3 className="font-serif text-2xl text-[#102A43] font-semibold">
                  Ripe Banana Selection from Verified Clusters
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
                  Bananas undergo multi-stage ozonated water washing and hygienic peeling before puree homogenization—ensuring banana peel is completely excluded from the finished ingredient while removed biomass is routed to composting and co-product streams.
                </p>
              </div>

              <div className="p-6 sm:p-7 bg-white border border-[#102A43]/12 rounded-sm space-y-2 shadow-xs">
                <span className="font-mono text-xs text-[#B89B5E] font-bold">03. PROCESSING & INTEGRITY</span>
                <h3 className="font-serif text-2xl text-[#102A43] font-semibold">
                  Precision Low-Temperature Dehydration
                </h3>
                <p className="text-sm text-[#667085] leading-relaxed font-light">
                  Processed inside enclosed SS-316 stainless-steel food-contact pipelines using controlled low-temperature dehydration and calibrated milling. Produces a free-flowing, pale golden-ivory to light cream powder with zero artificial flavors or anti-caking agents.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02. Technical Specifications */}
      <section id="technical-specifications" className="scroll-mt-32 py-16 sm:py-20 bg-[#F7F3EA] text-[#17202A] border-b border-[#102A43]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <SectionHeading
              eyebrow="02. Technical Data Sheet (TDS)"
              title="Technical Specifications"
              subtitle="Verified baseline release parameters and transparent disclosure for lot-confirmed laboratory assays."
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
              { id: 'nutritional', label: 'Nutritional Information' }
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
                      Moisture, water activity, particle size distribution, colour, pH, and physical identity
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
                        <th className="py-3 px-6 font-semibold sm:text-right">Test Method / Status</th>
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
                        Assayed via validated ISO microbiological methodologies
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
                      Batch heavy metal testing (Lead, Arsenic, Cadmium, and Mercury) is conducted via accredited external laboratory dossiers for export compliance.
                    </p>
                  </div>

                  <div className="p-4 bg-[#FAF8F2] border border-[#102A43]/10 rounded-sm space-y-2 text-xs">
                    <span className="font-semibold text-[#102A43] block">
                      Status: Lot-Specific COA Disclosure
                    </span>
                    <p className="text-[#667085] leading-relaxed">
                      Numeric heavy metal ppm limits are not generalized here and are issued directly on the lot Certificate of Analysis upon technical request.
                    </p>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/partner-with-us')}
                    className="w-full"
                    showArrow
                  >
                    Request Heavy Metals Dossier
                  </Button>
                </div>
              </div>
            )}

            {/* C. Nutritional Information */}
            {(specFilter === 'all' || specFilter === 'nutritional') && (
              <div className="bg-white border border-[#102A43]/15 rounded-sm p-6 sm:p-8 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#102A43]/10 pb-4">
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-[#285943] font-bold block mb-1">
                      Botanical Macronutrient & Mineral Profile
                    </span>
                    <h3 className="font-serif text-2xl font-semibold text-[#102A43]">
                      Nutritional Information
                    </h3>
                  </div>
                  <span className="text-xs font-medium px-3 py-1.5 bg-[#FAF8F2] border border-[#102A43]/15 rounded-sm text-[#102A43] self-start sm:self-auto">
                    Per-100g Lab Assay: Pending Final Confirmation
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
                      Exact quantitative nutritional figures (kcal energy, total carbohydrates, sugars, dietary fiber, protein, fat, sodium, and potassium per 100g) are not generalized prior to lot verification and are provided upon request with our accredited laboratory test report.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 03. Packaging Formats, Storage Instructions, Shelf Life, MOQ & Lead Time */}
      <section id="packaging-logistics" className="scroll-mt-32 py-16 sm:py-20 bg-[#FAF8F2] text-[#17202A] border-b border-[#102A43]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionHeading
            eyebrow="03. Packaging & Commercial Logistics"
            title="Packaging, Storage, Shelf Life, MOQ & Lead Time"
            subtitle="Export-grade moisture-barrier packaging and commercial supply terms engineered for global B2B fulfillment."
          />

          {/* Packaging Formats */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#285943] font-semibold">
              <Package className="w-4 h-4" />
              <span>Available Packaging Formats</span>
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
                  Storage Instructions
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
                Structured for pilot formulation runs starting from 25 kg; commercial bulk MOQ is confirmed per order quotation and packaging format.
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
                Dispatch and production lead times are confirmed per order volume, mesh particle specification, and destination freight schedule.
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
      <section id="applications" className="scroll-mt-32 py-16 sm:py-20 bg-[#F7F3EA] text-[#17202A] border-b border-[#102A43]/10">
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
              href="/partner-with-us"
              variant="gold"
              size="lg"
              showArrow
            >
              Request Sample & Quotation
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
