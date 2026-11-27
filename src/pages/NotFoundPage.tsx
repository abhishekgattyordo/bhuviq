import React from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Button } from '../components/ui/Button';
import { ArrowLeft, Compass } from 'lucide-react';
import { useRouter } from '../context/RouterContext';

export function NotFoundPage() {
  const { navigate } = useRouter();

  return (
    <PageWrapper
      title="Page Not Found | BhuviQ Nyra International"
      description="The requested page could not be located."
    >
      <section className="min-h-[75vh] flex items-center justify-center bg-[#FAF8F2] px-4 py-24 text-center">
        <div className="max-w-md mx-auto space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#102A43]/10 text-[#102A43] flex items-center justify-center mx-auto">
            <Compass className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-widest text-[#B89B5E] font-bold">
              Error 404 — Page Not Found
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#102A43] font-semibold">
              Looking for a Botanical Resource?
            </h1>
            <p className="text-sm text-[#667085] leading-relaxed font-light">
              The page or document specification you requested cannot be found or has moved to a new catalog index.
            </p>
          </div>

          <div className="pt-2 flex justify-center gap-3">
            <Button
              href="/"
              variant="primary"
              icon={<ArrowLeft className="w-4 h-4" />}
            >
              Return to Homepage
            </Button>
            <Button
              href="/ingredients"
              variant="outline"
            >
              Browse Ingredients
            </Button>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
