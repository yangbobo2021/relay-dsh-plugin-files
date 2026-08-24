# Relay DSH Files Plugin

`@relay/dsh-plugin-files` contributes a workspace explorer to the side region of
`@relay/dsh-plugin-workbench`. Its Host Remote uses DSH Agent identity and filesystem
services, enforces workspace containment, and bounds UTF-8 text previews.

Use this plugin when you want an official DSH installation to show the active
workspace files in a Workbench side panel.

Install from npm:

```bash
dsh plugin --profile web add @relay/dsh-plugin-workbench @relay/dsh-plugin-files
```

Install the current GitHub development versions:

```bash
dsh plugin --profile web add github:yangbobo2021/relay-dsh-plugin-workbench github:yangbobo2021/relay-dsh-plugin-files
```

The plugin depends on Workbench's public view contract, but has no Codex, Claude,
or Events dependency. It is maintained as part of Relay's DSH plugin family, where
Relay provides the broader event-driven Agent direction and this package remains a
small reusable file explorer contribution.
