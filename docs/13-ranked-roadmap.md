# 13 — Ranked Roadmap by Difficulty and Dependencies

Difficulty is an estimate from 1 (easy) to 10 (very difficult). Priority is the recommended implementation order, not a ranking of academic importance.

| Priority | Module | Difficulty | Dependency / reason |
|---:|---|---:|---|
| 1 | Repo, tooling, app skeleton | 2 | Foundation for all work |
| 2 | API conventions and DB migrations | 4 | Prevents parallel teams drifting |
| 3 | Authentication and ownership | 4 | Every protected feature depends on identity |
| 4 | Diary CRUD and versioning | 4 | Source records for memory |
| 5 | OOP diary model and writing modes | 5 | Required paradigm; build alongside diary |
| 6 | Functional processing and hash chain | 6 | Required paradigm and integrity foundation |
| 7 | Memory candidates/provenance/review | 8 | Feeds graph and grounded AI |
| 8 | Policy grammar/parser/Prolog spike | 9 | Start in parallel early; highest thesis risk |
| 9 | Neural Canvas | 7 | Depends on stable graph API |
| 10 | Grounded AI retrieval/Q&A | 8 | Depends on auth and source records |
| 11 | Personalization | 7 | Depends on conversations and review workflow |
| 12 | Archive/export | 4 | Depends on record models and authorization |
| 13 | AI Presence visual states | 5 | Can be built with mock states early |
| 14 | Manual voice workflow | 6 | Depends on upload/storage/transcription |
| 15 | Action proposals and confirmation | 6 | Depends on auth and audited backend |
| 16 | Beneficiary portal/release simulation | 7 | Depends on policy engine |
| 17 | Security integration/end-to-end tests | 9 | Must verify all boundaries |

## Suggested 8–12 week plan (adjust to course calendar)
- Weeks 1–2: foundation, contracts, auth, diary; policy grammar/Prolog proof-of-concept starts in parallel.
- Weeks 3–4: OOP and functional requirements, hash chain, memory candidates and review.
- Weeks 5–6: Neural Canvas, retrieval and grounded AI; parser and Prolog integration.
- Weeks 7–8: personalization, archive/export, AI Presence, manual voice.
- Weeks 9–10: actions, beneficiary portal and release simulation.
- Weeks 11–12: security tests, integration, documentation, demo and defense rehearsal.

## Scope gates
- Do not build the full canvas before entity/relationship contracts stabilize.
- Do not build AI Q&A before authorization-filtered retrieval exists.
- Do not build beneficiary AI before Prolog access tests pass.
- Do not build advanced 3D Presence before all required thesis modules work.
- If time slips, cut optional voice/TTS polish and advanced effects before cutting parser, Prolog, hash chain or grounded authorization.
