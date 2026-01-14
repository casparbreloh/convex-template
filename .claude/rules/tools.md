# Tools

## context7

Fetches current documentation and code examples from official sources. Training data gets outdated - use this for accurate, current knowledge.

**Triggers**:

- Import statements, library-specific APIs
- Framework patterns (React hooks, Vue composition, etc.)
- Version-specific implementations
- "How do I use X with Y" questions

**Choose over native knowledge when**:

- Implementation must follow official patterns
- API signatures, config options, authentication flows
- Migration guides, deprecation handling
- Any uncertainty about current best practices

**Examples**:

- "Convex query syntax" → context7 (current API)
- "Auth0 authentication" → context7 (official flow)
- "explain this function" → native (no external docs needed)

## websearch

Web search for broader or recent information context7 doesn't cover.

**Triggers**:

- Very recent changes (last few months)
- Community discussions, Stack Overflow patterns
- Comparisons between tools/approaches
- Error messages, troubleshooting
- Non-library topics (deployment, infrastructure)

**Choose over context7 when**:

- Need community solutions, workarounds
- Topic spans multiple tools/services
- Looking for opinions, benchmarks
- Context7 returns insufficient results

## sequential-thinking

Structured step-by-step reasoning for complex problems.

**Triggers**:

- Architectural decisions with trade-offs
- Multi-system integrations
- Problems with unclear scope or requirements
- Debugging complex issues
- Design decisions affecting multiple files/components

**Use when**:

- Multiple valid approaches exist
- Need to reason through consequences
- Problem requires decomposition
- Uncertainty about best path forward
