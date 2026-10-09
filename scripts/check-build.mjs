import { readFile, readdir, stat } from "node:fs/promises";
import { gzipSync } from "node:zlib";
import assert from "node:assert/strict";

const html = await readFile("dist/index.html", "utf8");
const references = [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map(
  (match) => match[1],
);
assert(
  references.length >= 3,
  "The build must include script, stylesheet, and favicon.",
);
for (const reference of references) {
  assert(reference.startsWith("./"), `Asset is not portable: ${reference}`);
  await stat(`dist/${reference.slice(2)}`);
}
let rawBytes = 0;
let gzipBytes = 0;
for (const file of await readdir("dist/assets")) {
  const bytes = await readFile(`dist/assets/${file}`);
  rawBytes += bytes.length;
  gzipBytes += gzipSync(bytes).length;
}
assert(rawBytes < 400_000, `Static asset budget exceeded: ${rawBytes} bytes`);
assert(
  gzipBytes < 130_000,
  `Compressed asset budget exceeded: ${gzipBytes} bytes`,
);
console.log(
  `Portable build verified: ${rawBytes} asset bytes, ${gzipBytes} gzip bytes; ${references.length} valid local references.`,
);
