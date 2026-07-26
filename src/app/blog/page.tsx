import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getBlogPosts } from "@/lib/blog";
import { getDirectDriveImage } from "@/lib/utils/drive";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, Calendar, User } from "lucide-react";

export const metadata = {
  title: "Blogs & Insights | Quantum Blaze",
  description: "Deep dives into software architecture, native desktop application engineering, Next.js scaling, and modern product development paradigms.",
};

export default async function BlogListingPage() {
  const posts = await getBlogPosts();

  return (
    <div className="min-h-screen bg-[#050b14] text-slate-100 flex flex-col selection:bg-sky-500/20 selection:text-sky-400">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 pt-32 pb-24 flex-grow w-full">
        {/* Page Header */}
        <header className="border-b border-slate-900 pb-10 mb-16">
          <p className="text-xs font-semibold tracking-widest uppercase text-sky-400 mb-3">Insights & Architecture</p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white uppercase font-grotesk">
            Quantum Blogs
          </h1>
          <p className="text-lg text-slate-400 font-light max-w-2xl leading-relaxed mt-4">
            Technical writing, guides, and engineering logs from our development team.
          </p>
        </header>

        {/* Blogs Grid (2 Columns, Clean, cardless border design) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {posts.map((post) => {
            const imageUrl = getDirectDriveImage(post.coverImage);
            return (
              <div key={post.id} className="group relative flex flex-col transition-all duration-300">
                
                {/* Image Container */}
                {imageUrl && (
                  <Link href={`/blog/${post.slug}`} className="relative rounded-2xl overflow-hidden bg-[#0a192f] mb-6 aspect-[16/10] border border-white/5 block">
                    <Image
                      src={imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                  </Link>
                )}

                {/* Metadata Row */}
                <div className="flex items-center gap-4 text-xs text-slate-400 mb-3 font-mono">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    {post.publishDate}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-500" />
                    {post.author}
                  </span>
                </div>

                {/* Title */}
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-sky-400 transition-colors leading-tight uppercase font-grotesk">
                    {post.title}
                  </h2>
                </Link>

                {/* Excerpt */}
                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                  {post.excerpt}
                </p>

                {/* CTA Link */}
                <div className="mt-auto">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold tracking-wider text-sky-400 group-hover:text-sky-300 transition-colors uppercase"
                  >
                    Read Article
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>

              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
