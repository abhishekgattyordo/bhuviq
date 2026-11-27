import React from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import { FileText, Scale } from 'lucide-react';

export function TermsConditionsPage() {
  const clauses = [
    {
      index: '01',
      title: 'Website Usage',
      body: 'This website is operated by Bhuvi Q Nyra International Private Limited to provide verified corporate, product, and technical reference information. Visitors agree to use this website solely for lawful business evaluation and informational purposes and not to misuse, disrupt, or reproduce content in unauthorized commercial contexts.'
    },
    {
      index: '02',
      title: 'Product Information & Descriptions',
      body: 'Product descriptions and technical specifications presented on this website reflect approved company reference documents at baseline release thresholds. Bhuvi Q Nyra International Private Limited does not make unsupported health, nutritional, medicinal, or therapeutic claims; actual lot release measurements are governed strictly by the batch-specific Certificate of Analysis (CoA).'
    },
    {
      index: '03',
      title: 'Enquiries & Sample Requests',
      body: 'Submitting a Commercial Enquiry, sample request, technical question, or partnership message through this website constitutes an initial business request only and does not create a binding supply obligation until formally reviewed and confirmed in writing by Bhuvi Q Nyra International Private Limited.'
    },
    {
      index: '04',
      title: 'Pricing & Order-Related Terms',
      body: 'Where applicable, product pricing, minimum order quantities, packaging formats, dispatch timelines, export documentation, and payment conditions are determined exclusively through official written quotations and signed commercial agreements.'
    },
    {
      index: '05',
      title: 'Intellectual Property Rights',
      body: 'All corporate names, brand marks, trade initiatives (including Bhuvi Q Nyra, TerraSynch, and TerraVance), text, technical layouts, and visual assets published on this website remain the intellectual property of Bhuvi Q Nyra International Private Limited and may not be copied or redistributed commercially without prior written permission.'
    },
    {
      index: '06',
      title: 'Limitation of Liability',
      body: 'Website content is provided for general B2B informational reference. To the fullest extent permitted by applicable law, Bhuvi Q Nyra International Private Limited shall not be liable for indirect or consequential reliance on general website materials outside formal written supply agreements, and buyers remain responsible for verifying destination regulatory suitability for their intended end use.'
    },
    {
      index: '07',
      title: 'Applicable Governing Law & Jurisdiction',
      body: 'These website terms are governed by the applicable laws of India. Specific jurisdiction and dispute resolution clauses for commercial supply transactions are governed by the applicable executed commercial contract and formal legal terms approved by the company.'
    },
    {
      index: '08',
      title: 'Legal Enquiries & Approval Status',
      body: 'All terms presented on this page remain subject to formal approval by Bhuvi Q Nyra International Private Limited and its legal team. Legal or compliance enquiries may be submitted through our official website Contact Desk or Commercial Enquiry Pathway while direct corporate legal contact details await final publication.'
    }
  ];

  return (
    <PageWrapper
      title="Terms & Conditions | Bhuvi Q Nyra International Private Limited"
      description="Terms and Conditions governing website usage, product descriptions, sample enquiries, pricing, intellectual property, liability, and governing law."
    >
      {/* Hero */}
      <section className="bg-[#102A43] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 border-b border-[#B89B5E]/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#B89B5E] font-semibold">
            <Scale className="w-4 h-4" />
            <span>Trust &amp; Compliance</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#FAF7F0] leading-tight">
            Terms &amp; Conditions
          </h1>
          <p className="text-sm sm:text-base text-[#FAF7F0]/80 font-light leading-relaxed max-w-2xl">
            Governing terms for website usage, product descriptions, sample requests, and commercial enquiries with Bhuvi Q Nyra International Private Limited.
          </p>
        </div>
      </section>

      {/* Clauses */}
      <section className="py-16 sm:py-20 bg-[#FAF8F2] text-[#17202A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <SectionHeading
            eyebrow="Commercial & Website Governance"
            title="General Terms of Use & Commercial Reference"
            subtitle="All terms remain subject to formal company and legal-team approval."
          />

          <div className="space-y-4">
            {clauses.map((item) => (
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
                <FileText className="w-4 h-4" />
                <span>Corporate Entity</span>
              </div>
              <p className="text-sm text-[#102A43] font-medium">
                Bhuvi Q Nyra International Private Limited · India
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Button href="/privacy-policy" variant="outline" size="sm">
                Privacy Policy
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
