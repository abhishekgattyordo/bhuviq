import React, { useState } from 'react';
import { Mail, ArrowRight, CheckCircle2, Globe, ShieldCheck, Sparkles, MapPin, Phone } from 'lucide-react';
import { FOOTER_LINKS } from '../../data/navigation';
import { COMPANY_INFO } from '../../data/company';
import { Link, useRouter } from '../../context/RouterContext';
import { Button } from '../ui/Button';
import { BrandLogo } from '../ui/BrandLogo';

export function Footer() {
  const { openSpecSheetModal, navigate } = useRouter();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      setNewsletterEmail('');
    }, 700);
  };

  return (
    <footer className="bg-[#0B1D2E] text-[#FAF7F0] border-t border-[#B89B5E]/30 relative overflow-hidden">
      {/* Subtle background ambient graphic */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#285943]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Brand Column (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block group focus:outline-none">
              <BrandLogo variant="footer" />
            </Link>

            <p className="text-sm text-[#FAF7F0]/70 max-w-sm leading-relaxed font-light">
              Transforming natural agricultural resources into high-purity, standardized ingredients for international food, nutrition, wellness, and personal care formulators.
            </p>

            {/* Origin marker */}
            <div className="pt-2 space-y-1.5 text-xs text-[#FAF7F0]/60">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#B89B5E] shrink-0" />
                <span>Agri-Industrial Corridor, Karnataka & Maharashtra, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#B89B5E] shrink-0" />
                <span>business@bhuviqnyra.example</span>
              </div>
            </div>

            {/* Quick Spec / Commercial CTA */}
            <div className="pt-2 flex flex-wrap gap-2">
              <button
                onClick={() => navigate('/partner-with-us')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#B89B5E] hover:text-white px-3 py-1.5 rounded-sm bg-[#B89B5E]/10 border border-[#B89B5E]/30 hover:bg-[#B89B5E]/20 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Commercial Inquiry</span>
              </button>
              <button
                onClick={openSpecSheetModal}
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#FAF7F0]/80 hover:text-white px-3 py-1.5 rounded-sm bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
              >
                <span>View Product TDS</span>
              </button>
            </div>
          </div>

          {/* Column 1: Company */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#B89B5E]">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm text-[#FAF7F0]/75">
              {FOOTER_LINKS.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block font-light"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Ingredients */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#B89B5E]">
              Ingredients
            </h4>
            <ul className="space-y-2.5 text-sm text-[#FAF7F0]/75">
              {FOOTER_LINKS.ingredients.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block font-light"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Connect & Newsletter */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#B89B5E]">
              Connect & Updates
            </h4>
            <ul className="space-y-2 text-sm text-[#FAF7F0]/75">
              {FOOTER_LINKS.connect.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block font-light"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Newsletter input */}
            <div className="pt-2">
              <p className="text-xs text-[#FAF7F0]/70 mb-2">
                Subscribe for ingredient R&D bulletins:
              </p>
              {isSubscribed ? (
                <div className="p-2.5 bg-[#285943]/50 border border-[#285943] text-xs text-[#FAF7F0] rounded-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B89B5E] shrink-0" />
                  <span>Subscribed to technical bulletins.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex items-stretch gap-1.5">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="corporate@domain.com"
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-sm text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#B89B5E]"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-3 py-2 bg-[#B89B5E] text-[#102A43] hover:bg-[#A88B4E] rounded-sm text-xs font-semibold transition-colors shrink-0"
                    aria-label="Subscribe"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Copyright and Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF7F0]/60 font-light">
          <div>
            © {COMPANY_INFO.establishedYear} Bhuvi Q Nyra International Private Limited. All rights reserved.
          </div>
          <nav aria-label="Trust and legal links" className="flex flex-wrap items-center justify-center gap-6">
            {FOOTER_LINKS.legal.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
