#!/usr/bin/env python3
"""Build a Storybook story outside the repo and capture its preview as PNG."""

import argparse
import json
from pathlib import Path
import shutil
import socket
import struct
import subprocess
import sys
import tempfile
import time
from urllib.parse import urlencode


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--story", required=True, help="Storybook ID from index.json")
    parser.add_argument("--theme", choices=["milk", "cream", "neutral", "sage", "lavender"], default="milk")
    parser.add_argument("--width", type=int, default=1280)
    parser.add_argument("--height", type=int, default=800)
    parser.add_argument("--wait-ms", type=int, default=500)
    parser.add_argument("--full-page", action="store_true")
    parser.add_argument("--output", type=Path)
    args = parser.parse_args()

    repo = Path(__file__).resolve().parents[4]
    if not (repo / ".storybook/main.ts").is_file():
        parser.error("Storybook repository was not found")
    if args.width <= 0 or args.height <= 0 or args.wait_ms < 0:
        parser.error("width and height must be positive; wait-ms must be nonnegative")
    if not shutil.which("playwright"):
        parser.error("playwright CLI was not found")

    with tempfile.TemporaryDirectory(prefix="storybook-image-review-") as temp:
        build = Path(temp) / "storybook"
        build_result = subprocess.run(
            ["npm", "run", "build-storybook", "--", "--output-dir", str(build)],
            cwd=repo,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.PIPE,
            text=True,
        )
        if build_result.returncode:
            print(build_result.stderr[-3000:], file=sys.stderr)
            return build_result.returncode

        entries = json.loads((build / "index.json").read_text())["entries"]
        if args.story not in entries or entries[args.story]["type"] != "story":
            parser.error(f"Story ID not found: {args.story}")

        with socket.socket() as sock:
            sock.bind(("127.0.0.1", 0))
            port = sock.getsockname()[1]
        server = subprocess.Popen(
            [sys.executable, "-m", "http.server", str(port), "--bind", "127.0.0.1", "--directory", str(build)],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )
        try:
            time.sleep(0.3)
            if server.poll() is not None:
                raise RuntimeError("Local Storybook server failed to start")
            params = {"id": args.story, "viewMode": "story", "globals": f"theme:{args.theme}"}
            url = f"http://127.0.0.1:{port}/iframe.html?{urlencode(params)}"
            output = args.output or Path(tempfile.gettempdir()) / f"{args.story}-{args.theme}-{args.width}x{args.height}.png"
            output.parent.mkdir(parents=True, exist_ok=True)
            command = [
                "playwright", "screenshot", "--channel", "chrome",
                "--viewport-size", f"{args.width},{args.height}",
                "--wait-for-selector", "#storybook-root > *",
                "--wait-for-timeout", str(args.wait_ms),
            ]
            if args.full_page:
                command.append("--full-page")
            command.extend([url, str(output)])
            subprocess.run(command, cwd=repo, check=True)
            header = output.read_bytes()[:24]
            if header[:8] != b"\x89PNG\r\n\x1a\n":
                raise RuntimeError("Screenshot is not PNG")
            width, height = struct.unpack(">II", header[16:24])
            print(f"PNG: {output}\nSize: {width}x{height}\nStory: {args.story}\nTheme: {args.theme}")
            return 0
        finally:
            server.terminate()
            try:
                server.wait(timeout=5)
            except subprocess.TimeoutExpired:
                server.kill()


if __name__ == "__main__":
    sys.exit(main())
