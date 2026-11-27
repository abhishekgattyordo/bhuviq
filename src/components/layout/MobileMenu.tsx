import React from 'react';
import { X, ArrowRight, Sparkles, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { NAV_ITEMS } from '../../data/navigation';
import { COMPANY_INFO } from '../../data/company';
import { useRouter, Link } from '../../context/RouterContext';
import { Button } from '../ui/Button';
import { BrandLogo } from '../ui/BrandLogo';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { currentPath, navigate, navigateToEnquiry } = useRouter();

  if (!isOpen) return null;

  const handleNav = (href: string) => {
    onClose();
    navigate(href);
  };

  const handleRequestSample = () => {
    onClose();
    navigateToEnquiry({
      enquiryType: 'Request a Sample',
      productInterest: 'Banana Powder (100% Pure)',
      requiredQuantity: 'Sample Pack (1 kg – 5 kg)'
    });
  };

  const whatsappDigits = COMPANY_INFO.location.whatsapp
    ? COMPANY_INFO.location.whatsapp.replace(/[^\d]/g, '')
    : '';

  return (
    <div className="fixed inset-0 z-50 xl:hidden flex flex-col bg-[#102A43] text-[#FAF7F0] animate-in fade-in duration-300">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-[#B89B5E]/30 bg-[#0B1D2E]">
        <Link href="/" onClick={onClose} className="focus:outline-none min-w-0">
          <BrandLogo variant="header-transparent" />
        </Link>
        <button
          onClick={onClose}
          className="p-2.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
          aria-label="Close menu"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation Links Scrollable Area */}
      <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-6 space-y-6">
        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-widest text-[#B89B5E] font-bold mb-3 px-2">
            Navigation Index
          </p>
          {NAV_ITEMS.map((item) => {
            const isActive = currentPath === item.href || (item.href !== '/' && currentPath.startsWith(item.href));
            return (
              <button
                key={item.href}
                onClick={() => handleNav(item.href)}
                className={`w-full text-left py-3 px-3.5 rounded-sm flex items-center justify-between transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#B89B5E]/20 text-[#FAF7F0] font-semibold border-l-2 border-[#B89B5E]"
                    : "text-[#FAF7F0]/80 hover:bg-white/5 hover:text-white"
                }`}
              >
                <div>
                  <span className="font-serif text-lg tracking-wide block">{item.name}</span>
                  {item.description && (
                    <span className="text-xs text-[#FAF7F0]/60 block">{item.description}</span>
                  )}
                </div>
                <ArrowRight className="w-4 h-4 opacity-50 shrink-0" />
              </button>
            );
          })}
        </div>

        {/* Quick B2B Action Box */}
        <div className="p-4 rounded-sm bg-[#285943]/40 border border-[#285943] space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#B89B5E] uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Industrial B2B Supply</span>
          </div>
          <p className="text-xs text-[#FAF7F0]/80 leading-relaxed">
            Standardized 100% Pure Banana Powder for global food, nutrition, cosmetic, and pharmaceutical formulators.
          </p>
          <div className="pt-1 flex flex-col gap-2">
            <Button
              variant="gold"
              size="sm"
              className="w-full justify-center min-h-[42px]"
              onClick={handleRequestSample}
            >
              Request a Sample
            </Button>
            <Button
              variant="outline-light"
              size="sm"
              className="w-full justify-center min-h-[42px]"
              onClick={() => handleNav('/contact')}
            >
              Contact Desk
            </Button>
          </div>
        </div>

        {/* Verified Company Coordinates */}
        <div className="space-y-2 text-xs text-[#FAF7F0]/75 pt-3 border-t border-white/10">
          <div className="flex items-start gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#B89B5E] shrink-0 mt-0.5" />
            <span>{COMPANY_INFO.legalName} · {COMPANY_INFO.location.country}</span>
          </div>
          {COMPANY_INFO.location.email && (
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#B89B5E] shrink-0" />
              <a href={`mailto:${COMPANY_INFO.location.email}`} className="hover:text-white">
                {COMPANY_INFO.location.email}
              </a>
            </div>
          )}
          {COMPANY_INFO.location.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#B89B5E] shrink-0" />
              <a href={`tel:${COMPANY_INFO.location.phone}`} className="hover:text-white">
                {COMPANY_INFO.location.phone}
              </a>
            </div>
          )}
          {whatsappDigits && (
            <div className="flex items-center gap-2">
              <MessageCircle className="w-3.5 h-3.5 text-[#B89B5E] shrink-0" />
              <a
                href={`https://wa.me/${whatsappDigits}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                WhatsApp Business Desk
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Bottom CTA Bar */}
      <div className="p-4 bg-[#0B1D2E] border-t border-[#B89B5E]/20">
        <Button
          variant="gold"
          size="md"
          className="w-full min-h-[46px]"
          onClick={() => handleNav('/partner-with-us')}
          showArrow
        >
          Partner With Us
        </Button>
      </div>
    </div>
  );
}
