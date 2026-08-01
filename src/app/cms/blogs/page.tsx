"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams, notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import ReactMarkdown from "react-markdown";
import {
  Copy,
  Bold,
  Italic,
  Heading,
  List,
  Link as LinkIcon,
  Check,
  LogOut,
  Code,
  Minus,
  Quote,
  SquareCode,
} from "lucide-react";

function BlogCMSPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const key = searchParams.get("key");
  const predefinedKey = "Qb2024@";

  // Auth & Parameter checks
  useEffect(() => {
    // Check Session Storage
    if (typeof window !== "undefined") {
      const session = sessionStorage.getItem("qb_secure_session");
      if (session !== "active") {
        router.push("/auth/secure?redirect=/cms/blogs?key=" + predefinedKey);
      }
    }
  }, [router]);

  // Editor states
  const [markdown, setMarkdown] = useState("");
  const [copied, setCopied] = useState(false);

  const insertTag = (tagOpen: string, tagClose = "") => {
    const textarea = document.getElementById("editor") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end);
    const replacement = tagOpen + selected + tagClose;

    setMarkdown(text.substring(0, start) + replacement + text.substring(end));

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + tagOpen.length,
        start + tagOpen.length + selected.length
      );
    }, 50);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("qb_secure_session");
    router.push("/auth/secure");
  };

  // If the key is incorrect, trigger 404
  if (key !== predefinedKey) {
    notFound();
    return null;
  }

  return (
    <div className="min-h-screen bg-[#050b14] text-white flex flex-col selection:bg-emerald-500/20 selection:text-emerald-400">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24 w-full flex-grow flex flex-col">
        {/* Header toolbar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-900 pb-6 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white uppercase font-grotesk">
              Blog Post Builder
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Compose formatted rich text posts in Markdown for your Google
              Sheets CMS.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-950 border border-slate-900 text-sm text-slate-400 hover:text-white hover:border-slate-800 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Lock Console
          </button>
        </div>

        {/* Editor Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-grow">
          {/* Left: Input Console */}
          <div className="flex flex-col gap-4 bg-slate-950/40 border border-slate-900 p-6 rounded-3xl backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-200">Editor Panel</h2>

              {/* Quick toolbar */}
              <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-900 p-1.5 rounded-xl">
                {/* Bold */}
                <div className="relative group">
                  <button
                    onClick={() => insertTag("**", "**")}
                    className="p-2 hover:bg-slate-900 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer block"
                  >
                    <Bold className="w-4 h-4" />
                  </button>
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 text-[10px] font-bold text-slate-200 bg-slate-900 border border-slate-800 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none whitespace-nowrap z-50">
                    Bold
                  </span>
                </div>

                {/* Italic */}
                <div className="relative group">
                  <button
                    onClick={() => insertTag("*", "*")}
                    className="p-2 hover:bg-slate-900 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer block"
                  >
                    <Italic className="w-4 h-4" />
                  </button>
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 text-[10px] font-bold text-slate-200 bg-slate-900 border border-slate-800 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none whitespace-nowrap z-50">
                    Italic
                  </span>
                </div>

                {/* Heading */}
                <div className="relative group">
                  <button
                    onClick={() => insertTag("### ")}
                    className="p-2 hover:bg-slate-900 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer block"
                  >
                    <Heading className="w-4 h-4" />
                  </button>
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 text-[10px] font-bold text-slate-200 bg-slate-900 border border-slate-800 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none whitespace-nowrap z-50">
                    Heading
                  </span>
                </div>

                {/* Bullet List */}
                <div className="relative group">
                  <button
                    onClick={() => insertTag("- ")}
                    className="p-2 hover:bg-slate-900 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer block"
                  >
                    <List className="w-4 h-4" />
                  </button>
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 text-[10px] font-bold text-slate-200 bg-slate-900 border border-slate-800 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none whitespace-nowrap z-50">
                    Bullet List
                  </span>
                </div>

                {/* Link */}
                <div className="relative group">
                  <button
                    onClick={() => insertTag("[", "](url)")}
                    className="p-2 hover:bg-slate-900 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer block"
                  >
                    <LinkIcon className="w-4 h-4" />
                  </button>
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 text-[10px] font-bold text-slate-200 bg-slate-900 border border-slate-800 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none whitespace-nowrap z-50">
                    Insert Link
                  </span>
                </div>

                {/* Code Block */}
                <div className="relative group">
                  <button
                    onClick={() => insertTag("\n```js\n", "\n```\n")}
                    className="p-2 hover:bg-slate-900 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer block"
                  >
                    <SquareCode className="w-4 h-4" />
                  </button>
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 text-[10px] font-bold text-slate-200 bg-slate-900 border border-slate-800 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none whitespace-nowrap z-50">
                    Code Block
                  </span>
                </div>

                {/* Highlight Text */}
                <div className="relative group">
                  <button
                    onClick={() => insertTag("`", "`")}
                    className="p-2 hover:bg-slate-900 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer block"
                  >
                    <Code className="w-4 h-4" />
                  </button>
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 text-[10px] font-bold text-slate-200 bg-slate-900 border border-slate-800 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none whitespace-nowrap z-50">
                    Highlight Text
                  </span>
                </div>

                {/* Horizontal Line */}
                <div className="relative group">
                  <button
                    onClick={() => insertTag("\n---\n")}
                    className="p-2 hover:bg-slate-900 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer block"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 text-[10px] font-bold text-slate-200 bg-slate-900 border border-slate-800 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none whitespace-nowrap z-50">
                    Divider Line
                  </span>
                </div>

                {/* Quote */}
                <div className="relative group">
                  <button
                    onClick={() => insertTag("\n> ")}
                    className="p-2 hover:bg-slate-900 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer block"
                  >
                    <Quote className="w-4 h-4" />
                  </button>
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 text-[10px] font-bold text-slate-200 bg-slate-900 border border-slate-800 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none whitespace-nowrap z-50">
                    Quote
                  </span>
                </div>
              </div>
            </div>

            <textarea
              id="editor"
              placeholder="Write your story here in Markdown..."
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              className="w-full h-[500px] bg-slate-950/80 border border-slate-900 p-5 rounded-2xl text-slate-300 font-mono text-sm resize-none focus:outline-none focus:border-sky-500/40 transition-colors"
            />
          </div>

          {/* Right: Preview Console */}
          <div className="flex flex-col gap-4 bg-slate-950/40 border border-slate-900 p-6 rounded-3xl backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-200">Live Preview</h2>

              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm transition-colors cursor-pointer"
              >
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                {copied ? "Copied!" : "Copy MD Output"}
              </button>
            </div>

            {/* Markdown rendered output */}
            <div className="w-full h-[500px] bg-slate-950/80 border border-slate-900 p-6 rounded-2xl overflow-y-auto">
              {markdown ? (
                <div className="w-full">
                  <ReactMarkdown
                    components={{
                      h1: ({ node, ...props }) => (
                        <h1
                          className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-white mt-6 mb-3 font-grotesk"
                          {...props}
                        />
                      ),
                      h2: ({ node, ...props }) => (
                        <h2
                          className="text-xl md:text-2xl font-bold uppercase tracking-tight text-white mt-5 mb-2.5 font-grotesk"
                          {...props}
                        />
                      ),
                      h3: ({ node, ...props }) => (
                        <h3
                          className="text-lg md:text-xl font-bold uppercase tracking-tight text-white mt-4 mb-2 font-grotesk"
                          {...props}
                        />
                      ),
                      p: ({ node, ...props }) => (
                        <p
                          className="text-slate-400 text-sm leading-relaxed mb-4 font-light"
                          {...props}
                        />
                      ),
                      ul: ({ node, ...props }) => (
                        <ul
                          className="list-disc list-outside ml-5 mb-4 text-slate-400 text-sm space-y-1.5 font-light marker:text-sky-400"
                          {...props}
                        />
                      ),
                      ol: ({ node, ...props }) => (
                        <ol
                          className="list-decimal list-outside ml-5 mb-4 text-slate-400 text-sm space-y-1.5 font-light marker:text-sky-400"
                          {...props}
                        />
                      ),
                      li: ({ node, ...props }) => (
                        <li className="text-slate-400 pl-1" {...props} />
                      ),
                      a: ({ node, ...props }) => (
                        <a
                          className="text-sky-400 hover:text-sky-300 underline transition-colors"
                          {...props}
                        />
                      ),
                      blockquote: ({ node, ...props }) => (
                        <blockquote
                          className="border-l-2 border-sky-500 pl-4 italic text-slate-400 my-4 bg-slate-950/20 py-2 pr-2 rounded-r-xl"
                          {...props}
                        />
                      ),
                      code: ({ node, ...props }) => (
                        <code
                          className="bg-slate-900 px-1.5 py-0.5 rounded text-sky-400 font-mono text-xs"
                          {...props}
                        />
                      ),
                      pre: ({ node, ...props }) => (
                        <pre
                          className="bg-slate-950 p-4 rounded-xl overflow-x-auto border border-slate-900 text-xs font-mono my-4"
                          {...props}
                        />
                      ),
                    }}
                  >
                    {markdown}
                  </ReactMarkdown>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-500 text-sm italic">
                  Preview will appear as you type...
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function BlogCMSPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#050b14] text-white flex items-center justify-center font-grotesk text-sm tracking-wider uppercase">
          Loading Dashboard...
        </div>
      }
    >
      <BlogCMSPageContent />
    </Suspense>
  );
}
