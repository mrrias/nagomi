
import type { UserConfig } from 'vite'

import path from 'node:path';
import fs from 'node:fs';

function getHtmlEntries() {
  const pagesDir = path.resolve("src");
  const entries: Record<string, string> = {};

  // Read all files in the directory
  const files = fs.readdirSync(pagesDir);

  // Filter out HTML files
  const htmlFiles = files.filter((file: string) => file.endsWith(".html"));

  // Create entries for each HTML file
  htmlFiles.forEach((file: string) => {
    const name = path.basename(file, ".html");
    entries[name] = path.resolve(pagesDir, file);
  });

  return entries;
}

export default {
    root: "src",
    base: "/nagomi/",
    build: {
        rolldownOptions: {
            input: getHtmlEntries(),
            output: {
                dir: "dist"
            },
        }
    }
} satisfies UserConfig