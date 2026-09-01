# CLI installation

Use the least invasive working route. The packed Dongo CLI requires Node.js 20
or newer. Building the current source checkout uses Node.js 24.

## Existing installation

If `dongo --version` succeeds, keep it and continue with `dongo auth status` and
`dongo doctor`.

## Package registry

Check whether `@dongo/cli` is publicly available:

```sh
npm view @dongo/cli version
```

If available, install it using the environment's normal global npm mechanism:

```sh
npm install --global @dongo/cli
```

Confirm with `dongo --version`.

## Public source fallback

If the package is not available from npm, clone the trusted public source
`https://github.com/renewisepunk/dongo.git` into a newly created temporary
directory. Do not clone over the user's repository or another existing path.

From the clone root:

```sh
npm ci
npm pack --workspace @dongo/cli
npm install --global ./dongo-cli-0.1.0.tgz
dongo --version
```

Use the tarball filename emitted by `npm pack` if its version differs. The pack
step builds the self-contained CLI. Remove only the temporary clone after a
successful install, using its exact resolved path.

If the required Node.js version, Git, npm, network access, or global package
installation is unavailable, state the missing prerequisite precisely and stop.
Do not use an untrusted binary mirror, request elevated credentials, or silently
alter the system package manager.
