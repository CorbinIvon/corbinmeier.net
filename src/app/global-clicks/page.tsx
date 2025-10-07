"use client";

import { useEffect, useState } from "react";

export default function GlobalClicksPage() {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  async function fetchCount() {
    try {
      const res = await fetch("/api/clicks");
      if (res.ok) {
        const data = await res.json();
        setCount(data.count ?? 0);
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchCount();

    // Poll the count every 2 seconds
    const id = setInterval(() => {
      fetchCount();
    }, 2000);

    return () => clearInterval(id);
  }, []);

  async function handleClick() {
    setLoading(true);
    try {
      const res = await fetch("/api/clicks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "Increment-Count" }),
      });
      if (res.ok) {
        const data = await res.json();
        setCount(data.count ?? 0);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="font-sans min-h-screen px-4 py-8 sm:px-8 sm:py-20">
      <main className="w-full max-w-3xl mx-auto flex flex-col gap-8 items-center">
        {/* Counter first for quick visibility */}
        <div className="flex flex-col items-center gap-4 mt-6">
          <div className="text-6xl font-bold">{count ?? "—"}</div>

          <button
            onClick={handleClick}
            disabled={loading}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold shadow-lg hover:opacity-95 disabled:opacity-60 transition"
          >
            {loading ? "..." : "Give a Global Click"}
          </button>
        </div>

        <h1 className="text-3xl font-semibold">Global Clicks</h1>

        <p className="text-muted-foreground">
          Every click is recorded as a timestamp in a database. Give it a try!
        </p>

        <p className="text-sm mt-2">
          API docs:{" "}
          <a href="/api" className="text-indigo-600 hover:underline">
            /api
          </a>
        </p>

        {/* Tools section describing Supabase and Prisma */}
        <section className="w-full max-w-2xl bg-surface/30 rounded-lg p-4 mt-6">
          <h2 className="text-lg font-medium">Tools</h2>
          <p className="text-sm text-muted-foreground mt-2">
            This demo uses a hosted Postgres database (Supabase) and Prisma as
            the ORM layer.
          </p>
          <ul className="list-disc list-inside mt-3 text-sm space-y-2">
            <li>
              <strong>Supabase</strong> — a hosted backend-as-a-service that
              provides Postgres databases, authentication, and realtime APIs.
              Learn more at{" "}
              <a
                href="https://supabase.com"
                target="_blank"
                rel="noreferrer"
                className="text-indigo-600 hover:underline"
              >
                https://supabase.com
              </a>
              .
            </li>
            <li>
              <strong>Prisma</strong> — a TypeScript-friendly ORM (database
              toolkit) that generates a typed client to query your database.
              Learn more at{" "}
              <a
                href="https://prisma.io"
                target="_blank"
                rel="noreferrer"
                className="text-indigo-600 hover:underline"
              >
                https://prisma.io
              </a>
              .
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
