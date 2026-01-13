---
description: Comprehensive code review for quality, security, and correctness
argument-hint: Optional scope (file path, PR, or area)
---

# Code Review

Perform a thorough code review, analyzing the code for issues across multiple dimensions. Provide actionable feedback with specific line references and concrete improvement suggestions.

## Review Scope

Analyze: $ARGUMENTS (if not specified, review staged changes or recent modifications)

## Core Review Areas

### 1. Correctness & Logic

- Logic errors, incorrect implementations, faulty algorithms
- Edge cases, boundary conditions, off-by-one errors
- Race conditions, concurrency issues, state management bugs
- Incorrect assumptions or missing validation
- Type safety violations and unsafe operations

### 2. Security

- OWASP Top 10 vulnerabilities (SQL injection, XSS, CSRF, etc.)
- Authentication/authorization flaws
- Input validation and sanitization gaps
- Secrets/credentials in code
- Unsafe dependencies or insecure configurations
- Data exposure risks

### 3. Performance & Scalability

- Algorithmic inefficiencies (O(n²) where O(n) possible)
- Memory leaks, unnecessary allocations
- N+1 queries, missing indexes
- Blocking operations, missing async/await
- Resource exhaustion risks
- Scalability bottlenecks

### 4. Error Handling & Resilience

- Unhandled exceptions or promise rejections
- Missing error boundaries or fallbacks
- Silent failures, swallowed errors
- Poor error messages for debugging
- Missing null/undefined checks
- Inadequate defensive programming

### 5. Code Quality & Maintainability

- Unnecessary complexity, unclear logic
- Duplicate code violating DRY (business logic only)
- Poor naming, misleading abstractions
- Missing or misleading comments where needed
- Premature optimization or over-engineering
- Violations of SOLID, KISS, YAGNI principles

### 6. Style & Conventions

- Consistency with project patterns
- Framework-specific best practices
- Modern language idioms vs deprecated patterns
- Formatting inconsistencies (if not auto-formatted)
- Anti-patterns for the technology stack

### 7. Testing & Verification

- Missing test coverage for critical paths
- Inadequate edge case testing
- Brittle or flaky test patterns
- Missing integration or E2E tests where needed

## Output Format

For each issue found:

1. **Severity**: Critical / High / Medium / Low
2. **Category**: (from areas above)
3. **Location**: Specific file:line reference
4. **Issue**: Clear description of the problem
5. **Impact**: Why this matters (security risk, bug, maintenance cost, etc.)
6. **Fix**: Concrete suggestion with code example if applicable

## Guidelines

- **Prioritize by severity**: Focus on critical and high-priority issues
- **Be specific**: Always reference exact locations (file:line)
- **Be actionable**: Provide concrete fixes, not just criticism
- **Context-aware**: Consider project conventions and constraints
- **Balanced**: Note both issues and particularly well-done aspects
- **Concise**: Clear, direct feedback without fluff
