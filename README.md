# Relay DSH Files Plugin

English | [中文](README.zh.md)

**npm package:** `@relay/dsh-plugin-files`

`@relay/dsh-plugin-files` adds a right-side workspace file explorer to the
official [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)
(DSH) Web UI. It lets you browse the active workspace and preview text files
without leaving the conversation.

The plugin uses `@relay/dsh-plugin-workbench` as its panel host. Install
Workbench in the same DSH Profile.

![Relay Files side panel previewing a workspace file in DSH Web](docs/images/dsh-files-preview.png)

The screenshot was captured from official DSH `0.1.1-rc.2` with Workbench, Files,
and Terminal installed. Files works without Terminal; the combined screenshot
shows the shared Workbench shell.

## Do I Need This Plugin?

Install this plugin when you want to:

- browse the files in the workspace used by a DSH conversation;
- preview source files, Markdown, JSON, logs, and other UTF-8 text files;
- keep using official DSH while adding a file panel through the plugin system.

You do not need this plugin if you only use DSH chat and never inspect workspace
files inside the browser.

## Quick Start With Official DSH

The current development build has been validated with:

- DeepSeek Harness `0.1.1-rc.2`, commit
  [`b150a551`](https://github.com/deepseek-ai/deepseek-harness/commit/b150a551b8d465e31e418e1b2eaf5e79bbb7d28e)
- Node.js 22.13 or newer
- `pnpm` available on `PATH`

DSH is a developer preview and may introduce compatibility-breaking changes.

### 1. Install

Stop a running DSH Web process before changing Profile plugins.

#### GitHub development build

Use this today, before the first npm release:

```bash
pnpm dlx @deepseek-ai/dsh@0.1.1-rc.2 plugin --profile web add github:yangbobo2021/relay-dsh-plugin-workbench#main github:yangbobo2021/relay-dsh-plugin-files#main
```

For a reproducible install, replace each `#main` with a tag or full commit SHA.
The Workbench package is listed explicitly because DSH's pnpm profile blocks
GitHub packages as transitive dependencies.

#### npm release

After `@relay/dsh-plugin-files` is published to npm, install it with:

```bash
pnpm dlx @deepseek-ai/dsh@0.1.1-rc.2 plugin --profile web add @relay/dsh-plugin-workbench@latest @relay/dsh-plugin-files@latest
```

At the time this README was written, the npm package had not been published yet.
If the command reports `404 Not Found`, use the GitHub install above.

### 2. Start or restart DSH Web

```bash
pnpm dlx @deepseek-ai/dsh@0.1.1-rc.2 web
```

If you already have a `dsh` command installed, `dsh web` is equivalent. Restart
DSH Web after installing, updating, or removing plugins.

### 3. Open a workspace

In DSH Web:

1. Open the DSH URL printed by the terminal.
2. Complete the first-launch screen if DSH shows one.
3. Create or select a conversation that has a workspace directory.
4. Open the Workbench side panel and choose `Files`.
5. Click a text file to preview it.

If no workspace session is selected, the panel asks you to open a workspace
session first.

## What It Provides

- A `Files` view in the Workbench side panel
- Workspace file tree loading through DSH Agent identity
- Workspace containment checks, so previews stay inside the active workspace
- Bounded UTF-8 text previews for practical browser use
- A filter box for quickly narrowing visible files
- Composition with the shared Workbench shell

Binary files, very large files, and paths outside the workspace are not previewed
as plain text.

## Plugin Boundary and Relay

This plugin owns only the Files view. It does not depend on Codex, Claude, Relay
Events, or any private Relay runtime. It communicates with the shared Workbench
shell through the public plugin contract.

The repository is maintained as part of
[Relay](https://github.com/yangbobo2021/Relay), an open-source project for
long-running agent work, external-event delivery, reusable DSH workbench views,
and multiple conversation backends.

## Update, Inspect, or Remove

Stop DSH Web before changing plugins, then restart it afterward.

```bash
dsh plugin --profile web why @relay/dsh-plugin-files
dsh plugin --profile web update @relay/dsh-plugin-files
dsh plugin --profile web remove @relay/dsh-plugin-files
```

For GitHub installs, `pnpm` records the package source inside the DSH Profile.
Run `dsh plugin --profile web why @relay/dsh-plugin-files` to inspect it.

## Troubleshooting

### The Files panel does not appear

Restart DSH Web after installing the plugin. Then inspect the Profile:

```bash
dsh plugin --profile web why @relay/dsh-plugin-files
```

If the package came from GitHub `main`, try pinning a known commit SHA.

### The panel says to open a workspace session

Create or select a DSH conversation that has a workspace directory. The Files
plugin reads files from the active workspace, not from an arbitrary folder on
your machine.

### A file does not preview

The plugin previews bounded UTF-8 text content. Binary files, very large files,
and paths outside the active workspace may be hidden or reported as unavailable.

### Installation says pnpm is missing

Install pnpm using the official guide: <https://pnpm.io/installation>.

## Development

```bash
git clone https://github.com/yangbobo2021/relay-dsh-plugin-files.git
cd relay-dsh-plugin-files
npm install
DSH_ROOT=/path/to/deepseek-harness npm run verify
npm pack
```

`npm run verify` runs type checking, tests, and the production build against an
official DSH checkout.

## Feedback

Report bugs and feature requests in this repository's issue tracker:
<https://github.com/yangbobo2021/relay-dsh-plugin-files/issues>
