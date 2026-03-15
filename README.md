# Convex Template

TanStack Start + Convex + Convex Auth + Convex Static Hosting.

- **Frontend**: TanStack Start (SPA mode)
- **Backend**: Convex
- **Auth**: Convex Auth
- **Hosting**: Convex Static Hosting
- **Styling**: Tailwind CSS v4

## Getting Started

```bash
pnpm install
pnpm dlx @convex-dev/auth          # generates JWT keys for dev
pnpm dev
```

## Production

```bash
pnpm dlx @convex-dev/auth --prod   # generates JWT keys for prod
pnpm deploy
```

| Variable          | Purpose                  | Set by                             |
| ----------------- | ------------------------ | ---------------------------------- |
| `JWT_PRIVATE_KEY` | Signs JWT session tokens | `pnpm dlx @convex-dev/auth --prod` |
| `JWKS`            | Public key set for JWT   | `pnpm dlx @convex-dev/auth --prod` |

## Commands

| Command       | Description                                                         |
| ------------- | ------------------------------------------------------------------- |
| `pnpm dev`    | Start frontend + backend dev servers                                |
| `pnpm build`  | Build the SPA for production                                        |
| `pnpm deploy` | Build, deploy Convex backend, and upload static files to production |
| `pnpm check`  | Run formatter, linter, and typechecker                              |
