# 16 — Vibe-Coding Workflow and Prompts

## 1. The safe loop
1. Ask agent to inspect repository and relevant docs.
2. Assign one small vertical slice.
3. Ask for plan and files to change.
4. Review plan and contracts.
5. Approve implementation.
6. Run tests and inspect diff.
7. Commit only working changes.
8. Update docs when contracts or decisions change.

Do not ask one agent to build the entire product in one prompt. Use one primary integrator. Parallel agents should own isolated modules/branches.

## 2. Repository onboarding prompt
```text
You are contributing to BayMax. First read AGENTS.md and the relevant docs.
Inspect the repository without changing files. Summarize:
1. Current architecture and implemented modules.
2. How the current code maps to the specification.
3. Missing requirements and risks.
4. Contract inconsistencies.
5. A prioritized plan for the next smallest vertical slice.
Do not implement anything yet.
```

## 3. Feature implementation prompt
```text
Implement only: [FEATURE].
Read AGENTS.md and these docs: [DOCS].
Inspect the existing code and contracts first.
Before editing, provide:
- dependencies,
- files to create/change,
- API/database impact,
- security considerations,
- test plan.
Wait for approval before substantial changes.
After approval, implement the smallest complete vertical slice, run tests,
and report exact changes and test results. Do not rewrite unrelated modules.
```

## 4. Code review prompt
```text
Review this change against AGENTS.md and the relevant specification.
Look for correctness, security, authorization ordering, data loss, schema/API drift,
untested branches, duplicated logic and scope creep.
Do not edit code. Report findings by severity with file/line references and
suggested fixes. Pay special attention to whether unauthorized data can reach
the LLM or an export.
```

## 5. Integration prompt
```text
Integrate [MODULE A] with [MODULE B] using the documented contracts.
Do not invent fields or endpoints. Identify mismatches first.
Propose a plan, then implement only after approval.
Add integration tests for success, invalid input, permission denial and dependency failure.
```

## 6. Rule for parallel agents
Never let multiple agents edit the same database models, API contract or shared component simultaneously. Assign ownership and merge through reviewed branches.
