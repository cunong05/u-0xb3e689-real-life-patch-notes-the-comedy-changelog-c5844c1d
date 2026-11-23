// Real-Life Patch Notes: The Comedy Changelog — make.fun bounty
// Writes exactly one line to /output/entry.txt: a software patch note
// for a bug in real life / human biology.
//
// The entry: "v4.1.2: fixed a bug where the brain replayed an
// embarrassing memory from 2009 every night at 3:00 AM for no reason."
// The brain's nightly 3 AM cringe replay — an unrequested background
// job that ships with every human and ignores all user input.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "v4.1.2: fixed a bug where the brain replayed an embarrassing memory from 2009 every night at 3:00 AM for no reason.";

// Validation: the entry must be one line, 1–160 characters, not only
// whitespace — the bounty gate. Anything else is a wrong entry, so
// fail loudly instead of writing it.
if (ENTRY.length < 1 || ENTRY.length > 160 || !/\S/.test(ENTRY) || ENTRY.includes("\n")) {
  throw new Error(`Invalid entry: expected one line of 1-160 characters, got ${ENTRY.length}: ${JSON.stringify(ENTRY)}`);
}

const outputDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), ENTRY, "utf8");

// Re-check what was actually written: entry.txt must be exactly the
// entry, one line, 1–160 characters, with no trailing newline.
const written = readFileSync(join(outputDir, "entry.txt"), "utf8");
if (written !== ENTRY) {
  throw new Error(`Invalid entry file: expected ${JSON.stringify(ENTRY)}, got ${JSON.stringify(written)}`);
}
