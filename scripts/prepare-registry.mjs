import { cpSync, mkdirSync, rmSync } from "node:fs";
import { resolve } from "node:path";
import { checkOutput, repo } from "./check-registry.mjs";

const source = resolve(repo, "public/r");
checkOutput(source);
const output = resolve(repo, process.argv[2] ?? "dist", "v1/r");
if (output === source || !output.endsWith("/v1/r")) throw new Error("Invalid deployment output");
mkdirSync(output, { recursive: true });
rmSync(output, { recursive: true });
cpSync(source, output, { recursive: true });
console.log(`Prepared ${checkOutput(output)} items at ${output}`);
