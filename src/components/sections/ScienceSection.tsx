import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SectionHeading } from '../ui/SectionHeading';
import {
  Cpu,
  RefreshCw,
  FlaskConical,
  Sprout,
  SlidersHorizontal,
  ShieldCheck,
  Sparkles,
  MapPin,
  Microscope,
  GitBranch,
  ArrowRight
} from 'lucide-react';
import { Button } from '../ui/Button';

export function ScienceSection() {
  const [varietiesImgOk, setVarietiesImgOk] = useState(true);
  const [labImgOk, setLabImgOk] = useState(true);
  const [rdLabImgOk, setRdLabImgOk] = useState(true);
  const [terraSynchImgOk, setTerraSynchImgOk] = useState(true);

  const images = [
    {
      url: '/images/sector_ss316_processing_line_1790839222801.jpg',
      caption: 'Enclosed SS-316 Processing Line'
    },
    {
      url: '/images/sector_moisture_testing_1790839241510.jpg',
      caption: 'Analytical Assay & Moisture Testing'
    },
    {
      url: '/images/sector_thermal_drying_tunnel_1790839261259.jpg',
      caption: 'Thermal Dehydration Chambers'
    },
    {
      url: '/images/sector_quality_qa_lab_1790839275701.jpg',
      caption: 'Quality Assurance Laboratory'
    }
  ];

  const researchPillars = [
    {
      index: '01',
      title: 'Nutritional Properties',
      detail:
        'Systematic evaluation of naturally occurring nutritional characteristics across diverse regional banana cultivars.',
      icon: Sprout
    },
    {
      index: '02',
      title: 'Processing Methods',
      detail:
        'Comparative study of preparation, dehydration behavior, and milling suitability across cultivar textures and moisture profiles.',
      icon: SlidersHorizontal
    },
    {
      index: '03',
      title: 'Quality Parameters',
      detail:
        'Assessment of moisture levels, colour stability, particle consistency, pH behavior, and sensory attributes.',
      icon: ShieldCheck
    },
    {
      index: '04',
      title: 'Ingredient Potential',
      detail:
        'Screening functional applicability across food, bakery, nutrition, wellness, and botanical formulation categories.',
      icon: Sparkles
    }
  ];

  return (
    <section
      id="research-innovation"
      className="py-24 sm:py-32 bg-[#F7F3EA] text-[#17202A] border-b border-[#102A43]/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Science & Innovation"
            title="Precision Behind Every Ingredient"
            subtitle="Advanced thermal profiling, micronization science, and enclosed sanitary engineering ensure unmatched batch repeatability."
          />
          <Button href="/manufacturing" variant="outline" size="sm" showArrow>
            Stream Processing Video
          </Button>
        </div>

        {/* Editorial Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((img, idx) => (
            <motion.div
              key={img.caption}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5, ease: 'easeOut' }}
              className="group relative rounded-sm overflow-hidden border border-[#102A43]/15 shadow-xs aspect-[4/5] bg-[#102A43]"
            >
              <img
                src={img.url}
                alt={img.caption}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter saturate-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#102A43]/90 via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#B89B5E] block">
                  Facility Sector 0{idx + 1}
                </span>
                <p className="text-xs font-medium text-white/95 mt-0.5 leading-tight">
                  {img.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Three Content Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            whileHover={{ y: -4, transition: { duration: 0.25 } }}
            className="p-8 bg-white border border-[#102A43]/10 rounded-sm space-y-4 hover:border-[#285943] shadow-xs hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 rounded-full bg-[#285943]/10 text-[#285943] flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-2xl text-[#102A43] font-semibold">
              Process Technology
            </h3>
            <p className="text-xs uppercase tracking-widest text-[#285943] font-semibold">
              Controlled and consistent processing
            </p>
            <p className="text-sm text-[#667085] leading-relaxed font-light">
              We employ precision-controlled thermal drying regimes that gently remove moisture without scorching delicate fruit sugars. This prevents non-enzymatic browning and preserves natural aroma volatiles.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            whileHover={{ y: -4, transition: { duration: 0.25 } }}
            className="p-8 bg-white border border-[#102A43]/10 rounded-sm space-y-4 hover:border-[#285943] shadow-xs hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 rounded-full bg-[#285943]/10 text-[#285943] flex items-center justify-center">
              <FlaskConical className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-2xl text-[#102A43] font-semibold">
              Quality Science
            </h3>
            <p className="text-xs uppercase tracking-widest text-[#285943] font-semibold">
              Testing and verification throughout the journey
            </p>
            <p className="text-sm text-[#667085] leading-relaxed font-light">
              From raw intake Brix sorting to Karl Fischer moisture analysis and particle sizing on automated laser/sieve analyzers, quality parameters are validated systematically prior to commercial release.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            whileHover={{ y: -4, transition: { duration: 0.25 } }}
            className="p-8 bg-white border border-[#102A43]/10 rounded-sm space-y-4 hover:border-[#285943] shadow-xs hover:shadow-md transition-all"
          >
            <div className="w-10 h-10 rounded-full bg-[#285943]/10 text-[#285943] flex items-center justify-center">
              <RefreshCw className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-2xl text-[#102A43] font-semibold">
              Continuous Improvement
            </h3>
            <p className="text-xs uppercase tracking-widest text-[#285943] font-semibold">
              Commitment to refining products and methods
            </p>
            <p className="text-sm text-[#667085] leading-relaxed font-light">
              Our applications team actively benchmarks solubility curves, dispersion stability, and matrix interactions to support our global partners with customized milling specifications and trial formulations.
            </p>
          </motion.div>
        </div>

        {/* 35 Banana Varieties Research Programme */}
        <div className="pt-12 border-t border-[#102A43]/15 space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* Programme Narrative & 4 Evaluation Pillars */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#285943] font-semibold">
                  <span>Research & Innovation Initiative</span>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1 text-[#102A43]/75">
                    <MapPin className="w-3.5 h-3.5 text-[#B89B5E]" />
                    South India
                  </span>
                </div>

                <h3 className="font-serif text-3xl sm:text-4xl lg:text-[42px] leading-[1.12] text-[#102A43] font-semibold text-balance">
                  35 Banana Varieties Research Programme
                </h3>

                <p className="text-base sm:text-lg text-[#17202A]/85 leading-relaxed font-normal max-w-2xl">
                  Research and evaluation of banana varieties available across South India, including nutritional properties, processing methods, quality parameters, and ingredient potential.
                </p>
              </div>

              {/* Four Focus Areas Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {researchPillars.map((pillar) => {
                  const Icon = pillar.icon;
                  return (
                    <div
                      key={pillar.index}
                      className="p-5 bg-white border border-[#102A43]/12 rounded-sm space-y-2.5 shadow-xs"
                    >
                      <div className="flex items-center justify-between">
                        <div className="w-9 h-9 rounded-sm bg-[#102A43]/5 text-[#285943] flex items-center justify-center">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="font-mono tabular-nums text-xs font-bold text-[#B89B5E]">
                          {pillar.index}
                        </span>
                      </div>
                      <h4 className="font-serif text-xl font-semibold text-[#102A43]">
                        {pillar.title}
                      </h4>
                      <p className="text-xs text-[#667085] leading-relaxed font-light">
                        {pillar.detail}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-1">
                <Button href="/science-quality" variant="primary" size="sm" showArrow>
                  View Quality & Testing Scope
                </Button>
                <Button href="/partner-with-us" variant="outline" size="sm">
                  Discuss R&D Collaboration
                </Button>
              </div>
            </div>

            {/* Programme Visuals Column */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
              {/* Visual 1: South Indian Banana Varieties */}
              <div className="relative rounded-sm overflow-hidden border border-[#102A43]/15 bg-[#102A43] shadow-sm aspect-[16/10]">
                {varietiesImgOk ? (
                  <img
                    src="/images/south_india_banana_varieties_1795782889959.jpg"
                    alt="Diverse South Indian banana varieties assembled for comparative ingredient research"
                    referrerPolicy="no-referrer"
                    onError={() => setVarietiesImgOk(false)}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#102A43] to-[#285943] flex flex-col items-center justify-center p-6 text-center text-[#FAF7F0]">
                    <Sprout className="w-8 h-8 text-[#B89B5E] mb-2" />
                    <span className="font-serif text-lg">South Indian Banana Varieties</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#102A43]/90 via-[#102A43]/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-[#FAF7F0]">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#B89B5E] block">
                    Cultivar Diversity Study · 35 Varieties
                  </span>
                  <p className="text-xs sm:text-sm font-medium mt-0.5 leading-snug">
                    Botanical and compositional screening of regional cultivars across South India
                  </p>
                </div>
              </div>

              {/* Visual 2: Research & Evaluation Lab */}
              <div className="relative rounded-sm overflow-hidden border border-[#102A43]/15 bg-[#102A43] shadow-sm aspect-[16/10]">
                {labImgOk ? (
                  <img
                    src="/images/banana_research_evaluation_lab_1795782891177.jpg"
                    alt="Laboratory evaluation of banana powder samples, moisture parameters, and ingredient potential"
                    referrerPolicy="no-referrer"
                    onError={() => setLabImgOk(false)}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#102A43] to-[#1D3B58] flex flex-col items-center justify-center p-6 text-center text-[#FAF7F0]">
                    <FlaskConical className="w-8 h-8 text-[#B89B5E] mb-2" />
                    <span className="font-serif text-lg">Ingredient Research & Evaluation</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#102A43]/90 via-[#102A43]/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-[#FAF7F0]">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#B89B5E] block">
                    Processing & Quality Assessment
                  </span>
                  <p className="text-xs sm:text-sm font-medium mt-0.5 leading-snug">
                    Evaluating processing behavior, quality parameters, and functional ingredient potential
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* R&D Lab & TerraSynch */}
        <div id="rd-lab" className="pt-12 border-t border-[#102A43]/15 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="text-xs uppercase tracking-[0.2em] text-[#285943] font-semibold">
                Research & Traceability Ecosystem
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#102A43] font-semibold text-balance">
                R&amp;D Lab &amp; TerraSynch
              </h3>
            </div>
            <Button href="/partner-with-us" variant="outline" size="sm" showArrow>
              Connect With Our R&amp;D Team
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* 1. R&D Lab */}
            <article className="bg-white border border-[#102A43]/12 rounded-sm overflow-hidden shadow-xs flex flex-col justify-between">
              <div>
                <div className="relative aspect-[4/3] bg-[#102A43] overflow-hidden">
                  {rdLabImgOk ? (
                    <img
                      src="/images/rd_lab_banana_powder_grades_1795783124764.jpg"
                      alt="R&D Lab testing banana varieties and developing food, cosmetic, and pharmaceutical-grade banana powder products"
                      referrerPolicy="no-referrer"
                      onError={() => setRdLabImgOk(false)}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#102A43] to-[#285943] flex flex-col items-center justify-center p-6 text-center text-[#FAF7F0]">
                      <Microscope className="w-8 h-8 text-[#B89B5E] mb-2" />
                      <span className="font-serif text-xl">R&amp;D Lab</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#102A43]/85 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-xs text-[#FAF7F0]">
                    <span className="font-mono uppercase tracking-widest text-[#B89B5E]">
                      01 · Research &amp; Development Facility
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-sm bg-[#285943]/10 text-[#285943] flex items-center justify-center shrink-0">
                      <Microscope className="w-5 h-5" />
                    </div>
                    <h4 className="font-serif text-2xl sm:text-3xl font-semibold text-[#102A43]">
                      1. R&amp;D Lab
                    </h4>
                  </div>

                  <p className="text-sm sm:text-base text-[#17202A]/85 leading-relaxed font-normal">
                    Dedicated research and development facility focused on testing and researching diverse banana varieties available across South India, evaluating nutritional properties, processing methods, quality parameters, and developing food, cosmetic, and pharmaceutical-grade banana powder products.
                  </p>
                </div>
              </div>

              <div className="px-6 sm:px-8 py-4 bg-[#FAF8F2] border-t border-[#102A43]/10 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-[#102A43]">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#285943] font-semibold">
                  Development Focus:
                </span>
                <span>Food-Grade</span>
                <span aria-hidden="true" className="text-[#B89B5E]">·</span>
                <span>Cosmetic-Grade</span>
                <span aria-hidden="true" className="text-[#B89B5E]">·</span>
                <span>Pharmaceutical-Grade</span>
              </div>
            </article>

            {/* 2. TerraSynch */}
            <article className="bg-white border border-[#102A43]/12 rounded-sm overflow-hidden shadow-xs flex flex-col justify-between">
              <div>
                <div className="relative aspect-[4/3] bg-[#102A43] overflow-hidden">
                  {terraSynchImgOk ? (
                    <img
                      src="/images/terrasynch_farm_supply_traceability_1795783124890.jpg"
                      alt="TerraSynch integrating banana cultivation, sourcing, processing, and supply-chain coordination"
                      referrerPolicy="no-referrer"
                      onError={() => setTerraSynchImgOk(false)}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#1C3F30] to-[#102A43] flex flex-col items-center justify-center p-6 text-center text-[#FAF7F0]">
                      <GitBranch className="w-8 h-8 text-[#B89B5E] mb-2" />
                      <span className="font-serif text-xl">TerraSynch</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#102A43]/85 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-xs text-[#FAF7F0]">
                    <span className="font-mono uppercase tracking-widest text-[#B89B5E]">
                      02 · Farm-to-Product Initiative
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-sm bg-[#102A43]/5 text-[#102A43] flex items-center justify-center shrink-0">
                      <GitBranch className="w-5 h-5" />
                    </div>
                    <h4 className="font-serif text-2xl sm:text-3xl font-semibold text-[#102A43]">
                      2. TerraSynch
                    </h4>
                  </div>

                  <p className="text-sm sm:text-base text-[#17202A]/85 leading-relaxed font-normal">
                    A technology-enabled initiative integrating banana cultivation, sourcing, processing, and supply-chain coordination to support traceability, quality consistency, and sustainable farm-to-product management.
                  </p>
                </div>
              </div>

              <div className="px-6 sm:px-8 py-4 bg-[#FAF8F2] border-t border-[#102A43]/10 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-xs text-[#102A43]">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#285943] font-semibold mr-1">
                  Integrated Scope:
                </span>
                <span>Cultivation</span>
                <ArrowRight className="w-3 h-3 text-[#B89B5E]" aria-hidden="true" />
                <span>Sourcing</span>
                <ArrowRight className="w-3 h-3 text-[#B89B5E]" aria-hidden="true" />
                <span>Processing</span>
                <ArrowRight className="w-3 h-3 text-[#B89B5E]" aria-hidden="true" />
                <span>Supply-Chain Coordination</span>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
