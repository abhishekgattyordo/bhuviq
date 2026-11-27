import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { NAV_ITEMS } from '../../data/navigation';
import { useRouter, Link } from '../../context/RouterContext';
import { Button } from '../ui/Button';
import { MobileMenu } from './MobileMenu';
import { cn } from '../../lib/utils';

export function Header() {
  const { currentPath } = useRouter();
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
  const showAfterScrollLogo = isScrolled || !isHomePage;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          isScrolled
            ? "bg-[#FAF8F2]/95 backdrop-blur-md shadow-xs border-b border-[#102A43]/10 py-2 text-[#102A43]"
            : isHomePage
            ? "bg-transparent text-white py-2.5 sm:py-3"
            : "bg-[#FAF8F2] border-b border-[#102A43]/10 py-2 text-[#102A43]"
        )}
      >
        <div className="w-full max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2 lg:gap-4">
          {/* Brand Logo (Scroll-Based Switching with Crisp Typography) */}
          <Link
            href="/"
            className="flex items-center gap-1.5 sm:gap-2 xl:gap-2.5 shrink-0 group focus:outline-none select-none"
            aria-label="BhuviQ Nyra International Homepage"
          >
            {/* Transparent Emblem from 43924.png (before scroll) / 43927.png (after scroll) */}
            <div className="relative h-11 sm:h-12 xl:h-14 w-[32px] sm:w-[35px] xl:w-[41px] overflow-hidden shrink-0">
              <img
                src="/images/logo/43924.png"
                alt=""
                aria-hidden="true"
                className={cn(
                  "absolute top-0 left-0 h-full w-auto max-w-none transition-opacity duration-300 ease-in-out",
                  showAfterScrollLogo ? "opacity-0 pointer-events-none" : "opacity-100"
                )}
              />
              <img
                src="/images/logo/43927.png"
                alt=""
                aria-hidden="true"
                className={cn(
                  "absolute top-0 left-0 h-full w-auto max-w-none transition-opacity duration-300 ease-in-out",
                  showAfterScrollLogo ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
              />
            </div>

            {/* Crisp Readable Logo Wordmark & Taglines */}
            <div className="flex flex-col items-center justify-center leading-none shrink-0">
              <div
                className={cn(
                  "font-serif text-[19px] sm:text-[21px] xl:text-[24px] font-medium tracking-tight leading-none transition-colors duration-300 whitespace-nowrap",
                  showAfterScrollLogo ? "text-[#001536]" : "text-white"
                )}
              >
                <span>bhuvi</span>
                <span className={cn("font-semibold transition-colors duration-300", showAfterScrollLogo ? "text-[#6F8834]" : "text-[#8BA844]")}>
                  Q
                </span>
                <span> Nyra</span>
              </div>

              <div className="flex items-center gap-1 mt-1 w-full justify-center">
                <span className={cn("h-[1px] w-1.5 sm:w-2 shrink-0 transition-colors duration-300", showAfterScrollLogo ? "bg-[#6F8834]" : "bg-[#8BA844]")} />
                <span
                  className={cn(
                    "text-[6.5px] sm:text-[7.5px] xl:text-[8px] font-semibold uppercase tracking-[0.12em] sm:tracking-[0.13em] whitespace-nowrap transition-colors duration-300",
                    showAfterScrollLogo ? "text-[#001536]" : "text-white/95"
                  )}
                >
                  INTERNATIONAL PRIVATE LIMITED
                </span>
                <span className={cn("h-[1px] w-1.5 sm:w-2 shrink-0 transition-colors duration-300", showAfterScrollLogo ? "bg-[#6F8834]" : "bg-[#8BA844]")} />
              </div>

              <div className="flex items-center gap-1 mt-0.5 w-full justify-center">
                <span className={cn("h-[1px] w-1.5 sm:w-2 shrink-0 transition-colors duration-300", showAfterScrollLogo ? "bg-[#6F8834]" : "bg-[#8BA844]")} />
                <span
                  className={cn(
                    "text-[7px] sm:text-[8px] xl:text-[8.5px] font-medium tracking-tight whitespace-nowrap transition-colors duration-300",
                    showAfterScrollLogo ? "text-[#001536]" : "text-white/95"
                  )}
                >
                  <span className={showAfterScrollLogo ? "text-[#6F8834]" : "text-[#8BA844]"}>Architecting</span>{" "}
                  Progress,{" "}
                  <span className={showAfterScrollLogo ? "text-[#6F8834]" : "text-[#8BA844]"}>Sustaining</span>{" "}
                  Greatness
                </span>
                <span className={cn("h-[1px] w-1.5 sm:w-2 shrink-0 transition-colors duration-300", showAfterScrollLogo ? "bg-[#6F8834]" : "bg-[#8BA844]")} />
              </div>
            </div>
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
