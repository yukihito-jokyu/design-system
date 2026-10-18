import { readFileSync, readdirSync } from "node:fs";
import { dirname, resolve, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { isDeepStrictEqual } from "node:util";
import { parse } from "@babel/parser";

export const repo = fileURLToPath(new URL("../", import.meta.url));
const read = (path) => JSON.parse(readFileSync(path, "utf8"));

const fail = (message) => {
  throw new Error(message);
};

export function checkSources(root = repo) {
  const items = new Map();
  const owners = new Map();
  const targets = new Set();

  function visit(index, ancestors = []) {
    if (ancestors.includes(index)) fail(`Circular include: ${index}`);
    const registry = read(index);
    for (const included of registry.include ?? []) {
      visit(resolve(dirname(index), included), [...ancestors, index]);
    }
    for (const item of registry.items ?? []) {
      if (items.has(item.name)) fail(`Duplicate item: ${item.name}`);
      const system = relative(root, index).split(sep)[1];
      if (!["new-york", "cobalt"].includes(system)) fail(`Invalid system: ${index}`);
      if (item.name.startsWith("cobalt-") !== (system === "cobalt"))
        fail(`Invalid name: ${item.name}`);
      const entry = { item, system, files: [] };
      items.set(item.name, entry);
      for (const file of item.files ?? []) {
        const source = resolve(dirname(index), file.path);
        if (!source.startsWith(resolve(root, "registry", system) + sep))
          fail(`Invalid source: ${source}`);
        if (!/\.(tsx?|css)$/.test(source) || source.includes(".stories."))
          fail(`Invalid distribution file: ${source}`);
        if (owners.has(source)) fail(`Duplicate source: ${source}`);
        if (!/^@(ui|lib|hooks|components)\/[^\\]+\.(tsx?|css)$/.test(file.target ?? ""))
          fail(`Invalid target: ${file.target}`);
        const target = `${system}:${file.target}`;
        if (targets.has(target)) fail(`Duplicate target: ${target}`);
        targets.add(target);
        readFileSync(source);
        owners.set(source, entry);
        entry.files.push({ source, file });
      }
    }
  }

  visit(resolve(root, "registry.json"));
  const closures = new Map();

  function dependencies(name, stack = []) {
    if (stack.includes(name)) fail(`Circular dependency: ${[...stack, name].join(" -> ")}`);
    if (closures.has(name)) return closures.get(name);
    const entry = items.get(name);
    const result = new Set([name]);
    for (const dep of entry.item.registryDependencies ?? []) {
      if (!dep.startsWith("@yukihi/")) fail(`Unexpected dependency: ${name} -> ${dep}`);
      const target = items.get(dep.slice(8));
      if (!target) fail(`Missing dependency: ${name} -> ${dep}`);
      if (target.system !== entry.system) fail(`Cross-system dependency: ${name} -> ${dep}`);
      for (const nested of dependencies(target.item.name, [...stack, name])) result.add(nested);
    }
    closures.set(name, result);
    return result;
  }

  for (const [name, entry] of items) {
    const closure = dependencies(name);

    const packages = new Set(
      [...closure].flatMap((n) =>
        (items.get(n).item.dependencies ?? []).map((d) => d.match(/^(@[^/]+\/[^@]+|[^@]+)/)[0]),
      ),
    );

    for (const { source } of entry.files) {
      if (!/\.tsx?$/.test(source)) continue;

      const tree = parse(readFileSync(source, "utf8"), {
        sourceType: "module",
        plugins: ["typescript", "jsx"],
      });

      for (const node of tree.program.body) {
        if (
          !["ImportDeclaration", "ExportNamedDeclaration", "ExportAllDeclaration"].includes(
            node.type,
          ) ||
          !node.source
        )
          continue;
        const specifier = node.source.value;
        if (specifier.startsWith("@/") || specifier.startsWith(".")) {
          const base = specifier.startsWith("@/")
            ? resolve(root, specifier.slice(2))
            : resolve(dirname(source), specifier);

          const target = [
            base,
            `${base}.ts`,
            `${base}.tsx`,
            resolve(base, "index.ts"),
            resolve(base, "index.tsx"),
          ].find((p) => owners.has(p));

          if (!target) fail(`Unregistered import: ${name} -> ${specifier}`);
          if (!closure.has(owners.get(target).item.name))
            fail(`Missing import dependency: ${name} -> ${owners.get(target).item.name}`);
        } else {
          const pkg = specifier.startsWith("@")
            ? specifier.split("/").slice(0, 2).join("/")
            : specifier.split("/")[0];

          if (!["react", "react-dom"].includes(pkg) && !packages.has(pkg))
            fail(`Missing npm dependency: ${name} -> ${pkg}`);
        }
      }
    }
    if (
      entry.files.some(
        ({ file }) => file.type !== "registry:lib" && file.type !== "registry:hook",
      ) &&
      !closure.has(
        entry.system === "cobalt" ? "cobalt-design-system-styles" : "design-system-styles",
      )
    )
      fail(`Missing styles: ${name}`);
  }
  for (const system of ["new-york", "cobalt"]) {
    const bundle = system === "cobalt" ? "cobalt-design-system" : "design-system";
    for (const [name, entry] of items) {
      if (entry.system === system && !dependencies(bundle).has(name))
        fail(`Missing bundle item: ${bundle} -> ${name}`);
    }
  }
  return items;
}

export function checkOutput(output, items = checkSources()) {
  const actual = readdirSync(output).sort();
  const expected = ["registry.json", ...[...items.keys()].map((n) => `${n}.json`)].sort();
  if (JSON.stringify(actual) !== JSON.stringify(expected))
    fail(`Stale or missing output in ${output}`);
  const index = read(resolve(output, "registry.json"));
  if (
    index.include ||
    index.name !== "yukihi" ||
    index.items.length !== items.size ||
    new Set(index.items.map((i) => i.name)).size !== items.size
  )
    fail("Invalid generated index");
  for (const item of index.items) {
    if (!items.has(item.name)) fail(`Unexpected output item: ${item.name}`);
    const generated = read(resolve(output, `${item.name}.json`));
    if (
      generated.name !== item.name ||
      JSON.stringify(generated.registryDependencies) !==
        JSON.stringify(items.get(item.name).item.registryDependencies)
    )
      fail(`Invalid generated item: ${item.name}`);
    const withoutFiles = ({ files: _files, $schema: _schema, ...data }) => data;
    if (
      !isDeepStrictEqual(withoutFiles(generated), withoutFiles(items.get(item.name).item)) ||
      !isDeepStrictEqual(withoutFiles(item), withoutFiles(generated))
    )
      fail(`Stale generated metadata or CSS: ${item.name}`);
    if (
      !isDeepStrictEqual(
        item.files,
        generated.files?.map(({ content: _content, ...file }) => file),
      )
    )
      fail(`Stale index files: ${item.name}`);
    const sources = items.get(item.name).files;
    if ((generated.files?.length ?? 0) !== sources.length)
      fail(`Invalid generated files: ${item.name}`);
    for (const [i, file] of (generated.files ?? []).entries()) {
      if (
        file.content !== readFileSync(sources[i].source, "utf8") ||
        file.target !== sources[i].file.target
      )
        fail(`Stale generated content: ${item.name}`);
    }
  }
  return items.size;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const items = checkSources();
  const count = checkOutput(resolve(repo, process.argv[2] ?? "public/r"), items);
  console.log(`Registry: ${count} items, names, dependencies, imports and output verified.`);
}
