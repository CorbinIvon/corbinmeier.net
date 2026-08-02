#!/usr/bin/env node
// Scans public/clients/<slug>/ and fills in projects.json image fields from disk,
// so screenshots dropped into a client folder show up without manual JSON edits.
import { readdirSync, statSync, writeFileSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CLIENTS_DIR = join(ROOT, "public", "clients");
const PROJECTS_JSON = join(ROOT, "src", "data", "projects.json");

const IMAGE_RE = /\.(png|jpe?g|webp|gif|avif)$/i;
const BEFORE_NAMES = ["original", "before", "old"];

function toPublicPath(fullPath) {
  return fullPath.slice(ROOT.length).replace(/\\/g, "/").replace(/^\/public/, "");
}

// Recursively collects every image under dir, at any nesting depth, labeling
// each with its parent path relative to baseDir (e.g. "original", "update/mobile").
function listImagesRecursive(dir, baseDir = dir) {
  let results = [];
  for (const entry of readdirSync(dir).sort()) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      results = results.concat(listImagesRecursive(full, baseDir));
    } else if (IMAGE_RE.test(entry)) {
      const relDir = dirname(full).slice(baseDir.length).replace(/\\/g, "/").replace(/^\//, "");
      results.push({ src: toPublicPath(full), label: relDir || undefined });
    }
  }
  return results;
}

function scanClientDir(slug) {
  const dir = join(CLIENTS_DIR, slug);
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return null;
  }

  const subdirs = entries.filter((e) => statSync(join(dir, e)).isDirectory());
  const allImages = listImagesRecursive(dir);
  if (allImages.length === 0) return null;

  const result = { images: allImages };

  if (subdirs.length === 2) {
    const [a, b] = subdirs;
    const aIsBefore = BEFORE_NAMES.includes(a.toLowerCase());
    const [beforeName, afterName] = aIsBefore ? [a, b] : [b, a];
    const beforeImages = listImagesRecursive(join(dir, beforeName));
    const afterImages = listImagesRecursive(join(dir, afterName));
    result.beforeImage = beforeImages[0]?.src;
    result.afterImage = afterImages[0]?.src;
  }

  return result;
}

const projects = JSON.parse(readFileSync(PROJECTS_JSON, "utf8"));
let changed = 0;

for (const project of projects) {
  const scan = scanClientDir(project.slug);
  if (!scan) continue;

  if (JSON.stringify(project.images ?? []) !== JSON.stringify(scan.images)) {
    project.images = scan.images;
    changed++;
  }


}

writeFileSync(PROJECTS_JSON, JSON.stringify(projects, null, 2) + "\n");
console.log(`sync-project-images: updated ${changed} project(s)`);
