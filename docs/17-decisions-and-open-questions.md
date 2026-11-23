# 17 — Decisions and Open Questions

## Locked product decisions
1. Product name: BayMax (working academic project name; review trademark/brand implications before public commercialization).
2. Product direction: personal AI companion plus digital legacy vault.
3. Neural Canvas: infinite canvas, not a conventional folder tree or static mind map.
4. Node colors identify categories; node size may encode importance/connection count, but should not imply unsupported certainty.
5. Hybrid memory: AI extracts/suggests; owner reviews and approves persistent facts and relationships.
6. Provenance: every extracted memory retains source record(s).
7. Voice MVP: manual start/stop recording, then transcription and owner review.
8. Actions MVP: proposal-based; every action requires explicit owner confirmation.
9. AI Presence: dedicated animated visual interface; CSS/SVG/canvas first, advanced 3D later.
10. Archive: export conversations, memories and authorized archive packages.
11. Architecture: modular monolith, PostgreSQL source of truth, Prolog for access decisions.

## Important unresolved choices
- Will transcription use hosted API or local Whisper-compatible runtime?
- Which hosting provider supports the required Python and SWI-Prolog runtime within free limits?
- What exact release trigger will be simulated for the course demo?
- What exact policy grammar syntax will the team adopt?
- Which export formats are required for MVP versus stretch goals?
- What file size/storage limits are acceptable?
- What retention/deletion policy applies to raw audio?

## Recorded implementation decisions
- 2026-11-23 â€” Gemini Developer API selected for an initial, stateless chat demo after the project owner supplied a Gemini API key. The key is server-side only. This does not establish production suitability: free-tier limits and data terms apply, and no sensitive/personal memory content may be sent. The chat route does not access BayMax records or persist conversation history. Revisit provider, privacy terms, and authenticated retrieval before production.

## Decision rule
When resolving an open question, record the decision, date, rationale, alternatives and consequences here and update impacted architecture/API/schema docs.
