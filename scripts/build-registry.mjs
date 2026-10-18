import { spawnSync } from "node:child_process";
import { cpSync, mkdirSync, mkdtempSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { checkSources, checkOutput, repo } from "./check-registry.mjs";

const items = checkSources();
const temporary = mkdtempSync(resolve(tmpdir(), "yukihi-registry-"));
try {
  const result = spawnSync(
    process.execPath,
    [
      resolve(repo, "node_modules/shadcn/dist/index.js"),
      "build",
      "registry.json",
      "--output",
      temporary,
    ],
    { cwd: repo, stdio: "inherit" },
  );

  if (result.status !== 0) throw new Error("shadcn build failed");
  checkOutput(temporary, items);
  const output = resolve(repo, "public/r");
  mkdirSync(output, { recursive: true });
  // Only generated JSON files are replaced. Unexpected content is rejected.
  for (const file of readdirSync(output)) {
    if (!file.endsWith(".json")) throw new Error(`Unexpected output file: ${file}`);
  }
  for (const file of readdirSync(output)) rmSync(resolve(output, file));
  cpSync(temporary, output, { recursive: true });
  console.log(`Built ${checkOutput(output, items)} registry items.`);
} finally {
  rmSync(temporary, { recursive: true, force: true });
}
