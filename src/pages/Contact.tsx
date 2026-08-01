import React, { useState } from "react";
import BackgroundMotion from "@/components/BackgroundMotion";
import SeoHead from "@/components/SeoHead";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, Clock, Mailbox, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { CloudflareTurnstile } from "@/components/CloudflareTurnstile";
import { contact } from "@/data/contact";
import type { ContactInfoItem } from "@/data/types";
import { CyberCodeFormField, CyberCodeButton, CyberCodeSectionLabel } from "@/components/cybercode/CyberCodeUIKit";

const CONTACT_ICONS: Record<ContactInfoItem["icon"], LucideIcon> = {
  Mail,
  MapPin,
  Mailbox,
  Clock,
};

// Official Cloudflare Turnstile "Always Passes" test key
const TURNSTILE_SITE_KEY = import.meta.env.TURNSTILE_SITE_KEY || "1x00000000000000000000AA";

export default function Contact() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [status, setStatus] = useState<null | { ok: boolean; message: string }>(
    null
  );
  const [loading, setLoading] = useState(false);

  function update(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);

    if (!form.firstName || !form.email || !form.subject) {
      setStatus({
        ok: false,
        message: contact.validation.missingFields,
      });
      return;
    }

    if (!turnstileToken) {
      setStatus({
        ok: false,
        message: contact.validation.missingTurnstile,
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, turnstileToken }),
      });

      const data = (await res.json()) as { error?: string; ok?: boolean };

      if (!res.ok) {
        setStatus({
          ok: false,
          message: data?.error || contact.validation.genericError,
        });
      } else {
        setStatus({
          ok: true,
          message: contact.validation.success,
        });
        setForm({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          subject: "",
          message: "",
        });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setStatus({ ok: false, message: msg || "Unknown error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen pt-24 pb-20">
      <SeoHead
        title="Contact | Corbin Meier"
        description="Ready to bring your project to life? Get in touch with Corbin Meier to discuss your next software engineering project."
        path="/contact"
      />
      <BackgroundMotion />
      <main className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Header & Info */}
          <div className="lg:col-span-5">
            <header className="mb-12 text-center sm:text-left">
              <h1 className="text-5xl sm:text-7xl font-serif mb-6 tracking-tight">{contact.heading}</h1>
              <p className="text-narrative">
                {contact.subhead}
              </p>
            </header>

            <div className="space-y-8">
              {contact.infoItems.map((item) => {
                const Icon = CONTACT_ICONS[item.icon];
                return (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted mb-1">{item.label}</p>
                    <p className="text-lg font-medium">{item.value}</p>
                  </div>
                </div>
                );
              })}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative glass-panel p-8 sm:p-12 border-accent/10"
            >
              <CyberCodeSectionLabel>// contact.form</CyberCodeSectionLabel>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted">{contact.formLabels.firstName}</label>
                    <CyberCodeFormField
                      value={form.firstName}
                      onChange={(e) => update("firstName", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted">{contact.formLabels.lastName}</label>
                    <CyberCodeFormField
                      value={form.lastName}
                      onChange={(e) => update("lastName", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted">{contact.formLabels.email}</label>
                    <CyberCodeFormField
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted">{contact.formLabels.phone}</label>
                    <CyberCodeFormField
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted">{contact.formLabels.subject}</label>
                  <CyberCodeFormField
                    value={form.subject}
                    onChange={(e) => update("subject", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted">{contact.formLabels.projectDetails}</label>
                  <CyberCodeFormField
                    multiline
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    rows={5}
                  />
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <CyberCodeButton type="submit" disabled={loading} className="w-full sm:w-auto disabled:opacity-60">
                    {loading ? contact.formLabels.submitting : (
                      <>
                        {contact.formLabels.submit}
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </CyberCodeButton>

                  {TURNSTILE_SITE_KEY && (
                    <div className="border border-border rounded-xl overflow-hidden">
                      <CloudflareTurnstile
                        siteKey={TURNSTILE_SITE_KEY}
                        onVerify={(token) => setTurnstileToken(token)}
                      />
                    </div>
                  )}
                </div>

                {status && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "p-4 rounded-xl text-sm font-medium border",
                      status.ok
                        ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                        : "bg-[var(--danger-soft)] text-[var(--danger)] border-[rgba(var(--danger-rgb),0.35)]"
                    )}
                  >
                    {status.message}
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
