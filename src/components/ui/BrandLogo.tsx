import React from 'react';
import { useSettings } from '../../context/SettingsContext';
import { Sparkles, Leaf, Sprout, FlaskConical, CircleDot, ShieldCheck } from 'lucide-react';
import { cn } from '../../lib/utils';
import { PortalSettings } from '../../types/settings';

export type BrandLogoVariant =
  | 'header-before-scroll'
  | 'header-transparent'
  | 'header-after-scroll'
  | 'header-solid'
  | 'footer'
  | 'admin'
  | 'preview';

interface BrandLogoProps {
  variant?: BrandLogoVariant;
  customSettings?: Partial<PortalSettings>;
  className?: string;
  forceShowText?: boolean;
}

export function BrandLogo({
  variant = 'header-solid',
  customSettings,
  className,
  forceShowText = false,
}: BrandLogoProps) {
  const { settings: globalSettings } = useSettings();
  const settings = { ...globalSettings, ...customSettings };

  const isBeforeScroll = variant === 'header-before-scroll' || variant === 'header-transparent';
  const isAfterScroll = variant === 'header-after-scroll' || variant === 'header-solid';
  const isFooter = variant === 'footer';
  const isAdmin = variant === 'admin';

  const isDarkBg = isBeforeScroll || isFooter;

  // Determine logo URL and height per variant
  let logoUrl = '';
  let logoHeight = settings.logoHeight || 38;

  if (isBeforeScroll) {
    logoUrl = settings.headerBeforeScrollLogoUrl || settings.logoDarkUrl || settings.logoUrl || '';
    logoHeight = settings.headerBeforeScrollLogoHeight || settings.logoHeight || 38;
  } else if (isAfterScroll) {
    logoUrl = settings.headerAfterScrollLogoUrl || settings.logoUrl || '';
    logoHeight = settings.headerAfterScrollLogoHeight || settings.logoHeight || 38;
  } else if (isFooter) {
    logoUrl = settings.footerLogoUrl || settings.headerBeforeScrollLogoUrl || settings.logoUrl || '';
    logoHeight = settings.footerLogoHeight || settings.logoHeight || 44;
  } else {
    logoUrl = settings.headerAfterScrollLogoUrl || settings.logoUrl || '';
    logoHeight = settings.logoHeight || 38;
  }

  const logoType = settings.logoType || 'image_and_text';

  // Preset Icon renderer
  const renderPresetIcon = () => {
    const iconClass = cn(
      "shrink-0 transition-colors",
      isDarkBg ? "text-[#B89B5E]" : "text-[#285943]"
    );
    const size = Math.max(18, Math.min(32, logoHeight * 0.7));

    switch (settings.presetIcon) {
      case 'leaf-gold':
        return <Leaf style={{ width: size, height: size }} className={iconClass} />;
      case 'seed-sprout':
        return <Sprout style={{ width: size, height: size }} className={iconClass} />;
      case 'flask-nature':
        return <FlaskConical style={{ width: size, height: size }} className={iconClass} />;
      case 'milling-grain':
        return <CircleDot style={{ width: size, height: size }} className={iconClass} />;
      case 'shield-quality':
        return <ShieldCheck style={{ width: size, height: size }} className={iconClass} />;
      case 'botanical-crest':
      default:
        return (
          <div
            style={{ width: size, height: size }}
            className={cn(
              "rounded-full flex items-center justify-center border transition-all shrink-0",
              isDarkBg
                ? "bg-[#B89B5E]/20 border-[#B89B5E]/50 text-[#B89B5E]"
                : "bg-[#285943]/10 border-[#285943]/30 text-[#285943]"
            )}
          >
            <Sparkles className="w-3/4 h-3/4" />
          </div>
        );
    }
  };

  // 1. Image Only Mode
  if (logoType === 'image_only' && logoUrl && !forceShowText) {
    return (
      <div className={cn("inline-flex items-center select-none", className)}>
        <img
          src={logoUrl}
          alt={settings.brandName || 'Brand Logo'}
          style={{ height: `${logoHeight}px`, maxHeight: '80px' }}
          className="w-auto object-contain transition-transform group-hover:scale-105"
        />
      </div>
    );
  }

  // 2. Image + Text or Text Mark Mode
  return (
    <div className={cn("inline-flex items-center gap-2.5 sm:gap-3 select-none", className)}>
      {/* Visual Logo Mark / Uploaded Logo */}
      {logoType !== 'text_mark' && (
        <div className="shrink-0 flex items-center justify-center">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={settings.brandName || 'Brand Logo'}
              style={{ height: `${logoHeight}px`, maxHeight: '64px' }}
              className="w-auto max-w-[140px] object-contain rounded-xs"
              onError={(e) => {
                // If custom image fails, hide it gracefully
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          ) : (
            renderPresetIcon()
          )}
        </div>
      )}

      {/* Typography Lockup */}
      <div className="flex flex-col shrink-0">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span
            className={cn(
              "font-serif font-bold tracking-[0.14em] uppercase transition-colors whitespace-nowrap",
              isFooter
                ? "text-xl sm:text-2xl 2xl:text-3xl text-[#FAF7F0] group-hover:text-[#B89B5E]"
                : isAdmin
                ? "text-base sm:text-lg text-[#102A43]"
                : isDarkBg
                ? "text-base sm:text-lg xl:text-[17px] 2xl:text-[20px] text-[#FAF7F0] group-hover:text-[#B89B5E]"
                : "text-base sm:text-lg xl:text-[17px] 2xl:text-[20px] text-[#102A43] group-hover:text-[#285943]"
            )}
          >
            {settings.brandName || 'BHUVIQ NYRA'}
          </span>

          {settings.badgeText && (
            <span
              className={cn(
                "text-[8px] 2xl:text-[9px] uppercase px-1.5 py-0.5 rounded-[2px] font-mono font-semibold tracking-wider whitespace-nowrap",
                isDarkBg
                  ? "bg-[#B89B5E]/20 text-[#FAF7F0] border border-[#B89B5E]/40"
                  : "bg-[#285943]/10 text-[#285943] border border-[#285943]/20"
              )}
            >
              {settings.badgeText}
            </span>
          )}
        </div>

        {settings.brandTagline && (
          <span
            className={cn(
              "text-[7.5px] sm:text-[8px] 2xl:text-[8.5px] uppercase tracking-[0.22em] font-medium transition-colors whitespace-nowrap mt-0.5",
              isFooter
                ? "text-[#B89B5E] text-[9.5px] tracking-[0.26em]"
                : isDarkBg
                ? "text-[#FAF7F0]/75"
                : "text-[#667085]"
            )}
          >
            {settings.brandTagline}
          </span>
        )}
      </div>
    </div>
  );
}
