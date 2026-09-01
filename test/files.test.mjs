import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { FILES_DESCRIPTORS } from "../remote-schema.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

test("files owns only the workspace Remote contract", () => {
  assert.equal(FILES_DESCRIPTORS.length, 2);
  assert.deepEqual(new Set(FILES_DESCRIPTORS.map(item => item.service)), new Set(["relayWorkspaceFiles"]));
  assert.ok(FILES_DESCRIPTORS.every(item => item.id.startsWith("relay-dsh-plugin-files#")));
});

test("README keeps the user-facing install contract documented", async () => {
  const readme = await readFile(join(root, "README.md"), "utf8");
  const zhReadme = await readFile(join(root, "README.zh.md"), "utf8");
  const screenshot = await readFile(join(root, "docs/images/dsh-files-preview.png"));
  const packageJson = JSON.parse(await readFile(join(root, "package.json"), "utf8"));
  assert.match(readme, /relay-dsh-plugin-files/);
  assert.match(readme, /github:yangbobo2021\/relay-dsh-plugin-files#main/);
  assert.match(readme, /github:yangbobo2021\/relay-dsh-plugin-workbench#main/);
  assert.match(readme, /relay-dsh-plugin-workbench/);
  assert.match(readme, /docs\/images\/dsh-files-preview\.png/);
  for (const document of [readme, zhReadme]) {
    assert.match(document, /dsh-plugin-suite-demo\.gif/);
    assert.match(document, /dsh-plugin-suite-demo\.mp4\?raw=1/);
  }
  assert.match(readme, /\[中文\]\(README\.zh\.md\)/);
  assert.match(zhReadme, /\[English\]\(README\.md\)/);
  assert.deepEqual([...screenshot.subarray(0, 8)], [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  assert.ok(screenshot.length > 10_000);
  assert.ok(packageJson.files.includes("README.zh.md"));
  assert.ok(packageJson.files.includes("docs/images"));
  assert.equal(packageJson.dependencies?.["relay-dsh-plugin-workbench"], undefined);
  assert.equal(packageJson.devDependencies?.["relay-dsh-plugin-workbench"], "github:yangbobo2021/relay-dsh-plugin-workbench#f95cb78d64c7eea7c95007ccfc928fbfc4bc8711");
  assert.equal(packageJson.peerDependencies?.["relay-dsh-plugin-workbench"], "0.2.0-rc.1");
});
