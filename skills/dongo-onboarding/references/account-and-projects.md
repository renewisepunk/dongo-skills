# Account sessions and project connections

Keep three independent states visible during onboarding:

1. **Account session** — the human browser session identifies the dongo account.
   Reuse a valid session for another repository. Do not force logout or another
   email/Google login unless dongo explicitly presents sign-in.
2. **Repository binding** — `dongo connect` binds the current repository to one
   project and creates a project-scoped CLI installation. A healthy binding in
   another repository does not bind the current repository.
3. **MCP approval** — Codex, Claude Code, or another host may receive its own
   optional project-scoped installation. It never reuses the CLI credential and
   is not required for CLI-only operation. Codex consent may share the CLI
   approval screen when `--agent-host codex` was explicitly requested, but the
   resulting grants and credentials remain separate.

## Connect an additional repository

From the additional repository, inspect its trusted Git identity and existing
dongo marker. When it needs a distinct project, run
`dongo project create --name NAME` even if `dongo auth status` was healthy in
another repository. When it belongs to an existing project, run
`dongo connect --project-ref REF`. Allow the browser to reuse its current
account session and ask only for the new project-scoped approval.

Use `dongo connect --project-ref REF` only when trusted local context or an
explicit human choice proves that this repository belongs to that existing
project. Never select an existing project merely to avoid a plan limit.

## Recover from the active-project limit

The free plan allows one active project. When creation of another project is
blocked by that entitlement, preserve the authenticated account session and
classify the failure as a project-capacity decision, not an auth failure. Stop
automatic retries and present these choices:

- **Upgrade** — upgrade the organization when an upgrade path is available,
  then retry `dongo project create` from the additional repository.
- **Archive** — archive an active project that no longer needs to remain active,
  then retry `dongo project create`. Require explicit human selection of the
  project before archiving it.
- **Use an existing project** — bind with `--project-ref REF` only when the
  repository is genuinely another checkout or worktree of that same project.

Do not run `dongo auth logout`, delete a healthy credential, restart account
login, or diagnose OAuth because of this limit. If none of the choices is
available, report the active-project limit as the blocker and leave existing
projects and credentials unchanged.

## Keep the compact Work code derived

Each project has a four-letter lowercase ASCII Work code. dongo derives it from
the first four ASCII letters of the immutable lowercase slug. If the slug has
fewer than four letters, it appends ASCII letters from the legacy identifier
prefix and then `x` padding. Do not ask the user to choose or edit this code.

The code is project-scoped, so two projects may share it. Work identifiers add
a zero-padded sequence from `001` through `999` with no separator, for example
`dong012`. Existing exact long-form identifiers remain project-scoped lookup
aliases in `legacyIdentifiers`; they are compatibility metadata, not a reason
to reconnect the repository or change its binding.

## Keep project capacity separate from Run concurrency

The free-plan active-project allowance controls how many projects an
organization may keep active. It does not control how many agents may work in
one project.

Each project defaults to Single-agent. An owner may separately opt into parallel
work and choose a 2–8 concurrent-Run safety cap, default 4. This setting never
creates another project, authorizes another installation, or makes a host
capable of spawning agents or Git worktrees. Do not suggest an account upgrade
to recover a parallel-execution safety rejection.
