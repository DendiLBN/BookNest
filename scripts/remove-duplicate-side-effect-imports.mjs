import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { extname, join } from "node:path";

const supportedExtensions = new Set([".js", ".jsx", ".ts", ".tsx"]);
const importPattern = /^import\s+["']([^"']+)["'];\s*$/;

const inputPaths = process.argv.slice(2);
const targets = inputPaths.length > 0 ? inputPaths : ["frontend/src"];

const collectFiles = (target) => {
  const stats = statSync(target);

  if (stats.isFile()) {
    return supportedExtensions.has(extname(target)) ? [target] : [];
  }

  if (!stats.isDirectory()) {
    return [];
  }

  return readdirSync(target).flatMap((entry) => collectFiles(join(target, entry)));
};

const removeDuplicates = (filePath) => {
  const originalContent = readFileSync(filePath, "utf8");
  const seenImports = new Set();
  const nextLines = [];

  for (const line of originalContent.split(/\r?\n/)) {
    const importMatch = line.match(importPattern);

    if (importMatch) {
      const importSource = importMatch[1];

      if (seenImports.has(importSource)) {
        continue;
      }

      seenImports.add(importSource);
    }

    nextLines.push(line);
  }

  const nextContent = nextLines.join("\n");

  if (nextContent !== originalContent) {
    writeFileSync(filePath, nextContent);
  }
};

targets.flatMap(collectFiles).forEach(removeDuplicates);
