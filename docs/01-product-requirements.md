# 01 — Product Requirements

## 1. Product definition
BayMax is a personal AI companion that organizes a user's memories, knowledge and daily activities, while preserving selected information in a permission-controlled digital legacy vault.

## 2. Modes
### Companion Mode
The owner can chat with BayMax, save diary and knowledge entries, review suggested memories, explore the Neural Canvas, record voice notes, export records and approve supported actions.

### Legacy Mode
A beneficiary can access only records allowed by the owner's frozen policy after a simulated release event. The AI answers only from authorized records and cites the source entries.

## 3. Primary users
- **Owner:** creates and controls the personal archive, preferences, beneficiaries and legacy policies.
- **Beneficiary:** accesses only released, permitted records.
- **Administrator/developer:** configures and tests the prototype; must not bypass owner authorization in application flows.

## 4. Core requirements
### Accounts and diary
- Register/login and role-aware sessions.
- Create, view and search diary/knowledge entries.
- Support at least two entry types using OOP inheritance.
- Preserve original content; edits create versions.
- Maintain append-only integrity metadata and hash-chain verification.

### Memory engine
- Extract candidate people, topics, events and relationships from approved sources.
- Distinguish explicit, AI-extracted and inferred information.
- Require owner review before AI suggestions become confirmed persistent facts.
- Preserve provenance from each memory node to one or more source records.

### Neural Canvas
- Infinite/pannable/zoomable canvas.
- Color-coded node categories.
- Nodes for people, memories, places, topics, documents, tasks and conversations.
- Typed relationships between nodes.
- Search, filters, details panel and source navigation.
- Canvas layout is not the source of truth; graph data in PostgreSQL is.

### Companion AI
- Ground answers in records the current user may access.
- Cite each factual memory answer with source/date.
- Say when no record is found; do not guess.
- Maintain conversation history, but re-check permissions when history is reopened.
- Use approved personalization preferences.

### Adaptive personalization
- Learn candidate communication preferences from repeated interaction.
- Separate explicit preferences from observed patterns and inferences.
- Owner can approve, edit, reject, disable or delete preferences.
- Do not infer diagnoses or sensitive traits.

### AI Presence and voice
- Dedicated visual AI screen with idle/listening/thinking/speaking/retrieving/error states.
- Manual recording only: owner starts and stops.
- Preserve audio, raw transcript, cleaned transcript and summary separately.
- Owner reviews transcript/summary before saving as a diary or knowledge entry.
- MVP may use push-to-talk or click-to-record; no always-listening.

### Actions
- AI may propose timers, reminders or calendar actions.
- Backend validates parameters and permissions.
- Every action requires explicit owner confirmation before execution.
- Record proposal, approval/rejection and execution result.
- No arbitrary shell, OS or unrestricted device access.

### Archive and export
- Export one conversation, one memory, selected records or full owner archive.
- Formats: PDF, Markdown, TXT, JSON and ZIP as appropriate.
- Include provenance and clearly label AI-generated summaries.
- Re-authorize every record at export time.
- Beneficiaries can export only records they are allowed to access.

### Legacy vault
- Beneficiary registration and grants.
- Custom policy language with EBNF grammar, lexer, recursive-descent parser and interpreter.
- Compile policy into Prolog facts/rules.
- Deny by default; deny overrides allow; release date/trigger checks.
- Freeze policy after simulated release according to project rules.
- Grounded beneficiary Q&A over authorized records only.

## 5. Non-functional requirements
- Security-first authorization.
- Explainable access decisions and audit trail.
- Testable modules and reproducible setup.
- Responsive desktop-first web UI.
- Configurable AI/transcription providers.
- Free-tier/local development options; avoid paid-only dependencies.
- Use fictional data in demos and tests.

## 6. Out of scope for MVP
Always-on listening, autonomous actions, automatic phone calls, native mobile apps, custom-trained foundation models, multi-agent orchestration, legal will execution and sophisticated 3D rendering.
