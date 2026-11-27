export type LogoDisplayType = 'image_and_text' | 'image_only' | 'text_mark';

export interface PortalSettings {
  // 1. Header - Before Scroll (Transparent Hero Header / Dark Background)
  headerBeforeScrollLogoUrl: string;
  headerBeforeScrollLogoHeight: number;

  // 2. Header - After Scroll & Inner Pages (Sticky Light Navigation Header)
  headerAfterScrollLogoUrl: string;
  headerAfterScrollLogoHeight: number;

  // 3. Footer - Deep Navy Global Footer
  footerLogoUrl: string;
  footerLogoHeight: number;

  // 4. Processing Video & Media Configuration
  processingVideoUrl?: string;
  processingVideoTitle?: string;
  enableVideoTelemetry?: boolean;
  defaultVideoMode?: 'video' | 'photo';

  // Legacy fallback compatibility
  logoUrl: string;
  logoDarkUrl?: string;
  logoHeight: number; // in pixels, e.g., 28 to 72

  brandName: string;
  brandTagline: string;
  badgeText: string;
  logoType: LogoDisplayType;
  faviconUrl?: string;
  presetIcon?: string;
  accentColor?: string;
  updatedAt: string;
}

export interface UpdateSettingsInput {
  headerBeforeScrollLogoUrl?: string;
  headerBeforeScrollLogoHeight?: number;
  headerAfterScrollLogoUrl?: string;
  headerAfterScrollLogoHeight?: number;
  footerLogoUrl?: string;
  footerLogoHeight?: number;

  processingVideoUrl?: string;
  processingVideoTitle?: string;
  enableVideoTelemetry?: boolean;
  defaultVideoMode?: 'video' | 'photo';

  logoUrl?: string;
  logoDarkUrl?: string;
  brandName?: string;
  brandTagline?: string;
  badgeText?: string;
  logoType?: LogoDisplayType;
  logoHeight?: number;
  faviconUrl?: string;
  presetIcon?: string;
  accentColor?: string;
}

export const DEFAULT_PORTAL_SETTINGS: PortalSettings = {
  headerBeforeScrollLogoUrl: '',
  headerBeforeScrollLogoHeight: 38,

  headerAfterScrollLogoUrl: '',
  headerAfterScrollLogoHeight: 38,

  footerLogoUrl: '',
  footerLogoHeight: 44,

  processingVideoUrl: '',
  processingVideoTitle: 'SS-316 Sanitary Dehydration & Cleanroom Processing Line',
  enableVideoTelemetry: true,
  defaultVideoMode: 'video',

  logoUrl: '',
  logoDarkUrl: '',
  brandName: 'BHUVIQ NYRA',
  brandTagline: 'Nature. Science. Possibility.',
  badgeText: 'International',
  logoType: 'image_and_text',
  logoHeight: 38,
  faviconUrl: '',
  presetIcon: 'botanical-crest',
  accentColor: '#B89B5E',
  updatedAt: new Date().toISOString(),
};
