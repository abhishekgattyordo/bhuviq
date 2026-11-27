import React, { useState } from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import { MapPin, Mail, Phone, Clock, Globe, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: 'General Inquiries',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <PageWrapper
      title="Contact Us | BhuviQ Nyra International"
      description="Connect with BhuviQ Nyra International corporate offices, quality assurance department, and commercial sales teams."
    >
      {/* Hero */}
      <section className="relative bg-[#102A43] text-white pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#B89B5E] text-xs font-semibold uppercase tracking-widest border border-[#B89B5E]/30">
            <span>Global Commercial Operations</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.1] text-[#FAF7F0]">
            Get in <span className="italic font-light">Touch</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-xl text-[#FAF7F0]/85 font-light leading-relaxed">
            Reach our technical applications group, supply chain specialists, or regulatory documentation team.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-20 bg-[#FAF8F2] text-[#17202A] border-b border-[#102A43]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Contact Info & Departments */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest text-[#285943] font-bold">
                Operational Headquarters
              </span>
              <h2 className="font-serif text-3xl text-[#102A43] font-semibold">
                BHUVIQ NYRA INTERNATIONAL
              </h2>
              <p className="text-sm text-[#667085] leading-relaxed font-light">
                Agri-Industrial Processing Corridor, Karnataka & Maharashtra Hubs, India
              </p>
            </div>

            {/* Coordinates */}
            <div className="space-y-4 pt-4 border-t border-[#102A43]/10 text-sm">
              <div className="flex items-start gap-3.5">
                <Mail className="w-5 h-5 text-[#285943] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#667085] block">Commercial Enquiries</span>
                  <a href={`mailto:${COMPANY_INFO.location.email}`} className="font-semibold text-[#102A43] hover:text-[#285943]">
                    {COMPANY_INFO.location.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Phone className="w-5 h-5 text-[#285943] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#667085] block">Telephone Desk</span>
                  <a href={`tel:${COMPANY_INFO.location.phone}`} className="font-semibold text-[#102A43] hover:text-[#285943]">
                    {COMPANY_INFO.location.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Clock className="w-5 h-5 text-[#285943] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#667085] block">Operating Hours</span>
                  <p className="text-[#102A43]">{COMPANY_INFO.location.operatingHours}</p>
                </div>
              </div>
            </div>

            {/* Department Contacts */}
            <div className="p-6 bg-white border border-[#102A43]/10 rounded-sm space-y-4 shadow-xs">
              <h4 className="font-serif text-xl text-[#102A43] font-semibold">
                Specialized Routing Desks
              </h4>
              <div className="space-y-3 text-xs">
                <div className="pb-2 border-b border-[#102A43]/5">
                  <span className="font-semibold text-[#102A43] block">Quality Assurance & Regulatory Affairs</span>
                  <span className="text-[#667085]">quality@bhuviqnyra.example</span>
                </div>
                <div className="pb-2 border-b border-[#102A43]/5">
                  <span className="font-semibold text-[#102A43] block">Global Export Logistics & Dispatch</span>
                  <span className="text-[#667085]">logistics@bhuviqnyra.example</span>
                </div>
                <div>
                  <span className="font-semibold text-[#102A43] block">R&D & Custom Formulations</span>
                  <span className="text-[#667085]">formulation@bhuviqnyra.example</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Direct Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 border border-[#102A43]/15 rounded-sm shadow-md">
            {isSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[#285943] mx-auto" />
                <h3 className="font-serif text-3xl text-[#102A43] font-semibold">Message Dispatched</h3>
                <p className="text-sm text-[#667085] max-w-md mx-auto">
                  Thank you for reaching out to BhuviQ Nyra International. Our representative will respond within 24 business hours.
                </p>
                <Button variant="primary" onClick={() => setIsSubmitted(false)}>
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="font-serif text-2xl text-[#102A43] font-semibold">
                    Direct Corporate Inquiry
                  </h3>
                  <p className="text-xs text-[#667085] mt-0.5">
                    For high-volume ingredient inquiries or commercial supply contracts, prefer our dedicated Partner portal.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#102A43] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Eleanor Vance"
                      className="w-full px-4 py-2.5 bg-[#FAF8F2] border border-[#102A43]/20 rounded-sm text-sm focus:outline-none focus:border-[#102A43]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#102A43] mb-1">
                      Business Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="eleanor@company.com"
                      className="w-full px-4 py-2.5 bg-[#FAF8F2] border border-[#102A43]/20 rounded-sm text-sm focus:outline-none focus:border-[#102A43]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#102A43] mb-1">
                      Department Routing
                    </label>
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#FAF8F2] border border-[#102A43]/20 rounded-sm text-sm focus:outline-none focus:border-[#102A43]"
                    >
                      <option value="General Inquiries">General Inquiries</option>
                      <option value="Quality & Regulatory QA">Quality & Regulatory QA</option>
                      <option value="Commercial Ingredient Sales">Commercial Ingredient Sales</option>
                      <option value="Supply Chain & Shipping">Supply Chain & Shipping</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#102A43] mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Audit schedule inquiry"
                      className="w-full px-4 py-2.5 bg-[#FAF8F2] border border-[#102A43]/20 rounded-sm text-sm focus:outline-none focus:border-[#102A43]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#102A43] mb-1">
                    Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can our technical or commercial team assist your organization?"
                    className="w-full px-4 py-2.5 bg-[#FAF8F2] border border-[#102A43]/20 rounded-sm text-sm focus:outline-none focus:border-[#102A43]"
                  />
                </div>

                <Button type="submit" variant="primary" showArrow className="w-full sm:w-auto">
                  Transmit Message
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
