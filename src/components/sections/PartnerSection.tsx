import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { CheckCircle2, Sparkles, Building2, Globe, Mail, Phone, Package, Send, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { EnquiryFormData } from '../../types';

export function PartnerSection() {
  const [formData, setFormData] = useState<EnquiryFormData>({
    fullName: '',
    companyName: '',
    country: '',
    businessEmail: '',
    phone: '',
    productInterest: 'Banana Powder (100% Pure Standard)',
    targetApplication: 'Food & Beverage',
    quantityRequirement: 'Pilot Formulation (25kg - 100kg)',
    message: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedData, setSubmittedData] = useState<EnquiryFormData | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Pre-flight check
    if (!formData.fullName.trim()) {
      setErrorMessage('Name is required');
      return;
    }
    if (!formData.companyName.trim()) {
      setErrorMessage('Company name is required');
      return;
    }
    if (!formData.country.trim()) {
      setErrorMessage('Country is required');
      return;
    }
    if (!formData.businessEmail.trim()) {
      setErrorMessage('Email is required');
      return;
    }
    if (!formData.message.trim()) {
      setErrorMessage('Message is required. Please provide your formulation requirements or inquiry details.');
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
        product: formData.productInterest || undefined,
        application: formData.targetApplication || undefined,
        quantity: formData.quantityRequirement || undefined,
        message: formData.message.trim(),
      };

      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setErrorMessage(data.message || 'Something went wrong. Please try again.');
        setIsLoading(false);
        return;
      }

      setSubmittedData({ ...formData });
      setIsSubmitted(true);
      setIsLoading(false);

      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#102A43', '#285943', '#B89B5E']
        });
      } catch {
        // Fallback
      }
    } catch (err) {
      console.error('Error submitting enquiry:', err);
      setErrorMessage('Something went wrong. Please try again.');
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setSubmittedData(null);
    setFormData({
      fullName: '',
      companyName: '',
      country: '',
      businessEmail: '',
      phone: '',
      productInterest: 'Banana Powder (100% Pure Standard 60 to 100 Mesh)',
      targetApplication: 'Food & Beverage (Bakery, Snacks, Beverages)',
      quantityRequirement: 'Commercial Supply (500kg - 2,000kg)',
      message: ''
    });
  };

  return (
    <section id="partner-section" className="py-24 sm:py-32 bg-[#102A43] text-white relative overflow-hidden border-t border-[#B89B5E]/30">
      {/* Background Ambience */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FAF7F0_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />
      <div className="absolute -bottom-24 right-0 w-[500px] h-[500px] bg-[#285943]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#B89B5E] text-xs font-semibold uppercase tracking-widest border border-[#B89B5E]/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>B2B Commercial Engagement</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#FAF7F0] font-normal leading-tight">
            Let's Create Something From Nature.
          </h2>
          <p className="text-base sm:text-lg text-[#FAF7F0]/80 font-light leading-relaxed max-w-2xl mx-auto">
            Tell us what you're looking for. Our team will work with you to understand your ingredient, particle distribution, and application requirements.
          </p>
        </div>

        {/* Form Box */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="max-w-4xl mx-auto bg-[#FAF8F2] text-[#17202A] rounded-sm p-8 sm:p-12 border border-[#B89B5E]/40 shadow-2xl"
        >
          {isSubmitted ? (
            <div className="text-center py-10 space-y-6 animate-in fade-in duration-300">
              <div className="w-20 h-20 rounded-full bg-[#285943]/10 text-[#285943] border border-[#285943]/30 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-3 max-w-lg mx-auto">
                <h3 className="font-serif text-3xl sm:text-4xl text-[#102A43] font-semibold">
                  Thank You
                </h3>
                <p className="text-base text-[#285943] font-medium leading-relaxed">
                  Your enquiry has been received successfully. Our team will get back to you.
                </p>
                <p className="text-xs text-[#667085] leading-relaxed">
                  A confirmation has been logged for <strong className="text-[#102A43]">{submittedData?.businessEmail || formData.businessEmail}</strong>. Our corporate account manager will review your technical specifications.
                </p>

                <div className="p-4 bg-white border border-[#102A43]/10 rounded-sm text-left text-xs space-y-2 mt-4">
                  <div className="flex justify-between border-b border-[#102A43]/5 pb-1.5">
                    <span className="text-[#667085]">Company / Region:</span>
                    <span className="font-medium text-[#102A43]">{submittedData?.companyName || formData.companyName} ({submittedData?.country || formData.country})</span>
                  </div>
                  <div className="flex justify-between border-b border-[#102A43]/5 pb-1.5">
                    <span className="text-[#667085]">Requirement Volume:</span>
                    <span className="text-[#285943] font-medium">{submittedData?.quantityRequirement || formData.quantityRequirement}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#667085]">Next Step:</span>
                    <span className="text-[#102A43]">Direct Technical Dossier & Quotation</span>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button variant="primary" onClick={handleReset}>
                  Submit Another Enquiry
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b border-[#102A43]/10 pb-4 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-2xl text-[#102A43] font-semibold">
                    Commercial & Technical Enquiry Form
                  </h3>
                  <p className="text-xs text-[#667085] mt-0.5">
                    Please provide detailed parameters to expedite technical review.
                  </p>
                </div>
                <span className="text-[10px] font-mono text-[#285943] bg-[#285943]/10 px-2 py-1 rounded">
                  B2B Direct
                </span>
              </div>

              {errorMessage && (
                <div className="p-3.5 bg-red-50 border border-red-200 text-xs text-red-700 rounded-sm font-medium">
                  {errorMessage}
                </div>
              )}

              {/* Grid Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#102A43] mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Marcus Richter"
                    className="w-full px-4 py-3 bg-white border border-[#102A43]/20 rounded-sm text-sm text-[#17202A] placeholder-[#667085]/60 focus:outline-none focus:border-[#102A43]"
                  />
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#102A43] mb-1.5">
                    Company Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="e.g. Apex Nutrition AG"
                      className="w-full pl-4 pr-10 py-3 bg-white border border-[#102A43]/20 rounded-sm text-sm text-[#17202A] placeholder-[#667085]/60 focus:outline-none focus:border-[#102A43]"
                    />
                    <Building2 className="w-4 h-4 text-[#667085] absolute right-3.5 top-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* Country */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#102A43] mb-1.5">
                    Country / Region *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      placeholder="e.g. Switzerland, United States, Japan"
                      className="w-full pl-4 pr-10 py-3 bg-white border border-[#102A43]/20 rounded-sm text-sm text-[#17202A] placeholder-[#667085]/60 focus:outline-none focus:border-[#102A43]"
                    />
                    <Globe className="w-4 h-4 text-[#667085] absolute right-3.5 top-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* Business Email */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#102A43] mb-1.5">
                    Business Email *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={formData.businessEmail}
                      onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
                      placeholder="marcus@apexnutrition.ch"
                      className="w-full pl-4 pr-10 py-3 bg-white border border-[#102A43]/20 rounded-sm text-sm text-[#17202A] placeholder-[#667085]/60 focus:outline-none focus:border-[#102A43]"
                    />
                    <Mail className="w-4 h-4 text-[#667085] absolute right-3.5 top-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#102A43] mb-1.5">
                    Phone / Mobile
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+41 22 123 4567"
                      className="w-full pl-4 pr-10 py-3 bg-white border border-[#102A43]/20 rounded-sm text-sm text-[#17202A] placeholder-[#667085]/60 focus:outline-none focus:border-[#102A43]"
                    />
                    <Phone className="w-4 h-4 text-[#667085] absolute right-3.5 top-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* Ingredient / Product */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#102A43] mb-1.5">
                    Ingredient / Product
                  </label>
                  <select
                    value={formData.productInterest}
                    onChange={(e) => setFormData({ ...formData, productInterest: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-[#102A43]/20 rounded-sm text-sm text-[#17202A] focus:outline-none focus:border-[#102A43]"
                  >
                    <option value="Banana Powder (100% Pure Standard 60 to 100 Mesh)">Banana Powder (100% Pure Standard 60 to 100 Mesh)</option>
                    <option value="Banana Powder (Fine Micronized 100+ Mesh)">Banana Powder (Fine Micronized 100+ Mesh)</option>
                    <option value="Custom Agricultural Co-Product Inquiry">Custom Agricultural Co-Product Inquiry</option>
                    <option value="Future Ingredient Platform Collaboration">Future Ingredient Platform Collaboration</option>
                  </select>
                </div>

                {/* Application */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#102A43] mb-1.5">
                    Application
                  </label>
                  <select
                    value={formData.targetApplication}
                    onChange={(e) => setFormData({ ...formData, targetApplication: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-[#102A43]/20 rounded-sm text-sm text-[#17202A] focus:outline-none focus:border-[#102A43]"
                  >
                    <option value="Food & Beverage (Bakery, Snacks, Beverages)">Food & Beverage (Bakery, Snacks, Beverages)</option>
                    <option value="Nutrition & Functional Supplements">Nutrition & Functional Supplements</option>
                    <option value="Wellness & Gut Health Formulas">Wellness & Gut Health Formulas</option>
                    <option value="Beauty & Clean Cosmetics">Beauty & Clean Cosmetics</option>
                    <option value="Industrial Food Processing Premixes">Industrial Food Processing Premixes</option>
                  </select>
                </div>

                {/* Quantity Requirement */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#102A43] mb-1.5">
                    Quantity Requirement
                  </label>
                  <select
                    value={formData.quantityRequirement}
                    onChange={(e) => setFormData({ ...formData, quantityRequirement: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-[#102A43]/20 rounded-sm text-sm text-[#17202A] focus:outline-none focus:border-[#102A43]"
                  >
                    <option value="Pilot Batch (25kg - 250kg)">Pilot Batch (25kg - 250kg)</option>
                    <option value="Commercial Supply (500kg - 2,000kg)">Commercial Supply (500kg - 2,000kg)</option>
                    <option value="Full Container / Annual Supply Contract (5MT+)">Full Container / Annual Supply Contract (5MT+)</option>
                    <option value="Custom Contract Formulation">Custom Contract Formulation</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#102A43] mb-1.5">
                  Message / Formulation Specifications *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share details on target product, regulatory standards required, or preferred delivery timeline..."
                  className="w-full px-4 py-3 bg-white border border-[#102A43]/20 rounded-sm text-sm text-[#17202A] placeholder-[#667085]/60 focus:outline-none focus:border-[#102A43]"
                />
              </div>

              {/* Submission Button */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-[#667085]">
                  <ShieldCheck className="w-4 h-4 text-[#285943]" />
                  <span>B2B Commercial Confidentiality Guaranteed</span>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={isLoading}
                  showArrow={!isLoading}
                  className="w-full sm:w-auto tracking-widest text-xs font-bold uppercase min-w-[160px]"
                >
                  {isLoading ? 'SENDING...' : 'SEND ENQUIRY'}
                </Button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
