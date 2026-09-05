# Efficient execution

Use fewer operations by reusing authoritative state and combining updates, not
by skipping lifecycle, integration, or release safeguards.

## Reuse current state

- `dongo_session_start` returns the project, execution policy, resolved
  Attention, and current Overview. Read that response before requesting another
  Overview.
- Refetch an Intake immediately before completing triage because a human can
  enrich it while claimed. Refetch a WorkItem before a revision-aware start,
  update, Attention request, or finish when another actor or elapsed time may
  have advanced it.
- Do not repeat stable repository discovery, authentication, or health checks
  after an unrelated capability fails. Recheck only the affected layer.

## Choose one control plane and execution owner

Use MCP for lifecycle operations when the active host already has it; otherwise
use CLI `--json`. Do not replay a successful mutation through the other surface.
If a response is uncertain, reuse only that operation's original idempotency key
to recover it.

For one WorkItem, use either the active host session or its existing local-runner
job. Check runner status from the exact registered repository when ownership is
unclear. Never create a second session, WorkItem, or Run to work around stale
display text, a busy runner, a revision conflict, or a lost claim.

## Make updates useful and economical

Record a Run update when the phase, user-visible result, blocker, or next action
materially changes. Prefer these boundaries:

1. execution begins after the atomic start;
2. implementation is ready and focused checks pass;
3. protected integration or release begins;
4. a named owner or shared resource is required; and
5. exact integration and release acceptance are proven.

When one transition has a new artifact, send its activity, concise latest
update, next step, and that artifact in one update mutation. Add separate
comments only for durable context that does not belong in current status. Avoid
fixed-interval “still working” writes and duplicate chat/dongo prose.

Use the Run's returned `activeUntil` to schedule renewal before expiry. A long
operation needs a healthy lease, but renewing after every command adds traffic
without improving ownership safety.

## Keep unrelated work parallel

Wait only on the constrained resource. Mark the Run `waiting_for_resource` with
the named resource and next action while keeping its lease healthy; do not call
the agent disconnected or failed. Continue independent implementation and tests
in other isolated worktrees. A shared release target, browser profile/debug
port, or live external fixture must not be used concurrently merely because
multiple Run slots remain.

## Verify once at the right boundary

Run focused checks while implementing. After the coherent commit set is ready,
run the repository's required full gates once for that exact candidate, then use
the protected integration workflow. If integration rewrites commit identities
or changes the candidate, inspect the integrated diff and rerun the relevant
behavior checks. Before Done, always run fresh shared-target completion proof
and any required live acceptance; efficiency never turns a feature-branch pass
into release evidence.
