import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { basename, dirname, extname, join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const baseUrl = (process.env.REGISTRY_BASE_URL || "http://127.0.0.1:4173/r").replace(/\/$/, "");

const kebab = (value) =>
  value
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/\.(tsx?|css)$/, "")
    .toLowerCase();

const address = (name) => `${baseUrl}/${name}.json`;
const source = (path) => readFileSync(join(root, path), "utf8");

const filesIn = (dir, extension = ".tsx") =>
  readdirSync(join(root, dir))
    .filter((file) => extname(file) === extension)
    .sort((left, right) => left.localeCompare(right))
    .map((file) => join(dir, file));

const sourceToItem = new Map();
const items = [];

const distributedStyles = source("src/styles.css")
  .replace('@import "tailwindcss";\n', "")
  .replace('@import "../registry/styles/tokens.css";', '@import "./tokens.css";')
  .replace('@import "../registry/styles/tailwind.css";', '@import "./tailwind.css";');

writeFileSync(
  join(root, "registry/styles/styles.css"),
  `/* Generated from src/styles.css for Registry distribution. */\n${distributedStyles}`,
);

function addItem({
  name,
  type,
  title,
  description,
  files,
  dependencies = [],
  registryDependencies = [],
  docs,
}) {
  const item = {
    name,
    type,
    title,
    description,
    dependencies,
    registryDependencies,
    files: files.map(({ path, fileType = type, target }) => ({
      path,
      type: fileType,
      ...(target ? { target } : {}),
    })),
    ...(docs ? { docs } : {}),
  };

  items.push(item);
  for (const file of files) sourceToItem.set(file.path, name);
  return item;
}

addItem({
  name: "design-system-styles",
  type: "registry:style",
  title: "Design System Styles",
  description: "Token CSS, Tailwind v4 adapter, and shared component styles.",
  files: [
    {
      path: "registry/styles/tokens.css",
      fileType: "registry:file",
      target: "src/components/design-system/tokens.css",
    },
    {
      path: "registry/styles/tailwind.css",
      fileType: "registry:file",
      target: "src/components/design-system/tailwind.css",
    },
    {
      path: "registry/styles/styles.css",
      fileType: "registry:file",
      target: "src/components/design-system/styles.css",
    },
  ],
  docs: 'Import "@/components/design-system/styles.css" once from the application CSS after Tailwind. Wrap only the design-system surface in DesignThemeProvider or add data-ds-base to that surface.',
});

addItem({
  name: "utils",
  type: "registry:lib",
  title: "Utilities",
  description: "Class-name utility.",
  files: [{ path: "src/lib/utils.ts", target: "src/lib/utils.ts" }],
  dependencies: ["clsx@^2.1.1", "tailwind-merge@^3.7.0"],
});
addItem({
  name: "theme-provider",
  type: "registry:component",
  title: "Design Theme Provider",
  description: "Scoped theme and portal color inheritance.",
  files: [
    { path: "src/components/theme-provider.tsx", target: "src/components/theme-provider.tsx" },
  ],
  registryDependencies: [address("design-system-styles")],
});
addItem({
  name: "use-mobile",
  type: "registry:hook",
  title: "Mobile Hook",
  description: "Responsive mobile-state hook.",
  files: [{ path: "src/hooks/use-mobile.ts", target: "src/hooks/use-mobile.ts" }],
});
addItem({
  name: "icon-frame",
  type: "registry:component",
  title: "Icon Frame",
  description: "Shared frame for approved SVG artwork.",
  files: [
    { path: "src/components/icons/IconFrame.tsx", target: "src/components/icons/IconFrame.tsx" },
  ],
  registryDependencies: [address("design-system-styles")],
});

for (const path of filesIn("src/components/icons").filter(
  (path) => !path.endsWith("/IconFrame.tsx") && !path.endsWith("/index.tsx"),
)) {
  if (path.endsWith("/icon-map.ts")) continue;
  const component = basename(path, ".tsx");
  addItem({
    name: kebab(component),
    type: "registry:component",
    title: component,
    description: "Approved standalone SVG icon.",
    files: [{ path, target: `src/components/icons/${component}.tsx` }],
    registryDependencies: [address("icon-frame")],
  });
}

const uiFiles = filesIn("src/components/ui");
const characterFiles = filesIn("src/components/character");
const patternFiles = filesIn("src/components/patterns");

for (const path of [
  ...uiFiles,
  ...characterFiles.filter((p) => !p.endsWith("/index.tsx")),
  ...patternFiles,
]) {
  const name = kebab(basename(path));

  const folder = path.includes("/ui/")
    ? "ui"
    : path.includes("/character/")
      ? "character"
      : "patterns";

  addItem({
    name,
    type: folder === "ui" ? "registry:ui" : "registry:component",
    title: basename(path, ".tsx"),
    description: `Design system ${folder} component.`,
    files: [{ path, target: `src/components/${folder}/${basename(path)}` }],
  });
}

addItem({
  name: "character-icons",
  type: "registry:component",
  title: "Dynamic Character Icons",
  description: "Dynamic six-direction character/status API and all approved artwork variants.",
  files: [
    { path: "src/components/icons/icon-map.ts", target: "src/components/icons/icon-map.ts" },
    { path: "src/components/character/index.tsx", target: "src/components/character/index.tsx" },
  ],
});

const packageByImport = {
  "@base-ui/react": "@base-ui/react@^1.8.0",
  "class-variance-authority": "class-variance-authority@^0.7.1",
  "lucide-react": "lucide-react@^1.45.0",
  "radix-ui": "radix-ui@^1.6.7",
  "react-day-picker": "react-day-picker@^10.0.1",
  sonner: "sonner@^2.0.8",
};

const resolveSource = (from, specifier) => {
  let candidate;
  if (specifier.startsWith("@/")) candidate = join("src", specifier.slice(2));
  else if (specifier.startsWith(".")) candidate = join(dirname(from), specifier);
  else return null;
  for (const suffix of ["", ".ts", ".tsx"]) {
    const path = `${candidate}${suffix}`;
    try {
      readFileSync(join(root, path));
      return path;
    } catch {}
  }
  return null;
};

for (const item of items) {
  const deps = new Set(item.dependencies);
  const registryDeps = new Set(item.registryDependencies);
  for (const file of item.files) {
    if (!file.path.endsWith(".ts") && !file.path.endsWith(".tsx")) continue;
    const contents = source(file.path);
    for (const match of contents.matchAll(/from\s+['"]([^'"]+)['"]/g)) {
      const specifier = match[1];

      const packageName = specifier.startsWith("@")
        ? specifier.split("/").slice(0, 2).join("/")
        : specifier.split("/")[0];

      if (packageByImport[packageName]) deps.add(packageByImport[packageName]);
      const dependencySource = resolveSource(file.path, specifier);
      const dependencyItem = dependencySource && sourceToItem.get(dependencySource);
      if (dependencyItem && dependencyItem !== item.name) registryDeps.add(address(dependencyItem));
    }
  }
  if (
    item.type === "registry:ui" ||
    item.name === "character-icons" ||
    item.type === "registry:component"
  )
    registryDeps.add(address("design-system-styles"));
  item.dependencies = [...deps].sort((left, right) => left.localeCompare(right));
  item.registryDependencies = [...registryDeps].sort((left, right) => left.localeCompare(right));
}

const dynamic = items.find((item) => item.name === "character-icons");
for (const icon of items.filter((item) => item.description === "Approved standalone SVG icon."))
  dynamic.registryDependencies.push(address(icon.name));
dynamic.registryDependencies = [...new Set(dynamic.registryDependencies)].sort((left, right) =>
  left.localeCompare(right),
);

addItem({
  name: "design-system",
  type: "registry:item",
  title: "Complete Design System",
  description: "All Foundation, Character, Pattern, and approved icon items.",
  files: [],
  registryDependencies: items
    .filter((item) => item.name !== "design-system")
    .map((item) => address(item.name)),
});

writeFileSync(
  join(root, "registry.json"),
  `${JSON.stringify(
    {
      $schema: "https://ui.shadcn.com/schema/registry.json",
      name: "yukihito",
      homepage: "https://github.com/yukihito-jokyu/design-system",
      items,
    },
    null,
    2,
  )}\n`,
);

console.log(`Prepared ${items.length} registry items for ${baseUrl}`);
