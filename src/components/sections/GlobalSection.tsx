import React from 'react';
import { motion } from 'motion/react';
import { SectionHeading } from '../ui/SectionHeading';
import { WorldMap } from '../ui/WorldMap';
import { Button } from '../ui/Button';
import { Globe, Plane, ShieldCheck, Ship } from 'lucide-react';

export function GlobalSection() {
  return (
    <section className="py-24 sm:py-32 bg-[#FAF8F2] text-[#17202A] border-b border-[#102A43]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Global Perspective"
            title="From India. For a World of Possibilities."
            subtitle="We are building our capabilities with a long-term vision to serve customers across global markets."
          />
          <div className="flex items-center gap-3">
            <Button href="/partner-with-us" variant="primary" size="sm" showArrow>
              Global Supply Enquiry
            </Button>
          </div>
        </div>

        {/* Vector Interactive Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <WorldMap />
        </motion.div>

        {/* 3 Supply Logistics Integrity Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="p-6 bg-white border border-[#102A43]/10 rounded-sm space-y-2 shadow-xs hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#285943] font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#B89B5E]" />
              <span>Packaging Preservation</span>
            </div>
            <h4 className="font-serif text-lg font-semibold text-[#102A43]">
              Maritime & Climate Barrier Protection
            </h4>
            <p className="text-xs text-[#667085] leading-relaxed">
              Industrial food packaging with multi-layer high-barrier liners prevents moisture uptake during trans-oceanic shipping and regional climate fluctuations.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="p-6 bg-white border border-[#102A43]/10 rounded-sm space-y-2 shadow-xs hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#285943] font-semibold">
              <Ship className="w-4 h-4 text-[#B89B5E]" />
              <span>Origin Hub Connectivity</span>
            </div>
            <h4 className="font-serif text-lg font-semibold text-[#102A43]">
              Direct Corridors to Major Seaports
            </h4>
            <p className="text-xs text-[#667085] leading-relaxed">
              Proximity to major international ports (JNPT Mumbai & Goa / Mangalore Corridors) enables streamlined customs clearance and container dispatch.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="p-6 bg-white border border-[#102A43]/10 rounded-sm space-y-2 shadow-xs hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#285943] font-semibold">
              <Plane className="w-4 h-4 text-[#B89B5E]" />
              <span>Air Freight & Express Logistics</span>
            </div>
            <h4 className="font-serif text-lg font-semibold text-[#102A43]">
              Fast-Track Global Dispatch
            </h4>
            <p className="text-xs text-[#667085] leading-relaxed">
              Accelerated air and ocean freight logistics to international destinations with end-to-end temperature monitoring and complete digital COA & TDS documentation.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
