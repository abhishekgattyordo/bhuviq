import React from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { SectionHeading } from '../components/ui/SectionHeading';
import { CURRENT_PRODUCT, FUTURE_CATEGORIES } from '../data/products';
import { APPLICATION_MATRIX } from '../data/applications';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { FileText, Download } from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { downloadProductSpecificationPdf } from '../lib/pdfDocuments';

export function IngredientsPage() {
  const { openSpecSheetModal, navigateToEnquiry } = useRouter();

  return (
    <PageWrapper
      title="Natural Ingredients Platform | BhuviQ Nyra International"
      description="Nature, Refined. Discover pure, standardized Banana Powder and explore our expanding botanical ingredient platform."
    >
      {/* Hero */}
      <section className="relative bg-[#102A43] text-white pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/south_india_banana_varieties_1795782889959.jpg"
            alt="South India banana varieties and raw materials"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-25 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#102A43] via-[#102A43]/85 to-[#102A43]/60" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#B89B5E] text-xs font-semibold uppercase tracking-widest border border-[#B89B5E]/30">
            <span>Standardized Botanical Portfolio</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.1] text-[#FAF7F0]">
            Nature, <span className="italic font-light">Refined.</span>
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-xl text-[#FAF7F0]/85 font-light leading-relaxed">
            Standardized, high-purity natural ingredients engineered for food, nutrition, and wellness formulators who refuse to compromise on quality or consistency.
          </p>
        </div>
      </section>

      {/* Current Active Ingredient Spotlight */}
      <section id="banana-powder" className="py-20 bg-[#FAF8F2] text-[#17202A] border-b border-[#102A43]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionHeading
            eyebrow="Commercial Supply"
            title="Current Active Ingredient"
            subtitle="Commercial scale manufacturing with standardized physicochemical specifications."
          />

          <div className="bg-white border border-[#102A43]/15 rounded-sm p-8 lg:p-12 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Image */}
            <div className="lg:col-span-5 relative rounded-sm overflow-hidden aspect-[4/3] bg-[#102A43]">
              <img
                src={CURRENT_PRODUCT.image}
                alt={CURRENT_PRODUCT.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3">
                <Badge variant="gold" dot>Commercial Availability</Badge>
              </div>
              <div className="absolute bottom-3 right-3 font-mono text-xs bg-[#102A43]/90 text-[#FAF7F0] px-3 py-1 rounded border border-[#B89B5E]/30">
                HS Code: 1106.30
              </div>
            </div>

            {/* Info */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#285943] font-semibold block mb-1">
                  100% Pure Botanical Derivative
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#102A43] font-bold">
                  {CURRENT_PRODUCT.name}
                </h2>
                <p className="text-xs text-[#667085] italic font-mono mt-0.5">
                  {CURRENT_PRODUCT.botanicalName}
                </p>
              </div>

              <p className="text-sm text-[#17202A] leading-relaxed font-light">
                {CURRENT_PRODUCT.description}
              </p>

              {/* Specs Grid Preview */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2 border-y border-[#102A43]/10 text-xs">
                <div>
                  <span className="text-[#667085] block text-[10px] uppercase font-mono">Appearance</span>
                  <span className="font-semibold text-[#102A43]">Fine Off-White Powder</span>
                </div>
                <div>
                  <span className="text-[#667085] block text-[10px] uppercase font-mono">Moisture</span>
                  <span className="font-semibold text-[#285943]">≤ 5.0% Assayed</span>
                </div>
                <div>
                  <span className="text-[#667085] block text-[10px] uppercase font-mono">Particle Mesh</span>
                  <span className="font-semibold text-[#102A43]">60 to 100 Mesh</span>
                </div>
                <div>
                  <span className="text-[#667085] block text-[10px] uppercase font-mono">Additives</span>
                  <span className="font-semibold text-[#285943]">Zero (100% Pure)</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button href="/ingredients/banana-powder" variant="primary" showArrow>
                  Explore Full Product Dossier
                </Button>
                <Button
                  variant="gold"
                  onClick={() =>
                    navigateToEnquiry({
                      enquiryType: 'Request a Sample',
                      productInterest: 'Banana Powder (100% Pure)',
                      requiredQuantity: 'Sample Pack (1 kg – 5 kg)'
                    })
                  }
                >
                  Request a Sample
                </Button>
                <Button
                  variant="outline"
                  onClick={downloadProductSpecificationPdf}
                  icon={<Download className="w-4 h-4 text-[#285943]" />}
                >
                  Spec PDF
                </Button>
                <Button
                  variant="ghost"
                  onClick={openSpecSheetModal}
                  icon={<FileText className="w-4 h-4 text-[#285943]" />}
                >
                  View TDS
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Future of Our Platform */}
      <section id="platform-pipeline" className="py-20 bg-[#F7F3EA] text-[#17202A] border-b border-[#102A43]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionHeading
            eyebrow="R&D Platform Pipeline"
            title="The Future of Our Ingredient Platform"
            subtitle="Expanding into complementary botanical categories through targeted extraction and gentle thermal dehydration architectures."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {FUTURE_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                className="p-8 bg-white border border-[#102A43]/10 rounded-sm space-y-4 shadow-xs hover:border-[#285943] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#285943] font-bold px-2.5 py-1 bg-[#285943]/10 rounded">
                    {cat.timeline}
                  </span>
                  <Badge variant="navy">{cat.status}</Badge>
                </div>

                <h3 className="font-serif text-2xl text-[#102A43] font-semibold">
                  {cat.title}
                </h3>

                <p className="text-sm text-[#667085] leading-relaxed font-light">
                  {cat.description}
                </p>

                <div className="space-y-2 pt-2 border-t border-[#102A43]/10">
                  <span className="text-xs uppercase tracking-wider text-[#102A43] font-semibold block">
                    Target Development Matrices:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {cat.highlights.map((h) => (
                      <span key={h} className="text-xs px-2.5 py-1 bg-[#FAF8F2] border border-[#102A43]/10 rounded text-[#17202A]">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Compatibility Matrix */}
      <section className="py-20 bg-[#FAF8F2] text-[#17202A] border-b border-[#102A43]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionHeading
            eyebrow="Formulation Reference"
            title="Application Matrix"
            subtitle="Standardized suitability guide for Banana Powder and pipeline ingredients."
          />

          <div className="bg-white border border-[#102A43]/15 rounded-sm overflow-x-auto shadow-xs">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#102A43] text-white font-mono uppercase tracking-wider">
                  <th className="p-4">Industry Sector</th>
                  <th className="p-4">Matrix Application</th>
                  <th className="p-4">Primary Functional Benefit</th>
                  <th className="p-4">Recommended Dosage</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#102A43]/10">
                {APPLICATION_MATRIX.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#FAF8F2] transition-colors">
                    <td className="p-4 font-semibold text-[#102A43]">{row.sector}</td>
                    <td className="p-4 text-[#17202A]">{row.application}</td>
                    <td className="p-4 text-[#667085]">{row.benefit}</td>
                    <td className="p-4 font-mono font-medium text-[#285943]">{row.dosage}</td>
                    <td className="p-4">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-[#285943]/10 text-[#285943]">
                        {row.suitability}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-8 bg-[#102A43] text-white rounded-sm border border-[#B89B5E]/30 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-serif text-2xl text-[#FAF7F0]">
                Need custom mesh milling or tailored specifications?
              </h4>
              <p className="text-xs text-[#FAF7F0]/80 mt-1">
                Our pilot facility can prepare customized trials to your exact particle curve.
              </p>
            </div>
            <Button
              href="/partner-with-us"
              variant="gold"
              showArrow
            >
              Inquire for Custom Specs
            </Button>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
