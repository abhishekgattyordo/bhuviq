import React, { useState } from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import {
  ClipboardCheck,
  ShieldCheck,
  Sprout,
  Globe,
  ArrowRight,
  Send,
  Handshake
} from 'lucide-react';

export function TerraVancePage() {
  const [heroImgOk, setHeroImgOk] = useState(true);
  const [aboutImgOk, setAboutImgOk] = useState(true);
  const [distImgOk, setDistImgOk] = useState(true);

  const activities = [
    {
      index: '01',
      title: 'Product assessment',
      description:
        'Evaluation and quality assessment of agricultural products to identify value-added processing potential.',
      icon: ClipboardCheck
    },
    {
      index: '02',
      title: 'Quality improvement initiatives',
      description:
        'Structured quality enhancement across agricultural products through evaluation and appropriate processing.',
      icon: ShieldCheck
    },
    {
      index: '03',
      title: 'Development of food-grade products',
      description:
        'Transforming agricultural products into market-ready food-grade ingredients for commercial use.',
      icon: Sprout
    },
    {
      index: '04',
      title: 'Distribution opportunities',
      description:
        'Connecting agricultural products and food-grade ingredients with domestic and international markets.',
      icon: Globe
    }
  ];

  const coreFocusPillars = [
    {
      label: 'Evaluation',
      detail: 'Agricultural product evaluation and structured quality assessment.'
    },
    {
      label: 'Processing',
      detail: 'Appropriate processing to develop market-ready food-grade ingredients.'
    },
    {
      label: 'Markets',
      detail: 'Value enhancement and distribution focused on domestic and international markets.'
    }
  ];

  const stakeholderGroups = [
    'Vendors',
    'Suppliers',
    'Buyers',
    'Distributors',
    'Business Partners',
    'Potential Clients'
  ];

  return (
    <PageWrapper
      title="TerraVance – Agricultural Value Enhancement & Distribution | BhuviQ Nyra International"
      description="TerraVance is an initiative of BHUVI Q NYRA INTERNATIONAL PRIVATE LIMITED focused on agricultural product evaluation, quality enhancement, value-added processing, and distribution."
    >
      {/* Hero Banner */}
      <section className="relative bg-[#102A43] text-white pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#0B1D2E] via-[#102A43] to-[#1C3F30]">
          {heroImgOk && (
            <img
              src="/images/terravance_agricultural_value_1795783302838.jpg"
              alt="Agricultural produce sorting and evaluation for TerraVance"
              referrerPolicy="no-referrer"
              onError={() => setHeroImgOk(false)}
              className="w-full h-full object-cover opacity-25 mix-blend-luminosity"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#102A43] via-[#102A43]/85 to-[#102A43]/55" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs uppercase tracking-[0.22em] text-[#B89B5E] font-semibold">
            <span>BHUVI Q NYRA INTERNATIONAL PRIVATE LIMITED</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#FAF7F0]/80">Initiative</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-normal leading-[1.08] text-[#FAF7F0] text-balance">
            TerraVance – <span className="italic font-light">Agricultural Value Enhancement &amp; Distribution</span>
          </h1>

          <p className="text-base sm:text-lg text-[#FAF7F0]/85 max-w-3xl mx-auto leading-relaxed font-light">
            An initiative of BHUVI Q NYRA INTERNATIONAL PRIVATE LIMITED focused on agricultural product evaluation, quality enhancement, value-added processing, and distribution.
          </p>

          <p className="font-serif italic text-xl sm:text-2xl text-[#B89B5E] font-normal">
            Terra Vance — Creating Value. Connecting Markets.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Button
              href="/partner-with-us"
              variant="gold"
              size="md"
              icon={<Send className="w-4 h-4" />}
            >
              Submit Business Enquiry
            </Button>
            <Button
              href="#activities"
              variant="outline-light"
              size="md"
              showArrow
            >
              Explore Activities
            </Button>
          </div>
        </div>
      </section>

      {/* About TerraVance */}
      <section className="py-16 sm:py-24 bg-[#FAF8F2] text-[#17202A] border-b border-[#102A43]/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            <div className="lg:col-span-6 min-w-0 flex flex-col justify-center space-y-6">
              <SectionHeading
                eyebrow="01. Initiative Overview"
                title="About TerraVance"
              />

              <div className="space-y-4 text-base sm:text-lg text-[#17202A]/85 leading-relaxed font-normal">
                <p>
                  An initiative of BHUVI Q NYRA INTERNATIONAL PRIVATE LIMITED focused on agricultural product evaluation, quality enhancement, value-added processing, and distribution.
                </p>
                <p className="text-[#667085] font-light">
                  We explore opportunities to transform agricultural products into market-ready food-grade ingredients through evaluation, quality assessment, and appropriate processing, with a focus on domestic and international markets.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#102A43]/10">
                {coreFocusPillars.map((pillar) => (
                  <div key={pillar.label} className="space-y-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#285943] block">
                      {pillar.label}
                    </span>
                    <p className="text-xs text-[#667085] leading-relaxed">
                      {pillar.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 min-w-0 flex">
              <div className="relative w-full aspect-[4/3] lg:aspect-auto lg:h-full min-h-[280px] rounded-sm overflow-hidden border border-[#102A43]/15 bg-[#102A43] shadow-sm">
                {aboutImgOk ? (
                  <img
                    src="/images/terravance_agricultural_value_1795783302838.jpg"
                    alt="Agricultural sorting and quality assessment in regional collection facility"
                    referrerPolicy="no-referrer"
                    onError={() => setAboutImgOk(false)}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#1C3F30] to-[#102A43] flex flex-col items-center justify-center p-6 text-center text-[#FAF7F0]">
                    <Sprout className="w-8 h-8 text-[#B89B5E] mb-2" />
                    <span className="font-serif text-xl">Agricultural Value Enhancement</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#102A43]/85 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-[#FAF7F0]">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#B89B5E] block">
                    Evaluation &amp; Value-Added Processing
                  </span>
                  <p className="text-xs sm:text-sm font-medium mt-0.5 leading-snug">
                    Agricultural product evaluation and quality assessment
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Activities */}
      <section id="activities" className="scroll-mt-24 py-16 sm:py-24 bg-[#F7F3EA] text-[#17202A] border-b border-[#102A43]/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            <div className="lg:col-span-5 min-w-0 order-2 lg:order-1 flex">
              <div className="relative w-full aspect-[4/3] lg:aspect-auto lg:h-full min-h-[280px] rounded-sm overflow-hidden border border-[#102A43]/15 bg-[#102A43] shadow-sm">
                {distImgOk ? (
                  <img
                    src="/images/terravance_food_grade_distribution_1795783302882.jpg"
                    alt="Market-ready food-grade ingredient powder and bulk distribution packaging"
                    referrerPolicy="no-referrer"
                    onError={() => setDistImgOk(false)}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#102A43] to-[#285943] flex flex-col items-center justify-center p-6 text-center text-[#FAF7F0]">
                    <Globe className="w-8 h-8 text-[#B89B5E] mb-2" />
                    <span className="font-serif text-xl">Food-Grade Distribution</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#102A43]/85 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-[#FAF7F0]">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#B89B5E] block">
                    Market-Ready Ingredients
                  </span>
                  <p className="text-xs sm:text-sm font-medium mt-0.5 leading-snug">
                    Food-grade ingredient development and market distribution
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 min-w-0 order-1 lg:order-2 flex flex-col justify-center space-y-6">
              <SectionHeading
                eyebrow="02. Scope of Work"
                title="Our Activities"
                subtitle="Our activities include product assessment, quality improvement initiatives, development of food-grade products, and distribution opportunities."
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activities.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.index}
                      className="p-6 bg-white border border-[#102A43]/12 rounded-sm space-y-3 shadow-xs flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-sm bg-[#285943]/10 text-[#285943] flex items-center justify-center">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="font-mono tabular-nums text-xs font-bold text-[#B89B5E]">
                          {item.index}
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        <h3 className="font-serif text-xl font-semibold text-[#102A43] leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-sm text-[#667085] leading-relaxed font-light">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Enquiries & Tagline */}
      <section className="py-16 sm:py-24 bg-[#102A43] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="bg-[#1D3B58]/60 border border-[#B89B5E]/35 rounded-sm p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xl">
            <div className="lg:col-span-8 space-y-5">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#B89B5E] font-semibold">
                <Handshake className="w-4 h-4" />
                <span>03. Business Enquiries</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF7F0] font-normal text-balance">
                Connect With TerraVance
              </h2>

              <p className="text-base sm:text-lg text-[#FAF7F0]/90 font-light leading-relaxed max-w-3xl">
                We welcome enquiries from vendors, suppliers, buyers, distributors, business partners, and potential clients interested in agricultural products and food-grade ingredients.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-[#FAF7F0]/75">
                {stakeholderGroups.map((group, index) => (
                  <React.Fragment key={group}>
                    <span className="font-medium text-[#FAF7F0]">{group}</span>
                    {index < stakeholderGroups.length - 1 && (
                      <span aria-hidden="true" className="text-[#B89B5E]">·</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end justify-center gap-3">
              <Button
                href="/partner-with-us"
                variant="gold"
                size="md"
                showArrow
              >
                Submit Business Enquiry
              </Button>
              <Button
                href="/contact"
                variant="outline-light"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Contact Our Team
              </Button>
            </div>
          </div>

          {/* Tagline Closing Band */}
          <div className="pt-4 border-t border-white/15 text-center space-y-2">
            <p className="font-serif italic text-2xl sm:text-3xl text-[#B89B5E] font-normal">
              Terra Vance — Creating Value. Connecting Markets.
            </p>
            <p className="text-xs uppercase tracking-[0.2em] text-[#FAF7F0]/65 font-semibold">
              An initiative of BHUVI Q NYRA INTERNATIONAL PRIVATE LIMITED
            </p>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
