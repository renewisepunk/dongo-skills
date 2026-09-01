# CLI installation

Use the least invasive working route. The packed dongo CLI requires Node.js 20
or newer. Building the current source checkout uses Node.js 24.

## Existing installation

If `dongo --version` succeeds, keep it and continue with `dongo auth status` and
`dongo doctor`.

## Published package

Install the public dongo package from the npm registry:

```sh
npm install --global @wisepunk/dongo
dongo --version
```

The package requires Node.js 20 or newer and provides the `dongo` executable. Do
not substitute a similarly named package.

During the package's initial release window, npm or an agent package-safety
layer may warn that `@wisepunk/dongo` is newly published. Treat package age as a
risk signal rather than proof of a bad package. Verify the exact scoped name,
published repository, version, and integrity metadata before continuing:

```sh
npm view @wisepunk/dongo name version repository dist.integrity
```

If the host requires explicit approval for a new package, surface the warning
and use the user's approval. Never substitute an unscoped or similarly named
package, add `--force`, or disable a security policy to bypass the warning.

If npm reports that the package is temporarily unavailable, confirm the exact
package name once:

```sh
npm view @wisepunk/dongo version
```

Do not repeatedly retry a registry error. Use the trusted source fallback when
the environment has its prerequisites.

## Public source fallback

If the package is not available from npm, clone the trusted public source
`https://github.com/renewisepunk/dongo.git` into a newly created temporary
directory. Do not clone over the user's repository or another existing path.

From the clone root:

```sh
npm ci
npm pack --workspace @wisepunk/dongo
npm install --global ./<tarball-emitted-by-npm-pack>
dongo --version
```

Use the tarball filename emitted by `npm pack` if its version differs. The pack
step builds the self-contained CLI. Remove only the temporary clone after a
successful install, using its exact resolved path.

If the required Node.js version, Git, npm, network access, or global package
installation is unavailable, state the missing prerequisite precisely and stop.
Do not use an untrusted binary mirror, request elevated credentials, or silently
alter the system package manager.
