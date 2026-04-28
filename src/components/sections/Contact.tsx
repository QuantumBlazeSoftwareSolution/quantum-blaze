"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { GlowButton } from "@/components/ui/GlowButton";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Mail, MapPin, Clock, Phone } from "lucide-react";

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
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { sendContactEmail } = await import("@/lib/actions/email/contact");
      const result = await sendContactEmail(formState);

      if (result.success) {
        setSubmitted(true);
      } else {
        setError(result.error || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
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
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[600px] rounded-full blur-[150px] pointer-events-none"
        style={{ background: "rgba(14,165,233,0.03)" }}
      />

      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left Side: Headline and Info */}
          <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-center lg:justify-start mb-6"
            >
              <SectionLabel>Get In Touch</SectionLabel>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="font-bold leading-[1.1] mb-6"
              style={{
                fontSize: "clamp(2.5rem, 8vw, 5rem)",
                fontFamily: "var(--font-grotesk)",
                color: "white",
              }}
            >
              Let&apos;s Build Something{" "}
              <span className="gradient-text block">Extraordinary</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="text-base md:text-lg max-w-xl"
              style={{ color: "var(--text-muted)" }}
            >
              Tell us about your project. We&apos;ll get back to you within 24
              hours with a free consultation and project roadmap.
            </motion.p>

            {/* Contact info chips */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4 mt-12"
            >
              {[
                {
                  icon: <Mail className="w-5 h-5 text-sky-400" />,
                  label: "quantumblazesoftwaresolution@gmail.com",
                  sub: "Email Us",
                },
                {
                  icon: <Phone className="w-5 h-5 text-sky-400" />,
                  label: "+94 71 989 2932 / +94 78 805 6838",
                  sub: "Call Us",
                },
                {
                  icon: <MapPin className="w-5 h-5 text-sky-400" />,
                  label: "Urapola, Sri Lanka",
                  sub: "Our Office",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-4 glass px-5 py-3 rounded-xl w-full sm:w-auto border border-sky-500/10 hover:border-sky-500/30 transition-colors"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-sky-500/5 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div className="flex flex-col text-left overflow-hidden flex-1">
                    <span className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold mb-0.5">
                      {item.sub}
                    </span>
                    <span
                      className="text-sm font-medium break-all sm:break-normal"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {item.label}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Side: Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="w-full max-w-xl mx-auto lg:mx-0 lg:ml-auto"
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
                className="glass rounded-3xl p-8 md:p-10 space-y-5"
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
                    style={{
                      color: formState.projectType ? "white" : "#64748b",
                    }}
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
                      "< 100,000 LKR",
                      "100,000 – 500,000 LKR",
                      "500,000 – 1,000,000 LKR",
                      "1,000,000 – 5,000,000 LKR",
                      "5,000,000+ LKR",
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
                    rows={4}
                    placeholder="Describe your vision, goals, timeline, and any technical requirements..."
                    value={formState.message}
                    onChange={handleChange}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-xs font-semibold bg-red-400/10 p-3 rounded-xl border border-red-400/20"
                  >
                    {error}
                  </motion.p>
                )}

                {/* Submit */}
                <GlowButton
                  type="submit"
                  variant="solid"
                  size="lg"
                  className="w-full justify-center mt-2"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <>
                      Send Message <span>→</span>
                    </>
                  )}
                </GlowButton>

                <p
                  className="text-center text-[11px] uppercase tracking-wider font-semibold mt-4"
                  style={{ color: "var(--text-muted)" }}
                >
                  Free consultation · No commitment
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
