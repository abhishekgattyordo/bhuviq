import React from 'react';
import { motion } from 'motion/react';
import { SectionHeading } from '../ui/SectionHeading';
import { Cpu, Microchip, Sparkles, RefreshCw, FlaskConical, Layers } from 'lucide-react';
import { Button } from '../ui/Button';

export function ScienceSection() {
  const images = [
    {
      url: "/src/assets/images/sector_ss316_processing_line_1790839222801.jpg",
      caption: "Enclosed SS-316 Processing Line"
    },
    {
      url: "/src/assets/images/sector_moisture_testing_1790839241510.jpg",
      caption: "Analytical Assay & Moisture Testing"
    },
    {
      url: "/src/assets/images/sector_thermal_drying_tunnel_1790839261259.jpg",
      caption: "Thermal Dehydration Chambers"
    },
    {
      url: "/src/assets/images/sector_quality_qa_lab_1790839275701.jpg",
      caption: "Quality Assurance Laboratory"
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#F7F3EA] text-[#17202A] border-b border-[#102A43]/10 overflow-hidden">
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
              key={idx}
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
          {/* Block 1 */}
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

          {/* Block 2 */}
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

          {/* Block 3 */}
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
      </div>
    </section>
  );
}
