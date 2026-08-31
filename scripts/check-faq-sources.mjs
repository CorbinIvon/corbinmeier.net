#!/usr/bin/env node
// Verifies every citation link in src/data/faqs.json still resolves, and that
// each one is an allowed source type. The FAQ makes factual claims about SEO and
// device traffic; a citation that 404s is worse than no citation, because the
// claim keeps its authority while losing its proof.
//
// Sourcing standard (see CLAUDE.md):
//   - Official platform docs are unrestricted.
//   - First-party research counts as official: the company that MEASURED the
//     data, publishing its own numbers, with methodology stated on our page.
//   - Secondary blogs relaying someone else's figures must predate 2023.
//
// The allowlist below encodes the first two. The third can't be checked
// mechanically, so anything unrecognized is reported for a human to judge
// rather than silently passed or failed.
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const FAQS_JSON = join(ROOT, "src", "data", "faqs.json");

const OFFICIAL_HOSTS = [
  "developers.google.com",
  "support.google.com",
  "www.google.com",
  "web.dev",
  "www.bing.com",
];

// First-party research: these publish data they collected themselves. Each entry
// records what makes it primary, so a future reader can re-judge it rather than
// trusting an unexplained allowlist.
const FIRST_PARTY_RESEARCH = {
  "ahrefs.com": "operates its own web crawler and index; publishes studies of its own corpus",
  "contentsquare.com": "measures sessions on its own customers' sites; publishes its own benchmark",
  "gs.statcounter.com": "operates the measurement network the statistics come from",
};

const TIMEOUT_MS = 20000;
const UA =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36";

function classify(url) {
  const { hostname } = new URL(url);
  if (OFFICIAL_HOSTS.includes(hostname)) return { kind: "official" };
  if (FIRST_PARTY_RESEARCH[hostname]) {
    return { kind: "first-party", why: FIRST_PARTY_RESEARCH[hostname] };
  }
  return { kind: "unrecognized" };
}

async function check(url) {
  const control = new AbortController();
  const timer = setTimeout(() => control.abort(), TIMEOUT_MS);
  try {
    // Some doc hosts reject HEAD outright, so GET is the reliable probe even
    // though it costs more; we never read the body.
    const res = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: control.signal,
      headers: { "User-Agent": UA },
    });
    return { ok: res.ok, status: res.status, finalUrl: res.url };
  } catch (err) {
    return { ok: false, status: 0, error: err.cause?.code ?? err.message };
  } finally {
    clearTimeout(timer);
  }
}

const categories = JSON.parse(readFileSync(FAQS_JSON, "utf8"));

// Collect every (url -> the entries citing it) so a failure names the entry to fix.
const citedBy = new Map();
for (const category of categories) {
  for (const entry of category.entries) {
    for (const source of entry.sources ?? []) {
      if (!citedBy.has(source.url)) citedBy.set(source.url, []);
      citedBy.get(source.url).push(`${category.slug}/${entry.logId}_${entry.id}`);
    }
  }
}

const urls = [...citedBy.keys()];
console.log(`Checking ${urls.length} unique citation links from ${FAQS_JSON.slice(ROOT.length + 1)}\n`);

const results = await Promise.all(urls.map(async (url) => ({ url, ...(await check(url)) })));

const broken = [];
const unrecognized = [];

for (const { url, ok, status, finalUrl, error } of results) {
  const type = classify(url);
  if (type.kind === "unrecognized") unrecognized.push(url);

  const badge = ok ? "OK  " : "FAIL";
  const tag = { official: "official", "first-party": "first-party", unrecognized: "UNRECOGNIZED" }[type.kind];
  console.log(`${badge} [${tag}] ${status || error} ${url}`);
  if (ok && finalUrl && finalUrl !== url) console.log(`       redirected to ${finalUrl}`);
  if (!ok) {
    broken.push({ url, status, error, entries: citedBy.get(url) });
  }
}

if (unrecognized.length > 0) {
  console.log("\nSources not on the official or first-party allowlist:");
  for (const url of unrecognized) {
    console.log(`  ${url}`);
    console.log(`    cited by: ${citedBy.get(url).join(", ")}`);
  }
  console.log("  Confirm each is a pre-2023 secondary source, or replace it with a primary one.");
}

if (broken.length > 0) {
  console.error(`\n${broken.length} citation link(s) failed to resolve:`);
  for (const { url, status, error, entries } of broken) {
    console.error(`  ${url}  (${status || error})`);
    console.error(`    cited by: ${entries.join(", ")}`);
  }
  process.exit(1);
}

console.log(`\nAll ${urls.length} citation links resolve.`);
