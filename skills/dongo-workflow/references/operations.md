# dongo operations

MCP tool descriptions are the argument schema. The CLI exposes the same
operations with `--json`.

| MCP | CLI | Use |
|---|---|---|
| `dongo_session_start` | `dongo session-start --session-id ID` | Once per host session. Returns project, workflow state, Overview, answered Attention. |
| `dongo_get_overview` | `dongo overview` | Only when state may have changed since startup. |
| `dongo_get_intake` | `dongo intake get --intake-id ID` | Read an Intake and its attachment metadata. |
| `dongo_claim_issue` | `dongo issue claim --issue-id ID --revision N` | Intake or Ready item straight to working. Preferred over the separate steps. |
| `dongo_claim_intake` / `dongo_complete_triage` | `dongo intake claim` / `dongo intake complete --state processed|dismissed` | When triage should not start work: link existing Work, mark processed, or dismiss. |
| `dongo_create_work` | `dongo work create --title T --goal G [--parent-work-id ID]` | A focused item, optionally a child of a parent. |
| `dongo_get_work` | `dongo work get --identifier dong012` | Read an item, its Run, comments, artifacts, Attention. |
| `dongo_start_work` | `dongo work start --work-id ID --revision N` | Start a Ready item, also to resume after Attention. |
| `dongo_update_work` | `dongo work update --work-id ID --revision N --latest-update TEXT [--artifact JSON]` | One update per real change; combine update, next step and a new artifact. |
| `dongo_renew_claim` | `dongo work renew` | Before `activeUntil` during long work. |
| `dongo_request_attention` | `dongo attention request --work-id ID --revision N --kind decision|review|question|blocked --title T --body B [--option …]` | Stop and ask the person. Parks the Run. |
| `dongo_request_owner_attention` | `dongo attention request --intake-id ID …` or project-level | Ask without pausing a Run. |
| `dongo_get_attention` / `dongo_resolve_attention` | `dongo attention get|wait|resolve` | Read the answer; mark it handled. |
| `dongo_add_comment` | `dongo comment add --work-id ID --body TEXT` | Durable context that is not current status. |
| `dongo_finish_work` | `dongo work finish --work-id ID --revision N --outcome TEXT [--artifact JSON]` | Done, with the outcome written for the person. |
| `dongo_get_attachment` | `dongo attachment get` | Metadata and a short-lived download link. |
| `dongo_acquire_resource` / `dongo_release_resource` | `dongo resource acquire|release` | A genuinely shared live fixture (one browser profile, one deployment target). Acquire in lexical order, release on every exit. |

Every mutation takes the item's current `revision` and an `idempotencyKey`.
On `revision_conflict` or `claim_conflict`, refetch and reassess; reuse an
idempotency key only to recover the uncertain response of that exact call.

Artifact JSON: `{"kind":"commit|pull_request|deployment|report|link","label":"…","url":"…"}`.

Work identifiers are `dong012` style: four letters and three digits, unique
inside the project. Values in `legacyIdentifiers` are lookup aliases only.
