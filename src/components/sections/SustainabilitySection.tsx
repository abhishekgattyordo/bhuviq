import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { Leaf, Recycle, Factory, Compass, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export function SustainabilitySection() {
  const principles = [
    {
      title: "Responsible Sourcing",
      description: "Direct collaboration with verified regional farmer clusters, fostering ethical farm-gate economics and predictable crop intake.",
      icon: <Leaf className="w-5 h-5" />
    },
    {
      title: "Resource Efficiency",
      description: "Total agricultural utilization philosophy, redirecting botanical biomass toward organic composting and zero-landfill valorization.",
      icon: <Recycle className="w-5 h-5" />
    },
    {
      title: "Responsible Manufacturing",
      description: "Optimized thermal recirculation loops and closed-loop process water systems to minimize operational energy footprint.",
      icon: <Factory className="w-5 h-5" />
    },
    {
      title: "Future-Focused Sustainability",
      description: "Developing scalable natural ingredient architectures that replace synthetic additives with renewable, biodegradable alternatives.",
      icon: <Compass className="w-5 h-5" />
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#1C3F30] text-[#FAF7F0] border-b border-[#B89B5E]/30 relative overflow-hidden">
      {/* Background ambient texture */}
      <div className="absolute inset-0 z-0 opacity-15 mix-blend-overlay">
        <img
          src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=2000&q=80"
          alt="Lush agricultural foliage"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-6 space-y-4">
            <SectionHeading
              theme="dark"
              eyebrow="Nature & Responsibility"
              title="Rooted in Nature"
              subtitle="Ethical stewardship, agricultural respect, and circular resource management."
            />
          </div>
          <div className="lg:col-span-6 space-y-4 pt-2">
            <p className="font-serif text-2xl sm:text-3xl text-[#FAF7F0] leading-snug font-normal">
              “We believe value creation should begin with respect for the resources that make it possible.”
            </p>
            <p className="text-sm text-[#FAF7F0]/80 leading-relaxed font-light">
              Our commitment to sustainability is operational, not promotional. By processing at the heart of agricultural basins, we eliminate excessive transport emissions, stabilize grower livelihoods, and establish clean, traceable chains of custody from the soil to finished B2B ingredient delivery.
            </p>
            <div className="pt-2">
              <Button href="/sustainability" variant="gold" size="sm" showArrow>
                Read Sustainability Charter
              </Button>
            </div>
          </div>
        </div>

        {/* 4 Principles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {principles.map((p, idx) => (
            <div
              key={p.title}
              className="p-6 bg-[#285943]/40 border border-[#B89B5E]/30 rounded-sm space-y-3.5 backdrop-blur-xs hover:border-[#B89B5E] transition-all duration-300 group"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-full bg-[#B89B5E]/20 text-[#B89B5E] flex items-center justify-center group-hover:bg-[#B89B5E] group-hover:text-[#102A43] transition-colors">
                  {p.icon}
                </div>
                <span className="font-mono text-xs text-[#B89B5E]/80 font-semibold">
                  0{idx + 1}
                </span>
              </div>

              <h4 className="font-serif text-xl text-[#FAF7F0] font-semibold">
                {p.title}
              </h4>

              <p className="text-xs text-[#FAF7F0]/75 leading-relaxed font-light">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
