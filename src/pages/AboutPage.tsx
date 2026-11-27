import React from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import { COMPANY_INFO } from '../data/company';
import { Leaf, FlaskConical, CheckCircle2, Lightbulb, Compass, ShieldCheck, Target, ArrowRight } from 'lucide-react';
import { useRouter } from '../context/RouterContext';

export function AboutPage() {
  const { navigate } = useRouter();

  const approachItems = [
    {
      title: "Responsible Sourcing",
      subtitle: "Traceable Agrarian Alliances",
      description: "We partner directly with established farmer collectives across India's tropical agricultural belts to secure pristine raw materials with consistent maturity profiles."
    },
    {
      title: "Controlled Processing",
      subtitle: "Thermal Precision",
      description: "Our facilities utilize enclosed stainless steel dehydration chambers that eliminate atmospheric contamination while gently locking in biological integrity."
    },
    {
      title: "Quality Verification",
      subtitle: "Analytical Rigor",
      description: "Every metric tonne undergoes moisture testing, particle mesh sizing, and organoleptic appraisal with comprehensive Certificate of Analysis (COA) issuance."
    },
    {
      title: "Continuous Improvement",
      subtitle: "Collaborative R&D",
      description: "We work alongside customer formulation laboratories to tailor solubility kinetics, bulk densities, and packaging configurations for targeted matrices."
    }
  ];

  return (
    <PageWrapper
      title="About Us | BhuviQ Nyra International"
      description="Where Nature Meets Science — Building a globally trusted natural ingredient platform from India for food, nutrition, wellness and beyond."
    >
      {/* Editorial Page Hero */}
      <section className="relative bg-[#102A43] text-white pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=2000&q=80"
            alt="Agricultural landscape"
            className="w-full h-full object-cover opacity-25 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#102A43] via-[#102A43]/80 to-[#102A43]/50" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#B89B5E] text-xs font-semibold uppercase tracking-widest border border-[#B89B5E]/30">
            <span>Corporate Heritage & Philosophy</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.1] text-[#FAF7F0]">
            Where Nature Meets <span className="italic font-light">Science</span>
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-xl text-[#FAF7F0]/85 font-light leading-relaxed">
            At BhuviQ Nyra, we transform naturally sourced agricultural resources into value-added ingredients through responsible sourcing, controlled processing and an uncompromising commitment to quality.
          </p>
        </div>
      </section>

      {/* Main Introduction Story */}
      <section className="py-20 bg-[#FAF8F2] text-[#17202A] border-b border-[#102A43]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <SectionHeading
            eyebrow="Our Story"
            title="Bridging Agricultural Abundance with Industrial Precision"
          />

          <div className="space-y-6 text-base text-[#667085] leading-relaxed font-light">
            <p className="font-serif text-2xl text-[#102A43] leading-snug font-normal">
              India possesses some of the richest biodiversity and tropical agricultural yields on earth. Yet for generations, much of this harvest remained restricted to raw commodity trade or suffered from post-harvest volatility.
            </p>
            <p>
              BhuviQ Nyra was established to pioneer an entirely new paradigm: building clean, pharmaceutical-grade dehydration and refining infrastructure right at the origin. We replace erratic commodity supply with standardized, highly characterized natural ingredients that global formulators can rely upon year-round.
            </p>
            <p>
              Starting with pure, standardized Banana Powder, our platform is engineered from the ground up to support the future of clean-label food, clinical nutrition, functional wellness, and clean beauty.
            </p>
          </div>
        </div>
      </section>

      {/* Our Philosophy (4 Pillars) */}
      <section className="py-20 bg-[#F7F3EA] text-[#17202A] border-b border-[#102A43]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionHeading
            align="center"
            eyebrow="Core Ethos"
            title="Our Philosophy"
            subtitle="The foundational tenets that guide every process parameter, harvest partnership, and client engagement."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COMPANY_INFO.pillars.map((p, idx) => (
              <div
                key={p.id}
                className="p-8 bg-white border border-[#102A43]/10 rounded-sm space-y-4 shadow-xs hover:border-[#285943] transition-all"
              >
                <span className="font-mono text-xs text-[#B89B5E] font-bold">0{idx + 1}</span>
                <h3 className="font-serif text-2xl text-[#102A43] font-semibold">{p.title}</h3>
                <p className="text-xs uppercase tracking-widest text-[#285943] font-semibold">{p.subtitle}</p>
                <p className="text-xs text-[#667085] leading-relaxed font-light">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Vision */}
      <section id="vision" className="py-20 bg-[#102A43] text-white border-b border-[#B89B5E]/30 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#B89B5E] font-semibold">
            <Compass className="w-4 h-4" />
            <span>Strategic Horizon</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#FAF7F0] font-normal leading-tight">
            “Building a trusted natural ingredient platform from India for global markets.”
          </h2>
          <p className="text-base text-[#FAF7F0]/80 font-light max-w-2xl mx-auto leading-relaxed">
            We are creating an integrated supply ecosystem that blends localized agricultural intelligence with international regulatory compliance, ensuring that botanical ingredients manufactured in India meet the strictest global B2B benchmarks.
          </p>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20 bg-[#FAF8F2] text-[#17202A] border-b border-[#102A43]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionHeading
            eyebrow="Execution Rigor"
            title="Our Approach"
            subtitle="How we operationalize our commitments across every node of the supply chain."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {approachItems.map((item, idx) => (
              <div
                key={item.title}
                className="p-8 bg-white border border-[#102A43]/10 rounded-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#285943] font-bold">PILLAR 0{idx + 1}</span>
                  <CheckCircle2 className="w-5 h-5 text-[#285943]" />
                </div>
                <h4 className="font-serif text-2xl text-[#102A43] font-semibold">{item.title}</h4>
                <p className="text-xs uppercase tracking-wider text-[#B89B5E] font-semibold">{item.subtitle}</p>
                <p className="text-sm text-[#667085] leading-relaxed font-light">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="pt-8 text-center space-y-4 bg-white p-8 border border-[#102A43]/10 rounded-sm">
            <h3 className="font-serif text-2xl text-[#102A43]">
              Ready to collaborate on natural ingredient formulation?
            </h3>
            <p className="text-sm text-[#667085] max-w-xl mx-auto">
              Our technical and commercial teams are ready to discuss particle distribution specifications, commercial supply contracts, and tailored solutions.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <Button href="/partner-with-us" variant="primary" showArrow>
                Partner With Us
              </Button>
              <Button href="/ingredients" variant="outline">
                Explore Ingredients
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
