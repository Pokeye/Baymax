# 02 — Architecture

## 1. Architecture style
Use a **modular monolith**. One React application calls one FastAPI application. FastAPI modules call shared PostgreSQL repositories and explicit domain services. The policy module invokes SWI-Prolog through a controlled adapter.

## 2. High-level flow
```text
React + Vite + TypeScript
  ├── Companion / Chat
  ├── Neural Canvas
  ├── Diary / Review Queue
  ├── AI Presence / Voice
  ├── Archive / Export
  └── Legacy Beneficiary Portal
             |
          REST API
             |
FastAPI Modular Backend
  ├── Auth & Identity
  ├── Diary & Versioning
  ├── Memory & Graph
  ├── Personalization
  ├── Retrieval & AI
  ├── Voice
  ├── Action Proposals
  ├── Archive
  ├── Policy Parser / Interpreter
  ├── Authorization Adapter
  └── Audit
             |
        PostgreSQL
             |
     SWI-Prolog runtime
```

## 3. Backend module boundaries
- `auth`: identities, sessions, role claims.
- `diary`: entry types, immutable originals, versions.
- `processing`: pure transformations and hash-chain helpers.
- `memory`: candidates, approvals, entities, relationships, provenance.
- `personalization`: preference candidates and approved profile.
- `retrieval`: permission-filtered record retrieval.
- `ai`: provider adapters, context assembly, answer generation.
- `voice`: audio metadata, transcription, review.
- `actions`: proposal, confirmation, execution, audit.
- `archive`: export jobs and serializers.
- `policy`: grammar, lexer, parser, interpreter.
- `authorization`: Prolog adapter and fail-closed decisions.
- `legacy`: beneficiary workflows and release simulation.
- `audit`: security and integrity events.

## 4. Critical request flow for AI Q&A
1. Authenticate requester.
2. Determine current mode and role.
3. Ask authorization service what record scope is permitted.
4. Retrieve only permitted records.
5. Assemble context only from those records.
6. Generate answer.
7. Validate each citation against retrieved record IDs.
8. Return answer and citations.
9. Record an audit event.

Never retrieve all records and ask the LLM to ignore restricted content.

## 5. Memory flow
Owner input -> source record -> candidate extraction -> pending review -> owner approves/edits/rejects -> confirmed entity/relationship -> canvas projection and retrieval index.

## 6. Action flow
AI proposal -> schema validation -> permission check -> confirmation UI -> explicit approval -> allowlisted executor -> result and audit event.

## 7. Deployment shape
- Frontend: Vercel or another static hosting free tier.
- Backend: Render or another Python host free tier, subject to current limits.
- Database: PostgreSQL free tier or local Docker during development.
- Prolog: install SWI-Prolog in the backend environment or run locally in development.
- Do not promise 24/7 availability from free-tier services; document sleep/quotas.

## 8. Reliability
- If Prolog is unavailable, deny protected access.
- If policy parsing fails, do not publish the new policy.
- If AI provider fails, show a recoverable error; do not fabricate an answer.
- If export generation fails, do not provide a partial archive as complete.
