"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams, notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import ReactMarkdown from "react-markdown";
import { Copy, Bold, Italic, Heading, List, Link as LinkIcon, Check, LogOut } from "lucide-react";

export default function BlogCMSPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const key = searchParams.get("key");

  // Auth & Parameter checks
  useEffect(() => {
    // Check Session Storage
    if (typeof window !== "undefined") {
      const session = sessionStorage.getItem("qb_secure_session");
      if (session !== "active") {
        router.push("/auth/secure?redirect=/cms/blogs?key=Qb2024@#");
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
      textarea.setSelectionRange(start + tagOpen.length, start + tagOpen.length + selected.length);
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
  if (key !== "Qb2024@") {
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
            <p className="text-sm text-slate-400 mt-1">Compose formatted rich text posts in Markdown for your Google Sheets CMS.</p>
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
                <button 
                  onClick={() => insertTag("**", "**")} 
                  title="Bold"
                  className="p-2 hover:bg-slate-900 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <Bold className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => insertTag("*", "*")} 
                  title="Italic"
                  className="p-2 hover:bg-slate-900 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <Italic className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => insertTag("### ")} 
                  title="Heading"
                  className="p-2 hover:bg-slate-900 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <Heading className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => insertTag("- ")} 
                  title="Bullet List"
                  className="p-2 hover:bg-slate-900 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <List className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => insertTag("[", "](url)")} 
                  title="Insert Link"
                  className="p-2 hover:bg-slate-900 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <LinkIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            <textarea
              id="editor"
              placeholder="Write your story here in Markdown..."
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              className="w-full h-[500px] bg-slate-950/80 border border-slate-900 p-5 rounded-2xl text-slate-300 font-mono text-sm resize-none focus:outline-none focus:border-emerald-500/40 transition-colors"
            />
          </div>

          {/* Right: Preview Console */}
          <div className="flex flex-col gap-4 bg-slate-950/40 border border-slate-900 p-6 rounded-3xl backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-200">Live Preview</h2>
              
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied!" : "Copy MD Output"}
              </button>
            </div>

            {/* Markdown rendered output */}
            <div className="w-full h-[500px] bg-slate-950/80 border border-slate-900 p-6 rounded-2xl overflow-y-auto">
              {markdown ? (
                <article className="prose prose-invert prose-emerald prose-sm max-w-none">
                  <ReactMarkdown>{markdown}</ReactMarkdown>
                </article>
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
