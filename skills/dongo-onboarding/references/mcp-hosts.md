# MCP host setup

The CLI-generated integration is authoritative for project names and URLs. Use
the commands below only with values rendered from trusted local Dongo state.

## Codex

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
`bearer_token_env_var` for Dongo.

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

Merge only the generated Dongo server entry through the host's documented
configuration mechanism. The connection contains the project-specific
Streamable HTTP URL and no static authorization header.

The host must follow the unauthenticated `401` Bearer challenge, RFC 9728
Protected Resource Metadata, and OAuth authorization code with S256 PKCE. Use the
exact MCP URL as the OAuth resource. Prefer Client ID Metadata Documents when
advertised and Dynamic Client Registration only as a compatibility fallback.

## Removal and revocation

Logging out the host, removing its local MCP entry, and revoking the Dongo
installation are distinct operations. Perform only the operation the user asks
for. Revocation is required when server-side invalidation is intended.
