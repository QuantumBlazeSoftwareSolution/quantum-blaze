"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlassCard } from "@/components/ui/GlassCard";
import { useLenis } from "@/hooks/useLenis";
import { ArrowLeft, Calendar, Clock, Mail, CheckCircle2, Sparkles } from "lucide-react";
import Link from "next/link";
import { type BlogPost } from "@/lib/blogs";

interface BlogPostContentProps {
  blog: BlogPost;
  relatedPosts: BlogPost[];
}

export function BlogPostContent({ blog, relatedPosts }: BlogPostContentProps) {
  useLenis();
  const [language, setLanguage] = useState<"en" | "si">("en");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  // Load language from localStorage after mount to avoid hydration mismatch
  useEffect(() => {
    window.scrollTo(0, 0);
    const savedLang = localStorage.getItem("blog_lang") as "en" | "si";
    if (savedLang === "en" || savedLang === "si") {
      setLanguage(savedLang);
    }

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(window.scrollY / totalScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLanguageChange = (lang: "en" | "si") => {
    setLanguage(lang);
    localStorage.setItem("blog_lang", lang);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribeStatus("loading");
    setTimeout(() => {
      setSubscribeStatus("success");
      setEmail("");
    }, 1200);
  };

  // English static page UI
  const t = {
    backBtn: "Back to articles",
    recommendedTitle: "Recommended Articles",
    newsletterBadge: "Subscribe to Quantum Insights",
    newsletterTitle: "Get articles like this delivered to your inbox",
    newsletterDesc: "Join our newsletter list. We send one highly curated post every month. Zero spam, only pure engineering value.",
    emailPlaceholder: "Enter your work email",
    btnSubscribe: "Subscribe",
    successSubscribed: "Successfully subscribed!"
  };

  // Helper to parse content with sections to styled JSX
  const renderContent = (text: string) => {
    return text.split("\n\n").map((paragraph, index) => {
      const trimmed = paragraph.trim();
      if (!trimmed) return null;

      // Handle headings
      if (trimmed.startsWith("###")) {
        return (
          <h3 key={index} className="text-xl sm:text-2xl font-bold text-white font-grotesk tracking-tight mt-8 mb-4">
            {trimmed.replace("###", "").trim()}
          </h3>
        );
      }
      if (trimmed.startsWith("##")) {
        return (
          <h2 key={index} className="text-2xl sm:text-3xl font-bold text-white font-grotesk tracking-tight mt-10 mb-4">
            {trimmed.replace("##", "").trim()}
          </h2>
        );
      }

      // Handle bullet points
      if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
        const items = trimmed.split(/\n[\*\-]\s/);
        return (
          <ul key={index} className="list-disc list-inside space-y-2 text-slate-300 text-sm sm:text-base leading-relaxed my-4 pl-4 font-sans">
            {items.map((item, i) => (
              <li key={i}>{item.replace(/^[\*\-]\s/, "").trim()}</li>
            ))}
          </ul>
        );
      }

      // Regular paragraph
      return (
        <p key={index} className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-sans">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <main className="relative min-h-screen bg-[#050B14] overflow-hidden">
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 right-0 h-1 bg-sky-400 z-50 origin-left transition-transform duration-100"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      <Navbar />

      {/* Background Ambient Glow */}
      <div
        className="absolute top-0 left-0 w-full h-[500px] pointer-events-none opacity-15"
        style={{
          background: "radial-gradient(circle at 50% -10%, #38bdf8 0%, transparent 60%)",
          filter: "blur(120px)",
        }}
      />

      <article className="relative pt-32 pb-20">
        <div className="container-narrow relative z-10">
          
          {/* Back Navigation & Language Switcher */}
          <div className="flex items-center justify-between gap-6 mb-8">
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-sky-400 transition-colors uppercase tracking-wider animate-pulse-slow"
            >
              <ArrowLeft size={14} /> {t.backBtn}
            </Link>

            {/* Language Switcher Switch */}
            <div className="flex items-center border border-sky-400/10 rounded-xl p-1 bg-slate-950/40 w-fit">
              <button
                onClick={() => handleLanguageChange("en")}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition-all duration-300 cursor-pointer ${
                  language === "en"
                    ? "bg-sky-400 text-slate-950 shadow-[0_0_10px_rgba(56,189,248,0.2)]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => handleLanguageChange("si")}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition-all duration-300 cursor-pointer ${
                  language === "si"
                    ? "bg-sky-400 text-slate-950 shadow-[0_0_10px_rgba(56,189,248,0.2)]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                සිං
              </button>
            </div>
          </div>

          {/* Post Header info */}
          <div className="space-y-6 mb-10">
            <span className="inline-block px-3.5 py-1.5 rounded-md bg-sky-500/10 border border-sky-400/25 text-sky-400 text-xs font-bold uppercase tracking-wider">
              {blog.category}
            </span>

            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold font-grotesk tracking-tight leading-tight">
              {blog.title[language]}
            </h1>

            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-sky-400/10">
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full overflow-hidden border border-sky-400/20 bg-slate-900">
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
                  <p className="text-sm font-semibold text-white leading-tight">
                    {blog.author.name}
                  </p>
                  <p className="text-xs text-slate-500">{blog.author.role}</p>
                </div>
              </div>

              {/* Date / Reading Time */}
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-600 hidden sm:inline" />
                <span className="flex items-center gap-1">
                  <Calendar size={13} /> {blog.date}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                <span className="flex items-center gap-1">
                  <Clock size={13} /> {blog.readTime}
                </span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden mb-12 border border-sky-400/10 bg-slate-900/50">
            <img
              src={blog.coverImage}
              alt={blog.title[language]}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content Body */}
          <div className="prose prose-invert max-w-none mb-20">
            {renderContent(blog.content[language])}
          </div>

          {/* Bottom Newsletter Card */}
          <div className="border-t border-b border-sky-400/10 py-12 mb-20 relative">
            <div
              className="absolute inset-0 pointer-events-none opacity-10"
              style={{
                background: "radial-gradient(circle at 50% 50%, #38bdf8 0%, transparent 60%)",
                filter: "blur(60px)",
              }}
            />
            <div className="max-w-xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-400/20 text-sky-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                <Sparkles size={11} /> {t.newsletterBadge}
              </div>
              <h3 className="text-white text-xl sm:text-2xl font-bold font-grotesk tracking-tight">
                {t.newsletterTitle}
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                {t.newsletterDesc}
              </p>

              {subscribeStatus === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 bg-sky-500/5 border border-sky-400/20 rounded-xl"
                >
                  <CheckCircle2 size={28} className="text-sky-400 mx-auto mb-2" />
                  <p className="text-white font-bold font-grotesk text-sm">{t.successSubscribed}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                  <div className="relative flex-grow">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.emailPlaceholder}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-sky-400/15 bg-slate-950/50 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-400/30 transition-all font-sans"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={subscribeStatus === "loading"}
                    className="bg-sky-400 hover:bg-sky-500 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_15px_rgba(56,189,248,0.15)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {subscribeStatus === "loading" ? "..." : t.btnSubscribe}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Related Articles Section */}
          {relatedPosts.length > 0 && (
            <div className="space-y-8">
              <h3 className="text-white text-xl sm:text-2xl font-bold font-grotesk tracking-tight">
                {t.recommendedTitle}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {relatedPosts.map((post) => (
                  <Link href={`/blog/${post.slug}`} key={post.id} className="block group">
                    <GlassCard className="flex flex-col h-full overflow-hidden">
                      <div className="aspect-[16/10] overflow-hidden bg-slate-900/50">
                        <img
                          src={post.coverImage}
                          alt={post.title[language]}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-4 flex-grow flex flex-col justify-between">
                        <h4 className="text-white text-sm font-bold font-grotesk tracking-tight line-clamp-2 leading-snug group-hover:text-sky-400 transition-colors">
                          {post.title[language]}
                        </h4>
                        <span className="text-sky-400 text-[10px] font-bold uppercase tracking-wider mt-4 block">
                          {post.category}
                        </span>
                      </div>
                    </GlassCard>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </article>

      <Footer />
    </main>
  );
}
