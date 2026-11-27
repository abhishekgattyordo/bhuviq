import React, { useState } from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { SectionHeading } from '../components/ui/SectionHeading';
import { ARTICLES, INSIGHT_CATEGORIES } from '../data/insights';
import { Clock, Search, BookOpen, ArrowRight, User, Tag } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useRouter, Link } from '../context/RouterContext';
import { cn } from '../lib/utils';

export function InsightsPage() {
  const { navigate } = useRouter();
  const [selectedCat, setSelectedCat] = useState<string>("All");
  const [search, setSearch] = useState("");

  const filtered = ARTICLES.filter((a) => {
    const matchCat = selectedCat === "All" || a.category === selectedCat;
    const matchSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.summary.toLowerCase().includes(search.toLowerCase()) ||
      a.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <PageWrapper
      title="Insights & Technical Articles | BhuviQ Nyra International"
      description="Nature. Ingredients. Innovation. Technical perspectives on botanical ingredients, processing science, and clean-label formulation trends."
    >
      {/* Hero */}
      <section className="relative bg-[#102A43] text-white pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/banana_research_evaluation_lab_1795782891177.jpg"
            alt="Banana ingredient research and evaluation laboratory"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-25 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#102A43] via-[#102A43]/85 to-[#102A43]/60" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#B89B5E] text-xs font-semibold uppercase tracking-widest border border-[#B89B5E]/30">
            <span>R&D Perspectives & Whitepapers</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.1] text-[#FAF7F0]">
            Nature. Ingredients. <span className="italic font-light">Innovation.</span>
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-xl text-[#FAF7F0]/85 font-light leading-relaxed">
            Explorations into botanical chemistry, thermal preservation, clean-label formulation strategies, and sustainable agro-industrial architectures.
          </p>
        </div>
      </section>

      {/* Filter and Grid */}
      <section className="py-20 bg-[#FAF8F2] text-[#17202A] border-b border-[#102A43]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-4 border-b border-[#102A43]/10">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {INSIGHT_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCat(cat)}
                  className={cn(
                    "px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer",
                    selectedCat === cat
                      ? "bg-[#102A43] text-white shadow-xs"
                      : "bg-white text-[#667085] hover:bg-[#FAF8F2] hover:text-[#102A43] border border-[#102A43]/10"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[280px]">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles by keyword or topic..."
                className="w-full pl-10 pr-4 py-2 bg-white border border-[#102A43]/20 rounded-full text-xs text-[#17202A] focus:outline-none focus:border-[#102A43]"
              />
              <Search className="w-4 h-4 text-[#667085] absolute left-3.5 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Grid of Articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((article) => (
              <div
                key={article.id}
                onClick={() => navigate(`/insights/${article.slug}`)}
                className="group bg-white border border-[#102A43]/10 rounded-sm overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#102A43]">
                  <img
                    src={article.heroImage}
                    alt={article.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/images/insight_banana_pure_ingredient_1790839554597.jpg";
                    }}
                  />
                  <div className="absolute top-3 left-3 bg-[#FAF7F0]/90 backdrop-blur-xs text-[#102A43] px-2.5 py-0.5 rounded text-[10px] font-semibold uppercase">
                    {article.category}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[11px] text-[#667085] font-mono">
                      <span>{article.publishedDate}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {article.readTime}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#102A43] group-hover:text-[#285943] transition-colors leading-snug">
                      {article.title}
                    </h3>

                    <p className="text-xs text-[#667085] leading-relaxed line-clamp-3 font-light">
                      {article.summary}
                    </p>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-[#102A43]/10">
                    <div className="flex flex-wrap gap-1.5">
                      {article.tags.slice(0, 3).map((t) => (
                        <span key={t} className="text-[10px] bg-[#FAF8F2] text-[#667085] px-2 py-0.5 rounded">
                          #{t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs font-semibold text-[#102A43] group-hover:text-[#285943]">
                      <span>Read Technical Article</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#B89B5E] transition-transform duration-200 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 bg-white rounded-sm border border-[#102A43]/10 space-y-3">
              <BookOpen className="w-10 h-10 mx-auto text-[#667085]" />
              <h3 className="font-serif text-2xl text-[#102A43]">No articles found</h3>
              <p className="text-xs text-[#667085]">Try adjusting your search criteria or category filter.</p>
            </div>
          )}
        </div>
      </section>
    </PageWrapper>
  );
}
