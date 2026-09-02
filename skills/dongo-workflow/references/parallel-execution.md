# Parallel execution

Use parallel work only for distinct WorkItems whose repository changes can be
isolated safely. dongo coordinates project policy, atomic claims, capacity,
Runs, and live state. The coding-agent host creates agent sessions, Git
worktrees, and branches.

## Establish capability

At `dongo_session_start`, report `hostCapabilities.parallelExecution` and
`hostCapabilities.worktreeIsolation` as `supported` only after confirming that
the current host can create distinct agent sessions and isolated worktrees.
Report a known lack as `unsupported`. Omit uncertain values so dongo returns
`undisclosed`.

For CLI sessions, pass both `--parallel-capability` and
`--worktree-capability`, or omit both. Preserve the same `--session-id` for the
actual host session.

Do not infer support from the host name, MCP availability, an installation
record, generic CLI activity, or another machine's behavior. Unsupported and
undisclosed hosts remain valid serial clients.

## Coordinate an authorized batch

When a user explicitly asks to process multiple independent Intake or Work
items, do not apply the one-active-WorkItem rule to the whole effort. If session
start returns parallel mode, use the host's native subagent or task delegation
to create distinct sessions and isolated worktrees up to the smaller of:

- remaining project Run capacity;
- the number of eligible independent issues; and
- available host agent slots.

Delegate each unclaimed Intake before its claim, or each Ready WorkItem before
its start. Give every delegated session the exact item identifier and enough
trusted repository context to inspect duplicates safely. Require that session
to start dongo independently with a unique stable external session ID, own only
that item, and report its workspace and Run truthfully. Never share one claimed
Intake or active Run between sessions.

Continue useful coordinator work while delegated sessions run. As a session
finishes, use the newly available capacity for the next authorized eligible
item. Wait for all delegated results, reconcile commits and outcomes, and keep
every WorkItem truthful; dispatching an agent is not completion.

## Admit a parallel start

Before starting an additional WorkItem:

1. Confirm that the owner enabled project parallel execution.
2. Read the current safety cap and active-Run capacity. Enabled caps range from
   2 through 8 and default to 4; the cap is unrelated to billing or the
   active-project allowance.
3. Use a different stable external session ID for each actual host session.
   Never create replacement IDs merely to bypass the one-active-item limit.
4. Create the new host agent and isolated worktree before claiming its Work.
5. Refetch the target WorkItem, then start it atomically from that session with
   `workspace.kind: "worktree"`.
6. Include bounded `worktreeName` and `branch` labels only when useful. Never
   send an absolute repository or worktree path.

For CLI Work starts, use `--workspace-kind worktree` and optional safe
`--worktree-name` and `--branch` labels.

Parallel sessions may claim separate WorkItems. They may not share one item or
one active Run, and a session may own at most one active WorkItem.

## Handle rejection

- `parallel_execution_unavailable` means project policy, host capability, or
  isolated-workspace proof does not admit the concurrent start. Its reason is
  `project_disabled`, `host_unsupported`, `host_undisclosed`, or
  `isolated_workspace_required`. Continue serially or correct truthful
  configuration.
- `concurrency_limit` means the project's current safety capacity is full.
  Read its `activeRuns` and `maxConcurrentRuns`, wait for an active Run to stop
  or finish, then refetch before trying another start.
- `session_work_limit` means the session already owns active Work. Continue that
  returned `activeWorkItemId` or use another real host session; do not rotate
  IDs to evade the rule.

Never retry any of these errors blindly. Refetch project policy, capacity,
active Runs, and Work ownership first.

## Report live state truthfully

Keep progress and leases current for every active Run. Human visualization is
subscription-backed and may show agent, canonical Work identifier/title,
Running or Waiting, latest meaningful progress, elapsed time, lease health, and
safe workspace detail.

Use `Worktree · <branch>` when a safe branch label is available, fall back to
`Worktree · <worktree name>` when only that safe label is available, use
`Isolated workspace` when isolation is supported without display details, and
use `Workspace details unavailable` otherwise. A shared checkout keeps
additional work serial. These labels describe reported Run context; they do not
prove that dongo created or inspected the workspace.
