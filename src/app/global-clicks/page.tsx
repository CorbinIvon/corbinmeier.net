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
        <h1 className="text-3xl font-semibold">Global Clicks</h1>

        <p className="text-muted-foreground">
          A single global counter stored on the server. Click the button to
          increment it.
        </p>
        <p className="text-sm mt-2">
          API docs:{" "}
          <a href="/api" className="text-indigo-600 hover:underline">
            /api
          </a>
        </p>

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
      </main>
    </div>
  );
}
