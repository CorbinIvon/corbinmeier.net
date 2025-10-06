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
      <h1 className="text-3xl font-semibold mb-6">Contact</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">First Name</label>
            <input
              className="mt-1 block w-full rounded border px-3 py-2"
              value={form.firstName}
              onChange={(e) => update("firstName", e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Last Name</label>
            <input
              className="mt-1 block w-full rounded border px-3 py-2"
              value={form.lastName}
              onChange={(e) => update("lastName", e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input
            className="mt-1 block w-full rounded border px-3 py-2"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            className="mt-1 block w-full rounded border px-3 py-2"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Subject</label>
          <input
            className="mt-1 block w-full rounded border px-3 py-2"
            value={form.subject}
            onChange={(e) => update("subject", e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Message</label>
          <textarea
            className="mt-1 block w-full rounded border px-3 py-2"
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            rows={4}
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-60"
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
