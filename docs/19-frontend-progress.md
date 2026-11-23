# BayMax frontend progress and handoff

Updated: 2026-11-23

## Current state

The frontend is a responsive, browser-only product prototype using the approved warm BayMax-inspired visual direction. The header provides persistent Light/Dark theme selection. Application routes cover Home, Conversations, My memories, Neural canvas, Review queue, Actions, Archive, Legacy vault, and Settings.

The demo interactions are intentionally local except for the Conversations page, which stores its chat in browser local storage and sends a short recent chat history to the Gemini Developer API through a server-side FastAPI endpoint. The chat does not retrieve BayMax memories or persist to a backend. The owner can add/delete sample memories, approve/dismiss sample memory suggestions, confirm/dismiss sample actions, choose a companion tone, and download the browser's demo memories as JSON. The Neural Canvas now has an interactive React Flow sample graph with category filters, pan/zoom controls, a node detail panel, and a list fallback. Its contents and links are fictional sample data, not a real or persisted graph. The Legacy Vault is informational only.

Local storage is not a secure store and must not be used for real personal or legacy data. The user-facing shell identifies the local demo state. No authentication, database-backed storage, transcription, policy enforcement, or action execution are connected. Gemini chat is a limited demo integration: recent messages go to Google, saved BayMax records are not sent, and free-tier content may be used to improve Google's products. Do not submit sensitive or identifying information. No microphone is accessed. The image asset at `frontend/public/baymax-companion.png` is original generated artwork used in the Home hero.

## Verified

- `cd frontend && npm run build` — passed (TypeScript project build and Vite production bundle).
- `cd frontend && npm run lint` — passed.
- Browser preview at `http://localhost:5173/` — rendered the Home route and its navigation, hero, sample-memory previews, and quick-start actions.
- Browser `/settings` — rendered theme controls, companion tone selection, privacy notes, and local demo reset.
- Theme changes update the app-wide theme and persist in browser local storage.
- The prior frontend health-check request has been removed from the active routes; no backend connection is attempted by the new UI.
- The interactive Neural Canvas filter, node detail panel, list/map switch, and zoom control were exercised in the browser. The canvas controls and memory labels were present in the accessibility snapshot.
- Focused responsive/keyboard pass: at a 390px viewport the default list fits without horizontal overflow, and the optional map now keeps all four nodes inside its frame. Keyboard focus plus Enter opens a node's detail panel; map controls and node labels have accessible names.
- `@xyflow/react` is installed as a production dependency. The canvas is dynamically loaded so its bundle remains separate from the main frontend chunk.

## Current checkpoint (2026-11-23)

- Reconciled the handoff with the checked-out source: `frontend/src/App.tsx` has all nine documented routes, and `BayMaxPage.tsx` contains their local demo interactions. The current Home and Settings screens were opened in the browser; Settings clearly labels local-only storage and shows Light/Dark and companion-tone controls.
- Fresh frontend checks passed: `npm run lint` and `npm run build`. The build emits a separate 253 kB canvas JavaScript chunk and a 293 kB main JavaScript chunk; there is no chunk-size warning now. Rolldown still warns that a dependency's `use no memo` module directive may not be preserved.
- The Conversations route calls `POST /api/v1/ai/chat`; other frontend routes remain demo-only. The API route has no authentication, server persistence, or memory retrieval and requires a backend Gemini key. The FastAPI app can start without PostgreSQL; the database health endpoint and migrations remain unavailable until `DATABASE_URL` is configured.
- Responsive navigation controls appear in the narrow viewport DOM. A focused 390px layout and keyboard interaction check passed for Neural Canvas; this is not a full WCAG audit or cross-browser responsive pass. No automated frontend test suite exists yet.
- npm reported 9 moderate audit findings during installation; they have not been individually reviewed or auto-fixed.
- The backend folder already contains an initial identity migration, health endpoint, and user/owner-profile model scaffolding. Database connectivity and migration execution have not been re-verified here.

## Next frontend milestone

The interactive canvas UI milestone and focused mobile/keyboard fixes are complete, but it is still a frontend prototype. Next, add a small automated frontend test suite after agreeing on and installing a test runner. Before connecting real graph data, finalize the payload for `GET /memory/canvas`; the domain entities are described in `03-domain-model-and-database.md`, but `04-api-contract.md` does not yet specify the response shape. Keep the canvas disconnected from backend, database, and AI in the meantime.

## Work remaining before calling the frontend production-ready

1. Replace demo state with authenticated backend APIs and server persistence after the database/API milestone.
2. Implement actual companion/AI calls only after the approved AI/security design; retain owner review for extracted memories.
3. Connect the canvas to an authorized graph projection only after the backend graph response contract and ownership checks are implemented; the current graph remains fictional sample data.
4. Implement recording/transcription only behind a deliberate user action and explicit browser permission, with transcript controls and error handling.
5. Implement the server-backed action engine and confirmation/audit lifecycle; current confirmations do not execute anything.
6. Implement the custom policy lexer/parser/interpreter and SWI-Prolog proof-of-concept before any Legacy Vault access is claimed.
7. Add automated frontend tests and accessibility/responsive checks across target browsers and viewport sizes.
8. Revisit screenshot-based QA after the full canvas and real backend integrations land. Functional/design review passed, but final screenshot fidelity is blocked because the shared browser's effective CSS viewport differed from the requested capture viewport; see `design-qa.md` and its desktop, dark-theme, mobile, and reference captures.

## Resume sequence

1. Review this handoff and the ranked roadmap in `13-ranked-roadmap.md`.
2. Continue the user's frontend-first scope with a small automated frontend test suite after test-runner approval; the first mobile/keyboard canvas check is complete.
3. Keep all current flows demo-only and disconnected from backend and AI. Do not show sample content as real/persisted personal data.
4. Before real graph integration, finalize the `/memory/canvas` response payload and authorization behavior.
5. When the user is ready to move beyond frontend work, verify the existing backend migration/database setup and API contracts. Start the policy grammar/parser and SWI-Prolog proof-of-concept early, as required by the thesis roadmap; do not infer the undecided grammar.
6. Replace each explicitly approved demo seam with a tested service integration, one module at a time. Preserve owner approval, data provenance, and explicit action confirmation.

## Run locally

```powershell
cd frontend
npm install
npm run dev
```

The frontend starts on Vite's local development URL (typically `http://localhost:5173/`). No backend or database is needed for this frontend-only prototype.
