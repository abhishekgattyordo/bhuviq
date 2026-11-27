import React, { useState, useRef, useEffect } from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { useSettings } from '../context/SettingsContext';
import { BrandLogo } from '../components/ui/BrandLogo';
import { Button } from '../components/ui/Button';
import { LogoDisplayType, PortalSettings } from '../types/settings';
import { convertToTransparentPng, TransparencyOptions } from '../lib/imageTransparency';
import { ProcessingVideoPlayer } from '../components/ui/ProcessingVideoPlayer';
import {
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  RefreshCw,
  RotateCcw,
  Sliders,
  Type,
  Eye,
  Sparkles,
  Leaf,
  Sprout,
  FlaskConical,
  CircleDot,
  ShieldCheck,
  Save,
  ExternalLink,
  Shield,
  Trash2,
  Wand2,
  Scissors,
  Sun,
  Moon,
  Grid,
  Layers,
  ArrowDown,
  Anchor,
  Film,
  Video,
  Activity,
  Gauge
} from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { cn } from '../lib/utils';

type ActiveSlot = 'header_before_scroll' | 'header_after_scroll' | 'footer';

export function SettingsPage() {
  const {
    settings,
    isLoading,
    isSaving,
    error,
    saveSuccess,
    updateSettings,
    uploadLogoBase64,
    resetSettings
  } = useSettings();

  const { navigate } = useRouter();

  // Local form state
  const [formData, setFormData] = useState<PortalSettings>(settings);
  const [activeTab, setActiveTab] = useState<'logos' | 'brand' | 'video' | 'preview'>('logos');
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isUploadingSlot, setIsUploadingSlot] = useState<ActiveSlot | null>(null);
  const [autoMakeTransparent, setAutoMakeTransparent] = useState(true);

  // Transparency Studio Editor State
  const [studioTargetSlot, setStudioTargetSlot] = useState<ActiveSlot | null>(null);
  const [studioSourceImage, setStudioSourceImage] = useState<string | null>(null);
  const [studioPreviewUrl, setStudioPreviewUrl] = useState<string | null>(null);
  const [studioProcessing, setStudioProcessing] = useState(false);
  const [studioBgMode, setStudioBgMode] = useState<'checker' | 'dark' | 'light'>('checker');

  const [transparencyOptions, setTransparencyOptions] = useState<TransparencyOptions>({
    tolerance: 28,
    feather: 12,
    mode: 'auto',
    trimWhitespace: true,
    targetColor: null,
  });

  const headerBeforeInputRef = useRef<HTMLInputElement>(null);
  const headerAfterInputRef = useRef<HTMLInputElement>(null);
  const footerInputRef = useRef<HTMLInputElement>(null);

  // Sync form data when settings are loaded or updated
  useEffect(() => {
    setFormData(settings);
  }, [settings]);

  // Handle File Upload for Specific Logo Slot
  const handleSlotFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    slot: ActiveSlot
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 8 * 1024 * 1024) {
      setUploadError('Image size exceeds 8MB limit. Please upload a smaller image.');
      return;
    }

    try {
      setIsUploadingSlot(slot);
      setUploadError(null);

      let processedDataUrl: string;

      if (autoMakeTransparent) {
        // Automatically convert to transparent PNG
        const result = await convertToTransparentPng(file, transparencyOptions);
        processedDataUrl = result.dataUrl;
      } else {
        processedDataUrl = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      }

      const uploadedUrl = await uploadLogoBase64(
        processedDataUrl,
        `${slot}_logo_${Date.now()}.png`,
        slot
      );

      if (uploadedUrl) {
        setFormData((prev) => {
          const updated = { ...prev };
          if (slot === 'header_before_scroll') {
            updated.headerBeforeScrollLogoUrl = uploadedUrl;
          } else if (slot === 'header_after_scroll') {
            updated.headerAfterScrollLogoUrl = uploadedUrl;
            updated.logoUrl = uploadedUrl;
          } else if (slot === 'footer') {
            updated.footerLogoUrl = uploadedUrl;
          }
          return updated;
        });
      }
    } catch (err: any) {
      console.error('Slot upload error:', err);
      setUploadError(err.message || 'Error uploading image');
    } finally {
      setIsUploadingSlot(null);
      if (e.target) e.target.value = '';
    }
  };

  // Open Transparency Studio for a Specific Slot
  const openTransparencyStudioForSlot = async (slot: ActiveSlot) => {
    let sourceUrl = '';
    if (slot === 'header_before_scroll') {
      sourceUrl = formData.headerBeforeScrollLogoUrl || formData.logoUrl;
    } else if (slot === 'header_after_scroll') {
      sourceUrl = formData.headerAfterScrollLogoUrl || formData.logoUrl;
    } else if (slot === 'footer') {
      sourceUrl = formData.footerLogoUrl || formData.headerBeforeScrollLogoUrl || formData.logoUrl;
    }

    if (!sourceUrl) return;

    setStudioTargetSlot(slot);
    setStudioSourceImage(sourceUrl);
    setStudioBgMode(slot === 'header_after_scroll' ? 'light' : 'dark');
    await processStudioPreview(sourceUrl, transparencyOptions);
  };

  // Re-process preview when studio options change
  const processStudioPreview = async (source: string, opts: TransparencyOptions) => {
    try {
      setStudioProcessing(true);
      const res = await convertToTransparentPng(source, opts);
      setStudioPreviewUrl(res.dataUrl);
    } catch (err: any) {
      console.error('Studio processing error:', err);
      setUploadError('Failed to process transparency preview: ' + err.message);
    } finally {
      setStudioProcessing(false);
    }
  };

  const handleStudioOptionChange = (newOpts: Partial<TransparencyOptions>) => {
    const updated = { ...transparencyOptions, ...newOpts };
    setTransparencyOptions(updated);
    if (studioSourceImage) {
      processStudioPreview(studioSourceImage, updated);
    }
  };

  // Apply Transparent Logo from Studio to Target Slot
  const handleApplyStudioTransparentLogo = async () => {
    if (!studioPreviewUrl || !studioTargetSlot) return;

    try {
      setIsUploadingSlot(studioTargetSlot);
      setUploadError(null);
      const uploadedUrl = await uploadLogoBase64(
        studioPreviewUrl,
        `${studioTargetSlot}_transparent_${Date.now()}.png`,
        studioTargetSlot
      );

      if (uploadedUrl) {
        setFormData((prev) => {
          const updated = { ...prev };
          if (studioTargetSlot === 'header_before_scroll') {
            updated.headerBeforeScrollLogoUrl = uploadedUrl;
          } else if (studioTargetSlot === 'header_after_scroll') {
            updated.headerAfterScrollLogoUrl = uploadedUrl;
            updated.logoUrl = uploadedUrl;
          } else if (studioTargetSlot === 'footer') {
            updated.footerLogoUrl = uploadedUrl;
          }
          return updated;
        });
        setStudioTargetSlot(null);
      }
    } catch (err: any) {
      setUploadError('Failed to save transparent logo: ' + err.message);
    } finally {
      setIsUploadingSlot(null);
    }
  };

  const handleSave = async () => {
    setUploadError(null);
    await updateSettings(formData);
  };

  const handleReset = async () => {
    if (window.confirm('Are you sure you want to reset all portal logos and brand settings to factory defaults?')) {
      await resetSettings();
    }
  };

  const presetIcons = [
    { id: 'botanical-crest', name: 'Botanical Crest', icon: Sparkles, desc: 'Classic sparkles & golden aura' },
    { id: 'leaf-gold', name: 'Golden Leaf', icon: Leaf, desc: 'Natural botanical purity' },
    { id: 'seed-sprout', name: 'Sprout & Seed', icon: Sprout, desc: 'Agricultural origin' },
    { id: 'flask-nature', name: 'Science & Flask', icon: FlaskConical, desc: 'Clean laboratory rigor' },
    { id: 'milling-grain', name: 'Precision Milling', icon: CircleDot, desc: 'Mesh particle calibration' },
    { id: 'shield-quality', name: 'Quality Shield', icon: ShieldCheck, desc: 'QA certified standards' },
  ];

  return (
    <PageWrapper
      title="Portal Branding & Logo Settings | BhuviQ Nyra"
      description="Separately configure logos for Header Before Scroll, Header After Scroll, and Global Footer with auto-transparent background conversion."
    >
      <div className="pt-28 sm:pt-36 pb-20 bg-[#FAF8F2] min-h-screen text-[#17202A]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Top Header Card */}
          <div className="bg-white border border-[#102A43]/15 rounded-sm p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-xs bg-[#285943]/10 text-[#285943]">
                  <Layers className="w-5 h-5" />
                </span>
                <span className="text-xs font-mono uppercase tracking-widest text-[#285943] font-bold">
                  Multi-Slot Logo Engine
                </span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#102A43] font-semibold">
                Portal Logo & Brand Settings
              </h1>
              <p className="text-sm text-[#667085] max-w-2xl font-light">
                Configure separate logos for <strong>Header (Before Scroll)</strong>, <strong>Header (After Scroll & Inner Pages)</strong>, and <strong>Global Footer</strong>. Any uploaded logo is automatically converted to a clean transparent PNG and stored in the backend.
              </p>
            </div>

            {/* Quick Navigation Actions */}
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/admin')}
              >
                <Shield className="w-4 h-4 mr-1.5 text-[#102A43]" />
                Enquiries Console
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/')}
              >
                <ExternalLink className="w-4 h-4 mr-1.5 text-[#285943]" />
                View Live Portal
              </Button>
            </div>
          </div>

          {/* Feedback Banners */}
          {saveSuccess && (
            <div className="p-4 bg-[#285943]/10 border border-[#285943]/30 rounded-sm text-[#285943] flex items-center justify-between gap-3 text-sm font-medium animate-fadeIn">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>All logo slots and brand settings successfully saved to backend!</span>
              </div>
              <span className="text-xs font-mono bg-white/80 px-2 py-0.5 rounded border border-[#285943]/20">
                Backend Synced
              </span>
            </div>
          )}

          {(error || uploadError) && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-sm text-red-800 text-sm flex items-center gap-2">
              <span className="font-bold">Error:</span>
              <span>{error || uploadError}</span>
            </div>
          )}

          {/* Global Auto-Transparency Switch */}
          <div className="p-4 bg-white border border-[#102A43]/15 rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xs bg-[#B89B5E]/20 text-[#102A43]">
                <Wand2 className="w-5 h-5 text-[#285943]" />
              </div>
              <div>
                <span className="text-sm font-bold text-[#102A43] block">
                  Automatic Transparent PNG Conversion
                </span>
                <span className="text-xs text-[#667085]">
                  When uploading JPG or solid background logos, background colors are automatically removed with smooth feathered edges.
                </span>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={autoMakeTransparent}
                onChange={(e) => setAutoMakeTransparent(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#285943]"></div>
            </label>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-[#102A43]/10 pb-px">
            <button
              onClick={() => setActiveTab('logos')}
              className={`pb-3 px-4 text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 flex items-center gap-2 cursor-pointer ${
                activeTab === 'logos'
                  ? 'border-[#285943] text-[#285943]'
                  : 'border-transparent text-[#667085] hover:text-[#102A43]'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>3 Separate Logo Slots</span>
            </button>
            <button
              onClick={() => setActiveTab('brand')}
              className={`pb-3 px-4 text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 flex items-center gap-2 cursor-pointer ${
                activeTab === 'brand'
                  ? 'border-[#285943] text-[#285943]'
                  : 'border-transparent text-[#667085] hover:text-[#102A43]'
              }`}
            >
              <Type className="w-4 h-4" />
              <span>Brand Identity & Sizing</span>
            </button>
            <button
              onClick={() => setActiveTab('video')}
              className={`pb-3 px-4 text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 flex items-center gap-2 cursor-pointer ${
                activeTab === 'video'
                  ? 'border-[#285943] text-[#285943]'
                  : 'border-transparent text-[#667085] hover:text-[#102A43]'
              }`}
            >
              <Film className="w-4 h-4" />
              <span>Processing Video</span>
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`pb-3 px-4 text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 flex items-center gap-2 cursor-pointer ${
                activeTab === 'preview'
                  ? 'border-[#285943] text-[#285943]'
                  : 'border-transparent text-[#667085] hover:text-[#102A43]'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>Live Multi-Theme Previews</span>
            </button>
          </div>

          {/* TAB 1: 3 SEPARATE LOGO SLOTS */}
          {activeTab === 'logos' && (
            <div className="space-y-8">
              
              {/* ======================================================== */}
              {/* SLOT 1: HEADER - BEFORE SCROLL (Dark Hero Transparent) */}
              {/* ======================================================== */}
              <div className="bg-white border border-[#102A43]/15 rounded-sm p-6 sm:p-8 space-y-6 shadow-xs relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#102A43]/10">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold uppercase bg-[#102A43] text-[#FAF7F0]">
                        Slot 1: Header (Before Scroll)
                      </span>
                      <span className="text-xs text-[#285943] font-semibold">
                        Homepage Hero / Dark Transparent Header
                      </span>
                    </div>
                    <p className="text-xs text-[#667085]">
                      Displayed at the top of the homepage over the dark blue hero banner. Ideal for white, gold, or light-colored transparent logos.
                    </p>
                  </div>

                  {formData.headerBeforeScrollLogoUrl && (
                    <button
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, headerBeforeScrollLogoUrl: '' }))
                      }
                      className="text-xs text-red-600 hover:text-red-800 flex items-center gap-1 font-medium cursor-pointer shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove Slot 1 Logo</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  {/* Upload Dropzone */}
                  <div
                    onClick={() => headerBeforeInputRef.current?.click()}
                    className="lg:col-span-7 border-2 border-dashed border-[#102A43]/20 hover:border-[#285943] bg-[#FAF8F2]/50 hover:bg-[#285943]/5 rounded-sm p-6 sm:p-8 text-center cursor-pointer transition-all duration-200 group flex flex-col items-center justify-center space-y-3"
                  >
                    <input
                      ref={headerBeforeInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/svg+xml"
                      onChange={(e) => handleSlotFileUpload(e, 'header_before_scroll')}
                      className="hidden"
                    />

                    <div className="w-12 h-12 rounded-full bg-[#102A43]/10 text-[#102A43] flex items-center justify-center group-hover:scale-110 transition-transform">
                      {isUploadingSlot === 'header_before_scroll' ? (
                        <RefreshCw className="w-6 h-6 animate-spin text-[#285943]" />
                      ) : (
                        <Upload className="w-6 h-6" />
                      )}
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-[#102A43]">
                        {isUploadingSlot === 'header_before_scroll'
                          ? 'Converting to transparent PNG & saving...'
                          : 'Upload Header Logo (Before Scroll)'}
                      </p>
                      <p className="text-xs text-[#667085]">
                        Auto-converts to transparent PNG for dark hero navigation
                      </p>
                    </div>
                  </div>

                  {/* Slot 1 Live Preview Box on Dark Hero Backdrop */}
                  <div className="lg:col-span-5 bg-[#FAF8F2] border border-[#102A43]/10 rounded-sm p-4 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#102A43] uppercase tracking-wider">
                        Hero Header Simulation:
                      </span>
                      <span className="font-mono text-[10px] text-[#B89B5E] bg-[#102A43] px-2 py-0.5 rounded">
                        Dark Background
                      </span>
                    </div>

                    {/* Dark Hero Preview */}
                    <div className="h-28 rounded-xs bg-[#102A43] border border-[#102A43] p-4 flex items-center justify-between shadow-inner">
                      <BrandLogo
                        variant="header-before-scroll"
                        customSettings={formData}
                      />
                      <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-white/80 font-mono">
                        <span className="px-2 py-0.5 rounded bg-white/10">About</span>
                        <span className="px-2 py-0.5 rounded bg-[#B89B5E] text-[#102A43] font-bold">Partner</span>
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="space-y-2 pt-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#667085]">Height:</span>
                        <span className="font-mono font-bold text-[#102A43]">
                          {formData.headerBeforeScrollLogoHeight || 38} px
                        </span>
                      </div>
                      <input
                        type="range"
                        min={24}
                        max={68}
                        step={2}
                        value={formData.headerBeforeScrollLogoHeight || 38}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            headerBeforeScrollLogoHeight: parseInt(e.target.value, 10),
                          }))
                        }
                        className="w-full h-1.5 bg-[#102A43]/10 rounded-lg appearance-none cursor-pointer accent-[#285943]"
                      />

                      {formData.headerBeforeScrollLogoUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openTransparencyStudioForSlot('header_before_scroll')}
                          className="w-full justify-center text-xs mt-2"
                        >
                          <Scissors className="w-3.5 h-3.5 mr-1.5 text-[#285943]" />
                          Fine-Tune Transparency
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Direct URL input for Slot 1 */}
                <div className="pt-3 border-t border-[#102A43]/10 flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="text-xs font-semibold text-[#102A43] uppercase tracking-wider whitespace-nowrap">
                    Direct Image URL:
                  </span>
                  <input
                    type="url"
                    placeholder="https://... or /uploads/..."
                    value={formData.headerBeforeScrollLogoUrl || ''}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, headerBeforeScrollLogoUrl: e.target.value }))
                    }
                    className="flex-1 text-xs px-3 py-2 bg-white border border-[#102A43]/20 rounded-xs focus:outline-none focus:border-[#285943]"
                  />
                </div>
              </div>

              {/* ======================================================== */}
              {/* SLOT 2: HEADER - AFTER SCROLL & INNER PAGES (Light Header) */}
              {/* ======================================================== */}
              <div className="bg-white border border-[#102A43]/15 rounded-sm p-6 sm:p-8 space-y-6 shadow-xs relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#102A43]/10">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold uppercase bg-[#285943] text-white">
                        Slot 2: Header (After Scroll & Inner Pages)
                      </span>
                      <span className="text-xs text-[#102A43] font-semibold">
                        Sticky Navigation / Light Background
                      </span>
                    </div>
                    <p className="text-xs text-[#667085]">
                      Displayed once the user scrolls down on the homepage and across all inner pages (About, Ingredients, Applications, Science, etc.). Ideal for dark/rich colored transparent logos.
                    </p>
                  </div>

                  {formData.headerAfterScrollLogoUrl && (
                    <button
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, headerAfterScrollLogoUrl: '' }))
                      }
                      className="text-xs text-red-600 hover:text-red-800 flex items-center gap-1 font-medium cursor-pointer shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove Slot 2 Logo</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  {/* Upload Dropzone */}
                  <div
                    onClick={() => headerAfterInputRef.current?.click()}
                    className="lg:col-span-7 border-2 border-dashed border-[#102A43]/20 hover:border-[#285943] bg-[#FAF8F2]/50 hover:bg-[#285943]/5 rounded-sm p-6 sm:p-8 text-center cursor-pointer transition-all duration-200 group flex flex-col items-center justify-center space-y-3"
                  >
                    <input
                      ref={headerAfterInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/svg+xml"
                      onChange={(e) => handleSlotFileUpload(e, 'header_after_scroll')}
                      className="hidden"
                    />

                    <div className="w-12 h-12 rounded-full bg-[#285943]/10 text-[#285943] flex items-center justify-center group-hover:scale-110 transition-transform">
                      {isUploadingSlot === 'header_after_scroll' ? (
                        <RefreshCw className="w-6 h-6 animate-spin text-[#285943]" />
                      ) : (
                        <Upload className="w-6 h-6" />
                      )}
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-[#102A43]">
                        {isUploadingSlot === 'header_after_scroll'
                          ? 'Converting to transparent PNG & saving...'
                          : 'Upload Header Logo (After Scroll & Inner Pages)'}
                      </p>
                      <p className="text-xs text-[#667085]">
                        Auto-converts to transparent PNG for light sticky navigation
                      </p>
                    </div>
                  </div>

                  {/* Slot 2 Live Preview Box on Light Header */}
                  <div className="lg:col-span-5 bg-[#FAF8F2] border border-[#102A43]/10 rounded-sm p-4 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#102A43] uppercase tracking-wider">
                        Light Sticky Header Simulation:
                      </span>
                      <span className="font-mono text-[10px] text-[#285943] bg-[#285943]/10 px-2 py-0.5 rounded">
                        Light Background
                      </span>
                    </div>

                    {/* Light Header Preview */}
                    <div className="h-28 rounded-xs bg-[#FAF8F2] border border-[#102A43]/15 p-4 flex items-center justify-between shadow-xs">
                      <BrandLogo
                        variant="header-after-scroll"
                        customSettings={formData}
                      />
                      <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-[#102A43] font-mono">
                        <span className="px-2 py-0.5 rounded bg-[#102A43]/5">About</span>
                        <span className="px-2 py-0.5 rounded bg-[#285943] text-white font-bold">Partner</span>
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="space-y-2 pt-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#667085]">Height:</span>
                        <span className="font-mono font-bold text-[#102A43]">
                          {formData.headerAfterScrollLogoHeight || 38} px
                        </span>
                      </div>
                      <input
                        type="range"
                        min={24}
                        max={68}
                        step={2}
                        value={formData.headerAfterScrollLogoHeight || 38}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            headerAfterScrollLogoHeight: parseInt(e.target.value, 10),
                          }))
                        }
                        className="w-full h-1.5 bg-[#102A43]/10 rounded-lg appearance-none cursor-pointer accent-[#285943]"
                      />

                      {formData.headerAfterScrollLogoUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openTransparencyStudioForSlot('header_after_scroll')}
                          className="w-full justify-center text-xs mt-2"
                        >
                          <Scissors className="w-3.5 h-3.5 mr-1.5 text-[#285943]" />
                          Fine-Tune Transparency
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Direct URL input for Slot 2 */}
                <div className="pt-3 border-t border-[#102A43]/10 flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="text-xs font-semibold text-[#102A43] uppercase tracking-wider whitespace-nowrap">
                    Direct Image URL:
                  </span>
                  <input
                    type="url"
                    placeholder="https://... or /uploads/..."
                    value={formData.headerAfterScrollLogoUrl || ''}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, headerAfterScrollLogoUrl: e.target.value }))
                    }
                    className="flex-1 text-xs px-3 py-2 bg-white border border-[#102A43]/20 rounded-xs focus:outline-none focus:border-[#285943]"
                  />
                </div>
              </div>

              {/* ======================================================== */}
              {/* SLOT 3: FOOTER LOGO (Deep Navy Global Footer) */}
              {/* ======================================================== */}
              <div className="bg-white border border-[#102A43]/15 rounded-sm p-6 sm:p-8 space-y-6 shadow-xs relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#102A43]/10">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold uppercase bg-[#0B1D2E] text-[#B89B5E] border border-[#B89B5E]/30">
                        Slot 3: Global Footer Logo
                      </span>
                      <span className="text-xs text-[#0B1D2E] font-semibold">
                        Deep Navy Footer / Bottom of Every Page
                      </span>
                    </div>
                    <p className="text-xs text-[#667085]">
                      Displayed in the footer section at the bottom of all portal pages. Ideal for gold, white, or illuminated contrast transparent marks.
                    </p>
                  </div>

                  {formData.footerLogoUrl && (
                    <button
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, footerLogoUrl: '' }))
                      }
                      className="text-xs text-red-600 hover:text-red-800 flex items-center gap-1 font-medium cursor-pointer shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove Footer Logo</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  {/* Upload Dropzone */}
                  <div
                    onClick={() => footerInputRef.current?.click()}
                    className="lg:col-span-7 border-2 border-dashed border-[#102A43]/20 hover:border-[#285943] bg-[#FAF8F2]/50 hover:bg-[#285943]/5 rounded-sm p-6 sm:p-8 text-center cursor-pointer transition-all duration-200 group flex flex-col items-center justify-center space-y-3"
                  >
                    <input
                      ref={footerInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/svg+xml"
                      onChange={(e) => handleSlotFileUpload(e, 'footer')}
                      className="hidden"
                    />

                    <div className="w-12 h-12 rounded-full bg-[#0B1D2E]/10 text-[#0B1D2E] flex items-center justify-center group-hover:scale-110 transition-transform">
                      {isUploadingSlot === 'footer' ? (
                        <RefreshCw className="w-6 h-6 animate-spin text-[#285943]" />
                      ) : (
                        <Upload className="w-6 h-6" />
                      )}
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-[#102A43]">
                        {isUploadingSlot === 'footer'
                          ? 'Converting to transparent PNG & saving...'
                          : 'Upload Global Footer Logo'}
                      </p>
                      <p className="text-xs text-[#667085]">
                        Auto-converts to transparent PNG for deep navy footer
                      </p>
                    </div>
                  </div>

                  {/* Slot 3 Live Preview Box on Deep Navy Footer */}
                  <div className="lg:col-span-5 bg-[#FAF8F2] border border-[#102A43]/10 rounded-sm p-4 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#102A43] uppercase tracking-wider">
                        Footer Simulation:
                      </span>
                      <span className="font-mono text-[10px] text-[#B89B5E] bg-[#0B1D2E] px-2 py-0.5 rounded border border-[#B89B5E]/30">
                        Deep Navy
                      </span>
                    </div>

                    {/* Footer Preview */}
                    <div className="h-28 rounded-xs bg-[#0B1D2E] border border-[#B89B5E]/30 p-4 flex flex-col justify-center shadow-md">
                      <BrandLogo
                        variant="footer"
                        customSettings={formData}
                      />
                    </div>

                    {/* Controls */}
                    <div className="space-y-2 pt-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#667085]">Height:</span>
                        <span className="font-mono font-bold text-[#102A43]">
                          {formData.footerLogoHeight || 44} px
                        </span>
                      </div>
                      <input
                        type="range"
                        min={24}
                        max={72}
                        step={2}
                        value={formData.footerLogoHeight || 44}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            footerLogoHeight: parseInt(e.target.value, 10),
                          }))
                        }
                        className="w-full h-1.5 bg-[#102A43]/10 rounded-lg appearance-none cursor-pointer accent-[#285943]"
                      />

                      {formData.footerLogoUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openTransparencyStudioForSlot('footer')}
                          className="w-full justify-center text-xs mt-2"
                        >
                          <Scissors className="w-3.5 h-3.5 mr-1.5 text-[#285943]" />
                          Fine-Tune Transparency
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Direct URL input for Slot 3 */}
                <div className="pt-3 border-t border-[#102A43]/10 flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="text-xs font-semibold text-[#102A43] uppercase tracking-wider whitespace-nowrap">
                    Direct Image URL:
                  </span>
                  <input
                    type="url"
                    placeholder="https://... or /uploads/..."
                    value={formData.footerLogoUrl || ''}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, footerLogoUrl: e.target.value }))
                    }
                    className="flex-1 text-xs px-3 py-2 bg-white border border-[#102A43]/20 rounded-xs focus:outline-none focus:border-[#285943]"
                  />
                </div>
              </div>

              {/* TRANSPARENCY STUDIO MODAL / DRAWER */}
              {studioTargetSlot && (
                <div className="bg-[#102A43] text-white border border-[#B89B5E]/40 rounded-sm p-6 sm:p-8 space-y-6 shadow-xl animate-fadeIn">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded bg-[#B89B5E]/20 text-[#B89B5E]">
                        <Scissors className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-serif text-xl text-[#FAF7F0] font-semibold">
                          Transparency Studio & Background Remover
                        </h3>
                        <p className="text-xs text-[#FAF7F0]/70 mt-0.5">
                          Fine-tuning transparent conversion for{' '}
                          <strong className="text-[#B89B5E] uppercase">
                            {studioTargetSlot.replace(/_/g, ' ')}
                          </strong>
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setStudioTargetSlot(null)}
                      className="text-white/70 hover:text-white text-xs px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                    >
                      Close Studio
                    </button>
                  </div>

                  {/* Studio Preview Controls & Viewport */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    {/* Viewport Card */}
                    <div className="lg:col-span-7 space-y-3">
                      <div className="flex items-center justify-between text-xs text-[#FAF7F0]/80">
                        <span className="font-semibold uppercase tracking-wider">Converted Transparent Preview:</span>
                        <div className="flex items-center gap-1 bg-white/10 p-1 rounded">
                          <button
                            onClick={() => setStudioBgMode('checker')}
                            title="Checkerboard Pattern"
                            className={`p-1.5 rounded cursor-pointer ${studioBgMode === 'checker' ? 'bg-[#B89B5E] text-[#102A43]' : 'text-white'}`}
                          >
                            <Grid className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setStudioBgMode('dark')}
                            title="Dark Background"
                            className={`p-1.5 rounded cursor-pointer ${studioBgMode === 'dark' ? 'bg-[#B89B5E] text-[#102A43]' : 'text-white'}`}
                          >
                            <Moon className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setStudioBgMode('light')}
                            title="Light Background"
                            className={`p-1.5 rounded cursor-pointer ${studioBgMode === 'light' ? 'bg-[#B89B5E] text-[#102A43]' : 'text-white'}`}
                          >
                            <Sun className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Display Viewport */}
                      <div
                        className={`h-48 rounded-sm p-6 flex items-center justify-center relative overflow-hidden border border-white/20 transition-all ${
                          studioBgMode === 'dark'
                            ? 'bg-[#102A43]'
                            : studioBgMode === 'light'
                            ? 'bg-[#FAF8F2]'
                            : ''
                        }`}
                        style={
                          studioBgMode === 'checker'
                            ? {
                                backgroundImage: `
                                  linear-gradient(45deg, #cbd5e1 25%, transparent 25%), 
                                  linear-gradient(-45deg, #cbd5e1 25%, transparent 25%), 
                                  linear-gradient(45deg, transparent 75%, #cbd5e1 75%), 
                                  linear-gradient(-45deg, transparent 75%, #cbd5e1 75%)
                                `,
                                backgroundSize: '16px 16px',
                                backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px',
                                backgroundColor: '#f1f5f9'
                              }
                            : {}
                        }
                      >
                        {studioProcessing ? (
                          <div className="flex items-center gap-2 text-xs font-mono text-[#102A43] bg-white/90 px-3 py-1.5 rounded shadow">
                            <RefreshCw className="w-4 h-4 animate-spin text-[#285943]" />
                            <span>Processing pixel alpha...</span>
                          </div>
                        ) : studioPreviewUrl ? (
                          <img
                            src={studioPreviewUrl}
                            alt="Transparent Preview"
                            style={{ height: '48px' }}
                            className="max-h-36 max-w-full object-contain drop-shadow-md"
                          />
                        ) : (
                          <span className="text-xs text-white/60">No image loaded</span>
                        )}
                      </div>
                    </div>

                    {/* Interactive Parameters Controls */}
                    <div className="lg:col-span-5 space-y-4 bg-white/5 p-5 rounded-sm border border-white/10">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#B89B5E] block">
                        Transparency Parameters
                      </span>

                      {/* Background Removal Mode */}
                      <div className="space-y-1.5">
                        <label className="text-xs text-[#FAF7F0]/80 block">Detection Mode:</label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { id: 'auto', label: 'Auto Detect' },
                            { id: 'white', label: 'White / Light' },
                            { id: 'black', label: 'Dark / Black' },
                          ].map((m) => (
                            <button
                              key={m.id}
                              onClick={() => handleStudioOptionChange({ mode: m.id as any })}
                              className={`py-1.5 px-2 text-[11px] rounded font-medium transition-colors cursor-pointer text-center ${
                                transparencyOptions.mode === m.id
                                  ? 'bg-[#B89B5E] text-[#102A43] font-bold'
                                  : 'bg-white/10 text-white/80 hover:bg-white/20'
                              }`}
                            >
                              {m.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Tolerance Slider */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs text-[#FAF7F0]/80">
                          <span>Color Tolerance:</span>
                          <span className="font-mono text-[#B89B5E] font-bold">{transparencyOptions.tolerance}%</span>
                        </div>
                        <input
                          type="range"
                          min={5}
                          max={80}
                          step={1}
                          value={transparencyOptions.tolerance}
                          onChange={(e) =>
                            handleStudioOptionChange({ tolerance: parseInt(e.target.value, 10) })
                          }
                          className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#B89B5E]"
                        />
                      </div>

                      {/* Edge Feathering Slider */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs text-[#FAF7F0]/80">
                          <span>Edge Softening:</span>
                          <span className="font-mono text-[#B89B5E] font-bold">{transparencyOptions.feather}%</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={30}
                          step={1}
                          value={transparencyOptions.feather}
                          onChange={(e) =>
                            handleStudioOptionChange({ feather: parseInt(e.target.value, 10) })
                          }
                          className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#B89B5E]"
                        />
                      </div>

                      {/* Trim Whitespace Toggle */}
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-xs text-[#FAF7F0]/80">Trim Outer Empty Margins:</span>
                        <input
                          type="checkbox"
                          checked={transparencyOptions.trimWhitespace}
                          onChange={(e) =>
                            handleStudioOptionChange({ trimWhitespace: e.target.checked })
                          }
                          className="w-4 h-4 accent-[#B89B5E] rounded cursor-pointer"
                        />
                      </div>

                      {/* Apply Button */}
                      <div className="pt-2">
                        <Button
                          variant="gold"
                          size="sm"
                          onClick={handleApplyStudioTransparentLogo}
                          disabled={isUploadingSlot !== null}
                          className="w-full justify-center"
                        >
                          {isUploadingSlot !== null ? (
                            <>
                              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                              <span>Saving to Backend...</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="w-4 h-4 mr-2" />
                              <span>Save to {studioTargetSlot.replace(/_/g, ' ')}</span>
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: BRAND IDENTITY & SIZING */}
          {activeTab === 'brand' && (
            <div className="space-y-8">
              {/* Display Mode Selector */}
              <div className="bg-white border border-[#102A43]/15 rounded-sm p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="font-serif text-lg sm:text-xl text-[#102A43] font-semibold">
                    Logo Display Mode
                  </h3>
                  <p className="text-xs text-[#667085] mt-0.5">
                    Select how the logo appears alongside or in place of brand typography.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    {
                      id: 'image_and_text' as LogoDisplayType,
                      title: 'Symbol + Typography',
                      desc: 'Shows the transparent logo symbol next to the brand name and subtitle. (Recommended)',
                    },
                    {
                      id: 'image_only' as LogoDisplayType,
                      title: 'Standalone Image',
                      desc: 'Renders the graphic logo banner only, without separate HTML typography.',
                    },
                    {
                      id: 'text_mark' as LogoDisplayType,
                      title: 'Editorial Typography',
                      desc: 'Clean, elegant serif text lockup without any image symbol.',
                    },
                  ].map((mode) => (
                    <div
                      key={mode.id}
                      onClick={() => setFormData((prev) => ({ ...prev, logoType: mode.id }))}
                      className={`p-4 rounded-sm border cursor-pointer transition-all ${
                        formData.logoType === mode.id
                          ? 'border-[#285943] bg-[#285943]/5 ring-1 ring-[#285943]'
                          : 'border-[#102A43]/15 bg-white hover:border-[#102A43]/40'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold text-[#102A43] uppercase tracking-wider">
                          {mode.title}
                        </span>
                        {formData.logoType === mode.id && (
                          <CheckCircle2 className="w-4 h-4 text-[#285943]" />
                        )}
                      </div>
                      <p className="text-xs text-[#667085] leading-relaxed">
                        {mode.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Brand Typography Text */}
              <div className="bg-white border border-[#102A43]/15 rounded-sm p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="font-serif text-lg sm:text-xl text-[#102A43] font-semibold">
                    Brand Identity & Typography Text
                  </h3>
                  <p className="text-xs text-[#667085] mt-0.5">
                    Update the brand title, badge tag, and signature philosophy tagline rendered across the site.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#102A43] block">
                      Brand Name:
                    </label>
                    <input
                      type="text"
                      value={formData.brandName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, brandName: e.target.value }))}
                      className="w-full text-sm px-3.5 py-2.5 bg-[#FAF8F2]/50 border border-[#102A43]/20 rounded-xs focus:outline-none focus:border-[#285943] focus:bg-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#102A43] block">
                      Geographic / Division Badge:
                    </label>
                    <input
                      type="text"
                      value={formData.badgeText}
                      onChange={(e) => setFormData((prev) => ({ ...prev, badgeText: e.target.value }))}
                      className="w-full text-sm px-3.5 py-2.5 bg-[#FAF8F2]/50 border border-[#102A43]/20 rounded-xs focus:outline-none focus:border-[#285943] focus:bg-white"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#102A43] block">
                      Brand Subtitle / Tagline:
                    </label>
                    <input
                      type="text"
                      value={formData.brandTagline}
                      onChange={(e) => setFormData((prev) => ({ ...prev, brandTagline: e.target.value }))}
                      className="w-full text-sm px-3.5 py-2.5 bg-[#FAF8F2]/50 border border-[#102A43]/20 rounded-xs focus:outline-none focus:border-[#285943] focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Preset Botanical Vector Marks (Fallback when no image uploaded) */}
              <div className="bg-white border border-[#102A43]/15 rounded-sm p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="font-serif text-lg sm:text-xl text-[#102A43] font-semibold">
                    Preset Botanical & Scientific Marks (Fallback)
                  </h3>
                  <p className="text-xs text-[#667085] mt-0.5">
                    Used if no custom image logo is provided for a slot.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {presetIcons.map((p) => {
                    const Icon = p.icon;
                    const isSelected = formData.presetIcon === p.id;
                    return (
                      <div
                        key={p.id}
                        onClick={() => setFormData((prev) => ({ ...prev, presetIcon: p.id }))}
                        className={`p-3.5 rounded-sm border text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-2 ${
                          isSelected
                            ? 'border-[#285943] bg-[#285943]/10 ring-1 ring-[#285943]'
                            : 'border-[#102A43]/15 bg-white hover:border-[#285943]/40'
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            isSelected
                              ? 'bg-[#285943] text-white'
                              : 'bg-[#FAF8F2] text-[#285943]'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-[11px] font-bold text-[#102A43]">
                            {p.name}
                          </p>
                          <p className="text-[9.5px] text-[#667085] leading-tight mt-0.5">
                            {p.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PROCESSING VIDEO CONFIGURATION */}
          {activeTab === 'video' && (
            <div className="space-y-8">
              {/* Header card */}
              <div className="bg-white border border-[#102A43]/15 rounded-sm p-6 sm:p-8 space-y-6 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#102A43]/10">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold uppercase bg-[#285943] text-[#FAF7F0]">
                        Facility Stream
                      </span>
                      <h3 className="font-serif text-lg sm:text-xl text-[#102A43] font-semibold">
                        Manufacturing & Processing Video Configuration
                      </h3>
                    </div>
                    <p className="text-xs text-[#667085] mt-1">
                      Provide a direct web video stream (MP4, WebM) or choose an industrial preset to replace static processing pictures across the Journey and Manufacturing sections.
                    </p>
                  </div>

                  <span className="text-xs font-mono text-[#285943] bg-[#285943]/10 px-2.5 py-1 rounded self-start">
                    HTML5 Video + Telemetry
                  </span>
                </div>

                {/* Video URL Input & Controls */}
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#102A43] block">
                      Custom Processing Video URL (MP4 / WebM Direct Stream):
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        placeholder="https://example.com/facility-processing-stream.mp4 (Leave empty for built-in high-res streams)"
                        value={formData.processingVideoUrl || ''}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            processingVideoUrl: e.target.value
                          }))
                        }
                        className="flex-1 text-sm px-3.5 py-2.5 bg-[#FAF8F2]/50 border border-[#102A43]/20 rounded-xs focus:outline-none focus:border-[#285943] focus:bg-white font-mono"
                      />
                      {formData.processingVideoUrl && (
                        <button
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              processingVideoUrl: ''
                            }))
                          }
                          className="px-3 py-2 bg-red-50 text-red-600 border border-red-200 rounded-xs text-xs font-medium hover:bg-red-100 cursor-pointer"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Preset Quick Selectors */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-mono text-[#667085] uppercase tracking-wider block">
                      Or Select Curated Industrial Video Presets:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        {
                          name: "SS-316 Puree Homogenization",
                          desc: "Enclosed sanitary fluid pipeline & sheer rotor",
                          url: "https://upload.wikimedia.org/wikipedia/commons/transcoded/c/c0/Big_Buck_Bunny_4K.webm/Big_Buck_Bunny_4K.webm.360p.vp9.webm"
                        },
                        {
                          name: "Thermal Evaporation Tunnel",
                          desc: "Gentle low-temperature multi-zone drying curve",
                          url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
                        },
                        {
                          name: "Ultrasonic 80-Mesh Sifting",
                          desc: "Precision cryogenic milling & particle grading",
                          url: "https://upload.wikimedia.org/wikipedia/commons/transcoded/c/c0/Big_Buck_Bunny_4K.webm/Big_Buck_Bunny_4K.webm.360p.vp9.webm"
                        }
                      ].map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              processingVideoUrl: preset.url
                            }))
                          }
                          className={cn(
                            "p-3 rounded-sm border text-left cursor-pointer transition-all space-y-1",
                            formData.processingVideoUrl === preset.url
                              ? "bg-[#285943]/10 border-[#285943] ring-1 ring-[#285943]"
                              : "bg-[#FAF8F2]/60 border-[#102A43]/10 hover:border-[#102A43]/30"
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-[#102A43]">
                              {preset.name}
                            </span>
                            {formData.processingVideoUrl === preset.url && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#285943]" />
                            )}
                          </div>
                          <p className="text-[10px] text-[#667085] leading-tight">
                            {preset.desc}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Video Preview Box */}
              <div className="bg-[#0B1D2E] border border-[#B89B5E]/30 rounded-sm p-6 sm:p-8 space-y-4 shadow-xl text-white">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <h4 className="font-serif text-lg text-[#FAF7F0]">
                      Live Processing Video Player Preview
                    </h4>
                  </div>
                  <span className="text-xs font-mono text-[#B89B5E] bg-[#B89B5E]/15 px-2.5 py-1 rounded border border-[#B89B5E]/30">
                    Live Telemetry Connected
                  </span>
                </div>

                <div className="max-w-3xl mx-auto">
                  <ProcessingVideoPlayer
                    videoUrl={formData.processingVideoUrl}
                    posterImage="/images/process_puree_homogenizer_1790837594587.jpg"
                    stageNumber="03"
                    stageTitle="Node 03: SS-316 Puree Homogenization & Dehydration Line"
                    stageSubtitle="Live SCADA telemetry with automated temperature & flow assay"
                    telemetry={[
                      { metric: "Line Temp", value: "68.4", unit: "°C", status: "optimal" },
                      { metric: "Puree Flow", value: "1,240", unit: "kg/h", status: "optimal" },
                      { metric: "SS-316 Press", value: "2.4", unit: "bar", status: "normal" },
                      { metric: "ISO Cleanroom", value: "Class 100k", unit: "Air", status: "optimal" },
                    ]}
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: LIVE MULTI-THEME PREVIEWS */}
          {activeTab === 'preview' && (
            <div className="bg-white border border-[#102A43]/15 rounded-sm p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg sm:text-xl text-[#102A43] font-semibold">
                    Live Context Previews Across All 3 Slots
                  </h3>
                  <p className="text-xs text-[#667085] mt-0.5">
                    Inspect each slot independently as rendered on the live portal.
                  </p>
                </div>
                <span className="text-xs font-mono text-[#285943] bg-[#285943]/10 px-2.5 py-1 rounded">
                  Live Multi-Slot
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Preview 1: Header Before Scroll */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#102A43] uppercase tracking-wider flex items-center gap-1.5">
                    <span>1. Header - Before Scroll (Hero)</span>
                    <span className="text-[10px] text-[#667085] font-normal lowercase">(transparent / dark hero)</span>
                  </span>
                  <div className="relative rounded-sm overflow-hidden p-6 bg-[#102A43] border border-[#102A43] shadow-md flex items-center justify-between">
                    <BrandLogo variant="header-before-scroll" customSettings={formData} />
                    <div className="hidden sm:flex items-center gap-2 text-[11px] text-white/80 font-mono">
                      <span className="px-2 py-1 rounded bg-white/10">About</span>
                      <span className="px-2.5 py-1 rounded bg-[#B89B5E] text-[#102A43] font-bold">Partner</span>
                    </div>
                  </div>
                </div>

                {/* Preview 2: Header After Scroll */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#102A43] uppercase tracking-wider flex items-center gap-1.5">
                    <span>2. Header - After Scroll & Inner Pages</span>
                    <span className="text-[10px] text-[#667085] font-normal lowercase">(sticky light header)</span>
                  </span>
                  <div className="rounded-sm p-6 bg-[#FAF8F2] border border-[#102A43]/15 shadow-sm flex items-center justify-between">
                    <BrandLogo variant="header-after-scroll" customSettings={formData} />
                    <div className="hidden sm:flex items-center gap-2 text-[11px] text-[#102A43] font-mono">
                      <span className="px-2 py-1 rounded bg-[#102A43]/5">About</span>
                      <span className="px-2.5 py-1 rounded bg-[#285943] text-white font-bold">Partner</span>
                    </div>
                  </div>
                </div>

                {/* Preview 3: Footer */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#102A43] uppercase tracking-wider flex items-center gap-1.5">
                    <span>3. Global Footer Slot</span>
                    <span className="text-[10px] text-[#667085] font-normal lowercase">(bottom of every page)</span>
                  </span>
                  <div className="rounded-sm p-6 bg-[#0B1D2E] border border-[#B89B5E]/30 shadow-md">
                    <BrandLogo variant="footer" customSettings={formData} />
                  </div>
                </div>

                {/* Preview 4: Admin Console */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#102A43] uppercase tracking-wider flex items-center gap-1.5">
                    <span>4. Admin Portal Bar</span>
                    <span className="text-[10px] text-[#667085] font-normal lowercase">(internal console)</span>
                  </span>
                  <div className="rounded-sm p-6 bg-white border border-[#102A43]/15 shadow-xs flex items-center justify-between">
                    <BrandLogo variant="admin" customSettings={formData} />
                    <span className="text-xs font-mono font-semibold bg-[#285943]/10 text-[#285943] px-2.5 py-1 rounded">
                      Admin Session
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Action Footer Bar */}
          <div className="sticky bottom-4 z-30 bg-[#102A43] text-white p-4 sm:p-5 rounded-sm shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#B89B5E]/30">
            <div className="flex items-center gap-3 text-xs sm:text-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>
                Backend Storage Engine: <strong className="text-[#B89B5E]">Multi-Slot Active</strong>
              </span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                onClick={handleReset}
                disabled={isSaving}
                className="px-4 py-2 text-xs font-medium text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Defaults</span>
              </button>

              <Button
                variant="gold"
                size="md"
                onClick={handleSave}
                disabled={isSaving}
                className="min-w-[160px] justify-center"
              >
                {isSaving ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    <span>Saving to Backend...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    <span>Save All Logo Slots</span>
                  </>
                )}
              </Button>
            </div>
          </div>

        </div>
      </div>
    </PageWrapper>
  );
}
