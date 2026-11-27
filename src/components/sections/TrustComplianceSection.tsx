import React from 'react';
import { motion } from 'motion/react';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { Link } from '../../context/RouterContext';
import {
  Building2,
  ShieldCheck,
  Lock,
  Scale,
  FileCheck2,
  Mail,
  Phone,
  MapPin,
  Send,
  ArrowRight,
  FileText,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

export function TrustComplianceSection() {
  return (
    <section
      id="trust-compliance"
      className="scroll-mt-24 py-20 sm:py-28 bg-[#FAF8F2] text-[#17202A] border-b border-[#102A43]/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Governance & Transparency"
            title="Trust & Compliance"
            subtitle="Verified corporate details, authentic certification status, privacy governance, and accurate product disclosures."
          />
          <div className="flex flex-wrap items-center gap-3">
            <Button href="/privacy-policy" variant="outline" size="sm">
              Privacy Policy
            </Button>
            <Button href="/terms-and-conditions" variant="primary" size="sm" showArrow>
              Terms &amp; Conditions
            </Button>
          </div>
        </div>

        {/* Row 1: Company Details & Contact Information + Applicable Certifications */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* 1. Company Details & Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-5 bg-white border border-[#102A43]/12 rounded-sm p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xs"
          >
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-[#102A43]/10 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-sm bg-[#102A43]/5 text-[#102A43] flex items-center justify-center">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#102A43]">
                    Company Details &amp; Contact
                  </h3>
                </div>
                <span className="font-mono tabular-nums text-xs font-bold text-[#B89B5E]">01</span>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-wider font-mono text-[#285943] font-semibold block">
                  Official Company Name · Confirmed
                </span>
                <p className="text-base font-semibold text-[#102A43]">
                  Bhuvi Q Nyra International Private Limited
                </p>
              </div>

              <div className="space-y-3.5 text-xs sm:text-sm pt-2 border-t border-[#102A43]/10">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#285943] shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-[#102A43] block">
                      Registered Office Address
                    </span>
                    <span className="text-[#667085] leading-relaxed block">
                      India — verified registered street address pending company publication.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-[#285943] shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-[#102A43] block">
                      Business Contact Email
                    </span>
                    <span className="text-[#667085] leading-relaxed block">
                      Direct corporate email pending publication; all active enquiries are logged via our Commercial Enquiry Pathway.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-[#285943] shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-[#102A43] block">
                      Contact Phone Number
                    </span>
                    <span className="text-[#667085] leading-relaxed block">
                      Verified telephone line pending publication.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Send className="w-4 h-4 text-[#285943] shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-[#102A43] block">
                      Company Enquiry Information
                    </span>
                    <span className="text-[#667085] leading-relaxed block">
                      Accepts Sample, Quotation, Bulk, Export, Technical, and Business Partnership / Distribution enquiries.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#102A43]/10 flex flex-wrap items-center justify-between gap-2 text-xs">
              <Link
                href="/#commercial-enquiry"
                className="font-semibold text-[#102A43] hover:text-[#285943] inline-flex items-center gap-1"
              >
                <span>Submit Commercial Enquiry</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/contact"
                className="font-semibold text-[#285943] hover:underline"
              >
                Contact Desk
              </Link>
            </div>
          </motion.div>

          {/* 2. Applicable Company Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: 0.06 }}
            className="lg:col-span-7 bg-white border border-[#102A43]/12 rounded-sm p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xs"
          >
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-[#102A43]/10 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-sm bg-[#285943]/10 text-[#285943] flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#102A43]">
                    Applicable Certifications &amp; Documentation
                  </h3>
                </div>
                <span className="font-mono tabular-nums text-xs font-bold text-[#B89B5E]">02</span>
              </div>

              <p className="text-xs sm:text-sm text-[#667085] leading-relaxed font-light">
                Only genuine certifications and statutory registrations supported by official company documents are displayed. No assumed seals, unissued badges, or placeholder registration numbers are shown on this website.
              </p>

              {/* Status Distinction Rows */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-[#FAF8F2] border border-[#102A43]/10 rounded-sm space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#285943] uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Available Quality Documents</span>
                  </div>
                  <p className="text-xs text-[#667085] leading-relaxed">
                    Approved baseline Banana Powder Technical Specification Sheet and Sample Lot Certificate of Analysis (CoA) format are available to review and download.
                  </p>
                  <div className="pt-1 flex flex-wrap gap-3 text-xs font-semibold">
                    <Link
                      href="/ingredients/banana-powder"
                      className="text-[#102A43] hover:text-[#285943] inline-flex items-center gap-1"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Specification PDF</span>
                    </Link>
                    <Link
                      href="/science-quality"
                      className="text-[#102A43] hover:text-[#285943] inline-flex items-center gap-1"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Sample CoA Format</span>
                    </Link>
                  </div>
                </div>

                <div className="p-4 bg-[#FAF8F2] border border-[#102A43]/10 rounded-sm space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#102A43] uppercase tracking-wider">
                    <AlertCircle className="w-4 h-4 text-[#B89B5E] shrink-0" />
                    <span>External Certifications · Under Verification</span>
                  </div>
                  <p className="text-xs text-[#667085] leading-relaxed">
                    Company-issued regulatory certificates, seals, and downloadable compliance PDFs will be published in this section once approved documents are supplied by the company.
                  </p>
                  <div className="pt-1">
                    <Link
                      href="/#commercial-enquiry"
                      className="text-xs font-semibold text-[#285943] hover:underline inline-flex items-center gap-1"
                    >
                      <span>Request Verified Dossier</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#102A43]/10 flex flex-wrap items-center justify-between gap-2 text-xs text-[#667085]">
              <span>Applicable records provided directly to commercial buyers and audit teams upon enquiry.</span>
              <Link
                href="/science-quality"
                className="font-semibold text-[#102A43] hover:text-[#285943] inline-flex items-center gap-1 shrink-0"
              >
                <span>Quality &amp; Documentation Page</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Row 2: Accurate Product Information & Regulatory Claims */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="bg-white border border-[#102A43]/12 rounded-sm p-6 sm:p-8 space-y-6 shadow-xs"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#102A43]/10 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-sm bg-[#102A43]/5 text-[#102A43] flex items-center justify-center">
                <FileCheck2 className="w-4 h-4" />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#102A43]">
                Accurate Product Information &amp; Regulatory Claims
              </h3>
            </div>
            <span className="font-mono tabular-nums text-xs font-bold text-[#B89B5E]">03</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#285943]">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Confirmed &amp; Verified Product Facts</span>
              </div>
              <p className="text-xs sm:text-sm text-[#667085] leading-relaxed font-light">
                Published product descriptions reflect approved specifications (100% pure ripe banana powder, peel excluded, zero carriers or excipients) and baseline release parameters governed by lot-specific Certificates of Analysis.
              </p>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#102A43]">
                <AlertCircle className="w-4 h-4 text-[#B89B5E] shrink-0" />
                <span>Regulatory &amp; Verification Boundaries</span>
              </div>
              <p className="text-xs sm:text-sm text-[#667085] leading-relaxed font-light">
                Bhuvi Q Nyra International Private Limited makes no unsupported health, nutritional, medicinal, or therapeutic claims. Extended assay panels, research outcomes, and external regulatory filings remain clearly distinguished until supported by approved documentation.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Row 3: Privacy Policy & Terms & Conditions Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 4. Privacy Policy */}
          <div className="p-6 sm:p-8 bg-[#F7F3EA] border border-[#102A43]/15 rounded-sm flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Lock className="w-4 h-4 text-[#285943]" />
                  <h3 className="font-serif text-2xl font-semibold text-[#102A43]">
                    Privacy Policy
                  </h3>
                </div>
                <span className="font-mono tabular-nums text-xs font-bold text-[#B89B5E]">04</span>
              </div>

              <p className="text-xs sm:text-sm text-[#667085] leading-relaxed font-light">
                Explains what personal and business enquiry information is collected, how it is used, stored, and protected, cookie usage, third-party sharing rules, customer privacy rights, and privacy contact channels.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-[#102A43]/10">
              <span className="font-mono text-[11px] text-[#667085]">
                Subject to company approval
              </span>
              <Link
                href="/privacy-policy"
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#102A43] hover:text-[#285943] transition-colors"
              >
                <span>Open Privacy Policy</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* 5. Terms & Conditions */}
          <div className="p-6 sm:p-8 bg-[#F7F3EA] border border-[#102A43]/15 rounded-sm flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Scale className="w-4 h-4 text-[#285943]" />
                  <h3 className="font-serif text-2xl font-semibold text-[#102A43]">
                    Terms &amp; Conditions
                  </h3>
                </div>
                <span className="font-mono tabular-nums text-xs font-bold text-[#B89B5E]">05</span>
              </div>

              <p className="text-xs sm:text-sm text-[#667085] leading-relaxed font-light">
                Covers website usage, verified product descriptions, sample requests and enquiries, commercial pricing and order governance, intellectual property rights, limitation of liability, and applicable Indian governing law.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-[#102A43]/10">
              <span className="font-mono text-[11px] text-[#667085]">
                Subject to legal-team approval
              </span>
              <Link
                href="/terms-and-conditions"
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#102A43] hover:text-[#285943] transition-colors"
              >
                <span>Open Terms &amp; Conditions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
