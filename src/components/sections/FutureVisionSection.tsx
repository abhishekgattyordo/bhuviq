import React from 'react';
import { motion } from 'motion/react';
import { SectionHeading } from '../ui/SectionHeading';
import { COMPANY_INFO } from '../../data/company';
import { FUTURE_CATEGORIES } from '../../data/products';
import { Sparkles, ArrowRight, Compass, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { cn } from '../../lib/utils';

export function FutureVisionSection() {
  return (
    <section className="py-24 sm:py-32 bg-[#F7F3EA] text-[#17202A] border-b border-[#102A43]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Beyond Banana Powder"
            title="Building the Future of Natural Ingredients"
            subtitle="Our disciplined roadmap: scaling from standardized banana powder into a multi-category botanical platform."
          />
          <Button href="/ingredients" variant="primary" size="sm" showArrow>
            Explore Platform Vision
          </Button>
        </div>

        {/* 3-Phase Horizon Timeline (TODAY / TOMORROW / FUTURE) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {COMPANY_INFO.futureVisionTimeline.map((item, idx) => {
            const isToday = idx === 0;
            const isTomorrow = idx === 1;

            return (
              <motion.div
                key={item.phase}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.12, duration: 0.5, ease: 'easeOut' }}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                className={cn(
                  "p-8 rounded-sm border transition-all duration-300 relative space-y-4 shadow-xs",
                  isToday
                    ? "bg-[#102A43] text-white border-[#B89B5E] shadow-md"
                    : isTomorrow
                    ? "bg-[#FAF8F2] text-[#102A43] border-[#285943]/30"
                    : "bg-white text-[#102A43] border-[#102A43]/10"
                )}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "font-mono text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm",
                      isToday
                        ? "bg-[#B89B5E] text-[#102A43]"
                        : "bg-[#102A43]/10 text-[#102A43]"
                    )}
                  >
                    {item.phase}
                  </span>

                  <span
                    className={cn(
                      "text-[10px] uppercase font-mono tracking-wider",
                      isToday ? "text-[#B89B5E]" : "text-[#285943]"
                    )}
                  >
                    {item.badge}
                  </span>
                </div>

                <div>
                  <h4
                    className={cn(
                      "font-serif text-2xl sm:text-3xl font-semibold",
                      isToday ? "text-[#FAF7F0]" : "text-[#102A43]"
                    )}
                  >
                    {item.title}
                  </h4>
                  <p
                    className={cn(
                      "text-xs uppercase tracking-wider font-semibold mt-1",
                      isToday ? "text-[#B89B5E]" : "text-[#285943]"
                    )}
                  >
                    {item.status}
                  </p>
                </div>

                <p
                  className={cn(
                    "text-xs leading-relaxed font-light",
                    isToday ? "text-[#FAF7F0]/80" : "text-[#667085]"
                  )}
                >
                  {item.description}
                </p>

                <div
                  className={cn(
                    "pt-3 border-t text-[11px] font-medium flex items-center justify-between",
                    isToday ? "border-white/15 text-[#FAF7F0]/80" : "border-[#102A43]/10 text-[#285943]"
                  )}
                >
                  <span>{isToday ? "Active Commercial Supply" : "Collaborative R&D Horizon"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Future Pipeline Categories Grid */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#285943] font-semibold">
            <Sparkles className="w-4 h-4 text-[#B89B5E]" />
            <span>Target Botanical Horizons Under Exploration</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FUTURE_CATEGORIES.map((cat, idx) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + idx * 0.08, duration: 0.4 }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="p-5 bg-white border border-[#102A43]/10 rounded-sm space-y-3 hover:border-[#285943] shadow-xs hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase bg-[#285943]/10 text-[#285943] px-2 py-0.5 rounded font-semibold">
                    {cat.timeline}
                  </span>
                  <span className="text-[10px] text-[#667085]">{cat.status}</span>
                </div>

                <h5 className="font-serif text-lg font-semibold text-[#102A43]">
                  {cat.title}
                </h5>

                <p className="text-xs text-[#667085] leading-relaxed">
                  {cat.description}
                </p>

                <div className="pt-2 border-t border-[#102A43]/5 flex flex-wrap gap-1">
                  {cat.highlights.slice(0, 2).map((h) => (
                    <span key={h} className="text-[10px] bg-[#FAF8F2] text-[#17202A] px-2 py-0.5 rounded border border-[#102A43]/5">
                      {h}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
