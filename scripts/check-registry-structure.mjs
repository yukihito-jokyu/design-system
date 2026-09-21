import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const root = JSON.parse(readFileSync("registry.json"));
const names = new Set();
for (const included of root.include) {
  const registry = JSON.parse(readFileSync(included));
  for (const item of registry.items) {
    if (names.has(item.name)) throw new Error(`Duplicate item: ${item.name}`);
    names.add(item.name);
    for (const dependency of item.registryDependencies ?? []) {
      if (!dependency.startsWith("@yukihi/")) {
        throw new Error(`Unexpected dependency: ${item.name} -> ${dependency}`);
      }
    }
    for (const file of item.files ?? []) {
      const absolute = resolve(dirname(included), file.path);
      if (!absolute.startsWith(resolve("registry/new-york") + "/")) {
        throw new Error(`Invalid path: ${file.path}`);
      }
      readFileSync(absolute);
    }
  }
}
for (const included of root.include) {
  for (const item of JSON.parse(readFileSync(included)).items) {
    for (const dependency of item.registryDependencies ?? []) {
      if (!names.has(dependency.slice("@yukihi/".length))) {
        throw new Error(`Missing dependency: ${dependency}`);
      }
    }
  }
}
if (names.size !== 121) throw new Error(`Expected 121 items, got ${names.size}`);

const patterns = JSON.parse(readFileSync("registry/new-york/patterns/registry.json"));
if (patterns.items.length !== 18) {
  throw new Error(`Expected 18 patterns, got ${patterns.items.length}`);
}

console.log(`Registry structure OK: ${names.size} items, ${patterns.items.length} patterns`);
