import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { getBlogPosts } from "@/lib/blog";
import { getDirectDriveImage } from "@/lib/utils/drive";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft, Calendar, User } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const posts = await getBlogPosts();
  const post = posts.find((p) => p.slug === slug);

  if (!post) return {};

  return {
    title: `${post.title} | Quantum Blaze Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const posts = await getBlogPosts();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const directImageUrl = getDirectDriveImage(post.coverImage);

  return (
    <div className="min-h-screen bg-[#050b14] text-slate-100 flex flex-col selection:bg-sky-500/20 selection:text-sky-400">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 pt-32 pb-24 flex-grow w-full">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Blog
        </Link>

        {/* Post Header */}
        <header className="border-b border-slate-900 pb-8 mb-10">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-6 uppercase font-grotesk leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400 font-mono">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-500" />
              {post.publishDate}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-slate-500" />
              Published by {post.author}
            </span>
          </div>
        </header>

        {/* Cover Image */}
        {directImageUrl && (
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-12 border border-white/5 bg-[#0a192f]">
            <Image
              src={directImageUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1200px) 100vw, 800px"
            />
          </div>
        )}

        {/* Markdown Rich Content Render */}
        <div className="w-full">
          <ReactMarkdown
            components={{
              h1: ({node, ...props}) => <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-white mt-8 mb-4 font-grotesk" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-white mt-7 mb-3.5 font-grotesk" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight text-white mt-6 mb-3 font-grotesk" {...props} />,
              p: ({node, ...props}) => <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-5 font-light" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc list-outside ml-6 mb-5 text-slate-400 text-sm md:text-base space-y-2 font-light marker:text-sky-400" {...props} />,
              ol: ({node, ...props}) => <ol className="list-decimal list-outside ml-6 mb-5 text-slate-400 text-sm md:text-base space-y-2 font-light marker:text-sky-400" {...props} />,
              li: ({node, ...props}) => <li className="text-slate-400 pl-1" {...props} />,
              a: ({node, ...props}) => <a className="text-sky-400 hover:text-sky-300 underline transition-colors" {...props} />,
              blockquote: ({node, ...props}) => <blockquote className="border-l-2 border-sky-500 pl-4 italic text-slate-400 my-5 bg-slate-950/20 py-2 pr-2 rounded-r-xl" {...props} />,
              code: ({node, ...props}) => <code className="bg-slate-900 px-1.5 py-0.5 rounded text-sky-400 font-mono text-xs" {...props} />,
              pre: ({node, ...props}) => <pre className="bg-slate-950 p-4 rounded-xl overflow-x-auto border border-slate-900 text-xs font-mono my-5" {...props} />,
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </main>

      <Footer />
    </div>
  );
}
