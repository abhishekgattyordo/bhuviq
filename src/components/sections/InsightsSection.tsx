import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SectionHeading } from '../ui/SectionHeading';
import { ARTICLES, INSIGHT_CATEGORIES } from '../../data/insights';
import { ArrowRight, Clock, User, Search, BookOpen } from 'lucide-react';
import { Button } from '../ui/Button';
import { Link, useRouter } from '../../context/RouterContext';
import { cn } from '../../lib/utils';

export function InsightsSection() {
  const { navigate } = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = ARTICLES.filter((art) => {
    const matchesCat = selectedCategory === "All" || art.category === selectedCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const featuredArticle = ARTICLES[0];
  const gridArticles = filteredArticles.filter(a => a.id !== featuredArticle.id || searchQuery !== "" || selectedCategory !== "All");

  return (
    <section className="py-24 sm:py-32 bg-[#F7F3EA] text-[#17202A] border-b border-[#102A43]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Editorial & R&D Papers"
            title="Nature. Ingredients. Innovation."
            subtitle="Authoritative perspectives on botanical extraction, process engineering, and clean-label ingredient science."
          />
          <Button href="/insights" variant="outline" size="sm" showArrow>
            View All Articles ({ARTICLES.length})
          </Button>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-2 border-b border-[#102A43]/10">
          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-2">
            {INSIGHT_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer",
                  selectedCategory === cat
                    ? "bg-[#102A43] text-white shadow-xs scale-105"
                    : "bg-[#FAF8F2] text-[#667085] hover:bg-white hover:text-[#102A43] border border-[#102A43]/10"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Field */}
          <div className="relative min-w-[240px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search insights..."
              className="w-full pl-9 pr-3.5 py-1.5 bg-white border border-[#102A43]/15 rounded-full text-xs text-[#17202A] placeholder-[#667085]/60 focus:outline-none focus:border-[#102A43]"
            />
            <Search className="w-3.5 h-3.5 text-[#667085] absolute left-3 top-2.5 pointer-events-none" />
          </div>
        </div>

        {/* Featured Article Hero (When no search active and 'All' category) */}
        {selectedCategory === "All" && searchQuery === "" && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            whileHover={{ y: -4, transition: { duration: 0.25 } }}
            onClick={() => navigate(`/insights/${featuredArticle.slug}`)}
            className="group relative rounded-sm overflow-hidden border border-[#102A43]/15 bg-white shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div className="lg:col-span-7 aspect-[16/10] overflow-hidden bg-[#102A43]">
              <img
                src={featuredArticle.heroImage}
                alt={featuredArticle.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=1200&q=80";
                }}
              />
            </div>
            <div className="lg:col-span-5 p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-3 text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-[#285943]/10 text-[#285943] font-semibold">
                  {featuredArticle.category}
                </span>
                <span className="text-[#667085] flex items-center gap-1 font-mono">
                  <Clock className="w-3 h-3" /> {featuredArticle.readTime}
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-[#102A43] group-hover:text-[#285943] transition-colors leading-tight font-semibold">
                {featuredArticle.title}
              </h3>

              <p className="text-sm text-[#667085] leading-relaxed font-light">
                {featuredArticle.summary}
              </p>

              <div className="pt-3 border-t border-[#102A43]/10 flex items-center justify-between">
                <span className="text-xs text-[#17202A] font-medium">
                  {featuredArticle.author.name}
                </span>
                <span className="text-xs font-semibold text-[#102A43] group-hover:text-[#285943] flex items-center gap-1">
                  Read Article <ArrowRight className="w-3.5 h-3.5 text-[#B89B5E]" />
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(selectedCategory === "All" && searchQuery === "" ? ARTICLES.slice(1) : filteredArticles).map((article, idx) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5, ease: 'easeOut' }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              onClick={() => navigate(`/insights/${article.slug}`)}
              className="group bg-white border border-[#102A43]/10 rounded-sm overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-[#102A43]">
                <img
                  src={article.heroImage}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80";
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
                    <span>{article.readTime}</span>
                  </div>

                  <h4 className="font-serif text-xl font-semibold text-[#102A43] group-hover:text-[#285943] transition-colors leading-snug">
                    {article.title}
                  </h4>

                  <p className="text-xs text-[#667085] leading-relaxed line-clamp-2">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#102A43]/10 flex items-center justify-between text-xs font-semibold text-[#102A43] group-hover:text-[#285943]">
                  <span>Read Full Perspective</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#B89B5E] transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12 bg-white rounded-sm border border-[#102A43]/10 space-y-3">
            <BookOpen className="w-8 h-8 mx-auto text-[#667085]" />
            <p className="text-base font-serif text-[#102A43]">No articles found matching your criteria</p>
            <button
              onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
              className="text-xs text-[#285943] underline font-semibold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
