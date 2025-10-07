"use client";

import { useEffect, useState, useRef } from "react";

type DigitProps = {
  value: number;
  prevValue: number | null;
  index: number;
};

function Digit({ value, prevValue, index }: DigitProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [digitHeight, setDigitHeight] = useState(0);
  const [appeared, setAppeared] = useState(prevValue !== null);

  useEffect(() => {
    // measure height of one digit
    const el = containerRef.current;
    if (!el) return;
    const first = el.querySelector<HTMLDivElement>(".digit-item");
    if (first) {
      const h = first.getBoundingClientRect().height;
      setDigitHeight(h);
    }
  }, []);

  useEffect(() => {
    // If this digit didn't exist before, trigger appear animation
    if (prevValue === null) {
      setAppeared(false);
      // next tick -> appear
      const t = setTimeout(() => setAppeared(true), 20);
      return () => clearTimeout(t);
    }
    setAppeared(true);
  }, [prevValue]);

  const translateY = -value * digitHeight;

  return (
    <span
      className="inline-block align-middle overflow-hidden"
      style={{
        height: digitHeight || undefined,
        width: digitHeight ? digitHeight * 0.7 : undefined,
      }}
    >
      <div
        ref={containerRef}
        className="transition-transform duration-300 ease-in-out"
        style={{ transform: `translateY(${translateY}px)` }}
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="digit-item text-center"
            style={{ lineHeight: "1", padding: "0 2px" }}
          >
            {i}
          </div>
        ))}
      </div>
      {/* appear overlay to smoothly show newly created digits */}
      {!appeared && (
        <span
          className="absolute left-0 top-0 block text-center"
          style={{
            opacity: appeared ? 1 : 0,
            transform: appeared ? "translateY(0)" : "translateY(8px)",
            transition: "opacity .25s, transform .25s",
          }}
        >
          {value}
        </span>
      )}
    </span>
  );
}

function AnimatedCounter({ value }: { value: number | null }) {
  const [prevDigits, setPrevDigits] = useState<number[] | null>(null);

  const digits =
    value === null
      ? null
      : String(value)
          .split("")
          .map((d) => Number(d));

  useEffect(() => {
    if (digits)
      setPrevDigits((p) => p ?? digits.map(() => null as unknown as number));
  }, []);

  useEffect(() => {
    if (digits) {
      setPrevDigits((prev) => {
        // keep previous array for comparison; if prev shorter, pad with nulls
        if (!prev) return digits.map((_, i) => null as unknown as number);
        const newPrev = [...prev];
        // adjust length
        if (newPrev.length < digits.length) {
          const pad = Array(digits.length - newPrev.length).fill(
            null as unknown as number
          );
          newPrev.unshift(...pad);
        } else if (newPrev.length > digits.length) {
          newPrev.splice(0, newPrev.length - digits.length);
        }
        return newPrev;
      });
    }
  }, [value]);

  if (digits === null) return <span>—</span>;

  // pad prevDigits to match digits length
  const prev =
    prevDigits ?? Array(digits.length).fill(null as unknown as number);

  // align digits right (least significant on the right)
  const padLeft = Math.max(0, digits.length - prev.length);

  return (
    <span className="inline-flex items-end" aria-live="polite">
      {digits.map((d, i) => {
        const prevIndex = prev.length - digits.length + i;
        const prevValue = prevIndex >= 0 ? (prev[prevIndex] ?? null) : null;
        return <Digit key={i} value={d} prevValue={prevValue} index={i} />;
      })}
    </span>
  );
}

export default function GlobalClicksPage() {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  // Keep a ref of previous digits to help each Digit decide how to animate
  const prevDigitsRef = useRef<number[] | null>(null);

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
          <div className="text-6xl font-bold">
            <AnimatedCounter value={count ?? null} />
          </div>

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
