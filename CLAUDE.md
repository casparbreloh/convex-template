# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start all apps/packages in dev mode
pnpm build        # Build all packages
pnpm check        # Run oxlint + oxfmt (linting/formatting)
pnpm check-types  # Run TypeScript type checking
pnpm clean        # Clean all build artifacts and node_modules
```

**Note:** `pnpm check` and `pnpm check-types` run automatically via lefthook pre-commit hooks.

## Architecture

pnpm + Turborepo monorepo with:

- `apps/web` - TanStack Start (React 19 + Vite) frontend with TanStack Router/Query
- `packages/backend` - Convex backend (functions in `convex/` directory)
- `packages/ui` - Shared UI components (Base UI + shadcn + Tailwind v4)
- `packages/config` - Shared configuration

### Key Technologies

- **Frontend:** React 19, TanStack Router/Query, Tailwind CSS v4, Vite 7
- **Backend:** Convex (real-time database + serverless functions)
- **Auth:** better-auth with Convex adapter
- **UI:** Base UI, shadcn components, Hugeicons
