# 15 — Five-Person Team Ownership

Each module has one accountable owner. Others may contribute, but avoid simultaneous edits to the same files.

| Member | Primary ownership | Shared responsibility |
|---|---|---|
| 1 | Frontend shell, Companion UI, Neural Canvas, AI Presence | Accessibility and UI tests |
| 2 | FastAPI foundation, auth, PostgreSQL, diary/versioning | API contracts and migrations |
| 3 | EBNF, lexer, parser, interpreter, Prolog | Policy tests and defense |
| 4 | AI provider, retrieval, memory extraction, personalization, voice | AI-use log and prompt safety |
| 5 | Legacy portal, actions, archive/export, integration and QA | Security test matrix and docs |

## Collaboration rules
- One person owns final merge/integration.
- Agree on endpoint schemas and DB migrations before parallel work.
- Use feature branches and small pull requests.
- Require tests for every module.
- Do not merge generated code without review.
- Every member must be able to explain their own code and the system boundaries.
- Keep weekly progress, blockers and decisions in the team's tracker.
