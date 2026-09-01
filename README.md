# Dongo Agent Skills

Portable [Agent Skills](https://agentskills.io/) for setting up and operating
[Dongo](https://dongo.so) from an AI coding agent.

## Included skills

- `dongo-onboarding` installs the Dongo CLI when needed, connects a repository,
  configures the current agent's MCP host, and guides the browser approval.
- `dongo-workflow` teaches an agent how to triage Intake, claim and complete Work,
  handle Attention, and respect Dongo's concurrency and security rules.

Install both skill directories with your agent's normal Agent Skills installer.
For example, ask your agent:

> Install the `dongo-onboarding` and `dongo-workflow` skills from
> `https://github.com/renewisepunk/dongo-skills`.

After installation, say:

> Set up Dongo for this repository.

The agent handles the CLI and MCP configuration. You approve the Dongo project
and the agent installation in the browser when prompted. A newly configured MCP
connection may require restarting the agent host if it cannot reload MCP servers
in the current session.

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

## License

MIT. See [LICENSE](LICENSE).
