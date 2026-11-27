import React, { useState, useEffect } from 'react';
import { X, FileText, Download, CheckCircle, ShieldAlert } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';
import { Button } from './Button';
import { CURRENT_PRODUCT } from '../../data/products';
import { downloadProductSpecificationPdf } from '../../lib/pdfDocuments';

export function SpecSheetModal() {
  const { isSpecSheetModalOpen, closeSpecSheetModal, navigateToEnquiry } = useRouter();
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  useEffect(() => {
    if (!isSpecSheetModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeSpecSheetModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSpecSheetModalOpen, closeSpecSheetModal]);

  if (!isSpecSheetModalOpen) return null;

  const handleDownloadPdf = () => {
    downloadProductSpecificationPdf();
    setDownloadSuccess(true);
    setTimeout(() => {
      setDownloadSuccess(false);
    }, 4000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-[#102A43]/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={closeSpecSheetModal}
      role="dialog"
      aria-modal="true"
      aria-labelledby="tds-modal-title"
    >
      <div
        className="relative w-full max-w-3xl bg-[#FAF8F2] border border-[#102A43]/20 rounded-md shadow-2xl overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="bg-[#102A43] text-white px-5 sm:px-6 py-4 flex items-center justify-between border-b border-[#B89B5E]/30">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-full bg-[#B89B5E]/20 text-[#B89B5E] flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-widest text-[#B89B5E] font-semibold">Technical Document</p>
              <h3 id="tds-modal-title" className="font-serif text-base sm:text-xl truncate">
                Standard Technical Specification Sheet (TDS)
              </h3>
            </div>
          </div>
          <button
            onClick={closeSpecSheetModal}
            className="text-white/70 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10 shrink-0 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Disclaimer Notice */}
        <div className="bg-[#B89B5E]/10 border-b border-[#B89B5E]/20 px-5 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs text-[#8F7236]">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0 text-[#B89B5E]" />
            <span>Technical Specification Sheet · Reference analytical release parameters.</span>
          </div>
          <span className="font-mono text-[11px]">Doc: DOC-BQNP-TDS-2026</span>
        </div>

        {/* Spec Sheet Document Body */}
        <div className="p-5 sm:p-8 max-h-[68vh] overflow-y-auto space-y-6">
          {/* Header Block */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-[#102A43]/15 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#285943] font-bold">
                BHUVI Q NYRA INTERNATIONAL PRIVATE LIMITED
              </span>
              <h4 className="font-serif text-2xl text-[#102A43] font-semibold mt-0.5">{CURRENT_PRODUCT.name}</h4>
              <p className="text-xs text-[#667085] italic">{CURRENT_PRODUCT.botanicalName}</p>
            </div>
            <div className="text-left sm:text-right text-xs space-y-1 bg-white p-3 border border-[#102A43]/10 rounded-sm w-full sm:w-auto">
              <p><strong className="text-[#102A43]">Doc Ref:</strong> DOC-BQNP-TDS-2026</p>
              <p><strong className="text-[#102A43]">Origin:</strong> India (Approved Suppliers)</p>
              <p><strong className="text-[#102A43]">Grade:</strong> Industrial B2B Ingredient</p>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#102A43]">Product Definition</h5>
            <p className="text-xs text-[#17202A] leading-relaxed bg-white p-3.5 border border-[#102A43]/10 rounded-sm">
              {CURRENT_PRODUCT.description}
            </p>
          </div>

          {/* Technical Parameters Table */}
          <div className="space-y-2">
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#102A43]">Physical &amp; Chemical Parameters (Analytical Data)</h5>
            <div className="border border-[#102A43]/15 rounded-sm overflow-x-auto bg-white">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#102A43]/5 border-b border-[#102A43]/10 font-semibold text-[#102A43]">
                  <tr>
                    <th className="py-2.5 px-3.5">Parameter</th>
                    <th className="py-2.5 px-3.5">Specification Standard</th>
                    <th className="py-2.5 px-3.5">Testing Method</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#102A43]/10">
                  {CURRENT_PRODUCT.specifications.map((spec, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-[#FAF8F2]/60"}>
                      <td className="py-2.5 px-3.5 font-medium text-[#17202A]">{spec.label}</td>
                      <td className="py-2.5 px-3.5 font-mono text-[#285943] font-semibold">{spec.value}</td>
                      <td className="py-2.5 px-3.5 text-[#667085]">{spec.method || 'Standard Method'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Packaging & Storage */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-white p-4 border border-[#102A43]/10 rounded-sm space-y-2">
              <h5 className="font-bold uppercase tracking-wider text-[#102A43]">Standard Bulk Packaging</h5>
              <p className="text-[#17202A]">20 kg &amp; 25 kg multi-layer food-grade kraft bags with sealed high-barrier moisture inner liner, or 25 kg fiber drums.</p>
            </div>
            <div className="bg-white p-4 border border-[#102A43]/10 rounded-sm space-y-2">
              <h5 className="font-bold uppercase tracking-wider text-[#102A43]">Storage &amp; Shelf Integrity</h5>
              <p className="text-[#17202A]">Store in a cool, dry warehouse below 25°C and &lt;60% relative humidity. Recommended shelf life: 24 months in original unopened pack.</p>
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="bg-[#102A43]/5 border-t border-[#102A43]/15 px-5 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            {downloadSuccess ? (
              <span className="inline-flex items-center text-xs font-semibold text-[#285943] gap-1.5">
                <CheckCircle className="w-4 h-4 shrink-0" /> TDS PDF downloaded (BhuviQ-Nyra-Banana-Powder-Specification.pdf)
              </span>
            ) : (
              <span className="text-[11px] text-[#667085]">Approved Reference TDS · DOC-BQNP-TDS-2026</span>
            )}
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              icon={<Download className="w-4 h-4" />}
              onClick={handleDownloadPdf}
              className="min-h-[42px] justify-center"
            >
              Download PDF TDS
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                closeSpecSheetModal();
                navigateToEnquiry({
                  enquiryType: 'Request a Sample',
                  productInterest: 'Banana Powder (100% Pure)',
                  requiredQuantity: 'Sample Pack (1 kg – 5 kg)'
                });
              }}
              showArrow
              className="min-h-[42px] justify-center"
            >
              Request Sample / Quote
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
