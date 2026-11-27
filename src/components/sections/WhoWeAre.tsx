import React from 'react';
import { motion } from 'motion/react';
import { FadeIn } from '../ui/MotionComponents';

export function WhoWeAre() {
  return (
    <section id="who-we-are" className="py-20 sm:py-28 bg-[#F7F3EA] text-[#17202A] border-b border-[#102A43]/10 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <FadeIn className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#102A43]/5 border border-[#102A43]/10 text-xs uppercase tracking-[0.2em] font-semibold text-[#285943]">
            Who We Are
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#102A43] font-normal tracking-tight">
            Where Nature Meets Science
          </h2>
        </FadeIn>

        {/* Narrative Paragraphs */}
        <FadeIn delay={0.15} className="space-y-6 max-w-3xl mx-auto text-center sm:text-left">
          <p className="font-serif text-xl sm:text-2xl text-[#102A43] leading-relaxed font-normal">
            We believe food is a fundamental need of every human being. Some of what we eat comes directly from nature, while much of it is cultivated through generations of traditional knowledge.
          </p>

          <p className="text-base sm:text-lg text-[#334E68] leading-relaxed font-light">
            Tradition and technology are often seen as opposites. We believe they can work together when thoughtfully planned and carefully executed.
          </p>

          <p className="text-base sm:text-lg text-[#334E68] leading-relaxed font-light">
            At BhuviQ Nyra, traditionally grown bananas meet modern processing technology. We transform them into high-quality banana powder, with a focus on retaining their natural goodness and nutritional value.
          </p>
        </FadeIn>

        {/* Two Visually Distinct Statements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto pt-4">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            whileHover={{ y: -4, transition: { duration: 0.25 } }}
            className="p-6 sm:p-8 bg-[#FAF8F2] border-l-4 border-l-[#B89B5E] border border-[#102A43]/10 rounded-sm shadow-xs hover:shadow-md transition-all duration-300"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-[#B89B5E] font-semibold block mb-2">
              Tradition
            </span>
            <p className="font-serif text-lg sm:text-xl text-[#102A43] font-medium leading-snug">
              Tradition brings authenticity and naturality.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            whileHover={{ y: -4, transition: { duration: 0.25 } }}
            className="p-6 sm:p-8 bg-[#FAF8F2] border-l-4 border-l-[#285943] border border-[#102A43]/10 rounded-sm shadow-xs hover:shadow-md transition-all duration-300"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-[#285943] font-semibold block mb-2">
              Science
            </span>
            <p className="font-serif text-lg sm:text-xl text-[#102A43] font-medium leading-snug">
              Science brings precision, efficiency, and consistency.
            </p>
          </motion.div>
        </div>

        {/* Final Paragraph - Visual Emphasis */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="max-w-4xl mx-auto p-8 sm:p-10 bg-[#102A43] text-white rounded-sm border border-[#B89B5E]/30 relative overflow-hidden shadow-lg text-center"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#B89B5E]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-3">
            <p className="font-serif text-lg sm:text-2xl md:text-2xl text-[#FAF7F0] font-normal leading-relaxed">
              Together, they help us create products that carry the goodness of nature to the world—with care and purpose.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
