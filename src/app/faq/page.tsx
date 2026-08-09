"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";

const faqs = [
  {
    category: "General",
    items: [
      {
        question: "What services does Quantum Blaze offer?",
        answer:
          "We specialize in custom software development, web application engineering, desktop application development (using Tauri & Electron), mobile app development, and UI/UX design. We deliver end-to-end solutions tailored to your business needs.",
      },
      {
        question: "How do I get started with a project?",
        answer:
          "Simply reach out to us through our contact form or email. We'll schedule a discovery call to understand your requirements, followed by a detailed proposal with timeline and cost estimates. Once approved, we begin development immediately.",
      },
      {
        question: "Do you offer ongoing support and maintenance?",
        answer:
          "Yes. All our projects come with a complimentary support period after delivery. We also offer long-term maintenance packages that include bug fixes, performance monitoring, feature updates, and priority support.",
      },
    ],
  },
  {
    category: "Technical",
    items: [
      {
        question: "What technologies do you primarily work with?",
        answer:
          "Our core stack includes Next.js, React, TypeScript, Tailwind CSS, Node.js, PostgreSQL, and Prisma for web applications. For desktop apps, we use Tauri and Electron. For mobile, we work with Flutter and React Native. We choose the best technology based on your project requirements.",
      },
      {
        question: "Can you build cross-platform desktop applications?",
        answer:
          "Absolutely. We build lightweight, fast cross-platform desktop applications using Tauri (Rust-based) that run on Windows, macOS, and Linux. Unlike Electron apps, Tauri apps are significantly smaller in size and consume less memory.",
      },
      {
        question: "Do your applications work offline?",
        answer:
          "Yes, we can engineer offline-capable applications. Our POS systems and desktop applications are designed to function seamlessly without an internet connection, with automatic data synchronization when connectivity is restored.",
      },
    ],
  },
  {
    category: "Pricing & Timeline",
    items: [
      {
        question: "How much does a typical project cost?",
        answer:
          "Project costs vary based on complexity, features, and timeline. We provide transparent, detailed quotes after understanding your requirements. We offer both fixed-price and milestone-based payment structures to suit your budget.",
      },
      {
        question: "What is the typical project timeline?",
        answer:
          "A standard web application takes 4-8 weeks, while complex enterprise systems may take 3-6 months. Desktop applications typically require 6-12 weeks. We provide a detailed timeline during the proposal phase and keep you updated throughout development.",
      },
      {
        question: "Do you offer revisions during development?",
        answer:
          "Yes. We follow an agile development process with regular check-ins and demos. You can provide feedback at every milestone, and we incorporate reasonable revisions to ensure the final product matches your vision perfectly.",
      },
    ],
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-slate-800/60 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left cursor-pointer group"
      >
        <span
          className={`text-sm md:text-base font-medium transition-colors duration-200 pr-4 ${
            isOpen ? "text-sky-400" : "text-slate-200 group-hover:text-white"
          }`}
        >
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="shrink-0"
        >
          <ChevronDown
            className={`w-4 h-4 transition-colors duration-200 ${
              isOpen ? "text-sky-400" : "text-slate-500"
            }`}
          />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p className="text-sm text-slate-400 leading-relaxed pb-5 pr-8">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-[#050b14] text-slate-100 flex flex-col selection:bg-sky-500/20 selection:text-sky-400">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 pt-32 pb-24 flex-grow w-full">
        {/* Page Header */}
        <header className="border-b border-slate-900 pb-10 mb-16 text-center flex flex-col items-center">
          <p className="text-xs font-semibold tracking-widest uppercase text-sky-400 mb-3">
            Support & Knowledge Base
          </p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white uppercase font-grotesk">
            FAQ
          </h1>
          <p className="text-lg text-slate-400 font-light max-w-2xl leading-relaxed mt-4 mx-auto">
            Answers to common questions about our services, processes, and
            technology stack.
          </p>
        </header>

        {/* FAQ Categories */}
        <div className="space-y-12">
          {faqs.map((category) => (
            <section key={category.category}>
              <div className="flex items-center gap-2.5 mb-6">
                <MessageCircleQuestion className="w-4 h-4 text-sky-500" />
                <h2 className="text-xs font-bold uppercase tracking-widest text-sky-400">
                  {category.category}
                </h2>
              </div>

              <div className="rounded-2xl border border-slate-800/60 bg-slate-900/10 px-6">
                {category.items.map((item, idx) => {
                  const key = `${category.category}-${idx}`;
                  return (
                    <FAQItem
                      key={key}
                      question={item.question}
                      answer={item.answer}
                      isOpen={!!openItems[key]}
                      onToggle={() => toggleItem(key)}
                    />
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center border-t border-slate-900 pt-12">
          <p className="text-slate-400 text-sm mb-4">
            Couldn&apos;t find what you&apos;re looking for?
          </p>
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 text-sm font-semibold text-sky-400 hover:text-sky-300 transition-colors"
          >
            Get in Touch With Us →
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
