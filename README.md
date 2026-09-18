# dongo Agent Skills

Portable [Agent Skills](https://agentskills.io/) for setting up and operating
[dongo](https://dongo.so) from an AI coding agent.

The skills discover and reuse an existing project MCP or CLI connection before
entering setup. The onboarding skill installs the public
[`@wisepunk/dongo`](https://www.npmjs.com/package/@wisepunk/dongo) CLI package
only when the requested task needs the CLI and it is not already available.

## Included skills

- `dongo-onboarding` signs this computer in once, points the current folder at a
  dongo project, and optionally configures the agent's MCP host. It clears what
  older versions left behind first, so running it again converges instead of
  layering. It never starts another browser approval when this computer is
  already signed in. Codex setup can combine CLI and host consent on one screen
  while keeping their credentials separate.
- `dongo-workflow` teaches an agent the dongo loop: start a session, claim an
  item, record what changes, stop and ask only when a person must decide, and
  finish with an outcome written for that person. It says how to write
  Attention and updates so they read well on a phone, and it keeps parallel
  work to one session per item with no coordinator ritual.

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

Working in another folder or on another project never requires signing in again.
Authorization belongs to this computer, so `dongo link` points a new folder at a
project using the credential already held. MCP remains an optional, separately
approved project connection. On the free plan, creating a second active project
requires choosing whether to upgrade, archive an existing project, or link to
one that already exists.

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
