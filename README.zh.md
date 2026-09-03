# Relay DSH Files 插件

> **现已支持 DSH `0.1.2-rc.1`，并保留对 `0.1.2-alpha.3` 的兼容。** 插件 `0.2.2` 已在两个版本上完成验证。[从 npm 安装](https://www.npmjs.com/package/relay-dsh-plugin-files) · [兼容性证据](https://github.com/yangbobo2021/Relay/tree/codex/relay-foundation/dsh-lab/dsh-0.1.2-rc.1-20260903)。

> **发布通道：** `latest` → `0.2.2`；`next` → `0.2.1-rc.1`。

```bash
npx @deepseek-ai/dsh@0.1.2-rc.1 plugin --profile web add relay-dsh-plugin-workbench@0.2.2 relay-dsh-plugin-files@0.2.2
npx @deepseek-ai/dsh@0.1.2-rc.1 web
```

[![npm 版本](https://img.shields.io/npm/v/relay-dsh-plugin-files?label=npm)](https://www.npmjs.com/package/relay-dsh-plugin-files)
[![CI](https://github.com/yangbobo2021/relay-dsh-plugin-files/actions/workflows/ci.yml/badge.svg)](https://github.com/yangbobo2021/relay-dsh-plugin-files/actions/workflows/ci.yml)
[![npm 月下载量](https://img.shields.io/npm/dm/relay-dsh-plugin-files?label=downloads)](https://www.npmjs.com/package/relay-dsh-plugin-files)
[![GitHub Stars](https://img.shields.io/github/stars/yangbobo2021/relay-dsh-plugin-files?style=flat)](https://github.com/yangbobo2021/relay-dsh-plugin-files/stargazers)
[![MIT 许可证](https://img.shields.io/github/license/yangbobo2021/relay-dsh-plugin-files)](LICENSE)
[![DSH 兼容版本](https://img.shields.io/badge/DSH-0.1.1--rc.2%20%7C%200.1.2--alpha.2%20%7C%200.1.2--alpha.3-2f7d68)](https://github.com/deepseek-ai/deepseek-harness)
[![可信发布](https://img.shields.io/badge/npm_trusted_publishing-next_release-2f9e44)](.github/workflows/release.yml)

[English](README.md) | 中文

**npm 包名：** [`relay-dsh-plugin-files`](https://www.npmjs.com/package/relay-dsh-plugin-files)
· [全部 Relay DSH 插件](https://github.com/yangbobo2021/Relay/blob/codex/relay-foundation/docs/dsh-plugins.zh.md)

[![在官方 DSH 中实装运行的 Relay 插件](https://raw.githubusercontent.com/yangbobo2021/Relay/codex/relay-foundation/docs/media/dsh-plugin-suite-demo.gif)](https://github.com/yangbobo2021/Relay/blob/codex/relay-foundation/docs/dsh-plugins.zh.md)

*演示来自官方 DSH 上的真实 npm 安装：Files 在真实对话旁打开 Relay 工作区的
`README.md`。[观看 H.264
MP4](https://github.com/yangbobo2021/Relay/blob/codex/relay-foundation/docs/media/dsh-plugin-suite-demo.mp4?raw=1)。*

`relay-dsh-plugin-files` 为官方
[DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)（DSH）Web UI
增加右侧工作区文件浏览器。你可以在对话页面里浏览当前工作区，并预览文本文件。

这个插件使用 `relay-dsh-plugin-workbench` 作为面板宿主。请在同一个 DSH Profile
中安装 Workbench。

![DSH Web 中预览工作区文件的 Relay Files 右侧面板](docs/images/dsh-files-preview.png)

截图来自官方 DSH `0.1.1-rc.2`，安装了 Workbench、Files 和 Terminal。Files 不依赖
Terminal；组合截图只是展示共享 Workbench 壳层。

## 我需要这个插件吗？

你需要这个插件的场景主要是：

- 想在 DSH 对话中浏览当前工作区文件；
- 想预览源码、Markdown、JSON、日志等 UTF-8 文本文件；
- 想继续使用官方 DSH，同时通过插件系统增加文件面板。

如果你只使用 DSH 聊天，不需要在浏览器里查看工作区文件，可以不安装它。

## 官方 DSH 快速开始

当前开发版本已验证：

- DeepSeek Harness `0.1.1-rc.2`，commit
  [`b150a551`](https://github.com/deepseek-ai/deepseek-harness/commit/b150a551b8d465e31e418e1b2eaf5e79bbb7d28e)
- Node.js 22.13 或更新版本
- `pnpm` 已在 `PATH` 中可用

DSH 仍是开发预览版本，后续可能出现不兼容变化。

### 1. 安装

修改 Profile 插件前，请先停止正在运行的 DSH Web。

#### GitHub 开发版本

如果你想测试尚未发布的最新开发代码，可以使用 GitHub 安装：

```bash
pnpm dlx @deepseek-ai/dsh@0.1.2-rc.1 plugin --profile web add github:yangbobo2021/relay-dsh-plugin-workbench#main github:yangbobo2021/relay-dsh-plugin-files#main
```

如果希望可复现，请把每个 `#main` 都改成具体 Tag 或完整 commit SHA。这里显式列出
Workbench，是因为 DSH Profile 中的 pnpm 会阻止 GitHub 包作为传递依赖。

#### npm 正式版本

可以这样安装 npm 正式包：

```bash
pnpm dlx @deepseek-ai/dsh@0.1.2-rc.1 plugin --profile web add relay-dsh-plugin-workbench@latest relay-dsh-plugin-files@latest
```

### 2. 启动或重启 DSH Web

```bash
pnpm dlx @deepseek-ai/dsh@0.1.2-rc.1 web
```

如果你已经安装了 `dsh` 命令，也可以运行 `dsh web`。安装、更新或删除插件后都
需要重启 DSH Web。

### 3. 打开工作区

在 DSH Web 中：

1. 打开终端中显示的 DSH 地址。
2. 如果 DSH 显示首次启动页面，先完成它。
3. 创建或选择一个带工作区目录的对话。
4. 打开 Workbench 右侧面板，选择 `Files`。
5. 点击文本文件即可预览。

如果当前没有选择工作区会话，面板会提示先打开一个工作区会话。

## 它提供什么？

- Workbench 右侧面板中的 `Files` 视图
- 通过 DSH Agent 身份加载工作区文件树
- 工作区边界检查，避免预览当前工作区之外的路径
- 有大小限制的 UTF-8 文本预览，适合浏览器中使用
- 文件过滤输入框
- 与共享 Workbench 壳层组合使用

二进制文件、非常大的文件、当前工作区之外的路径，不会按普通文本预览。

## 与 Relay 的关系

这个插件只负责 Files 视图。它不依赖 Codex、Claude、Relay Events，也不依赖任何
私有 Relay 运行时。它通过公开插件契约与 Workbench 壳层通信。

本仓库由 [Relay](https://github.com/yangbobo2021/Relay) 项目维护。Relay 探索
长时间运行的 Agent、外部事件投递、可复用 DSH Workbench 视图，以及多种对话后端。

## 更新、检查或删除

修改插件前先停止 DSH Web，完成后重新启动。

```bash
dsh plugin --profile web why relay-dsh-plugin-files
dsh plugin --profile web update relay-dsh-plugin-files
dsh plugin --profile web remove relay-dsh-plugin-files
```

如果是 GitHub 安装，`pnpm` 会在 DSH Profile 中记录来源。可以用 `why` 命令查看。

## 常见问题

### 看不到 Files 面板

安装插件后请重启 DSH Web，然后检查 Profile：

```bash
dsh plugin --profile web why relay-dsh-plugin-files
```

如果安装的是 GitHub `main`，可以尝试固定到一个已知 commit SHA。

### 面板提示需要打开工作区会话

请创建或选择一个带工作区目录的 DSH 对话。Files 插件读取的是当前工作区文件，
不是任意本机目录。

### 某个文件无法预览

插件只预览有大小限制的 UTF-8 文本内容。二进制文件、非常大的文件、当前工作区
之外的路径，可能会被隐藏或提示无法预览。

### 安装提示缺少 pnpm

请参考官方文档安装 pnpm：<https://pnpm.io/installation>。

## 开发

```bash
git clone https://github.com/yangbobo2021/relay-dsh-plugin-files.git
cd relay-dsh-plugin-files
npm install
DSH_ROOT=/path/to/deepseek-harness npm run verify
npm pack
```

`npm run verify` 会基于官方 DSH checkout 运行类型检查、测试和生产构建。

## 反馈

问题和需求可以提交到本仓库 issue：
<https://github.com/yangbobo2021/relay-dsh-plugin-files/issues>
