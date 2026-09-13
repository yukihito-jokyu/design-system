import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import { extname, join, normalize } from "node:path";

const root = new URL("../public", import.meta.url).pathname;
const port = Number(process.env.PORT || 4173);
createServer((request, response) => {
  const requested = normalize(
    decodeURIComponent(new URL(request.url, `http://${request.headers.host}`).pathname),
  ).replace(/^\.\.(\/|\\|$)/, "");

  const path = join(root, requested === "/" ? "r/index.json" : requested);
  try {
    const body = readFileSync(path);
    response.writeHead(200, {
      "content-type":
        extname(path) === ".json" ? "application/json; charset=utf-8" : "application/octet-stream",
    });
    response.end(body);
  } catch {
    response.writeHead(404).end("Not found");
  }
}).listen(port, "127.0.0.1", () => console.log(`Registry: http://127.0.0.1:${port}/r`));
