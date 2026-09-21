import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import { extname, join, normalize } from "node:path";

const root = new URL("../public", import.meta.url).pathname;
const port = Number(process.env.PORT || 4173);
const localBaseUrl = process.env.REGISTRY_BASE_URL?.replace(/\/$/, "");
createServer((request, response) => {
  const requested = normalize(
    decodeURIComponent(new URL(request.url, `http://${request.headers.host}`).pathname),
  ).replace(/^\.\.(\/|\\|$)/, "");

  const path = join(root, requested === "/" ? "r/index.json" : requested);
  try {
    let body = readFileSync(path);
    // コミット済みJSONは公開用の内容を保ち、registry:baseの一括導入時だけ
    // ローカルやCIの依存先をこのサーバーへ向ける。
    if (localBaseUrl && extname(path) === ".json") {
      const registry = JSON.parse(body.toString("utf8"));
      if (registry.config?.registries?.["@yukihi"]) {
        registry.config.registries["@yukihi"] = `${localBaseUrl}/{name}.json`;
        body = Buffer.from(JSON.stringify(registry));
      }
    }
    response.writeHead(200, {
      "content-type":
        extname(path) === ".json" ? "application/json; charset=utf-8" : "application/octet-stream",
    });
    response.end(body);
  } catch {
    response.writeHead(404).end("Not found");
  }
}).listen(port, "127.0.0.1", () => console.log(`Registry: http://127.0.0.1:${port}/r`));
