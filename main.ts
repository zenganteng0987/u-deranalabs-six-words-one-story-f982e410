// Six Words, One Story — u-deranalabs-six-words-one-story-f982e410
//
// Writes one complete story in exactly six words to entry.txt.
// The text is fixed: it was chosen by comparing four candidates against
// the judge brief (see CANDIDATES.md) and is not generated at runtime.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const STORY = "Forty years married. First night apart.";

// The gate only accepts 1-60 characters and the brief only accepts exactly
// six words, so check the fixed text before writing anything: a bad edit
// must fail loudly here instead of shipping an entry the gate refuses.
function isValidStory(text: string): boolean {
  const words = text.trim().split(/\s+/).filter(Boolean);
  return text.length >= 1 && text.length <= 60 && words.length === 6;
}

function writeEntry(): void {
  if (!isValidStory(STORY)) {
    console.error(`Invalid story: ${JSON.stringify(STORY)}`);
    return;
  }
  const targets: string[] = [];
  if (process.env.MAKEFUN_OUTPUT_DIR) {
    targets.push(join(process.env.MAKEFUN_OUTPUT_DIR, "entry.txt"));
  }
  targets.push("/output/entry.txt", "./entry.txt");
  for (const target of targets) {
    try {
      mkdirSync(dirname(target), { recursive: true });
      writeFileSync(target, STORY + "\n", "utf8");
      return;
    } catch {
      // Path is read-only or unavailable; try the next one.
    }
  }
}

writeEntry();
