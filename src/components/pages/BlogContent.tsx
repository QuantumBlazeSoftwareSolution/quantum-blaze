"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useLenis } from "@/hooks/useLenis";
import { Search, Calendar, Clock, ArrowRight, Mail, Sparkles, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { type BlogPost } from "@/lib/blogs";

interface BlogContentProps {
  initialBlogs: BlogPost[];
}

export function BlogContent({ initialBlogs }: BlogContentProps) {
  useLenis();
  const [language, setLanguage] = useState<"en" | "si">("en");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  // Load language from localStorage after mount to avoid hydration mismatch
  useEffect(() => {
    window.scrollTo(0, 0);
    const savedLang = localStorage.getItem("blog_lang") as "en" | "si";
    if (savedLang === "en" || savedLang === "si") {
      setLanguage(savedLang);
    }
  }, []);

  const handleLanguageChange = (lang: "en" | "si") => {
    setLanguage(lang);
    localStorage.setItem("blog_lang", lang);
  };

  const categories = [
    { key: "All", label: "All" },
    { key: "Engineering", label: "Engineering" },
    { key: "Design", label: "Design" },
    { key: "Architecture", label: "Architecture" },
    { key: "Product Strategy", label: "Product Strategy" }
  ];

  // Static English UI text
  const t = {
    sectionLabel: "OUR KNOWLEDGE BASE",
    titlePrefix: "Stories, Insights & ",
    titleSuffix: "Engineering.",
    subtitle: "Deep dives into modern frameworks, frontend design principles, clean architecture, and the strategies behind launching scalable, trust-inducing digital products.",
    featuredBadge: "Featured Post",
    readArticle: "Read Article",
    searchPlaceholder: "Search articles...",
    newsletterBadge: "Subscribe for Updates",
    newsletterTitle: "Stay ahead with premium engineering insights",
    newsletterDesc: "Join our monthly newsletter database to receive detailed articles on software architecture, Next.js scaling, and modern product strategy.",
    emailPlaceholder: "Enter your work email",
    btnSubscribe: "Subscribe",
    btnSubscribing: "Subscribing...",
    successTitle: "Thank You for Subscribing!",
    successSubtitle: "You will now receive our tech updates.",
    noArticles: "No articles found matching your query.",
    clearFilters: "Clear all filters"
  };

  // Filter posts
  const filteredBlogs = initialBlogs.filter((blog) => {
    const titleText = blog.title[language].toLowerCase();
    const descText = blog.description[language].toLowerCase();
    const contentText = blog.content[language].toLowerCase();
    const query = searchQuery.toLowerCase();

    const matchesSearch =
      titleText.includes(query) ||
      descText.includes(query) ||
      contentText.includes(query);
    
    const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const featuredPost = initialBlogs.find((b) => b.featured) || initialBlogs[0];
  const regularPosts = filteredBlogs.filter((b) => b.id !== featuredPost?.id || searchQuery !== "" || selectedCategory !== "All");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribeStatus("loading");
    setTimeout(() => {
      setSubscribeStatus("success");
      setEmail("");
    }, 1200);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050B14]">
      <Navbar />

      {/* Hero Ambient Background Rays */}
      <div
        className="absolute top-0 left-0 w-full h-[600px] pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(circle at 50% -20%, #38bdf8 0%, transparent 60%)",
          filter: "blur(120px)",
        }}
      />

      <section className="relative pt-32 pb-20">
        <div className="container-wide relative z-10">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="max-w-2xl space-y-4">
              <SectionLabel>{t.sectionLabel}</SectionLabel>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-white font-bold leading-tight font-grotesk tracking-tight text-4xl sm:text-5xl md:text-6xl"
              >
                {t.titlePrefix}<span className="text-sky-400">{t.titleSuffix}</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.8 }}
                className="text-slate-400 text-sm sm:text-base leading-relaxed"
              >
                {t.subtitle}
              </motion.p>
            </div>

            {/* Language Switcher Switch */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center border border-sky-400/10 rounded-xl p-1 bg-slate-950/40 w-fit self-start md:self-end"
            >
              <button
                onClick={() => handleLanguageChange("en")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all duration-300 cursor-pointer ${
                  language === "en"
                    ? "bg-sky-400 text-slate-950 shadow-[0_0_10px_rgba(56,189,248,0.2)]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => handleLanguageChange("si")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all duration-300 cursor-pointer ${
                  language === "si"
                    ? "bg-sky-400 text-slate-950 shadow-[0_0_10px_rgba(56,189,248,0.2)]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                සිං
              </button>
            </motion.div>
          </div>

          {/* Featured Post */}
          {searchQuery === "" && selectedCategory === "All" && featuredPost && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-16"
            >
              <Link href={`/blog/${featuredPost.slug}`}>
                <GlassCard className="relative overflow-hidden group">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-8 items-center">
                    {/* Featured Image - Optimized width and aspect ratio */}
                    <div className="lg:col-span-5 aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] xl:aspect-[16/10] overflow-hidden rounded-xl bg-slate-900/50 relative w-full h-full">
                      <img
                        src={featuredPost.coverImage}
                        alt={featuredPost.title[language]}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 bg-sky-500/10 backdrop-blur-md border border-sky-400/20 text-sky-400 text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider">
                        {t.featuredBadge}
                      </div>
                    </div>

                    {/* Featured Details - Gained space from smaller image side */}
                    <div className="lg:col-span-7 flex flex-col justify-between h-full py-2 space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 text-xs text-slate-400 font-medium">
                          <span className="text-sky-400 font-semibold uppercase tracking-wider">
                            {featuredPost.category}
                          </span>
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                          <span className="flex items-center gap-1">
                            <Calendar size={13} /> {featuredPost.date}
                          </span>
                        </div>

                        <h2 className="text-white text-2xl sm:text-3xl xl:text-4xl font-bold font-grotesk tracking-tight leading-tight group-hover:text-sky-400 transition-colors duration-300">
                          {featuredPost.title[language]}
                        </h2>

                        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                          {featuredPost.description[language]}
                        </p>
                      </div>

                      {/* Author & Action */}
                      <div className="flex items-center justify-between pt-6 border-t border-sky-400/10">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden border border-sky-400/20 bg-slate-900">
                            <img
                              src={featuredPost.author.image}
                              alt={featuredPost.author.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/initials/svg?seed=${featuredPost.author.name}`;
                              }}
                            />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-white leading-none mb-1">
                              {featuredPost.author.name}
                            </p>
                            <p className="text-xs text-slate-500">{featuredPost.author.role}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-sky-400 font-semibold text-sm group-hover:gap-2 transition-all">
                          {t.readArticle} <ArrowRight size={16} />
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          )}

          {/* Search and Filters Bar */}
          <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between mb-12 pb-8 border-b border-sky-400/10">
            {/* Categories */}
            <div className="flex flex-wrap gap-2.5">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    selectedCategory === cat.key
                      ? "bg-sky-500/20 border border-sky-400/40 text-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.15)]"
                      : "border border-sky-400/10 text-slate-400 hover:text-white hover:border-sky-400/20 bg-slate-950/20"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:max-w-xs">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-sky-400/10 bg-slate-950/40 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-400/30 transition-all font-sans"
              />
            </div>
          </div>

          {/* Regular Posts Grid */}
          {filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
              <AnimatePresence mode="popLayout">
                {(regularPosts.length > 0 ? regularPosts : filteredBlogs).map((blog, idx) => (
                  <motion.div
                    key={blog.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                  >
                    <Link href={`/blog/${blog.slug}`} className="block h-full">
                      <GlassCard className="flex flex-col h-full overflow-hidden group">
                        {/* Image */}
                        <div className="aspect-[16/10] overflow-hidden bg-slate-900/50 relative">
                          <img
                            src={blog.coverImage}
                            alt={blog.title[language]}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                          <div className="absolute bottom-3 left-3 bg-[#050B14]/80 backdrop-blur-md border border-sky-400/15 text-sky-400 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                            {blog.category}
                          </div>
                        </div>

                        {/* Card Info */}
                        <div className="p-6 flex flex-col justify-between flex-grow">
                          <div className="space-y-3.5 mb-6">
                            <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium">
                              <span className="flex items-center gap-1">
                                <Calendar size={12} /> {blog.date}
                              </span>
                              <span className="w-1 h-1 rounded-full bg-slate-700" />
                              <span className="flex items-center gap-1">
                                <Clock size={12} /> {blog.readTime}
                              </span>
                            </div>

                            <h3 className="text-white text-lg font-bold font-grotesk tracking-tight leading-snug group-hover:text-sky-400 transition-colors duration-300">
                              {blog.title[language]}
                            </h3>

                            <p className="text-slate-400 text-xs leading-relaxed line-clamp-3">
                              {blog.description[language]}
                            </p>
                          </div>

                          {/* Author Info */}
                          <div className="flex items-center justify-between pt-4 border-t border-sky-400/10">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-full overflow-hidden border border-sky-400/15 bg-slate-900">
                                <img
                                  src={blog.author.image}
                                  alt={blog.author.name}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/initials/svg?seed=${blog.author.name}`;
                                  }}
                                />
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-white leading-tight">
                                  {blog.author.name}
                                </p>
                              </div>
                            </div>

                            <span className="text-sky-400 group-hover:translate-x-1.5 transition-transform duration-300">
                              <ArrowRight size={15} />
                            </span>
                          </div>
                        </div>
                      </GlassCard>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="text-center py-20 border border-dashed border-sky-400/15 rounded-2xl bg-slate-950/20 mb-24">
              <p className="text-slate-400 font-medium mb-2">{t.noArticles}</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="text-sky-400 text-xs font-semibold hover:underline cursor-pointer"
              >
                {t.clearFilters}
              </button>
            </div>
          )}

          {/* Newsletter Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative mb-16"
          >
            <div
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                background: "radial-gradient(circle at 80% 50%, #38bdf8 0%, transparent 60%)",
                filter: "blur(80px)",
              }}
            />
            <GlassCard glowOnHover={false} className="relative overflow-hidden p-8 md:p-12 border border-sky-400/15 bg-gradient-to-br from-slate-950/60 to-slate-900/40">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-400/20 text-sky-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    <Sparkles size={12} className="text-sky-400" /> {t.newsletterBadge}
                  </div>
                  <h2 className="text-white text-2xl md:text-3xl font-bold font-grotesk tracking-tight leading-tight">
                    {t.newsletterTitle}
                  </h2>
                  <p className="text-slate-400 text-sm md:text-base max-w-xl leading-relaxed">
                    {t.newsletterDesc}
                  </p>
                </div>

                <div className="lg:col-span-5 w-full">
                  {subscribeStatus === "success" ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center p-6 bg-sky-500/5 border border-sky-400/20 rounded-2xl text-center"
                    >
                      <CheckCircle2 size={36} className="text-sky-400 mb-3" />
                      <p className="text-white font-bold font-grotesk text-lg">{t.successTitle}</p>
                      <p className="text-slate-400 text-xs mt-1">{t.successSubtitle}</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                      <div className="relative flex-grow">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4.5 h-4.5" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder={t.emailPlaceholder}
                          className="w-full pl-11 pr-4 py-3 rounded-xl border border-sky-400/15 bg-slate-950/50 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-400/30 transition-all font-sans"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={subscribeStatus === "loading"}
                        className="bg-sky-400 hover:bg-sky-500 text-slate-950 font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(56,189,248,0.15)] flex items-center justify-center gap-2 cursor-pointer hover:shadow-[0_0_25px_rgba(56,189,248,0.35)] select-none disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {subscribeStatus === "loading" ? t.btnSubscribing : t.btnSubscribe}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </GlassCard>
          </motion.div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
