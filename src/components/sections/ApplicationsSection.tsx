import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, UtensilsCrossed, Activity, Sparkles, HeartHandshake, Sliders } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { APPLICATIONS } from '../../data/applications';
import { Link, useRouter } from '../../context/RouterContext';

export function ApplicationsSection() {
  const { navigate } = useRouter();

  const iconMap = {
    "food-beverage": <UtensilsCrossed className="w-5 h-5" />,
    "nutrition": <Activity className="w-5 h-5" />,
    "wellness": <Sparkles className="w-5 h-5" />,
    "beauty-personal-care": <HeartHandshake className="w-5 h-5" />,
    "custom-applications": <Sliders className="w-5 h-5" />
  };

  return (
    <section className="py-24 sm:py-32 bg-[#FAF8F2] text-[#17202A] border-b border-[#102A43]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Market Applications"
            title="Designed for Possibility"
            subtitle="Engineered to integrate seamlessly into diverse matrices, from clean-label bakery to advanced nutritional formulations."
          />
          <Button
            href="/applications"
            variant="outline"
            size="sm"
            showArrow
          >
            View All Applications
          </Button>
        </div>

        {/* Large Editorial Application Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {APPLICATIONS.map((app, idx) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5, ease: 'easeOut' }}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              onClick={() => navigate(`/applications#${app.id}`)}
              className="group relative rounded-sm overflow-hidden border border-[#102A43]/15 bg-white shadow-xs hover:shadow-xl transition-all duration-500 cursor-pointer flex flex-col justify-between"
            >
              {/* Image Aspect Box */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#102A43]">
                <img
                  src={app.image}
                  alt={app.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#102A43]/90 via-[#102A43]/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Top Badge */}
                <div className="absolute top-3.5 left-3.5 flex items-center gap-2 bg-[#FAF7F0]/90 backdrop-blur-sm text-[#102A43] px-2.5 py-1 rounded-sm text-[11px] font-semibold tracking-wider uppercase">
                  {iconMap[app.id as keyof typeof iconMap]}
                  <span>{app.title}</span>
                </div>

                <div className="absolute bottom-3 left-3.5 right-3.5 text-white">
                  <p className="text-xs uppercase tracking-widest text-[#B89B5E] font-medium">
                    {app.subtitle}
                  </p>
                </div>
              </div>

              {/* Text Description & Explore arrow */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-sm text-[#667085] leading-relaxed font-light">
                  {app.description}
                </p>

                <div className="pt-2 border-t border-[#102A43]/10 flex items-center justify-between text-xs font-semibold text-[#102A43] group-hover:text-[#285943]">
                  <span>Explore Application Matrix</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5 text-[#B89B5E]" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
