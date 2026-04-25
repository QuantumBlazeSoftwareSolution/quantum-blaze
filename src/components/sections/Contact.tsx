"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { GlowButton } from "@/components/ui/GlowButton";
import { SectionLabel } from "@/components/ui/SectionLabel";

const projectTypes = [
  "Enterprise SaaS Platform",
  "Mobile Application",
  "Custom Web App",
  "E-Commerce",
  "Data & Analytics",
  "Other",
];

export function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    projectType: "",
    budget: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate submission
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  const inputClass = `
    w-full rounded-xl px-4 py-3.5 text-sm text-white
    bg-white/5 border border-sky-500/15
    outline-none placeholder-slate-600
    focus:border-sky-400/60 focus:ring-2 focus:ring-sky-400/10
    transition-all duration-300
    hover:border-sky-500/30
  `;

  return (
    <section
      id="contact"
      className="relative section-padding overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Glow orb behind form */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: "rgba(14,165,233,0.05)" }}
      />

      <div className="container-wide">
        {/* Big CTA headline */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mb-6"
          >
            <SectionLabel>Get In Touch</SectionLabel>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="font-bold leading-none mb-6"
            style={{
              fontSize: "clamp(2.5rem, 7vw, 6rem)",
              fontFamily: "var(--font-grotesk)",
              color: "white",
            }}
          >
            Let&apos;s Build Something{" "}
            <span className="gradient-text block md:inline">
              Extraordinary
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="text-base md:text-lg max-w-2xl mx-auto"
            style={{ color: "var(--text-muted)" }}
          >
            Tell us about your project. We&apos;ll get back to you within 24
            hours with a free consultation.
          </motion.p>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass rounded-3xl p-12 text-center"
            >
              <div className="text-5xl mb-4">🚀</div>
              <h3
                className="text-2xl font-bold text-white mb-3"
                style={{ fontFamily: "var(--font-grotesk)" }}
              >
                Message Sent!
              </h3>
              <p style={{ color: "var(--text-muted)" }}>
                We&apos;ll be in touch within 24 hours. Excited to work with
                you!
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="glass rounded-3xl p-8 md:p-12 space-y-5"
            >
              {/* Name + Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-xs font-semibold tracking-wider uppercase mb-2"
                    style={{ color: "var(--text-muted)" }}
                    htmlFor="name"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="John Doe"
                    value={formState.name}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label
                    className="block text-xs font-semibold tracking-wider uppercase mb-2"
                    style={{ color: "var(--text-muted)" }}
                    htmlFor="email"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="john@company.com"
                    value={formState.email}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Project type */}
              <div>
                <label
                  className="block text-xs font-semibold tracking-wider uppercase mb-2"
                  style={{ color: "var(--text-muted)" }}
                  htmlFor="projectType"
                >
                  Project Type
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formState.projectType}
                  onChange={handleChange}
                  className={`${inputClass} appearance-none cursor-pointer`}
                  style={{ color: formState.projectType ? "white" : "#64748b" }}
                >
                  <option value="" disabled style={{ background: "#0a1628" }}>
                    Select a project type...
                  </option>
                  {projectTypes.map((type) => (
                    <option
                      key={type}
                      value={type}
                      style={{ background: "#0a1628", color: "white" }}
                    >
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Budget */}
              <div>
                <label
                  className="block text-xs font-semibold tracking-wider uppercase mb-2"
                  style={{ color: "var(--text-muted)" }}
                  htmlFor="budget"
                >
                  Estimated Budget
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formState.budget}
                  onChange={handleChange}
                  className={`${inputClass} appearance-none cursor-pointer`}
                  style={{ color: formState.budget ? "white" : "#64748b" }}
                >
                  <option value="" disabled style={{ background: "#0a1628" }}>
                    Select budget range...
                  </option>
                  {[
                    "< $10,000",
                    "$10,000 – $25,000",
                    "$25,000 – $50,000",
                    "$50,000 – $100,000",
                    "$100,000+",
                  ].map((b) => (
                    <option
                      key={b}
                      value={b}
                      style={{ background: "#0a1628", color: "white" }}
                    >
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label
                  className="block text-xs font-semibold tracking-wider uppercase mb-2"
                  style={{ color: "var(--text-muted)" }}
                  htmlFor="message"
                >
                  Tell Us About Your Project
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Describe your vision, goals, timeline, and any technical requirements..."
                  value={formState.message}
                  onChange={handleChange}
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Submit */}
              <GlowButton
                type="submit"
                variant="solid"
                size="lg"
                className="w-full justify-center"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
                    />
                    Sending...
                  </span>
                ) : (
                  <>
                    Send Message <span>→</span>
                  </>
                )}
              </GlowButton>

              <p
                className="text-center text-xs"
                style={{ color: "var(--text-muted)" }}
              >
                Free consultation · No commitment · 24hr response
              </p>
            </form>
          )}
        </motion.div>

        {/* Contact info chips */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-4 mt-10"
        >
          {[
            { icon: "📧", label: "hello@quantumblaze.io" },
            { icon: "📍", label: "Colombo, Sri Lanka" },
            { icon: "⏱", label: "Response within 24h" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2 glass px-4 py-2 rounded-xl"
            >
              <span>{item.icon}</span>
              <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
