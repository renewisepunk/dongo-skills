# Repository completion and handoff

Read this before finishing repository Work or handing implementation to another
agent. dongo records domain state; the local host supplies Git and release
evidence. The remote service cannot inspect a checkout or independently prove
that a merge, push, or deployment happened.

## Prove the requested outcome

For repository implementation, Done means all delivered changes are integrated
into the intended shared target branch, not merely committed, tested, pushed to
a feature branch, or handed to a coordinator. Identify the target from trusted
repository guidance or the user's request before implementation. Do not infer it
from the feature branch's upstream. If no intended shared target can be
established safely, request the owner's decision through Attention.

1. Verify the requested behavior and commit coherent, scoped changes according
   to repository instructions; preserve unrelated work.
2. Integrate through the authorized merge/review workflow without bypassing
   branch protections. For cherry-picks, rebases, or squashes, record original
   source commit(s) and actual integrated commit(s), inspect the resulting diff,
   and rerun relevant behavior checks. Patch similarity alone is not acceptance.
3. In the clean integration checkout, run the bundled helper with the explicit
   remote target and every full integrated commit SHA:

   ```sh
   node /absolute/path/to/dongo-workflow/scripts/verify-work-completion.mjs --target origin/main --commit FULL_INTEGRATED_SHA
   ```

   Replace the path and target with the actual installed skill and trusted
   repository target. Repeat `--commit` for multiple delivered commits. The
   helper uses Git and Node.js 20+, fetches only the named remote branch, checks
   commit ancestry and a clean checkout, requires local HEAD to equal the fresh
   target revision, and checks that the remote did not move during verification.
   It never merges, resets, deletes, pushes, or finishes Work. It fails closed
   when fetching fails or the target is stale; no offline-success override exists.
   Its JSON contains no remote URL, file list, or absolute local path.
4. Record the exact target revision, source-to-integration mapping if needed,
   relevant tests, and helper evidence on the active Run. The helper cannot know
   whether omitted commits belong to the task, whether behavior is correct, or
   whether a later commit reverted it. Verify scope and current behavior yourself.
5. When the user or repository requires release, complete its acceptance gates
   for that exact integrated revision, deploy only with required authority, and
   prove the live outcome. Record environment, revision, acceptance, and
   post-deployment evidence. A deployment command's exit code or generic live
   URL is not proof that the requested capability is live.
6. Refetch the Work and confirm your active Run/lease before `dongo_finish_work`
   or `dongo work finish`. Finish only after both the requested integration and
   any required release outcome are proven.

The check is a point-in-time local observation, not a remote hard gate or a
signed release attestation. Keep evidence fresh when completing Work. It does
not expand permission to push, merge, publish, or deploy.

Explicit user instructions for draft/local-only, no-commit, or no-merge work are
limited-scope exceptions: record the exact requested result and exclusion, never
claim it shipped. For non-repository tasks, verify the requested artifact or
answer instead of inventing Git requirements. Missing credentials, failed gates,
or a stopped host are blockers, not local-only exceptions.

## Keep pending integration visible and lease-safe

Before a coordinator handoff, record on the existing Work:

- `Implementation ready; integration/release pending` as the latest update;
- exact branch and source commit IDs, changed scope, and focused checks;
- the shared target, required gates, unresolved concerns, and responsible
  coordinator or existing release Work identifier.

Keep Work unfinished. The original owning session renews its lease and remains
responsible for final evidence while the coordinator owns its separate
integration/release Run. The coordinator returns integrated SHAs, mappings,
acceptance, and live evidence; it does not share the implementer's active Run or
finish it on their behalf. Never finish to free a concurrency slot, cancel to
hide a handoff, or create a duplicate implementation item.

Use owner Attention only when a person must review, decide, or unblock. Routine
coordinator work is not a reason to manufacture human Attention. A genuine
`request_attention` pauses the active Run and releases its execution claim;
after the answer, refetch Work and atomically start/reclaim before continuing.

If the host must stop before integration, persist the handoff and clearly
report that the claim may expire and the item remains incomplete. Do not promise
continued lease renewal or an automatic wakeup. Expiry makes the Work
reclaimable; on the next real session, pull answered Attention and refetch Work,
artifacts, and repository state before an atomic start. A revision or ownership
conflict requires reassessment, never a blind retry. Reuse the existing
implementation and finish its remaining integration/release steps rather than
implementing the item again.
