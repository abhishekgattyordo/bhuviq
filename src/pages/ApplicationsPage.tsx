import React from 'react';
import { motion } from 'motion/react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { SectionHeading } from '../components/ui/SectionHeading';
import { APPLICATIONS } from '../data/applications';
import { Button } from '../components/ui/Button';
import { UtensilsCrossed, Activity, Sparkles, HeartHandshake, Sliders, CheckCircle2, ArrowRight } from 'lucide-react';
import { useRouter } from '../context/RouterContext';

export function ApplicationsPage() {
  const { navigate } = useRouter();

  const iconMap = {
    "food-beverage": <UtensilsCrossed className="w-6 h-6" />,
    "nutrition": <Activity className="w-6 h-6" />,
    "wellness": <Sparkles className="w-6 h-6" />,
    "beauty-personal-care": <HeartHandshake className="w-6 h-6" />,
    "custom-applications": <Sliders className="w-6 h-6" />
  };

  return (
    <PageWrapper
      title="Applications | BhuviQ Nyra International"
      description="Designed for Possibility — Clean-label natural ingredient applications across Food & Beverage, Nutrition, Wellness, and Beauty."
    >
      {/* Hero */}
      <section className="relative bg-[#102A43] text-white pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img
            initial={{ scale: 1.08, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.2 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=2000&q=80"
            alt="Food and nutrition applications"
            className="w-full h-full object-cover mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#102A43] via-[#102A43]/85 to-[#102A43]/60" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#B89B5E] text-xs font-semibold uppercase tracking-widest border border-[#B89B5E]/30">
            <span>Formulation Versatility</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.1] text-[#FAF7F0]">
            Designed for <span className="italic font-light">Possibility</span>
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-xl text-[#FAF7F0]/85 font-light leading-relaxed">
            Our pure botanical ingredients are characterized to deliver authentic sensory profiles, clean nutritional functionality, and seamless formulation stability across a wide spectrum of matrices.
          </p>
        </motion.div>
      </section>

      {/* Applications Deep-Dive List */}
      <section className="py-20 bg-[#FAF8F2] text-[#17202A] border-b border-[#102A43]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {APPLICATIONS.map((app, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={app.id}
                id={app.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
                className="scroll-mt-32 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center p-8 sm:p-12 bg-white border border-[#102A43]/15 rounded-sm shadow-xs hover:shadow-lg transition-shadow duration-300"
              >
                {/* Image Aspect */}
                <div className={`lg:col-span-5 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="group relative rounded-sm overflow-hidden aspect-[4/3] bg-[#102A43] border border-[#102A43]/10 shadow-md">
                    <img
                      src={app.image}
                      alt={app.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-[#102A43]/90 backdrop-blur-xs text-white px-3 py-1 rounded-sm text-xs font-mono font-semibold flex items-center gap-2">
                      <span>SECTOR 0{idx + 1}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`lg:col-span-7 space-y-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="flex items-center gap-2.5 text-[#285943]">
                    {iconMap[app.id as keyof typeof iconMap]}
                    <span className="text-xs uppercase tracking-[0.2em] font-bold">
                      {app.subtitle}
                    </span>
                  </div>

                  <h2 className="font-serif text-3xl sm:text-4xl text-[#102A43] font-semibold">
                    {app.title}
                  </h2>

                  <p className="text-sm sm:text-base text-[#667085] leading-relaxed font-light">
                    {app.description}
                  </p>

                  {/* Key Benefits */}
                  <div className="space-y-2 pt-2">
                    <span className="text-xs uppercase tracking-wider text-[#102A43] font-semibold block">
                      Core Functional Advantages:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {app.keyBenefits.map((b) => (
                        <div key={b} className="flex items-start gap-2 text-xs text-[#17202A]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#285943] shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Subcategories tags */}
                  <div className="pt-2 flex flex-wrap gap-2">
                    {app.useCases.map((sub) => (
                      <span
                        key={sub}
                        className="text-xs px-3 py-1 bg-[#FAF8F2] border border-[#102A43]/10 rounded-full text-[#102A43] font-medium"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>

                  {/* Action */}
                  <div className="pt-4 flex items-center gap-3">
                    <Button
                      href="/partner-with-us"
                      variant="primary"
                      size="sm"
                      showArrow
                    >
                      Discuss Your Formulation
                    </Button>
                    <Button
                      href="/ingredients/banana-powder"
                      variant="outline"
                      size="sm"
                    >
                      View Specifications
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </PageWrapper>
  );
}
