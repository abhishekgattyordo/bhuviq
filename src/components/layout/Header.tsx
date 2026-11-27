import React, { useState, useEffect } from 'react';
import { Menu, ArrowRight } from 'lucide-react';
import { NAV_ITEMS } from '../../data/navigation';
import { useRouter, Link } from '../../context/RouterContext';
import { Button } from '../ui/Button';
import { BrandLogo } from '../ui/BrandLogo';
import { MobileMenu } from './MobileMenu';
import { cn } from '../../lib/utils';

export function Header() {
  const { currentPath, navigate } = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Is home page top hero
  const isHomePage = currentPath === '/';

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-200",
          isScrolled
            ? "bg-[#FAF8F2]/95 backdrop-blur-md shadow-xs border-b border-[#102A43]/10 py-3 text-[#102A43]"
            : isHomePage
            ? "bg-transparent text-white py-4 sm:py-5"
            : "bg-[#FAF8F2] border-b border-[#102A43]/10 py-3.5 text-[#102A43]"
        )}
      >
        <div className="w-full max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2 lg:gap-4">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center shrink-0 group focus:outline-none select-none"
            aria-label="BhuviQ Nyra International Homepage"
          >
            <BrandLogo
              variant={!isScrolled && isHomePage ? "header-before-scroll" : "header-after-scroll"}
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center justify-center gap-0.5 2xl:gap-1.5 shrink-0">
            {NAV_ITEMS.map((item) => {
              const isActive = currentPath === item.href || (item.href !== '/' && currentPath.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative h-8 2xl:h-9 px-1.5 2xl:px-2.5 text-[11px] 2xl:text-[12.5px] font-medium tracking-wide uppercase whitespace-nowrap inline-flex items-center justify-center rounded-sm transition-colors duration-150",
                    !isScrolled && isHomePage
                      ? isActive
                        ? "text-[#B89B5E] font-semibold"
                        : "text-[#FAF7F0]/90 hover:text-white hover:bg-white/10"
                      : isActive
                      ? "text-[#285943] font-semibold"
                      : "text-[#102A43] hover:text-[#285943] hover:bg-[#102A43]/5"
                  )}
                >
                  <span>{item.name}</span>
                  {isActive && (
                    <span
                      className={cn(
                        "absolute bottom-0 left-1.5 right-1.5 h-[2px] rounded-full",
                        !isScrolled && isHomePage ? "bg-[#B89B5E]" : "bg-[#285943]"
                      )}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden xl:flex items-center gap-2 2xl:gap-2.5 shrink-0">
            <Button
              href="/partner-with-us"
              variant={!isScrolled && isHomePage ? "gold" : "primary"}
              size="sm"
              showArrow
              className="h-8 2xl:h-9 px-3 2xl:px-4 text-[11px] 2xl:text-xs font-semibold tracking-wider uppercase whitespace-nowrap shrink-0"
            >
              Partner With Us
            </Button>
          </div>

          {/* Tablet & Mobile Controls (visible below xl) */}
          <div className="flex xl:hidden items-center gap-2 shrink-0">
            <Button
              href="/partner-with-us"
              variant={!isScrolled && isHomePage ? "gold" : "primary"}
              size="sm"
              className="hidden sm:inline-flex text-xs px-3 py-1.5 h-8 whitespace-nowrap"
            >
              Partner With Us
            </Button>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={cn(
                "p-2 rounded-md transition-colors focus:outline-none cursor-pointer shrink-0 flex items-center justify-center min-w-[40px] min-h-[40px]",
                !isScrolled && isHomePage
                  ? "text-white hover:bg-white/15 bg-white/10"
                  : "text-[#102A43] hover:bg-[#102A43]/10 bg-[#102A43]/5"
              )}
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile & Tablet Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
