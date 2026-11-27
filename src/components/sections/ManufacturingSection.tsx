import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { MANUFACTURING_CAPABILITIES, NINE_STEP_FLOW } from '../../data/manufacturing';
import { ShieldCheck, Gauge, Layers, Package, QrCode, Truck, CheckCircle2, ArrowRight } from 'lucide-react';

export function ManufacturingSection() {
  const iconMap: Record<string, React.ReactNode> = {
    ShieldCheck: <ShieldCheck className="w-5 h-5" />,
    Gauge: <Gauge className="w-5 h-5" />,
    Layers: <Layers className="w-5 h-5" />,
    Package: <Package className="w-5 h-5" />,
    QrCode: <QrCode className="w-5 h-5" />,
    Truck: <Truck className="w-5 h-5" />
  };

  return (
    <section className="py-24 sm:py-32 bg-[#FAF8F2] text-[#17202A] border-b border-[#102A43]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Industrial Infrastructure"
            title="Built for Consistency"
            subtitle="Our Capabilities — Hygienic processing architectures designed to satisfy stringent international B2B technical audits."
          />
          <Button href="/manufacturing" variant="outline" size="sm" showArrow>
            View Facility Layout
          </Button>
        </div>

        {/* 6 Capabilities Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MANUFACTURING_CAPABILITIES.map((cap) => (
            <div
              key={cap.title}
              className="p-7 bg-white border border-[#102A43]/10 rounded-sm space-y-3.5 hover:border-[#102A43] transition-all shadow-xs hover:shadow-md group"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-full bg-[#102A43]/5 text-[#102A43] flex items-center justify-center group-hover:bg-[#102A43] group-hover:text-white transition-colors">
                  {iconMap[cap.icon]}
                </div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#B89B5E] font-semibold">
                  {cap.subtitle}
                </span>
              </div>

              <h4 className="font-serif text-xl text-[#102A43] font-semibold">
                {cap.title}
              </h4>

              <p className="text-xs text-[#667085] leading-relaxed font-light">
                {cap.description}
              </p>
            </div>
          ))}
        </div>

        {/* Closing Statement Callout */}
        <div className="p-8 sm:p-12 bg-[#102A43] text-white rounded-sm border border-[#B89B5E]/30 text-center space-y-4 shadow-xl">
          <p className="text-xs uppercase tracking-[0.28em] text-[#B89B5E] font-semibold">
            The BhuviQ Nyra Production Creed
          </p>
          <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#FAF7F0] font-normal tracking-wide">
            Made With Purpose. Controlled With Precision.
          </h3>
          <p className="max-w-2xl mx-auto text-sm text-[#FAF7F0]/80 font-light leading-relaxed">
            Every metric tonne of natural ingredient leaving our facility represents controlled drying curves, zero-contact processing, and unwavering batch-to-batch repeatability.
          </p>
        </div>
      </div>
    </section>
  );
}
