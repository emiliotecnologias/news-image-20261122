// Entry for the make.fun daily news-image competition (edition 2026-11-22).
//
// The grader runs this program twice in a sandbox with no network: the
// repository is mounted read-only and the output directory is writable.
// The whole job is to place the prepared poster at <output>/entry.png,
// byte for byte identical on every run, so the copy below is verbatim.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const sourceImage = join(here, "entry.png");

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const targetImage = join(outputDir, "entry.png");

const posterBytes = readFileSync(sourceImage);
mkdirSync(outputDir, { recursive: true });
writeFileSync(targetImage, posterBytes);

// Read the result back and compare: the grader runs this twice and both
// runs must produce the same bytes, so a short write must fail loudly
// here rather than ship a truncated image.
const writtenBytes = readFileSync(targetImage);
if (!writtenBytes.equals(posterBytes)) {
  throw new Error(
    `Output mismatch: wrote ${writtenBytes.length} of ${posterBytes.length} bytes`,
  );
}

console.log(`Wrote ${posterBytes.length} bytes to ${targetImage}`);
