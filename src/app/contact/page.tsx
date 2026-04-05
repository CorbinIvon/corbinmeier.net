"use client";

import React, { useState } from "react";

export default function ContactPage() {
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

    // Minimal client-side validation
    if (!form.firstName || !form.email || !form.subject) {
      setStatus({
        ok: false,
        message: "Please fill out First name, Email and Subject.",
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

      const data = await res.json();
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

  return (
    <main className="mx-auto max-w-xl px-6 py-12">
      <h1 className="text-3xl font-semibold mb-6 text-slate-900 dark:text-slate-100">Contact</h1>

      <div className="mb-8 p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg">
        <p className="text-sm text-slate-700 dark:text-slate-200 mb-2">
          <strong>Phone:</strong> (530) 487-8104
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
          I typically respond within 24 hours.
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          No commitment needed — let&apos;s just talk about your project.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">First Name</label>
            <input
              className="mt-1 block w-full rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-3 py-2"
              value={form.firstName}
              onChange={(e) => update("firstName", e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Last Name</label>
            <input
              className="mt-1 block w-full rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-3 py-2"
              value={form.lastName}
              onChange={(e) => update("lastName", e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Phone</label>
          <input
            className="mt-1 block w-full rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-3 py-2"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Email</label>
          <input
            type="email"
            className="mt-1 block w-full rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-3 py-2"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Subject</label>
          <input
            className="mt-1 block w-full rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-3 py-2"
            value={form.subject}
            onChange={(e) => update("subject", e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Message</label>
          <textarea
            className="mt-1 block w-full rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-3 py-2"
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            rows={4}
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center rounded-full bg-indigo-600 hover:bg-indigo-700 px-5 py-2 text-white font-medium shadow-sm transition-colors disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </div>

        {status && (
          <p
            className={`mt-4 ${status.ok ? "text-green-600" : "text-red-600"}`}
          >
            {status.message}
          </p>
        )}
      </form>
    </main>
  );
}
