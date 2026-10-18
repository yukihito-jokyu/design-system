import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import { extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(
  process.env.REGISTRY_ROOT || fileURLToPath(new URL("../public", import.meta.url)),
);

const port = Number(process.env.PORT || 4173);
const localBaseUrl = process.env.REGISTRY_BASE_URL?.replace(/\/$/, "");
createServer((request, response) => {
  let requested;
  try {
    requested = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
  } catch {
    response.writeHead(400).end("Invalid URL");
    return;
  }
  const path = resolve(root, `.${requested === "/" ? "/r/registry.json" : requested}`);
  if (!path.startsWith(root + sep)) {
    response.writeHead(404).end("Not found");
    return;
  }
  try {
    let body = readFileSync(path);
    // Both base items use the same namespace. Committed output stays public.
    if (localBaseUrl && extname(path) === ".json") {
      const registry = JSON.parse(body.toString("utf8"));
      for (const item of [registry, ...(registry.items ?? [])]) {
        if (item.config?.registries?.["@yukihi"]) {
          item.config.registries["@yukihi"] = `${localBaseUrl}/{name}.json`;
        }
      }
      body = Buffer.from(JSON.stringify(registry));
    }
    response.writeHead(200, {
      "content-type":
        extname(path) === ".json" ? "application/json; charset=utf-8" : "application/octet-stream",
    });
    response.end(body);
  } catch {
    response.writeHead(404).end("Not found");
  }
}).listen(port, "127.0.0.1", () => console.log(`Registry: http://127.0.0.1:${port}`));
