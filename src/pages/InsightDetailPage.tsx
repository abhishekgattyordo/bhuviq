import React from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { ARTICLES } from '../data/insights';
import { Clock, ArrowLeft, ArrowRight, Share2, Sparkles, Package, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useRouter } from '../context/RouterContext';

interface InsightDetailPageProps {
  slug: string;
}

export function InsightDetailPage({ slug }: InsightDetailPageProps) {
  const { navigate } = useRouter();

  const article = ARTICLES.find((a) => a.slug === slug) || ARTICLES[0];
  const relatedArticles = ARTICLES.filter((a) => a.id !== article.id).slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.summary,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Article link copied to clipboard.');
    }
  };

  // Collect any key takeaways from sections or general
  const allTakeaways = article.content.flatMap(c => c.keyTakeaways || []);

  return (
    <PageWrapper
      title={`${article.title} | BhuviQ Nyra Insights`}
      description={article.summary}
    >
      {/* Article Header */}
      <section className="relative bg-[#102A43] text-white pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <button
            onClick={() => navigate('/insights')}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#B89B5E] hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Insights</span>
          </button>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="px-3 py-1 rounded-full bg-[#285943] text-[#FAF7F0] font-semibold">
              {article.category}
            </span>
            <span className="text-white/60 font-mono">{article.publishedDate}</span>
            <span className="text-white/40">•</span>
            <span className="text-white/80 font-mono flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {article.readTime}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-[#FAF7F0] leading-tight">
            {article.title}
          </h1>

          {/* Author Block */}
          <div className="flex items-center justify-between pt-4 border-t border-white/15">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#B89B5E]/30 text-[#FAF7F0] flex items-center justify-center font-serif text-base border border-[#B89B5E]">
                {article.author.name.charAt(0)}
              </div>
              <div className="text-xs">
                <p className="font-semibold text-white">{article.author.name}</p>
                <p className="text-white/60">{article.author.role}</p>
              </div>
            </div>

            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-1.5 text-xs font-mono cursor-pointer"
              aria-label="Share article"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="rounded-sm overflow-hidden aspect-[16/9] shadow-2xl border border-[#102A43]/20 bg-[#102A43]">
          <img
            src={article.heroImage}
            alt={article.title}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=1200&q=80";
            }}
          />
        </div>
      </div>

      {/* Main Article Content */}
      <section className="py-16 bg-[#FAF8F2] text-[#17202A] border-b border-[#102A43]/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Key Takeaways Box if available */}
          {allTakeaways.length > 0 && (
            <div className="p-6 sm:p-8 bg-white border-l-4 border-[#285943] rounded-sm shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#285943] font-bold">
                <Sparkles className="w-4 h-4 text-[#B89B5E]" />
                <span>Key Formulation Takeaways</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-[#17202A]">
                {allTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#285943] shrink-0 mt-0.5" />
                    <span className="font-light">{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Subsections Content */}
          <div className="space-y-8 text-base text-[#17202A] leading-relaxed font-light">
            {article.content.map((sec, idx) => (
              <div key={idx} className="space-y-4">
                {sec.sectionHeading && (
                  <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#102A43] pt-4">
                    {sec.sectionHeading}
                  </h2>
                )}
                {sec.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-sm sm:text-base text-[#475467] leading-relaxed">
                    {p}
                  </p>
                ))}
                {sec.quote && (
                  <div className="my-6 p-6 bg-[#102A43] text-[#FAF7F0] rounded-sm border-l-4 border-[#B89B5E] space-y-2">
                    <p className="font-serif italic text-lg sm:text-xl text-[#FAF7F0]">
                      “{sec.quote}”
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="pt-6 border-t border-[#102A43]/10 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-[#102A43] uppercase tracking-wider mr-2">
              Indexed Topics:
            </span>
            {article.tags.map((t) => (
              <span
                key={t}
                className="text-xs px-3 py-1 bg-white border border-[#102A43]/10 rounded-full text-[#667085]"
              >
                #{t}
              </span>
            ))}
          </div>

          {/* Commercial / Technical Consultation Prompt Box */}
          <div className="p-8 bg-white border border-[#102A43]/15 rounded-sm shadow-sm space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-[#B89B5E]/20 text-[#102A43] flex items-center justify-center mx-auto">
              <Sparkles className="w-6 h-6 text-[#102A43]" />
            </div>
            <h3 className="font-serif text-2xl text-[#102A43]">
              Partner with BhuviQ Nyra on Ingredient Solutions
            </h3>
            <p className="text-xs sm:text-sm text-[#667085] max-w-md mx-auto">
              Connect with our technical applications team to explore commercial volume supply, contract manufacturing, and formulation data.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <Button
                href="/partner-with-us"
                variant="primary"
                showArrow
              >
                Submit Commercial Inquiry
              </Button>
              <Button href="/ingredients/banana-powder" variant="outline">
                View Specifications
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-20 bg-[#F7F3EA] text-[#17202A] border-b border-[#102A43]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <h3 className="font-serif text-2xl sm:text-3xl text-[#102A43] font-semibold">
            Related Perspectives & Research
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((rel) => (
              <div
                key={rel.id}
                onClick={() => navigate(`/insights/${rel.slug}`)}
                className="bg-white border border-[#102A43]/10 rounded-sm p-6 space-y-3 cursor-pointer hover:border-[#285943] transition-all"
              >
                <span className="text-[10px] font-mono text-[#285943] uppercase font-semibold">
                  {rel.category}
                </span>
                <h4 className="font-serif text-lg font-semibold text-[#102A43] hover:text-[#285943] leading-snug">
                  {rel.title}
                </h4>
                <p className="text-xs text-[#667085] line-clamp-2">
                  {rel.summary}
                </p>
                <div className="pt-2 flex items-center gap-1 text-xs font-semibold text-[#102A43]">
                  <span>Read Paper</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#B89B5E]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
