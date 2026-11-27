import React, { useState } from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Button } from '../components/ui/Button';
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  MessageCircle
} from 'lucide-react';
import { COMPANY_INFO } from '../data/company';
import { Link, useRouter } from '../context/RouterContext';
import {
  ENQUIRY_OPTIONS,
  EnquiryTypeOption,
  INTENDED_APPLICATIONS
} from '../components/sections/PartnerSection';
import { cn } from '../lib/utils';

interface ContactFormState {
  enquiryMode: EnquiryTypeOption;
  name: string;
  company: string;
  email: string;
  country: string;
  phone: string;
  product: string;
  quantity: string;
  application: string;
  message: string;
}

type ContactErrors = Partial<Record<keyof ContactFormState, string>>;

export function ContactPage() {
  const { navigateToEnquiry } = useRouter();

  const [formData, setFormData] = useState<ContactFormState>({
    enquiryMode: 'Request a Sample',
    name: '',
    company: '',
    email: '',
    country: '',
    phone: '',
    product: 'Banana Powder (100% Pure)',
    quantity: 'Sample Pack (1 kg – 5 kg)',
    application: 'Food & Beverage Manufacturing',
    message: ''
  });

  const [fieldErrors, setFieldErrors] = useState<ContactErrors>({});
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedSnapshot, setSubmittedSnapshot] = useState<ContactFormState | null>(null);

  const whatsappDigits = COMPANY_INFO.location.whatsapp
    ? COMPANY_INFO.location.whatsapp.replace(/[^\d]/g, '')
    : '';

  const handleModeSwitch = (mode: EnquiryTypeOption) => {
    setIsSubmitted(false);
    const matched = ENQUIRY_OPTIONS.find((opt) => opt.type === mode);
    setFormData((prev) => ({
      ...prev,
      enquiryMode: mode,
      quantity: matched ? matched.defaultQuantity : prev.quantity
    }));
  };

  const handleFieldChange = <K extends keyof ContactFormState>(
    field: K,
    value: ContactFormState[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (serverError) {
      setServerError('');
    }
  };

  const validate = (state: ContactFormState): ContactErrors => {
    const errors: ContactErrors = {};
    if (!state.name.trim() || state.name.trim().length < 2) {
      errors.name = 'Please enter your name (at least 2 characters).';
    }
    if (!state.company.trim()) {
      errors.company = 'Please enter your company name.';
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!state.email.trim() || !emailPattern.test(state.email.trim())) {
      errors.email = 'Please enter a valid business email.';
    }
    if (!state.country.trim()) {
      errors.country = 'Please specify your country.';
    }
    if (state.phone.trim()) {
      const digitsOnly = state.phone.replace(/\D/g, '');
      if (digitsOnly.length < 7 || digitsOnly.length > 16) {
        errors.phone = 'Please enter a valid phone number (7–16 digits).';
      }
    }
    if (!state.message.trim() || state.message.trim().length < 10) {
      errors.message = 'Please enter your message (at least 10 characters).';
    }
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');

    const errors = validate(formData);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        name: formData.name.trim(),
        company: formData.company.trim(),
        country: formData.country.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        product: formData.product,
        application: formData.application,
        quantity: formData.quantity.trim() || 'To Be Discussed',
        message: `[${formData.enquiryMode}] ${formData.message.trim()}`
      };

      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
    } catch {
      setServerError('Connection error while submitting your message. Please try again.');
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setSubmittedSnapshot(null);
    setFieldErrors({});
    setServerError('');
    setFormData({
      enquiryMode: 'Request a Sample',
      name: '',
      company: '',
      email: '',
      country: '',
      phone: '',
      product: 'Banana Powder (100% Pure)',
      quantity: 'Sample Pack (1 kg – 5 kg)',
      application: 'Food & Beverage Manufacturing',
      message: ''
    });
  };

  return (
    <PageWrapper
      title="Contact Us | Bhuvi Q Nyra International Private Limited"
      description="Connect with Bhuvi Q Nyra International Private Limited for sample requests, product enquiries, and international B2B ingredient supply."
    >
      {/* Hero */}
      <section className="relative bg-[#102A43] text-white pt-32 pb-20 sm:pt-40 sm:pb-24 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#B89B5E] text-xs font-semibold uppercase tracking-widest border border-[#B89B5E]/30">
            <span>Domestic &amp; International Commercial Desk</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.1] text-[#FAF7F0]">
            Contact <span className="italic font-light">Bhuvi Q Nyra</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-xl text-[#FAF7F0]/85 font-light leading-relaxed">
            Reach our commercial, export, and technical quality teams for product samples, specifications, bulk supply quotations, and general business enquiries.
          </p>

          {/* Direct Action Modes: 6 Commercial Enquiry Pathway Options */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5 max-w-4xl mx-auto">
            {ENQUIRY_OPTIONS.map((opt) => {
              const Icon = opt.icon;
              const isActive = formData.enquiryMode === opt.type;
              return (
                <React.Fragment key={opt.type}>
                  <Button
                    variant={isActive ? 'gold' : 'outline-light'}
                    size="sm"
                    icon={<Icon className="w-4 h-4" />}
                    onClick={() => handleModeSwitch(opt.type)}
                  >
                    {opt.type}
                  </Button>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-16 sm:py-20 bg-[#FAF8F2] text-[#17202A] border-b border-[#102A43]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Left: Verified Corporate Coordinates */}
          <div className="lg:col-span-5 space-y-7">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-widest text-[#285943] font-bold">
                Verified Corporate Entity
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#102A43] font-semibold">
                {COMPANY_INFO.legalName}
              </h2>
              <p className="text-sm text-[#667085] leading-relaxed font-light">
                {COMPANY_INFO.location.country} — supplying standardized banana-based ingredients for food, nutrition, cosmetic, and pharmaceutical manufacturers worldwide.
              </p>
            </div>

            {/* Verified Coordinates (Conditional for unpublished phone/email/WhatsApp) */}
            <div className="space-y-4 pt-4 border-t border-[#102A43]/10 text-sm">
              <div className="flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-[#285943] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#667085] block">Registered Location</span>
                  <p className="text-[#102A43] font-medium">
                    {COMPANY_INFO.location.corporateOffice}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Mail className="w-5 h-5 text-[#285943] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#667085] block">Business Email</span>
                  {COMPANY_INFO.location.email ? (
                    <a href={`mailto:${COMPANY_INFO.location.email}`} className="font-semibold text-[#102A43] hover:text-[#285943]">
                      {COMPANY_INFO.location.email}
                    </a>
                  ) : (
                    <p className="text-[#667085] text-xs leading-relaxed">
                      Direct corporate email pending official publication. All enquiries submitted via this form are logged directly into our commercial backend.
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Phone className="w-5 h-5 text-[#285943] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#667085] block">Telephone Desk</span>
                  {COMPANY_INFO.location.phone ? (
                    <a href={`tel:${COMPANY_INFO.location.phone}`} className="font-semibold text-[#102A43] hover:text-[#285943]">
                      {COMPANY_INFO.location.phone}
                    </a>
                  ) : (
                    <p className="text-[#667085] text-xs leading-relaxed">
                      Official phone line pending publication.
                    </p>
                  )}
                </div>
              </div>

              {whatsappDigits && (
                <div className="flex items-start gap-3.5">
                  <MessageCircle className="w-5 h-5 text-[#285943] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#667085] block">WhatsApp Business</span>
                    <a
                      href={`https://wa.me/${whatsappDigits}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-semibold text-[#285943] hover:underline"
                    >
                      <span>Message on WhatsApp</span>
                    </a>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3.5">
                <Clock className="w-5 h-5 text-[#285943] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#667085] block">Operating Hours</span>
                  <p className="text-[#102A43]">{COMPANY_INFO.location.operatingHours}</p>
                </div>
              </div>
            </div>

            {/* Dedicated Commercial Pathways */}
            <div className="p-6 bg-white border border-[#102A43]/10 rounded-sm space-y-4 shadow-xs">
              <h4 className="font-serif text-xl text-[#102A43] font-semibold">
                Buyer Pathways Supported
              </h4>
              <div className="space-y-2.5 text-xs text-[#667085]">
                <p>• <strong className="text-[#102A43]">Food &amp; Processing Manufacturers:</strong> R&amp;D samples, mesh specs, and scheduled supply.</p>
                <p>• <strong className="text-[#102A43]">Importers, Exporters &amp; Distributors:</strong> Barrier drum/bag formats and export dossiers.</p>
                <p>• <strong className="text-[#102A43]">Cosmetic &amp; Pharmaceutical Buyers:</strong> Quality documentation and lot-specific CoAs.</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  navigateToEnquiry({
                    enquiryType: 'Request a Sample',
                    productInterest: 'Banana Powder (100% Pure)',
                    requiredQuantity: 'Sample Pack (1 kg – 5 kg)'
                  })
                }
                showArrow
              >
                Open Full Partner Portal
              </Button>
            </div>
          </div>

          {/* Right: Complete B2B Contact & Enquiry Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 border border-[#102A43]/15 rounded-sm shadow-md">
            {isSubmitted && submittedSnapshot ? (
              <div className="text-center py-10 space-y-5">
                <div className="w-14 h-14 rounded-full bg-[#285943]/10 text-[#285943] border border-[#285943]/30 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div className="space-y-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#285943] font-semibold block">
                    Enquiry Logged
                  </span>
                  <h3 className="font-serif text-3xl text-[#102A43] font-semibold">
                    Thank You, {submittedSnapshot.name}
                  </h3>
                  <p className="text-sm text-[#667085] max-w-md mx-auto">
                    Your <strong className="text-[#102A43]">{submittedSnapshot.enquiryMode}</strong> for{' '}
                    <strong className="text-[#102A43]">{submittedSnapshot.product}</strong> has been received. Our team will respond to{' '}
                    <strong className="text-[#102A43]">{submittedSnapshot.email}</strong>.
                  </p>
                </div>
                <Button variant="primary" onClick={handleReset}>
                  Send Another Enquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="space-y-3 border-b border-[#102A43]/10 pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="font-serif text-2xl text-[#102A43] font-semibold">
                        {formData.enquiryMode}
                      </h3>
                      <p className="text-xs text-[#667085] mt-0.5">
                        Fields marked with * are required.
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1.5">
                    {ENQUIRY_OPTIONS.map((opt) => (
                      <button
                        key={opt.type}
                        type="button"
                        onClick={() => handleModeSwitch(opt.type)}
                        className={cn(
                          'px-2.5 py-2 rounded-sm text-[11px] font-semibold transition-colors cursor-pointer border text-left',
                          formData.enquiryMode === opt.type
                            ? 'bg-[#102A43] text-white border-[#102A43]'
                            : 'bg-[#FAF8F2] text-[#102A43] border-[#102A43]/15 hover:border-[#285943]'
                        )}
                      >
                        {opt.type}
                      </button>
                    ))}
                  </div>
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-semibold uppercase tracking-wider text-[#102A43] mb-1">
                      Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => handleFieldChange('name', e.target.value)}
                      placeholder="Enter your full name"
                      className={cn(
                        'w-full px-4 py-2.5 bg-[#FAF8F2] border rounded-sm text-sm focus:outline-none focus:border-[#102A43]',
                        fieldErrors.name ? 'border-red-500' : 'border-[#102A43]/20'
                      )}
                    />
                    {fieldErrors.name && <p className="mt-1 text-xs text-red-600">{fieldErrors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="contact-company" className="block text-xs font-semibold uppercase tracking-wider text-[#102A43] mb-1">
                      Company Name *
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => handleFieldChange('company', e.target.value)}
                      placeholder="Your organization name"
                      className={cn(
                        'w-full px-4 py-2.5 bg-[#FAF8F2] border rounded-sm text-sm focus:outline-none focus:border-[#102A43]',
                        fieldErrors.company ? 'border-red-500' : 'border-[#102A43]/20'
                      )}
                    />
                    {fieldErrors.company && <p className="mt-1 text-xs text-red-600">{fieldErrors.company}</p>}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-semibold uppercase tracking-wider text-[#102A43] mb-1">
                      Business Email *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleFieldChange('email', e.target.value)}
                      placeholder="name@company.com"
                      className={cn(
                        'w-full px-4 py-2.5 bg-[#FAF8F2] border rounded-sm text-sm focus:outline-none focus:border-[#102A43]',
                        fieldErrors.email ? 'border-red-500' : 'border-[#102A43]/20'
                      )}
                    />
                    {fieldErrors.email && <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="contact-country" className="block text-xs font-semibold uppercase tracking-wider text-[#102A43] mb-1">
                      Country *
                    </label>
                    <input
                      id="contact-country"
                      type="text"
                      required
                      value={formData.country}
                      onChange={(e) => handleFieldChange('country', e.target.value)}
                      placeholder="e.g. India, UAE, Germany, USA"
                      className={cn(
                        'w-full px-4 py-2.5 bg-[#FAF8F2] border rounded-sm text-sm focus:outline-none focus:border-[#102A43]',
                        fieldErrors.country ? 'border-red-500' : 'border-[#102A43]/20'
                      )}
                    />
                    {fieldErrors.country && <p className="mt-1 text-xs text-red-600">{fieldErrors.country}</p>}
                  </div>

                  <div>
                    <label htmlFor="contact-phone" className="block text-xs font-semibold uppercase tracking-wider text-[#102A43] mb-1">
                      Phone Number
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleFieldChange('phone', e.target.value)}
                      placeholder="+91 98765 43210"
                      className={cn(
                        'w-full px-4 py-2.5 bg-[#FAF8F2] border rounded-sm text-sm focus:outline-none focus:border-[#102A43]',
                        fieldErrors.phone ? 'border-red-500' : 'border-[#102A43]/20'
                      )}
                    />
                    {fieldErrors.phone && <p className="mt-1 text-xs text-red-600">{fieldErrors.phone}</p>}
                  </div>

                  <div>
                    <label htmlFor="contact-product" className="block text-xs font-semibold uppercase tracking-wider text-[#102A43] mb-1">
                      Product of Interest
                    </label>
                    <select
                      id="contact-product"
                      value={formData.product}
                      onChange={(e) => handleFieldChange('product', e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#FAF8F2] border border-[#102A43]/20 rounded-sm text-sm focus:outline-none focus:border-[#102A43]"
                    >
                      <option value="Banana Powder (100% Pure)">Banana Powder (100% Pure)</option>
                      <option value="Food-Grade Banana Powder">Food-Grade Banana Powder</option>
                      <option value="Cosmetic-Grade Banana Powder">Cosmetic-Grade Banana Powder</option>
                      <option value="Pharmaceutical-Grade Banana Powder">Pharmaceutical-Grade Banana Powder</option>
                      <option value="Other / General Business Inquiry">Other / General Business Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-quantity" className="block text-xs font-semibold uppercase tracking-wider text-[#102A43] mb-1">
                      Required Quantity
                    </label>
                    <input
                      id="contact-quantity"
                      type="text"
                      value={formData.quantity}
                      onChange={(e) => handleFieldChange('quantity', e.target.value)}
                      placeholder="e.g. 5 kg sample, 500 kg, 2 MT"
                      className="w-full px-4 py-2.5 bg-[#FAF8F2] border border-[#102A43]/20 rounded-sm text-sm focus:outline-none focus:border-[#102A43]"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-application" className="block text-xs font-semibold uppercase tracking-wider text-[#102A43] mb-1">
                      Intended Application
                    </label>
                    <select
                      id="contact-application"
                      value={formData.application}
                      onChange={(e) => handleFieldChange('application', e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#FAF8F2] border border-[#102A43]/20 rounded-sm text-sm focus:outline-none focus:border-[#102A43]"
                    >
                      {INTENDED_APPLICATIONS.map((app) => (
                        <option key={app} value={app}>
                          {app}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-semibold uppercase tracking-wider text-[#102A43] mb-1">
                    Additional Message *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => handleFieldChange('message', e.target.value)}
                    placeholder="Share your target formulation, packaging requirements, destination port, or technical questions..."
                    className={cn(
                      'w-full px-4 py-2.5 bg-[#FAF8F2] border rounded-sm text-sm focus:outline-none focus:border-[#102A43]',
                      fieldErrors.message ? 'border-red-500' : 'border-[#102A43]/20'
                    )}
                  />
                  {fieldErrors.message && <p className="mt-1 text-xs text-red-600">{fieldErrors.message}</p>}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#102A43]/10">
                  <div className="flex items-start gap-2 text-xs text-[#667085]">
                    <ShieldCheck className="w-4 h-4 text-[#285943] shrink-0 mt-0.5" />
                    <span>
                      Protected under our{' '}
                      <Link href="/privacy-policy" className="text-[#102A43] underline hover:text-[#285943] font-medium">
                        Privacy Policy
                      </Link>
                      .
                    </span>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    isLoading={isLoading}
                    showArrow={!isLoading}
                    className="w-full sm:w-auto min-h-[44px]"
                  >
                    {isLoading ? 'Submitting...' : 'Submit Enquiry'}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
