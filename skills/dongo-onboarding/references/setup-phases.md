# Truthful setup phases

Use this ledger to keep onboarding state observable and to prevent a failure in
one layer from resetting unrelated healthy layers.

## State vocabulary

- `checking`: a bounded, read-only observation is running.
- `verified`: current evidence proves the phase for the named repository,
  project, installation, or host.
- `not required`: the user's requested outcome does not depend on this phase.
- `waiting`: one bounded external action is pending, such as browser approval
  or a host restart.
- `recovering`: prior completion is uncertain; reconcile current state before
  retrying or replacing anything.
- `failed`: current evidence proves a problem and the next action is known.

Never infer `verified` from requested intent, a command being launched, an old
task label, another repository's healthy connection, or a later phase. Never
infer `failed` from a missing observation alone.

## Scope before phases

First discover visible and deferred project MCP tools and apply SKILL.md's
workflow policy read. A matching authenticated Off result is a healthy
connection and ordinary coding proceeds without new dongo orchestration. When
On, one successful startup through MCP or an already connected CLI is enough.
Reuse it and mark unused surfaces `not required`;
do not run every row below as a checklist. An explicit setup request may still
require managed guidance, a second host, or a local CLI capability. Verify only
those additional requirements without resetting the healthy connection.

## Phase ledger

| Phase | Read-only evidence | Mutation only when needed | Do not confuse with |
| --- | --- | --- | --- |
| CLI installation | `dongo --version` | exact approved install or update | CLI authorization |
| CLI authorization | `dongo auth status --json` | repository-scoped `dongo connect` | browser account session or MCP grant |
| Repository binding | trusted remote plus `.agent-work/project.json` | connect to the exact existing/new project | another checkout's binding |
| Repository diagnostics | `dongo doctor --json` after a binding exists | repair only the diagnosed marker/credential issue | GitHub or deployment access |
| Host integration | preview/read back managed host config and instructions | reviewed `dongo integrate <host> --apply` | host OAuth |
| Host authorization | matching authenticated workflow policy; startup when On or settling an existing claim | host-native project-scoped login | CLI credential, Off policy, or human browser cookie |
| Runner registration | `dongo runner status --json` and expected project | owner-authorized runner setup/restart | an online agent Run |
| Inbox pickup | current Inbox plus a proved pickup/queue transition when required | enable or trigger the documented pickup path | Ready Work dispatch |
| GitHub capability | non-mutating `gh auth status` and repository read from the runner context | reauthorize only GitHub when invalid | dongo auth |
| Deployment capability | provider-specific non-mutating preflight from the exact worktree | reauthorize only the affected provider | GitHub, dongo, or browser auth |
| Browser review | open the allowed target in the exact connected browser session | adjust only the named local browser/site permission | dongo or provider auth |
| Work dispatch | observe the requested Work reserved and started in its own session/worktree | start/fix the scheduler path authorized by the user | runner registration or Inbox pickup |

## Progress reporting

Keep one current phase and change it immediately when evidence changes. Prefer
short labels such as:

- `Checking existing dongo setup`
- `dongo CLI already installed · <reported version>`
- `Waiting for repository approval`
- `Repository connected; checking Claude Code integration`
- `Host restart required to load dongo`
- `Host connected; runner registration not requested`
- `Runner online; Ready-work dispatch failed`

Avoid sticky activity labels such as `Downloading latest dongo CLI` after the
version check passed, or generic labels such as `Choreographing` when a named
phase or blocker is known.

## Recovery cases

### Existing healthy setup

When matching policy succeeds (including Off), or legacy startup succeeds after
an explicitly absent/unsupported policy operation, mark that connection
`verified`. For ordinary Work, mark the other surface and optional setup phases
`not required` and continue. Do not require every phase to pass before using a
healthy connection. Updating managed guidance does not invalidate its grant.

### Absent setup

When the task requires CLI functionality and `dongo --version` fails because the
executable is absent, install the exact
trusted package after applying the CLI install policy. Then repeat discovery
from the version phase; do not assume installation also authorized a project.

### Expired authorization

When normal refresh/reconciliation cannot recover the required grant and it is
explicitly missing, invalid, or revoked, keep installation and binding `verified`, mark
only CLI authorization `failed`, and start a new repository-scoped approval.
For an expired MCP grant, refresh only that host installation.

### Partial setup

When CLI `doctor` passes but the host has no MCP entry, preserve CLI and
repository readiness and begin at host integration. When the runner is offline
or Work remains Ready, preserve all earlier setup phases and diagnose runner or
dispatch separately.

### Restart or uncertain completion

When a host restarts, a background process exits, or an approval result is not
visible, switch the affected phase to `recovering`. Repeat the bounded read-only
check. If the desired state is already present, mark the prior attempt
superseded and continue. Start a new mutation only when the observation proves
the required state is still absent or invalid.

### Connectivity or server failure

A failed doctor connectivity row, timeout, `5xx`, `internal`, or generic
“dongo rejected the operation” is not proof of invalid credentials. Preserve
verified setup phases and diagnose that operation with one bounded read through
an existing connection when useful. Record the safe error category/request ID;
do not log raw response bodies or issue repeated connect/login attempts. An
optional broken surface does not block a healthy required one. A failed
required startup remains unresolved even if `work get` succeeds; no capability
flag, manual claim, or credential reset may bypass that startup requirement.

## Final report

Report the named repository and project plus a compact phase list. Include only
safe evidence such as version, project reference, actor label, status, and
bounded filenames. Never include tokens, codes, sensitive approval URLs, or raw
environment values. State the next action explicitly, including `none` when the
requested setup is complete.
