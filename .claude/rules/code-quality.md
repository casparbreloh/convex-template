# Code Quality

## Automated Checks

`pnpm check` and `pnpm check-types` run automatically via hooks after responses.
**Never run these manually** - just fix issues when hooks report them.

## Style

- KISS/YAGNI: simplest solution for current requirements, no speculative features
- DRY business logic only - duplicate code across contexts is fine
- Readability > cleverness, meaningful names > comments
- Abstract after 3+ repetitions, not before
