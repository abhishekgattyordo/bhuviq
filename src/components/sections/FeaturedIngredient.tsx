import React from 'react';
import { motion } from 'motion/react';
import { Check, FileText, Download, ShieldCheck } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { CURRENT_PRODUCT } from '../../data/products';
import { useRouter } from '../../context/RouterContext';
import { downloadProductSpecificationPdf } from '../../lib/pdfDocuments';

export function FeaturedIngredient() {
  const { openSpecSheetModal, navigateToEnquiry } = useRouter();

  return (
    <section className="py-24 sm:py-32 bg-[#FAF8F2] text-[#17202A] border-b border-[#102A43]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <SectionHeading
          eyebrow="Featured Ingredient"
          title="Naturally Derived. Precisely Processed."
          subtitle="Engineered for high-volume commercial formulation with strict moisture and particle size thresholds."
        />

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Large Product Image & Specs Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-sm overflow-hidden border border-[#102A43]/15 shadow-xl bg-white group">
              <img
                src={CURRENT_PRODUCT.image}
                alt="BhuviQ Nyra Pure Banana Powder"
                referrerPolicy="no-referrer"
                className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#102A43]/80 via-transparent to-transparent opacity-80" />

              <div className="absolute top-4 left-4">
                <Badge variant="gold" dot>
                  Current Active Ingredient
                </Badge>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white flex justify-between items-end">
                <div>
                  <p className="text-[11px] uppercase tracking-widest text-[#B89B5E] font-semibold">Standardized Powder</p>
                  <p className="font-serif text-2xl font-bold">100% Pure Banana Origin</p>
                </div>
                <span className="font-mono text-xs bg-white/20 backdrop-blur-md px-2.5 py-1 rounded">
                  60 to 100 Mesh Micronized
                </span>
              </div>
            </div>

            {/* Quick Floating Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              whileHover={{ scale: 1.03 }}
              className="absolute -bottom-6 -right-4 sm:-right-6 bg-[#102A43] text-white p-4 sm:p-5 rounded-sm shadow-xl border border-[#B89B5E]/30 hidden sm:flex items-center gap-3.5"
            >
              <div className="w-10 h-10 rounded-full bg-[#B89B5E]/20 text-[#B89B5E] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <p className="text-[#B89B5E] font-semibold uppercase tracking-wider">Industrial B2B Supply</p>
                <p className="text-white/80 font-mono">25kg Multi-Barrier Packaging</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Details & Attributes */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-6 space-y-6"
          >
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#285943] font-semibold block mb-1">
                Pure Botanical Derivative
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#102A43] font-semibold">
                BANANA POWDER
              </h3>
              <p className="text-xs text-[#667085] italic mt-1 font-mono">
                {CURRENT_PRODUCT.botanicalName}
              </p>
            </div>

            <p className="text-base text-[#17202A] leading-relaxed font-light">
              A naturally derived ingredient developed through controlled processing with focus on consistency, quality and reliable B2B supply.
            </p>

            {/* 4 Attributes */}
            <div className="grid grid-cols-2 gap-3.5 pt-2">
              {[
                "Natural Origin",
                "Consistent Quality",
                "Controlled Processing",
                "B2B Supply"
              ].map((attr, idx) => (
                <motion.div
                  key={attr}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + idx * 0.08, duration: 0.4 }}
                  whileHover={{ y: -2, transition: { duration: 0.2 } }}
                  className="flex items-center gap-2.5 p-3 bg-white border border-[#102A43]/10 rounded-sm text-xs font-semibold text-[#102A43] shadow-xs"
                >
                  <span className="w-5 h-5 rounded-full bg-[#285943]/10 text-[#285943] flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <span>{attr}</span>
                </motion.div>
              ))}
            </div>

            {/* Applications Tags */}
            <div className="space-y-2 pt-2">
              <span className="text-xs uppercase tracking-wider text-[#667085] font-semibold block">
                Target Industrial Buyer Sectors:
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  "Food & Beverage",
                  "Bakery & Snacks",
                  "Nutrition",
                  "Cosmetics",
                  "Pharmaceutical"
                ].map((app) => (
                  <span
                    key={app}
                    className="text-xs px-3 py-1 bg-[#285943]/10 text-[#285943] border border-[#285943]/20 rounded-full font-medium transition-colors hover:bg-[#285943]/20"
                  >
                    {app}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <Button href="/ingredients/banana-powder" variant="primary" showArrow>
                View Product Details
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
                onClick={() =>
                  navigateToEnquiry({
                    enquiryType: 'Request a Quotation',
                    productInterest: 'Banana Powder (100% Pure)',
                    requiredQuantity: 'Bulk / Pilot Order'
                  })
                }
              >
                Product Enquiry
              </Button>
              <Button
                variant="ghost"
                onClick={downloadProductSpecificationPdf}
                icon={<Download className="w-4 h-4 text-[#285943]" />}
              >
                Download Spec PDF
              </Button>
              <Button
                variant="ghost"
                onClick={openSpecSheetModal}
                icon={<FileText className="w-4 h-4 text-[#285943]" />}
              >
                Preview TDS
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
