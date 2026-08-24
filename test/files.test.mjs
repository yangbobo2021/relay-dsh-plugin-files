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
  const packageJson = JSON.parse(await readFile(join(root, "package.json"), "utf8"));
  assert.match(readme, /@relay\/dsh-plugin-files/);
  assert.match(readme, /github:yangbobo2021\/relay-dsh-plugin-files#main/);
  assert.match(readme, /@relay\/dsh-plugin-workbench/);
  assert.match(readme, /\[中文\]\(README\.zh\.md\)/);
  assert.match(zhReadme, /\[English\]\(README\.md\)/);
  assert.ok(packageJson.files.includes("README.zh.md"));
});
