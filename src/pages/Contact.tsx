import React, { useState } from "react";
import BackgroundMotion from "@/components/BackgroundMotion";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Contact() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

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
        message: "Please fill out at least your name, email, and the subject.",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = (await res.json()) as { error?: string; ok?: boolean };

      if (!res.ok) {
        setStatus({
          ok: false,
          message: data?.error || "Failed to send message",
        });
      } else {
        setStatus({
          ok: true,
          message: "Message sent — thank you! A confirmation was emailed.",
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

  const infoItems = [
    { icon: Mail, label: "Email", value: "contact@corbinmeier.net" },
    { icon: MapPin, label: "Location", value: "California, USA" },
    { icon: Clock, label: "Response Time", value: "< 24 Hours" },
  ];

  return (
    <div className="relative min-h-screen pt-24 pb-20">
      <BackgroundMotion />
      <main className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Header & Info */}
          <div className="lg:col-span-5">
            <header className="mb-12">
              <h1 className="text-5xl sm:text-7xl font-serif mb-6 tracking-tight">Contact</h1>
              <p className="text-narrative">
                Ready to bring your project to life? Whether you have a specific 
                requirement or just want to explore possibilities, I&apos;m here to help.
              </p>
            </header>

            <div className="space-y-8">
              {infoItems.map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted mb-1">{item.label}</p>
                    <p className="text-lg font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-panel p-8 sm:p-12 border-accent/10 shadow-2xl shadow-accent/5"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted">First Name</label>
                    <input
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                      value={form.firstName}
                      onChange={(e) => update("firstName", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted">Last Name</label>
                    <input
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                      value={form.lastName}
                      onChange={(e) => update("lastName", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted">Email Address</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted">Subject</label>
                  <input
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                    value={form.subject}
                    onChange={(e) => update("subject", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted">Project Details</label>
                  <textarea
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    rows={5}
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-primary text-background px-10 py-4 font-bold text-lg transition-all hover:scale-105 hover:bg-accent hover:text-white disabled:opacity-60"
                  >
                    {loading ? "Sending..." : (
                      <>
                        Send Message
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

                {status && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "p-4 rounded-xl text-sm font-medium",
                      status.ok ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" : "bg-red-500/10 text-red-500 border border-red-500/20"
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
