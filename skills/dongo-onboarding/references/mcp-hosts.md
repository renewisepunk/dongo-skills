# MCP host setup

The CLI-generated integration is authoritative for project names and URLs. Use
the commands below only with values rendered from trusted local dongo state.
Each connection is optional and project-scoped. A valid browser account session
may approve it without repeating account login, but the MCP host still receives
its own grant and never reuses the repository's CLI credential.

MCP connectivity alone does not prove parallel execution or worktree isolation.
Report each capability from tested behavior of the current host/runtime. Use
`unsupported` for a known missing capability and leave an uncertain capability
undisclosed. All hosts remain supported for serial dongo work.

## Discover before configuration or login

In Codex, Claude Code, or a generic host, inspect available tools and its
supported deferred-tool search/catalog before declaring the project server
missing. Missing tool visibility may require loading a tool or reloading the
host, not OAuth. Use a callable `dongo_session_start` once and confirm the
returned project; an already successful startup needs no login repetition.
Check the exact host entry only when required tools remain unavailable. Keep
a healthy CLI workflow usable while optional host setup waits. The commands
below apply to a missing integration or an explicitly invalid required grant;
they are not routine health checks.

## Codex

When repository connection and Codex setup are both still needed, prefer one
owner approval with `dongo connect --agent-host codex` (or
`dongo project create ... --agent-host codex`) before applying the integration.
This combines only the consent screen: Codex still performs its own PKCE token
exchange and owns a separate revocable credential.

Preview and apply:

```sh
dongo integrate codex
dongo integrate codex --apply
```

The equivalent interactive host commands are:

```sh
codex mcp add dongo-<short-project-ref> --url https://dongo.so/p/<public-project-ref>/mcp --oauth-resource https://dongo.so/p/<public-project-ref>/mcp --oauth-client-registration auto
codex mcp login dongo-<short-project-ref> --scopes dongo:work:read,dongo:work:write,dongo:attachments:read --oauth-client-registration auto
```

Codex owns and refreshes this OAuth grant. Never configure
`bearer_token_env_var` for dongo.

## Claude Code

Preview and apply:

```sh
dongo integrate claude
dongo integrate claude --apply
```

The equivalent interactive host commands are:

```sh
claude mcp add --transport http --scope project dongo-<short-project-ref> https://dongo.so/p/<public-project-ref>/mcp
claude mcp login dongo-<short-project-ref>
```

Use `--no-browser` for login only in a genuinely headless environment. Claude
owns and refreshes this OAuth grant.

## Generic Streamable HTTP MCP host

Preview the generic rendering:

```sh
dongo integrate generic
```

Merge only the generated dongo server entry through the host's documented
configuration mechanism. The connection contains the project-specific
Streamable HTTP URL and no static authorization header.

The host must follow the unauthenticated `401` Bearer challenge, RFC 9728
Protected Resource Metadata, and OAuth authorization code with S256 PKCE. Use the
exact MCP URL as the OAuth resource. Prefer Client ID Metadata Documents when
advertised and Dynamic Client Registration only as a compatibility fallback.

## Removal and revocation

Logging out the host, removing its local MCP entry, and revoking the dongo
installation are distinct operations. Perform only the operation the user asks
for. Revocation is required when server-side invalidation is intended.
