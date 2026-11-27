import React from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import { ShieldCheck, Mail } from 'lucide-react';

export function PrivacyPolicyPage() {
  const sections = [
    {
      index: '01',
      title: 'Personal Information We Collect',
      body: 'When you submit a Commercial Enquiry, sample request, technical question, or contact form on this website, Bhuvi Q Nyra International Private Limited collects only the business and contact information you voluntarily provide—such as your full name, company name, email address, phone number, country, enquiry type, product of interest, required quantity, and message details.'
    },
    {
      index: '02',
      title: 'How Customer Information Is Used',
      body: 'Submitted information is used solely to review and respond to your sample requests, quotations, bulk or export enquiries, technical questions, documentation requests, and business partnership or distribution discussions.'
    },
    {
      index: '03',
      title: 'How Information Is Stored & Protected',
      body: 'Enquiry records are stored within controlled company systems with access restricted to authorized commercial, quality assurance, and operational personnel for handling legitimate business communications and required record-keeping.'
    },
    {
      index: '04',
      title: 'Information Sharing With Third Parties',
      body: 'Bhuvi Q Nyra International Private Limited does not sell or rent customer or business enquiry details to third parties. Information is shared externally only when required to fulfill a logistics or sample request coordinated with you, or when required by applicable law.'
    },
    {
      index: '05',
      title: 'Cookie Usage',
      body: 'This website uses essential browser functionality and technical storage needed for page navigation, display preferences, and form operation. No unverified third-party advertising trackers or behavioral profiling commitments are implied or deployed without disclosure.'
    },
    {
      index: '06',
      title: 'Customer Privacy Rights',
      body: 'You may contact Bhuvi Q Nyra International Private Limited to request access to, correction of, or deletion of personal or business contact details previously submitted through our enquiry forms, subject to applicable statutory record-keeping requirements.'
    },
    {
      index: '07',
      title: 'Contact Information for Privacy Enquiries',
      body: 'For privacy-related questions, data access requests, or updates regarding these terms, please contact Bhuvi Q Nyra International Private Limited via the website Contact Desk or Commercial Enquiry Pathway while direct corporate privacy contact details await final publication. These privacy terms remain subject to formal company approval.'
    }
  ];

  return (
    <PageWrapper
      title="Privacy Policy | Bhuvi Q Nyra International Private Limited"
      description="Privacy Policy governing personal and business enquiry information collected through the Bhuvi Q Nyra International Private Limited website."
    >
      {/* Hero */}
      <section className="bg-[#102A43] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 border-b border-[#B89B5E]/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#B89B5E] font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Trust &amp; Compliance</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#FAF7F0] leading-tight">
            Privacy Policy
          </h1>
          <p className="text-sm sm:text-base text-[#FAF7F0]/80 font-light leading-relaxed max-w-2xl">
            How Bhuvi Q Nyra International Private Limited collects, uses, stores, protects, and governs customer and business enquiry information.
          </p>
        </div>
      </section>

      {/* Policy Clauses */}
      <section className="py-16 sm:py-20 bg-[#FAF8F2] text-[#17202A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <SectionHeading
            eyebrow="Data Governance Framework"
            title="Website & Commercial Enquiry Privacy"
            subtitle="Published as a baseline governance framework subject to company-approved privacy terms."
          />

          <div className="space-y-4">
            {sections.map((item) => (
              <div
                key={item.index}
                className="p-6 sm:p-8 bg-white border border-[#102A43]/12 rounded-sm space-y-2 shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono tabular-nums text-xs font-bold text-[#B89B5E]">
                    {item.index}
                  </span>
                  <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#102A43]">
                    {item.title}
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-[#667085] leading-relaxed font-light">
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          <div className="p-6 sm:p-8 bg-[#F7F3EA] border border-[#102A43]/15 rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#285943] font-semibold">
                <Mail className="w-4 h-4" />
                <span>Privacy &amp; Governance Desk</span>
              </div>
              <p className="text-sm text-[#102A43] font-medium">
                Bhuvi Q Nyra International Private Limited · Enquiries routed via official Contact &amp; B2B Enquiry Desks
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Button href="/terms-and-conditions" variant="outline" size="sm">
                Terms &amp; Conditions
              </Button>
              <Button href="/#commercial-enquiry" variant="primary" size="sm" showArrow>
                Commercial Enquiry
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
