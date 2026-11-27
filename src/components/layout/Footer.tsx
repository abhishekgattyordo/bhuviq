import React, { useState } from 'react';
import { Mail, ArrowRight, CheckCircle2, Sparkles, MapPin, Phone, MessageCircle, AlertCircle } from 'lucide-react';
import { FOOTER_LINKS } from '../../data/navigation';
import { COMPANY_INFO } from '../../data/company';
import { Link, useRouter } from '../../context/RouterContext';
import { BrandLogo } from '../ui/BrandLogo';

export function Footer() {
  const { openSpecSheetModal, navigateToEnquiry } = useRouter();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribeError, setSubscribeError] = useState('');

  const whatsappDigits = COMPANY_INFO.location.whatsapp
    ? COMPANY_INFO.location.whatsapp.replace(/[^\d]/g, '')
    : '';

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribeError('');
    const email = newsletterEmail.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setSubscribeError('Please enter a valid business email.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Technical Bulletin Subscriber',
          company: 'Bulletin Subscription',
          country: 'International',
          email,
          product: 'Technical R&D Bulletins',
          application: 'Documentation & Updates',
          quantity: 'Not Applicable',
          message: '[Technical Bulletin Subscription] Requesting technical updates and product documentation bulletins.'
        })
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        setSubscribeError(data.message || 'Unable to register subscription right now.');
        setIsSubmitting(false);
        return;
      }
      setIsSubmitting(false);
      setIsSubscribed(true);
      setNewsletterEmail('');
    } catch {
      setIsSubmitting(false);
      setSubscribeError('Network error while subscribing. Please try again.');
    }
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
              Transforming natural agricultural resources into high-purity, standardized ingredients for international food, nutrition, wellness, cosmetic, and pharmaceutical formulators.
            </p>

            {/* Verified Origin & Conditional Official Channels */}
            <div className="pt-2 space-y-1.5 text-xs text-[#FAF7F0]/70">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#B89B5E] shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.legalName} · {COMPANY_INFO.location.country}</span>
              </div>
              {COMPANY_INFO.location.email ? (
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#B89B5E] shrink-0" />
                  <a href={`mailto:${COMPANY_INFO.location.email}`} className="hover:text-white transition-colors">
                    {COMPANY_INFO.location.email}
                  </a>
                </div>
              ) : null}
              {COMPANY_INFO.location.phone ? (
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#B89B5E] shrink-0" />
                  <a href={`tel:${COMPANY_INFO.location.phone}`} className="hover:text-white transition-colors">
                    {COMPANY_INFO.location.phone}
                  </a>
                </div>
              ) : null}
              {whatsappDigits ? (
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-3.5 h-3.5 text-[#B89B5E] shrink-0" />
                  <a
                    href={`https://wa.me/${whatsappDigits}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    WhatsApp Business Desk
                  </a>
                </div>
              ) : null}
            </div>

            {/* Quick Spec / Sample / Commercial CTA */}
            <div className="pt-2 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() =>
                  navigateToEnquiry({
                    enquiryType: 'Request a Sample',
                    productInterest: 'Banana Powder (100% Pure)',
                    requiredQuantity: 'Sample Pack (1 kg – 5 kg)'
                  })
                }
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#B89B5E] hover:text-white px-3 py-2 rounded-sm bg-[#B89B5E]/10 border border-[#B89B5E]/30 hover:bg-[#B89B5E]/20 transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Request a Sample</span>
              </button>
              <button
                type="button"
                onClick={openSpecSheetModal}
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#FAF7F0]/85 hover:text-white px-3 py-2 rounded-sm bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
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
              Connect &amp; Updates
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

            {/* Technical Bulletin subscription */}
            <div className="pt-2 space-y-2">
              <p className="text-xs text-[#FAF7F0]/70">
                Subscribe for ingredient R&amp;D bulletins:
              </p>
              {isSubscribed ? (
                <div className="p-2.5 bg-[#285943]/50 border border-[#285943] text-xs text-[#FAF7F0] rounded-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B89B5E] shrink-0" />
                  <span>Subscribed to technical bulletins.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} noValidate className="space-y-1.5">
                  <div className="flex items-stretch gap-1.5">
                    <input
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => {
                        setNewsletterEmail(e.target.value);
                        if (subscribeError) setSubscribeError('');
                      }}
                      placeholder="name@company.com"
                      aria-label="Business email for technical bulletins"
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-sm text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#B89B5E]"
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-3 py-2 bg-[#B89B5E] text-[#102A43] hover:bg-[#A88B4E] rounded-sm text-xs font-semibold transition-colors shrink-0 disabled:opacity-60 cursor-pointer"
                      aria-label="Subscribe"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {subscribeError && (
                    <p className="text-[11px] text-red-300 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{subscribeError}</span>
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Copyright and Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF7F0]/60 font-light">
          <div className="text-center sm:text-left">
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
