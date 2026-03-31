# Convex Template

TanStack Start + Convex + Convex Auth + Convex Static Hosting.

- **Frontend**: TanStack Start (SPA mode)
- **Backend**: Convex
- **Auth**: Convex Auth
- **Hosting**: Convex Static Hosting
- **Styling**: Tailwind CSS v4

## Getting Started

```bash
bun install
bunx @convex-dev/auth          # generates JWT keys for dev
bun run dev
```

## Production

```bash
bunx @convex-dev/auth --prod   # generates JWT keys for prod
bun run deploy
```

| Variable          | Purpose                  | Set by                         |
| ----------------- | ------------------------ | ------------------------------ |
| `JWT_PRIVATE_KEY` | Signs JWT session tokens | `bunx @convex-dev/auth --prod` |
| `JWKS`            | Public key set for JWT   | `bunx @convex-dev/auth --prod` |

## Commands

| Command          | Description                                                         |
| ---------------- | ------------------------------------------------------------------- |
| `bun run dev`    | Start frontend + backend dev servers                                |
| `bun run build`  | Build the SPA for production                                        |
| `bun run deploy` | Build, deploy Convex backend, and upload static files to production |
| `bun run format` | Format code with oxfmt                                              |
| `bun run lint`   | Lint code with oxlint                                               |
