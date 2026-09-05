# dongo Agent Skills

Portable [Agent Skills](https://agentskills.io/) for setting up and operating
[dongo](https://dongo.so) from an AI coding agent.

The onboarding skill installs the public
[`@wisepunk/dongo`](https://www.npmjs.com/package/@wisepunk/dongo) CLI package
when the `dongo` executable is not already available.

## Included skills

- `dongo-onboarding` installs the dongo CLI when needed, connects a repository,
  previews and applies managed `AGENTS.md` or `CLAUDE.md` guidance, configures
  the current agent's MCP host, and guides browser approval. It starts with
  read-only discovery, reports each setup/capability phase separately, and
  never starts authentication merely because a later phase is missing. Codex
  setup can combine CLI and host consent on one screen while keeping their
  credentials separate.
- `dongo-workflow` teaches an agent how to triage Intake, claim and complete Work,
  handle Attention, keep repository work attached to active Runs, and respect
  dongo's concurrency and security rules, including the complete issue
  lifecycle, bounded Attention waits, optional retained-update compatibility,
  local-runner ownership, economical Run updates, and safe host-native
  delegation for an owner-authorized batch of independent issues.

Install both skill directories with your agent's normal Agent Skills installer.
For example, ask your agent:

> Install the `dongo-onboarding` and `dongo-workflow` skills from
> `https://github.com/renewisepunk/dongo-skills`.

After installation, say:

> Set up dongo for this repository.

The agent handles the CLI and MCP configuration. You approve the dongo project
and agent installation in the browser when prompted; Codex can request both on
one consent screen while retaining separate grants. A newly configured MCP
connection may require restarting the agent host if it cannot reload MCP servers
in the current session.

Connecting another repository does not require signing out of a healthy dongo
account. The agent creates a separate repository binding and lets the browser
reuse the current account session. MCP remains an optional, separately approved
project connection. On the free plan, a second active project requires choosing
whether to upgrade, archive an existing project, or bind another checkout to the
correct existing project.

## Repository layout

```text
skills/
|-- dongo-onboarding/
|   |-- SKILL.md
|   `-- references/
`-- dongo-workflow/
    |-- SKILL.md
    `-- references/
```

Each folder follows the open Agent Skills specification and can be installed
independently.

## Validation

Before publishing skill changes, validate each changed skill with the Agent
Skills validator and run:

```sh
node scripts/verify-brand-case.mjs
```

The brand check includes prose, headings, examples, inline code, and fenced code
blocks. It preserves exact legacy identifiers such as `DONGO-12`, environment
variables such as `DONGO_TOKEN`, and required managed filenames such as
`DONGO.managed.md`.

## License

MIT. See [LICENSE](LICENSE).
