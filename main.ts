// Real-Life Patch Notes: The Comedy Changelog — make.fun bounty
//
// Writes exactly one patch-note line to $OUTPUT_DIR/entry.txt (default
// /output). The bounty wants a software-style changelog entry for a bug
// in real life / human biology, 1–160 characters, one line.
//
// Why this entry: the 3 AM cringe replay is a bug every human ships
// with — an unrequested background job that replays an embarrassing
// memory on a fixed schedule, ignores all user input, and has no
// off switch. Framing it as a fixed bug in a versioned changelog is
// the joke, and "v4.1.2" keeps it in the familiar patch-note voice.
//
// The entry is a single constant, byte-identical every run. Validation
// runs before any write so a bad entry fails loudly instead of
// producing a wrong file; a second check after writing confirms the
// file on disk is exactly the entry, with no trailing newline added.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "v4.1.2: fixed a bug where the brain replayed an embarrassing memory from 2009 every night at 3:00 AM for no reason.";

const MAX_LENGTH = 160;
const ENTRY_FILE = "entry.txt";

function validateEntry(entry: string): void {
  // One line, 1–160 characters, must contain non-whitespace text.
  // The gate rejects multi-line entries, so any newline is invalid.
  if (entry.length < 1) {
    throw new Error("Invalid entry: entry is empty");
  }
  if (entry.length > MAX_LENGTH) {
    throw new Error(
      `Invalid entry: ${entry.length} characters exceeds the ${MAX_LENGTH}-character limit`,
    );
  }
  if (!/\S/.test(entry)) {
    throw new Error("Invalid entry: entry is only whitespace");
  }
  if (entry.includes("\n") || entry.includes("\r")) {
    throw new Error("Invalid entry: entry must be a single line");
  }
}

function writeEntry(outputDir: string, entry: string): string {
  mkdirSync(outputDir, { recursive: true });
  const filePath = join(outputDir, ENTRY_FILE);
  writeFileSync(filePath, entry, "utf8");
  return filePath;
}

function verifyWritten(filePath: string, entry: string): void {
  // Read back what was actually written: it must match the entry
  // exactly, character for character, with no newline appended.
  const written = readFileSync(filePath, "utf8");
  if (written !== entry) {
    throw new Error(
      `Invalid entry file: expected ${JSON.stringify(entry)}, got ${JSON.stringify(written)}`,
    );
  }
}

function main(): void {
  validateEntry(ENTRY);
  const outputDir = process.env.OUTPUT_DIR ?? "/output";
  const filePath = writeEntry(outputDir, ENTRY);
  verifyWritten(filePath, ENTRY);
}

main();
