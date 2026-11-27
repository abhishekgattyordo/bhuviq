import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';
import { Link, useRouter } from '../../context/RouterContext';
import {
  CheckCircle2,
  Building2,
  Globe,
  Mail,
  Phone,
  ShieldCheck,
  Package,
  FileText,
  Layers,
  Ship,
  HelpCircle,
  Handshake,
  AlertCircle
} from 'lucide-react';

export type EnquiryTypeOption =
  | 'Request a Sample'
  | 'Request a Quotation'
  | 'Bulk Enquiry'
  | 'Export Enquiry'
  | 'Ask a Technical Question'
  | 'Business Partnership / Distribution Enquiry';

interface EnquiryOptionCard {
  type: EnquiryTypeOption;
  summary: string;
  defaultQuantity: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const ENQUIRY_OPTIONS: EnquiryOptionCard[] = [
  {
    type: 'Request a Sample',
    summary: 'Order product samples for lab evaluation, formulation trials, and internal sensory assessment.',
    defaultQuantity: 'Sample Pack (1 kg – 5 kg)',
    icon: Package
  },
  {
    type: 'Request a Quotation',
    summary: 'Receive commercial pricing tailored to packaging format, volume, and delivery terms.',
    defaultQuantity: 'Pilot Order (25 kg – 250 kg)',
    icon: FileText
  },
  {
    type: 'Bulk Enquiry',
    summary: 'Discuss scheduled industrial B2B supply volumes for ongoing food or ingredient manufacturing.',
    defaultQuantity: 'Bulk Supply (500 kg – 2,000 kg)',
    icon: Layers
  },
  {
    type: 'Export Enquiry',
    summary: 'Inquire about export-grade barrier packaging, documentation, and international freight logistics.',
    defaultQuantity: 'Export Volume (2 MT – 5 MT+)',
    icon: Ship
  },
  {
    type: 'Ask a Technical Question',
    summary: 'Consult our team on particle size, moisture specifications, testing methods, or lot CoA scope.',
    defaultQuantity: 'Not Applicable / Technical Review',
    icon: HelpCircle
  },
  {
    type: 'Business Partnership / Distribution Enquiry',
    summary: 'Explore vendor, supplier, distributor, or market collaboration opportunities with our team.',
    defaultQuantity: 'Custom / To Be Discussed',
    icon: Handshake
  }
];

export const INTENDED_APPLICATIONS = [
  'Food & Beverage Manufacturing',
  'Bakery & Confectionery',
  'Nutrition & Functional Supplements',
  'Food Processing & Dry Premixes',
  'Cosmetics & Personal Care',
  'Pharmaceutical Evaluation',
  'Import / Export / Ingredient Distribution',
  'Other Industrial Application'
];

interface CommercialFormState {
  fullName: string;
  companyName: string;
  businessEmail: string;
  phone: string;
  country: string;
  enquiryType: EnquiryTypeOption;
  productInterest: string;
  intendedApplication: string;
  requiredQuantity: string;
  message: string;
}

type FieldErrors = Partial<Record<keyof CommercialFormState, string>>;

export function PartnerSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const { enquiryPreset, clearEnquiryPreset } = useRouter();

  const [formData, setFormData] = useState<CommercialFormState>({
    fullName: '',
    companyName: '',
    businessEmail: '',
    phone: '',
    country: '',
    enquiryType: 'Request a Sample',
    productInterest: 'Banana Powder (100% Pure)',
    intendedApplication: 'Food & Beverage Manufacturing',
    requiredQuantity: 'Sample Pack (1 kg – 5 kg)',
    message: ''
  });

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedSnapshot, setSubmittedSnapshot] = useState<CommercialFormState | null>(null);

  const normalizeApplicationPreset = (value?: string): string | undefined => {
    if (!value) return undefined;
    if (INTENDED_APPLICATIONS.includes(value)) return value;
    const mapping: Record<string, string> = {
      'Food & Beverage': 'Food & Beverage Manufacturing',
      'Nutrition & Functional Foods': 'Nutrition & Functional Supplements',
      'Wellness & Gut Health': 'Nutrition & Functional Supplements',
      'Beauty & Personal Care': 'Cosmetics & Personal Care',
      'Custom Applications': 'Other Industrial Application'
    };
    return mapping[value] || value;
  };

  useEffect(() => {
    if (!enquiryPreset) return;
    setIsSubmitted(false);
    const matchedOption = ENQUIRY_OPTIONS.find((opt) => opt.type === enquiryPreset.enquiryType);
    const normalizedApp = normalizeApplicationPreset(enquiryPreset.intendedApplication);
    setFormData((prev) => ({
      ...prev,
      enquiryType: matchedOption ? matchedOption.type : prev.enquiryType,
      productInterest: enquiryPreset.productInterest || prev.productInterest,
      intendedApplication: normalizedApp || prev.intendedApplication,
      requiredQuantity: enquiryPreset.requiredQuantity || (matchedOption ? matchedOption.defaultQuantity : prev.requiredQuantity)
    }));
    clearEnquiryPreset();
  }, [enquiryPreset, clearEnquiryPreset]);

  const handleSelectEnquiryOption = (option: EnquiryOptionCard) => {
    setFormData((prev) => ({
      ...prev,
      enquiryType: option.type,
      requiredQuantity: option.defaultQuantity
    }));
    setFieldErrors((prev) => ({ ...prev, enquiryType: undefined }));
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const validateForm = (state: CommercialFormState): FieldErrors => {
    const errors: FieldErrors = {};

    if (!state.fullName.trim() || state.fullName.trim().length < 2) {
      errors.fullName = 'Please enter your full name (at least 2 characters).';
    }
    if (!state.companyName.trim()) {
      errors.companyName = 'Please enter your company or organization name.';
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!state.businessEmail.trim() || !emailPattern.test(state.businessEmail.trim())) {
      errors.businessEmail = 'Please enter a valid email address.';
    }
    if (state.phone.trim()) {
      const digitsOnly = state.phone.replace(/\D/g, '');
      if (digitsOnly.length < 7 || digitsOnly.length > 16) {
        errors.phone = 'Please enter a valid phone number (7–16 digits).';
      }
    }
    if (!state.country.trim()) {
      errors.country = 'Please specify your country.';
    }
    if (!state.enquiryType) {
      errors.enquiryType = 'Please select an enquiry type.';
    }
    if (!state.productInterest.trim()) {
      errors.productInterest = 'Please select a product of interest.';
    }
    if (!state.intendedApplication.trim()) {
      errors.intendedApplication = 'Please select an intended application.';
    }
    if (!state.message.trim() || state.message.trim().length < 10) {
      errors.message = 'Please share your requirements or question (at least 10 characters).';
    }

    return errors;
  };

  const handleFieldChange = <K extends keyof CommercialFormState>(
    field: K,
    value: CommercialFormState[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (serverError) {
      setServerError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');

    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        name: formData.fullName.trim(),
        company: formData.companyName.trim(),
        country: formData.country.trim(),
        email: formData.businessEmail.trim(),
        phone: formData.phone.trim() || undefined,
        product: formData.productInterest,
        application: formData.intendedApplication,
        quantity: formData.requiredQuantity.trim() || 'To Be Discussed',
        message: `[${formData.enquiryType}] ${formData.message.trim()}`
      };

      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setServerError(data.message || 'Unable to submit enquiry. Please review your details and try again.');
        setIsLoading(false);
        return;
      }

      setSubmittedSnapshot({ ...formData });
      setIsSubmitted(true);
      setIsLoading(false);
    } catch (err) {
      console.error('Error submitting commercial enquiry:', err);
      setServerError('Connection error while submitting your enquiry. Please try again.');
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setSubmittedSnapshot(null);
    setFieldErrors({});
    setServerError('');
    setFormData({
      fullName: '',
      companyName: '',
      businessEmail: '',
      phone: '',
      country: '',
      enquiryType: 'Request a Sample',
      productInterest: 'Banana Powder (100% Pure)',
      intendedApplication: 'Food & Beverage Manufacturing',
      requiredQuantity: 'Sample Pack (1 kg – 5 kg)',
      message: ''
    });
  };

  return (
    <section
      id="commercial-enquiry"
      className="py-20 sm:py-28 bg-[#102A43] text-white relative overflow-hidden border-t border-[#B89B5E]/30"
    >
      <div id="partner-section" className="sr-only" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-14">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.22em] text-[#B89B5E] font-semibold">
            <span>Commercial Enquiry Pathway</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#FAF7F0]/80">B2B &amp; Technical Desk</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-[54px] text-[#FAF7F0] font-normal leading-[1.1] text-balance">
            Commercial Enquiry Pathway
          </h2>

          <p className="text-base sm:text-lg text-[#FAF7F0]/80 font-light leading-relaxed max-w-2xl mx-auto">
            Choose from our six commercial and technical enquiry pathways below and submit your requirements directly to our B2B team.
          </p>
        </div>

        {/* 6 Selectable Enquiry Option Cards */}
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.2em] text-[#B89B5E] font-semibold text-center">
            Select Enquiry Option (01 – 06)
          </p>

          <div
            role="radiogroup"
            aria-label="Commercial enquiry options"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {ENQUIRY_OPTIONS.map((option, idx) => {
              const Icon = option.icon;
              const isSelected = formData.enquiryType === option.type;

              return (
                <button
                  key={option.type}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => handleSelectEnquiryOption(option)}
                  className={cn(
                    'text-left p-5 rounded-sm border transition-all duration-200 cursor-pointer flex flex-col justify-between gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B89B5E]',
                    isSelected
                      ? 'bg-[#1D3B58] border-[#B89B5E] shadow-lg'
                      : 'bg-white/[0.04] border-white/15 hover:bg-white/[0.08] hover:border-white/35'
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className={cn(
                        'w-10 h-10 rounded-sm flex items-center justify-center border shrink-0 transition-colors',
                        isSelected
                          ? 'bg-[#B89B5E] text-[#102A43] border-[#B89B5E]'
                          : 'bg-[#102A43] text-[#B89B5E] border-white/15'
                      )}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span
                      className={cn(
                        'font-mono text-[11px] uppercase tracking-wider font-semibold',
                        isSelected ? 'text-[#B89B5E]' : 'text-white/55'
                      )}
                    >
                      0{idx + 1} · {isSelected ? 'Selected' : 'Select'}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-serif text-xl font-semibold text-[#FAF7F0] leading-snug">
                      {option.type}
                    </h3>
                    <p className="text-xs text-[#FAF7F0]/75 leading-relaxed font-light">
                      {option.summary}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Commercial Enquiry Form Container */}
        <div className="max-w-4xl mx-auto bg-[#FAF8F2] text-[#17202A] rounded-sm p-6 sm:p-10 lg:p-12 border border-[#B89B5E]/40 shadow-2xl">
          {isSubmitted && submittedSnapshot ? (
            <div className="text-center py-8 space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#285943]/10 text-[#285943] border border-[#285943]/30 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2 max-w-xl mx-auto">
                <span className="font-mono text-xs uppercase tracking-widest text-[#285943] font-semibold block">
                  Enquiry Logged
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-[#102A43] font-semibold">
                  Thank You, {submittedSnapshot.fullName}
                </h3>
                <p className="text-sm sm:text-base text-[#667085] leading-relaxed">
                  Your <strong className="text-[#102A43]">{submittedSnapshot.enquiryType}</strong> has been received. Our commercial and technical desk will respond to{' '}
                  <strong className="text-[#102A43]">{submittedSnapshot.businessEmail}</strong>.
                </p>
              </div>

              <div className="max-w-lg mx-auto p-5 bg-white border border-[#102A43]/10 rounded-sm text-left text-xs space-y-2.5">
                <div className="flex justify-between gap-4 border-b border-[#102A43]/10 pb-2">
                  <span className="text-[#667085]">Enquiry Type</span>
                  <span className="font-semibold text-[#102A43] text-right">
                    {submittedSnapshot.enquiryType}
                  </span>
                </div>
                <div className="flex justify-between gap-4 border-b border-[#102A43]/10 pb-2">
                  <span className="text-[#667085]">Company / Country</span>
                  <span className="font-medium text-[#102A43] text-right">
                    {submittedSnapshot.companyName} ({submittedSnapshot.country})
                  </span>
                </div>
                <div className="flex justify-between gap-4 border-b border-[#102A43]/10 pb-2">
                  <span className="text-[#667085]">Product of Interest</span>
                  <span className="font-medium text-[#285943] text-right">
                    {submittedSnapshot.productInterest}
                  </span>
                </div>
                <div className="flex justify-between gap-4 border-b border-[#102A43]/10 pb-2">
                  <span className="text-[#667085]">Intended Application</span>
                  <span className="font-medium text-[#102A43] text-right">
                    {submittedSnapshot.intendedApplication}
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-[#667085]">Required Quantity</span>
                  <span className="font-mono text-[#102A43] text-right">
                    {submittedSnapshot.requiredQuantity || 'To Be Discussed'}
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <Button variant="primary" size="md" onClick={handleReset}>
                  Submit Another Enquiry
                </Button>
              </div>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-6">
              <div className="border-b border-[#102A43]/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#102A43] font-semibold">
                    Commercial Enquiry Form
                  </h3>
                  <p className="text-xs sm:text-sm text-[#667085] mt-0.5">
                    Fields marked with * are required.
                  </p>
                </div>
                <span className="font-mono text-xs text-[#285943] font-semibold">
                  {formData.enquiryType}
                </span>
              </div>

              {serverError && (
                <div
                  role="alert"
                  className="p-3.5 bg-red-50 border border-red-200 text-xs text-red-700 rounded-sm font-medium flex items-center gap-2"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{serverError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="enquiry-full-name"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#102A43] mb-1.5"
                  >
                    Full Name *
                  </label>
                  <input
                    id="enquiry-full-name"
                    type="text"
                    required
                    aria-invalid={Boolean(fieldErrors.fullName)}
                    value={formData.fullName}
                    onChange={(e) => handleFieldChange('fullName', e.target.value)}
                    placeholder="Enter your full name"
                    className={cn(
                      'w-full px-4 py-3 bg-white border rounded-sm text-sm text-[#17202A] placeholder-[#667085]/60 focus:outline-none focus:ring-2 focus:ring-[#102A43]/20',
                      fieldErrors.fullName ? 'border-red-500' : 'border-[#102A43]/20 focus:border-[#102A43]'
                    )}
                  />
                  {fieldErrors.fullName && (
                    <p className="mt-1 text-xs text-red-600">{fieldErrors.fullName}</p>
                  )}
                </div>

                {/* Company Name */}
                <div>
                  <label
                    htmlFor="enquiry-company-name"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#102A43] mb-1.5"
                  >
                    Company Name *
                  </label>
                  <div className="relative">
                    <input
                      id="enquiry-company-name"
                      type="text"
                      required
                      aria-invalid={Boolean(fieldErrors.companyName)}
                      value={formData.companyName}
                      onChange={(e) => handleFieldChange('companyName', e.target.value)}
                      placeholder="Enter your company name"
                      className={cn(
                        'w-full pl-4 pr-10 py-3 bg-white border rounded-sm text-sm text-[#17202A] placeholder-[#667085]/60 focus:outline-none focus:ring-2 focus:ring-[#102A43]/20',
                        fieldErrors.companyName ? 'border-red-500' : 'border-[#102A43]/20 focus:border-[#102A43]'
                      )}
                    />
                    <Building2 className="w-4 h-4 text-[#667085] absolute right-3.5 top-3.5 pointer-events-none" />
                  </div>
                  {fieldErrors.companyName && (
                    <p className="mt-1 text-xs text-red-600">{fieldErrors.companyName}</p>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label
                    htmlFor="enquiry-email"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#102A43] mb-1.5"
                  >
                    Email Address *
                  </label>
                  <div className="relative">
                    <input
                      id="enquiry-email"
                      type="email"
                      required
                      aria-invalid={Boolean(fieldErrors.businessEmail)}
                      value={formData.businessEmail}
                      onChange={(e) => handleFieldChange('businessEmail', e.target.value)}
                      placeholder="name@company.com"
                      className={cn(
                        'w-full pl-4 pr-10 py-3 bg-white border rounded-sm text-sm text-[#17202A] placeholder-[#667085]/60 focus:outline-none focus:ring-2 focus:ring-[#102A43]/20',
                        fieldErrors.businessEmail ? 'border-red-500' : 'border-[#102A43]/20 focus:border-[#102A43]'
                      )}
                    />
                    <Mail className="w-4 h-4 text-[#667085] absolute right-3.5 top-3.5 pointer-events-none" />
                  </div>
                  {fieldErrors.businessEmail && (
                    <p className="mt-1 text-xs text-red-600">{fieldErrors.businessEmail}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label
                    htmlFor="enquiry-phone"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#102A43] mb-1.5"
                  >
                    Phone Number
                  </label>
                  <div className="relative">
                    <input
                      id="enquiry-phone"
                      type="tel"
                      aria-invalid={Boolean(fieldErrors.phone)}
                      value={formData.phone}
                      onChange={(e) => handleFieldChange('phone', e.target.value)}
                      placeholder="+91 98765 43210"
                      className={cn(
                        'w-full pl-4 pr-10 py-3 bg-white border rounded-sm text-sm text-[#17202A] placeholder-[#667085]/60 focus:outline-none focus:ring-2 focus:ring-[#102A43]/20',
                        fieldErrors.phone ? 'border-red-500' : 'border-[#102A43]/20 focus:border-[#102A43]'
                      )}
                    />
                    <Phone className="w-4 h-4 text-[#667085] absolute right-3.5 top-3.5 pointer-events-none" />
                  </div>
                  {fieldErrors.phone && (
                    <p className="mt-1 text-xs text-red-600">{fieldErrors.phone}</p>
                  )}
                </div>

                {/* Country */}
                <div>
                  <label
                    htmlFor="enquiry-country"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#102A43] mb-1.5"
                  >
                    Country *
                  </label>
                  <div className="relative">
                    <input
                      id="enquiry-country"
                      type="text"
                      required
                      aria-invalid={Boolean(fieldErrors.country)}
                      value={formData.country}
                      onChange={(e) => handleFieldChange('country', e.target.value)}
                      placeholder="e.g. India, UAE, Germany, United States"
                      className={cn(
                        'w-full pl-4 pr-10 py-3 bg-white border rounded-sm text-sm text-[#17202A] placeholder-[#667085]/60 focus:outline-none focus:ring-2 focus:ring-[#102A43]/20',
                        fieldErrors.country ? 'border-red-500' : 'border-[#102A43]/20 focus:border-[#102A43]'
                      )}
                    />
                    <Globe className="w-4 h-4 text-[#667085] absolute right-3.5 top-3.5 pointer-events-none" />
                  </div>
                  {fieldErrors.country && (
                    <p className="mt-1 text-xs text-red-600">{fieldErrors.country}</p>
                  )}
                </div>

                {/* Enquiry Type */}
                <div>
                  <label
                    htmlFor="enquiry-type"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#102A43] mb-1.5"
                  >
                    Enquiry Type *
                  </label>
                  <select
                    id="enquiry-type"
                    required
                    value={formData.enquiryType}
                    onChange={(e) =>
                      handleFieldChange('enquiryType', e.target.value as EnquiryTypeOption)
                    }
                    className="w-full px-4 py-3 bg-white border border-[#102A43]/20 rounded-sm text-sm text-[#17202A] focus:outline-none focus:border-[#102A43] focus:ring-2 focus:ring-[#102A43]/20"
                  >
                    {ENQUIRY_OPTIONS.map((opt) => (
                      <option key={opt.type} value={opt.type}>
                        {opt.type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Product of Interest */}
                <div>
                  <label
                    htmlFor="enquiry-product"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#102A43] mb-1.5"
                  >
                    Product of Interest *
                  </label>
                  <select
                    id="enquiry-product"
                    required
                    value={formData.productInterest}
                    onChange={(e) => handleFieldChange('productInterest', e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-[#102A43]/20 rounded-sm text-sm text-[#17202A] focus:outline-none focus:border-[#102A43] focus:ring-2 focus:ring-[#102A43]/20"
                  >
                    <option value="Banana Powder (100% Pure)">Banana Powder (100% Pure)</option>
                    <option value="Food-Grade Banana Powder">Food-Grade Banana Powder</option>
                    <option value="Cosmetic-Grade Banana Powder">Cosmetic-Grade Banana Powder</option>
                    <option value="Pharmaceutical-Grade Banana Powder">Pharmaceutical-Grade Banana Powder</option>
                    <option value="TerraVance — Agricultural Value & Food-Grade Ingredients">
                      TerraVance — Agricultural Value &amp; Food-Grade Ingredients
                    </option>
                    <option value="Other / General Botanical Inquiry">Other / General Botanical Inquiry</option>
                  </select>
                </div>

                {/* Intended Application */}
                <div>
                  <label
                    htmlFor="enquiry-application"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#102A43] mb-1.5"
                  >
                    Intended Application *
                  </label>
                  <select
                    id="enquiry-application"
                    required
                    value={formData.intendedApplication}
                    onChange={(e) => handleFieldChange('intendedApplication', e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-[#102A43]/20 rounded-sm text-sm text-[#17202A] focus:outline-none focus:border-[#102A43] focus:ring-2 focus:ring-[#102A43]/20"
                  >
                    {INTENDED_APPLICATIONS.map((app) => (
                      <option key={app} value={app}>
                        {app}
                      </option>
                    ))}
                  </select>
                  {fieldErrors.intendedApplication && (
                    <p className="mt-1 text-xs text-red-600">{fieldErrors.intendedApplication}</p>
                  )}
                </div>

                {/* Required Quantity */}
                <div>
                  <label
                    htmlFor="enquiry-quantity"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#102A43] mb-1.5"
                  >
                    Required Quantity
                  </label>
                  <input
                    id="enquiry-quantity"
                    type="text"
                    value={formData.requiredQuantity}
                    onChange={(e) => handleFieldChange('requiredQuantity', e.target.value)}
                    placeholder="e.g. 5 kg sample, 500 kg, 2 MT"
                    className="w-full px-4 py-3 bg-white border border-[#102A43]/20 rounded-sm text-sm text-[#17202A] placeholder-[#667085]/60 focus:outline-none focus:border-[#102A43] focus:ring-2 focus:ring-[#102A43]/20"
                  />
                </div>
              </div>

              {/* Message / Additional Requirements */}
              <div>
                <label
                  htmlFor="enquiry-message"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#102A43] mb-1.5"
                >
                  Additional Message / Requirements *
                </label>
                <textarea
                  id="enquiry-message"
                  rows={4}
                  required
                  aria-invalid={Boolean(fieldErrors.message)}
                  value={formData.message}
                  onChange={(e) => handleFieldChange('message', e.target.value)}
                  placeholder="Share details on target application, packaging preference, delivery destination, or technical questions..."
                  className={cn(
                    'w-full px-4 py-3 bg-white border rounded-sm text-sm text-[#17202A] placeholder-[#667085]/60 focus:outline-none focus:ring-2 focus:ring-[#102A43]/20',
                    fieldErrors.message ? 'border-red-500' : 'border-[#102A43]/20 focus:border-[#102A43]'
                  )}
                />
                {fieldErrors.message && (
                  <p className="mt-1 text-xs text-red-600">{fieldErrors.message}</p>
                )}
              </div>

              {/* Submit Bar */}
              <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#102A43]/10">
                <div className="flex items-start gap-2 text-xs text-[#667085]">
                  <ShieldCheck className="w-4 h-4 text-[#285943] shrink-0 mt-0.5" />
                  <span>
                    Confidential B2B handling. By submitting, you acknowledge our{' '}
                    <Link href="/privacy-policy" className="text-[#102A43] underline hover:text-[#285943] font-medium">
                      Privacy Policy
                    </Link>{' '}
                    and{' '}
                    <Link href="/terms-and-conditions" className="text-[#102A43] underline hover:text-[#285943] font-medium">
                      Terms &amp; Conditions
                    </Link>
                    .
                  </span>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={isLoading}
                  showArrow={!isLoading}
                  className="w-full sm:w-auto tracking-wider text-xs font-bold uppercase min-w-[200px] min-h-[46px]"
                >
                  {isLoading ? 'Submitting...' : 'Submit Enquiry'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
