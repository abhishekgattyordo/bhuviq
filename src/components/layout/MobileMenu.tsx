import React from 'react';
import { X, ArrowRight, Sparkles, Mail, Phone, Globe, FileText } from 'lucide-react';
import { NAV_ITEMS } from '../../data/navigation';
import { useRouter, Link } from '../../context/RouterContext';
import { Button } from '../ui/Button';
import { BrandLogo } from '../ui/BrandLogo';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { currentPath, navigate } = useRouter();

  if (!isOpen) return null;

  const handleNav = (href: string) => {
    onClose();
    navigate(href);
  };

  return (
    <div className="fixed inset-0 z-50 xl:hidden flex flex-col bg-[#102A43] text-[#FAF7F0] animate-in fade-in duration-300">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-[#B89B5E]/30 bg-[#0B1D2E]">
        <Link href="/" onClick={onClose} className="focus:outline-none">
          <BrandLogo variant="header-transparent" />
        </Link>
        <button
          onClick={onClose}
          className="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close menu"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation Links Scrollable Area */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-widest text-[#B89B5E] font-bold mb-3 px-2">
            Navigation Index
          </p>
          {NAV_ITEMS.map((item) => {
            const isActive = currentPath === item.href;
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
                    <span className="text-xs text-[#FAF7F0]/50 block">{item.description}</span>
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
            Standardized 100% Pure Banana Powder for global food, nutrition, and cosmetic formulators.
          </p>
          <div className="pt-1">
            <Button
              variant="gold"
              size="sm"
              className="w-full justify-center"
              onClick={() => handleNav('/partner-with-us')}
            >
              Partner & Commercial Enquiry
            </Button>
          </div>
        </div>

        {/* Contact Coordinates */}
        <div className="space-y-2 text-xs text-[#FAF7F0]/60 pt-2 border-t border-white/10">
          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-[#B89B5E]" />
            <span>business@bhuviqnyra.example</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-[#B89B5E]" />
            <span>+91 80 4123 7890 (India)</span>
          </div>
        </div>
      </div>

      {/* Bottom CTA Bar */}
      <div className="p-4 bg-[#0B1D2E] border-t border-[#B89B5E]/20">
        <Button
          variant="gold"
          size="md"
          className="w-full"
          onClick={() => handleNav('/partner-with-us')}
          showArrow
        >
          Partner With Us
        </Button>
      </div>
    </div>
  );
}
